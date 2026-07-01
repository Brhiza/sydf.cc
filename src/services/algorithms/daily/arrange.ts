import type { DailyQimenJiuGongGe } from '../../../types/divination.ts';
import { qimen, tiangan, dizhi } from 'mingyu-core/divination/divination-data';
import {
  GAN_PALACE_MAP,
  LUO_SHU_PATH,
  SAN_QI_LIU_YI,
  ZHI_PALACE_MAP,
} from './constants.ts';

const YANG_DUN_JIE_QI = new Set([
  '冬至', '小寒', '大寒', '立春', '雨水', '惊蛰',
  '春分', '清明', '谷雨', '立夏', '小满', '芒种',
]);

const YANG_GAN_JU_MAP: Record<string, number> = {
  甲: 1, 乙: 2, 丙: 3, 丁: 4, 戊: 5,
  己: 6, 庚: 7, 辛: 8, 壬: 9, 癸: 1,
};

const YIN_GAN_JU_MAP: Record<string, number> = {
  甲: 9, 乙: 8, 丙: 7, 丁: 6, 戊: 5,
  己: 4, 庚: 3, 辛: 2, 壬: 1, 癸: 9,
};

const JIE_QI_ADJUSTMENT: Record<string, number> = {
  冬至: 0, 小寒: 0, 大寒: 0, 立春: 1, 雨水: 1, 惊蛰: 1,
  春分: 2, 清明: 2, 谷雨: 2, 立夏: 3, 小满: 3, 芒种: 3,
  夏至: 0, 小暑: 0, 大暑: 0, 立秋: 1, 处暑: 1, 白露: 1,
  秋分: 2, 寒露: 2, 霜降: 2, 立冬: 3, 小雪: 3, 大雪: 3,
};

const GAN_STAR_MAP: Record<string, string> = {
  甲: '天心', 乙: '天任', 丙: '天英', 丁: '天芮', 戊: '天禽',
  己: '天柱', 庚: '天心', 辛: '天任', 壬: '天英', 癸: '天芮',
};

const ZHI_DOOR_MAP: Record<string, string> = {
  子: '休门', 丑: '生门', 寅: '伤门', 卯: '杜门',
  辰: '景门', 巳: '死门', 午: '惊门', 未: '开门',
  申: '休门', 酉: '生门', 戌: '伤门', 亥: '杜门',
};

export interface DailyQimenJuShu {
  isYangDun: boolean;
  juShu: number;
  yuan: string;
}

export interface DailyZhiFuZhiShi {
  zhiFu: string;
  zhiShi: string;
  zhiFuPalace: number;
}

export function getDailyQimenJuShu(timeInfo: { jieQi: string; ganzhi: { day: string } }): DailyQimenJuShu {
  const { jieQi, ganzhi } = timeInfo;
  const dayGanZhi = ganzhi.day;

  const isYangDun = YANG_DUN_JIE_QI.has(jieQi);
  const dayGan = dayGanZhi.charAt(0);
  const dayZhi = dayGanZhi.charAt(1);

  const ganJuMap = isYangDun ? YANG_GAN_JU_MAP : YIN_GAN_JU_MAP;
  let juShu = ganJuMap[dayGan] || (isYangDun ? 1 : 9);

  juShu = ((juShu + (JIE_QI_ADJUSTMENT[jieQi] || 0) - 1) % 9) + 1;

  const dayGanIndex = tiangan.indexOf(dayGan);
  const dayZhiIndex = dizhi.indexOf(dayZhi);
  const xunShouZhiIndex = (dayZhiIndex - dayGanIndex + 12) % 12;
  const xunShouGanZhi = '甲' + dizhi[xunShouZhiIndex];

  let yuan: string;
  if (['甲子', '甲午'].includes(xunShouGanZhi)) {
    yuan = '上元';
  } else if (['甲寅', '甲申'].includes(xunShouGanZhi)) {
    yuan = '中元';
  } else {
    yuan = '下元';
  }

  return { isYangDun, juShu, yuan };
}

