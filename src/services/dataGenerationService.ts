/**
 * 数据生成服务 - 专门处理占卜数据的生成
 */
import type {
  DivinationType,
  TarotData,
  SsgwData,
  DailyFortuneData,
  SupplementaryInfo,
  LiuyaoData,
  MeihuaData,
  QimenData,
} from '@/types/divination';
import { createAnchoredDateFromDateKey, normalizeDateKey } from '@/utils/date-formatter';
import {
  generateMingyuLiuyao,
  generateMingyuMeihua,
  generateMingyuQimen,
  generateMingyuSsgw,
  generateMingyuTarot,
} from '@/shared/mingyu-divination';

export class DataGenerationService {
  /**
   * 生成占卜数据
   */
  async generateDivination(
    type: DivinationType,
    spreadType?: string,
    supplementaryInfo?: SupplementaryInfo
  ): Promise<LiuyaoData | MeihuaData | QimenData | TarotData | SsgwData | DailyFortuneData> {
    switch (type) {
      case 'liuyao': {
        return generateMingyuLiuyao();
      }
      case 'meihua': {
        return generateMingyuMeihua(supplementaryInfo?.meihuaSettings);
      }
      case 'qimen': {
        return generateMingyuQimen(supplementaryInfo?.qimenSettings);
      }
      case 'tarot': {
        return generateMingyuTarot(spreadType);
      }
      case 'ssgw': {
        return generateMingyuSsgw();
      }
      case 'daily': {
        const { calculateDailyFortune } = await import('./daily-fortune');
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
