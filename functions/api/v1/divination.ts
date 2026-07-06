// functions/api/v1/divination.ts
// 开发者占卜API：生成占卜数据 + AI解读（支持SSE流式）

import { calculateDailyFortune } from '../../../src/services/daily-fortune/index.ts';
import { type DivinationType, type SupplementaryInfo } from '../../../src/types/divination.ts';
import {
  generateMingyuLiuyao,
  generateMingyuMeihua,
  generateMingyuQimen,
  generateMingyuSsgw,
  generateMingyuTarot,
} from '../../../src/shared/mingyu-divination.ts';
import {
  COMPATIBLE_DIVINATION_TYPES,
  isCompatibleDivinationType,
  normalizeDivinationType,
  resolveTarotSpreadType,
} from '../../../src/utils/divination-type.ts';
import {
  getDivinationTime,
  runWithTimezoneOffsetMinutesOverride,
} from '../../../src/utils/timeManager.ts';
import { buildDivinationSystemPrompt } from '../../../src/shared/divination-system-prompt.ts';
import {
  formatQimenSettingsLabel,
  isDefaultQimenSettings,
  resolveQimenSettings,
} from '../../../src/shared/qimen-settings.ts';
import { normalizeMeihuaSettings } from '../../../src/shared/meihua-settings.ts';
import { normalizeBasicSupplementaryInfo } from '../../../src/shared/supplementary-info.ts';
import { normalizeQuestionText } from '../../../src/shared/question-text.ts';
import { proxyAiRequest } from '../../_shared/ai-proxy.js';

interface DivinationRequestOptions {
  spreadType?: string;
  date?: string; // YYYY-MM-DD
  datetime?: string; // ISO 8601（建议携带时区偏移，如 +08:00）
  supplementaryInfo?: SupplementaryInfo;
  temperature?: number;
}

interface DivinationRequestBody {
  type?: unknown;
  question?: unknown;
  stream?: unknown;
  debug?: unknown;
  options?: unknown;
}

interface OpenAiProxyResponse {
  choices?: Array<{
    message?: {
      content?: string | null;
    };
  }>;
  usage?: unknown;
}

const DEV_TZ_OFFSET_MINUTES = 480; // 北京时间 UTC+8
const MAX_REQUEST_BODY_BYTES = 64 * 1024;
const MAX_AI_ERROR_DETAILS_LENGTH = 2000;
const DEFAULT_DEV_API_RATE_LIMIT_MAX = 60;
const DEFAULT_DEV_API_RATE_LIMIT_WINDOW_MS = 60 * 1000;
const rateLimitBuckets = new Map<string, { count: number; startedAt: number; windowMs: number }>();

class RequestBodyError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code: string
  ) {
    super(message);
  }
}

