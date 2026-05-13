import type { DailyFortuneData, DivinationType } from '@/types';
import type { HistoryRecord } from '@/types/common';
import { normalizeDateKey } from '@/utils/date-formatter';

/**
 * 排序：置顶记录在前（按 pinnedAt/timestamp 倒序），非置顶按 timestamp 倒序
 */
export function sortRecords(records: HistoryRecord[]): HistoryRecord[] {
  const pinned = records.filter((r) => r.pinned);
  const unpinned = records.filter((r) => !r.pinned);

  pinned.sort((a, b) => (b.pinnedAt || b.timestamp) - (a.pinnedAt || a.timestamp));
  unpinned.sort((a, b) => b.timestamp - a.timestamp);

  return [...pinned, ...unpinned];
}

export function searchInRecords(records: HistoryRecord[], keyword: string): HistoryRecord[] {
  const trimmed = keyword.trim();
  if (!trimmed) {
    return sortRecords(records);
  }

  const lower = trimmed.toLowerCase();
  return records.filter(
    (record) =>
      record.question.toLowerCase().includes(lower) ||
      record.summary.toLowerCase().includes(lower)
  );
}

export function filterRecordsByType(
  records: HistoryRecord[],
  type: DivinationType | 'all'
): HistoryRecord[] {
  if (type === 'all') {
    return sortRecords(records);
  }
  return records.filter((record) => record.type === type);
}

function isDailyRecordOnDate(record: HistoryRecord, targetDateStr: string): boolean {
  if (record.type !== 'daily') {
    return false;
  }
  const data = record.result.data as DailyFortuneData;
  return Boolean(data?.date && data.date === targetDateStr);
}

export function hasDailyFortuneOnDate(records: HistoryRecord[], date: string): boolean {
  const target = normalizeDateKey(date);
  return records.some((record) => isDailyRecordOnDate(record, target));
}

export function findDailyFortuneOnDate(
  records: HistoryRecord[],
  date: string
): HistoryRecord | undefined {
  const target = normalizeDateKey(date);
  const matched = records.filter((record) => isDailyRecordOnDate(record, target));
  if (matched.length === 0) {
    return undefined;
  }
  return matched.sort((a, b) => b.timestamp - a.timestamp)[0];
}
