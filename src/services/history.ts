/**
 * 统一的历史记录服务
 * 整合所有历史记录相关功能
 */
import type { DailyFortuneData, DivinationType } from '@/types';
import type { HistoryRecord } from '@/types/common';
import { storageService } from './storageService';
import { handleError, logError } from '@/utils/error-handler';
import { eventBus, EVENTS } from '@/utils/eventBus';
import { createId } from '@/utils/id';
import { formatLocalDateKey, getMonthDayFromDateKey, normalizeDateKey } from '@/utils/date-formatter';
import { normalizeDivinationType } from '@/utils/divination-type';

// 存储键名
const HISTORY_KEY = 'sydf-history';
const SETTINGS_KEY = 'sydf-app-settings';

// 设置接口
export interface AppSettings {
  autoSave: boolean;
  maxHistoryItems: number;
  theme: 'light' | 'dark';
  useCustomApi: boolean;
  customApiKey?: string;
  customApiEndpoint?: string;
}

// 默认设置
const DEFAULT_SETTINGS: AppSettings = {
  autoSave: true,
  maxHistoryItems: 100,
  theme: 'light',
  useCustomApi: false,
};

type LegacyPersistedTarotSingleRecord = Omit<HistoryRecord, 'type' | 'result'> & {
  type: 'tarot_single';
  result: Omit<HistoryRecord['result'], 'type'> & {
    type: 'tarot_single';
  };
};

type PersistedHistoryRecord = HistoryRecord | LegacyPersistedTarotSingleRecord;

/**
 * 历史记录服务类
 */
export class HistoryService {
  private static instance: HistoryService;
  private records: HistoryRecord[] = [];
  private settings: AppSettings = DEFAULT_SETTINGS;

  private constructor() {
    this.loadFromStorage();
  }

  static getInstance(): HistoryService {
    if (!HistoryService.instance) {
      HistoryService.instance = new HistoryService();
    }
    return HistoryService.instance;
  }

  /**
   * 获取所有历史记录（置顶记录优先）
   */
  getRecords(): HistoryRecord[] {
    // 分离置顶和非置顶记录
    const pinnedRecords = this.records.filter(record => record.pinned);
    const unpinnedRecords = this.records.filter(record => !record.pinned);
    
    // 置顶记录按置顶时间倒序，非置顶记录按时间戳倒序
    pinnedRecords.sort((a, b) => (b.pinnedAt || b.timestamp) - (a.pinnedAt || a.timestamp));
    unpinnedRecords.sort((a, b) => b.timestamp - a.timestamp);
    
    // 返回置顶记录在前，非置顶记录在后的合并数组
    return [...pinnedRecords, ...unpinnedRecords];
  }
  /**
   * 置顶记录
   */
  pinRecord(id: string): boolean {
    const record = this.records.find(r => r.id === id);
    if (record) {
      record.pinned = true;
      record.pinnedAt = Date.now(); // 记录置顶时间
      this.saveToStorage();
      eventBus.emit(EVENTS.HISTORY_UPDATED);
      return true;
    }
    return false;
  }

  /**
   * 取消置顶记录
   */
  unpinRecord(id: string): boolean {
    const record = this.records.find(r => r.id === id);
    if (record) {
      record.pinned = false;
      delete record.pinnedAt; // 删除置顶时间
      this.saveToStorage();
      eventBus.emit(EVENTS.HISTORY_UPDATED);
      return true;
    }
    return false;
  }

  /**
   * 获取置顶记录
   */
  getPinnedRecords(): HistoryRecord[] {
    return this.records.filter(record => record.pinned);
  }

  /**
   * 切换记录置顶状态
   */
  togglePinRecord(id: string): boolean {
    const record = this.records.find(r => r.id === id);
    if (record) {
      if (record.pinned) {
        return this.unpinRecord(id);
      } else {
        return this.pinRecord(id);
      }
    }
    return false;
  }

  /**
   * 根据ID获取历史记录
   */
  getRecord(id: string): HistoryRecord | undefined {
    return this.records.find((record) => record.id === id);
  }

