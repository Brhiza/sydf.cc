/**
 * 统一的提示词构建器
 * 提供标准化的提示词生成逻辑
 */

import type { PromptBuildConfig, QuestionAnalysis, QuestionType } from './types';
import { formatSupplementaryInfo, getComplexityDescription, getEmotionToneGuidance, getExperienceGuidance } from './types';
import { generateQuestionAnalysisText } from './question-analyzer';

/**
 * 构建问题回答部分
 */
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

/**
 * 构建行动建议部分
 */
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

/**
 * 构建基础提示词结构
 */
export function buildBasePromptStructure(config: PromptBuildConfig): string {
  const { divinationType, question, formattedData, timeInfo, analysis, supplementaryInfo } = config;
  
  // 生成问题分析文本
  const questionAnalysisText = generateQuestionAnalysisText(analysis.types);
  
  // 构建问题回答部分
  const questionAnswer = buildQuestionAnswerSection(question, analysis.types, analysis);
  
  // 构建行动建议部分（使用默认文本）
  const action = buildActionSection(
    analysis.types,
    analysis,
    '具体的行动步骤和注意事项',
    '替代方案和建议',
    '根据占卜分析，应该采取什么策略？'
  );
  
  // 格式化补充信息
  const supplementaryInfoText = formatSupplementaryInfo(supplementaryInfo);
  
  // 构建完整提示词
  const prompt = `**时间信息**：
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

  return prompt;
}

/**
 * 构建六爻占卜提示词
 */
export function buildLiuyaoPrompt(config: PromptBuildConfig): string {
  const basePrompt = buildBasePromptStructure(config);
  
  const liuyaoSpecific = `

## 六爻专业分析要求
- **主卦解读**：分析卦宫、六亲、六神的含义和当前状态
- **变卦预示**：分析变卦对主卦的影响和未来发展趋势
- **动爻分析**：重点关注动爻的位置、性质和变化含义
- **世应关系**：分析世爻（求测者）和应爻（对方或所测之事）的关系
- **用神分析**：根据问题确定用神，分析其旺衰、生克、动静状态
- **六神启示**：分析青龙、朱雀、勾陈、螣蛇、白虎、玄武的指引
- **空亡影响**：分析空亡爻对卦象的影响和注意事项

**专业术语解释**：${config.analysis.userExperience.level === 'beginner' ? '请用简单语言解释世爻、应爻、用神等概念' : config.analysis.userExperience.level === 'intermediate' ? '可适当使用专业术语并简要解释' : '可使用专业术语进行深度分析'}`;

  return basePrompt + liuyaoSpecific;
}

/**
 * 构建梅花易数提示词
 */
export function buildMeihuaPrompt(config: PromptBuildConfig): string {
  const basePrompt = buildBasePromptStructure(config);
  
  const meihuaSpecific = `

## 梅花易数专业分析要求
- **体用总论**：明确体卦（代表我/此事）和用卦（代表对方/环境），根据"用生体吉，克体凶"判断吉凶
- **过程分析**：分析互卦代表的事情发展过程，判断过程顺利或艰难
- **结局预示**：分析变卦代表的最终结局，判断结局圆满或不利
- **旺衰权衡**：结合占卜季节分析体卦的强弱状态
- **卦象象征**：结合卦象的象征意义进行具体人事解读

**专业术语解释**：${config.analysis.userExperience.level === 'beginner' ? '请用简单语言解释体卦、用卦、五行生克等概念' : config.analysis.userExperience.level === 'intermediate' ? '可适当使用专业术语并简要解释' : '可使用专业术语进行深度分析'}`;

  return basePrompt + meihuaSpecific;
}

/**
 * 构建奇门遁甲提示词
 */
export function buildQimenPrompt(config: PromptBuildConfig): string {
  const basePrompt = buildBasePromptStructure(config);
  
  const qimenSpecific = `

## 奇门遁甲专业分析要求
- **格局概览**：说明当前奇门局的基本特性（如伏吟、反吟等）和核心能量状态
- **用神选取**：根据问题明确核心用神，定位其落宫，分析旺衰状态和吉凶
- **核心矛盾**：分析用神宫位与时干宫位、值符值使宫位的关系
- **九宫分析**：逐一分析九宫的星、门、神、干组合和能量状态
- **吉格凶格**：指出关键吉格（如青龙返首、飞鸟跌穴）或凶格（如白虎猖狂、朱雀投江）
- **时空能量**：分析当前奇门局的时空能量分布和对问题的影响
- **战略态势**：评估利主利客、利内利外态势

**专业术语解释**：${config.analysis.userExperience.level === 'beginner' ? '请用简单语言解释值符、值使、用神、九宫等概念' : config.analysis.userExperience.level === 'intermediate' ? '可适当使用专业术语并简要解释' : '可使用专业术语进行深度战略分析'}`;

  return basePrompt + qimenSpecific;
}

/**
 * 构建塔罗牌提示词
 */
export function buildTarotPrompt(config: PromptBuildConfig): string {
  const basePrompt = buildBasePromptStructure(config);
  
  const tarotSpecific = `

## 塔罗牌专业分析要求
- **牌面解读**：详细解释每张牌的正位/逆位含义和象征意义
- **牌阵分析**：分析牌阵中各牌的位置关系和相互影响
- **元素平衡**：分析火、土、风、水四元素的平衡状态
- **数字意义**：分析牌面数字的 numerology 意义
- **图案符号**：解读牌面图案中的关键符号和隐喻
- **整体能量**：综合分析整个牌阵的能量流向和整体信息

**专业术语解释**：${config.analysis.userExperience.level === 'beginner' ? '请用简单语言解释塔罗牌的基本概念' : config.analysis.userExperience.level === 'intermediate' ? '可适当使用专业术语并简要解释' : '可使用专业术语进行深度分析'}`;

  return basePrompt + tarotSpecific;
}

/**
 * 构建三式高级占卜提示词
 */
export function buildSsgwPrompt(config: PromptBuildConfig): string {
  const basePrompt = buildBasePromptStructure(config);
  
  const ssgwSpecific = `

## 三式高级占卜分析要求
- **综合分析**：结合太乙、奇门、六壬三式的核心理论进行综合判断
- **神煞影响**：分析重要神煞对事态的影响和作用
- **时空配合**：分析天时、地利、人和的配合关系
- **吉凶判断**：基于三式理论体系进行专业的吉凶判断
- **化解建议**：如有不利因素，提供传统的化解方法和建议

**专业术语解释**：${config.analysis.userExperience.level === 'beginner' ? '请用简单语言解释三式占卜的基本概念' : config.analysis.userExperience.level === 'intermediate' ? '可适当使用专业术语并简要解释' : '可使用专业术语进行深度分析'}`;

  return basePrompt + ssgwSpecific;
}

/**
 * 添加干支分析指导（仅对需要的占卜类型）
 */
function addGanzhiGuidance(prompt: string, divinationType: string, timeInfo?: string): string {
  // 只有这些占卜类型需要干支分析
  const ganzhiTypes = ['liuyao', 'meihua', 'qimen', 'daily'];
  
  if (ganzhiTypes.includes(divinationType) && timeInfo) {
    return prompt + `

请基于上述准确的农历干支信息进行占卜分析。`;
  }
  
  return prompt;
}

/**
 * 统一的提示词构建入口
 */
export function buildPrompt(config: PromptBuildConfig): string {
  const { divinationType } = config;
  
  let prompt: string;
  
  switch (divinationType) {
    case 'liuyao':
      prompt = buildLiuyaoPrompt(config);
      break;
    case 'meihua':
      prompt = buildMeihuaPrompt(config);
      break;
    case 'qimen':
      prompt = buildQimenPrompt(config);
      break;
    case 'tarot':
    case 'tarot_single':
      prompt = buildTarotPrompt(config);
      break;
    case 'ssgw':
      prompt = buildSsgwPrompt(config);
      break;
    default:
      prompt = buildBasePromptStructure(config);
  }
  
  // 为需要的占卜类型添加干支指导
  return addGanzhiGuidance(prompt, divinationType, config.timeInfo);
}

/**
 * 构建追问模式提示词
 */
export function buildFollowUpPrompt(
  originalQuestion: string,
  originalAnswer: string,
  followUpQuestion: string,
  _context: Record<string, unknown>
): string {
  return `你是一位专业的占卜师，正在为用户提供追问解答。

## 原始占卜信息
**原始问题**：${originalQuestion}
**原始解答**：${originalAnswer}

## 追问问题
**用户追问**：${followUpQuestion}

## 追问解答要求
1. **保持一致性**：确保追问解答与原始占卜结果保持逻辑一致
2. **深度挖掘**：基于原始占卜结果，提供更深层次的分析和指导
3. **实用导向**：给出具体可行的建议和行动指导
4. **情感支持**：根据用户的追问内容，提供适当的心理支持和鼓励

请直接回答用户的追问，保持专业、温暖、有帮助的语气。`;
}
