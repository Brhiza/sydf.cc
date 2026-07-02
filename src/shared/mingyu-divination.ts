import { generateLiuyao } from 'mingyu-core/divination/liuyao';
import { generateMeihua } from 'mingyu-core/divination/meihua';
import { generateQimen } from 'mingyu-core/divination/qimen';
import type {
  LiuyaoData,
  MeihuaData,
  QimenData,
  QimenSettings,
  SsgwData,
  TarotData,
  MeihuaSettings,
} from '@/types/divination';
import { DEFAULT_QIMEN_METHOD, resolveQimenSettings } from './qimen-settings';
import { DEFAULT_TAROT_SPREAD_KEY } from './tarot-spreads';
import { mapMingyuTarotResult } from './tarot-result';

export function generateMingyuLiuyao(): LiuyaoData {
  return generateLiuyao();
}

export function generateMingyuMeihua(settings?: MeihuaSettings): MeihuaData {
  return generateMeihua(undefined, settings) as MeihuaData;
}

export function generateMingyuQimen(settings?: QimenSettings): QimenData {
  const resolved = resolveQimenSettings(settings);
  return generateQimen(undefined, resolved.method, resolved.scope);
}

export function generateMingyuDailyQimen(date: Date): QimenData {
  return generateQimen(date, DEFAULT_QIMEN_METHOD, 'day');
}

export async function generateMingyuTarot(spreadType?: string): Promise<TarotData> {
  const { drawSpreadCards, getCardKeywords } = await import('mingyu-core/divination/tarot');
  const result = drawSpreadCards(
    (spreadType || DEFAULT_TAROT_SPREAD_KEY) as Parameters<typeof drawSpreadCards>[0]
  );
  return mapMingyuTarotResult(result, getCardKeywords);
}

export async function generateMingyuSsgw(): Promise<SsgwData> {
  const { drawRandomSign } = await import('mingyu-core/divination/ssgw');
  return drawRandomSign() as SsgwData;
}
