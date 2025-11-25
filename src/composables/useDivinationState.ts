/**
 * 占卜状态管理组合式函数
 * 负责管理占卜相关的所有状态
 */
import type { DivinationType } from '@/types';
import type { DivinationResult } from '@/services';
import type { ChatMessage } from '@/types/chat';
import { ref, computed } from 'vue';

export function useDivinationState(props: { divinationType: DivinationType }) {
  // 状态
  const question = ref('');
  const isLoading = ref(false);
  const result = ref<DivinationResult | null>(null);
  const aiResponse = ref('');
  const error = ref<string | null>(null);
  const isAiLoading = ref(false);
  const viewingHistory = ref(false); // 状态锁
  const isCopied = ref(false);
  const abortController = ref<AbortController | null>(null);
  const isCancelled = ref(false);
  const conversationHistory = ref<ChatMessage[]>([]);
  const followUpQuestion = ref('');
  const isFollowUpLoading = ref(false);

  // 计算属性
  const hasResult = computed(() => result.value !== null);
  const hasAiResponse = computed(() => aiResponse.value !== '');
  const type = computed(() => props.divinationType);

  // 方法
  function clearResult() {
    result.value = null;
    aiResponse.value = '';
    error.value = null;
    question.value = '';
    viewingHistory.value = false; // 释放锁
    conversationHistory.value = [];
    followUpQuestion.value = '';
  }

  function resetLoadingStates() {
    isLoading.value = false;
    isAiLoading.value = false;
    isFollowUpLoading.value = false;
  }

  function setInitialResult(initialResult: DivinationResult) {
    result.value = initialResult;
  }

  function updateResult(newResult: DivinationResult) {
    if (result.value && newResult.id) {
      result.value.id = newResult.id;
      result.value.data = newResult.data;
      result.value.aiResponse = newResult.aiResponse || '';
    }
  }

  function updateAIResponse(response: string) {
    aiResponse.value = response;
  }

  function setError(err: string | null) {
    error.value = err;
  }

  function setAbortController(controller: AbortController | null) {
    abortController.value = controller;
  }

  function setCancelled(cancelled: boolean) {
    isCancelled.value = cancelled;
  }

  function setConversationHistory(history: ChatMessage[]) {
    conversationHistory.value = history;
  }

  function addConversationMessage(message: ChatMessage) {
    conversationHistory.value.push(message);
  }

  function setFollowUpQuestion(question: string) {
    followUpQuestion.value = question;
  }

  function setCopied(copied: boolean) {
    isCopied.value = copied;
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
    isCopied,
    isCancelled,
    conversationHistory,
    followUpQuestion,
    isFollowUpLoading,
    type,

    // 计算属性
    hasResult,
    hasAiResponse,

    // 方法
    clearResult,
    resetLoadingStates,
    setInitialResult,
    updateResult,
    updateAIResponse,
    setError,
    setAbortController,
    setCancelled,
    setConversationHistory,
    addConversationMessage,
    setFollowUpQuestion,
    setCopied,
  };
}
