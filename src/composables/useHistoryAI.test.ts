// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { HistoryRecord } from '@/types/common';
import { useHistoryAI } from './useHistoryAI';

describe('useHistoryAI', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('重生成后应同步刷新历史记录中的 aiResponse 和对话历史', async () => {
    const mockUpdateRecord = vi.fn();
    const mockGenerateRegeneratedAI = vi.fn();
    const record: HistoryRecord = {
      id: 'history-1',
      type: 'qimen',
      question: '接下来会怎样？',
      result: {
        type: 'qimen',
        data: {
          jiuGongGe: [],
          ganzhi: { year: '甲子', month: '乙丑', day: '丙寅', hour: '丁卯' },
          isYangDun: true,
          juShu: 1,
          zhiFu: '天心',
          zhiShi: '开门',
          timeInfo: { solarTerm: '春分', epoch: '上元' },
          timestamp: Date.now(),
        },
        aiResponse: '旧解读',
      },
      conversationHistory: [{ role: 'assistant', content: '旧解读' }],
      timestamp: Date.now(),
      summary: '奇门',
    };

    mockGenerateRegeneratedAI.mockResolvedValue({
      aiResponse: '新解读',
      conversationHistory: [
        { role: 'user', content: '接下来会怎样？' },
        { role: 'assistant', content: '新解读' },
      ],
    });

    const { handleRetryAI } = useHistoryAI({
      historyService: {
        updateRecord: mockUpdateRecord,
      },
      generateRegeneratedAI: mockGenerateRegeneratedAI,
    });

    await handleRetryAI(record);

    expect(record.result.aiResponse).toBe('新解读');
    expect(record.conversationHistory).toEqual([
      { role: 'user', content: '接下来会怎样？' },
      { role: 'assistant', content: '新解读' },
    ]);
    expect(mockUpdateRecord).toHaveBeenCalledWith(
      'history-1',
      expect.objectContaining({
        conversationHistory: [
          { role: 'user', content: '接下来会怎样？' },
          { role: 'assistant', content: '新解读' },
        ],
      })
    );
  });
});
