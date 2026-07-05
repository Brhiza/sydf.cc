import { describe, expect, it, vi } from 'vitest';
import type { ToolCall } from '@/types';
import {
  accumulateToolCallChunk,
  applyStreamDelta,
  createStreamReducerState,
  MAX_STREAM_TOOL_ARGUMENT_LENGTH,
  parseStreamLineDelta,
  parseStreamResponse,
} from './stream-parser';

describe('parseStreamLineDelta', () => {
  it('空行返回 null', () => {
    expect(parseStreamLineDelta('')).toBeNull();
    expect(parseStreamLineDelta('   ')).toBeNull();
  });

  it('非 data 行返回 null', () => {
    expect(parseStreamLineDelta('event: ping')).toBeNull();
    expect(parseStreamLineDelta(': comment')).toBeNull();
  });

  it('data: [DONE] 返回 done 标记', () => {
    expect(parseStreamLineDelta('data: [DONE]')).toBe('done');
  });

  it('data: 空字符串返回 null', () => {
    expect(parseStreamLineDelta('data: ')).toBeNull();
  });

  it('正常 delta 数据返回 delta 对象', () => {
    const line = `data: ${JSON.stringify({ choices: [{ delta: { content: '你好' } }] })}`;
    expect(parseStreamLineDelta(line)).toEqual({ content: '你好' });
  });

  it('无 choices 时返回 null', () => {
    const line = `data: ${JSON.stringify({ id: 'x' })}`;
    expect(parseStreamLineDelta(line)).toBeNull();
  });

  it('非 JSON 时返回 null 并跳过', () => {
    expect(parseStreamLineDelta('data: not-json')).toBeNull();
  });
});

describe('accumulateToolCallChunk', () => {
  it('index > 0 时直接跳过', () => {
    const calls: ToolCall[] = [];
    accumulateToolCallChunk(calls, { index: 1, id: 'b' });
    expect(calls).toHaveLength(0);
  });

  it('首块初始化 id 和 name', () => {
    const calls: ToolCall[] = [];
    accumulateToolCallChunk(calls, {
      index: 0,
      id: 'tool-1',
      function: { name: 'getTime' },
    });
    expect(calls[0]).toEqual({
      id: 'tool-1',
      type: 'function',
      function: { name: 'getTime', arguments: '' },
    });
  });

  it('后续块累加 arguments', () => {
    const calls: ToolCall[] = [];
    accumulateToolCallChunk(calls, {
      index: 0,
      id: 'tool-1',
      function: { name: 'getTime', arguments: '{"' },
    });
    accumulateToolCallChunk(calls, {
      index: 0,
      function: { arguments: 'tz":"UTC"}' },
    });
    expect(calls[0].function.arguments).toBe('{"tz":"UTC"}');
  });

  it('工具参数过长时只保留上限长度加拒绝标记位', () => {
    const calls: ToolCall[] = [];
    accumulateToolCallChunk(calls, {
      index: 0,
      id: 'tool-1',
      function: { name: 'getTime', arguments: 'a'.repeat(MAX_STREAM_TOOL_ARGUMENT_LENGTH) },
    });
    accumulateToolCallChunk(calls, {
      index: 0,
      function: { arguments: 'b'.repeat(100) },
    });

    expect(calls[0].function.arguments).toHaveLength(MAX_STREAM_TOOL_ARGUMENT_LENGTH + 1);
  });
});

describe('applyStreamDelta', () => {
  function setup() {
    return {
      state: createStreamReducerState(),
      onChunk: vi.fn<(chunk: string) => void>(),
      flush: vi.fn<() => void>(),
    };
  }

  it('content delta 追加到 buffer 和 content', () => {
    const { state, onChunk, flush } = setup();
    applyStreamDelta({ content: '你好' }, state, onChunk, flush);
    expect(state.contentBuffer).toBe('你好');
    expect(state.content).toBe('你好');
    expect(flush).not.toHaveBeenCalled();
    expect(onChunk).not.toHaveBeenCalled();
  });

  it('从思考态切回 content 时先刷缓冲再发空字符串', () => {
    const { state, onChunk, flush } = setup();
    state.inThinkingState = true;
    applyStreamDelta({ content: '继续' }, state, onChunk, flush);
    expect(flush).toHaveBeenCalledTimes(1);
    expect(onChunk).toHaveBeenCalledWith('');
    expect(state.inThinkingState).toBe(false);
    expect(state.contentBuffer).toBe('继续');
  });

  it('tool_calls delta 设置 thinking 态', () => {
    const { state, onChunk, flush } = setup();
    applyStreamDelta(
      {
        tool_calls: [{ index: 0, id: 't1', function: { name: 'fn' } }],
      },
      state,
      onChunk,
      flush
    );
    expect(state.inThinkingState).toBe(true);
    expect(state.toolCalls).toHaveLength(1);
    expect(state.toolCalls[0].id).toBe('t1');
    expect(onChunk).toHaveBeenCalledWith('');
  });

  it('reasoning_content 只进入思考态，不累加到正文 buffer', () => {
    const { state, onChunk, flush } = setup();
    applyStreamDelta({ reasoning_content: '让我想想' }, state, onChunk, flush);
    expect(state.contentBuffer).toBe('');
    expect(state.inThinkingState).toBe(true);
    expect(onChunk).toHaveBeenCalledWith('');
  });
});

function createSseResponse(chunks: string[]): Response {
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(encoder.encode(chunk));
      }
      controller.close();
    },
  });
  return new Response(stream);
}

describe('parseStreamResponse', () => {
  it('解析多块 content 并聚合最终结果', async () => {
    const chunks = [
      'data: {"choices":[{"delta":{"content":"你"}}]}\n',
      'data: {"choices":[{"delta":{"content":"好"}}]}\n',
      'data: [DONE]\n',
    ];
    const response = createSseResponse(chunks);
    const onChunk = vi.fn();
    const result = await parseStreamResponse(response, onChunk);
    expect(result.content).toBe('你好');
    expect(result.tool_calls).toBeUndefined();
    expect(onChunk.mock.calls.map((c) => c[0]).join('')).toBe('你好');
  });

  it('解析 tool_calls 并写入结果', async () => {
    const chunks = [
      'data: {"choices":[{"delta":{"tool_calls":[{"index":0,"id":"t1","function":{"name":"fn","arguments":"{}"}}]}}]}\n',
      'data: [DONE]\n',
    ];
    const response = createSseResponse(chunks);
    const onChunk = vi.fn();
    const result = await parseStreamResponse(response, onChunk);
    expect(result.tool_calls).toHaveLength(1);
    expect(result.tool_calls?.[0].function.name).toBe('fn');
  });

  it('response.body 为 null 时抛错', async () => {
    const response = new Response(null);
    Object.defineProperty(response, 'body', { value: null });
    await expect(parseStreamResponse(response, vi.fn())).rejects.toThrow('Response body is null');
  });
});
