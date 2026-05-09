import { DIVINATION_TYPES } from '@/types';
import type { DivinationType } from '@/types';

// 兼容类型仅允许存在于 API、历史迁移等边界层，不应继续扩散到正式业务类型定义。
const LEGACY_DIVINATION_TYPES = ['tarot_single'] as const;
export const COMPATIBLE_DIVINATION_TYPES = [...DIVINATION_TYPES, ...LEGACY_DIVINATION_TYPES] as const;
type CompatibleDivinationType = (typeof COMPATIBLE_DIVINATION_TYPES)[number];

export function isDivinationType(type: string): type is DivinationType {
  return (DIVINATION_TYPES as readonly string[]).includes(type);
}

export function isCompatibleDivinationType(type: string): type is CompatibleDivinationType {
  return (COMPATIBLE_DIVINATION_TYPES as readonly string[]).includes(type);
}

export function normalizeDivinationType(type: CompatibleDivinationType): DivinationType {
  if (type === 'tarot_single') {
    return 'tarot';
  }

  return type;
}

export function resolveTarotSpreadType(
  type: CompatibleDivinationType,
  spreadType?: string
): string | undefined {
  if (type === 'tarot_single') {
    return 'single';
  }

  if (type === 'tarot') {
    return spreadType || 'three';
  }

  return spreadType;
}
