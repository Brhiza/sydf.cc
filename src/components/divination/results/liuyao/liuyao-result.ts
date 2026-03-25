import type { LiuyaoData } from '@/types/divination';
import { LiuyaoHelpers } from '@/utils/divination-helpers';

export interface LiuyaoSummaryItem {
  label: string;
  value: string;
  className?: string;
}

export interface LiuyaoDisplayRow {
  key: number;
  sixGod: string;
  yaoType: '阳' | '阴';
  changeMarkSymbol: string;
  yaoInfo: string;
  voidMark: string;
  worldResponseMark: string;
  changedYaoType: '阳' | '阴';
  changedYaoInfo: string;
}

export function formatChangingYaos(changingYaos?: LiuyaoData['changingYaos']): string {
  if (!changingYaos?.length) {
    return '';
  }

  return changingYaos
    .map((changingYao) => `第${changingYao.position}爻（${changingYao.type}）`)
    .join('、');
}

export function createLiuyaoSummaryItems(data: LiuyaoData): LiuyaoSummaryItem[] {
  const items: LiuyaoSummaryItem[] = [
    {
      label: '主卦',
      value: `${data.originalName}${data.palace?.name ? `（${data.palace.name}宫）` : ''}`,
    },
    {
      label: '变卦',
      value: data.changedName || '',
    },
  ];

  if (data.voidBranches?.length) {
    items.push({
      label: '旬空',
      value: data.voidBranches.join('、'),
    });
  }

  if (data.interName) {
    items.push({
      label: '互卦',
      value: data.interName,
    });
  }

  if (data.specialPattern) {
    items.push({
      label: '特殊卦式',
      value: data.specialPattern,
    });
  }

  if (data.specialAdvice) {
    items.push({
      label: '断卦提示',
      value: data.specialAdvice,
      className: 'special-advice-line',
    });
  }

  const changingSummary = formatChangingYaos(data.changingYaos);
  if (changingSummary) {
    items.push({
      label: '动爻',
      value: changingSummary,
    });
  }

  return items;
}

export function createLiuyaoDisplayRows(data: LiuyaoData): LiuyaoDisplayRow[] {
  return LiuyaoHelpers.generatePaipanData(data)
    .map((yaoDetail) => ({
      key: yaoDetail.position,
      sixGod: yaoDetail.sixGod,
      yaoType: yaoDetail.yaoType,
      changeMarkSymbol: yaoDetail.changeMarkSymbol,
      yaoInfo: `${yaoDetail.sixRelative}${yaoDetail.najiaDizhi}${yaoDetail.wuxing}`,
      voidMark: yaoDetail.voidMark,
      worldResponseMark: yaoDetail.worldResponseMark,
      changedYaoType: yaoDetail.changedYaoType,
      changedYaoInfo: yaoDetail.changedYaoInfo || '',
    }))
    .reverse();
}
