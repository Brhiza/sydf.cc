// functions/api/ai.js

import { getHttpErrorStatus, proxyAiRequest } from '../_shared/ai-proxy.js';

const TRUSTED_FETCH_SITES = new Set(['same-origin', 'same-site', 'none']);

function parseUrl(value) {
  if (!value) return null;

  try {
    return new URL(value);
  } catch {
    return null;
  }
}

function isLoopbackHost(hostname) {
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1' || hostname === '[::1]';
}

function isTrustedAppUrl(candidateUrl, requestUrl) {
  if (candidateUrl.origin === requestUrl.origin) {
    return true;
  }

  return isLoopbackHost(candidateUrl.hostname) && isLoopbackHost(requestUrl.hostname);
}

function isTrustedBrowserRequest(request) {
  const requestUrl = new URL(request.url);
  const secFetchSite = request.headers.get('Sec-Fetch-Site');
  if (secFetchSite && !TRUSTED_FETCH_SITES.has(secFetchSite)) {
    return false;
  }

  const candidates = [
    parseUrl(request.headers.get('Origin')),
    parseUrl(request.headers.get('Referer')),
  ].filter(Boolean);

  if (candidates.length === 0) {
    return false;
  }

  return candidates.some((candidateUrl) => isTrustedAppUrl(candidateUrl, requestUrl));
}

function applyTrustedCorsHeaders(headers, request) {
  const requestUrl = new URL(request.url);
  const originUrl = parseUrl(request.headers.get('Origin'));

  if (!originUrl || !isTrustedAppUrl(originUrl, requestUrl)) {
    return;
  }

  headers.set('Access-Control-Allow-Origin', originUrl.origin);
  headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');
  headers.set('Access-Control-Max-Age', '86400');
}

function createResponseHeaders(request, extraHeaders) {
  const headers = new Headers(extraHeaders);
  headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Vary', 'Origin, Referer, Sec-Fetch-Site');
  applyTrustedCorsHeaders(headers, request);
  return headers;
}

function jsonResponse(request, body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: createResponseHeaders(request, {
      'Content-Type': 'application/json; charset=utf-8',
    }),
  });
}

function proxyResponse(request, upstreamResponse) {
  const headers = createResponseHeaders(request, upstreamResponse.headers);
  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    statusText: upstreamResponse.statusText,
    headers,
  });
}

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: createResponseHeaders(request),
    });
  }

  if (request.method !== 'POST') {
    return jsonResponse(request, { error: 'Method Not Allowed' }, 405);
  }

  if (!isTrustedBrowserRequest(request)) {
    return jsonResponse(
      request,
      { error: '仅允许本站前端直接调用 /api/ai；第三方调用请改为走你自己的服务端。' },
      403
    );
  }

  const contentType = request.headers.get('Content-Type') || '';
  if (!contentType.toLowerCase().includes('application/json')) {
    return jsonResponse(request, { error: '请求体必须为 application/json。' }, 415);
  }

  let requestBody;
  try {
    requestBody = await request.json();
  } catch {
    return jsonResponse(request, { error: '请求体必须为合法 JSON。' }, 400);
  }

  try {
    const response = await proxyAiRequest(env, requestBody);
    return proxyResponse(request, response);
  } catch (error) {
    const status = getHttpErrorStatus(error) ?? 500;
    const message = error instanceof Error ? error.message : 'Error processing AI request.';
    return jsonResponse(request, { error: message }, status);
  }
}
