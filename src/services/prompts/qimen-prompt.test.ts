import { describe, expect, it } from 'vitest';

import { generateQimenPrompt } from './qimen';

describe('generateQimenPrompt', () => {
  it('应把奇门格局标签写入提示词', async () => {
    const prompt = await generateQimenPrompt(
      '这件事是否适合现在推进？',
      {
        jiuGongGe: [],
        ganzhi: {
          year: '甲申',
          month: '壬申',
          day: '辛酉',
          hour: '甲午',
        },
        isYangDun: false,
        juShu: 8,
        zhiFu: '天英',
        zhiShi: '景门',
        patternTags: ['星反吟', '门伏吟', '门迫（巽四宫惊门）', '击刑（时干戊落震三宫）'],
        patternDetails: [
          { tag: '星反吟', summary: '九星临对冲宫，局势波动较大，易反复。' },
          { tag: '门伏吟', summary: '八门回原位，事项推进迟滞，宜耐心等待。' },
          { tag: '门迫（巽四宫惊门）', summary: '门受宫克，该宫事项易受压制，行动阻力偏大。' },
          { tag: '击刑（时干戊落震三宫）', summary: '时干落击刑位，主压力、掣肘或规章束缚，宜谨慎行事。' },
        ],
        palaceInsights: [
          { gong: 4, name: '巽四宫', level: '风险', summary: '门迫与惊门同宫，推进阻力偏大。' },
          { gong: 9, name: '离九宫', level: '关注', summary: '值符落宫，是当前局的核心观察位。' },
          { gong: 8, name: '艮八宫', level: '有利', summary: '六合在此，可优先争取助力。' },
        ],
        timeInfo: {
          solarTerm: '立秋',
          epoch: '下元',
        },
        specialConditions: {
          isLiuJiaHour: true,
          isLiuGuiHour: false,
          isShiGanRuMu: false,
          isWuBuYuShi: false,
          description: '六甲时辰（甲时），甲遁于六仪之下；',
        },
        timestamp: 1092110400000,
      },
      '公历：2004年8月10日 12时0分\n农历：甲申年 六月廿五 午时\n干支：甲申年 壬申月 辛酉日 甲午时'
    );

    expect(prompt).toContain('格局标签');
    expect(prompt).toContain('星反吟、门伏吟、门迫（巽四宫惊门）、击刑（时干戊落震三宫）');
    expect(prompt).toContain('格局提示');
    expect(prompt).toContain('宫位提示');
    expect(prompt).toContain('巽四宫风险：门迫与惊门同宫');
    expect(prompt).toContain('用神参考');
    expect(prompt).toContain('重点宫位排序');
    expect(prompt).toContain('若数据中已有格局标签（如星伏吟、门反吟、门迫、击刑）');
  });

  it('财运问题应给出生门用神参考', async () => {
    const prompt = await generateQimenPrompt(
      '这笔投资后续收益如何？',
      {
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
            tianPan: { star: '天心', stem: '庚' },
            diPan: { stem: '戊' },
            renPan: { door: '开门' },
            shenPan: { god: '玄武' },
          },
        ],
        ganzhi: {
          year: '甲申',
          month: '壬申',
          day: '辛酉',
          hour: '甲午',
        },
        isYangDun: false,
        juShu: 8,
        zhiFu: '天英',
        zhiShi: '景门',
        patternTags: [],
        patternDetails: [],
        timeInfo: {
          solarTerm: '立秋',
          epoch: '下元',
        },
        timestamp: 1092110400000,
      },
      '公历：2004年8月10日 12时0分\n农历：甲申年 六月廿五 午时\n干支：甲申年 壬申月 辛酉日 甲午时'
    );

    expect(prompt).toContain('财运问事常取生门为主，当前落乾六宫');
    expect(prompt).toContain('交易、项目推进可兼看开门，当前落艮八宫');
  });
});
