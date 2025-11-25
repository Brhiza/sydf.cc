import { ref } from 'vue';
import type { HistoryRecord } from '@/services/history';
import { historyService } from '@/services/history';
import { aiService } from '@/services/aiService';

export function useHistoryAI() {
  const isRetryingAI = ref(false);

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
  async function handleRetryAI(record: HistoryRecord) {
    if (isRetryingAI.value) return;

    isRetryingAI.value = true;

    try {
      const dataCopy = JSON.parse(JSON.stringify(record.result.data));
      
      // 使用 aiService 的 generateAIResponse 方法，它会自动使用正确的系统提示词
      const aiResponse = await aiService.generateAIResponse(
        record.type,
        record.question,
        dataCopy,
        undefined, // 没有补充信息
        undefined, // 没有信号
        undefined // 没有流式回调
      );

      if (aiResponse) {
        record.result.aiResponse = aiResponse;
        historyService.updateRecord(record.id, record);
      } else {
        throw new Error('AI服务返回空响应');
      }
    } catch (error) {
      console.error('重试AI解读失败:', error);
      const errorMessage = error instanceof Error ? error.message : '重新生成失败，请稍后重试';
      record.result.aiResponse = errorMessage;
      historyService.updateRecord(record.id, record);
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
