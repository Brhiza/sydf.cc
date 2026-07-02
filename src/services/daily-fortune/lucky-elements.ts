import type { BaseGanZhi, DailyQimenJiuGongGe } from '../../types/divination.ts';
import {
  COLOR_MAP,
  DOOR_AUSPICIOUS,
  STAR_AUSPICIOUS,
  TIANGAN_WUXING,
  ZHI_TIME_MAP,
} from './constants.ts';

export interface LuckyElements {
  numbers: number[];
  colors: string[];
  directions: string[];
  time: string;
}

const DEFAULT_LUCKY_NUMBERS = [1, 6, 8];
const DEFAULT_LUCKY_DIRECTIONS = ['北', '西北'];

export function generateTraditionalLuckyElements(
  jiuGong: DailyQimenJiuGongGe[],
  ganzhi: BaseGanZhi
): LuckyElements {
  const auspiciousPalaces = jiuGong.filter((gong) => {
    const starNature = STAR_AUSPICIOUS[gong.tianPan.star] || '平';
    const doorNature = DOOR_AUSPICIOUS[gong.renPan.door] || '平';
    return starNature === '吉' || doorNature === '吉';
  });

  const numbers =
    auspiciousPalaces.length > 0
      ? auspiciousPalaces.slice(0, 3).map((g) => g.gong)
      : DEFAULT_LUCKY_NUMBERS;

  const dayGan = ganzhi.day.charAt(0);
  const dayGanWuxing = TIANGAN_WUXING[dayGan] || '木';
  const colors = (COLOR_MAP[dayGanWuxing] || COLOR_MAP['木']).slice(0, 3);

  const directions =
    auspiciousPalaces.length > 0
      ? auspiciousPalaces.slice(0, 2).map((g) => g.direction)
      : DEFAULT_LUCKY_DIRECTIONS;

  const dayZhi = ganzhi.day.charAt(1);
  const time = ZHI_TIME_MAP[dayZhi] || '辰时(07:00-09:00)';

  return { numbers, colors, directions, time };
}
