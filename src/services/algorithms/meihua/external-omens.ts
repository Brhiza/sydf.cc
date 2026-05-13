import type { MeihuaExternalOmens } from '@/types/divination';
import {
  meihuaAnimalMap,
  meihuaColorMap,
  meihuaDirectionMap,
  meihuaObjectMap,
  meihuaOmenPriority,
  meihuaPersonMap,
  meihuaSoundMap,
} from '../../../config/meihua-omens';

export type MappedExternalOmen = {
  source: (typeof meihuaOmenPriority)[number];
  label: string;
  trigramIndex: number;
  trigramName: string;
};

const OMEN_MAPS = {
  direction: meihuaDirectionMap,
  person: meihuaPersonMap,
  animal: meihuaAnimalMap,
  object: meihuaObjectMap,
  sound: meihuaSoundMap,
  color: meihuaColorMap,
} as const;

export function mapExternalOmens(externalOmens: MeihuaExternalOmens): MappedExternalOmen[] {
  const mapped: MappedExternalOmen[] = [];

  for (const source of meihuaOmenPriority) {
    const value = externalOmens[source];
    if (!value) {
      continue;
    }

    const omenMap = OMEN_MAPS[source] as Record<string, { trigramIndex: number; trigramName: string }>;
    const mappedOmen = omenMap[value];
    if (!mappedOmen) {
      continue;
    }

    mapped.push({
      source,
      label: value,
      trigramIndex: mappedOmen.trigramIndex,
      trigramName: mappedOmen.trigramName,
    });
  }

  return mapped;
}
