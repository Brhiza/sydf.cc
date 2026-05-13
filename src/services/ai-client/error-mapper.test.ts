import { describe, expect, it } from 'vitest';
import { buildErrorFromResponse, getHttpErrorMessage } from './error-mapper';

describe('getHttpErrorMessage', () => {
  it('返回已知状态码的中文提示', () => {
    expect(getHttpErrorMessage(400)).toBe('请求参数错误');
    expect(getHttpErrorMessage(401)).toBe('API密钥无效或已过期');
    expect(getHttpErrorMessage(403)).toBe('访问被拒绝，请检查API权限');
    expect(getHttpErrorMessage(404)).toBe('API端点不存在，请检查地址是否正确');
    expect(getHttpErrorMessage(429)).toBe('请求过于频繁，请稍等片刻或者更换模型重试');
    expect(getHttpErrorMessage(500)).toBe('服务器内部错误');
    expect(getHttpErrorMessage(502)).toBe('网关错误，服务暂时不可用');
    expect(getHttpErrorMessage(503)).toBe('服务暂时不可用');
    expect(getHttpErrorMessage(504)).toBe('请求超时，请稍后重试');
  });

  it('未知 5xx 错误回退到服务器错误', () => {
    expect(getHttpErrorMessage(599)).toBe('服务器错误');
    expect(getHttpErrorMessage(501)).toBe('服务器错误');
  });

  it('未知 4xx 错误回退到请求失败', () => {
    expect(getHttpErrorMessage(418)).toBe('请求失败');
    expect(getHttpErrorMessage(422)).toBe('请求失败');
  });
});

function createResponse(status: number, body: unknown, statusText = 'Error'): Response {
  return new Response(JSON.stringify(body), {
    status,
    statusText,
    headers: { 'Content-Type': 'application/json' },
  });
}

function createNonJsonResponse(status: number, statusText = 'Error'): Response {
  return new Response('<html>broken</html>', {
    status,
    statusText,
    headers: { 'Content-Type': 'text/html' },
  });
}

describe('buildErrorFromResponse', () => {
  it('提取 error.message 字段并附带状态码', async () => {
    const response = createResponse(401, { error: { message: 'Invalid API key' } });
    const error = await buildErrorFromResponse(response);
    expect(error.message).toContain('API密钥无效或已过期');
    expect(error.message).toContain('401');
    expect(error.message).toContain('Invalid API key');
  });

  it('回退到 message 字段', async () => {
    const response = createResponse(429, { message: 'rate limited' });
    const error = await buildErrorFromResponse(response);
    expect(error.message).toContain('请求过于频繁');
    expect(error.message).toContain('rate limited');
  });

  it('无解析字段时使用 statusText', async () => {
    const response = createResponse(500, {}, 'Internal Server Error');
    const error = await buildErrorFromResponse(response);
    expect(error.message).toContain('服务器内部错误');
    expect(error.message).toContain('Internal Server Error');
  });

  it('JSON 解析失败时使用 statusText', async () => {
    const response = createNonJsonResponse(503, 'Service Unavailable');
    const error = await buildErrorFromResponse(response);
    expect(error.message).toContain('服务暂时不可用');
    expect(error.message).toContain('Service Unavailable');
  });
});
