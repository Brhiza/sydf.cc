import type { ChatMessage, ChatMessageRetryTarget } from '@/types/chat';
import type { LiuyaoData, SupplementaryInfo } from '@/types/divination';
import type { HistoryRecord } from '@/types/common';
import { generateAIResponse as generatePromptAIResponse } from './ai';
import { aiService } from './aiService';
import { generateFollowUpPromptWrapper } from './prompts';
import { getDisplayTimeData, getFormattedTimeInfo } from './prompts/shared/time-utils';

type AIRegenerationRecord = Pick<
  HistoryRecord,
  'id' | 'type' | 'question' | 'result' | 'conversationHistory'
>;
type RegeneratedAITargetKind = 'primary' | 'follow_up';

export interface RegeneratedAIResult {
  aiResponse: string;
  conversationHistory: ChatMessage[];
  target: RegeneratedAITargetKind;
}

interface GenerateRegeneratedAIOptions {
  signal?: AbortSignal;
  onChunk?: (chunk: string) => void;
  onConversationUpdate?: (history: ChatMessage[]) => void;
}

function buildDailyQuestion(record: AIRegenerationRecord): string {
  const supplementaryDate = record.result.supplementaryInfo?.date;
  const dataDate =
    'date' in record.result.data && typeof record.result.data.date === 'string'
      ? record.result.data.date
      : undefined;
  const date = supplementaryDate || dataDate;

  if (!date) {
    return record.question;
  }

  return `请为我分析${date}的运势`;
}

export function getRegenerationQuestion(record: AIRegenerationRecord): string {
  if (record.type === 'daily') {
    return buildDailyQuestion(record);
  }

  return record.question;
}

export function buildRegeneratedConversationHistory(
  record: AIRegenerationRecord,
  assistantContent: string = ''
): ChatMessage[] {
  return [
    {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: getRegenerationQuestion(record),
    },
    {
      id: `msg-${Date.now() + 1}`,
      role: 'assistant',
      content: assistantContent,
    },
  ];
}

function getChaoticLiuyaoResponse(record: AIRegenerationRecord): string | null {
  if (record.type !== 'liuyao') {
    return null;
  }

  const data = record.result.data as LiuyaoData;
  if (!data.isChaotic) {
    return null;
  }

  return data.chaoticReason || '卦象动爻过多，信息混乱，请静心后重试。';
}

function cloneSupplementaryInfo(supplementaryInfo?: SupplementaryInfo) {
  if (!supplementaryInfo) {
    return undefined;
  }

  return JSON.parse(JSON.stringify(supplementaryInfo)) as SupplementaryInfo;
}

function getVisibleConversationHistory(messages: ChatMessage[]): ChatMessage[] {
  return messages.filter((message) => message.role !== 'system');
}

function shouldShowAIMessage(
  type: AIRegenerationRecord['type'],
  message: ChatMessage,
  index: number
): boolean {
  if (type === 'daily') {
    if (index === 0 && message.role === 'user') {
      return false;
    }

    if (index === 1 && message.role === 'assistant') {
      return false;
    }
  }

  return true;
}

function getDisplayedConversationHistory(
  type: AIRegenerationRecord['type'],
  messages: ChatMessage[]
): ChatMessage[] {
  return getVisibleConversationHistory(messages).filter((message, index) =>
    shouldShowAIMessage(type, message, index)
  );
}

function cloneConversationHistory(record: AIRegenerationRecord): ChatMessage[] {
  if (!record.conversationHistory || record.conversationHistory.length === 0) {
    return buildRegeneratedConversationHistory(record, record.result.aiResponse || '');
  }

  return JSON.parse(JSON.stringify(record.conversationHistory)) as ChatMessage[];
}

function resolveTargetAssistantMessage(
  record: AIRegenerationRecord,
  target: ChatMessageRetryTarget
): {
  conversationHistory: ChatMessage[];
  targetMessage: ChatMessage | null;
  targetIndex: number;
} {
  const conversationHistory = cloneConversationHistory(record);
  const displayedConversationHistory = getDisplayedConversationHistory(
    record.type,
    conversationHistory
  );
  const targetMessage =
    displayedConversationHistory.find((message, index) => {
      if (index !== target.displayedIndex) {
        return false;
      }

      if (target.messageId && message.id) {
        return message.id === target.messageId;
      }

      return true;
    }) || null;

  return {
    conversationHistory,
    targetMessage,
    targetIndex: targetMessage ? conversationHistory.indexOf(targetMessage) : -1,
  };
}

