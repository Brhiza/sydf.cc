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
        // 确保 calculation 属性符合 MeihuaCalculation 接口
        if (meihuaData.calculation) {
          meihuaData.calculation.method = meihuaData.calculation.method || 'unknown';
        }
        return meihuaData;
      }
      case 'qimen': {
        const { generateQimen } = await import('./algorithms/qimen');
        return generateQimen();
      }
      case 'tarot': {
        const { drawSpreadCards, getCardKeywords } = await import('@/utils/tarot');
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
        if (!signNumber) throw new Error('求取三山国王灵签时必须提供签号');
        const { getSignByNumber } = await import('./algorithms/ssgw');
        const sign = getSignByNumber(signNumber);
        if (!sign) throw new Error(`未找到签号为 ${signNumber} 的灵签`);
        return sign;
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
