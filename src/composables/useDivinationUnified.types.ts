import type { ComputedRef, Ref } from 'vue';
import type { LocationQueryRaw } from 'vue-router';
import type {
  DivinationResult,
  DivinationType,
} from '@/types';
import type { ChatMessage } from '@/types/chat';
import type { HistoryRecord } from '@/types/common';
import type { divinationService, performDivination } from '@/services/divination';
import type {
  generateRegeneratedAI,
  regenerateConversationMessage,
} from '@/services/ai-regeneration';

export interface RouteLike {
  path: string;
  query: LocationQueryRaw;
}

export interface RouterLike {
  push: (to: string | { path: string; query?: LocationQueryRaw }) => unknown;
  replace: (to: { path: string; query?: LocationQueryRaw }) => unknown;
}

export interface HistoryServiceLike {
  getRecord: (id: string) => HistoryRecord | undefined;
  updateRecord?: (id: string, record: HistoryRecord) => boolean;
}

export interface DivinationServiceLike {
  sendFollowUp: typeof divinationService.sendFollowUp;
}

export interface UseDivinationUnifiedOptions {
  route?: RouteLike;
  router?: RouterLike;
  historyService?: HistoryServiceLike;
  divinationService?: DivinationServiceLike;
  performDivination?: typeof performDivination;
  generateRegeneratedAI?: typeof generateRegeneratedAI;
  regenerateConversationMessage?: typeof regenerateConversationMessage;
}

export interface DivinationUnifiedFlowsContext {
  type: ComputedRef<DivinationType>;
  question: Ref<string>;
  isLoading: Ref<boolean>;
  result: Ref<DivinationResult | null>;
  aiResponse: Ref<string>;
  error: Ref<string | null>;
  isAiLoading: Ref<boolean>;
  viewingHistory: Ref<boolean>;
  isCancelled: Ref<boolean>;
  conversationHistory: Ref<ChatMessage[]>;
  followUpQuestion: Ref<string>;
  isFollowUpLoading: Ref<boolean>;
  currentSessionId: Ref<number>;
  router: RouterLike;
  historyService: HistoryServiceLike;
  performDivination: typeof performDivination;
  generateRegeneratedAI: typeof generateRegeneratedAI;
  regenerateConversationMessage: typeof regenerateConversationMessage;
  abortController: Ref<AbortController | null>;
  createController: () => AbortController;
  clearController: (cancel?: boolean) => void;
  cancelAbortSession: (onCancel?: () => void) => boolean;
  getRouteHistoryId: () => string | null;
  clearHistoryParam: () => void;
}
