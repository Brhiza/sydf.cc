import type { ChatMessage } from '@/types/chat';
import type {
  DivinationData,
  DivinationResult,
  DivinationType,
  SupplementaryInfo,
} from '@/types/divination';
import { aiService } from '../aiService';

export interface AIInterpretationOptions {
  type: DivinationType;
  question: string;
  data: DivinationData;
  supplementaryInfo?: SupplementaryInfo;
  signal?: AbortSignal;
  conversationHistory: ChatMessage[];
  initialResult: DivinationResult;
  onAIChunk: (chunk: string) => void;
  onAIComplete: (finalResult: DivinationResult) => void;
  onConversationUpdate: (history: ChatMessage[]) => void;
  onPartialHistoryUpdate?: () => void;
}

export async function generateAIInterpretation({
  type,
  question,
  data,
  supplementaryInfo,
  signal,
  conversationHistory,
  initialResult,
  onAIChunk,
  onAIComplete,
  onConversationUpdate,
  onPartialHistoryUpdate,
}: AIInterpretationOptions): Promise<void> {
  const fullAiResponse = await aiService.generateAIResponse(
    type,
    question,
    data,
    supplementaryInfo,
    signal,
    (chunk) => {
      const assistantMessage = conversationHistory.find((m) => m.role === 'assistant');
      if (assistantMessage) assistantMessage.content += chunk;
      initialResult.aiResponse = assistantMessage?.content || initialResult.aiResponse;
      onAIChunk(chunk);
      onConversationUpdate([...conversationHistory]);
      onPartialHistoryUpdate?.();
    }
  );

  initialResult.aiResponse = fullAiResponse;
  const assistantMessage = conversationHistory.find((m) => m.role === 'assistant');
  if (assistantMessage) assistantMessage.content = fullAiResponse;

  onAIComplete(initialResult);
  onConversationUpdate([...conversationHistory]);
}
