import { describe, expect, it } from 'vitest';

import { buildLiuyaoPrompt, buildPrompt, buildQimenPrompt, buildSsgwPrompt } from './prompt-builder';
import type { PromptBuildConfig } from './types';

function createPromptConfig(overrides: Partial<PromptBuildConfig> = {}): PromptBuildConfig {
  return {
    divinationType: 'liuyao',
    question: '这件事结果如何？',
    formattedData: '主卦：乾为天',
    timeInfo: '公历：2026年3月25日 12时0分',
    analysis: {
      types: {
        isQuestion: true,
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
      },
      complexity: {
        complexity: 'medium',
        factors: [],
        requiredDepth: 2,
        timeUrgency: 'medium',
        importance: 'medium',
      },
      emotion: {
        emotion: 'neutral',
        intensity: 1,
        supportNeeded: '保持客观分析',
      },
      userExperience: {
        level: 'beginner',
        familiarity: 1,
        terminologyTolerance: 1,
      },
    },
    ...overrides,
  };
}

describe('prompt-builder', () => {
  const legacySsgwPromptLabel = ['三式', '高级占卜'].join('');

  it('会按配置生成六爻专业分析要求', () => {
    const prompt = buildLiuyaoPrompt(createPromptConfig());

    expect(prompt).toContain('## 六爻专业分析要求');
    expect(prompt).toContain('特殊卦式优先级');
    expect(prompt).toContain('请用简单语言解释世爻、应爻、用神等概念');
  });

  it('会按经验级别生成奇门术语说明', () => {
    const prompt = buildQimenPrompt(
      createPromptConfig({
        divinationType: 'qimen',
        analysis: {
          ...createPromptConfig().analysis,
          userExperience: {
            level: 'advanced',
            familiarity: 3,
            terminologyTolerance: 3,
          },
        },
      })
    );

    expect(prompt).toContain('## 奇门遁甲专业分析要求');
    expect(prompt).toContain('结构标签');
    expect(prompt).toContain('可使用专业术语进行深度战略分析');
  });

  it('塔罗会使用统一的专业分析模板', () => {
    const prompt = buildPrompt(
      createPromptConfig({
        divinationType: 'tarot',
      })
    );

    expect(prompt).toContain('## 塔罗牌专业分析要求');
  });

  it('三山国王灵签不会再误用旧错误模板', () => {
    const prompt = buildSsgwPrompt(
      createPromptConfig({
        divinationType: 'ssgw',
      })
    );

    expect(prompt).toContain('## 三山国王灵签解读要求');
    expect(prompt).toContain('签诗原意');
    expect(prompt).not.toContain(legacySsgwPromptLabel);
    expect(prompt).not.toContain('太乙、奇门、六壬');
  });

  it('不支持的类型只保留基础结构', () => {
    const prompt = buildPrompt(
      createPromptConfig({
        divinationType: 'custom-type',
      })
    );

    expect(prompt).not.toContain('## 六爻专业分析要求');
    expect(prompt).toContain('## 核心答案');
  });
});