  private normalizePersistedRecord(record: PersistedHistoryRecord | HistoryRecord): HistoryRecord {
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

  private normalizeRecords(
    records: Array<PersistedHistoryRecord | HistoryRecord>
  ): { records: HistoryRecord[]; changed: boolean } {
    let changed = false;

    const normalizedRecords = records.map((record) => {
      const normalizedRecord = this.normalizePersistedRecord(record);
      if (normalizedRecord !== record) {
        changed = true;
      }
      return normalizedRecord;
    });

    return { records: normalizedRecords, changed };
  }

  /**
   * 添加历史记录
   */
  addRecord(record: Omit<HistoryRecord, 'timestamp' | 'summary'>): HistoryRecord {
    const normalizedRecord = this.normalizePersistedRecord(record);
    const newRecord: HistoryRecord = {
      ...normalizedRecord,
      id: normalizedRecord.id || createId(),
      timestamp: Date.now(),
      summary: this.generateSummary(normalizedRecord.result),
    };

    this.records.unshift(newRecord);

    // 限制记录数量
    if (this.records.length > this.settings.maxHistoryItems) {
      this.records = this.records.slice(0, this.settings.maxHistoryItems);
    }

    this.saveToStorage();
    eventBus.emit(EVENTS.HISTORY_UPDATED);
    return newRecord;
  }

  /**
   * 更新历史记录
   */
  updateRecord(id: string, updatedRecord: HistoryRecord): boolean {
    const index = this.records.findIndex((record) => record.id === id);
    if (index !== -1) {
      this.records[index] = this.normalizePersistedRecord(updatedRecord);
      this.saveToStorage();
      eventBus.emit(EVENTS.HISTORY_UPDATED);
      return true;
    }
    return false;
  }

  /**
   * 重命名历史记录问题标题
   */
  renameRecord(id: string, question: string): boolean {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) {
      return false;
    }

    const record = this.records.find((item) => item.id === id);
    if (!record) {
      return false;
    }

    record.question = trimmedQuestion;
    this.saveToStorage();
    eventBus.emit(EVENTS.HISTORY_UPDATED);
    return true;
  }

  /**
   * 删除历史记录
   */
  deleteRecord(id: string): boolean {
    const index = this.records.findIndex((record) => record.id === id);
    if (index !== -1) {
      this.records.splice(index, 1);
      this.saveToStorage();
      eventBus.emit(EVENTS.HISTORY_UPDATED);
      return true;
    }
    return false;
  }

  /**
   * 清空所有历史记录
   */
  clearRecords(): void {
    this.records = [];
    this.saveToStorage();
    eventBus.emit(EVENTS.HISTORY_UPDATED);
  }

  /**
   * 搜索历史记录
   */
  searchRecords(keyword: string): HistoryRecord[] {
    if (!keyword.trim()) return this.getRecords();

    const lowerKeyword = keyword.toLowerCase();
    return this.records.filter(
      (record) =>
        record.question.toLowerCase().includes(lowerKeyword) ||
        record.summary.toLowerCase().includes(lowerKeyword)
    );
  }

  /**
   * 按类型筛选历史记录
   */
  filterByType(type: DivinationType | 'all'): HistoryRecord[] {
    if (type === 'all') return this.getRecords();
    return this.records.filter((record) => record.type === type);
  }

  /**
   * 查找今日运势记录
   */
  findTodayDailyFortune(): HistoryRecord | undefined {
    return this.getDailyFortuneForDate(formatLocalDateKey());
  }

  /**
   * 检查指定日期是否有运势记录
   */
  hasDailyFortuneForDate(date: string): boolean {
    const targetDateStr = normalizeDateKey(date);
    
    return this.records.some((record) => {
      if (record.type !== 'daily') return false;
      
      const recordData = record.result.data as DailyFortuneData;
      if (recordData && recordData.date) {
        // 直接比较日期字符串，避免时区转换问题
        return recordData.date === targetDateStr;
      }
      
      return false;
    });
  }

  /**
   * 获取指定日期的运势记录
   */
  getDailyFortuneForDate(date: string): HistoryRecord | undefined {
    const targetDateStr = normalizeDateKey(date);

    const matchedRecords = this.records.filter((record) => {
      if (record.type !== 'daily') return false;

      const recordData = record.result.data as DailyFortuneData;
      if (recordData && recordData.date) {
        // 直接比较日期字符串，避免时区转换问题
        return recordData.date === targetDateStr;
      }

      return false;
    });

    if (matchedRecords.length === 0) {
      return undefined;
    }

    return matchedRecords.sort((a, b) => b.timestamp - a.timestamp)[0];
  }

  /**
   * 获取设置
   */
  getSettings(): AppSettings {
    return { ...this.settings };
  }

  /**
   * 更新设置
   */
  updateSettings(newSettings: Partial<AppSettings>): void {
    this.settings = { ...this.settings, ...newSettings };
    this.saveSettingsToStorage();
  }

  /**
   * 导出历史记录
   */
  exportRecords(): string {
    const exportData = {
      version: '1.0',
      exportTime: new Date().toISOString(),
      records: this.records,
      settings: this.settings,
    };
    return JSON.stringify(exportData, null, 2);
  }

