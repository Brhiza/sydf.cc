import { qimen, tiangan } from '../../../config/divination-data';
import { checkSpecialHourConditions, type SpecialHourConditions } from './special-hours';

const { dizhi, diPanPalaces, palaceStars, palaceDoorMap } = qimen;

export interface ZhiFuZhiShi {
  zhiFu: string;
  zhiShi: string;
  zhiFuPalace: number;
  specialConditions: SpecialHourConditions;
}

const DUN_JIA_MAP: Record<string, string> = {
  甲子: '戊',
  甲戌: '己',
  甲申: '庚',
  甲午: '辛',
  甲辰: '壬',
  甲寅: '癸',
};

export function getDunJiaStem(hourGanZhi: string): string {
  if (!hourGanZhi.startsWith('甲')) {
    return hourGanZhi.charAt(0);
  }
  return DUN_JIA_MAP[hourGanZhi] || '戊';
}

export function getZhiFuZhiShi(hourGanZhi: string): ZhiFuZhiShi {
  const hourGan = hourGanZhi.charAt(0);
  const hourZhi = hourGanZhi.charAt(1);

  const hourGanIndex = tiangan.indexOf(hourGan);
  const hourZhiIndex = dizhi.indexOf(hourZhi);

  const xunShouZhiIndex = (hourZhiIndex - hourGanIndex + 12) % 12;
  const xunShouZhi = dizhi[xunShouZhiIndex];
  const xunShouPalace = diPanPalaces[xunShouZhi as keyof typeof diPanPalaces];

  return {
    zhiFu: palaceStars[xunShouPalace - 1],
    zhiShi: palaceDoorMap[xunShouPalace as keyof typeof palaceDoorMap],
    zhiFuPalace: xunShouPalace,
    specialConditions: checkSpecialHourConditions(hourGanZhi),
  };
}
