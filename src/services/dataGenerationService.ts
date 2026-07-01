/**
 * 数据生成服务 - 专门处理占卜数据的生成
 */
import type {
  DivinationType,
  LiuyaoData,
  MeihuaData,
  QimenData,
  TarotData,
  SsgwData,
  DailyFortuneData,
  SupplementaryInfo
} from '@/types/divination';
import { createAnchoredDateFromDateKey, normalizeDateKey } from '@/utils/date-formatter';

export class DataGenerationService {
  /**
   * 生成占卜数据
   */
  async generateDivination(
    type: DivinationType,
    spreadType?: string,
    signNumber?: number,
    supplementaryInfo?: SupplementaryInfo
  ): Promise<LiuyaoData | MeihuaData | QimenData | TarotData | SsgwData | DailyFortuneData> {
    switch (type) {
      case 'liuyao': {
        const { generateLiuyao } = await import('./algorithms/liuyao');
        return generateLiuyao();
      }
      case 'meihua': {
        const { generateMeihua } = await import('./algorithms/meihua');
        const meihuaData = generateMeihua(undefined, supplementaryInfo?.meihuaSettings);
        return meihuaData as MeihuaData;
      }
      case 'qimen': {
        const { generateQimen } = await import('./algorithms/qimen');
        return generateQimen();
      }
      case 'tarot': {
        const { drawSpreadCards, getCardKeywords } = await import('mingyu-core/divination/tarot');
        const result = drawSpreadCards(
          (spreadType || 'three') as Parameters<typeof drawSpreadCards>[0]
        );
        const cards = result.cards.map(c => ({
          id: c.card.number,
          name: c.card.name,
          reversed: c.isReversed,
          position: c.position,
          keywords: getCardKeywords(c.card.name).split(','),
        }));
        return { ...result, cards };
      }
      case 'ssgw': {
        const { drawRandomSign } = await import('mingyu-core/divination/ssgw');
        return drawRandomSign() as SsgwData;
      }
      case 'daily': {
        const { calculateDailyFortune } = await import('./algorithms/daily');
        const normalizedDate = supplementaryInfo?.date
          ? normalizeDateKey(supplementaryInfo.date)
          : undefined;
        const date = normalizedDate
          ? createAnchoredDateFromDateKey(normalizedDate) || new Date(normalizedDate)
          : undefined;
        return calculateDailyFortune(date);
      }
      default:
        throw new Error(`不支持的占卜类型: ${type}`);
    }
  }
}

// 导出单例实例
export const dataGenerationService = new DataGenerationService();
