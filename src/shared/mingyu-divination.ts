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

export function generateMingyuLiuyao(date?: Date): LiuyaoData {
  return generateLiuyao(date);
}

export function generateMingyuMeihua(settings?: MeihuaSettings, date?: Date): MeihuaData {
  return generateMeihua(date, settings) as MeihuaData;
}

export function generateMingyuQimen(settings?: QimenSettings, date?: Date): QimenData {
  const resolved = resolveQimenSettings(settings);
  return generateQimen(date, resolved.method, resolved.scope);
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

export async function generateMingyuSsgw(date?: Date): Promise<SsgwData> {
  const { drawRandomSign } = await import('mingyu-core/divination/ssgw');
  return drawRandomSign(date) as SsgwData;
}
