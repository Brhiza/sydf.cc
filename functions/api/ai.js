// functions/api/ai.js

import { getHttpErrorStatus, proxyAiRequest } from '../_shared/ai-proxy.js';

const TRUSTED_FETCH_SITES = new Set(['same-origin', 'same-site', 'none']);
const DEFAULT_RATE_LIMIT_MAX = 20;
const DEFAULT_RATE_LIMIT_WINDOW_MS = 60 * 1000;
const UPSTREAM_RESPONSE_HEADERS_TO_STRIP = [
  'Access-Control-Allow-Credentials',
  'Access-Control-Allow-Headers',
  'Access-Control-Allow-Methods',
  'Access-Control-Allow-Origin',
  'Access-Control-Expose-Headers',
  'Access-Control-Max-Age',
  'Connection',
  'Content-Encoding',
  'Content-Length',
  'Keep-Alive',
  'Set-Cookie',
  'Transfer-Encoding',
  'Upgrade',
];
const rateLimitBuckets = new Map();

function parseUrl(value) {
  if (!value) return null;

  try {
    return new URL(value);
  } catch {
    return null;
  }
}

function isLoopbackHost(hostname) {
  return (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '::1' ||
    hostname === '[::1]'
  );
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

  const originUrl = parseUrl(request.headers.get('Origin'));
  const refererUrl = parseUrl(request.headers.get('Referer'));
  if (!originUrl || !refererUrl) {
    return false;
  }

  return isTrustedAppUrl(originUrl, requestUrl) && isTrustedAppUrl(refererUrl, requestUrl);
}

function parsePositiveInteger(value, fallback) {
  const parsed = Number.parseInt(String(value ?? ''), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function getRateLimitConfig(env) {
  return {
    max: parsePositiveInteger(env.AI_PROXY_RATE_LIMIT_MAX, DEFAULT_RATE_LIMIT_MAX),
    windowMs: parsePositiveInteger(env.AI_PROXY_RATE_LIMIT_WINDOW_MS, DEFAULT_RATE_LIMIT_WINDOW_MS),
  };
}

function getClientKey(request) {
  const forwardedFor =
    request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  return new URL(request.url).hostname;
}

function cleanupExpiredRateLimitBuckets(now) {
  for (const [key, bucket] of rateLimitBuckets.entries()) {
    if (now - bucket.startedAt >= bucket.windowMs) {
      rateLimitBuckets.delete(key);
    }
  }
}

function checkRateLimit(request, env) {
  const config = getRateLimitConfig(env);
  const now = Date.now();
  cleanupExpiredRateLimitBuckets(now);

  const key = getClientKey(request);
  const bucket = rateLimitBuckets.get(key);
  if (!bucket || now - bucket.startedAt >= bucket.windowMs) {
    rateLimitBuckets.set(key, { count: 1, startedAt: now, windowMs: config.windowMs });
    return { limited: false };
  }

  bucket.count += 1;
  if (bucket.count <= config.max) {
    return { limited: false };
  }

  const retryAfterSeconds = Math.max(
    1,
    Math.ceil((bucket.startedAt + bucket.windowMs - now) / 1000)
  );
  return { limited: true, retryAfterSeconds };
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
  for (const headerName of UPSTREAM_RESPONSE_HEADERS_TO_STRIP) {
    headers.delete(headerName);
  }
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

function rateLimitResponse(request, retryAfterSeconds) {
  const headers = createResponseHeaders(request, {
    'Content-Type': 'application/json; charset=utf-8',
    'Retry-After': String(retryAfterSeconds),
  });
  return new Response(JSON.stringify({ error: '请求过于频繁，请稍后再试。' }), {
    status: 429,
    headers,
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

  const rateLimit = checkRateLimit(request, env);
  if (rateLimit.limited) {
    return rateLimitResponse(request, rateLimit.retryAfterSeconds);
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

export function resetApiAiRateLimitForTests() {
  rateLimitBuckets.clear();
}
