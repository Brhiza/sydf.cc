/**
 * 占卜编排服务
 * 负责协调占卜流程的各个步骤
 */
import type { DivinationResult, DivinationRequest, LiuyaoData, DivinationType, DivinationData, SupplementaryInfo } from '@/types/divination';
import type { ChatMessage } from '@/types/chat';
import { v4 as uuidv4 } from 'uuid';
import { aiService } from './aiService';
import { dataGenerationService } from './dataGenerationService';
import { historyService } from './history';
import { handleError, logError, getUserFriendlyMessage } from '@/utils/error-handler';

export interface DivinationCallbacks {
  onInitialResult: (result: DivinationResult) => void;
  onAIChunk: (chunk: string) => void;
  onAIComplete: (finalResult: DivinationResult) => void;
  onAIError: (error: string) => void;
  onConversationUpdate: (history: ChatMessage[]) => void;
}

export interface FollowUpCallbacks {
  onChunk: (chunk: string) => void;
  onComplete: () => void;
  onError: (error: string) => void;
  onConversationUpdate: (history: ChatMessage[]) => void;
}

export class DivinationOrchestrator {
  /**
   * 执行占卜流程
   */
  async executeDivination(request: DivinationRequest, callbacks: DivinationCallbacks): Promise<void> {
    const { type, question, spreadType, signNumber, supplementaryInfo, signal } = request;
    const { onInitialResult, onAIChunk, onAIComplete, onAIError, onConversationUpdate } = callbacks;

    try {
      // 1. 生成占卜数据
      const data = await dataGenerationService.generateDivination(type, spreadType, signNumber, supplementaryInfo);

      // 2. 创建初始结果对象
      const initialResult: DivinationResult = {
        id: uuidv4(),
        type,
        data,
        aiResponse: '',
        ...(supplementaryInfo && { supplementaryInfo }),
      };

      // 4. 准备对话历史（不包含系统提示词，让AI服务层处理）
      const conversationHistory: ChatMessage[] = [
        { id: `msg-${Date.now()}`, role: 'user', content: question },
        { id: `msg-${Date.now() + 1}`, role: 'assistant', content: '' },
      ];

      // 5. 立即保存初始记录到历史，确保追问时能找到
      let finalQuestion = question;
      if (type === 'daily') {
        const date = supplementaryInfo?.date ? new Date(supplementaryInfo.date) : new Date();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        finalQuestion = `${month} 月 ${day} 日运势`;
      }
      
      const initialRecord = historyService.addRecord({ 
        type, 
        question: finalQuestion, 
        result: {
          type: initialResult.type,
          data: initialResult.data,
          aiResponse: '', // 初始时AI响应为空
          ...(initialResult.supplementaryInfo && { supplementaryInfo: initialResult.supplementaryInfo })
        }, 
        conversationHistory 
      });

      // 6. 立即通过回调返回初始结果，以便UI可以渲染
      onInitialResult(initialResult);

      onConversationUpdate([...conversationHistory]);

      // 5. 检查是否为乱动卦象（仅适用于六爻）
      if (this.isChaoticLiuyao(type, data)) {
        return this.handleChaoticLiuyao(
          data as LiuyaoData,
          initialResult,
          conversationHistory,
          onAIComplete,
          onConversationUpdate
        );
      }

      // 7. 生成AI解读
      await this.generateAIInterpretation(
        type,
        question,
        data,
        supplementaryInfo,
        signal,
        conversationHistory,
        onAIChunk,
        (finalResult) => {
          // 8. AI完成后更新历史记录（而不是添加新记录）
          // 更新已保存的记录，添加AI响应
          const updatedRecord = {
            ...initialRecord,
            result: {
              type: finalResult.type,
              data: finalResult.data,
              aiResponse: finalResult.aiResponse || '', // 确保总是保存aiResponse，即使是空字符串
              ...(finalResult.supplementaryInfo && { supplementaryInfo: finalResult.supplementaryInfo })
            },
            conversationHistory
          };
          
          // 修复：使用正确的记录ID（initialRecord.id而不是initialResult.id）
              historyService.updateRecord(initialRecord.id, updatedRecord);
          
          // 然后调用原始的完成回调
          onAIComplete(finalResult);
        },
        onAIError,
        onConversationUpdate,
        initialResult
      );

    } catch (err) {
      this.handleError(err, onAIError);
    }
  }

