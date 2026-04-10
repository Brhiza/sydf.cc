import { describe, expect, it } from 'vitest';

import { generateSsgwPrompt } from './ssgw';

describe('generateSsgwPrompt', () => {
  const legacySsgwPromptLabel = ['三式', '高级占卜'].join('');

  it('应保留灵签信息，并避免误用旧错误话术', () => {
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
    expect(prompt).toContain('三山国王灵签解读要求');
    expect(prompt).toContain('三山国王灵签补充解读要求');
    expect(prompt).not.toContain(legacySsgwPromptLabel);
    expect(prompt).not.toContain('太乙、奇门、六壬');
  });
});
