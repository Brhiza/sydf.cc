import type { PromptBuildConfig } from '../types';
import { formatSupplementaryInfo } from '../prompt-guidance';

export function buildQuestionAnswerSection(question: string): string {
  return `- **问题回答**：

**核心答案**：针对"${question}"，请直接给出最核心、最精准的答案。若用户问的是判断、选择、时间、行动或原因，请由你自行识别并直接回应。

**简要依据**：用1-2句话说明判断依据。`;
}

export function buildActionSection(
  affirmativeAction: string,
  negativeAction: string,
  defaultAction: string
): string {
  return `- **如果答案明显偏肯定**：${affirmativeAction}
- **如果答案为否定**：${negativeAction}
- **最佳策略**：${defaultAction}

请根据用户原始表达自行决定回答详略、语气和专业术语密度，不要依赖预设分类。`;
}

export function buildBasePromptStructure(config: PromptBuildConfig): string {
  const { divinationType, question, formattedData, timeInfo, supplementaryInfo } = config;

  const questionAnswer = buildQuestionAnswerSection(question);
  const action = buildActionSection(
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

请直接回答：

## 核心答案
${questionAnswer}

## 详细分析
请根据${divinationType}的特点进行专业分析。用户问题的真实重点、问题类型、语气需求和分析深度由你自行判断。

## 行动建议
${action}

## 总结要点
请用一句话概括最重要的建议。

**语气和表达要求**：
- 直接围绕用户问题作答，不要复述无关模板。
- 不确定之处要明确说明，不要把占卜结果包装成绝对结论。
- 专业术语可以使用，但应根据用户表达自行决定解释力度。`;
}
