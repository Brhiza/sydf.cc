/**
 * 提示词系统共享类型定义
 */

import type { SupplementaryInfo } from '@/types';

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

