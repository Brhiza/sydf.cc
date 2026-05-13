import type { HistoryRecord } from '@/types/common';
import { storageService } from '../storageService';
import { handleError, logError } from '@/utils/error-handler';
import { normalizeRecords, type PersistedHistoryRecord } from '../history-migration';
import type { AppSettings } from './types';

const HISTORY_KEY = 'sydf-history';
const SETTINGS_KEY = 'sydf-app-settings';

export interface LoadedRecords {
  records: HistoryRecord[];
  changed: boolean;
}

export function loadRecords(): LoadedRecords {
  try {
    const historyData = storageService.getItem<Array<PersistedHistoryRecord | HistoryRecord>>(
      HISTORY_KEY
    );
    if (!historyData) {
      return { records: [], changed: false };
    }
    return normalizeRecords(historyData);
  } catch (error) {
    const appError = handleError(error, '加载本地数据失败');
    logError(appError, 'History Service - loadRecords');
    console.error('加载本地数据失败:', error);
    return { records: [], changed: false };
  }
}

export function loadSettings<T extends AppSettings>(defaults: T): T {
  try {
    const settingsData = storageService.getItem<T>(SETTINGS_KEY);
    if (!settingsData) {
      return defaults;
    }
    return { ...defaults, ...settingsData };
  } catch (error) {
    const appError = handleError(error, '加载本地数据失败');
    logError(appError, 'History Service - loadSettings');
    console.error('加载本地数据失败:', error);
    return defaults;
  }
}

export function saveRecords(records: HistoryRecord[]): void {
  try {
    storageService.setItem(HISTORY_KEY, records);
  } catch (error) {
    const appError = handleError(error, '保存历史记录失败');
    logError(appError, 'History Service - saveRecords');
    console.error('保存历史记录失败:', error);
  }
}

export function saveSettings(settings: AppSettings): void {
  try {
    storageService.setItem(SETTINGS_KEY, settings);
  } catch (error) {
    const appError = handleError(error, '保存设置失败');
    logError(appError, 'History Service - saveSettings');
    console.error('保存设置失败:', error);
  }
}
