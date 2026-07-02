import { describe, expect, it } from 'vitest';

import type { BaseGanZhi, DailyQimenJiuGongGe } from '@/types/divination';
import { generateTraditionalLuckyElements } from './lucky-elements';

const baseGanZhi: BaseGanZhi = {
  year: '甲子',
  month: '乙丑',
  day: '丙寅',
  hour: '丁卯',
};

function createNeutralPalace(gong: number, direction: string): DailyQimenJiuGongGe {
  return {
    gong,
    name: `${gong}宫`,
    direction,
    element: '土',
    tianPan: { star: '天英', stem: '戊' },
    diPan: { stem: '己' },
    renPan: { door: '杜门' },
    shenPan: { god: '' },
  };
}

describe('今日运势幸运元素', () => {
  it('没有可用吉宫时也应给出默认幸运方位', () => {
    const jiuGong = [
      createNeutralPalace(1, '北'),
      createNeutralPalace(2, '西南'),
      createNeutralPalace(3, '东'),
    ];

    const lucky = generateTraditionalLuckyElements(jiuGong, baseGanZhi);

    expect(lucky.numbers).toEqual([1, 6, 8]);
    expect(lucky.directions).toEqual(['北', '西北']);
  });
});
