import type { QimenMethod, QimenScope, QimenSettings } from '../types/divination';

type RawQimenSettings = Partial<Record<keyof QimenSettings, unknown>>;

export const DEFAULT_QIMEN_METHOD: QimenMethod = 'zhuanpan';
export const DEFAULT_QIMEN_SCOPE: QimenScope = 'hour';
export const DEFAULT_QIMEN_SETTINGS: Required<QimenSettings> = {
  method: DEFAULT_QIMEN_METHOD,
  scope: DEFAULT_QIMEN_SCOPE,
};

const QIMEN_METHODS: readonly QimenMethod[] = ['zhuanpan', 'feipan'];
const QIMEN_SCOPES: readonly QimenScope[] = ['hour', 'day', 'month', 'year'];

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

export function resolveQimenSettings(settings?: RawQimenSettings): Required<QimenSettings> {
  const method = settings?.method;
  const scope = settings?.scope;

  return {
    method: QIMEN_METHODS.includes(method as QimenMethod)
      ? (method as QimenMethod)
      : DEFAULT_QIMEN_METHOD,
    scope: QIMEN_SCOPES.includes(scope as QimenScope)
      ? (scope as QimenScope)
      : DEFAULT_QIMEN_SCOPE,
  };
}

export function isDefaultQimenSettings(settings?: RawQimenSettings): boolean {
  const resolved = resolveQimenSettings(settings);
  return (
    resolved.method === DEFAULT_QIMEN_METHOD &&
    resolved.scope === DEFAULT_QIMEN_SCOPE
  );
}

export function formatQimenScopeLabel(scope?: unknown): string {
  return QIMEN_SCOPE_LABELS[resolveQimenSettings({ scope }).scope];
}

export function formatQimenMethodLabel(method?: unknown): string {
  return QIMEN_METHOD_LABELS[resolveQimenSettings({ method }).method];
}

export function formatQimenSettingsLabel(settings?: QimenSettings): string {
  const resolved = resolveQimenSettings(settings);
  return `${formatQimenScopeLabel(resolved.scope)}${formatQimenMethodLabel(resolved.method)}`;
}
