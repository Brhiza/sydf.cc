import type { DivinationType, DivinationData, SupplementaryInfo } from './divination';
import type { ChatMessage } from './chat';

export interface HistoryRecord {
  id: string;
  type: DivinationType;
  question: string;
  result: {
    type: DivinationType;
    data: DivinationData;
    aiResponse?: string;
    supplementaryInfo?: SupplementaryInfo;
  };
  timestamp: number;
  summary: string;
  conversationHistory?: ChatMessage[];
  pinned?: boolean;
  pinnedAt?: number;
}
