import type { ChatMessage } from '@/types/chat';
import type { LiuyaoData } from '@/types/divination';
import type { AIRegenerationRecord } from './types';

const DEFAULT_CHAOTIC_REASON = '卦象动爻过多，信息混乱，请静心后重试。';

function buildDailyQuestion(record: AIRegenerationRecord): string {
  const supplementaryDate = record.result.supplementaryInfo?.date;
  const dataDate =
    'date' in record.result.data && typeof record.result.data.date === 'string'
      ? record.result.data.date
      : undefined;
  const date = supplementaryDate || dataDate;
  if (!date) return record.question;
  return `请为我分析${date}的运势`;
}

export function getRegenerationQuestion(record: AIRegenerationRecord): string {
  if (record.type === 'daily') return buildDailyQuestion(record);
  return record.question;
}

export function getChaoticLiuyaoResponse(record: AIRegenerationRecord): string | null {
  if (record.type !== 'liuyao') return null;
  const data = record.result.data as LiuyaoData;
  if (!data.isChaotic) return null;
  return data.chaoticReason || DEFAULT_CHAOTIC_REASON;
}

export function buildRegeneratedConversationHistory(
  record: AIRegenerationRecord,
  assistantContent: string = '',
  isError = false
): ChatMessage[] {
  const assistantMessage: ChatMessage = {
    id: `msg-${Date.now() + 1}`,
    role: 'assistant',
    content: assistantContent,
  };
  if (isError) assistantMessage.isError = true;

  return [
    { id: `msg-${Date.now()}`, role: 'user', content: getRegenerationQuestion(record) },
    assistantMessage,
  ];
}
