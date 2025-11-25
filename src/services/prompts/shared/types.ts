/**
 * 提示词系统共享类型定义
 */

import type { SupplementaryInfo } from '@/types';

// ============================================================================
// 问题分析相关类型
// ============================================================================

/**
 * 问题类型检测结果
 */
export interface QuestionType {
  /** 判断类问题 */
  isQuestion: boolean;
  /** 选择类问题 */
  isChoice: boolean;
  /** 时间类问题 */
  isTime: boolean;
  /** 行动类问题 */
  isAction: boolean;
  /** 可行性类问题 */
  isFeasibility: boolean;
  /** 感情类问题 */
  isRelationship: boolean;
  /** 事业类问题 */
  isCareer: boolean;
  /** 财运类问题 */
  isFinance: boolean;
  /** 健康类问题 */
  isHealth: boolean;
  /** 学业类问题 */
  isStudy: boolean;
  /** 原因类问题 */
  isReason: boolean;
  /** 预测类问题 */
  isPrediction: boolean;
  /** 建议类问题 */
  isAdvice: boolean;
  /** 比较类问题 */
  isComparison: boolean;
  /** 数量类问题 */
  isQuantity: boolean;
  /** 地点类问题 */
  isLocation: boolean;
  /** 人物类问题 */
  isPerson: boolean;
}

/**
 * 复杂度评估结果
 */
export interface ComplexityLevel {
  /** 复杂度级别 */
  complexity: 'simple' | 'medium' | 'complex';
  /** 影响因素 */
  factors: string[];
  /** 所需分析深度 */
  requiredDepth: number;
  /** 时间紧急度 */
  timeUrgency: 'low' | 'medium' | 'high';
  /** 重要程度 */
  importance: 'low' | 'medium' | 'high';
}

/**
 * 情感状态检测结果
 */
export interface EmotionState {
  /** 主要情感 */
  emotion: 'anxious' | 'hopeful' | 'confused' | 'determined' | 'neutral';
  /** 情感强度 */
  intensity: number;
  /** 支持需求 */
  supportNeeded: string;
}

/**
 * 用户经验水平
 */
export interface UserExperienceLevel {
  /** 经验级别 */
  level: 'beginner' | 'intermediate' | 'advanced';
  /** 熟悉度 */
  familiarity: number;
  /** 术语容忍度 */
  terminologyTolerance: number;
}

/**
 * 问题分析完整结果
 */
export interface QuestionAnalysis {
  /** 问题类型 */
  types: QuestionType;
  /** 复杂度评估 */
  complexity: ComplexityLevel;
  /** 情感状态 */
  emotion: EmotionState;
  /** 用户经验 */
  userExperience: UserExperienceLevel;
}

// ============================================================================
// 提示词构建相关类型
// ============================================================================

/**
 * 提示词构建配置
 */
export interface PromptBuildConfig {
  /** 占卜类型 */
  divinationType: string;
  /** 用户问题 */
  question: string;
  /** 格式化后的数据 */
  formattedData: string;
  /** 时间信息 */
  timeInfo: string;
  /** 问题分析结果 */
  analysis: QuestionAnalysis;
  /** 补充信息 */
  supplementaryInfo?: SupplementaryInfo;
}

/**
 * 提示词模板变量
 */
export interface PromptVariables {
  /** 时间信息 */
  timeInfo: string;
  /** 用户问题 */
  question: string;
  /** 数据信息 */
  dataInfo: string;
  /** 问题分析 */
  questionAnalysis: string;
  /** 问题回答 */
  questionAnswer: string;
  /** 详细分析 */
  analysis: string;
  /** 行动建议 */
  action: string;
  /** 总结 */
  summary: string;
  /** 补充信息 */
  supplementaryInfo?: string;
}

// ============================================================================
// 干支增强相关类型
// ============================================================================

/**
 * 干支增强配置
 */
export interface GanzhiEnhancerConfig {
  /** 基础提示词 */
  basePrompt: string;
  /** 时间信息 */
  timeInfo: string;
  /** 是否启用增强 */
  enabled?: boolean;
}

// ============================================================================
// 工具函数类型
// ============================================================================

/**
 * 格式化补充信息
 */
export function formatSupplementaryInfo(supplementaryInfo?: SupplementaryInfo): string {
  if (!supplementaryInfo || Object.keys(supplementaryInfo).length === 0) {
    return '';
  }

  const { gender, birthYear, interpretationStyle, outputLength, dayPillar } = supplementaryInfo;
  const infoParts: string[] = [];

  if (gender) {
    infoParts.push(`性别: ${gender}`);
  }
  if (birthYear) {
    infoParts.push(`出生年份: ${birthYear}`);
  }
  if (dayPillar) {
    infoParts.push(`日柱: ${dayPillar.heavenlyStem}${dayPillar.earthlyBranch}`);
  }
  if (interpretationStyle) {
    infoParts.push(`解读风格: ${interpretationStyle}`);
  }
  if (outputLength) {
    infoParts.push(`输出长度: ${outputLength}`);
  }

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
    complex: '全面深入的分析，涵盖所有相关维度和深层原因'
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
    neutral: '请使用客观、专业的语气，提供平衡的分析'
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
    advanced: '请使用适当的专业术语，提供深度专业分析'
  };
  
  return guidance[userExperience.level];
}
