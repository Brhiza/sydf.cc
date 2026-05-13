import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type {
  DivinationResult,
  DivinationType,
} from '@/types';
import type { ChatMessage } from '@/types/chat';
import { divinationService, performDivination } from '@/services/divination';
import {
  generateRegeneratedAI,
  regenerateConversationMessage,
} from '@/services/ai-regeneration';
import { historyService } from '@/services/history';
import { useDivinationConversation } from './useDivinationConversation';
import { useAbortableSession } from './useAbortableSession';
import { useRouteHistoryParam } from './useRouteHistoryParam';
import { createDivinationUnifiedFlows } from './useDivinationUnified.flows';
import type { UseDivinationUnifiedOptions } from './useDivinationUnified.types';

export function useDivinationUnified(
  props: { divinationType: DivinationType },
  options: UseDivinationUnifiedOptions = {}
) {
  const route = options.route ?? useRoute();
  const router = options.router ?? useRouter();
  const currentHistoryService = options.historyService ?? historyService;
  const currentDivinationService = options.divinationService ?? divinationService;
  const currentPerformDivination = options.performDivination ?? performDivination;
  const currentGenerateRegeneratedAI = options.generateRegeneratedAI ?? generateRegeneratedAI;
  const currentRegenerateConversationMessage =
    options.regenerateConversationMessage ?? regenerateConversationMessage;
  const type = computed(() => props.divinationType);

  const question = ref('');
  const isLoading = ref(false);
  const result = ref<DivinationResult | null>(null);
  const aiResponse = ref('');
  const error = ref<string | null>(null);
  const isAiLoading = ref(false);
  const viewingHistory = ref(false);
  const isCancelled = ref(false);
  const conversationHistory = ref<ChatMessage[]>([]);
  const followUpQuestion = ref('');
  const isFollowUpLoading = ref(false);
  const currentSessionId = ref(0);

  const {
    abortController,
    createController,
    clearController,
    cancel: cancelAbortSession,
  } = useAbortableSession({ isCancelled });
  const { getRouteHistoryId, clearHistoryParam } = useRouteHistoryParam({
    route,
    router,
  });

  const hasResult = computed(() => result.value !== null);
  const { hasAiResponse, handleSendFollowUp } = useDivinationConversation({
    conversationHistory,
    followUpQuestion,
    isFollowUpLoading,
    aiResponse,
    error,
    hasResult: () => result.value !== null,
    resolveRecordId: () => result.value?.id || getRouteHistoryId() || '',
    divinationService: currentDivinationService,
    missingRecordError: '无法找到占卜记录，请重新占卜后再试',
  });

  const flows = createDivinationUnifiedFlows({
    type,
    question,
    isLoading,
    result,
    aiResponse,
    error,
    isAiLoading,
    viewingHistory,
    isCancelled,
    conversationHistory,
    followUpQuestion,
    isFollowUpLoading,
    currentSessionId,
    router,
    historyService: currentHistoryService,
    performDivination: currentPerformDivination,
    generateRegeneratedAI: currentGenerateRegeneratedAI,
    regenerateConversationMessage: currentRegenerateConversationMessage,
    abortController,
    createController,
    clearController,
    cancelAbortSession,
    getRouteHistoryId,
    clearHistoryParam,
  });

  return {
    question,
    isLoading,
    result,
    aiResponse,
    error,
    isAiLoading,
    viewingHistory,
    isCancelled,
    conversationHistory,
    followUpQuestion,
    isFollowUpLoading,

    hasResult,
    hasAiResponse,

    startDivination: flows.startDivination,
    clearResult: flows.clearResult,
    detachResultForBackground: flows.detachResultForBackground,
    loadResultFromHistory: flows.loadResultFromHistory,
    refreshHistoryState: flows.refreshHistoryState,
    regenerateAI: flows.regenerateAI,
    clearHistoryParam,
    cancelGeneration: flows.cancelGeneration,
    handleSendFollowUp,
    handleHistoryParam: flows.handleHistoryParam,
  };
}
