import { describe, expect, it } from 'vitest';
import type { ChatMessage } from '@/types/chat';
import { getVisibleDailyConversationHistory, hasVisibleDailyConversation } from './daily-conversation';

describe('daily-conversation', () => {
  it('应隐藏今日运势首轮用户问题与非错误首轮助手回复', () => {
    const messages: ChatMessage[] = [
      { role: 'user', content: '请为我分析今日运势' },
      { role: 'assistant', content: '整体判断：今日宜稳中求进。' },
      { role: 'user', content: '下午适合出门吗？' },
      { role: 'assistant', content: '下午适合处理轻量安排。' },
    ];

    expect(getVisibleDailyConversationHistory(messages)).toEqual(messages.slice(2));
    expect(hasVisibleDailyConversation(messages, false)).toBe(true);
  });

  it('首轮助手错误消息应保留在可见对话中', () => {
    const messages: ChatMessage[] = [
      { role: 'user', content: '请为我分析今日运势' },
      {
        role: 'assistant',
        content: '抱歉，AI服务暂时不可用，请稍后重试。',
        isError: true,
      },
    ];

    expect(getVisibleDailyConversationHistory(messages)).toEqual([messages[1]]);
    expect(hasVisibleDailyConversation(messages, false)).toBe(true);
  });
});
