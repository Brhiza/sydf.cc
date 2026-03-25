/**
 * AI服务 - 专门处理AI相关的功能
 */
import type { ChatMessage } from '@/types/chat';
import { generateTwoStageAIResponseWithSystem, getAIInsight } from './ai';
import type { 
  DivinationType,
  DivinationData,
  LiuyaoData, 
  MeihuaData, 
  QimenData, 
  TarotData, 
  SsgwData,
  DailyFortuneData,
  SupplementaryInfo,
} from '@/types/divination';
import { generatePrompt, generateFollowUpPromptWrapper } from './prompts';
import { getFormattedTimeInfo, getDisplayTimeData } from './prompts/shared/time-utils';
import { handleError, logError, getUserFriendlyMessage } from '@/utils/error-handler';
import { buildDivinationSystemPrompt } from '@/shared/divination-system-prompt';

export interface AIServiceCallbacks {
  onAIChunk?: (chunk: string) => void;
  onAIError?: (error: string) => void;
}

export class AIService {
  /**
   * 生成AI响应
   */
  async generateAIResponse(
    type: DivinationType,
    question: string,
    data: LiuyaoData | MeihuaData | QimenData | TarotData | SsgwData | DailyFortuneData,
    supplementaryInfo: SupplementaryInfo | undefined,
    signal?: AbortSignal,
    onAIChunk?: (chunk: string) => void
  ): Promise<string> {
    try {
      // 使用分离的system和user prompt架构
      const systemPrompt = buildDivinationSystemPrompt(type);
      const promptGenerator = async (
        question: string,
        data: LiuyaoData | MeihuaData | QimenData | TarotData | SsgwData | DailyFortuneData
      ) => await generatePrompt(type, question, data, supplementaryInfo);

      const response = await generateTwoStageAIResponseWithSystem(
        question,
        promptGenerator,
        data,
        systemPrompt,
        signal,
        onAIChunk
      );

      return response.content ?? '';
    } catch (error) {
      const appError = handleError(error, 'AI响应生成失败');
      logError(appError, 'AI Service - generateAIResponse');
      throw new Error(getUserFriendlyMessage(appError));
    }
  }

  /**
   * 处理后续问题
   */
  async handleFollowUp(
    conversationHistory: ChatMessage[],
    followUpQuestion: string,
    callbacks: {
      onChunk: (chunk: string) => void;
      onComplete: () => void;
      onError: (error: string) => void;
      onConversationUpdate: (history: ChatMessage[]) => void;
    },
    context?: {
      originalQuestion?: string;
      originalResponse?: string;
      divinationType?: DivinationType;
      originalData?: DivinationData | null;
      supplementaryInfo?: SupplementaryInfo | null;
    }
  ): Promise<void> {
    const { onChunk, onComplete, onError, onConversationUpdate } = callbacks;

    // 添加用户消息和AI占位符
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: followUpQuestion,
    };
    const assistantMessage: ChatMessage = {
      id: `msg-${Date.now() + 1}`,
      role: 'assistant',
      content: '',
    };
    
    conversationHistory.push(userMessage, assistantMessage);
    onConversationUpdate([...conversationHistory]);

    try {
      // 生成追问提示词
      const [currentTime, displayTimeData] = await Promise.all([
        getFormattedTimeInfo(),
        getDisplayTimeData()
      ]);

      const followUpContext = {
        originalQuestion: context?.originalQuestion || '',
        originalResponse: context?.originalResponse || '',
        divinationType: context?.divinationType || 'liuyao',
        followUpQuestion,
        currentTime,
        timeInfo: displayTimeData,
        originalData: context?.originalData || null,
        supplementaryInfo: context?.supplementaryInfo || null
      };

      const promptForAI = await generateFollowUpPromptWrapper(followUpContext);

      // 调用AI服务
      await getAIInsight(
        promptForAI,
        (chunk) => {
          assistantMessage.content += chunk;
          onChunk(chunk);
          onConversationUpdate([...conversationHistory]);
        },
        (finalContent) => {
          assistantMessage.content = finalContent;
          onComplete();
          onConversationUpdate([...conversationHistory]);
        },
        (error) => {
          const userFriendlyMessage = getUserFriendlyMessage(handleError(error, '后续问题处理失败'));
          assistantMessage.content = userFriendlyMessage;
          onError(userFriendlyMessage);
          onConversationUpdate([...conversationHistory]);
        }
      );
    } catch (error) {
      const userFriendlyMessage = getUserFriendlyMessage(handleError(error, '后续问题处理失败'));
      onError(userFriendlyMessage);
    }
  }
}

// 导出单例实例
export const aiService = new AIService();
