/**
 * 统一的占卜组合式函数
 * 作为 Service 和 Vue 组件之间的桥梁
 */
import type {
  DivinationType,
  SupplementaryInfo,
  DivinationResult,
  DivinationRequest,
} from '@/types';
import type { HistoryRecord } from '@/types/common';
import type { ChatMessage, ChatMessageRetryTarget } from '@/types/chat';
import { divinationService, performDivination } from '@/services';
import {
  buildRegeneratedConversationHistory,
  buildUpdatedHistoryRecord,
  generateRegeneratedAI,
  regenerateConversationMessage,
} from '@/services/ai-regeneration';
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { LocationQueryRaw } from 'vue-router';
import { historyService } from '@/services/history';
import { isAIErrorMessage } from '@/utils/ai-error';

interface RouteLike {
  path: string;
  query: LocationQueryRaw;
}

interface RouterLike {
  push: (to: string | { path: string; query?: LocationQueryRaw }) => unknown;
  replace: (to: { path: string; query?: LocationQueryRaw }) => unknown;
}

interface HistoryRecordLike {
  id: string;
  type: DivinationType;
  question: string;
  result: HistoryRecord['result'];
  conversationHistory?: ChatMessage[];
  timestamp: number;
  summary: string;
}

interface HistoryServiceLike {
  getRecord: (id: string) => HistoryRecordLike | undefined;
  updateRecord?: (id: string, record: HistoryRecordLike) => boolean;
}

interface DivinationServiceLike {
  sendFollowUp: typeof divinationService.sendFollowUp;
}

interface UseDivinationUnifiedOptions {
  route?: RouteLike;
  router?: RouterLike;
  historyService?: HistoryServiceLike;
  divinationService?: DivinationServiceLike;
  performDivination?: typeof performDivination;
  generateRegeneratedAI?: typeof generateRegeneratedAI;
  regenerateConversationMessage?: typeof regenerateConversationMessage;
}