function isPrimaryAssistantMessage(
  conversationHistory: ChatMessage[],
  targetIndex: number
): boolean {
  return targetIndex === 1 && conversationHistory[0]?.role === 'user';
}

export async function generateRegeneratedAI(
  record: AIRegenerationRecord,
  options: GenerateRegeneratedAIOptions = {}
): Promise<RegeneratedAIResult> {
  const conversationHistory = buildRegeneratedConversationHistory(record);
  options.onConversationUpdate?.([...conversationHistory]);

  const chaoticResponse = getChaoticLiuyaoResponse(record);
  if (chaoticResponse) {
    conversationHistory[1].content = chaoticResponse;
    options.onConversationUpdate?.([...conversationHistory]);

    return {
      aiResponse: chaoticResponse,
      conversationHistory,
      target: 'primary',
    };
  }

  const clonedData = JSON.parse(JSON.stringify(record.result.data));
  const supplementaryInfo = cloneSupplementaryInfo(record.result.supplementaryInfo);
  const question = getRegenerationQuestion(record);

  const aiResponse = await aiService.generateAIResponse(
    record.type,
    question,
    clonedData,
    supplementaryInfo,
    options.signal,
    (chunk) => {
      conversationHistory[1].content = (conversationHistory[1].content || '') + chunk;
      options.onChunk?.(chunk);
      options.onConversationUpdate?.([...conversationHistory]);
    }
  );

  conversationHistory[1].content = aiResponse;
  options.onConversationUpdate?.([...conversationHistory]);

  return {
    aiResponse,
    conversationHistory,
    target: 'primary',
  };
}

export async function regenerateConversationMessage(
  record: AIRegenerationRecord,
  target: ChatMessageRetryTarget,
  options: GenerateRegeneratedAIOptions = {}
): Promise<RegeneratedAIResult> {
  const { conversationHistory, targetMessage, targetIndex } = resolveTargetAssistantMessage(
    record,
    target
  );
  if (!targetMessage || targetMessage.role !== 'assistant' || targetIndex <= 0) {
    return generateRegeneratedAI(record, options);
  }

  if (isPrimaryAssistantMessage(conversationHistory, targetIndex)) {
    return generateRegeneratedAI(record, options);
  }

  const followUpQuestionMessage = conversationHistory[targetIndex - 1];
  if (followUpQuestionMessage?.role !== 'user' || !followUpQuestionMessage.content) {
    return generateRegeneratedAI(record, options);
  }

  const conversationPrefix = conversationHistory.slice(0, targetIndex - 1);
  const regeneratedUserMessage = { ...followUpQuestionMessage };
  const regeneratedAssistantMessage: ChatMessage = {
    ...targetMessage,
    content: '',
  };
  const regeneratedConversationHistory = [
    ...conversationPrefix,
    regeneratedUserMessage,
    regeneratedAssistantMessage,
  ];

  options.onConversationUpdate?.([...regeneratedConversationHistory]);

  const [currentTime, timeInfo] = await Promise.all([getFormattedTimeInfo(), getDisplayTimeData()]);
  const prompt = await generateFollowUpPromptWrapper({
    originalQuestion: record.question,
    originalResponse: record.result.aiResponse || '',
    divinationType: record.type,
    followUpQuestion: regeneratedUserMessage.content || '',
    currentTime,
    timeInfo,
    originalData: JSON.parse(JSON.stringify(record.result.data)),
    supplementaryInfo: cloneSupplementaryInfo(record.result.supplementaryInfo),
  });

  const response = await generatePromptAIResponse(prompt, options.signal, (chunk) => {
    regeneratedAssistantMessage.content = (regeneratedAssistantMessage.content || '') + chunk;
    options.onChunk?.(chunk);
    options.onConversationUpdate?.([...regeneratedConversationHistory]);
  });

  regeneratedAssistantMessage.content = response.content || '';
  options.onConversationUpdate?.([...regeneratedConversationHistory]);

  return {
    aiResponse: record.result.aiResponse || '',
    conversationHistory: regeneratedConversationHistory,
    target: 'follow_up',
  };
}

export function buildUpdatedHistoryRecord(
  record: HistoryRecord,
  regenerated: RegeneratedAIResult
): HistoryRecord {
  return {
    ...record,
    result: {
      ...record.result,
      aiResponse: regenerated.aiResponse,
    },
    conversationHistory: [...regenerated.conversationHistory],
  };
}
