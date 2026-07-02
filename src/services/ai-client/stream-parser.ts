import type { ToolCall } from '@/types';

export interface StreamToolCallChunk {
  index: number;
  id?: string;
  function?: {
    name?: string;
    arguments?: string;
  };
}

export interface StreamDelta {
  content?: string;
  tool_calls?: StreamToolCallChunk[];
  reasoning_content?: string;
}

export interface StreamReducerState {
  toolCalls: ToolCall[];
  content: string | null;
  contentBuffer: string;
  inThinkingState: boolean;
  lastFlushTime: number;
}

export interface ParsedStreamResult {
  content: string | null;
  tool_calls?: ToolCall[];
}

const STREAM_FLUSH_INTERVAL_MS = 16;
export const MAX_STREAM_TOOL_ARGUMENT_LENGTH = 12000;

export function createStreamReducerState(): StreamReducerState {
  return {
    toolCalls: [],
    content: null,
    contentBuffer: '',
    inThinkingState: false,
    lastFlushTime: Date.now(),
  };
}

export function parseStreamLineDelta(line: string): StreamDelta | 'done' | null {
  if (line.trim() === '' || !line.startsWith('data: ')) {
    return null;
  }

  const data = line.slice(6).trim();
  if (data === '[DONE]') return 'done';
  if (data === '') return null;

  try {
    const parsed = JSON.parse(data);
    const delta = parsed.choices?.[0]?.delta as StreamDelta | undefined;
    return delta ?? null;
  } catch (e) {
    console.debug('跳过非 JSON 数据:', data, e);
    return null;
  }
}

export function accumulateToolCallChunk(toolCalls: ToolCall[], chunk: StreamToolCallChunk): void {
  const index = chunk.index;
  if (index > 0) return;

  if (!toolCalls[index]) {
    toolCalls[index] = { id: '', type: 'function', function: { name: '', arguments: '' } };
    if (chunk.id) toolCalls[index].id = chunk.id;
    if (chunk.function?.name) {
      toolCalls[index].function.name = chunk.function.name;
    }
  }
  if (chunk.function?.arguments) {
    const nextArguments = toolCalls[index].function.arguments + chunk.function.arguments;
    toolCalls[index].function.arguments = nextArguments.slice(
      0,
      MAX_STREAM_TOOL_ARGUMENT_LENGTH + 1
    );
  }
}

export function applyStreamDelta(
  delta: StreamDelta,
  state: StreamReducerState,
  onChunk: (chunk: string) => void,
  flushContentBuffer: () => void
): void {
  if (delta.content) {
    if (state.inThinkingState) {
      state.inThinkingState = false;
      flushContentBuffer();
      onChunk('');
    }
    state.contentBuffer += delta.content;
    state.content = (state.content || '') + delta.content;
  }

  if (delta.tool_calls) {
    if (!state.inThinkingState) {
      state.inThinkingState = true;
      flushContentBuffer();
      onChunk('');
    }
    for (const chunk of delta.tool_calls) {
      accumulateToolCallChunk(state.toolCalls, chunk);
    }
  }

  const isThinking = 'reasoning_content' in delta;
  const reasoningChunk = delta.reasoning_content;
  if (reasoningChunk) {
    if (isThinking && !state.inThinkingState) {
      state.inThinkingState = true;
      flushContentBuffer();
      onChunk('');
    }
    state.contentBuffer += reasoningChunk;
  }
}

export async function parseStreamResponse(
  response: Response,
  onChunk: (chunk: string) => void
): Promise<ParsedStreamResult> {
  if (!response.body) {
    throw new Error('Response body is null');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  const state = createStreamReducerState();
  const flushContentBuffer = () => {
    if (!state.contentBuffer) {
      return;
    }

    onChunk(state.contentBuffer);
    state.contentBuffer = '';
    state.lastFlushTime = Date.now();
  };

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const delta = parseStreamLineDelta(line);
        if (delta === 'done') break;
        if (!delta) continue;

        applyStreamDelta(delta, state, onChunk, flushContentBuffer);

        if (Date.now() - state.lastFlushTime > STREAM_FLUSH_INTERVAL_MS && state.contentBuffer) {
          flushContentBuffer();
        }
      }

      flushContentBuffer();
    }

    flushContentBuffer();
  } finally {
    reader.releaseLock();
  }

  if (state.inThinkingState) {
    onChunk('');
  }

  const result: ParsedStreamResult = { content: state.content };
  if (state.toolCalls.length > 0) {
    result.tool_calls = state.toolCalls;
  }
  return result;
}
