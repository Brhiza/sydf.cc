// functions/api/v1/divination.ts
// 开发者占卜API：生成占卜数据 + AI解读（支持SSE流式）

import { calculateDailyFortune } from '../../../src/services/algorithms/daily.ts';
import { generateLiuyao } from '../../../src/services/algorithms/liuyao.ts';
import { generateMeihua } from '../../../src/services/algorithms/meihua.ts';
import { generateQimen } from '../../../src/services/algorithms/qimen.ts';
import { SSGW_SIGNS } from '../../../src/utils/ssgw-data.ts';
import { drawSingleCard, drawSpreadCards, getCardKeywords, tarotSpreads } from '../../../src/utils/tarot.ts';
import { getDivinationTime, setTimezoneOffsetMinutesOverride } from '../../../src/utils/timeManager.ts';
import { buildDivinationSystemPrompt } from '../../../src/shared/divination-system-prompt.ts';
import { proxyAiRequest } from '../../_shared/ai-proxy.js';

type DivinationType = 'daily' | 'liuyao' | 'meihua' | 'qimen' | 'ssgw' | 'tarot' | 'tarot_single';

interface SupplementaryInfo {
  gender?: '男' | '女';
  birthYear?: number;
  interpretationStyle?: '入门' | '专业';
  outputLength?: '精简' | '详细' | '超详细';
  meihuaSettings?: {
    method?: 'time' | 'number' | 'random' | 'external';
    number?: number;
    externalOmens?: {
      direction?: '东' | '东南' | '南' | '西南' | '西' | '西北' | '北' | '东北';
      count?: number;
      person?: '老父' | '老妇' | '长男' | '长女' | '中男' | '中女' | '少男' | '少女';
      animal?: '马' | '牛' | '龙' | '鸡' | '猪' | '雉' | '狗' | '羊';
      object?: '金玉圆器' | '布帛陶器' | '竹木乐器' | '绳索长木' | '水器液体' | '火电文书' | '石块门板' | '刀剪口器';
      sound?: '洪亮金石' | '沉厚低缓' | '雷鸣震动' | '风声呼啸' | '流水滴答' | '爆裂鸣叫' | '闷阻叩击' | '清脆笑语';
      color?: '金白' | '土黄' | '青碧' | '青绿' | '黑蓝' | '赤紫' | '棕黄' | '银白';
    };
  };
  date?: string; // YYYY-MM-DD，仅用于今日运势
}

