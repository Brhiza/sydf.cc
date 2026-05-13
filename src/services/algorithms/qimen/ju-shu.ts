import { jiazi, qimen } from '../../../config/divination-data';

const { jieQiJuShuMap } = qimen;

export interface QimenJuShu {
  isYangDun: boolean;
  juShu: number;
  yuan: string;
}

const YUAN_NAMES = ['上元', '中元', '下元'] as const;

export function getQimenJuShu(timeInfo: {
  jieQi: string;
  ganzhi: { day: string };
}): QimenJuShu {
  const rule = jieQiJuShuMap[timeInfo.jieQi as keyof typeof jieQiJuShuMap];
  if (!rule) {
    throw new Error(`找不到节气 "${timeInfo.jieQi}" 对应的局数规则。`);
  }

  const dayIndex = jiazi.indexOf(timeInfo.ganzhi.day);
  if (dayIndex === -1) {
    throw new Error(`无法识别日干支 "${timeInfo.ganzhi.day}" 的三元归属。`);
  }

  const yuanIndex = Math.floor(dayIndex / 5) % 3;

  return {
    isYangDun: rule.dun === '阳',
    juShu: rule.ju[yuanIndex],
    yuan: YUAN_NAMES[yuanIndex],
  };
}
