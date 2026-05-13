import { computed, type ComputedRef, type Ref } from 'vue';
import { divinationService } from '@/services/divination';
import type { ChatMessage } from '@/types/chat';

interface DivinationServiceLike {
  sendFollowUp: typeof divinationService.sendFollowUp;
}

export interface UseDivinationConversationOptions {
  conversationHistory: Ref<ChatMessage[]>;
  followUpQuestion: Ref<string>;
  isFollowUpLoading: Ref<boolean>;
  aiResponse: Ref<string>;
  error: Ref<string | null>;
  hasResult: () => boolean;
  resolveRecordId: () => string;
  divinationService?: DivinationServiceLike;
  missingRecordError?: string;
}

export interface DivinationConversation {
  hasAiResponse: ComputedRef<boolean>;
  handleSendFollowUp: () => void;
}

export function useDivinationConversation(
  options: UseDivinationConversationOptions
): DivinationConversation {
  const currentDivinationService = options.divinationService ?? divinationService;
  const missingRecordError = options.missingRecordError ?? '占卜记录尚未保存完成，请稍后再试';

  const hasAiResponse = computed(() => {
    if (options.aiResponse.value === '') return false;
    const primary = options.conversationHistory.value.find((message) => message.role === 'assistant');
    return !primary?.isError;
  });

  function handleSendFollowUp() {
    if (
      !options.followUpQuestion.value.trim() ||
      options.isFollowUpLoading.value ||
      !options.hasResult()
    ) {
      return;
    }

    options.isFollowUpLoading.value = true;
    const currentConversation = [...options.conversationHistory.value];
    const originalQuestion = options.followUpQuestion.value.trim();
    options.followUpQuestion.value = '';

    const recordId = options.resolveRecordId();
    if (!recordId) {
      options.error.value = missingRecordError;
      options.isFollowUpLoading.value = false;
      return;
    }

    currentDivinationService.sendFollowUp(recordId, currentConversation, originalQuestion, {
      onChunk: () => {
        // 对话历史通过 onConversationUpdate 同步
      },
      onComplete: () => {
        options.isFollowUpLoading.value = false;
      },
      onError: (errorMessage) => {
        options.error.value = errorMessage;
        options.isFollowUpLoading.value = false;
      },
      onConversationUpdate: (updatedHistory) => {
        options.conversationHistory.value = updatedHistory;
      },
    });
  }

  return { hasAiResponse, handleSendFollowUp };
}
