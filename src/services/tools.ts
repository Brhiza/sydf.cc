import { LunarUtil } from '@/utils/lunar';

export interface GanzhiQueryContext {
  resolution: 'date' | 'month' | 'year';
  message: string;
}

const FULL_PROMPT_LABEL_PATTERNS = [
  /\*\*当前追问\*\*[：:]\s*([^\n]+)/,
  /用户追问[：:]\s*([^\n]+)/,
  /【问题】([^\n]+)/,
];

const CALENDAR_RESOLUTION_KEYWORDS =
  /(干支|农历|节气|公历|日柱|月柱|年柱|时柱|运势|吉日|择日|宜|不宜|适合|哪天|哪几天|哪个月|哪一年|日期|日子|每日|每月)/;

function pad2(value: number): string {
  return String(value).padStart(2, '0');
}

function createAnchoredDate(year: number, month: number, day: number): Date {
  return new Date(year, month - 1, day, 12, 0, 0, 0);
}

function isValidDateParts(year: number, month: number, day: number): boolean {
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    return false;
  }
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return false;
  }

  const date = createAnchoredDate(year, month, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

function shiftAnchoredDate(baseDate: Date, diffDays: number): Date {
  const anchored = new Date(baseDate);
  anchored.setHours(12, 0, 0, 0);
  anchored.setDate(anchored.getDate() + diffDays);
  return anchored;
}

function shiftMonth(baseDate: Date, diffMonths: number): { year: number; month: number } {
  const anchored = new Date(baseDate);
  anchored.setHours(12, 0, 0, 0);
  anchored.setDate(1);
  anchored.setMonth(anchored.getMonth() + diffMonths);
  return {
    year: anchored.getFullYear(),
    month: anchored.getMonth() + 1,
  };
}

function shiftYear(baseDate: Date, diffYears: number): number {
  return baseDate.getFullYear() + diffYears;
}

function formatDateLabel(date: Date): string {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

function formatDateContext(date: Date): GanzhiQueryContext {
  const timeInfo = LunarUtil.getTimeInfo(date);
  const display = LunarUtil.formatTimeDisplay(timeInfo);
  return {
    resolution: 'date',
    message: [
      `以下是 ${formatDateLabel(date)} 对应的精确历法信息（按中午 12 点锚定，适用于日级分析）：`,
      display.solar,
      display.lunar,
      display.ganzhi,
      `节气：${timeInfo.jieQi}`,
    ].join('\n'),
  };
}

function formatMonthContext(year: number, month: number): GanzhiQueryContext {
  const monthRows = LunarUtil.getGanZhiForMonth(year, month);
  return {
    resolution: 'month',
    message: [
      `以下是 ${year}年${month}月 的每日干支信息（已由程序精确计算）：`,
      ...monthRows.map((row) => `${row.date}｜${row.lunarDate}｜日干支：${row.ganZhi}`),
    ].join('\n'),
  };
}

function formatYearContext(year: number): GanzhiQueryContext {
  const yearRows = LunarUtil.getGanZhiForYear(year);
  return {
    resolution: 'year',
    message: [
      `以下是 ${year}年 的各月月干支信息（已由程序精确计算）：`,
      ...yearRows.map((row) => `${year}年${row.month}月｜月干支：${row.ganZhi}`),
    ].join('\n'),
  };
}

function parseAbsoluteDate(text: string): GanzhiQueryContext | null {
  const match = text.match(/(?<!\d)(\d{4})[年/.-](\d{1,2})[月/.-](\d{1,2})(?:日|号)?(?!\d)/);
  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (!isValidDateParts(year, month, day)) {
    return null;
  }

  return formatDateContext(createAnchoredDate(year, month, day));
}

function parseRelativeDate(text: string, now: Date): GanzhiQueryContext | null {
  const offsetMap: Array<{ pattern: RegExp; offset: number }> = [
    { pattern: /(今天|今日)/, offset: 0 },
    { pattern: /明天/, offset: 1 },
    { pattern: /后天/, offset: 2 },
    { pattern: /昨天/, offset: -1 },
    { pattern: /前天/, offset: -2 },
  ];

  for (const item of offsetMap) {
    if (item.pattern.test(text)) {
      return formatDateContext(shiftAnchoredDate(now, item.offset));
    }
  }

  return null;
}

function parseAbsoluteMonth(text: string): GanzhiQueryContext | null {
  const match = text.match(/(?<!\d)(\d{4})[年/.-](\d{1,2})月?(?![\d日号])/);
  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  if (!Number.isInteger(year) || month < 1 || month > 12) {
    return null;
  }

  return formatMonthContext(year, month);
}

function parseRelativeMonth(text: string, now: Date): GanzhiQueryContext | null {
  const explicitYearMonth = text.match(/(明年|今年|去年|后年)(\d{1,2})月/);
  if (explicitYearMonth) {
    const month = Number(explicitYearMonth[2]);
    if (month >= 1 && month <= 12) {
      const yearOffsetMap: Record<string, number> = {
        去年: -1,
        今年: 0,
        明年: 1,
        后年: 2,
      };
      return formatMonthContext(now.getFullYear() + yearOffsetMap[explicitYearMonth[1]], month);
    }
  }

  if (/(这个月|本月)/.test(text)) {
    return formatMonthContext(now.getFullYear(), now.getMonth() + 1);
  }
  if (/下个月/.test(text)) {
    const { year, month } = shiftMonth(now, 1);
    return formatMonthContext(year, month);
  }
  if (/上个月/.test(text)) {
    const { year, month } = shiftMonth(now, -1);
    return formatMonthContext(year, month);
  }

  return null;
}

function parseAbsoluteYear(text: string): GanzhiQueryContext | null {
  const match = text.match(/(?<!\d)(\d{4})年(?!\d)/);
  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  return Number.isInteger(year) ? formatYearContext(year) : null;
}

function parseRelativeYear(text: string, now: Date): GanzhiQueryContext | null {
  if (/今年/.test(text)) {
    return formatYearContext(shiftYear(now, 0));
  }
  if (/明年/.test(text)) {
    return formatYearContext(shiftYear(now, 1));
  }
  if (/后年/.test(text)) {
    return formatYearContext(shiftYear(now, 2));
  }
  if (/去年/.test(text)) {
    return formatYearContext(shiftYear(now, -1));
  }

  return null;
}

function normalizeQuestionLine(line: string): string {
  return line.replace(/^["'“”]+|["'“”]+$/g, '').trim();
}

function hasCalendarResolutionIntent(text: string): boolean {
  return CALENDAR_RESOLUTION_KEYWORDS.test(text);
}

/**
 * 从完整提示词中提取真实用户问题，避免把提示词里的时间信息误判为查询目标
 */
export function extractUserIntentText(content: string | null | undefined): string {
  if (typeof content !== 'string') {
    return '';
  }

  for (const pattern of FULL_PROMPT_LABEL_PATTERNS) {
    const match = content.match(pattern);
    if (match?.[1]) {
      return normalizeQuestionLine(match[1]);
    }
  }

  const userQuestionBlock = content.match(/\*\*用户问题\*\*[：:]?\s*\n+([^\n]+)/);
  if (userQuestionBlock?.[1]) {
    return normalizeQuestionLine(userQuestionBlock[1]);
  }

  return content.trim();
}

/**
 * 尝试直接在本地解析用户提到的具体日期/月/年，避免让模型临场调用工具
 */
export function resolveGanzhiQueryContext(
  rawText: string | null | undefined,
  now: Date = new Date()
): GanzhiQueryContext | null {
  const text = extractUserIntentText(rawText);
  if (!text) {
    return null;
  }

  const exactDateContext = parseAbsoluteDate(text) || parseRelativeDate(text, now);
  if (exactDateContext) {
    return exactDateContext;
  }

  if (!hasCalendarResolutionIntent(text)) {
    return null;
  }

  return (
    parseAbsoluteMonth(text) ||
    parseRelativeMonth(text, now) ||
    parseAbsoluteYear(text) ||
    parseRelativeYear(text, now)
  );
}

/**
 * 判断当前问题是否仍需要保留干支工具作为兜底
 */
export function shouldEnableGanzhiTools(rawText: string | null | undefined): boolean {
  const text = extractUserIntentText(rawText);
  if (!text) {
    return false;
  }

  const explicitCalendarKeywords =
    /(干支|农历|节气|公历|日柱|月柱|年柱|时柱|哪天|哪日|几号|几日|日期|吉日|择日|哪几天|哪个月|哪一年|什么时候|何时)/;
  const rangePatterns = /(未来|接下来|最近|之后|这段时间|三个月|两个月|半年|上半年|下半年|一周|两周|几天)/;
  const planningKeywords = /(适合|宜|不宜|运势|安排|出行|开工|搬家|签约|考试|面试|行动)/;

  return explicitCalendarKeywords.test(text) || (rangePatterns.test(text) && planningKeywords.test(text));
}

/**
 * 定义一个工具，用于获取当前完整的历法信息
 */
export const getCurrentTimeInfoTool = {
  type: 'function' as const,
  function: {
    name: 'get_current_time_info',
    description: '获取当前准确的公历、农历、干支和节气信息。当用户需要对于后续具体时间进行占卜或查询时使用。',
    parameters: {
      type: 'object' as const,
      properties: {},
      required: [],
    },
  },
};

/**
 * 定义一个工具，用于获取指定月份每日的干支信息
 */
export const getGanZhiForMonthTool = {
  type: 'function' as const,
  function: {
    name: 'get_ganzhi_for_month',
    description:
      '获取指定公历年份和月份中，每一天的公历日期、农历日期和对应的日干支信息。用于查询特定月份的每日运势分析。',
    parameters: {
      type: 'object' as const,
      properties: {
        year: {
          type: 'number',
          description: '公历年份，例如 2025',
        },
        month: {
          type: 'number',
          description: '公历月份，例如 12',
        },
      },
      required: ['year', 'month'],
    },
  },
};

/**
 * 定义一个工具，用于获取指定年份每月的干支信息
 */
export const getGanZhiForYearTool = {
  type: 'function' as const,
  function: {
    name: 'get_ganzhi_for_year',
    description: '获取指定公历年份中，每个月的月干支信息。用于查询某一整年的运势概览。',
    parameters: {
      type: 'object' as const,
      properties: {
        year: {
          type: 'number',
          description: '公历年份，例如 2025',
        },
      },
      required: ['year'],
    },
  },
};

/**
 * 定义一个工具，用于获取指定日期的完整历法信息
 */
export const getGanZhiForDateTool = {
  type: 'function' as const,
  function: {
    name: 'get_ganzhi_for_date',
    description:
      '获取指定公历日期的公历、农历、干支和节气信息。用于查询某一天的具体历法信息或日运分析。',
    parameters: {
      type: 'object' as const,
      properties: {
        year: {
          type: 'number',
          description: '公历年份，例如 2026',
        },
        month: {
          type: 'number',
          description: '公历月份，例如 3',
        },
        day: {
          type: 'number',
          description: '公历日期，例如 20',
        },
      },
      required: ['year', 'month', 'day'],
    },
  },
};

/**
 * 工具执行器映射
 * 当 AI 决定调用某个工具时，我们在这里查找并执行对应的本地函数
 */
export const toolExecutors: { [key: string]: (args: unknown) => Promise<string> } = {
  get_current_time_info: async () => {
    try {
      const timeInfo = LunarUtil.getCurrentTimeInfo();
      return JSON.stringify(timeInfo);
    } catch (error) {
      console.error('执行 get_current_time_info 工具时出错:', error);
      return JSON.stringify({ error: '获取当前时间信息失败' });
    }
  },
  get_ganzhi_for_month: async (args: unknown) => {
    try {
      const { year, month } = args as { year: number; month: number };
      if (!year || !month) {
        return JSON.stringify({ error: '缺少年份或月份参数' });
      }
      const data = LunarUtil.getGanZhiForMonth(year, month);
      return JSON.stringify(data);
    } catch (error) {
      console.error('执行 get_ganzhi_for_month 工具时出错:', error);
      return JSON.stringify({ error: '获取月份干支信息失败' });
    }
  },
  get_ganzhi_for_year: async (args: unknown) => {
    try {
      const { year } = args as { year: number };
      if (!year) {
        return JSON.stringify({ error: '缺少年份参数' });
      }
      const data = LunarUtil.getGanZhiForYear(year);
      return JSON.stringify(data);
    } catch (error) {
      console.error('执行 get_ganzhi_for_year 工具时出错:', error);
      return JSON.stringify({ error: '获取年份干支信息失败' });
    }
  },
  get_ganzhi_for_date: async (args: unknown) => {
    try {
      const { year, month, day } = args as { year: number; month: number; day: number };
      if (!year || !month || !day) {
        return JSON.stringify({ error: '缺少年份、月份或日期参数' });
      }

      if (!isValidDateParts(year, month, day)) {
        return JSON.stringify({ error: '日期参数不合法' });
      }

      const date = createAnchoredDate(year, month, day);
      const timeInfo = LunarUtil.getTimeInfo(date);
      const display = LunarUtil.formatTimeDisplay(timeInfo);
      return JSON.stringify({
        date: `${year}-${pad2(month)}-${pad2(day)}`,
        solar: display.solar,
        lunar: display.lunar,
        ganzhi: display.ganzhi,
        jieQi: timeInfo.jieQi,
        raw: timeInfo,
      });
    } catch (error) {
      console.error('执行 get_ganzhi_for_date 工具时出错:', error);
      return JSON.stringify({ error: '获取指定日期干支信息失败' });
    }
  },
};
