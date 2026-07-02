import { describe, expect, it } from 'vitest';

import {
  createQimenPriorityPalaces,
  createQimenQuestionHints,
  createQimenYongShenHint,
} from './qimen-guidance';
import type { QimenData } from '@/types/divination';
import type { QuestionType } from '@/services/prompts/shared/types';

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

function questionTypes(overrides: Partial<QuestionType>): QuestionType {
  return {
    isQuestion: false,
    isChoice: false,
    isTime: false,
    isAction: false,
    isFeasibility: false,
    isRelationship: false,
    isCareer: false,
    isFinance: false,
    isHealth: false,
    isStudy: false,
    isReason: false,
    isPrediction: false,
    isAdvice: false,
    isComparison: false,
    isQuantity: false,
    isLocation: false,
    isPerson: false,
    ...overrides,
  };
}

describe('createQimenQuestionHints', () => {
  it('用神参考应复用共享宫位定位逻辑', () => {
    const hint = createQimenYongShenHint(questionTypes({ isFinance: true }), sampleData);

    expect(hint).toContain('财运问事常取生门为主，当前落乾六宫');
    expect(hint).toContain('交易、项目推进可兼看开门，当前落艮八宫');
  });

  it('感情用神参考应结合性别补充信息', () => {
    const hint = createQimenYongShenHint(
      questionTypes({ isRelationship: true }),
      sampleData,
      { gender: '女' }
    );

    expect(hint).toContain('感情问事常参六合，当前落艮八宫');
    expect(hint).toContain('乙奇可参，天盘落艮八宫');
    expect(hint).toContain('女测感情可重点看庚金，天盘落坤二宫，地盘落乾六宫');
  });

  it('财运问题应返回生门与开门参考', () => {
    const hints = createQimenQuestionHints('这笔投资收益如何？', sampleData);

    expect(hints).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: '财运参考',
          value: expect.stringContaining('首看生门，当前落乾六宫'),
          gongs: [6, 8],
        }),
      ])
    );
  });

  it('感情问题应结合六合与乙庚给出参考', () => {
    const hints = createQimenQuestionHints('我和对方的感情接下来会怎样？', sampleData, {
      gender: '女',
    });

    const relationHint = hints.find((item) => item.label === '感情参考');
    expect(relationHint?.value).toContain('可参六合，当前落艮八宫');
    expect(relationHint?.value).toContain('乙奇可参');
    expect(relationHint?.value).toContain('女测可重点看庚金');
    expect(relationHint?.gongs).toContain(8);
    expect(relationHint?.gongs).toContain(2);
  });

  it('应按问事与宫位提示综合排序重点宫位', () => {
    const palaces = createQimenPriorityPalaces('这笔投资收益如何？', sampleData);

    expect(palaces[0]).toMatchObject({
      gong: 6,
      name: '乾六宫',
    });
    expect(palaces[1]).toMatchObject({
      gong: 8,
      name: '艮八宫',
    });
    expect(palaces[2]).toMatchObject({
      gong: 2,
      name: '坤二宫',
    });
    expect(palaces[2]?.reasons).toEqual(
      expect.arrayContaining(['风险:死门与天芮同宫，宜防消耗。'])
    );
  });
});
