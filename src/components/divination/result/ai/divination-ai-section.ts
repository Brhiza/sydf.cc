import type { ChatMessage, DivinationType } from '@/types';
import {
  getDisplayedConversationHistory as getSharedDisplayedConversationHistory,
  getVisibleConversationHistory as getSharedVisibleConversationHistory,
  shouldShowConversationMessage,
} from '@/utils/conversation-history';

export function getVisibleConversationHistory(messages: ChatMessage[]): ChatMessage[] {
  return getSharedVisibleConversationHistory(messages);
}

export function shouldShowAIMessage(
  type: DivinationType,
  message: ChatMessage,
  index: number
): boolean {
  return shouldShowConversationMessage(type, message, index);
}

export function getDisplayedConversationHistory(
  type: DivinationType,
  messages: ChatMessage[]
): ChatMessage[] {
  return getSharedDisplayedConversationHistory(type, messages);
}

export function hasVisibleAssistantContent(type: DivinationType, messages: ChatMessage[]): boolean {
  return getDisplayedConversationHistory(type, messages).some(
    (message) => message.role === 'assistant' && !!message.content
  );
}

export function getLastAssistantMessage(messages: ChatMessage[]): ChatMessage | null {
  const assistantMessages = messages.filter((message) => message.role === 'assistant');
  return assistantMessages.length > 0 ? assistantMessages[assistantMessages.length - 1] : null;
}

export function getAISectionTitle(
  _messages: ChatMessage[],
  _isAiLoading: boolean,
  _isFollowUpLoading: boolean
): string {
  return 'AI深度解读';
}
