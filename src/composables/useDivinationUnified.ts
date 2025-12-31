/**
 * 统一的占卜组合式函数
 * 作为 Service 和 Vue 组件之间的桥梁
 */
import type { DivinationType, ChatMessage, SupplementaryInfo, DivinationResult, DivinationRequest } from '@/types';
import { divinationService, performDivination } from '@/services';
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { historyService } from '@/services/history';

/**
 * 统一占卜组合式函数
 */
export function useDivinationUnified(props: { divinationType: DivinationType }) {
  const route = useRoute();
  const router = useRouter();
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
  const hasAiResponse = computed(() => aiResponse.value !== '');

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
    currentSessionId.value++;
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
    conversationHistory.value = [];
    
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

    performDivination(request, {
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
        if (result.value) {
          result.value.aiResponse = finalResult.aiResponse || '';
        }
      },
      onAIError: (errorMessage: string) => {
        if (thisSessionId !== currentSessionId.value) return;
        error.value = errorMessage;
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
    if (abortController.value) {
      abortController.value.abort();
      abortController.value = null;
    }
    
    // 增加会话ID，确保任何残留的后台回调不会更新UI
    currentSessionId.value++;

    isAiLoading.value = false;
    isFollowUpLoading.value = false;
    isCancelled.value = false;

    result.value = null;
    aiResponse.value = '';
    error.value = null;
    question.value = '';
    viewingHistory.value = false;
    // 强制清空对话历史
    conversationHistory.value = [];
    followUpQuestion.value = '';
  }

  /**
   * 从历史记录加载
   */
  function loadResultFromHistory(historyId: string) {
    viewingHistory.value = true;
    const record = historyService.getRecord(historyId);

    if (record) {
      question.value = record.question;
      result.value = JSON.parse(JSON.stringify(record.result));
      aiResponse.value = record.result.aiResponse || '';
      conversationHistory.value = record.conversationHistory || [];
    } else {
      console.error('未找到历史记录:', historyId);
      router.push(`/divination/${type.value}`);
    }
  }
  
  /**
   * 重新生成AI解读 (此功能现在由Service层处理，这里仅作调用)
   */
  async function regenerateAI() {
    // 注意：完整的重新生成逻辑（包括缓存、API调用等）已移至Service层。
    // Composable仅负责触发和更新UI。
    // 此处简化为重新执行占卜流程。
    if (!question.value) return;
    await startDivination();
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

    // 总是从历史记录中找到对应的记录ID，因为result.value.id可能不是实际保存的ID
    let recordId = '';
    
    // 对于今日运势，使用特殊方法查找
    if (type.value === 'daily') {
      const todayRecord = historyService.findTodayDailyFortune();
      if (todayRecord) {
        recordId = todayRecord.id;
      }
    } else {
      // 对于其他占卜类型，通过数据匹配查找记录
      const historyRecords = historyService.getRecords();
      const matchingRecord = historyRecords.find(record => 
        record.result.data && result.value?.data && 
        JSON.stringify(record.result.data) === JSON.stringify(result.value.data) &&
        record.type === type.value
      );
      if (matchingRecord) {
        recordId = matchingRecord.id;
      } else {
        // 如果找不到匹配的记录，尝试使用result.id（可能不准确）
        recordId = result.value.id;
      }
    }

    if (!recordId) {
      error.value = '无法找到占卜记录，请重新占卜后再试';
      isFollowUpLoading.value = false;
      return;
    }
    divinationService.sendFollowUp(
      recordId,
      currentConversation,
      originalQuestion,
      {
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
      }
    );
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
      const newQuery = { ...route.query };
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
