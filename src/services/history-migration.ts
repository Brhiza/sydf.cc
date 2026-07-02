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

    const migration = migrateLegacyErrorMarkers(normalizedRecord.conversationHistory);
    if (migration.changed) {
      changed = true;
      return {
        ...normalizedRecord,
        conversationHistory: migration.history,
      } as HistoryRecord;
    }

    return normalizedRecord as HistoryRecord;
  });

  return { records: normalizedRecords, changed };
}
