// @vitest-environment jsdom

import { ref } from 'vue';
import { describe, expect, it } from 'vitest';
import type { ChatMessage } from '@/types/chat';
import {
  applyDailyRecordToState,
  clearDailyRecordFromState,
  createFallbackDailyHistoryRecord,
  getDailyDateLabel,
  getDailyHistoryTitle,
  getDailyPageTitle,
  getDailyStorageKeys,
  hasVisibleDailyConversation,
} from './useDailyFortune.shared';

describe('useDailyFortune.shared', () => {
  it('会生成统一的今日运势页面标题和日期标签', () => {
    expect(getDailyPageTitle('2026-03-25', '2026-03-25')).toBe('今日运势');
    expect(getDailyPageTitle('2026-03-26', '2026-03-25')).toBe('3月26日运势');
    expect(getDailyDateLabel('2026-03-25', '2026-03-25')).toBe('今日');
    expect(getDailyDateLabel('2026-03-26', '2026-03-25')).toBe('3月26日');
    expect(getDailyHistoryTitle('2026-03-26')).toBe('3 月 26 日运势');
  });

  it('会生成统一的今日运势缓存键', () => {
    expect(getDailyStorageKeys('2026-03-25')).toEqual([
      'divination:daily:limit',
      'divination:daily:cache',
      'divination:daily:result',
      'divination:daily:2026-03-25:cache',
    ]);
  });

  it('会把历史记录同步到今日运势状态，并支持清空', () => {
    const state = {
      result: ref(null),
      aiResponse: ref(''),
      conversationHistory: ref<ChatMessage[]>([]),
      isFromCache: ref(false),
      error: ref<string | null>('旧错误'),
      isCancelled: ref(true),
    };

    applyDailyRecordToState(
      {
        id: 'daily-1',
        type: 'daily',
        question: '3 月 25 日运势',
        result: {
          type: 'daily',
          data: { date: '2026-03-25' } as never,
          aiResponse: '历史中的今日运势',
        },
        conversationHistory: [{ id: 'assistant-1', role: 'assistant', content: '历史中的今日运势' }],
        timestamp: 1,
        summary: '3 月 25 日运势',
      },
      state
    );

    expect(state.result.value).toEqual({ date: '2026-03-25' });
    expect(state.aiResponse.value).toBe('历史中的今日运势');
    expect(state.conversationHistory.value).toHaveLength(1);
    expect(state.isFromCache.value).toBe(true);
    expect(state.error.value).toBeNull();
    expect(state.isCancelled.value).toBe(false);

    clearDailyRecordFromState(state);

    expect(state.result.value).toBeNull();
    expect(state.aiResponse.value).toBe('');
    expect(state.conversationHistory.value).toEqual([]);
    expect(state.isFromCache.value).toBe(false);
  });

  it('会按今日运势规则判断可见对话并生成回退记录', () => {
    const firstRoundMessages: ChatMessage[] = [
      { id: 'user-1', role: 'user', content: '请为我分析今日运势' },
      { id: 'assistant-1', role: 'assistant', content: '整体判断：今日宜稳中求进。' },
    ];
    const followUpMessages: ChatMessage[] = [
      ...firstRoundMessages,
      { id: 'user-2', role: 'user', content: '下午适合出门吗？' },
      { id: 'assistant-2', role: 'assistant', content: '下午适合处理轻量安排。' },
    ];

    expect(hasVisibleDailyConversation(firstRoundMessages, false)).toBe(false);
    expect(hasVisibleDailyConversation(followUpMessages, false)).toBe(true);
    expect(hasVisibleDailyConversation([], true)).toBe(true);

    const fallbackRecord = createFallbackDailyHistoryRecord({
      date: '2026-03-25',
      result: { date: '2026-03-25' } as never,
      aiResponse: '整体判断：今日宜稳中求进。',
      conversationHistory: followUpMessages,
    });

    expect(fallbackRecord.id).toBe('daily-2026-03-25');
    expect(fallbackRecord.question).toBe('3 月 25 日运势');
    expect(fallbackRecord.result.aiResponse).toBe('整体判断：今日宜稳中求进。');
    expect(fallbackRecord.conversationHistory).toHaveLength(4);
  });
});
