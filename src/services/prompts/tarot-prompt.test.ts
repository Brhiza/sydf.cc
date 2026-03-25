import { describe, expect, it } from 'vitest';

import { generateTarotPrompt } from './tarot';

describe('generateTarotPrompt', () => {
  it('应保留塔罗牌面速解和核心建议要求', () => {
    const prompt = generateTarotPrompt(
      '这段关系会如何发展？',
      {
        cards: [
          {
            id: 1,
            name: '恋人',
            position: '现状',
            reversed: false,
            keywords: ['选择', '连接'],
          },
          {
            id: 2,
            name: '圣杯二',
            position: '发展',
            reversed: true,
            keywords: ['契合', '沟通'],
          },
        ],
        spreadType: 'love',
        spreadName: '恋爱牌阵',
        timestamp: 1773936000000,
      },
      '公历：2026年3月20日 0时0分\n农历：丙午年 二月初二 子时\n干支：丙午年 辛卯月 癸巳日 壬子时'
    );

    expect(prompt).toContain('牌面速解');
    expect(prompt).toContain('**现状**: 恋人');
    expect(prompt).toContain('**发展**: 圣杯二  (逆位)');
    expect(prompt).toContain('核心建议');
  });
});
