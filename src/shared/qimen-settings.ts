import type { QimenMethod, QimenScope, QimenSettings } from '../types/divination';

export const DEFAULT_QIMEN_METHOD: QimenMethod = 'zhuanpan';
export const DEFAULT_QIMEN_SCOPE: QimenScope = 'hour';
export const DEFAULT_QIMEN_SETTINGS: Required<QimenSettings> = {
  method: DEFAULT_QIMEN_METHOD,
  scope: DEFAULT_QIMEN_SCOPE,
};

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

export function resolveQimenSettings(settings?: QimenSettings): Required<QimenSettings> {
  return {
    method: settings?.method || DEFAULT_QIMEN_METHOD,
    scope: settings?.scope || DEFAULT_QIMEN_SCOPE,
  };
}

export function isDefaultQimenSettings(settings?: QimenSettings): boolean {
  const resolved = resolveQimenSettings(settings);
  return (
    resolved.method === DEFAULT_QIMEN_METHOD &&
    resolved.scope === DEFAULT_QIMEN_SCOPE
  );
}

export function formatQimenScopeLabel(scope?: QimenScope): string {
  return QIMEN_SCOPE_LABELS[scope || DEFAULT_QIMEN_SCOPE];
}

export function formatQimenMethodLabel(method?: QimenMethod): string {
  return QIMEN_METHOD_LABELS[method || DEFAULT_QIMEN_METHOD];
}

export function formatQimenSettingsLabel(settings?: QimenSettings): string {
  const resolved = resolveQimenSettings(settings);
  return `${formatQimenScopeLabel(resolved.scope)}${formatQimenMethodLabel(resolved.method)}`;
}
