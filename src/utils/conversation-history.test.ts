import { describe, expect, it } from 'vitest';
import type { ChatMessage } from '@/types/chat';
import {
  getDisplayedConversationEntries,
  getDisplayedConversationHistory,
  getVisibleConversationHistory,
  isPrimaryConversationRetryTarget,
  resolveDisplayedConversationTarget,
} from './conversation-history';

describe('conversation-history', () => {
  it('会过滤系统消息并保留原始索引映射', () => {
    const messages: ChatMessage[] = [
      { id: 'system-1', role: 'system', content: '系统提示' },
      { id: 'user-1', role: 'user', content: '今天怎么样？' },
      { id: 'assistant-1', role: 'assistant', content: '整体平稳。' },
    ];

    expect(getVisibleConversationHistory(messages)).toEqual(messages.slice(1));
    expect(getDisplayedConversationEntries('qimen', messages)).toEqual([
      {
        message: messages[1],
        originalIndex: 1,
        visibleIndex: 0,
        displayedIndex: 0,
      },
      {
        message: messages[2],
        originalIndex: 2,
        visibleIndex: 1,
        displayedIndex: 1,
      },
    ]);
  });

  it('今日运势会隐藏首轮问答，但保留首轮错误助手消息', () => {
    const messages: ChatMessage[] = [
      { id: 'user-1', role: 'user', content: '请为我分析今日运势' },
      { id: 'assistant-1', role: 'assistant', content: '整体平稳。' },
      { id: 'user-2', role: 'user', content: '下午适合出门吗？' },
      { id: 'assistant-2', role: 'assistant', content: '适合轻量安排。' },
    ];
    const errorMessages: ChatMessage[] = [
      { id: 'user-1', role: 'user', content: '请为我分析今日运势' },
      { id: 'assistant-1', role: 'assistant', content: '抱歉，AI服务暂时不可用，请稍后重试。' },
    ];

    expect(getDisplayedConversationHistory('daily', messages)).toEqual(messages.slice(2));
    expect(getDisplayedConversationHistory('daily', errorMessages)).toEqual([errorMessages[1]]);
  });

  it('会按可见位置解析重试目标，并正确识别首轮助手消息', () => {
    const messages: ChatMessage[] = [
      { id: 'system-1', role: 'system', content: '系统提示' },
      { id: 'user-1', role: 'user', content: '接下来会怎样？' },
      { id: 'assistant-1', role: 'assistant', content: '主解读' },
      { id: 'user-2', role: 'user', content: '还有什么要注意？' },
      { id: 'assistant-2', role: 'assistant', content: '追问解读' },
    ];

    expect(
      resolveDisplayedConversationTarget('qimen', messages, {
        displayedIndex: 1,
        messageId: 'assistant-1',
      })
    ).toMatchObject({
      originalIndex: 2,
      visibleIndex: 1,
      displayedIndex: 1,
      message: messages[2],
    });
    expect(
      isPrimaryConversationRetryTarget('qimen', messages, {
        displayedIndex: 1,
        messageId: 'assistant-1',
      })
    ).toBe(true);
    expect(
      isPrimaryConversationRetryTarget('qimen', messages, {
        displayedIndex: 3,
        messageId: 'assistant-2',
      })
    ).toBe(false);
  });
});
