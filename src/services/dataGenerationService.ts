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
import { drawSingleCard, drawSpreadCards, getCardKeywords } from '@/utils/tarot';
import { generateLiuyao } from './algorithms/liuyao';
import { generateMeihua } from './algorithms/meihua';
import { generateQimen } from './algorithms/qimen';
import { getSignByNumber } from './algorithms/ssgw';
import { calculateDailyFortune } from './algorithms/daily';

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
    const method = supplementaryInfo?.divinationMethod;
    const number = supplementaryInfo?.divinationNumber;

    switch (type) {
      case 'liuyao':
        return generateLiuyao(undefined, method, number);
      case 'meihua': {
        const meihuaData = generateMeihua(undefined, method, number);
        // 确保 calculation 属性符合 MeihuaCalculation 接口
        if (meihuaData.calculation) {
          (meihuaData.calculation as any).method = (meihuaData.calculation as any).method || 'unknown';
        }
        return meihuaData;
      }
      case 'qimen': {
        return generateQimen(undefined, method, number);
      }
      case 'tarot': {
        const result = drawSpreadCards(spreadType as keyof typeof import('@/utils/tarot').tarotSpreads || 'three');
        const cards = result.cards.map(c => ({
          id: c.card.number,
          name: c.card.name,
          reversed: c.isReversed,
          position: c.position,
          keywords: getCardKeywords(c.card.name).split(','),
        }));
        return { ...result, cards };
      }
      case 'tarot_single': {
        const singleResult = drawSingleCard();
        const card = {
          id: singleResult.card.number,
          name: singleResult.card.name,
          reversed: singleResult.isReversed,
          position: singleResult.position,
          keywords: getCardKeywords(singleResult.card.name).split(','),
        };
        return {
          spreadType: 'single',
          spreadName: '单牌指引',
          cards: [card],
          timestamp: singleResult.timestamp,
        };
      }
      case 'ssgw': {
        if (!signNumber) throw new Error('求取三山国王灵签时必须提供签号');
        const sign = getSignByNumber(signNumber);
        if (!sign) throw new Error(`未找到签号为 ${signNumber} 的灵签`);
        return sign;
      }
      case 'daily': {
        return await calculateDailyFortune();
      }
      default:
        throw new Error(`不支持的占卜类型: ${type}`);
    }
  }
}

// 导出单例实例
export const dataGenerationService = new DataGenerationService();
