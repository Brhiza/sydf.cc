import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/stores/settings', () => ({
  useSettingsStore: () => ({
    settings: {
      useCustomApi: false,
      customApiEndpoint: '',
      customApiKey: '',
      selectedModel: '',
    },
  }),
}));

describe('AI 时间工具请求策略', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('普通占卜提示词也应交给模型自动决定是否调用工具', async () => {
    const fetchMock = vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
      const payload = JSON.parse(String(init?.body || '{}'));

      expect(payload.tools).toBeInstanceOf(Array);
      expect(payload.tools).toHaveLength(4);
      expect(payload.tool_choice).toBe('auto');

      return new Response(
        JSON.stringify({
          choices: [
            {
              message: {
                content: '测试解读',
              },
            },
          ],
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    });
    vi.stubGlobal('fetch', fetchMock);

    const { AIService } = await import('./ai-client');
    await AIService.generateResponse([
      {
        role: 'user',
        content: `**时间信息**：
公历：2026年3月20日 12时0分
农历：丙午年 二月初二 午时
干支：丙午年 辛卯月 癸巳日 戊午时

**用户问题**：
"这件事会怎样？"`,
      },
    ]);

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('明确日期查询不应本地预解析，应交给模型按需调用工具', async () => {
    const fetchMock = vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
      const payload = JSON.parse(String(init?.body || '{}'));

      expect(payload.tools).toBeInstanceOf(Array);
      expect(payload.tools).toHaveLength(4);
      expect(payload.tool_choice).toBe('auto');
      expect(payload.messages[0].role).toBe('user');
      expect(payload.messages[0].content).toBe('请告诉我 2026年3月20日 的干支信息');

      return new Response(
        JSON.stringify({
          choices: [
            {
              message: {
                content: '测试解读',
              },
            },
          ],
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    });
    vi.stubGlobal('fetch', fetchMock);

    const { AIService } = await import('./ai-client');
    await AIService.generateResponse([
      {
        role: 'user',
        content: '请告诉我 2026年3月20日 的干支信息',
      },
    ]);

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('时间范围问题应同样由模型自动决定工具调用', async () => {
    const fetchMock = vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
      const payload = JSON.parse(String(init?.body || '{}'));

      expect(payload.tools).toBeInstanceOf(Array);
      expect(payload.tools).toHaveLength(4);
      expect(payload.tool_choice).toBe('auto');

      return new Response(
        JSON.stringify({
          choices: [
            {
              message: {
                content: '测试解读',
              },
            },
          ],
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    });
    vi.stubGlobal('fetch', fetchMock);

    const { AIService } = await import('./ai-client');
    await AIService.generateResponse([
      {
        role: 'user',
        content: '未来三个月哪几天更适合出行？',
      },
    ]);

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('流式响应读到内容后应在连接结束前立即回调', async () => {
    let streamController: ReadableStreamDefaultController<Uint8Array> | null = null;
    const encoder = new TextEncoder();
    const onChunk = vi.fn();

    const fetchMock = vi.fn(async () => {
      return new Response(
        new ReadableStream<Uint8Array>({
          start(controller) {
            streamController = controller;
            controller.enqueue(
              encoder.encode(
                [
                  'data: {"choices":[{"delta":{"content":"第一段"}}]}',
                  'data: {"choices":[{"delta":{"content":"第二段"}}]}',
                  '',
                ].join('\n')
              )
            );
          },
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'text/event-stream' },
        }
      );
    });
    vi.stubGlobal('fetch', fetchMock);

    const { AIService } = await import('./ai-client');
    const responsePromise = AIService.generateResponse(
      [{ role: 'user', content: '请流式输出' }],
      undefined,
      onChunk
    );

    await Promise.resolve();
    await Promise.resolve();

    expect(onChunk).toHaveBeenCalledWith('第一段第二段');

    streamController!.enqueue(encoder.encode('data: [DONE]\n\n'));
    streamController!.close();

    await expect(responsePromise).resolves.toMatchObject({
      content: '第一段第二段',
    });
  });

  it('工具调用参数过长时应拒绝本地执行并继续返回普通解读', async () => {
    const payloads: Array<Record<string, unknown>> = [];
    vi.spyOn(console, 'error').mockImplementation(() => undefined);

    const fetchMock = vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
      const payload = JSON.parse(String(init?.body || '{}'));
      payloads.push(payload);

      if (payloads.length === 1) {
        return new Response(
          JSON.stringify({
            choices: [
              {
                message: {
                  content: null,
                  tool_calls: [
                    {
                      id: 'tool-1',
                      type: 'function',
                      function: {
                        name: 'get_current_time_info',
                        arguments: 'x'.repeat(12001),
                      },
                    },
                  ],
                },
              },
            ],
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      const toolMessage = (payload.messages as Array<{ role?: string; content?: string }>).find(
        (message) => message.role === 'tool'
      );
      expect(toolMessage?.content).toContain('工具参数过长');

      return new Response(
        JSON.stringify({
          choices: [
            {
              message: {
                content: '已改用普通解读',
              },
            },
          ],
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    });
    vi.stubGlobal('fetch', fetchMock);

    const { AIService } = await import('./ai-client');
    const result = await AIService.generateResponse([
      {
        role: 'user',
        content: '请查询当前干支后给出建议',
      },
    ]);

    expect(result.content).toBe('已改用普通解读');
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
