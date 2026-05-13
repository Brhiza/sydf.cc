import { qimen } from '../../../config/divination-data';
import { getDunJiaStem } from './zhi-fu-zhi-shi';

const { diPanPalaces, palaceStars, palaceDoors, yangGods, yinGods, ninePositions } = qimen;

const SAN_QI_LIU_YI = ['戊', '己', '庚', '辛', '壬', '癸', '丁', '丙', '乙'];
const LUO_SHU_PATH = [1, 8, 3, 4, 9, 2, 7, 6];

export interface JiuGongCell {
  gong: number;
  name: string;
  direction: string;
  element: string;
  tianPan: { star: string; stem: string };
  diPan: { stem: string };
  renPan: { door: string };
  shenPan: { god: string };
}

export { getDunJiaStem };
export { getQimenJuShu, type QimenJuShu } from './ju-shu';
export { getZhiFuZhiShi, type ZhiFuZhiShi } from './zhi-fu-zhi-shi';
export type { SpecialHourConditions } from './special-hours';

function arrangeDiPan(jiuGong: JiuGongCell[], isYangDun: boolean, juShu: number): string {
  for (let i = 0; i < 9; i++) {
    const palaceNum = isYangDun ? ((juShu + i - 1 + 9) % 9) + 1 : ((juShu - i - 1 + 9) % 9) + 1;
    jiuGong[palaceNum - 1].diPan.stem = SAN_QI_LIU_YI[i];
  }
  // 戊土居中宫时寄于坤二宫
  if (jiuGong[4].diPan.stem === '戊') {
    jiuGong[4].diPan.stem = '';
    return '戊';
  }
  return '';
}

function findZhiFuLandingPalace(
  jiuGong: JiuGongCell[],
  hourGanForFind: string,
  centerJiGongStem: string
): number {
  for (let i = 0; i < 9; i++) {
    if (jiuGong[i].diPan.stem === hourGanForFind) {
      return i + 1;
    }
  }
  if (centerJiGongStem && hourGanForFind === centerJiGongStem) {
    return 2;
  }
  throw new Error(`找不到时干${hourGanForFind}落宫，请检查地盘排布逻辑`);
}

function arrangeTianPan(
  jiuGong: JiuGongCell[],
  isYangDun: boolean,
  zhiFu: string,
  zhiFuLandingPalace: number,
  centerJiGongStem: string
): void {
  const zhiFuStarIndex = palaceStars.indexOf(zhiFu);
  for (let i = 0; i < 9; i++) {
    const palaceIndex = (zhiFuLandingPalace - 1 + (isYangDun ? i : -i) + 9) % 9;
    const starIndex = (zhiFuStarIndex + i + 9) % 9;
    const star = palaceStars[starIndex];
    jiuGong[palaceIndex].tianPan.star = star;

    if (star === '天禽' && centerJiGongStem) {
      jiuGong[palaceIndex].tianPan.stem = centerJiGongStem;
      continue;
    }
    const originalStarPalaceIndex = star === '天禽' && !jiuGong[4].diPan.stem ? 1 : starIndex;
    jiuGong[palaceIndex].tianPan.stem = jiuGong[originalStarPalaceIndex].diPan.stem;
  }
}

function arrangeShenPan(
  jiuGong: JiuGongCell[],
  isYangDun: boolean,
  zhiFuLandingPalace: number
): void {
  const currentGods = isYangDun ? yangGods : yinGods;
  const shenPanPalaces: number[] = [];
  for (let offset = 0; shenPanPalaces.length < 8; offset++) {
    const palaceNum = ((zhiFuLandingPalace - 1 + (isYangDun ? offset : -offset) + 18) % 9) + 1;
    if (palaceNum === 5) continue;
    shenPanPalaces.push(palaceNum);
  }
  currentGods.forEach((god, index) => {
    jiuGong[shenPanPalaces[index] - 1].shenPan.god = god;
  });
}

function arrangeRenPan(
  jiuGong: JiuGongCell[],
  isYangDun: boolean,
  zhiShi: string,
  zhiShiLandingPalace: number
): void {
  const zhiShiDoorIndex = palaceDoors.indexOf(zhiShi);
  const zhiShiLuoShuIndex = LUO_SHU_PATH.indexOf(zhiShiLandingPalace);
  for (let i = 0; i < 8; i++) {
    const doorIndex = (zhiShiDoorIndex + i + 8) % 8;
    const luoShuIndex = (zhiShiLuoShuIndex + (isYangDun ? i : -i) + 8) % 8;
    const palaceNum = LUO_SHU_PATH[luoShuIndex];
    jiuGong[palaceNum - 1].renPan.door = palaceDoors[doorIndex];
  }
}

export function arrangeJiuGongGe(
  isYangDun: boolean,
  juShu: number,
  zhiFu: string,
  zhiShi: string,
  ganzhi: { hour: string }
): JiuGongCell[] {
  const jiuGong: JiuGongCell[] = Array.from({ length: 9 }, (_, i) => ({
    gong: i + 1,
    name: ninePositions[i].name,
    direction: ninePositions[i].direction,
    element: ninePositions[i].element,
    tianPan: { star: '', stem: '' },
    diPan: { stem: '' },
    renPan: { door: '' },
    shenPan: { god: '' },
  }));

  const centerJiGongStem = arrangeDiPan(jiuGong, isYangDun, juShu);

  const hourZhi = ganzhi.hour.charAt(1);
  const hourGanForFind = getDunJiaStem(ganzhi.hour);
  const zhiFuLandingPalace = findZhiFuLandingPalace(jiuGong, hourGanForFind, centerJiGongStem);
  const zhiShiLandingPalace = diPanPalaces[hourZhi as keyof typeof diPanPalaces];

  arrangeTianPan(jiuGong, isYangDun, zhiFu, zhiFuLandingPalace, centerJiGongStem);
  arrangeShenPan(jiuGong, isYangDun, zhiFuLandingPalace);
  arrangeRenPan(jiuGong, isYangDun, zhiShi, zhiShiLandingPalace);

  return jiuGong;
}
