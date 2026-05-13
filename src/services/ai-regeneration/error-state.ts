import type { HistoryRecord } from '@/types/common';
import type { ApplyAIErrorStateContext, RegeneratedAIResult } from './types';
import { buildRegeneratedConversationHistory } from './question-builder';

export function buildUpdatedHistoryRecord(
  record: HistoryRecord,
  regenerated: RegeneratedAIResult
): HistoryRecord {
  return {
    ...record,
    result: { ...record.result, aiResponse: regenerated.aiResponse },
    conversationHistory: [...regenerated.conversationHistory],
  };
}

export function applyAIErrorState(
  record: HistoryRecord,
  errorMessage: string,
  context: ApplyAIErrorStateContext
): void {
  const fallbackConversationHistory = buildRegeneratedConversationHistory(record, errorMessage, true);
  context.conversationHistory.value = fallbackConversationHistory;

  if (context.result?.value) {
    context.result.value.aiResponse = errorMessage;
  }

  context.historyService.updateRecord?.(
    record.id,
    buildUpdatedHistoryRecord(record, {
      aiResponse: errorMessage,
      conversationHistory: fallbackConversationHistory,
      target: 'primary',
    })
  );
}
