import type { ChatMessage } from '@/types/chat';
import type { DivinationResult } from '@/types/divination';
import type { HistoryRecord } from '@/types/common';
import type { Ref } from 'vue';

export type AIRegenerationRecord = Pick<
  HistoryRecord,
  'id' | 'type' | 'question' | 'result' | 'conversationHistory'
>;

export type RegeneratedAITargetKind = 'primary' | 'follow_up';

export interface RegeneratedAIResult {
  aiResponse: string;
  conversationHistory: ChatMessage[];
  target: RegeneratedAITargetKind;
}

export interface GenerateRegeneratedAIOptions {
  signal?: AbortSignal;
  onChunk?: (chunk: string) => void;
  onConversationUpdate?: (history: ChatMessage[]) => void;
}

export interface ApplyAIErrorStateContext {
  conversationHistory: Ref<ChatMessage[]>;
  result?: Ref<DivinationResult | null>;
  historyService: {
    updateRecord?: (id: string, record: HistoryRecord) => boolean;
  };
}
