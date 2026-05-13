import type { GanzhiQueryContext } from './context-formatters';
import { GANZHI_PARSERS } from './parsers';

const FULL_PROMPT_LABEL_PATTERNS = [
  /\*\*当前追问\*\*[：:]\s*([^\n]+)/,
  /用户追问[：:]\s*([^\n]+)/,
  /【问题】([^\n]+)/,
];

const CALENDAR_RESOLUTION_KEYWORDS =
  /(干支|农历|节气|公历|日柱|月柱|年柱|时柱|运势|吉日|择日|宜|不宜|适合|哪天|哪几天|哪个月|哪一年|日期|日子|每日|每月)/;

const EXPLICIT_CALENDAR_KEYWORDS =
  /(干支|农历|节气|公历|日柱|月柱|年柱|时柱|哪天|哪日|几号|几日|日期|吉日|择日|哪几天|哪个月|哪一年|什么时候|何时)/;

const RANGE_PATTERNS =
  /(未来|接下来|最近|之后|这段时间|三个月|两个月|半年|上半年|下半年|一周|两周|几天)/;

const PLANNING_KEYWORDS =
  /(适合|宜|不宜|运势|安排|出行|开工|搬家|签约|考试|面试|行动)/;

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

  let intentChecked = false;
  let hasIntent = false;

  for (const parser of GANZHI_PARSERS) {
    if (parser.resolution !== 'date') {
      if (!intentChecked) {
        hasIntent = hasCalendarResolutionIntent(text);
        intentChecked = true;
      }
      if (!hasIntent) {
        return null;
      }
    }

    const context = parser.parse(text, now);
    if (context) {
      return context;
    }
  }

  return null;
}

/**
 * 判断当前问题是否仍需要保留干支工具作为兜底
 */
export function shouldEnableGanzhiTools(rawText: string | null | undefined): boolean {
  const text = extractUserIntentText(rawText);
  if (!text) {
    return false;
  }

  return (
    EXPLICIT_CALENDAR_KEYWORDS.test(text) ||
    (RANGE_PATTERNS.test(text) && PLANNING_KEYWORDS.test(text))
  );
}
