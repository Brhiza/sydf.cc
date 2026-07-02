import type { ChatMessage } from '@/types/chat';
import type { HistoryRecord } from '@/types/common';
import { isCompatibleDivinationType, normalizeDivinationType } from '@/utils/divination-type';

const LEGACY_AI_ERROR_KEYWORDS = [
  '抱歉',
  '暂时不可用',
  '请稍后重试',
  '出小差',
  '请求过于频繁',
  '服务器暂时繁忙',
] as const;

function legacyContentLooksLikeError(content: string | null | undefined): boolean {
  if (!content) {
    return false;
  }
  return LEGACY_AI_ERROR_KEYWORDS.some((keyword) => content.includes(keyword));
}

type LegacyPersistedTarotSingleRecord = Omit<HistoryRecord, 'type' | 'result'> & {
  type: 'tarot_single';
  result: Omit<HistoryRecord['result'], 'type'> & {
    type: 'tarot_single';
  };
};

export type PersistedHistoryRecord = HistoryRecord | LegacyPersistedTarotSingleRecord;

function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isChatRole(value: unknown): value is ChatMessage['role'] {
  return value === 'system' || value === 'user' || value === 'assistant' || value === 'tool';
}

function normalizeToolCalls(value: unknown): {
  toolCalls?: ChatMessage['tool_calls'];
  changed: boolean;
} {
  if (value === undefined) {
    return { changed: false };
  }

  if (!Array.isArray(value)) {
    return { changed: true };
  }

  let changed = false;
  const toolCalls = value.flatMap((item) => {
    if (!isObjectRecord(item) || item.type !== 'function' || !isObjectRecord(item.function)) {
      changed = true;
      return [];
    }

    const toolFunction = item.function;
    if (
      !isNonEmptyString(item.id) ||
      !isNonEmptyString(toolFunction.name) ||
      typeof toolFunction.arguments !== 'string'
    ) {
      changed = true;
      return [];
    }

    const normalized = {
      id: item.id,
      type: 'function' as const,
      function: {
        name: toolFunction.name,
        arguments: toolFunction.arguments,
      },
    };

    if (
      Object.keys(item).length !== 3 ||
      Object.keys(toolFunction).length !== 2 ||
      normalized.id !== item.id ||
      normalized.function.name !== toolFunction.name ||
      normalized.function.arguments !== toolFunction.arguments
    ) {
      changed = true;
    }

    return [normalized];
  });

  return toolCalls.length > 0 ? { toolCalls, changed } : { changed: true };
}

function normalizeChatMessage(value: unknown): {
  message?: ChatMessage;
  changed: boolean;
} {
  if (!isObjectRecord(value) || !isChatRole(value.role)) {
    return { changed: true };
  }

  if (typeof value.content !== 'string' && value.content !== null) {
    return { changed: true };
  }

  let changed = false;
  const normalized: ChatMessage = {
    role: value.role,
    content: value.content,
  };

  const allowedKeys = new Set(['id', 'role', 'content', 'tool_calls', 'tool_call_id', 'isError']);

  if ('id' in value) {
    if (isNonEmptyString(value.id)) {
      normalized.id = value.id;
    } else {
      changed = true;
    }
  }

  if ('tool_call_id' in value) {
    if (isNonEmptyString(value.tool_call_id)) {
      normalized.tool_call_id = value.tool_call_id;
    } else {
      changed = true;
    }
  }

  if ('isError' in value) {
    if (typeof value.isError === 'boolean') {
      normalized.isError = value.isError;
    } else {
      changed = true;
    }
  }

  const normalizedToolCalls = normalizeToolCalls(value.tool_calls);
  if (normalizedToolCalls.toolCalls) {
    normalized.tool_calls = normalizedToolCalls.toolCalls;
  }
  if (normalizedToolCalls.changed) {
    changed = true;
  }

  if (Object.keys(value).some((key) => !allowedKeys.has(key))) {
    changed = true;
  }

  return { message: normalized, changed };
}

export function normalizeConversationHistory(history: unknown): {
  history: ChatMessage[] | undefined;
  changed: boolean;
} {
  if (history === undefined) {
    return { history: undefined, changed: false };
  }

  if (!Array.isArray(history)) {
    return { history: undefined, changed: true };
  }

  let changed = false;
  const normalizedHistory = history.flatMap((message) => {
    const normalized = normalizeChatMessage(message);
    if (normalized.changed) {
      changed = true;
    }
    return normalized.message ? [normalized.message] : [];
  });

  if (normalizedHistory.length !== history.length) {
    changed = true;
  }

  if (normalizedHistory.length === 0) {
    return { history: undefined, changed };
  }

  return { history: normalizedHistory, changed };
}

function isValidPersistedRecord(value: unknown): value is PersistedHistoryRecord {
  if (!isObjectRecord(value)) {
    return false;
  }

  if (
    !isNonEmptyString(value.id) ||
    !isCompatibleDivinationType(String(value.type)) ||
    typeof value.question !== 'string' ||
    typeof value.summary !== 'string' ||
    typeof value.timestamp !== 'number' ||
    !Number.isFinite(value.timestamp) ||
    !isObjectRecord(value.result)
  ) {
    return false;
  }

  const result = value.result;
  return isCompatibleDivinationType(String(result.type)) && isObjectRecord(result.data);
}

export function normalizePersistedRecord<
  T extends PersistedHistoryRecord | Omit<HistoryRecord, 'timestamp' | 'summary'>,
>(record: T): T {
  const normalizedType = normalizeDivinationType(record.type);
  const normalizedResultType = normalizeDivinationType(record.result.type);

  if (normalizedType === record.type && normalizedResultType === record.result.type) {
    return record;
  }

  return {
    ...record,
    type: normalizedType,
    result: {
      ...record.result,
      type: normalizedResultType,
    },
  };
}

export function migrateLegacyErrorMarkers(history: ChatMessage[] | undefined): {
  history: ChatMessage[] | undefined;
  changed: boolean;
} {
  if (!history || history.length === 0) {
    return { history, changed: false };
  }

  let changed = false;
  const migratedHistory = history.map((message) => {
    if (
      message.role === 'assistant' &&
      message.isError === undefined &&
      legacyContentLooksLikeError(message.content)
    ) {
      changed = true;
      return { ...message, isError: true };
    }
    return message;
  });

  return changed ? { history: migratedHistory, changed: true } : { history, changed: false };
}

export function normalizeRecords(records: unknown[]): {
  records: HistoryRecord[];
  changed: boolean;
} {
  let changed = false;

  const validRecords = records.filter((record) => {
    const valid = isValidPersistedRecord(record);
    if (!valid) {
      changed = true;
    }
    return valid;
  });

  const normalizedRecords = validRecords.map((record) => {
    const normalizedRecord = normalizePersistedRecord(record);
    if (normalizedRecord !== record) {
      changed = true;
    }

    const normalizedConversation = normalizeConversationHistory(normalizedRecord.conversationHistory);
    const migration = migrateLegacyErrorMarkers(normalizedConversation.history);
    if (normalizedConversation.changed || migration.changed) {
      changed = true;
      const recordWithCleanConversation: HistoryRecord = { ...normalizedRecord } as HistoryRecord;
      if (migration.history && migration.history.length > 0) {
        recordWithCleanConversation.conversationHistory = migration.history;
      } else {
        delete recordWithCleanConversation.conversationHistory;
      }
      return recordWithCleanConversation;
    }

    return normalizedRecord as HistoryRecord;
  });

  return { records: normalizedRecords, changed };
}
