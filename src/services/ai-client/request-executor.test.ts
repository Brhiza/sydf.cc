import { afterEach, describe, expect, it, vi } from 'vitest';
import { sendRequestWithRetry } from './request-executor';

describe('sendRequestWithRetry', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('401 这类不可恢复错误不应重复重试', async () => {
    const fetchMock = vi.fn(
      async () =>
        new Response(JSON.stringify({ error: { message: 'Invalid API key' } }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        })
    );
    vi.stubGlobal('fetch', fetchMock);

    await expect(
      sendRequestWithRetry({
        endpoint: 'https://api.example.test/v1/chat/completions',
        body: {
          model: 'test-model',
          messages: [{ role: 'user', content: '你好' }],
          stream: false,
        },
      })
    ).rejects.toThrow('API密钥无效或已过期');

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
