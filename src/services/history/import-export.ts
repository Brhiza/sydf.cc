import type { HistoryRecord } from '@/types/common';
import { normalizeRecords } from '../history-migration';
import type { AppSettings } from './types';

export const IMPORT_JSON_MAX_LENGTH = 2 * 1024 * 1024;
export const IMPORT_RECORDS_MAX_COUNT = 1000;

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
  if (jsonData.length > IMPORT_JSON_MAX_LENGTH) {
    return { success: false, message: '导入文件过大，请选择较小的历史备份文件' };
  }

  try {
    const importData = JSON.parse(jsonData);
    if (!importData.records || !Array.isArray(importData.records)) {
      return { success: false, message: '无效的数据格式' };
    }
    if (importData.records.length > IMPORT_RECORDS_MAX_COUNT) {
      return { success: false, message: `一次最多导入 ${IMPORT_RECORDS_MAX_COUNT} 条历史记录` };
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
