import { describe, expect, it } from 'vitest';
import {
  buildSupplementaryInfoLines,
  formatSupplementaryInfo,
  getChineseZodiac,
  getComplexityDescription,
  getEmotionToneGuidance,
  getExperienceGuidance,
} from './prompt-guidance';

describe('prompt-guidance', () => {
  it('会按不同格式生成补充信息行', () => {
    expect(getChineseZodiac(1990)).toBe('马');

    expect(
      buildSupplementaryInfoLines(
        {
          gender: '女',
          birthYear: 1995,
          interpretationStyle: '专业',
          outputLength: '详细',
        },
        {
          includeAgeAndZodiac: true,
          includeDayPillar: false,
          delimiter: '：',
        }
      )
    ).toContain('出生年份：1995年（31岁，猪）');
  });

  it('会格式化补充信息', () => {
    expect(
      formatSupplementaryInfo({
        gender: '女',
        birthYear: 1995,
        interpretationStyle: '专业',
        outputLength: '详细',
        dayPillar: {
          heavenlyStem: '甲',
          earthlyBranch: '子',
        },
      })
    ).toContain('性别: 女');
  });

  it('会返回复杂度、情感和术语指导文本', () => {
    expect(
      getComplexityDescription({
        complexity: 'complex',
        factors: [],
        requiredDepth: 3,
        timeUrgency: 'high',
        importance: 'high',
      })
    ).toContain('全面深入');

    expect(
      getEmotionToneGuidance({
        emotion: 'anxious',
        intensity: 2,
        supportNeeded: '安抚',
      })
    ).toContain('温和');

    expect(
      getExperienceGuidance({
        level: 'beginner',
        familiarity: 1,
        terminologyTolerance: 1,
      })
    ).toContain('避免使用专业术语');
  });
});
