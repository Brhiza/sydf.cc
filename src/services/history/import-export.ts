import type { HistoryRecord } from '@/types/common';
import { normalizeRecords } from '../history-migration';
import type { AppSettings } from './types';

export interface ExportPayload {
  version: string;
  exportTime: string;
  records: HistoryRecord[];
  settings: AppSettings;
}

export function exportRecordsToJson(records: HistoryRecord[], settings: AppSettings): string {
  const payload: ExportPayload = {
    version: '1.0',
    exportTime: new Date().toISOString(),
    records,
    settings,
  };
  return JSON.stringify(payload, null, 2);
}

export interface ParsedImportPayload {
  success: boolean;
  message: string;
  records?: HistoryRecord[];
}

export function parseImportPayload(jsonData: string): ParsedImportPayload {
  try {
    const importData = JSON.parse(jsonData);
    if (!importData.records || !Array.isArray(importData.records)) {
      return { success: false, message: '无效的数据格式' };
    }
    const { records } = normalizeRecords(importData.records);
    if (records.length === 0) {
      return { success: false, message: '没有可导入的有效历史记录' };
    }
    return { success: true, message: '解析成功', records };
  } catch {
    return { success: false, message: '数据解析失败' };
  }
}
