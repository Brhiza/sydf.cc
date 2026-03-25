import { describe, expect, it, vi } from 'vitest';

vi.mock('@/utils/date-formatter', () => ({
  formatTimestamp: (timestamp: number) => `时间-${timestamp}`,
}));

import { createHistoryDetailInfoItems } from './history-detail';

describe('history-detail', () => {
  it('会按统一结果信息头格式生成历史详情信息', () => {
    expect(
      createHistoryDetailInfoItems({
        timestamp: 1234567890,
        question: '这次出行是否顺利？',
      })
    ).toEqual([
      {
        label: '起卦时间',
        value: '时间-1234567890',
      },
      {
        label: '所问之事',
        value: '这次出行是否顺利？',
      },
    ]);
  });

  it('问题为空时只保留时间信息', () => {
    expect(
      createHistoryDetailInfoItems({
        timestamp: 1234567890,
        question: '   ',
      })
    ).toEqual([
      {
        label: '起卦时间',
        value: '时间-1234567890',
      },
    ]);
  });
});
