import type { PromptBuildConfig, QuestionAnalysis, QuestionType } from '../types';
import {
  formatSupplementaryInfo,
  getComplexityDescription,
  getEmotionToneGuidance,
  getExperienceGuidance,
} from '../prompt-guidance';
import { generateQuestionAnalysisText } from '../question-analyzer';

export function buildQuestionAnswerSection(
  question: string,
  types: QuestionType,
  analysis: QuestionAnalysis
): string {
  if (types.isQuestion) {
    const emotionalSupport = getEmotionToneGuidance(analysis.emotion);
    return `- **问题回答**：

**核心答案**：针对"${question}"，请直接给出最核心、最精准的答案（是/否、能/不能、可以/不可以），${emotionalSupport}。

**简要依据**：用1-2句话说明判断依据。`;
  }

  return `- **问题回答**：

**核心答案**：针对"${question}"，请直接给出最核心的答案。

**简要依据**：用1-2句话说明判断依据。`;
}

export function buildActionSection(
  types: QuestionType,
  analysis: QuestionAnalysis,
  affirmativeAction: string,
  negativeAction: string,
  defaultAction: string
): string {
  const emotionalGuidance = getEmotionToneGuidance(analysis.emotion);
  const complexityGuidance = getComplexityDescription(analysis.complexity);
  const experienceGuidance = getExperienceGuidance(analysis.userExperience);

  if (types.isQuestion) {
    return `- **如果答案为肯定**：${affirmativeAction}
- **如果答案为否定**：${negativeAction}
- **最佳策略**：${defaultAction}

**个性化指导**：
- ${emotionalGuidance}
- ${complexityGuidance}
- ${experienceGuidance}`;
  }

  return `- **最佳策略**：${defaultAction}

**个性化指导**：
- ${emotionalGuidance}
- ${complexityGuidance}
- ${experienceGuidance}`;
}

export function buildBasePromptStructure(config: PromptBuildConfig): string {
  const { divinationType, question, formattedData, timeInfo, analysis, supplementaryInfo } = config;

  const questionAnalysisText = generateQuestionAnalysisText(analysis.types);
  const questionAnswer = buildQuestionAnswerSection(question, analysis.types, analysis);
  const action = buildActionSection(
    analysis.types,
    analysis,
    '具体的行动步骤和注意事项',
    '替代方案和建议',
    '根据占卜分析，应该采取什么策略？'
  );
  const supplementaryInfoText = formatSupplementaryInfo(supplementaryInfo);

  return `**时间信息**：
${timeInfo || '时间信息未知'}
${supplementaryInfoText}

**数据信息**：
${formattedData}

**用户问题**：
"${question}"

${questionAnalysisText ? `\n**问题分析**：\n${questionAnalysisText}` : ''}

请直接回答：

## 核心答案
${questionAnswer}

## 详细分析
请根据${divinationType}的特点进行专业分析，结合分析深度要求：${getComplexityDescription(analysis.complexity)}。

## 行动建议
${action}

## 总结要点
请用一句话概括最重要的建议。

**语气和表达要求**：
- 语气风格：${getEmotionToneGuidance(analysis.emotion)}
- 术语使用：${getExperienceGuidance(analysis.userExperience)}
- 分析深度：${analysis.complexity.complexity}
- 时间紧急度：${analysis.complexity.timeUrgency}
- 重要程度：${analysis.complexity.importance}`;
}
