import type { DivinationType } from '@/types';
import type { ChatMessage, ChatMessageRetryTarget } from '@/types/chat';
import { isAIErrorMessage } from './ai-error';

export interface VisibleConversationEntry {
  message: ChatMessage;
  originalIndex: number;
  visibleIndex: number;
}

export interface DisplayedConversationEntry extends VisibleConversationEntry {
  displayedIndex: number;
}

export function getVisibleConversationEntries(messages: ChatMessage[]): VisibleConversationEntry[] {
  const visibleEntries: VisibleConversationEntry[] = [];

  messages.forEach((message, originalIndex) => {
    if (message.role === 'system') {
      return;
    }

    visibleEntries.push({
      message,
      originalIndex,
      visibleIndex: visibleEntries.length,
    });
  });

  return visibleEntries;
}

export function getVisibleConversationHistory(messages: ChatMessage[]): ChatMessage[] {
  return getVisibleConversationEntries(messages).map((entry) => entry.message);
}

export function shouldShowConversationMessage(
  type: DivinationType,
  message: ChatMessage,
  visibleIndex: number
): boolean {
  if (type !== 'daily') {
    return true;
  }

  if (visibleIndex === 0 && message.role === 'user') {
    return false;
  }

  if (visibleIndex === 1 && message.role === 'assistant' && !isAIErrorMessage(message.content)) {
    return false;
  }

  return true;
}

export function getDisplayedConversationEntries(
  type: DivinationType,
  messages: ChatMessage[]
): DisplayedConversationEntry[] {
  return getVisibleConversationEntries(messages)
    .filter((entry) => shouldShowConversationMessage(type, entry.message, entry.visibleIndex))
    .map((entry, displayedIndex) => ({
      ...entry,
      displayedIndex,
    }));
}

export function getDisplayedConversationHistory(
  type: DivinationType,
  messages: ChatMessage[]
): ChatMessage[] {
  return getDisplayedConversationEntries(type, messages).map((entry) => entry.message);
}

export function resolveDisplayedConversationTarget(
  type: DivinationType,
  messages: ChatMessage[],
  target: ChatMessageRetryTarget
): DisplayedConversationEntry | null {
  return (
    getDisplayedConversationEntries(type, messages).find((entry) => {
      if (entry.displayedIndex !== target.displayedIndex) {
        return false;
      }

      if (target.messageId && entry.message.id) {
        return entry.message.id === target.messageId;
      }

      return true;
    }) || null
  );
}

export function isPrimaryConversationRetryTarget(
  type: DivinationType,
  messages: ChatMessage[],
  target: ChatMessageRetryTarget
): boolean {
  const targetEntry = resolveDisplayedConversationTarget(type, messages, target);
  if (!targetEntry || targetEntry.message.role !== 'assistant') {
    return false;
  }

  return (
    targetEntry.visibleIndex === 1 &&
    getVisibleConversationEntries(messages)[0]?.message.role === 'user'
  );
}
