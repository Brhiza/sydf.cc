import { describe, expect, it } from 'vitest';

import { createQimenPriorityPalaces } from './qimen-guidance';
import type { QimenData } from '@/types/divination';

const sampleData: QimenData = {
  jiuGongGe: [
    {
      gong: 6,
      name: '乾六宫',
      direction: '西北',
      element: '金',
      tianPan: { star: '天任', stem: '戊' },
      diPan: { stem: '庚' },
      renPan: { door: '生门' },
      shenPan: { god: '九天' },
    },
    {
      gong: 8,
      name: '艮八宫',
      direction: '东北',
      element: '土',
      tianPan: { star: '天心', stem: '乙' },
      diPan: { stem: '戊' },
      renPan: { door: '开门' },
      shenPan: { god: '六合' },
    },
    {
      gong: 2,
      name: '坤二宫',
      direction: '西南',
      element: '土',
      tianPan: { star: '天芮', stem: '庚' },
      diPan: { stem: '辛' },
      renPan: { door: '死门' },
      shenPan: { god: '太阴' },
    },
  ],
  ganzhi: { year: '甲申', month: '壬申', day: '辛酉', hour: '甲午' },
  isYangDun: false,
  juShu: 8,
  zhiFu: '天英',
  zhiShi: '景门',
  patternTags: ['门迫（坤二宫死门）'],
  patternDetails: [
    { tag: '门迫（坤二宫死门）', summary: '门受宫克，该宫事项易受压制，行动阻力偏大。' },
  ],
  palaceInsights: [
    { gong: 6, name: '乾六宫', level: '有利', summary: '生门可用。' },
    { gong: 8, name: '艮八宫', level: '关注', summary: '六合在此，可作核心观察位。' },
    { gong: 2, name: '坤二宫', level: '风险', summary: '死门与天芮同宫，宜防消耗。' },
  ],
  timeInfo: { solarTerm: '立秋', epoch: '下元' },
  timestamp: 1092110400000,
};

describe('createQimenPriorityPalaces', () => {
  it('应只按盘面洞察和格局标签排序重点宫位', () => {
    const palaces = createQimenPriorityPalaces(sampleData);

    expect(palaces[0]).toMatchObject({
      gong: 2,
      name: '坤二宫',
    });
    expect(palaces[1]).toMatchObject({
      gong: 8,
      name: '艮八宫',
    });
    expect(palaces[2]).toMatchObject({
      gong: 6,
      name: '乾六宫',
    });
    expect(palaces[0]?.reasons).toEqual(
      expect.arrayContaining(['风险:死门与天芮同宫，宜防消耗。', '门迫（坤二宫死门）'])
    );
  });
});
