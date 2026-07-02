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
  setTimezoneOffsetMinutesOverride,
} from '../../../src/utils/timeManager.ts';
import { buildDivinationSystemPrompt } from '../../../src/shared/divination-system-prompt.ts';
import { formatQimenSettingsLabel } from '../../../src/shared/qimen-settings.ts';
import { normalizeMeihuaSettings } from '../../../src/shared/meihua-settings.ts';
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
const MIN_BIRTH_YEAR = 1900;
const MAX_BIRTH_YEAR = 2100;
const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'] as const;
const EARTHLY_BRANCHES = [
  '子',
  '丑',
  '寅',
  '卯',
  '辰',
  '巳',
  '午',
  '未',
  '申',
  '酉',
  '戌',
  '亥',
] as const;

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

function resolveBirthYear(value: unknown): number | undefined {
  return typeof value === 'number' &&
    Number.isInteger(value) &&
    value >= MIN_BIRTH_YEAR &&
    value <= MAX_BIRTH_YEAR
    ? value
    : undefined;
}

function resolveLiteral<T extends string>(value: unknown, values: readonly T[]): T | undefined {
  return typeof value === 'string' && values.includes(value as T) ? (value as T) : undefined;
}

function normalizeSupplementaryInfo(value: unknown): SupplementaryInfo | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  const info: SupplementaryInfo = {};

  if (value.gender === '男' || value.gender === '女') {
    info.gender = value.gender;
  }
  const birthYear = resolveBirthYear(value.birthYear);
  if (birthYear) {
    info.birthYear = birthYear;
  }
  if (value.interpretationStyle === '入门' || value.interpretationStyle === '专业') {
    info.interpretationStyle = value.interpretationStyle;
  }
  if (
    value.outputLength === '精简' ||
    value.outputLength === '详细' ||
    value.outputLength === '超详细'
  ) {
    info.outputLength = value.outputLength;
  }
  const heavenlyStem = isRecord(value.dayPillar)
    ? resolveLiteral(value.dayPillar.heavenlyStem, HEAVENLY_STEMS)
    : undefined;
  const earthlyBranch = isRecord(value.dayPillar)
    ? resolveLiteral(value.dayPillar.earthlyBranch, EARTHLY_BRANCHES)
    : undefined;
  if (heavenlyStem && earthlyBranch) {
    info.dayPillar = {
      heavenlyStem,
      earthlyBranch,
    };
  }
  const meihuaSettings = normalizeMeihuaSettings(value.meihuaSettings);
  if (meihuaSettings) {
    info.meihuaSettings = meihuaSettings;
  }
  if (isRecord(value.qimenSettings)) {
    info.qimenSettings = value.qimenSettings as SupplementaryInfo['qimenSettings'];
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
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
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

  return [
    `【类型】${type}`,
    questionLine,
    supplementaryLines.length > 0 ? `【补充信息】\n${supplementaryLines.join('\n')}` : '',
    `【时间信息】\n${timeInfoText}`,
    `【占卜数据（JSON）】\n${JSON.stringify(divinationData, null, 2)}`,
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

  const requestId = createRequestId();

  // 统一把占卜相关时间计算固定到北京时间（UTC+8）
  setTimezoneOffsetMinutesOverride(DEV_TZ_OFFSET_MINUTES);

  let body: DivinationRequestBody;
  try {
    const parsedBody = await request.json();
    body = isRecord(parsedBody) ? parsedBody : {};
  } catch {
    return jsonResponse(
      { ok: false, requestId, error: { code: 'BAD_REQUEST', message: '请求体必须为JSON' } },
      { status: 400, origin }
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
  const question = typeof body.question === 'string' ? body.question : undefined;
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
            details: errText || undefined,
          },
        },
        { status: 502, origin }
      );
    }

    let aiJson: OpenAiProxyResponse | null = null;
    try {
      aiJson = await aiResp.json();
    } catch {
      const raw = await aiResp.text().catch(() => '');
      return jsonResponse(
        {
          ok: false,
          requestId,
          error: { code: 'AI_BAD_RESPONSE', message: 'AI 返回非JSON', details: raw || undefined },
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
          details: errText || undefined,
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
          details: raw || undefined,
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
}
