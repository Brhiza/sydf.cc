import { afterEach, describe, expect, it, vi } from 'vitest';

import { onRequest } from '../../functions/api/ai.js';

describe('/api/ai 安全限制', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('拒绝没有本站来源标识的请求', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const request = new Request('https://sydf.cc/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: '你好' }],
        stream: false,
      }),
    });

    const response = await onRequest({
      request,
      env: {
        OPENAI_API_KEY: 'test-openai-key',
        OPENAI_API_MODEL: 'server-model',
      },
    });

    const data = await response.json();

    expect(response.status).toBe(403);
    expect(data.error).toContain('仅允许');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('允许同源请求并强制使用服务端模型与令牌上限', async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const upstreamRequest = input instanceof Request ? input : new Request(input);
      const payload = await upstreamRequest.clone().json();

      expect(payload.model).toBe('server-model');
      expect(payload.max_tokens).toBe(8192);
      expect(payload.messages).toEqual([{ role: 'user', content: '你好' }]);

      return new Response(
        JSON.stringify({
          choices: [
            {
              message: {
                content: '测试成功',
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

    const request = new Request('https://sydf.cc/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'https://sydf.cc',
        Referer: 'https://sydf.cc/divination/liuyao',
      },
      body: JSON.stringify({
        model: 'attacker-model',
        stream: false,
        max_tokens: 999999,
        messages: [{ role: 'user', content: '你好' }],
      }),
    });

    const response = await onRequest({
      request,
      env: {
        OPENAI_API_KEY: 'test-openai-key',
        OPENAI_API_BASE: 'https://api.openai.com/v1',
        OPENAI_API_MODEL: 'server-model',
      },
    });

    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.choices[0].message.content).toBe('测试成功');
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
