import type { QimenMethod, QimenScope, QimenSettings } from '../types/divination';

export const QIMEN_SCOPE_LABELS: Record<QimenScope, string> = {
  hour: '时家',
  day: '日家',
  month: '月家',
  year: '年家',
};

export const QIMEN_METHOD_LABELS: Record<QimenMethod, string> = {
  zhuanpan: '转盘法',
  feipan: '飞盘法',
};

export function formatQimenScopeLabel(scope?: QimenScope): string {
  return QIMEN_SCOPE_LABELS[scope || 'hour'];
}

export function formatQimenMethodLabel(method?: QimenMethod): string {
  return QIMEN_METHOD_LABELS[method || 'zhuanpan'];
}

export function formatQimenSettingsLabel(settings?: QimenSettings): string {
  return `${formatQimenScopeLabel(settings?.scope)}${formatQimenMethodLabel(settings?.method)}`;
}
