import type { ChatMessage } from '@/types/chat';
import type { HistoryRecord } from '@/types/common';
import type { DivinationResult } from '@/types/divination';
import { cloneSerializable } from '@/utils/clone';

export function buildHistoryResultSnapshot(
  result: Pick<DivinationResult, 'type' | 'data' | 'aiResponse' | 'supplementaryInfo'>
): HistoryRecord['result'] {
  return {
    type: result.type,
    data: cloneSerializable(result.data),
    aiResponse: result.aiResponse || '',
    ...(result.supplementaryInfo
      ? { supplementaryInfo: cloneSerializable(result.supplementaryInfo) }
      : {}),
  };
}

export function buildHistoryRecordSnapshot(
  baseRecord: HistoryRecord,
  result: Pick<DivinationResult, 'type' | 'data' | 'aiResponse' | 'supplementaryInfo'>,
  conversationHistory: ChatMessage[]
): HistoryRecord {
  return {
    ...baseRecord,
    result: buildHistoryResultSnapshot(result),
    conversationHistory: cloneSerializable(conversationHistory),
  };
}
