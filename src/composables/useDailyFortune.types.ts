import type { Ref } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import type { divinationService } from '@/services/divination';
import type {
  generateRegeneratedAI,
  regenerateConversationMessage,
} from '@/services/ai-regeneration';
import type { ChatMessage } from '@/types/chat';
import type { DailyFortuneData } from '@/types/divination';
import type { HistoryRecord } from '@/types/common';
import type {
  DailyFortuneRecordLike,
  DailyFortuneStateRefs,
} from './useDailyFortune.shared';

export interface RouteLike {
  path?: string;
  query: Record<string, unknown>;
}

export interface RouterLike {
  replace: (to: RouteLocationRaw) => unknown;
}

export interface DailyLimitServiceLike {
  hasUsedToday: () => boolean;
  markAsUsed: () => void;
  resetRecord: () => void;
  cleanupExpiredRecord: () => void;
}

export interface HistoryServiceLike {
  getRecord?: (id: string) => DailyFortuneRecordLike | HistoryRecord | undefined;
  getDailyFortuneForDate: (date: string) => DailyFortuneRecordLike | HistoryRecord | undefined;
  updateRecord: (id: string, record: HistoryRecord) => boolean;
  deleteRecord: (id: string) => boolean;
  findTodayDailyFortune: () => { id: string } | undefined;
}

export interface DivinationServiceLike {
  startDivination: typeof divinationService.startDivination;
  sendFollowUp: typeof divinationService.sendFollowUp;
}

export interface UseDailyFortuneOptions {
  route?: RouteLike;
  router?: RouterLike;
  historyService?: HistoryServiceLike;
  divinationService?: DivinationServiceLike;
  dailyLimitService?: DailyLimitServiceLike;
  isDevMode?: boolean;
  generateRegeneratedAI?: typeof generateRegeneratedAI;
  regenerateConversationMessage?: typeof regenerateConversationMessage;
}

export interface DailyFortuneFlowsContext {
  state: DailyFortuneStateRefs;
  selectedDate: Ref<string>;
  followUpQuestion: Ref<string>;
  isLoading: Ref<boolean>;
  isAILoading: Ref<boolean>;
  isFollowUpLoading: Ref<boolean>;
  result: Ref<DailyFortuneData | null>;
  aiResponse: Ref<string>;
  conversationHistory: Ref<ChatMessage[]>;
  historyService: HistoryServiceLike;
  divinationService: DivinationServiceLike;
  dailyLimitService: DailyLimitServiceLike;
  generateRegeneratedAI: typeof generateRegeneratedAI;
  regenerateConversationMessage: typeof regenerateConversationMessage;
  createController: () => AbortController;
  clearController: (cancel?: boolean) => void;
  cancelAbortSession: (onCancel?: () => void) => boolean;
  getRouteHistoryId: () => string | null;
  clearHistoryParam: () => void;
}
