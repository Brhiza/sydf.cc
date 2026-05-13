import type { PromptBuildConfig } from './types';
import {
  buildActionSection,
  buildBasePromptStructure,
  buildQuestionAnswerSection,
} from './prompt-builder/sections';
import {
  buildConfiguredPrompt,
  resolveSpecificPromptKey,
} from './prompt-builder/specific-templates';
import { buildFollowUpPrompt } from './prompt-builder/follow-up';

export { buildActionSection, buildBasePromptStructure, buildQuestionAnswerSection };
export { buildFollowUpPrompt };

const GANZHI_TYPES = ['liuyao', 'meihua', 'qimen', 'daily'];

function addGanzhiGuidance(prompt: string, divinationType: string, timeInfo?: string): string {
  if (GANZHI_TYPES.includes(divinationType) && timeInfo) {
    return `${prompt}\n\n请基于上述准确的农历干支信息进行占卜分析。`;
  }
  return prompt;
}

export function buildLiuyaoPrompt(config: PromptBuildConfig): string {
  return buildConfiguredPrompt(config, 'liuyao');
}

export function buildMeihuaPrompt(config: PromptBuildConfig): string {
  return buildConfiguredPrompt(config, 'meihua');
}

export function buildQimenPrompt(config: PromptBuildConfig): string {
  return buildConfiguredPrompt(config, 'qimen');
}

export function buildTarotPrompt(config: PromptBuildConfig): string {
  return buildConfiguredPrompt(config, 'tarot');
}

export function buildSsgwPrompt(config: PromptBuildConfig): string {
  return buildConfiguredPrompt(config, 'ssgw');
}

export function buildPrompt(config: PromptBuildConfig): string {
  const specificKey = resolveSpecificPromptKey(config.divinationType);
  const prompt = specificKey
    ? buildConfiguredPrompt(config, specificKey)
    : buildBasePromptStructure(config);
  return addGanzhiGuidance(prompt, config.divinationType, config.timeInfo);
}
