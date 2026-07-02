import { describe, expect, it } from 'vitest';
import type { HistoryRecord } from '@/types/common';
import { generateSummary } from './history-summary';

type HistoryResult = HistoryRecord['result'];

describe('generateSummary', () => {
  it('应识别 mingyu-core 奇门结果并生成正常摘要', () => {
    const result = {
      type: 'qimen',
      data: {
        jiuGongGe: [],
        ganzhi: {
          year: '乙巳',
          month: '壬午',
          day: '丁卯',
          hour: '甲辰',
        },
        isYangDun: true,
        juShu: 3,
        zhiFu: '天任',
        zhiShi: '生门',
        timeInfo: {
          solarTerm: '夏至',
          epoch: '上元',
        },
        timestamp: 1780000000000,
      },
    } as HistoryResult;

    expect(generateSummary(result)).toBe('奇门遁甲: 排盘完成');
  });

  it('缺少有效奇门排盘数据时应保留未知局兜底', () => {
    const result = {
      type: 'qimen',
      data: {},
    } as HistoryResult;

    expect(generateSummary(result)).toBe('奇门遁甲: 未知局');
  });
});