/**
 * 统一占卜组合式函数
 */
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

  // 状态
  const question = ref('');
  const isLoading = ref(false);
  const result = ref<DivinationResult | null>(null);
  const aiResponse = ref('');
  const error = ref<string | null>(null);
  const isAiLoading = ref(false);
  const viewingHistory = ref(false);
  const abortController = ref<AbortController | null>(null);
  const isCancelled = ref(false);
  const conversationHistory = ref<ChatMessage[]>([]);
  const followUpQuestion = ref('');
  const isFollowUpLoading = ref(false);
  // 用于追踪当前活跃的请求会话ID，解决"上一条结果显示在当前"的问题，同时支持后台生成
  const currentSessionId = ref(0);

  // 计算属性
  const hasResult = computed(() => result.value !== null);
  const hasAiResponse = computed(
    () => aiResponse.value !== '' && !isAIErrorMessage(aiResponse.value)
  );

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

  function clearAbortController(abort = false) {
    if (abort && abortController.value) {
      abortController.value.abort();
    }

    abortController.value = null;
  }

  /**
   * 取消AI生成
   */
  function cancelGeneration() {
    if (abortController.value) {
      abortController.value.abort();
      isCancelled.value = true;
      isAiLoading.value = false;
      isFollowUpLoading.value = false;
    }
  }

  /**
   * 执行占卜
   */
  async function startDivination(
    options: {
      signNumber?: number;
      spreadType?: string;
      supplementaryInfo?: SupplementaryInfo | undefined;
    } = {}
  ) {
    if (isLoading.value || !question.value.trim()) return;

    // 增加会话ID，标记新的请求开始
    invalidateCurrentSession();
    const thisSessionId = currentSessionId.value;

    // 注意：不再中止上一次的请求(abortController)，让其在后台继续完成并保存到历史记录
    // 仅更新当前UI引用的 abortController 为新的，以便用户点击"取消"时只取消当前任务

    // 重置状态
    isLoading.value = true;
    isAiLoading.value = true;
    error.value = null;
    result.value = null;
    aiResponse.value = '';
    isCancelled.value = false;
    abortController.value = new AbortController();
    // 强制清空对话历史，防止上一次的记录残留
    resetConversationState();

    const { supplementaryInfo, ...restOptions } = options;
    const request: DivinationRequest = {
      type: type.value,
      question: question.value.trim(),
      ...restOptions,
      signal: abortController.value.signal,
    };

    if (supplementaryInfo) {
      request.supplementaryInfo = supplementaryInfo;
    }

    currentPerformDivination(request, {
      onInitialResult: (initialResult: DivinationResult) => {
        if (thisSessionId !== currentSessionId.value) return;
        result.value = initialResult;
        isLoading.value = false; // 允许UI立即渲染
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

  /**
   * 清除结果
   */
  function clearResult() {
    // 用户显式清除时，可以选择是否中止后台生成。
    // 为了节省资源，显式"返回/清除"操作仍然建议中止当前正在进行的任务
    clearAbortController(true);

    // 增加会话ID，确保任何残留的后台回调不会更新UI
    invalidateCurrentSession();

    resetLoadingState();
    resetDisplayedState();
    question.value = '';
    viewingHistory.value = false;
    resetConversationState();
  }

  function detachActiveSession() {
    invalidateCurrentSession();
    clearAbortController();
    resetLoadingState();
    error.value = null;
    isCancelled.value = false;
  }

  function buildCurrentHistoryRecord(): HistoryRecordLike | null {
    if (!result.value) {
      return null;
    }

    const recordId = result.value.id || (route.query.historyId as string) || '';
    const historyRecord = recordId ? currentHistoryService.getRecord(recordId) : undefined;
    if (historyRecord) {
      return JSON.parse(JSON.stringify(historyRecord)) as HistoryRecordLike;
    }

    return {
      id: recordId || `temporary-${Date.now()}`,
      type: type.value,
      question: question.value.trim(),
      result: {
        type: type.value,
        data: JSON.parse(JSON.stringify(result.value.data)),
        aiResponse: aiResponse.value,
        ...(result.value.supplementaryInfo
          ? { supplementaryInfo: result.value.supplementaryInfo }
          : {}),
      },
      conversationHistory: [...conversationHistory.value],
      timestamp: Date.now(),
      summary: question.value.trim() || '占卜结果',
    };
  }

  function applyAIErrorState(record: HistoryRecordLike, errorMessage: string) {
    const fallbackConversationHistory = buildRegeneratedConversationHistory(
      record as HistoryRecord,
      errorMessage
    );

    conversationHistory.value = fallbackConversationHistory;

    if (result.value) {
      result.value.aiResponse = errorMessage;
    }

    currentHistoryService.updateRecord?.(
      record.id,
      buildUpdatedHistoryRecord(record as HistoryRecord, {
        aiResponse: errorMessage,
        conversationHistory: fallbackConversationHistory,
        target: 'primary',
      })
    );
  }

  /**
   * 从历史记录加载
   */
  function loadResultFromHistory(historyId: string) {
    viewingHistory.value = true;
    detachActiveSession();
    const record = currentHistoryService.getRecord(historyId);

    if (record) {
      question.value = record.question;
      result.value = {
        id: record.id,
        ...JSON.parse(JSON.stringify(record.result)),
      };
      aiResponse.value = record.result.aiResponse || '';
      conversationHistory.value = record.conversationHistory || [];
    } else {
      viewingHistory.value = false;
      console.error('未找到历史记录:', historyId);
      router.push(`/divination/${type.value}`);
    }
  }

  /**
   * 重新生成AI解读 (此功能现在由Service层处理，这里仅作调用)
   */
  async function regenerateAI(target?: ChatMessageRetryTarget) {
    if (!result.value) return;

    const record = buildCurrentHistoryRecord();
    if (!record) return;

    clearAbortController(true);
    invalidateCurrentSession();
    const thisSessionId = currentSessionId.value;

    error.value = null;
    isCancelled.value = false;
    isLoading.value = false;
    isAiLoading.value = true;
    aiResponse.value = '';
    resetConversationState();
    abortController.value = new AbortController();

    try {
      const regenerated = target
        ? await currentRegenerateConversationMessage(record, target, {
            signal: abortController.value.signal,
            onConversationUpdate: (history) => {
              if (thisSessionId !== currentSessionId.value) return;
              conversationHistory.value = history;
            },
          })
        : await currentGenerateRegeneratedAI(record, {
            signal: abortController.value.signal,
            onChunk: (chunk) => {
              if (thisSessionId !== currentSessionId.value) return;
              aiResponse.value += chunk;
            },
            onConversationUpdate: (history) => {
              if (thisSessionId !== currentSessionId.value) return;
              conversationHistory.value = history;
            },
          });

      if (thisSessionId !== currentSessionId.value) return;

      conversationHistory.value = regenerated.conversationHistory;
      aiResponse.value = regenerated.aiResponse;
      if (result.value) {
        result.value.aiResponse = regenerated.aiResponse;
      }

      currentHistoryService.updateRecord?.(
        record.id,
        buildUpdatedHistoryRecord(record as HistoryRecord, regenerated)
      );
      isAiLoading.value = false;
      clearAbortController();
    } catch (regenerationError) {
      if (thisSessionId !== currentSessionId.value) return;

      if (abortController.value?.signal.aborted) {
        isCancelled.value = true;
        error.value = null;
      } else {
        const errorMessage =
          regenerationError instanceof Error
            ? regenerationError.message
            : '重新生成失败，请稍后重试';
        error.value = errorMessage;
        applyAIErrorState(record, errorMessage);
      }

      isAiLoading.value = false;
      clearAbortController();
    }
  }

  /**
   * 发送追问
   */
  function handleSendFollowUp() {
    if (!followUpQuestion.value.trim() || isFollowUpLoading.value || !result.value) return;

    isFollowUpLoading.value = true;
    const currentConversation = [...conversationHistory.value];
    const originalQuestion = followUpQuestion.value.trim();
    followUpQuestion.value = ''; // Clear input immediately

    const recordId = result.value.id || (route.query.historyId as string) || '';

    if (!recordId) {
      error.value = '无法找到占卜记录，请重新占卜后再试';
      isFollowUpLoading.value = false;
      return;
    }
    currentDivinationService.sendFollowUp(recordId, currentConversation, originalQuestion, {
      onChunk: () => {
        // The conversationHistory is updated via the onConversationUpdate callback
      },
      onComplete: () => {
        isFollowUpLoading.value = false;
      },
      onError: (errorMessage) => {
        error.value = errorMessage;
        isFollowUpLoading.value = false;
      },
      onConversationUpdate: (updatedHistory) => {
        conversationHistory.value = updatedHistory;
      },
    });
  }

  /**
   * 处理历史记录参数
   */
  function handleHistoryParam() {
    const historyId = route.query.historyId as string;
    if (historyId) {
      loadResultFromHistory(historyId);
    }
  }

  /**
   * 清除历史记录参数
   */
  function clearHistoryParam() {
    if (route.query.historyId) {
      const newQuery: LocationQueryRaw = { ...route.query };
      delete newQuery.historyId;
      router.replace({ path: route.path, query: newQuery });
    }
  }

  return {
    // 状态
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

    // 计算属性
    hasResult,
    hasAiResponse,

    // 方法
    startDivination,
    clearResult,
    loadResultFromHistory,
    regenerateAI,
    clearHistoryParam,
    cancelGeneration,
    handleSendFollowUp,
    handleHistoryParam,
  };
}