export function getDailyZhiFuZhiShi(dayGanZhi: string): DailyZhiFuZhiShi {
  const dayGan = dayGanZhi.charAt(0);
  const dayZhi = dayGanZhi.charAt(1);

  const zhiFu = GAN_STAR_MAP[dayGan] || '天心';
  const zhiShi = ZHI_DOOR_MAP[dayZhi] || '休门';
  const zhiFuPalace = GAN_PALACE_MAP[dayGan] || 6;

  return { zhiFu, zhiShi, zhiFuPalace };
}

export function arrangeDailyQimenJiuGong(
  isYangDun: boolean,
  juShu: number,
  zhiFu: string,
  zhiShi: string,
  ganzhi: { day: string }
): DailyQimenJiuGongGe[] {
  const jiuGong: DailyQimenJiuGongGe[] = Array.from({ length: 9 }, (_, i) => ({
    gong: i + 1,
    name: qimen.ninePositions[i].name,
    direction: qimen.ninePositions[i].direction,
    element: qimen.ninePositions[i].element,
    tianPan: { star: '', stem: '' },
    diPan: { stem: '' },
    renPan: { door: '' },
    shenPan: { god: '' },
  }));

  // 步骤一：排地盘三奇六仪
  for (let i = 0; i < 9; i++) {
    const palaceNum = isYangDun ? ((juShu + i - 1 + 9) % 9) + 1 : ((juShu - i - 1 + 9) % 9) + 1;
    jiuGong[palaceNum - 1].diPan.stem = SAN_QI_LIU_YI[i];
  }

  // 戊土寄宫
  if (jiuGong[4].diPan.stem) {
    jiuGong[1].diPan.stem = jiuGong[4].diPan.stem;
    jiuGong[4].diPan.stem = '';
  }

  // 步骤二：定值符值使落宫（日家奇门以日干支为准）
  const dayGan = ganzhi.day.charAt(0);
  const dayZhi = ganzhi.day.charAt(1);
  const zhiFuLandingPalace = GAN_PALACE_MAP[dayGan] || 6;
  const zhiShiLandingPalace = ZHI_PALACE_MAP[dayZhi] || 1;

  // 步骤三：排天盘九星与天干
  const zhiFuStarIndex = qimen.palaceStars.indexOf(zhiFu);
  for (let i = 0; i < 9; i++) {
    const palaceIndex = (zhiFuLandingPalace - 1 + (isYangDun ? i : -i) + 9) % 9;
    const starIndex = (zhiFuStarIndex + i + 9) % 9;
    const star = qimen.palaceStars[starIndex];
    jiuGong[palaceIndex].tianPan.star = star;

    let originalStarPalaceIndex = starIndex;
    if (star === '天禽') {
      originalStarPalaceIndex = 1;
    }
    jiuGong[palaceIndex].tianPan.stem = jiuGong[originalStarPalaceIndex].diPan.stem;
  }

  // 步骤四：排神盘八神
  const currentGods = isYangDun ? qimen.yangGods : qimen.yinGods;
  for (let i = 0; i < 8; i++) {
    const palaceIndex = (zhiFuLandingPalace - 1 + (isYangDun ? i : -i) + 9) % 9;
    if (palaceIndex === 4) {
      continue;
    }
    jiuGong[palaceIndex].shenPan.god = currentGods[i];
  }
  jiuGong[zhiFuLandingPalace - 1].shenPan.god = '值符';

  // 步骤五：排人盘八门
  const zhiShiDoorIndex = qimen.palaceDoors.indexOf(zhiShi);
  const zhiShiLuoShuIndex = LUO_SHU_PATH.indexOf(zhiShiLandingPalace);

  for (let i = 0; i < 8; i++) {
    const doorIndex = (zhiShiDoorIndex + i + 8) % 8;
    const luoShuIndex = (zhiShiLuoShuIndex + (isYangDun ? i : -i) + 8) % 8;
    const palaceNum = LUO_SHU_PATH[luoShuIndex];
    jiuGong[palaceNum - 1].renPan.door = qimen.palaceDoors[doorIndex];
  }

  return jiuGong;
}
