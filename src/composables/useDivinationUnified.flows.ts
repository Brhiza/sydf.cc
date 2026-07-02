import {
  applyAIErrorState as applyAIErrorStateHelper,
  buildUpdatedHistoryRecord,
  executeAIRegeneration,
  shouldSyncPrimaryRegenerationResponse,
} from '@/services/ai-regeneration';
import type { ChatMessage, ChatMessageRetryTarget } from '@/types/chat';
import type { DivinationRequest, DivinationResult, SupplementaryInfo } from '@/types';
import type { HistoryRecord } from '@/types/common';
import { cloneSerializable } from '@/utils/clone';
import { isHistoryRouteCompatible } from '@/utils/history-navigation';
import { normalizeQuestionText } from '@/shared/question-text';
import type { DivinationUnifiedFlowsContext } from './useDivinationUnified.types';

export function createDivinationUnifiedFlows(ctx: DivinationUnifiedFlowsContext) {
  const {
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
    historyService,
    performDivination,
    generateRegeneratedAI,
    regenerateConversationMessage,
    createController,
    clearController,
    cancelAbortSession,
    getRouteHistoryId,
    clearHistoryParam,
  } = ctx;

  function invalidateCurrentSession() {
    currentSessionId.value += 1;
  }

  function resetLoadingState() {
    isLoading.value = false;
    isAiLoading.value = false;
    isFollowUpLoading.value = false;
  }

  function resetConversationState() {
    conversationHistory.value = [];
    followUpQuestion.value = '';
  }

  function resetDisplayedState() {
    result.value = null;
    aiResponse.value = '';
    error.value = null;
    isCancelled.value = false;
  }

  function cancelGeneration() {
    cancelAbortSession(() => {
      isAiLoading.value = false;
      isFollowUpLoading.value = false;
    });
  }

  function cloneHistoryRecord(record: HistoryRecord): HistoryRecord {
    return {
      ...record,
      result: {
        ...record.result,
        data: cloneSerializable(record.result.data),
        ...(record.result.supplementaryInfo
          ? {
              supplementaryInfo: cloneSerializable(record.result.supplementaryInfo),
            }
          : {}),
      },
      conversationHistory: record.conversationHistory
        ? cloneSerializable(record.conversationHistory)
        : [],
    };
  }

  function buildCurrentHistoryRecord(): HistoryRecord | null {
    if (!result.value) {
      return null;
    }

    const recordId = result.value.id || getRouteHistoryId() || '';
    const historyRecord = recordId ? historyService.getRecord(recordId) : undefined;
    if (historyRecord) {
      return cloneHistoryRecord(historyRecord);
    }

    return {
      id: recordId || `temporary-${Date.now()}`,
      type: type.value,
      question: normalizeQuestionText(question.value),
      result: {
        type: type.value,
        data: cloneSerializable(result.value.data),
        aiResponse: aiResponse.value,
        ...(result.value.supplementaryInfo
          ? { supplementaryInfo: cloneSerializable(result.value.supplementaryInfo) }
          : {}),
      },
      conversationHistory: cloneSerializable(conversationHistory.value),
      timestamp: Date.now(),
      summary: normalizeQuestionText(question.value) || '占卜结果',
    };
  }

  function applyHistoryRecord(record: HistoryRecord) {
    question.value = record.question;
    result.value = {
      id: record.id,
      ...cloneSerializable(record.result),
    };
    aiResponse.value = record.result.aiResponse || '';
    conversationHistory.value = cloneSerializable(record.conversationHistory || []);
    error.value = null;
    isCancelled.value = false;
  }

  function applyAIErrorState(record: HistoryRecord, errorMessage: string) {
    applyAIErrorStateHelper(record, errorMessage, {
      conversationHistory,
      result,
      historyService,
    });
  }

  async function startDivination(
    options: {
      spreadType?: string;
      supplementaryInfo?: SupplementaryInfo | undefined;
    } = {}
  ) {
    const normalizedQuestion = normalizeQuestionText(question.value);
    if (isLoading.value || !normalizedQuestion) return;

    invalidateCurrentSession();
    const thisSessionId = currentSessionId.value;

    isLoading.value = true;
    isAiLoading.value = true;
    error.value = null;
    result.value = null;
    aiResponse.value = '';
    isCancelled.value = false;
    const requestController = createController();
    resetConversationState();

    const { supplementaryInfo, ...restOptions } = options;
    const request: DivinationRequest = {
      type: type.value,
      question: normalizedQuestion,
      ...restOptions,
      signal: requestController.signal,
    };

    if (supplementaryInfo) {
      request.supplementaryInfo = supplementaryInfo;
    }

    performDivination(request, {
      onInitialResult: (initialResult: DivinationResult) => {
        if (thisSessionId !== currentSessionId.value) return;
        result.value = initialResult;
        isLoading.value = false;
      },
      onAIChunk: (chunk) => {
        if (thisSessionId !== currentSessionId.value) return;
        aiResponse.value += chunk;
      },
      onAIComplete: (finalResult: DivinationResult) => {
        if (thisSessionId !== currentSessionId.value) return;
        isAiLoading.value = false;
        aiResponse.value = finalResult.aiResponse || '';
        if (result.value) {
          result.value.aiResponse = finalResult.aiResponse || '';
        }
      },
      onAIError: (errorMessage: string) => {
        if (thisSessionId !== currentSessionId.value) return;
        error.value = errorMessage;
        const currentRecord = buildCurrentHistoryRecord();
        if (currentRecord) {
          applyAIErrorState(currentRecord, errorMessage);
        }
        isAiLoading.value = false;
        isLoading.value = false;
      },
      onConversationUpdate: (history: ChatMessage[]) => {
        if (thisSessionId !== currentSessionId.value) return;
        conversationHistory.value = history;
      },
    });
  }

  function clearResult() {
    clearController(true);
    invalidateCurrentSession();
    resetLoadingState();
    resetDisplayedState();
    question.value = '';
    viewingHistory.value = false;
    resetConversationState();
  }

  function detachResultForBackground() {
    invalidateCurrentSession();
    clearController();
    resetLoadingState();
    resetDisplayedState();
    question.value = '';
    viewingHistory.value = false;
    resetConversationState();
  }

  function detachActiveSession() {
    invalidateCurrentSession();
    clearController();
    resetLoadingState();
    error.value = null;
    isCancelled.value = false;
  }

  function loadResultFromHistory(historyId: string) {
    viewingHistory.value = true;
    detachActiveSession();
    const record = historyService.getRecord(historyId);

    if (record && isHistoryRouteCompatible(type.value, record.type)) {
      applyHistoryRecord(record);
    } else {
      viewingHistory.value = false;
      console.error('未找到历史记录:', historyId);
      router.push(`/divination/${type.value}`);
    }
  }

  function refreshHistoryState() {
    const historyId = getRouteHistoryId();
    if (!historyId) {
      return;
    }

    const record = historyService.getRecord(historyId);
    if (!record || !isHistoryRouteCompatible(type.value, record.type)) {
      clearResult();
      clearHistoryParam();
      return;
    }

    viewingHistory.value = true;
    applyHistoryRecord(record);
  }

  async function regenerateAI(target?: ChatMessageRetryTarget) {
    if (!result.value) return;

    const record = buildCurrentHistoryRecord();
    if (!record) return;
    const shouldSyncPrimaryResponse = shouldSyncPrimaryRegenerationResponse(record, target);

    clearController(true);
    invalidateCurrentSession();
    const thisSessionId = currentSessionId.value;

    error.value = null;
    isCancelled.value = false;
    isLoading.value = false;
    isAiLoading.value = true;
    if (shouldSyncPrimaryResponse) {
      aiResponse.value = '';
      if (result.value) {
        result.value.aiResponse = '';
      }
    }
    resetConversationState();
    const requestController = createController();
    const execution = await executeAIRegeneration({
      record,
      target,
      signal: requestController.signal,
      shouldSyncPrimaryResponse,
      generateRegeneratedAI,
      regenerateConversationMessage,
      isStale: () => thisSessionId !== currentSessionId.value,
      isCancelled: () => requestController.signal.aborted,
      onPrimaryChunk: (chunk: string) => {
        aiResponse.value += chunk;
        if (result.value) {
          result.value.aiResponse = aiResponse.value;
        }
      },
      onConversationUpdate: (history: ChatMessage[]) => {
        conversationHistory.value = history;
      },
    });

    if (execution.status === 'stale') return;

    if (execution.status === 'completed') {
      conversationHistory.value = execution.regenerated.conversationHistory;
      aiResponse.value = execution.regenerated.aiResponse;
      if (result.value) {
        result.value.aiResponse = execution.regenerated.aiResponse;
      }

      historyService.updateRecord?.(
        record.id,
        buildUpdatedHistoryRecord(record, execution.regenerated)
      );
      isAiLoading.value = false;
      clearController();
      return;
    }

    if (execution.status === 'cancelled') {
      isCancelled.value = true;
      error.value = null;
    } else {
      error.value = execution.errorMessage;
      applyAIErrorState(record, execution.errorMessage);
    }

    isAiLoading.value = false;
    clearController();
  }

  function handleHistoryParam() {
    const historyId = getRouteHistoryId();
    if (historyId) {
      loadResultFromHistory(historyId);
    }
  }

  return {
    startDivination,
    clearResult,
    detachResultForBackground,
    loadResultFromHistory,
    refreshHistoryState,
    regenerateAI,
    cancelGeneration,
    handleHistoryParam,
  };
}