interface DivinationRequestBody {
  type: DivinationType;
  question?: string;
  stream?: boolean;
  debug?: boolean;
  options?: {
    spreadType?: string;
    signNumber?: number;
    date?: string; // YYYY-MM-DD
    datetime?: string; // ISO 8601（建议携带时区偏移，如 +08:00）
    supplementaryInfo?: SupplementaryInfo;
    temperature?: number;
  };
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

function buildCorsHeaders(origin: string | null): HeadersInit {
  const allowOrigin = getAllowedOrigin(origin);
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Api-Key',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  };
  if (allowOrigin) {
    headers['Access-Control-Allow-Origin'] = allowOrigin;
  }
  return headers;
}

function jsonResponse(
  body: unknown,
  init?: ResponseInit & { origin?: string | null }
): Response {
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
  // 使用“UTC中午”作为锚点，减少时区换算导致的跨日风险
  return new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
}

function parseDatetime(datetime: string): Date {
  const d = new Date(datetime);
  if (Number.isNaN(d.getTime())) {
    throw new Error('datetime 不是有效的ISO时间字符串');
  }
  return d;
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
  if (supplementaryInfo?.birthYear) supplementaryLines.push(`出生年份：${supplementaryInfo.birthYear}`);
  if (supplementaryInfo?.interpretationStyle) supplementaryLines.push(`解读风格：${supplementaryInfo.interpretationStyle}`);
  if (supplementaryInfo?.outputLength) supplementaryLines.push(`输出长度：${supplementaryInfo.outputLength}`);

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

async function generateDivinationData(type: DivinationType, body: DivinationRequestBody, baseDate: Date) {
  const options = body.options || {};
  const supplementaryInfo = options.supplementaryInfo;

  if (type === 'daily') {
    const dateStr = options.date || supplementaryInfo?.date;
    const targetDate = dateStr ? parseDateOnly(dateStr) : baseDate;
    return calculateDailyFortune(targetDate);
  }

  if (type === 'liuyao') {
    return generateLiuyao(baseDate);
  }

  if (type === 'meihua') {
    return generateMeihua(baseDate, supplementaryInfo?.meihuaSettings);
  }

  if (type === 'qimen') {
    return generateQimen(baseDate);
  }

  if (type === 'ssgw') {
    const { ganzhi, timestamp } = getDivinationTime(baseDate);
    const signs = SSGW_SIGNS;
    const total = signs.length;
    const signNumber = options.signNumber;

    let sign = null as (typeof signs)[number] | null;
    if (typeof signNumber === 'number') {
      if (!Number.isInteger(signNumber)) throw new Error('signNumber 必须为整数');
      if (signNumber < 1 || signNumber > total) throw new Error(`signNumber 必须在 1 到 ${total} 之间`);
      sign = signs.find((s) => s.id === signNumber) || null;
      if (!sign) throw new Error(`未找到签号为 ${signNumber} 的灵签`);
    } else {
      sign = signs[Math.floor(Math.random() * total)] || null;
    }

    return {
      number: sign.id,
      title: sign.title,
      poem: sign.qianwen,
      story: sign.story,
      details: sign.details,
      timestamp,
      ganzhi,
    };
  }

  if (type === 'tarot') {
    const spreadType = (body.options?.spreadType || 'three') as keyof typeof tarotSpreads;
    const result = drawSpreadCards(spreadType);
    const cards = result.cards.map((c) => ({
      id: c.card.number,
      name: c.card.name,
      position: c.position,
      reversed: c.isReversed,
      keywords: getCardKeywords(c.card.name).split(','),
    }));
    return { ...result, cards };
  }

  if (type === 'tarot_single') {
    const single = drawSingleCard();
    const card = {
      id: single.card.number,
      name: single.card.name,
      position: single.position,
      reversed: single.isReversed,
      keywords: getCardKeywords(single.card.name).split(','),
    };
    return {
      spreadType: 'single',
      spreadName: '单牌指引',
      cards: [card],
      timestamp: single.timestamp,
    };
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

export async function onRequest(context: { request: Request; env: Record<string, string | undefined> }) {
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
    body = (await request.json()) as DivinationRequestBody;
  } catch {
    return jsonResponse(
      { ok: false, requestId, error: { code: 'BAD_REQUEST', message: '请求体必须为JSON' } },
      { status: 400, origin }
    );
  }

  const type = body?.type;
  const supportedTypes: DivinationType[] = ['daily', 'liuyao', 'meihua', 'qimen', 'ssgw', 'tarot', 'tarot_single'];
  if (!type || !supportedTypes.includes(type)) {
    return jsonResponse(
      {
        ok: false,
        requestId,
        error: { code: 'BAD_REQUEST', message: `type 不合法，必须为：${supportedTypes.join(' | ')}` },
      },
      { status: 400, origin }
    );
  }

  if (type !== 'daily') {
    if (typeof body.question !== 'string' || !body.question.trim()) {
      return jsonResponse(
        { ok: false, requestId, error: { code: 'BAD_REQUEST', message: '除 daily 外必须提供 question' } },
        { status: 400, origin }
      );
    }
  }

  const baseDate = (() => {
    const dt = body.options?.datetime;
    if (typeof dt === 'string' && dt.trim()) return parseDatetime(dt.trim());
    return new Date();
  })();

  let divinationData: unknown;
  try {
    divinationData = await generateDivinationData(type, body, baseDate);
  } catch (error) {
    const message = error instanceof Error ? error.message : '生成占卜数据失败';
    return jsonResponse(
      { ok: false, requestId, error: { code: 'DIVINATION_FAILED', message } },
      { status: 400, origin }
    );
  }

  // 时间信息：使用同一时间点生成，便于AI解读（北京时间）
  const timeInfoText = formatTimeInfo(getDivinationTime(baseDate));

  const supplementaryInfo = body.options?.supplementaryInfo;
  const systemPrompt = buildDivinationSystemPrompt(type, {
    strictDataOnly: true,
    requireStructuredSections: true,
    interpretationStyle: supplementaryInfo?.interpretationStyle,
    outputLength: supplementaryInfo?.outputLength,
  });
  const userPrompt = buildUserPrompt({
    type,
    question: body.question,
    timeInfoText,
    divinationData,
    supplementaryInfo,
  });

  const stream = !!body.stream;
  const debug = !!body.debug;
  const temperature = body.options?.temperature;

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
        { ok: false, requestId, error: { code: 'AI_BAD_RESPONSE', message: 'AI 返回非JSON', details: raw || undefined } },
        { status: 502, origin }
      );
    }

    const content = aiJson?.choices?.[0]?.message?.content ?? null;
    const usage = aiJson?.usage ?? undefined;

    return jsonResponse(
      {
        ok: true,
        requestId,
        type,
        divination: divinationData,
        interpretation: content,
        ...(usage ? { usage } : {}),
        ...(debug ? { debug: { prompt: { system: systemPrompt, user: userPrompt }, raw: aiJson } } : {}),
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
        type,
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
