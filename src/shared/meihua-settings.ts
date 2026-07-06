import type { MeihuaDivinationMethod, MeihuaSettings } from '@/types/divination';

type RawMeihuaSettings = Partial<Record<keyof MeihuaSettings, unknown>>;

export const DEFAULT_MEIHUA_METHOD: MeihuaDivinationMethod = 'time';

const MEIHUA_METHODS: readonly MeihuaDivinationMethod[] = ['time', 'number', 'random'];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function resolveMeihuaMethod(method: unknown): MeihuaDivinationMethod {
  return MEIHUA_METHODS.includes(method as MeihuaDivinationMethod)
    ? (method as MeihuaDivinationMethod)
    : DEFAULT_MEIHUA_METHOD;
}

export function resolvePositiveInteger(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isSafeInteger(value) && value > 0
    ? value
    : undefined;
}

export function resolveOptionName<T extends string>(
  value: unknown,
  options: readonly { name: T }[]
): T | undefined {
  return typeof value === 'string' && options.some((option) => option.name === value)
    ? (value as T)
    : undefined;
}

export function normalizeMeihuaSettings(settings?: unknown): MeihuaSettings | undefined {
  if (!isRecord(settings)) {
    return undefined;
  }

  const raw = settings as RawMeihuaSettings;
  const method = resolveMeihuaMethod(raw.method);

  if (method === 'number') {
    const number = resolvePositiveInteger(raw.number);
    return number ? { method, number } : undefined;
  }

  if (method === 'random') {
    return { method };
  }

  return undefined;
}
