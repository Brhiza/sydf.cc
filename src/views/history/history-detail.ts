import type { HistoryRecord } from '@/services/history';
import { formatTimestamp } from '@/utils/date-formatter';

export interface HistoryDetailInfoItem {
  label: string;
  value: string;
}

export function createHistoryDetailInfoItems(record: Pick<HistoryRecord, 'timestamp' | 'question'>): HistoryDetailInfoItem[] {
  const items: HistoryDetailInfoItem[] = [
    {
      label: '起卦时间',
      value: formatTimestamp(record.timestamp),
    },
  ];

  if (record.question.trim()) {
    items.push({
      label: '所问之事',
      value: record.question,
    });
  }

  return items;
}
