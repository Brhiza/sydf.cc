import type { Ref } from 'vue';
import { DAILY_LIMIT_STORAGE_KEY } from '@/services/dailyLimitService';
import { formatLocalDateKey } from '@/utils/date-formatter';
import type { HistoryRecord } from '@/types/common';
import type { DailyFortuneData, SupplementaryInfo } from '@/types/divination';
import type { ChatMessage } from '@/types/chat';

export interface DailyFortuneRecordLike {
  id: string;
  type: 'daily' | string;
  question: string;
  result: {
    type: 'daily' | string;
    data: DailyFortuneData;
    aiResponse?: string;
    supplementaryInfo?: SupplementaryInfo;
  };
  conversationHistory?: ChatMessage[];
  timestamp: number;
  summary: string;
}

export interface DailyFortuneStateRefs {
  result: Ref<DailyFortuneData | null>;
  aiResponse: Ref<string>;
  conversationHistory: Ref<ChatMessage[]>;
  isFromCache: Ref<boolean>;
  error: Ref<string | null>;
  isCancelled: Ref<boolean>;
}

export function getTodayDateString() {
  return formatLocalDateKey();
}

export function getDailyHistoryTitle(date: string): string {
  const targetDate = new Date(date);
  return `${targetDate.getMonth() + 1} 月 ${targetDate.getDate()} 日运势`;
}

export function getDailyDateLabel(date: string, todayDate = getTodayDateString()) {
  if (date === todayDate) {
    return '今日';
  }

  const targetDate = new Date(date);
  return `${targetDate.getMonth() + 1}月${targetDate.getDate()}日`;
}

export function getDailyPageTitle(date: string, todayDate = getTodayDateString()) {
  if (date === todayDate) {
    return '今日运势';
  }

  const targetDate = new Date(date);
  return `${targetDate.getMonth() + 1}月${targetDate.getDate()}日运势`;
}

export function getDailyStorageKeys(date: string) {
  return [
    DAILY_LIMIT_STORAGE_KEY,
    'divination:daily:cache',
    'divination:daily:result',
    `divination:daily:${date}:cache`,
  ];
}

export function isRequestCancelled(controller: AbortController) {
  return controller.signal.aborted;
}

export function hasVisibleDailyConversation(
  messages: ChatMessage[],
  isFollowUpLoading: boolean
) {
  const visibleMessages = messages
    .filter((message) => message.role !== 'system')
    .filter((message, index) => {
      if (index === 0 && message.role === 'user') {
        return false;
      }
      if (index === 1 && message.role === 'assistant') {
        return false;
      }
      return true;
    });

  return visibleMessages.length > 0 || isFollowUpLoading;
}

export function applyDailyRecordToState(
  record: DailyFortuneRecordLike,
  state: DailyFortuneStateRefs
) {
  state.result.value = record.result.data;
  state.aiResponse.value = record.result.aiResponse || '';
  state.conversationHistory.value = record.conversationHistory || [];
  state.isFromCache.value = true;
  state.error.value = null;
  state.isCancelled.value = false;
}

export function clearDailyRecordFromState(state: DailyFortuneStateRefs) {
  state.result.value = null;
  state.aiResponse.value = '';
  state.conversationHistory.value = [];
  state.isFromCache.value = false;
}

export function createFallbackDailyHistoryRecord(args: {
  date: string;
  result: DailyFortuneData;
  aiResponse: string;
  conversationHistory: ChatMessage[];
}): HistoryRecord {
  const title = getDailyHistoryTitle(args.date);

  return {
    id: `daily-${args.date}`,
    type: 'daily',
    question: title,
    result: {
      type: 'daily',
      data: args.result,
      aiResponse: args.aiResponse,
      supplementaryInfo: { date: args.date },
    },
    conversationHistory: [...args.conversationHistory],
    timestamp: Date.now(),
    summary: title,
  };
}
