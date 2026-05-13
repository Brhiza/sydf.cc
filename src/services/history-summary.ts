import type { HistoryRecord } from '@/types/common';
import { getMonthDayFromDateKey } from '@/utils/date-formatter';

type SummaryGenerator = (data: HistoryRecord['result']['data']) => string;

const summaryGenerators: Record<string, SummaryGenerator> = {
  liuyao: (data) => {
    if ('originalName' in data) {
      return `六爻: ${data.originalName || '未知卦'}`;
    }
    return '六爻: 未知卦';
  },
  meihua: (data) => {
    if ('originalName' in data) {
      return `梅花易数: ${data.originalName || '未知卦'}`;
    }
    return '梅花易数: 未知卦';
  },
  qimen: (data) => {
    if ('chart' in data) {
      return '奇门遁甲: 排盘完成';
    }
    return '奇门遁甲: 未知局';
  },
  tarot: (data) => {
    if ('cards' in data && Array.isArray(data.cards)) {
      return `塔罗牌: ${data.cards.map((c) => c.name).join(', ')}`;
    }
    return '塔罗牌: 未知牌';
  },
  ssgw: (data) => {
    if ('title' in data) {
      return `${data.title || '三山国王灵签'}`;
    }
    return '三山国王灵签';
  },
  daily: (data) => {
    if ('date' in data) {
      const { month, day } = getMonthDayFromDateKey(data.date);
      return `${month} 月 ${day} 日运势`;
    }
    return '今日运势';
  },
};

export function generateSummary(result: HistoryRecord['result']): string {
  try {
    const generator = summaryGenerators[result.type];
    return generator ? generator(result.data) : `${result.type} 占卜结果`;
  } catch {
    return '占卜结果';
  }
}
