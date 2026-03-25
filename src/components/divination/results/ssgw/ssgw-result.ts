import type { SsgwData } from '@/types/divination';
import { formatGanZhi, formatTimestamp } from '@/utils/date-formatter';

export interface SsgwHeaderItem {
  label: string;
  value: string;
}

export function createSsgwHeaderItems(data: SsgwData): SsgwHeaderItem[] {
  return [
    {
      label: '起卦时间',
      value: formatTimestamp(data.timestamp),
    },
    {
      label: '干支信息',
      value: formatGanZhi(data.ganzhi),
    },
    {
      label: '签号',
      value: `第${data.number}签`,
    },
    {
      label: '签名',
      value: data.title,
    },
  ];
}