function createRequestId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `req_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  }
}

function getHeaderApiKey(headers: Headers): string | null {
  const xApiKey = headers.get('X-Api-Key');
  if (xApiKey) return xApiKey.trim();

  const auth = headers.get('Authorization');
  if (!auth) return null;
  const match = auth.match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() || null;
}

function parsePositiveInteger(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(String(value ?? ''), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function getRateLimitConfig(env: Record<string, string | undefined>): {
  max: number;
  windowMs: number;
} {
  return {
    max: parsePositiveInteger(env.DEV_API_RATE_LIMIT_MAX, DEFAULT_DEV_API_RATE_LIMIT_MAX),
    windowMs: parsePositiveInteger(
      env.DEV_API_RATE_LIMIT_WINDOW_MS,
      DEFAULT_DEV_API_RATE_LIMIT_WINDOW_MS
    ),
  };
}

function getClientKey(request: Request, apiKey: string): string {
  const forwardedFor =
    request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For');
  const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : new URL(request.url).hostname;
  return `${apiKey}:${ip}`;
}

function cleanupExpiredRateLimitBuckets(now: number): void {
  for (const [key, bucket] of rateLimitBuckets.entries()) {
    if (now - bucket.startedAt >= bucket.windowMs) {
      rateLimitBuckets.delete(key);
    }
  }
}

function checkRateLimit(
  request: Request,
  apiKey: string,
  env: Record<string, string | undefined>
): { limited: false } | { limited: true; retryAfterSeconds: number } {
  const config = getRateLimitConfig(env);
  const now = Date.now();
  cleanupExpiredRateLimitBuckets(now);

  const key = getClientKey(request, apiKey);
  const bucket = rateLimitBuckets.get(key);
  if (!bucket || now - bucket.startedAt >= bucket.windowMs) {
    rateLimitBuckets.set(key, { count: 1, startedAt: now, windowMs: config.windowMs });
    return { limited: false };
  }

  bucket.count += 1;
  if (bucket.count <= config.max) {
    return { limited: false };
  }

  return {
    limited: true,
    retryAfterSeconds: Math.max(1, Math.ceil((bucket.startedAt + bucket.windowMs - now) / 1000)),
  };
}

function getAllowedOrigin(origin: string | null): string | null {
  if (!origin) return null;
  try {
    const url = new URL(origin);
    const hostname = url.hostname.toLowerCase();
    if (hostname === 'xushuo.cc' || hostname.endsWith('.xushuo.cc')) {
      return origin;
    }
    return null;
  } catch {
    return null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function normalizeSupplementaryInfo(value: unknown): SupplementaryInfo | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  const info: SupplementaryInfo = normalizeBasicSupplementaryInfo(value) || {};
  const meihuaSettings = normalizeMeihuaSettings(value.meihuaSettings);
  if (meihuaSettings) {
    info.meihuaSettings = meihuaSettings;
  }
  if (isRecord(value.qimenSettings)) {
    const qimenSettings = resolveQimenSettings(value.qimenSettings);
    if (!isDefaultQimenSettings(qimenSettings)) {
      info.qimenSettings = qimenSettings;
    }
  }
  if (typeof value.date === 'string' && value.date.trim()) {
    info.date = value.date.trim();
  }

  return Object.keys(info).length > 0 ? info : undefined;
}

function normalizeRequestOptions(value: unknown): DivinationRequestOptions {
  if (!isRecord(value)) {
    return {};
  }

  const options: DivinationRequestOptions = {};

  if (typeof value.spreadType === 'string' && value.spreadType.trim()) {
    options.spreadType = value.spreadType.trim();
  }
  if (typeof value.date === 'string' && value.date.trim()) {
    options.date = value.date.trim();
  }
  if (typeof value.datetime === 'string' && value.datetime.trim()) {
    options.datetime = value.datetime.trim();
  }
  if (typeof value.temperature === 'number' && Number.isFinite(value.temperature)) {
    options.temperature = value.temperature;
  }

  const supplementaryInfo = normalizeSupplementaryInfo(value.supplementaryInfo);
  if (supplementaryInfo) {
    options.supplementaryInfo = supplementaryInfo;
  }

  return options;
}

function buildCorsHeaders(origin: string | null): HeadersInit {
  const allowOrigin = getAllowedOrigin(origin);
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Api-Key',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
  if (allowOrigin) {
    headers['Access-Control-Allow-Origin'] = allowOrigin;
  }
  return headers;
}

function jsonResponse(body: unknown, init?: ResponseInit & { origin?: string | null }): Response {
  const origin = init?.origin ?? null;
  const headers = new Headers(init?.headers);
  headers.set('Content-Type', 'application/json; charset=utf-8');
  headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  headers.set('X-Content-Type-Options', 'nosniff');
  const cors = buildCorsHeaders(origin);
  for (const [k, v] of Object.entries(cors)) headers.set(k, v);
  return new Response(JSON.stringify(body), { ...init, headers });
}

function getContentLength(headers: Headers): number | null {
  const raw = headers.get('Content-Length');
  if (!raw) return null;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

async function parseJsonBodyWithLimit(request: Request): Promise<unknown> {
  const contentLength = getContentLength(request.headers);
  if (contentLength !== null && contentLength > MAX_REQUEST_BODY_BYTES) {
    throw new RequestBodyError('请求体过大', 413, 'PAYLOAD_TOO_LARGE');
  }

  if (!request.body) {
    throw new RequestBodyError('请求体必须为JSON', 400, 'BAD_REQUEST');
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;

      total += value.byteLength;
      if (total > MAX_REQUEST_BODY_BYTES) {
        try {
          await reader.cancel();
        } catch {
          // ignore
        }
        throw new RequestBodyError('请求体过大', 413, 'PAYLOAD_TOO_LARGE');
      }
      chunks.push(value);
    }
  } finally {
    try {
      reader.releaseLock();
    } catch {
      // ignore
    }
  }

  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    throw new RequestBodyError('请求体必须为JSON', 400, 'BAD_REQUEST');
  }
}

function truncateErrorDetails(details: string): string {
  return details.length > MAX_AI_ERROR_DETAILS_LENGTH
    ? `${details.slice(0, MAX_AI_ERROR_DETAILS_LENGTH)}...`
    : details;
}

function errorDetailsForDebug(details: string, debug: boolean): string | undefined {
  if (!debug || !details) {
    return undefined;
  }
  return truncateErrorDetails(details);
}

function sseResponse(stream: ReadableStream<Uint8Array>, origin: string | null): Response {
  const headers = new Headers();
  headers.set('Content-Type', 'text/event-stream; charset=utf-8');
  headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  headers.set('Connection', 'keep-alive');
  headers.set('X-Content-Type-Options', 'nosniff');
  // 关闭某些代理的缓冲（有的环境会识别此头）
  headers.set('X-Accel-Buffering', 'no');
  const cors = buildCorsHeaders(origin);
  for (const [k, v] of Object.entries(cors)) headers.set(k, v);
  return new Response(stream, { headers });
}

function parseDateOnly(dateStr: string): Date {
  // 按 YYYY-MM-DD 解析，避免 new Date('YYYY-MM-DD') 的UTC歧义
  const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) throw new Error('date 必须为 YYYY-MM-DD 格式');
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) {
    throw new Error('date 格式不正确');
  }
  if (!isValidDateParts(year, month, day)) {
    throw new Error('date 不是有效日期');
  }

  // 使用“UTC中午”作为锚点，减少时区换算导致的跨日风险
  const date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  return date;
}

function isValidDateParts(year: number, month: number, day: number): boolean {
  const date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  return (
    date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
  );
}

function parseDatetime(datetime: string): Date {
  const dateParts = datetime.match(/^(\d{4})-(\d{2})-(\d{2})(?:[T\s]|$)/);
  if (!dateParts) {
    throw new Error('datetime 必须为 ISO 8601 格式');
  }

  const year = Number(dateParts[1]);
  const month = Number(dateParts[2]);
  const day = Number(dateParts[3]);
  if (!isValidDateParts(year, month, day)) {
    throw new Error('datetime 不是有效日期');
  }

  const d = new Date(datetime);
  if (Number.isNaN(d.getTime())) {
    throw new Error('datetime 不是有效的ISO时间字符串');
  }
  return d;
}

function resolveDivinationDate(
  type: DivinationType,
  options: DivinationRequestOptions,
  baseDate: Date
): Date {
  if (type !== 'daily') {
    return baseDate;
  }

  const dateStr = options.date || options.supplementaryInfo?.date;
  return dateStr ? parseDateOnly(dateStr) : baseDate;
}

function formatTimeInfo(time: ReturnType<typeof getDivinationTime>): string {
  const { timeInfo, ganzhi } = time;
  const solar = timeInfo.solar;
  const lunar = timeInfo.lunar;
  return [
    `公历：${solar.year}年${solar.month}月${solar.day}日 ${solar.hour}时${solar.minute}分`,
    `农历：${lunar.yearInChinese} ${lunar.monthInChinese}${lunar.dayInChinese} ${lunar.hourInChinese}`,
    `干支：${ganzhi.year}年 ${ganzhi.month}月 ${ganzhi.day}日 ${ganzhi.hour}时`,
    `节气：${timeInfo.jieQi}`,
  ].join('\n');
}

function buildUserPrompt(args: {
  type: DivinationType;
  question?: string;
  timeInfoText: string;
  divinationData: unknown;
  supplementaryInfo?: SupplementaryInfo;
}): string {
  const { type, question, timeInfoText, divinationData, supplementaryInfo } = args;

  const supplementaryLines: string[] = [];
  if (supplementaryInfo?.gender) supplementaryLines.push(`性别：${supplementaryInfo.gender}`);
  if (supplementaryInfo?.birthYear)
    supplementaryLines.push(`出生年份：${supplementaryInfo.birthYear}`);
  if (supplementaryInfo?.interpretationStyle)
    supplementaryLines.push(`解读风格：${supplementaryInfo.interpretationStyle}`);
  if (supplementaryInfo?.outputLength)
    supplementaryLines.push(`输出长度：${supplementaryInfo.outputLength}`);
  if (supplementaryInfo?.dayPillar) {
    supplementaryLines.push(
      `日柱：${supplementaryInfo.dayPillar.heavenlyStem}${supplementaryInfo.dayPillar.earthlyBranch}`
    );
  }
  if (supplementaryInfo?.qimenSettings) {
    supplementaryLines.push(
      `奇门排盘：${formatQimenSettingsLabel(supplementaryInfo.qimenSettings)}`
    );
  }

  const questionLine =
    typeof question === 'string' && question.trim()
      ? `【问题】${question.trim()}`
      : type === 'daily'
        ? '【问题】今日运势（通用解读）'
        : '【问题】（未提供，按通用解读处理）';
  const divinationDataJson = JSON.stringify(divinationData);

  return [
    `【类型】${type}`,
    questionLine,
    supplementaryLines.length > 0 ? `【补充信息】\n${supplementaryLines.join('\n')}` : '',
    `【时间信息】\n${timeInfoText}`,
    `【占卜数据（JSON）】\n${divinationDataJson}`,
    '',
    '请严格基于占卜数据进行解读，并把结论落到可执行的建议上。',
  ]
    .filter(Boolean)
    .join('\n\n');
}

async function generateDivinationData(args: {
  type: DivinationType;
  isLegacyTarotSingle: boolean;
  options: DivinationRequestOptions;
  baseDate: Date;
}) {
  const { type, isLegacyTarotSingle, options, baseDate } = args;
  const supplementaryInfo = options.supplementaryInfo;

  if (type === 'daily') {
    return calculateDailyFortune(baseDate);
  }

  if (type === 'liuyao') {
    return generateMingyuLiuyao(baseDate);
  }

  if (type === 'meihua') {
    return generateMingyuMeihua(supplementaryInfo?.meihuaSettings, baseDate);
  }

  if (type === 'qimen') {
    return generateMingyuQimen(supplementaryInfo?.qimenSettings, baseDate);
  }

  if (type === 'ssgw') {
    return generateMingyuSsgw(baseDate);
  }

  if (type === 'tarot') {
    const compatibleTarotType = isLegacyTarotSingle ? 'tarot_single' : 'tarot';
    const spreadType = resolveTarotSpreadType(compatibleTarotType, options.spreadType);
    return generateMingyuTarot(spreadType);
  }

  // 理论上不会走到这里
  throw new Error(`不支持的占卜类型: ${type}`);
}

function buildOpenAiBody(args: {
  systemPrompt: string;
  userPrompt: string;
  stream: boolean;
  temperature?: number;
}) {
  const temperature = typeof args.temperature === 'number' ? args.temperature : 0.7;
  return {
    model: 'ignored-by-proxy',
    messages: [
      { role: 'system', content: args.systemPrompt },
      { role: 'user', content: args.userPrompt },
    ],
    temperature,
    stream: args.stream,
    max_tokens: 4096,
  };
}

export async function onRequest(context: {
  request: Request;
  env: Record<string, string | undefined>;
}) {
  const { request, env } = context;
  const origin = request.headers.get('Origin');

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: buildCorsHeaders(origin) });
  }

  if (request.method !== 'POST') {
    return jsonResponse(
      { ok: false, error: { code: 'METHOD_NOT_ALLOWED', message: '仅支持 POST 请求' } },
      { status: 405, origin }
    );
  }

  const devApiKey = env.DEV_API_KEY;
  if (!devApiKey) {
    return jsonResponse(
      { ok: false, error: { code: 'SERVER_NOT_CONFIGURED', message: 'DEV_API_KEY 未配置' } },
      { status: 500, origin }
    );
  }

  const providedKey = getHeaderApiKey(request.headers);
  if (!providedKey || providedKey !== devApiKey) {
    return jsonResponse(
      { ok: false, error: { code: 'UNAUTHORIZED', message: 'API Key 无效或缺失' } },
      { status: 401, origin }
    );
  }

  const rateLimit = checkRateLimit(request, providedKey, env);
  if (rateLimit.limited) {
    return jsonResponse(
      { ok: false, error: { code: 'RATE_LIMITED', message: '请求过于频繁，请稍后再试' } },
      {
        status: 429,
        origin,
        headers: {
          'Retry-After': String(rateLimit.retryAfterSeconds),
        },
      }
    );
  }

  const requestId = createRequestId();

  // 统一把占卜相关时间计算固定到北京时间（UTC+8）
  return runWithTimezoneOffsetMinutesOverride(DEV_TZ_OFFSET_MINUTES, async () => {
    let body: DivinationRequestBody;
    try {
      const parsedBody = await parseJsonBodyWithLimit(request);
      body = isRecord(parsedBody) ? parsedBody : {};
    } catch (error) {
      const bodyError =
        error instanceof RequestBodyError
          ? error
          : new RequestBodyError('请求体必须为JSON', 400, 'BAD_REQUEST');
      return jsonResponse(
        { ok: false, requestId, error: { code: bodyError.code, message: bodyError.message } },
        { status: bodyError.status, origin }
      );
    }

    const type = body?.type;
    if (typeof type !== 'string' || !isCompatibleDivinationType(type)) {
      return jsonResponse(
        {
          ok: false,
          requestId,
          error: {
            code: 'BAD_REQUEST',
            message: `type 不合法，必须为：${COMPATIBLE_DIVINATION_TYPES.join(' | ')}`,
          },
        },
        { status: 400, origin }
      );
    }
    const normalizedType = normalizeDivinationType(type);
    const isLegacyTarotSingle = type === 'tarot_single';
    const question = normalizeQuestionText(body.question) || undefined;
    const options = normalizeRequestOptions(body.options);

    if (type !== 'daily') {
      if (!question?.trim()) {
        return jsonResponse(
          {
            ok: false,
            requestId,
            error: { code: 'BAD_REQUEST', message: '除 daily 外必须提供 question' },
          },
          { status: 400, origin }
        );
      }
    }

    let baseDate: Date;
    let divinationDate: Date;
    try {
      baseDate = (() => {
        const dt = options.datetime;
        if (dt) return parseDatetime(dt);
        return new Date();
      })();
      divinationDate = resolveDivinationDate(normalizedType, options, baseDate);
    } catch (error) {
      const message = error instanceof Error ? error.message : '时间参数不正确';
      return jsonResponse(
        { ok: false, requestId, error: { code: 'BAD_REQUEST', message } },
        { status: 400, origin }
      );
    }

    let divinationData: unknown;
    try {
      divinationData = await generateDivinationData({
        type: normalizedType,
        isLegacyTarotSingle,
        options,
        baseDate: divinationDate,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : '生成占卜数据失败';
      return jsonResponse(
        { ok: false, requestId, error: { code: 'DIVINATION_FAILED', message } },
        { status: 400, origin }
      );
    }

    // 时间信息：使用同一时间点生成，便于AI解读（北京时间）
    const timeInfoText = formatTimeInfo(getDivinationTime(divinationDate));

    const supplementaryInfo = options.supplementaryInfo;
    const systemPrompt = buildDivinationSystemPrompt(normalizedType, {
      strictDataOnly: true,
      requireStructuredSections: true,
      interpretationStyle: supplementaryInfo?.interpretationStyle,
      outputLength: supplementaryInfo?.outputLength,
    });
    const userPrompt = buildUserPrompt({
      type: normalizedType,
      question,
      timeInfoText,
      divinationData,
      supplementaryInfo,
    });

    const stream = body.stream === true;
    const debug = body.debug === true;
    const temperature = options.temperature;

    const aiBody = buildOpenAiBody({ systemPrompt, userPrompt, stream, temperature });

    if (!stream) {
      let aiResp: Response;
      try {
        aiResp = await proxyAiRequest(env, aiBody);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'AI 请求失败';
        return jsonResponse(
          { ok: false, requestId, error: { code: 'AI_REQUEST_FAILED', message } },
          { status: 502, origin }
        );
      }

      if (!aiResp.ok) {
        const errText = await aiResp.text().catch(() => '');
        return jsonResponse(
          {
            ok: false,
            requestId,
            error: {
              code: 'AI_ERROR',
              message: `AI 服务返回错误：${aiResp.status}`,
              details: errorDetailsForDebug(errText, debug),
            },
          },
          { status: 502, origin }
        );
      }

      let aiJson: OpenAiProxyResponse;
      let aiRaw = '';
      try {
        aiRaw = await aiResp.text();
        aiJson = JSON.parse(aiRaw) as OpenAiProxyResponse;
      } catch {
        return jsonResponse(
          {
            ok: false,
            requestId,
            error: {
              code: 'AI_BAD_RESPONSE',
              message: 'AI 返回非JSON',
              details: errorDetailsForDebug(aiRaw, debug),
            },
          },
          { status: 502, origin }
        );
      }

      const content = aiJson?.choices?.[0]?.message?.content ?? null;
      const usage = aiJson?.usage ?? undefined;

      return jsonResponse(
        {
          ok: true,
          requestId,
          type: normalizedType,
          divination: divinationData,
          interpretation: content,
          ...(usage ? { usage } : {}),
          ...(debug
            ? { debug: { prompt: { system: systemPrompt, user: userPrompt }, raw: aiJson } }
            : {}),
        },
        { status: 200, origin }
      );
    }

    // SSE 流式：先发 meta，再透传 /api/ai 的 SSE
    const encoder = new TextEncoder();
    const abortController = new AbortController();

    const sseStream = new ReadableStream<Uint8Array>({
      async start(controller) {
        const write = (text: string) => controller.enqueue(encoder.encode(text));
        const writeEvent = (eventName: string, data: unknown) => {
          write(`event: ${eventName}\n`);
          write(`data: ${JSON.stringify(data)}\n\n`);
        };

        writeEvent('meta', {
          requestId,
          type: normalizedType,
          divination: divinationData,
          ...(debug ? { debug: { prompt: { system: systemPrompt, user: userPrompt } } } : {}),
        });

        let aiResp: Response;
        try {
          aiResp = await proxyAiRequest(env, aiBody, {
            signal: abortController.signal,
          });
        } catch (error) {
          const message = error instanceof Error ? error.message : 'AI 请求失败';
          writeEvent('error', { requestId, code: 'AI_REQUEST_FAILED', message });
          controller.close();
          return;
        }

        if (!aiResp.ok) {
          const errText = await aiResp.text().catch(() => '');
          writeEvent('error', {
            requestId,
            code: 'AI_ERROR',
            message: `AI 服务返回错误：${aiResp.status}`,
            details: errorDetailsForDebug(errText, debug),
          });
          controller.close();
          return;
        }

        const contentType = aiResp.headers.get('Content-Type') || '';
        if (!contentType.includes('text/event-stream')) {
          const raw = await aiResp.text().catch(() => '');
          writeEvent('error', {
            requestId,
            code: 'AI_BAD_RESPONSE',
            message: 'AI 返回非SSE流式响应',
            details: errorDetailsForDebug(raw, debug),
          });
          controller.close();
          return;
        }

        if (!aiResp.body) {
          writeEvent('error', { requestId, code: 'AI_BAD_RESPONSE', message: 'AI 响应体为空' });
          controller.close();
          return;
        }

        const reader = aiResp.body.getReader();
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            if (value) controller.enqueue(value);
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : 'SSE 读取失败';
          writeEvent('error', { requestId, code: 'STREAM_ERROR', message });
        } finally {
          try {
            reader.releaseLock();
          } catch {
            // ignore
          }
          controller.close();
        }
      },
      cancel() {
        abortController.abort('客户端已断开');
      },
    });

    return sseResponse(sseStream, origin);
  });
}

export function resetDevApiDivinationRateLimitForTests() {
  rateLimitBuckets.clear();
}
