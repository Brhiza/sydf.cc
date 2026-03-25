import { describe, expect, it } from 'vitest';
import { formatGenericPromptData, generateGenericPromptSync } from './prompt-generator';

describe('prompt-generator', () => {
  it('会提取通用卦象字段生成摘要', () => {
    expect(
      formatGenericPromptData({
        originalName: '乾为天',
        changedName: '坤为地',
        interName: '风山渐',
        ganzhi: {
          year: '甲子',
          month: '乙丑',
          day: '丙寅',
          hour: '丁卯',
        },
      } as never)
    ).toContain('主卦：乾为天');
  });

  it('未知结构会回退为 JSON', () => {
    expect(
      formatGenericPromptData({
        foo: 'bar',
      } as never)
    ).toContain('"foo": "bar"');
  });

  it('通用生成器会产出基础提示词结构', () => {
    const prompt = generateGenericPromptSync({
      divinationType: 'liuyao',
      question: '这件事结果如何？',
      timeInfo: '公历：2026年3月25日 12时0分',
      data: {
        originalName: '乾为天',
      } as never,
    });

    expect(prompt).toContain('## 核心答案');
    expect(prompt).toContain('主卦：乾为天');
  });
});
