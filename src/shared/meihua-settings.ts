import type {
  MeihuaDivinationMethod,
  MeihuaExternalOmens,
  MeihuaSettings,
} from '@/types/divination';
import {
  meihuaAnimalOptions,
  meihuaColorOptions,
  meihuaDirectionOptions,
  meihuaObjectOptions,
  meihuaPersonOptions,
  meihuaSoundOptions,
} from './meihua-omens';

type RawMeihuaSettings = Partial<Record<keyof MeihuaSettings, unknown>>;
type RawExternalOmens = Partial<Record<keyof MeihuaExternalOmens, unknown>>;

export const DEFAULT_MEIHUA_METHOD: MeihuaDivinationMethod = 'time';

const MEIHUA_METHODS: readonly MeihuaDivinationMethod[] = [
  'time',
  'number',
  'random',
  'external',
];

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

export function resolveMeihuaOptionName<T extends string>(
  value: unknown,
  options: readonly { name: T }[]
): T | undefined {
  return typeof value === 'string' && options.some((option) => option.name === value)
    ? (value as T)
    : undefined;
}

export function resolveMeihuaExternalOmens(value: unknown): MeihuaExternalOmens | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  const raw = value as RawExternalOmens;
  const omens: MeihuaExternalOmens = {
    direction: resolveMeihuaOptionName(raw.direction, meihuaDirectionOptions),
    person: resolveMeihuaOptionName(raw.person, meihuaPersonOptions),
    animal: resolveMeihuaOptionName(raw.animal, meihuaAnimalOptions),
    object: resolveMeihuaOptionName(raw.object, meihuaObjectOptions),
    sound: resolveMeihuaOptionName(raw.sound, meihuaSoundOptions),
    color: resolveMeihuaOptionName(raw.color, meihuaColorOptions),
    count: resolvePositiveInteger(raw.count),
  };

  const mappedOmenCount = [
    omens.direction,
    omens.person,
    omens.animal,
    omens.object,
    omens.sound,
    omens.color,
  ].filter(Boolean).length;

  if (mappedOmenCount < 2 || typeof omens.count !== 'number') {
    return undefined;
  }

  return Object.fromEntries(
    Object.entries(omens).filter(([, optionValue]) => optionValue !== undefined)
  ) as MeihuaExternalOmens;
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

  if (method === 'external') {
    const externalOmens = resolveMeihuaExternalOmens(raw.externalOmens);
    return externalOmens ? { method, externalOmens } : undefined;
  }

  return undefined;
}
