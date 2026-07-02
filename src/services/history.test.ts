// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { HistoryRecord } from '@/types/common';

const { mockEmit } = vi.hoisted(() => ({
  mockEmit: vi.fn(),
}));

vi.mock('@/utils/eventBus', () => ({
  eventBus: {
    emit: mockEmit,
  },
  EVENTS: {
    HISTORY_UPDATED: 'history:updated',
  },
}));

function createDailyRecord(id: string, timestamp: number, date: string): HistoryRecord {
  return {
    id,
    type: 'daily',
    question: '3 月 25 日运势',
    result: {
      type: 'daily',
      data: {
        date,
      } as HistoryRecord['result']['data'],
      aiResponse: `${id}-解读`,
    },
    timestamp,
    summary: '3 月 25 日运势',
  };
}

describe('HistoryService', () => {
  beforeEach(() => {
    vi.resetModules();
    mockEmit.mockReset();
    localStorage.clear();
  });

  it('同一天存在多条今日运势记录时，应优先返回最新一条', async () => {
    localStorage.setItem(
      'sydf-history',
      JSON.stringify([
        createDailyRecord('daily-old', 1000, '2026-03-25'),
        createDailyRecord('daily-new', 2000, '2026-03-25'),
      ])
    );

    const { historyService } = await import('./history');

    expect(historyService.getDailyFortuneForDate('2026-03-25')?.id).toBe('daily-new');
  });

  it('导入新历史记录成功后应触发历史刷新事件', async () => {
    localStorage.setItem('sydf-history', JSON.stringify([]));

    const { historyService } = await import('./history');
    const importPayload = JSON.stringify({
      records: [createDailyRecord('daily-imported', 3000, '2026-03-26')],
    });

    const result = historyService.importRecords(importPayload);

    expect(result).toEqual({
      success: true,
      message: '成功导入 1 条记录',
      count: 1,
    });
    expect(historyService.getRecord('daily-imported')?.id).toBe('daily-imported');
    expect(mockEmit).toHaveBeenCalledWith('history:updated');
  });

  it('加载旧单牌塔罗历史时应自动迁移为普通塔罗类型并写回本地存储', async () => {
    localStorage.setItem(
      'sydf-history',
      JSON.stringify([
        {
          id: 'legacy-tarot-single',
          type: 'tarot_single',
          question: '今天的方向是什么？',
          result: {
            type: 'tarot_single',
            data: {
              spreadType: 'single',
              spreadName: '单牌指引',
              cards: [],
              timestamp: 3000,
            },
            aiResponse: '测试解读',
          },
          timestamp: 3000,
          summary: '旧单牌历史',
        },
      ])
    );

    const { historyService } = await import('./history');
    const record = historyService.getRecord('legacy-tarot-single');
    const storedRecords = JSON.parse(
      localStorage.getItem('sydf-history') || '[]'
    ) as HistoryRecord[];

    expect(record?.type).toBe('tarot');
    expect(record?.result.type).toBe('tarot');
    expect(storedRecords[0]?.type).toBe('tarot');
    expect(storedRecords[0]?.result.type).toBe('tarot');
  });

  it('导入旧单牌塔罗历史时应自动归一化为普通塔罗类型', async () => {
    localStorage.setItem('sydf-history', JSON.stringify([]));

    const { historyService } = await import('./history');
    const importPayload = JSON.stringify({
      records: [
        {
          id: 'legacy-imported-tarot-single',
          type: 'tarot_single',
          question: '这件事要继续吗？',
          result: {
            type: 'tarot_single',
            data: {
              spreadType: 'single',
              spreadName: '单牌指引',
              cards: [],
              timestamp: 4000,
            },
            aiResponse: '测试解读',
          },
          timestamp: 4000,
          summary: '旧导入历史',
        },
      ],
    });

    historyService.importRecords(importPayload);

    expect(historyService.getRecord('legacy-imported-tarot-single')?.type).toBe('tarot');
    expect(historyService.getRecord('legacy-imported-tarot-single')?.result.type).toBe('tarot');
  });

  it('导入历史时应跳过字段不完整或类型不支持的记录', async () => {
    localStorage.setItem('sydf-history', JSON.stringify([]));

    const { historyService } = await import('./history');
    const importPayload = JSON.stringify({
      records: [
        {
          id: 'missing-result',
          type: 'daily',
          question: '缺少结果',
          timestamp: 1000,
          summary: '坏记录',
        },
        {
          id: 'unsupported-type',
          type: 'astrology',
          question: '未知类型',
          result: { type: 'astrology', data: {}, aiResponse: '测试解读' },
          timestamp: 2000,
          summary: '坏记录',
        },
        {
          id: '',
          type: 'daily',
          question: '缺少编号',
          result: { type: 'daily', data: { date: '2026-03-27' }, aiResponse: '测试解读' },
          timestamp: 3000,
          summary: '坏记录',
        },
        createDailyRecord('daily-valid', 4000, '2026-03-27'),
      ],
    });

    const result = historyService.importRecords(importPayload);

    expect(result).toEqual({
      success: true,
      message: '成功导入 1 条记录',
      count: 1,
    });
    expect(historyService.getRecords().map((record) => record.id)).toEqual(['daily-valid']);
  });

  it('加载本地历史时应跳过坏记录并保留正常记录', async () => {
    localStorage.setItem(
      'sydf-history',
      JSON.stringify([
        {
          id: 'bad-local',
          type: 'daily',
          question: '坏本地记录',
          timestamp: 1000,
          summary: '坏记录',
        },
        createDailyRecord('daily-local-valid', 2000, '2026-03-28'),
      ])
    );

    const { historyService } = await import('./history');
    const storedRecords = JSON.parse(
      localStorage.getItem('sydf-history') || '[]'
    ) as HistoryRecord[];

    expect(historyService.getRecords().map((record) => record.id)).toEqual(['daily-local-valid']);
    expect(storedRecords.map((record) => record.id)).toEqual(['daily-local-valid']);
  });

  it('迁移后的旧单牌塔罗记录应能被正式塔罗筛选命中', async () => {
    localStorage.setItem(
      'sydf-history',
      JSON.stringify([
        {
          id: 'legacy-filter-tarot-single',
          type: 'tarot_single',
          question: '旧单牌筛选测试',
          result: {
            type: 'tarot_single',
            data: {
              spreadType: 'single',
              spreadName: '单牌指引',
              cards: [],
              timestamp: 5000,
            },
            aiResponse: '测试解读',
          },
          timestamp: 5000,
          summary: '旧单牌筛选测试',
        },
      ])
    );

    const { historyService } = await import('./history');

    expect(historyService.filterByType('tarot')).toHaveLength(1);
    expect(historyService.filterByType('tarot')[0]?.type).toBe('tarot');
  });
});
