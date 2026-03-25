import { ref } from 'vue';
import type { HistoryRecord } from '@/types/common';
import type { ChatMessageRetryTarget } from '@/types/chat';
import { historyService } from '@/services/history';
import {
  buildRegeneratedConversationHistory,
  buildUpdatedHistoryRecord,
  generateRegeneratedAI,
  regenerateConversationMessage,
} from '@/services/ai-regeneration';

interface HistoryServiceLike {
  updateRecord: (id: string, record: HistoryRecord) => boolean;
}

interface UseHistoryAIOptions {
  historyService?: HistoryServiceLike;
  generateRegeneratedAI?: typeof generateRegeneratedAI;
  regenerateConversationMessage?: typeof regenerateConversationMessage;
}

export function useHistoryAI(options: UseHistoryAIOptions = {}) {
  const isRetryingAI = ref(false);
  const currentHistoryService = options.historyService ?? historyService;
  const currentGenerateRegeneratedAI = options.generateRegeneratedAI ?? generateRegeneratedAI;
  const currentRegenerateConversationMessage =
    options.regenerateConversationMessage ?? regenerateConversationMessage;

  /**
   * 检测AI响应是否包含错误
   * @param record - 历史记录
   * @returns 错误信息或 null
   */
  function getAIError(record: HistoryRecord): string | null {
    if (!record.result.aiResponse) {
      return 'AI解读暂时不可用，请稍后重试';
    }

    const errorKeywords = [
      '抱歉',
      '暂时不可用',
      '请稍后重试',
      '出小差',
      '请求过于频繁',
      '服务器暂时繁忙',
    ];
    const hasError = errorKeywords.some(keyword => record.result.aiResponse?.includes(keyword));

    return hasError ? record.result.aiResponse : null;
  }

  /**
   * 重试AI解读
   * @param record - 历史记录
   */
  async function handleRetryAI(record: HistoryRecord, target?: ChatMessageRetryTarget) {
    if (isRetryingAI.value) return;

    isRetryingAI.value = true;

    try {
      const regenerated = target
        ? await currentRegenerateConversationMessage(record, target)
        : await currentGenerateRegeneratedAI(record);
      const updatedRecord = buildUpdatedHistoryRecord(record, regenerated);
      Object.assign(record, updatedRecord);
      currentHistoryService.updateRecord(record.id, updatedRecord);
    } catch (error) {
      console.error('重试AI解读失败:', error);
      const errorMessage = error instanceof Error ? error.message : '重新生成失败，请稍后重试';
      const fallbackConversationHistory = buildRegeneratedConversationHistory(record, errorMessage);
      const updatedRecord = buildUpdatedHistoryRecord(record, {
        aiResponse: errorMessage,
        conversationHistory: fallbackConversationHistory,
      });
      Object.assign(record, updatedRecord);
      currentHistoryService.updateRecord(record.id, updatedRecord);
    } finally {
      isRetryingAI.value = false;
    }
  }

  return {
    isRetryingAI,
    getAIError,
    handleRetryAI,
  };
}
