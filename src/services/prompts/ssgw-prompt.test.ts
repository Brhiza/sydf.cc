import { describe, expect, it } from 'vitest';

import { generateSsgwPrompt } from './ssgw';

describe('generateSsgwPrompt', () => {
  it('应保留灵签信息和专业分析要求', () => {
    const prompt = generateSsgwPrompt(
      '这件事是否适合继续推进？',
      {
        number: 18,
        title: '刘备借荆州',
        poem: '前路迢迢莫强求，且看云开月自明。',
        details: {
          story: '刘备借荆州后多方周旋，终需审时度势。',
          interpretation: '宜守正待时，不可躁进。',
        },
        timestamp: Date.now(),
        ganzhi: {
          year: '丙午',
          month: '辛卯',
          day: '癸巳',
          hour: '壬子',
        },
      },
      '公历：2026年3月20日 0时0分\n农历：丙午年 二月初二 子时\n干支：丙午年 辛卯月 癸巳日 壬子时'
    );

    expect(prompt).toContain('灵签信息');
    expect(prompt).toContain('第 18 签');
    expect(prompt).toContain('签诗解读');
    expect(prompt).toContain('问题关联');
  });
});
