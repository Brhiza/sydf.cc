import { describe, expect, it } from 'vitest';
import type { ChatMessage } from '@/types';
import {
  getAISectionTitle,
  getDisplayedConversationHistory,
  getLastAssistantMessage,
  getVisibleConversationHistory,
  isAIErrorMessage,
  shouldShowAIMessage,
} from './divination-ai-section';

const messages: ChatMessage[] = [
  { role: 'system', content: '系统提示' },
  { role: 'user', content: '今天怎么样？' },
  { role: 'assistant', content: '整体平稳。' },
  { role: 'user', content: '还有什么要注意？' },
  { role: 'assistant', content: '避免冲动消费。' },
];

describe('divination-ai-section', () => {
  it('会过滤系统消息', () => {
    expect(getVisibleConversationHistory(messages)).toEqual(messages.slice(1));
  });

  it('今日运势会隐藏前两条首轮问答', () => {
    const visibleMessages = getVisibleConversationHistory(messages);

    expect(shouldShowAIMessage('daily', visibleMessages[0], 0)).toBe(false);
    expect(shouldShowAIMessage('daily', visibleMessages[1], 1)).toBe(false);
    expect(getDisplayedConversationHistory('daily', messages)).toEqual(messages.slice(3));
  });

  it('非今日运势会保留全部可见消息', () => {
    expect(getDisplayedConversationHistory('qimen', messages)).toEqual(messages.slice(1));
  });

  it('今日运势首轮助手消息是错误时也应显示在下方 AI 区块', () => {
    const dailyErrorMessages: ChatMessage[] = [
      { role: 'user', content: '今天怎么样？' },
      { role: 'assistant', content: '抱歉，AI服务暂时不可用，请稍后重试。' },
    ];

    expect(isAIErrorMessage(dailyErrorMessages[1].content)).toBe(true);
    expect(shouldShowAIMessage('daily', dailyErrorMessages[1], 1)).toBe(true);
    expect(getDisplayedConversationHistory('daily', dailyErrorMessages)).toEqual([
      dailyErrorMessages[1],
    ]);
  });

  it('会返回最后一条助手消息', () => {
    expect(getLastAssistantMessage(messages)).toEqual(messages[4]);
  });

  it('加载中且最后一条助手消息为空时显示思考标题', () => {
    expect(
      getAISectionTitle(
        [
          { role: 'user', content: '问题' },
          { role: 'assistant', content: null },
        ],
        true,
        false
      )
    ).toBe('AI正在思考...');
  });

  it('加载中且还没有任何消息时也显示思考标题', () => {
    expect(getAISectionTitle([], true, false)).toBe('AI正在思考...');
  });

  it('非加载中时显示默认标题', () => {
    expect(getAISectionTitle(messages, false, false)).toBe('AI深度解读');
  });
});
