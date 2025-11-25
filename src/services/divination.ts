/**
 * 统一的占卜服务
 * 整合所有占卜功能
 */
import type { DivinationResult, DivinationRequest, DivinationType, LiuyaoData, MeihuaData, QimenData, TarotData, SsgwData } from '@/types/divination';

// 重新导出类型
export type { DivinationResult, DivinationRequest, DivinationType, LiuyaoData, MeihuaData, QimenData, TarotData, SsgwData };
import type { ChatMessage } from '@/types/chat';
import { DivinationOrchestrator } from './divination-orchestrator';

/**
 * @class DivinationService
 * @description A singleton service responsible for handling all divination-related logic.
 * It orchestrates data generation, AI response, and history management.
 */
export class DivinationService {
  private static instance: DivinationService;
  private orchestrator: DivinationOrchestrator;

  private constructor() {
    this.orchestrator = new DivinationOrchestrator();
  }

  /**
   * @description Gets the singleton instance of the DivinationService.
   * @returns {DivinationService} The singleton instance.
   */
  static getInstance(): DivinationService {
    if (!DivinationService.instance) {
      DivinationService.instance = new DivinationService();
    }
    return DivinationService.instance;
  }

  /**
   * @description Performs a divination.
   * This method immediately returns the raw divination data and then asynchronously
   * generates the AI interpretation, updating the result object once complete.
   * @param {DivinationRequest} request - The divination request object.
   * @param {(chunk: string) => void} [onAIChunk] - Optional callback for streaming AI response chunks.
   * @param {(error: string) => void} [onAIError] - Optional callback for handling AI generation errors.
   * @returns {Promise<DivinationResult>} A promise that resolves to the initial divination result.
   */
  async startDivination(
    request: DivinationRequest,
    callbacks: {
      onInitialResult: (result: DivinationResult) => void;
      onAIChunk: (chunk: string) => void;
      onAIComplete: (finalResult: DivinationResult) => void;
      onAIError: (error: string) => void;
      onConversationUpdate: (history: ChatMessage[]) => void;
    }
  ): Promise<void> {
    return this.orchestrator.executeDivination(request, callbacks);
  }

  async sendFollowUp(
    resultId: string,
    conversationHistory: ChatMessage[],
    followUpQuestion: string,
    callbacks: {
      onChunk: (chunk: string) => void;
      onComplete: () => void;
      onError: (error: string) => void;
      onConversationUpdate: (history: ChatMessage[]) => void;
    }
  ): Promise<void> {
    return this.orchestrator.sendFollowUp(resultId, conversationHistory, followUpQuestion, callbacks);
  }
}

// 导出单例实例
export const divinationService = DivinationService.getInstance();

// 导出便捷函数
export const performDivination = divinationService.startDivination.bind(divinationService);
