import type { SupplementaryInfo } from '@/types';
import type { ComplexityLevel, EmotionState, UserExperienceLevel } from './types';

const CHINESE_ZODIACS = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];

interface SupplementaryInfoLineOptions {
  includeAgeAndZodiac?: boolean;
  includeDayPillar?: boolean;
  delimiter?: string;
}

export function getChineseZodiac(birthYear: number): string {
  const index = (birthYear - 4) % 12;
  return CHINESE_ZODIACS[index];
}

export function buildSupplementaryInfoLines(
  supplementaryInfo?: SupplementaryInfo,
  options: SupplementaryInfoLineOptions = {}
): string[] {
  if (!supplementaryInfo || Object.keys(supplementaryInfo).length === 0) {
    return [];
  }

  const { includeAgeAndZodiac = false, includeDayPillar = true, delimiter = ': ' } = options;
  const { gender, birthYear, interpretationStyle, outputLength, dayPillar } = supplementaryInfo;
  const infoParts: string[] = [];

  if (gender) {
    infoParts.push(`性别${delimiter}${gender}`);
  }

  if (birthYear) {
    if (includeAgeAndZodiac) {
      const age = new Date().getFullYear() - birthYear;
      const zodiac = getChineseZodiac(birthYear);
      infoParts.push(`出生年份${delimiter}${birthYear}年（${age}岁，${zodiac}）`);
    } else {
      infoParts.push(`出生年份${delimiter}${birthYear}`);
    }
  }

  if (includeDayPillar && dayPillar) {
    infoParts.push(`日柱${delimiter}${dayPillar.heavenlyStem}${dayPillar.earthlyBranch}`);
  }

  if (interpretationStyle) {
    infoParts.push(`解读风格${delimiter}${interpretationStyle}`);
  }

  if (outputLength) {
    infoParts.push(`输出长度${delimiter}${outputLength}`);
  }

  return infoParts;
}

/**
 * 格式化补充信息
 */
export function formatSupplementaryInfo(supplementaryInfo?: SupplementaryInfo): string {
  const infoParts = buildSupplementaryInfoLines(supplementaryInfo);

  if (infoParts.length > 0) {
    return `**补充信息**：${infoParts.join('，')}`;
  }

  return '';
}

/**
 * 获取复杂度描述
 */
export function getComplexityDescription(complexity: ComplexityLevel): string {
  const descriptions = {
    simple: '简单明了的分析，重点关注核心要点',
    medium: '适度的深度分析，包含多个维度的考量',
    complex: '全面深入的分析，涵盖所有相关维度和深层原因',
  };

  return descriptions[complexity.complexity];
}

/**
 * 获取情感语气指导
 */
export function getEmotionToneGuidance(emotion: EmotionState): string {
  const toneGuidance = {
    anxious: '请使用温和、安抚的语气，给予用户安全感和信心',
    hopeful: '请使用积极、鼓励的语气，支持用户的期望和目标',
    confused: '请使用清晰、耐心的语气，帮助用户理清思路和方向',
    determined: '请使用坚定、有力的语气，支持用户的决心和行动',
    neutral: '请使用客观、专业的语气，提供平衡的分析',
  };

  return toneGuidance[emotion.emotion];
}

/**
 * 获取用户经验指导
 */
export function getExperienceGuidance(userExperience: UserExperienceLevel): string {
  const guidance = {
    beginner: '请避免使用专业术语，或在使用时提供简单易懂的解释',
    intermediate: '请适当使用专业术语，并在必要时提供解释',
    advanced: '请使用适当的专业术语，提供深度专业分析',
  };

  return guidance[userExperience.level];
}
