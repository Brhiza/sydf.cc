import { computed, getCurrentInstance, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { DailyLimitService } from '@/services/dailyLimitService';
import { divinationService } from '@/services/divination';
import { historyService } from '@/services/history';
import {
  generateRegeneratedAI,
  regenerateConversationMessage,
} from '@/services/ai-regeneration';
import type { DailyFortuneData } from '@/types/divination';
import type { ChatMessage } from '@/types/chat';
import {
  getDailyPageTitle,
  getTodayDateString,
  hasVisibleDailyConversation,
} from './useDailyFortune.shared';
import { useDivinationConversation } from './useDivinationConversation';
import { useAbortableSession } from './useAbortableSession';
import { useRouteHistoryParam } from './useRouteHistoryParam';
import { createDailyFortuneFlows } from './useDailyFortune.flows';
import type { UseDailyFortuneOptions } from './useDailyFortune.types';

export function useDailyFortune(options: UseDailyFortuneOptions = {}) {
  const route = options.route ?? useRoute();
  const router = options.router ?? (getCurrentInstance() ? useRouter() : null);
  const currentHistoryService = options.historyService ?? historyService;
  const currentDivinationService = options.divinationService ?? divinationService;
  const currentDailyLimitService = options.dailyLimitService ?? DailyLimitService;
  const currentGenerateRegeneratedAI = options.generateRegeneratedAI ?? generateRegeneratedAI;
  const currentRegenerateConversationMessage =
    options.regenerateConversationMessage ?? regenerateConversationMessage;

  const selectedDate = ref(getTodayDateString());
  const isLoading = ref(false);
  const isAILoading = ref(false);
  const result = ref<DailyFortuneData | null>(null);
  const aiResponse = ref('');
  const isFromCache = ref(false);
  const error = ref<string | null>(null);
  const conversationHistory = ref<ChatMessage[]>([]);
  const followUpQuestion = ref('');
  const isFollowUpLoading = ref(false);
  const isCancelled = ref(false);

  const {
    createController,
    clearController,
    cancel: cancelAbortSession,
  } = useAbortableSession({ isCancelled });
  const { getRouteHistoryId, clearHistoryParam } = useRouteHistoryParam({
    route,
    router,
    fallbackPath: '/divination/daily',
  });

  const flows = createDailyFortuneFlows({
    state: { result, aiResponse, conversationHistory, isFromCache, error, isCancelled },
    selectedDate,
    followUpQuestion,
    isLoading,
    isAILoading,
    isFollowUpLoading,
    result,
    aiResponse,
    conversationHistory,
    historyService: currentHistoryService,
    divinationService: currentDivinationService,
    dailyLimitService: currentDailyLimitService,
    generateRegeneratedAI: currentGenerateRegeneratedAI,
    regenerateConversationMessage: currentRegenerateConversationMessage,
    createController,
    clearController,
    cancelAbortSession,
    getRouteHistoryId,
    clearHistoryParam,
  });

  const { hasAiResponse, handleSendFollowUp } = useDivinationConversation({
    conversationHistory,
    followUpQuestion,
    isFollowUpLoading,
    aiResponse,
    error,
    hasResult: () => result.value !== null,
    resolveRecordId: () => flows.resolveCurrentDailyRecord(selectedDate.value)?.id ?? '',
    divinationService: currentDivinationService,
  });

  const pageTitle = computed(() => getDailyPageTitle(selectedDate.value));
  const isDevMode = computed(() => options.isDevMode ?? import.meta.env.DEV);
  const hasVisibleConversation = computed(() => {
    return hasVisibleDailyConversation(conversationHistory.value, isFollowUpLoading.value);
  });

  currentDailyLimitService.cleanupExpiredRecord();

  watch(
    () => getRouteHistoryId(),
    (historyId, oldHistoryId) => {
      if (historyId) {
        flows.refreshHistoryState();
        return;
      }

      if (oldHistoryId && selectedDate.value) {
        flows.checkFortuneForDate(selectedDate.value);
      }
    },
    { immediate: true }
  );

  watch(
    selectedDate,
    (date, oldDate) => {
      if (getRouteHistoryId()) {
        return;
      }

      if (oldDate && oldDate !== date && (isLoading.value || isAILoading.value)) {
        flows.cancelGeneration();
      }
      if (date) {
        flows.checkFortuneForDate(date);
      }
    },
    { immediate: true }
  );

  return {
    route,
    selectedDate,
    isLoading,
    isAILoading,
    result,
    aiResponse,
    isFromCache,
    error,
    conversationHistory,
    followUpQuestion,
    isFollowUpLoading,
    isCancelled,
    hasAiResponse,
    pageTitle,
    isDevMode,
    hasVisibleConversation,
    startDailyFortune: flows.startDailyFortune,
    deleteTodayFortune: flows.deleteTodayFortune,
    handleClear: flows.handleClear,
    cancelGeneration: flows.cancelGeneration,
    handleRetry: flows.handleRetry,
    handleSendFollowUp,
    refreshHistoryState: flows.refreshHistoryState,
  };
}
