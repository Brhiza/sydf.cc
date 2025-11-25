/**
 * AI交互组合式函数
 * 负责处理与AI相关的交互逻辑
 */
import type { DivinationType } from '@/types';
import type { DivinationResult } from '@/services';
import type { ChatMessage } from '@/types/chat';
import { ref } from 'vue';
import { getAIInsight } from '@/services/ai';
import { generateFollowUpPromptWrapper } from '@/services/prompts';

export function useAIInteraction() {
  const isAiLoading = ref(false);
  const abortController = ref<AbortController | null>(null);
  const isCancelled = ref(false);
  const conversationHistory = ref<ChatMessage[]>([]);
  const aiResponse = ref('');

  /**
   * 取消AI生成
   */
  function cancelGeneration() {
    if (abortController.value) {
      abortController.value.abort();
      isCancelled.value = true;
      isAiLoading.value = false;
    }
  }

  /**
   * 重新生成AI解读
   */
  async function regenerateAI(
    type: DivinationType,
    question: string,
    currentResult: DivinationResult | null,
    onAIChunk?: (chunk: string) => void,
    onAIError?: (error: string) => void,
    onAIComplete?: (result: DivinationResult) => void
  ) {
    if (!currentResult || isAiLoading.value) return;

    isAiLoading.value = true;
    isCancelled.value = false;
    abortController.value = new AbortController();

    try {
      // 调用实际的AI服务来重新生成解读
      const { performDivination } = await import('@/services');
      
      let aiResponseContent = '';
      
      await performDivination(
        {
          type,
          question,
          signal: abortController.value.signal,
        },
        {
          onInitialResult: (_result) => {
            // 初始结果回调
          },
          onAIChunk: (chunk: string) => {
            // 流式更新
            aiResponseContent += chunk;
            if (onAIChunk) {
              onAIChunk(chunk);
            }
          },
          onAIComplete: (_finalResult) => {
            // AI响应完成回调
            isAiLoading.value = false;
            if (onAIComplete) {
              onAIComplete({
                ...currentResult,
                aiResponse: aiResponseContent,
              });
            }
          },
          onAIError: (errorMessage: string) => {
            // AI错误回调
            if (onAIError) {
              onAIError(errorMessage);
            }
          },
          onConversationUpdate: (_history) => {
            // 对话历史更新回调
          }
        }
      );
    } catch (err) {
      console.error('重新生成AI解读失败:', err);
      if (onAIError) {
        onAIError('重新生成失败，请稍后重试');
      }
      isAiLoading.value = false;
    }
  }

  /**
   * 处理追问
   */
  async function handleSendFollowUp(
    followUpQuestion: string,
    originalQuestion: string,
    currentAIResponse: string,
    divinationType: DivinationType = 'liuyao',
    setFollowUpQuestion: (question: string) => void,
    setIsFollowUpLoading: (loading: boolean) => void,
    setAIResponse: (response: string) => void,
    setResultAIResponse: (response: string) => void
  ) {
    if (!followUpQuestion.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user' as const,
      content: followUpQuestion.trim(),
    };
    
    // 添加用户消息到对话历史
    conversationHistory.value.push(userMessage);
    
    const assistantMessage: ChatMessage = {
      id: `msg-${Date.now() + 1}`,
      role: 'assistant' as const,
      content: ''
    };
    conversationHistory.value.push(assistantMessage);

    // 清空追问输入框
    setFollowUpQuestion('');
    setIsFollowUpLoading(true);

    // 获取当前时间
    const currentTime = new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    
    // 使用新的追问提示词系统
    const followUpContext = {
      originalQuestion,
      originalResponse: currentAIResponse,
      divinationType,
      followUpQuestion,
      currentTime
    };

    // 生成专门的追问提示词
    const followUpPrompt = await generateFollowUpPromptWrapper(followUpContext);

    // 调用AI服务获取追问的回复
    getAIInsight(
      followUpPrompt,
      (chunk: string) => {
        // onChunk - 流式更新
        aiResponse.value += chunk;
        assistantMessage.content += chunk;
      },
      (finalContent: string) => {
        // onComplete - 完成回调
        setIsFollowUpLoading(false);
        setAIResponse(finalContent);
        setResultAIResponse(finalContent);
      },
      (errorMessage: string) => {
        // onError - 错误回调
        setIsFollowUpLoading(false);
        assistantMessage.content = errorMessage;
      }
    );
  }


  return {
    // 状态
    isAiLoading,
    abortController,
    isCancelled,
    conversationHistory,
    aiResponse,

    // 方法
    cancelGeneration,
    regenerateAI,
    handleSendFollowUp,
  };
}