  /**
   * 发送后续问题
   */
  async sendFollowUp(
    resultId: string,
    conversationHistory: ChatMessage[],
    followUpQuestion: string,
    callbacks: FollowUpCallbacks
  ): Promise<void> {
    try {
      // 获取历史记录以获取上下文信息
      const record = historyService.getRecord(resultId);
      
      // 创建回调的包装器，在对话历史更新时同步保存到历史记录
      const wrappedCallbacks = {
        ...callbacks,
        onConversationUpdate: (updatedHistory: ChatMessage[]) => {
          // 先调用原始回调更新UI
          callbacks.onConversationUpdate(updatedHistory);
          
          // 然后立即更新历史记录
          if (record) {
            record.conversationHistory = updatedHistory;
            historyService.updateRecord(resultId, record);
          }
        }
      };

      // 准备完整的上下文信息 - 包含所有必要的占卜数据
      const context = {
        originalQuestion: record?.question || '',
        originalResponse: record?.result.aiResponse || '',
        divinationType: record?.type || 'liuyao',
        originalData: record?.result.data || null,
        supplementaryInfo: record?.result.supplementaryInfo || null
      };


      // 使用AI服务处理后续问题，传递完整上下文信息
      await aiService.handleFollowUp(conversationHistory, followUpQuestion, wrappedCallbacks, context);
      
    } catch (err) {
      this.handleError(err, callbacks.onError);
    }
  }

  private isChaoticLiuyao(type: DivinationType, data: DivinationData): boolean {
    return type === 'liuyao' && (data as LiuyaoData).isChaotic === true;
  }

  private async handleChaoticLiuyao(
    data: LiuyaoData,
    initialResult: DivinationResult,
    conversationHistory: ChatMessage[],
    onAIComplete: (finalResult: DivinationResult) => void,
    onConversationUpdate: (history: ChatMessage[]) => void
  ): Promise<void> {
    const chaoticReason = data.chaoticReason || '卦象动爻过多，信息混乱，请静心后重试。';
    initialResult.aiResponse = chaoticReason;
    const assistantMessage = conversationHistory.find(m => m.role === 'assistant');
    if (assistantMessage) assistantMessage.content = chaoticReason;
    
      // 保存到历史记录
      const recordResult: DivinationResult = {
        ...initialResult,
        type: 'liuyao'
      };
      
      await historyService.addRecord({ 
        type: 'liuyao', 
        question: '卦象检测', 
        result: recordResult, 
        conversationHistory 
      });
    
    onAIComplete(initialResult);
    onConversationUpdate([...conversationHistory]);
  }

  private async generateAIInterpretation(
    type: DivinationType,
    question: string,
    data: DivinationData,
    supplementaryInfo: SupplementaryInfo | undefined,
    signal: AbortSignal | undefined,
    conversationHistory: ChatMessage[],
    onAIChunk: (chunk: string) => void,
    onAIComplete: (finalResult: DivinationResult) => void,
    onAIError: (error: string) => void,  // 这个参数在aiService.generateAIResponse中会被使用
    onConversationUpdate: (history: ChatMessage[]) => void,
    initialResult: DivinationResult
  ): Promise<void> {
    try {
      const fullAiResponse = await aiService.generateAIResponse(
        type,
        question,
        data,
        supplementaryInfo,
        signal,
        (chunk) => {
          const assistantMessage = conversationHistory.find(m => m.role === 'assistant');
          if (assistantMessage) assistantMessage.content += chunk;
          onAIChunk(chunk);
          onConversationUpdate([...conversationHistory]);
        }
      );

      // AI响应完成
      initialResult.aiResponse = fullAiResponse;
      const assistantMessage = conversationHistory.find(m => m.role === 'assistant');
      if (assistantMessage) assistantMessage.content = fullAiResponse;

      // 通过回调返回最终结果
      onAIComplete(initialResult);
      onConversationUpdate([...conversationHistory]);
    } catch (error) {
      // 在这里使用onAIError
      const errorMessage = error instanceof Error ? error.message : 'AI响应生成失败';
      onAIError(errorMessage);
      throw error; // 重新抛出错误，让调用者处理
    }
  }

  private handleError(err: unknown, onErrorCallback: (error: string) => void): void {
    const appError = handleError(err, '占卜流程失败');
    logError(appError, 'Divination Orchestrator');
    const userFriendlyMessage = getUserFriendlyMessage(appError);
    console.error('占卜流程失败:', err);
    onErrorCallback(userFriendlyMessage);
  }
}
