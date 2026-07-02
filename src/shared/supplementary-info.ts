import type { SupplementaryInfo } from '@/types/divination';

export const MIN_SUPPLEMENTARY_BIRTH_YEAR = 1900;
export const MAX_SUPPLEMENTARY_BIRTH_YEAR = 2100;
export const SUPPLEMENTARY_GENDERS = ['男', '女'] as const;
export const SUPPLEMENTARY_INTERPRETATION_STYLES = ['入门', '专业'] as const;
export const SUPPLEMENTARY_OUTPUT_LENGTHS = ['精简', '详细', '超详细'] as const;
export const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'] as const;
export const EARTHLY_BRANCHES = [
  '子',
  '丑',
  '寅',
  '卯',
  '辰',
  '巳',
  '午',
  '未',
  '申',
  '酉',
  '戌',
  '亥',
] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function resolveSupplementaryLiteral<T extends string>(
  value: unknown,
  values: readonly T[]
): T | undefined {
  return typeof value === 'string' && values.includes(value as T) ? (value as T) : undefined;
}

export function resolveSupplementaryBirthYear(value: unknown): number | undefined {
  return typeof value === 'number' &&
    Number.isInteger(value) &&
    value >= MIN_SUPPLEMENTARY_BIRTH_YEAR &&
    value <= MAX_SUPPLEMENTARY_BIRTH_YEAR
    ? value
    : undefined;
}

export function resolveSupplementaryDayPillar(
  value: unknown
): SupplementaryInfo['dayPillar'] | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  const heavenlyStem = resolveSupplementaryLiteral(value.heavenlyStem, HEAVENLY_STEMS);
  const earthlyBranch = resolveSupplementaryLiteral(value.earthlyBranch, EARTHLY_BRANCHES);

  return heavenlyStem && earthlyBranch ? { heavenlyStem, earthlyBranch } : undefined;
}

export function normalizeBasicSupplementaryInfo(value: unknown): SupplementaryInfo | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  const info: SupplementaryInfo = {};
  const gender = resolveSupplementaryLiteral(value.gender, SUPPLEMENTARY_GENDERS);
  const birthYear = resolveSupplementaryBirthYear(value.birthYear);
  const interpretationStyle = resolveSupplementaryLiteral(
    value.interpretationStyle,
    SUPPLEMENTARY_INTERPRETATION_STYLES
  );
  const outputLength = resolveSupplementaryLiteral(
    value.outputLength,
    SUPPLEMENTARY_OUTPUT_LENGTHS
  );
  const dayPillar = resolveSupplementaryDayPillar(value.dayPillar);

  if (gender) info.gender = gender;
  if (birthYear) info.birthYear = birthYear;
  if (interpretationStyle) info.interpretationStyle = interpretationStyle;
  if (outputLength) info.outputLength = outputLength;
  if (dayPillar) info.dayPillar = dayPillar;

  return Object.keys(info).length > 0 ? info : undefined;
}
