import {
  createAnchoredDate,
  isValidDateParts,
  shiftAnchoredDate,
  shiftMonth,
  shiftYear,
} from './date-utils';
import {
  formatDateContext,
  formatMonthContext,
  formatYearContext,
  type GanzhiQueryContext,
} from './context-formatters';

export type GanzhiResolution = GanzhiQueryContext['resolution'];

export interface GanzhiParser {
  resolution: GanzhiResolution;
  parse: (text: string, now: Date) => GanzhiQueryContext | null;
}

const RELATIVE_DATE_OFFSETS: Array<{ pattern: RegExp; offset: number }> = [
  { pattern: /(今天|今日)/, offset: 0 },
  { pattern: /明天/, offset: 1 },
  { pattern: /后天/, offset: 2 },
  { pattern: /昨天/, offset: -1 },
  { pattern: /前天/, offset: -2 },
];

const RELATIVE_YEAR_OFFSETS: Record<string, number> = {
  今年: 0,
  明年: 1,
  后年: 2,
  去年: -1,
};

export function parseAbsoluteDate(text: string): GanzhiQueryContext | null {
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

export function parseRelativeDate(text: string, now: Date): GanzhiQueryContext | null {
  for (const item of RELATIVE_DATE_OFFSETS) {
    if (item.pattern.test(text)) {
      return formatDateContext(shiftAnchoredDate(now, item.offset));
    }
  }

  return null;
}

export function parseAbsoluteMonth(text: string): GanzhiQueryContext | null {
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

export function parseRelativeMonth(text: string, now: Date): GanzhiQueryContext | null {
  const explicitYearMonth = text.match(/(明年|今年|去年|后年)(\d{1,2})月/);
  if (explicitYearMonth) {
    const month = Number(explicitYearMonth[2]);
    if (month >= 1 && month <= 12) {
      return formatMonthContext(now.getFullYear() + RELATIVE_YEAR_OFFSETS[explicitYearMonth[1]], month);
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

export function parseAbsoluteYear(text: string): GanzhiQueryContext | null {
  const match = text.match(/(?<!\d)(\d{4})年(?!\d)/);
  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  return Number.isInteger(year) ? formatYearContext(year) : null;
}

export function parseRelativeYear(text: string, now: Date): GanzhiQueryContext | null {
  for (const [keyword, offset] of Object.entries(RELATIVE_YEAR_OFFSETS)) {
    if (text.includes(keyword)) {
      return formatYearContext(shiftYear(now, offset));
    }
  }

  return null;
}

export const GANZHI_PARSERS: GanzhiParser[] = [
  { resolution: 'date', parse: (text) => parseAbsoluteDate(text) },
  { resolution: 'date', parse: (text, now) => parseRelativeDate(text, now) },
  { resolution: 'month', parse: (text) => parseAbsoluteMonth(text) },
  { resolution: 'month', parse: (text, now) => parseRelativeMonth(text, now) },
  { resolution: 'year', parse: (text) => parseAbsoluteYear(text) },
  { resolution: 'year', parse: (text, now) => parseRelativeYear(text, now) },
];
