import { DAILY_LIMIT_STORAGE_KEY } from '@/services/dailyLimitService';
import { storageService } from '@/services/storageService';
import {
  applyAIErrorState as applyAIErrorStateHelper,
  buildUpdatedHistoryRecord,
  executeAIRegeneration,
  shouldSyncPrimaryRegenerationResponse,
} from '@/services/ai-regeneration';
import type { ChatMessage, ChatMessageRetryTarget } from '@/types/chat';
import type { DailyFortuneData, DivinationResult } from '@/types/divination';
import type { HistoryRecord } from '@/types/common';
import {
  applyDailyRecordToState,
  clearDailyRecordFromState,
  createFallbackDailyHistoryRecord,
  getDailyDateLabel,
  getDailyStorageKeys,
  getTodayDateString,
  isRequestCancelled,
} from './useDailyFortune.shared';
import type { DailyFortuneFlowsContext } from './useDailyFortune.types';

export function createDailyFortuneFlows(ctx: DailyFortuneFlowsContext) {
  const {
    state,
    selectedDate,
    followUpQuestion,
    isLoading,
    isAILoading,
    isFollowUpLoading,
    result,
    aiResponse,
    conversationHistory,
    historyService,
    divinationService,
    dailyLimitService,
    generateRegeneratedAI,
    regenerateConversationMessage,
    createController,
    clearController,
    cancelAbortSession,
    getRouteHistoryId,
    clearHistoryParam,
  } = ctx;

  function checkFortuneForDate(date: string) {
    const record = historyService.getDailyFortuneForDate(date);
    if (record) {
      applyDailyRecordToState(record, state);

      if (date === getTodayDateString() && !dailyLimitService.hasUsedToday()) {
        dailyLimitService.markAsUsed();
      }
    } else {
      clearDailyRecordFromState(state);
    }
  }

  function refreshHistoryState() {
    const historyId = getRouteHistoryId();
    if (historyId) {
      const record = historyService.getRecord?.(historyId);
      if (record) {
        applyDailyRecordToState(record, state);
        selectedDate.value = (record.result.data as DailyFortuneData).date || selectedDate.value;
        return;
      }

      handleClear();
      clearHistoryParam();
    }

    if (selectedDate.value) {
      checkFortuneForDate(selectedDate.value);
    }
  }

  function resolveCurrentDailyRecord(date: string): HistoryRecord | undefined {
    const historyId = getRouteHistoryId();
    if (historyId) {
      const historyRecord = historyService.getRecord?.(historyId);
      if (historyRecord) {
        return historyRecord;
      }
    }

    return historyService.getDailyFortuneForDate(date);
  }

  function applyAIErrorState(record: HistoryRecord, errorMessage: string) {
    applyAIErrorStateHelper(record, errorMessage, {
      conversationHistory,
      historyService,
    });
  }

  async function startDailyFortune() {
    if (isLoading.value || isAILoading.value) return;

    const date = selectedDate.value;
    const record = historyService.getDailyFortuneForDate(date);

    state.error.value = null;
    state.isCancelled.value = false;

    if (record) {
      applyDailyRecordToState(record, state);

      if (date === getTodayDateString() && !dailyLimitService.hasUsedToday()) {
        dailyLimitService.markAsUsed();
      }

      return;
    }

    const requestController = createController();

    isLoading.value = true;
    isAILoading.value = false;
    state.isFromCache.value = false;
    aiResponse.value = '';
    conversationHistory.value = [];

    await divinationService.startDivination(
      {
        type: 'daily',
        question: `请为我分析${date}的运势`,
        supplementaryInfo: { date },
        signal: requestController.signal,
      },
      {
        onInitialResult: (divinationResult: DivinationResult) => {
          if (isRequestCancelled(requestController)) return;
          result.value = divinationResult.data as DailyFortuneData;
          isLoading.value = false;
          isAILoading.value = true;
        },
        onAIChunk: (chunk) => {
          if (isRequestCancelled(requestController)) return;
          aiResponse.value += chunk;
        },
        onAIComplete: (finalResult) => {
          if (isRequestCancelled(requestController)) return;
          aiResponse.value = finalResult.aiResponse || '';
          isAILoading.value = false;
          isLoading.value = false;
          clearController();

          if (date === getTodayDateString()) {
            dailyLimitService.markAsUsed();
          }
        },
        onAIError: (errorMessage) => {
          if (isRequestCancelled(requestController)) return;
          isAILoading.value = false;
          isLoading.value = false;
          state.error.value = errorMessage;
          const fallback =
            resolveCurrentDailyRecord(date) ||
            createFallbackDailyHistoryRecord({
              date,
              result: result.value as DailyFortuneData,
              aiResponse: aiResponse.value,
              conversationHistory: conversationHistory.value,
            });
          applyAIErrorState(fallback, errorMessage);
          clearController();
        },
        onConversationUpdate: (updatedHistory) => {
          if (isRequestCancelled(requestController)) return;
          conversationHistory.value = updatedHistory;
        },
      }
    );
  }

  async function deleteTodayFortune() {
    const date = selectedDate.value;
    const dateLabel = getDailyDateLabel(date);
    if (!confirm(`确定要删除${dateLabel}运势吗？此操作将清除所有相关数据，不可撤销。`)) {
      return;
    }

    try {
      const record = resolveCurrentDailyRecord(date);
      if (record) {
        historyService.deleteRecord(record.id);
      }

      const keysToRemove = getDailyStorageKeys(date);

      if (date === getTodayDateString()) {
        keysToRemove.push(DAILY_LIMIT_STORAGE_KEY);
      }

      keysToRemove.forEach((key) => {
        storageService.removeItem(key);
      });

      handleClear();

      if (date === getTodayDateString()) {
        dailyLimitService.resetRecord();
      }

      checkFortuneForDate(date);

      alert(`${dateLabel}运势已彻底删除，页面已重置`);
    } catch {
      alert('删除失败，请稍后重试');
    }
  }

  function handleClear() {
    clearController(true);

    clearDailyRecordFromState(state);
    isLoading.value = false;
    isAILoading.value = false;
    state.isCancelled.value = false;
    state.error.value = null;
    followUpQuestion.value = '';
  }

  function cancelGeneration() {
    cancelAbortSession(() => {
      isAILoading.value = false;
      isLoading.value = false;
      isFollowUpLoading.value = false;
    });
  }

  async function handleRetry(target?: ChatMessageRetryTarget) {
    state.error.value = null;
    state.isCancelled.value = false;

    if (!result.value) {
      void startDailyFortune();
      return;
    }

    const record =
      resolveCurrentDailyRecord(selectedDate.value) ||
      createFallbackDailyHistoryRecord({
        date: selectedDate.value,
        result: result.value,
        aiResponse: aiResponse.value,
        conversationHistory: conversationHistory.value,
      });
    const shouldSyncPrimaryResponse = shouldSyncPrimaryRegenerationResponse(record, target);

    const requestController = createController();
    isAILoading.value = true;
    isLoading.value = false;
    if (shouldSyncPrimaryResponse) {
      aiResponse.value = '';
    }
    conversationHistory.value = [];

    const execution = await executeAIRegeneration({
      record,
      target,
      signal: requestController.signal,
      shouldSyncPrimaryResponse,
      generateRegeneratedAI,
      regenerateConversationMessage,
      isStale: () => isRequestCancelled(requestController),
      isCancelled: () => isRequestCancelled(requestController),
      onPrimaryChunk: (chunk: string) => {
        aiResponse.value += chunk;
      },
      onConversationUpdate: (updatedHistory: ChatMessage[]) => {
        conversationHistory.value = updatedHistory;
      },
    });

    if (execution.status === 'stale') return;

    if (execution.status === 'completed') {
      aiResponse.value = execution.regenerated.aiResponse;
      conversationHistory.value = execution.regenerated.conversationHistory;
      historyService.updateRecord(
        record.id,
        buildUpdatedHistoryRecord(record, execution.regenerated)
      );
    } else if (execution.status === 'cancelled') {
      state.isCancelled.value = true;
    } else {
      state.error.value = execution.errorMessage;
      applyAIErrorState(record, execution.errorMessage);
    }

    isAILoading.value = false;
    isLoading.value = false;
    clearController();
  }

  return {
    checkFortuneForDate,
    refreshHistoryState,
    resolveCurrentDailyRecord,
    startDailyFortune,
    deleteTodayFortune,
    handleClear,
    cancelGeneration,
    handleRetry,
  };
}
