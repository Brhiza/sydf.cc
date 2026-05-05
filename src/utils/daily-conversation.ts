import type { ChatMessage } from '@/types/chat';
import { isAIErrorMessage } from './ai-error';

export function getVisibleDailyConversationHistory(messages: ChatMessage[]): ChatMessage[] {
  const visibleMessages = messages.filter((message) => message.role !== 'system');

  return visibleMessages.filter((message, index) => {
    if (index === 0 && message.role === 'user') {
      return false;
    }

    if (index === 1 && message.role === 'assistant' && !isAIErrorMessage(message.content)) {
      return false;
    }

    return true;
  });
}

export function hasVisibleDailyConversation(messages: ChatMessage[], isFollowUpLoading: boolean) {
  return getVisibleDailyConversationHistory(messages).length > 0 || isFollowUpLoading;
}
