import type { ChatMessage } from '@/types/chat';
import type { DivinationRequest } from '@/types/divination';
import {
  executeDivination,
  type DivinationCallbacks,
} from './orchestrator/execute-divination';
import { sendFollowUp, type FollowUpCallbacks } from './orchestrator/follow-up';

export type { DivinationCallbacks, FollowUpCallbacks };

export class DivinationOrchestrator {
  async executeDivination(
    request: DivinationRequest,
    callbacks: DivinationCallbacks
  ): Promise<void> {
    return executeDivination(request, callbacks);
  }

  async sendFollowUp(
    resultId: string,
    conversationHistory: ChatMessage[],
    followUpQuestion: string,
    callbacks: FollowUpCallbacks
  ): Promise<void> {
    return sendFollowUp(resultId, conversationHistory, followUpQuestion, callbacks);
  }
}
