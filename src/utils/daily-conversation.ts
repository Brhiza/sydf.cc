import type { ChatMessage } from '@/types/chat';
import { getDisplayedConversationHistory } from './conversation-history';

export function getVisibleDailyConversationHistory(messages: ChatMessage[]): ChatMessage[] {
  return getDisplayedConversationHistory('daily', messages);
}

export function hasVisibleDailyConversation(messages: ChatMessage[], isFollowUpLoading: boolean) {
  return getVisibleDailyConversationHistory(messages).length > 0 || isFollowUpLoading;
}
