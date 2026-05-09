import type {
  DivinationResult,
  DivinationType,
  LiuyaoData,
  MeihuaData,
  QimenData,
  SsgwData,
  TarotData,
} from '@/types';

export type ResultRenderer =
  | {
      kind: 'liuyao';
      props: {
        data: LiuyaoData;
      };
    }
  | {
      kind: 'meihua';
      props: {
        data: MeihuaData;
      };
    }
  | {
      kind: 'qimen';
      props: {
        data: QimenData;
        question?: string;
        supplementaryInfo?: DivinationResult['supplementaryInfo'];
      };
    }
  | {
      kind: 'tarot';
      props: {
        cards: TarotData['cards'];
        spreadType?: string;
        spreadName?: string;
        timestamp?: number;
        showExplanation: boolean;
      };
    }
  | {
      kind: 'ssgw';
      props: {
        data: SsgwData;
      };
    }
  | {
      kind: 'daily';
      props: {
        aiResponse: string;
        isLoading: boolean;
      };
    };

export function resolveResultRenderer(
  type: DivinationType,
  result: DivinationResult,
  question?: string,
  isAiLoading: boolean = false
): ResultRenderer | null {
  if (!result.data) {
    return null;
  }

  switch (type) {
    case 'liuyao':
      return {
        kind: 'liuyao',
        props: {
          data: result.data as LiuyaoData,
        },
      };
    case 'meihua':
      return {
        kind: 'meihua',
        props: {
          data: result.data as MeihuaData,
        },
      };
    case 'qimen':
      return {
        kind: 'qimen',
        props: {
          data: result.data as QimenData,
          question,
          supplementaryInfo: result.supplementaryInfo,
        },
      };
    case 'tarot': {
      const tarotData = result.data as TarotData;

      return {
        kind: 'tarot',
        props: {
          cards: tarotData.cards || [],
          spreadType: tarotData.spreadType,
          spreadName: tarotData.spreadName,
          timestamp: tarotData.timestamp,
          showExplanation: true,
        },
      };
    }
    case 'ssgw':
      return {
        kind: 'ssgw',
        props: {
          data: result.data as SsgwData,
        },
      };
    case 'daily':
      return {
        kind: 'daily',
        props: {
          aiResponse: result.aiResponse || '',
          isLoading: isAiLoading,
        },
      };
    default:
      return null;
  }
}
