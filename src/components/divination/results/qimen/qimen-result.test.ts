import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import {
  arrangeQimenGongs,
  createQimenInfoItems,
  getQimenGongClass,
  isCenterGong,
} from './qimen-result';

const createGong = (gong: number) => ({
  gong,
  name: gong === 5 ? '中五宫' : `${gong}宫`,
  direction: `方向${gong}`,
  element: '木',
  tianPan: { star: `星${gong}`, stem: `天${gong}` },
  diPan: { stem: `地${gong}` },
  renPan: { door: `门${gong}` },
  shenPan: { god: `神${gong}` },
});

describe('qimen-result', () => {
  it('会按宫位号而不是数组顺序排列九宫格', () => {
    const shuffledGongs = [9, 1, 5, 3, 7, 4, 6, 2, 8].map(createGong);

    expect(arrangeQimenGongs(shuffledGongs).map((gong) => gong.gong)).toEqual([
      4, 9, 2,
      3, 5, 7,
      8, 1, 6,
    ]);
  });

  it('会返回对应的九宫位置类名', () => {
    expect(getQimenGongClass(0)).toBe('top-left');
    expect(getQimenGongClass(4)).toBe('middle-center');
    expect(getQimenGongClass(8)).toBe('bottom-right');
    expect(getQimenGongClass(9)).toBe('');
  });

  it('会正确识别中宫', () => {
    expect(isCenterGong(createGong(5))).toBe(true);
    expect(isCenterGong(createGong(3))).toBe(false);
    expect(isCenterGong({ gong: 1, name: '中五宫' })).toBe(true);
  });

  it('会生成基本信息列表', () => {
    const items = createQimenInfoItems({
      jiuGongGe: [createGong(6)],
      ganzhi: { year: '甲子', month: '乙丑', day: '丙寅', hour: '丁卯' },
      isYangDun: true,
      juShu: 3,
      zhiFu: '天蓬',
      zhiShi: '休门',
      patternTags: ['星伏吟', '门反吟'],
      patternDetails: [
        { tag: '星伏吟', summary: '九星回原位，事情多原地盘旋、推进偏慢。' },
        { tag: '门反吟', summary: '八门落反吟位，节奏多突变，计划易临时调整。' },
      ],
      palaceInsights: [
        { gong: 6, name: '乾六宫', level: '有利', summary: '开门同宫，可作为推进方位。' },
      ],
      timeInfo: {
        year: '2026',
        month: '03',
        day: '24',
        hour: '20',
        minute: '08',
        solarTerm: '春分',
        epoch: '上元',
      },
      specialConditions: {
        isLiuJiaHour: false,
        isLiuGuiHour: false,
        isShiGanRuMu: false,
        isWuBuYuShi: true,
        description: '五不遇时',
      },
      timestamp: 0,
    });

    expect(items.map((item) => item.label)).toEqual([
      '起卦时间',
      '干支信息',
      '遁甲局数',
      '值符值使',
      '特殊时辰',
      '格局标签',
      '问事焦点',
    ]);
    expect(items[2]?.value).toBe('阳遁3局');
    expect(items[4]?.value).toBe('五不遇时');
    expect(items[5]?.value).toBe('星伏吟、门反吟');
    expect(items[6]?.value).toContain('6宫');
  });

  it('奇门结果页应复用统一的结果外层包裹，保持头部留白一致', () => {
    const source = readFileSync(new URL('../QimenResult.vue', import.meta.url), 'utf8');

    expect(source).toContain('<BaseResultLayout');
  });

  it('当 timeInfo 缺少年月日时分时，会回退使用 timestamp 显示起卦时间', () => {
    const timestamp = new Date(2026, 2, 24, 20, 8, 0).getTime();

    const items = createQimenInfoItems({
      jiuGongGe: [],
      ganzhi: { year: '甲子', month: '乙丑', day: '丙寅', hour: '丁卯' },
      isYangDun: true,
      juShu: 3,
      zhiFu: '天蓬',
      zhiShi: '休门',
      timeInfo: { solarTerm: '春分', epoch: '上元' },
      timestamp,
    });

    expect(items[0]?.label).toBe('起卦时间');
    expect(items[0]?.value).toMatch(/^\d{4}年\d{2}月\d{2}日 \d{2}时\d{2}分$/);
    expect(items[0]?.value).toContain('2026年03月24日 20时08分');
  });
});
