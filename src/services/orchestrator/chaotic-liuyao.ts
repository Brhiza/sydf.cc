import type { ChatMessage } from '@/types/chat';
import type { HistoryRecord } from '@/types/common';
import type {
  DivinationData,
  DivinationResult,
  DivinationType,
  LiuyaoData,
} from '@/types/divination';
import { historyService } from '../history';
import { buildHistoryRecordSnapshot } from './history-snapshot';

const DEFAULT_CHAOTIC_REASON = '卦象动爻过多，信息混乱，请静心后重试。';

export function isChaoticLiuyao(type: DivinationType, data: DivinationData): boolean {
  return type === 'liuyao' && (data as LiuyaoData).isChaotic === true;
}

export async function handleChaoticLiuyao(
  data: LiuyaoData,
  initialResult: DivinationResult,
  initialRecord: HistoryRecord,
  conversationHistory: ChatMessage[],
  onAIComplete: (finalResult: DivinationResult) => void,
  onConversationUpdate: (history: ChatMessage[]) => void
): Promise<void> {
  const chaoticReason = data.chaoticReason || DEFAULT_CHAOTIC_REASON;
  initialResult.aiResponse = chaoticReason;
  const assistantMessage = conversationHistory.find((m) => m.role === 'assistant');
  if (assistantMessage) assistantMessage.content = chaoticReason;

  historyService.updateRecord(
    initialRecord.id,
    buildHistoryRecordSnapshot(initialRecord, initialResult, conversationHistory)
  );

  onAIComplete(initialResult);
  onConversationUpdate([...conversationHistory]);
}
