import { afterEach, describe, expect, it, vi } from 'vitest';

import { onRequest, resetApiAiRateLimitForTests } from '../../functions/api/ai.js';

describe('/api/ai 安全限制', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    resetApiAiRateLimitForTests();
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

  it('拒绝只有 Origin 的伪造同源请求', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const request = new Request('https://sydf.cc/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'https://sydf.cc',
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

  it('允许超过旧限制但低于默认限制的单条消息', async () => {
    const longContent = '问'.repeat(30000);
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const upstreamRequest = input instanceof Request ? input : new Request(input);
      const payload = await upstreamRequest.clone().json();

      expect(payload.messages).toEqual([{ role: 'user', content: longContent }]);

      return new Response(
        JSON.stringify({
          choices: [
            {
              message: {
                content: '长消息测试成功',
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
        Referer: 'https://sydf.cc/divination/qimen',
      },
      body: JSON.stringify({
        stream: false,
        messages: [{ role: 'user', content: longContent }],
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

    expect(response.status).toBe(200);
    expect(data.choices[0].message.content).toBe('长消息测试成功');
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('允许通过环境变量收紧单条消息长度限制', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const request = new Request('https://sydf.cc/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'https://sydf.cc',
        Referer: 'https://sydf.cc/divination/qimen',
      },
      body: JSON.stringify({
        stream: false,
        messages: [{ role: 'user', content: '问'.repeat(1001) }],
      }),
    });

    const response = await onRequest({
      request,
      env: {
        OPENAI_API_KEY: 'test-openai-key',
        OPENAI_API_MODEL: 'server-model',
        AI_PROXY_MAX_MESSAGE_CONTENT_LENGTH: '1000',
      },
    });
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain('不能超过 1000 个字符');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('同一客户端超过限额时不再转发上游 AI', async () => {
    const fetchMock = vi.fn(
      async () =>
        new Response(JSON.stringify({ choices: [{ message: { content: '测试成功' } }] }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
    );
    vi.stubGlobal('fetch', fetchMock);

    const createRequest = () =>
      new Request('https://sydf.cc/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Origin: 'https://sydf.cc',
          Referer: 'https://sydf.cc/divination/liuyao',
          'CF-Connecting-IP': '203.0.113.10',
        },
        body: JSON.stringify({
          stream: false,
          messages: [{ role: 'user', content: '你好' }],
        }),
      });

    const env = {
      OPENAI_API_KEY: 'test-openai-key',
      OPENAI_API_MODEL: 'server-model',
      AI_PROXY_RATE_LIMIT_MAX: '1',
      AI_PROXY_RATE_LIMIT_WINDOW_MS: '60000',
    };

    const firstResponse = await onRequest({ request: createRequest(), env });
    const secondResponse = await onRequest({ request: createRequest(), env });
    const secondData = await secondResponse.json();

    expect(firstResponse.status).toBe(200);
    expect(secondResponse.status).toBe(429);
    expect(secondResponse.headers.get('Retry-After')).toBe('60');
    expect(secondData.error).toContain('请求过于频繁');
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('不透传上游响应里的敏感头和跨域头', async () => {
    const fetchMock = vi.fn(
      async () =>
        new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://evil.example',
            'Access-Control-Allow-Credentials': 'true',
            'Content-Encoding': 'gzip',
            'Content-Length': '999',
            'Set-Cookie': 'sid=upstream; HttpOnly',
          },
        })
    );
    vi.stubGlobal('fetch', fetchMock);

    const request = new Request('https://sydf.cc/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'https://sydf.cc',
        Referer: 'https://sydf.cc/divination/liuyao',
      },
      body: JSON.stringify({
        stream: false,
        messages: [{ role: 'user', content: '你好' }],
      }),
    });

    const response = await onRequest({
      request,
      env: {
        OPENAI_API_KEY: 'test-openai-key',
        OPENAI_API_MODEL: 'server-model',
      },
    });

    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toContain('application/json');
    expect(response.headers.get('Access-Control-Allow-Origin')).toBe('https://sydf.cc');
    expect(response.headers.get('Access-Control-Allow-Credentials')).toBeNull();
    expect(response.headers.get('Content-Encoding')).toBeNull();
    expect(response.headers.get('Content-Length')).toBeNull();
    expect(response.headers.get('Set-Cookie')).toBeNull();
  });
});
