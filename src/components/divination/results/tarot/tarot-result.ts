import type { TarotData } from '@/types/divination';
import { formatTimestamp } from '@/utils/date-formatter';

export type TarotCardData = TarotData['cards'][0];

export interface TarotHeaderItem {
  label: string;
  value: string;
}

export function createTarotHeaderItems(
  spreadName: string | undefined,
  cardCount: number,
  timestamp?: number
): TarotHeaderItem[] {
  const items: TarotHeaderItem[] = [];

  if (spreadName) {
    items.push({
      label: '牌阵名称',
      value: spreadName,
    });
  }

  items.push({
    label: '抽牌数量',
    value: `${cardCount}张牌`,
  });

  if (timestamp) {
    items.push({
      label: '起卦时间',
      value: formatTimestamp(timestamp),
    });
  }

  return items;
}
