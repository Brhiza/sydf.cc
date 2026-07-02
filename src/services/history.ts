/**
 * 统一的历史记录服务
 * 内部通过组合纯函数子模块实现:
 *   - ./history/types         类型与默认设置
 *   - ./history/persistence   读写本地存储
 *   - ./history/queries       排序/搜索/筛选/每日运势查询
 *   - ./history/import-export 导入导出
 */
import type { DivinationType } from '@/types';
import type { HistoryRecord } from '@/types/common';
import { eventBus, EVENTS } from '@/utils/eventBus';
import { createId } from '@/utils/id';
import { formatLocalDateKey } from '@/utils/date-formatter';
import { normalizePersistedRecord } from './history-migration';
import { generateSummary } from './history-summary';
import { type AppSettings, DEFAULT_SETTINGS, normalizeAppSettings } from './history/types';
import { loadRecords, loadSettings, saveRecords, saveSettings } from './history/persistence';
import {
  filterRecordsByType,
  findDailyFortuneOnDate,
  hasDailyFortuneOnDate,
  searchInRecords,
  sortRecords,
} from './history/queries';
import { exportRecordsToJson, parseImportPayload } from './history/import-export';

export type { AppSettings };

export class HistoryService {
  private static instance: HistoryService;
  private records: HistoryRecord[] = [];
  private settings: AppSettings = DEFAULT_SETTINGS;

  private constructor() {
    const { records, changed } = loadRecords();
    this.records = records;
    this.settings = loadSettings(DEFAULT_SETTINGS);
    if (changed) {
      saveRecords(this.records);
    }
  }

  static getInstance(): HistoryService {
    if (!HistoryService.instance) {
      HistoryService.instance = new HistoryService();
    }
    return HistoryService.instance;
  }

  getRecords(): HistoryRecord[] {
    return sortRecords(this.records);
  }

  pinRecord(id: string): boolean {
    const record = this.records.find((r) => r.id === id);
    if (!record) return false;
    record.pinned = true;
    record.pinnedAt = Date.now();
    this.persistRecords();
    return true;
  }

  unpinRecord(id: string): boolean {
    const record = this.records.find((r) => r.id === id);
    if (!record) return false;
    record.pinned = false;
    delete record.pinnedAt;
    this.persistRecords();
    return true;
  }

  getPinnedRecords(): HistoryRecord[] {
    return this.records.filter((record) => record.pinned);
  }

  togglePinRecord(id: string): boolean {
    const record = this.records.find((r) => r.id === id);
    if (!record) return false;
    return record.pinned ? this.unpinRecord(id) : this.pinRecord(id);
  }

  getRecord(id: string): HistoryRecord | undefined {
    return this.records.find((record) => record.id === id);
  }

  addRecord(record: Omit<HistoryRecord, 'timestamp' | 'summary'>): HistoryRecord {
    const normalizedRecord = normalizePersistedRecord(record);
    const newRecord: HistoryRecord = {
      ...normalizedRecord,
      id: normalizedRecord.id || createId(),
      timestamp: Date.now(),
      summary: generateSummary(normalizedRecord.result),
    };

    this.records.unshift(newRecord);
    if (this.records.length > this.settings.maxHistoryItems) {
      this.records = this.records.slice(0, this.settings.maxHistoryItems);
    }
    this.persistRecords();
    return newRecord;
  }

  updateRecord(id: string, updatedRecord: HistoryRecord): boolean {
    const index = this.records.findIndex((record) => record.id === id);
    if (index === -1) return false;
    this.records[index] = normalizePersistedRecord(updatedRecord);
    this.persistRecords();
    return true;
  }

  renameRecord(id: string, question: string): boolean {
    const trimmed = question.trim();
    if (!trimmed) return false;
    const record = this.records.find((item) => item.id === id);
    if (!record) return false;
    record.question = trimmed;
    this.persistRecords();
    return true;
  }

  deleteRecord(id: string): boolean {
    const index = this.records.findIndex((record) => record.id === id);
    if (index === -1) return false;
    this.records.splice(index, 1);
    this.persistRecords();
    return true;
  }

  clearRecords(): void {
    this.records = [];
    this.persistRecords();
  }

  searchRecords(keyword: string): HistoryRecord[] {
    return searchInRecords(this.records, keyword);
  }

  filterByType(type: DivinationType | 'all'): HistoryRecord[] {
    return filterRecordsByType(this.records, type);
  }

  findTodayDailyFortune(): HistoryRecord | undefined {
    return findDailyFortuneOnDate(this.records, formatLocalDateKey());
  }

  hasDailyFortuneForDate(date: string): boolean {
    return hasDailyFortuneOnDate(this.records, date);
  }

  getDailyFortuneForDate(date: string): HistoryRecord | undefined {
    return findDailyFortuneOnDate(this.records, date);
  }

  getSettings(): AppSettings {
    return { ...this.settings };
  }

  updateSettings(newSettings: Partial<AppSettings>): void {
    this.settings = normalizeAppSettings(this.settings, newSettings);
    saveSettings(this.settings);
  }

  exportRecords(): string {
    return exportRecordsToJson(this.records, this.settings);
  }

  importRecords(jsonData: string): { success: boolean; message: string; count?: number } {
    const parsed = parseImportPayload(jsonData);
    if (!parsed.success || !parsed.records) {
      return { success: false, message: parsed.message };
    }

    const existingIds = new Set(this.records.map((r) => r.id));
    const newRecords = parsed.records.filter((r) => !existingIds.has(r.id));

    this.records = [...newRecords, ...this.records]
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, this.settings.maxHistoryItems);

    saveRecords(this.records);
    if (newRecords.length > 0) {
      eventBus.emit(EVENTS.HISTORY_UPDATED);
    }

    return {
      success: true,
      message: `成功导入 ${newRecords.length} 条记录`,
      count: newRecords.length,
    };
  }

  private persistRecords(): void {
    saveRecords(this.records);
    eventBus.emit(EVENTS.HISTORY_UPDATED);
  }
}

export type { HistoryRecord };

export const historyService = HistoryService.getInstance();