  /**
   * 导入历史记录
   */
  importRecords(jsonData: string): { success: boolean; message: string; count?: number } {
    try {
      const importData = JSON.parse(jsonData);

      if (!importData.records || !Array.isArray(importData.records)) {
        return { success: false, message: '无效的数据格式' };
      }

      // 合并记录并去重
      const existingIds = new Set(this.records.map((r) => r.id));
      const { records: normalizedImportedRecords } = this.normalizeRecords(
        importData.records as PersistedHistoryRecord[]
      );
      const newRecords = normalizedImportedRecords.filter((r) => !existingIds.has(r.id));

      this.records = [...newRecords, ...this.records]
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, this.settings.maxHistoryItems);

      this.saveToStorage();
      if (newRecords.length > 0) {
        eventBus.emit(EVENTS.HISTORY_UPDATED);
      }

      return {
        success: true,
        message: `成功导入 ${newRecords.length} 条记录`,
        count: newRecords.length,
      };
    } catch {
      return { success: false, message: '数据解析失败' };
    }
  }

  /**
   * 从本地存储加载数据
   */
  private loadFromStorage(): void {
    try {
      // 加载历史记录
      const historyData = storageService.getItem<Array<PersistedHistoryRecord | HistoryRecord>>(
        HISTORY_KEY
      );
      if (historyData) {
        const { records, changed } = this.normalizeRecords(historyData);
        this.records = records;
        if (changed) {
          this.saveToStorage();
        }
      }

      // 加载设置
      const settingsData = storageService.getItem<AppSettings>(SETTINGS_KEY);
      if (settingsData) {
        this.settings = { ...DEFAULT_SETTINGS, ...settingsData };
      }
    } catch (error) {
      const appError = handleError(error, '加载本地数据失败');
      logError(appError, 'History Service - loadFromStorage');
      console.error('加载本地数据失败:', error);
    }
  }

  /**
   * 保存历史记录到本地存储
   */
  private saveToStorage(): void {
    try {
      storageService.setItem(HISTORY_KEY, this.records);
    } catch (error) {
      const appError = handleError(error, '保存历史记录失败');
      logError(appError, 'History Service - saveToStorage');
      console.error('保存历史记录失败:', error);
    }
  }

  /**
   * 保存设置到本地存储
   */
  private saveSettingsToStorage(): void {
    try {
      storageService.setItem(SETTINGS_KEY, this.settings);
    } catch (error) {
      const appError = handleError(error, '保存设置失败');
      logError(appError, 'History Service - saveSettingsToStorage');
      console.error('保存设置失败:', error);
    }
  }

  /**
   * 生成结果摘要
   */
  private generateSummary(result: HistoryRecord['result']): string {
    try {
      const { type, data } = result;

      switch (type) {
        case 'liuyao':
          // 确保 data 是 LiuyaoData 类型
          if ('originalName' in data) {
            return `六爻: ${data.originalName || '未知卦'}`;
          }
          return '六爻: 未知卦';
        case 'meihua':
          // 确保 data 是 MeihuaData 类型
          if ('originalName' in data) {
            return `梅花易数: ${data.originalName || '未知卦'}`;
          }
          return '梅花易数: 未知卦';
        case 'qimen':
          // 确保 data 是 QimenData 类型
          if ('chart' in data) {
            return `奇门遁甲: 排盘完成`;
          }
          return '奇门遁甲: 未知局';
        case 'tarot':
          // 确保 data 是 TarotData 类型
          if ('cards' in data && Array.isArray(data.cards)) {
            return `塔罗牌: ${data.cards.map((c) => c.name).join(', ')}`;
          }
          return '塔罗牌: 未知牌';
        case 'ssgw':
          // 确保 data 是 SsgwData 类型
          if ('title' in data) {
            return `${data.title || '三山国王灵签'}`;
          }
          return '三山国王灵签';
        case 'daily':
          // 确保 data 是 DailyFortuneData 类型
          if ('date' in data) {
            const { month, day } = getMonthDayFromDateKey(data.date);
            return `${month} 月 ${day} 日运势`;
          }
          return '今日运势';
        default:
          return `${type} 占卜结果`;
      }
    } catch {
      return '占卜结果';
    }
  }
}

// 导出类型
export type { HistoryRecord };

// 导出单例实例
export const historyService = HistoryService.getInstance();

// 不再导出便捷函数，强制使用 historyService.method() 以确保实例存在
// export const {
//   getRecords,
//   getRecord,
//   addRecord,
//   deleteRecord,
//   clearRecords,
//   searchRecords,
//   filterByType,
//   getSettings,
//   updateSettings,
//   exportRecords,
//   importRecords,
// } = historyService;
