import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { HistoryRecord } from '@/types/common';
import { useHistoryManager } from './useHistoryManager';

const mockPush = vi.fn();
const mockGetHistoryRecords = vi.fn();
const mockConfirmClearAllHistory = vi.fn();

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

vi.mock('./useHistoryActions', () => ({
  useHistoryActions: () => ({
    getHistoryRecords: mockGetHistoryRecords,
    confirmClearAllHistory: mockConfirmClearAllHistory,
  }),
}));

function createHistoryRecord(id: string, question: string): HistoryRecord {
  return {
    id,
    type: 'qimen',
    question,
    result: {
      type: 'qimen',
      data: {
        jiuGongGe: [],
      },
      aiResponse: `${question}解读`,
    },
    timestamp: 1,
    summary: question,
  } as unknown as HistoryRecord;
}

describe('useHistoryManager', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('重新加载历史时应同步最新的历史记录列表', () => {
    const historyOne = createHistoryRecord('history-1', '第一条');
    const historyTwo = createHistoryRecord('history-2', '第二条');

    mockGetHistoryRecords.mockReturnValue([historyOne, historyTwo]);

    const historyManager = useHistoryManager();

    historyManager.loadHistory();

    expect(historyManager.historyRecords.value).toEqual([historyOne, historyTwo]);
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('清空全部历史成功后应同步清空当前列表', () => {
    mockConfirmClearAllHistory.mockReturnValue(true);

    const historyManager = useHistoryManager();
    historyManager.historyRecords.value = [createHistoryRecord('history-1', '第一条')];

    historyManager.clearAllHistory();

    expect(historyManager.historyRecords.value).toEqual([]);
  });

  it('查看塔罗历史时应跳转到统一结果页', () => {
    const historyManager = useHistoryManager();

    historyManager.viewHistoryDetail({
      ...createHistoryRecord('history-tarot', '今日抽牌'),
      type: 'tarot',
      result: {
        type: 'tarot',
        data: {
          cards: [],
        },
        aiResponse: '测试解读',
      },
    } as unknown as HistoryRecord);

    expect(mockPush).toHaveBeenCalledWith('/divination/tarot?historyId=history-tarot');
  });
});
