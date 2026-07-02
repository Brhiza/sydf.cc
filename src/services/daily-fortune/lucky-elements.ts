import type { BaseGanZhi, DailyQimenJiuGongGe, QimenData } from '../../types/divination.ts';
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

type QimenDirections = NonNullable<QimenData['directions']>;

function takeUniqueDirections(values: string[], limit: number): string[] {
  const result: string[] = [];

  values.forEach((value) => {
    if (value && !result.includes(value) && result.length < limit) {
      result.push(value);
    }
  });

  return result;
}

function resolveLuckyDirections(
  auspiciousPalaces: DailyQimenJiuGongGe[],
  directions?: QimenDirections
): string[] {
  const coreDirections = takeUniqueDirections(
    directions?.goodDirections.map((item) => item.direction) || [],
    2
  );

  if (coreDirections.length >= 2) {
    return coreDirections;
  }

  const palaceDirections = auspiciousPalaces.slice(0, 2).map((gong) => gong.direction);
  const mergedDirections = takeUniqueDirections([...coreDirections, ...palaceDirections], 2);

  return mergedDirections.length > 0 ? mergedDirections : DEFAULT_LUCKY_DIRECTIONS;
}

export function generateTraditionalLuckyElements(
  jiuGong: DailyQimenJiuGongGe[],
  ganzhi: BaseGanZhi,
  directions?: QimenDirections
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

  const luckyDirections = resolveLuckyDirections(auspiciousPalaces, directions);

  const dayZhi = ganzhi.day.charAt(1);
  const time = ZHI_TIME_MAP[dayZhi] || '辰时(07:00-09:00)';

  return { numbers, colors, directions: luckyDirections, time };
}
