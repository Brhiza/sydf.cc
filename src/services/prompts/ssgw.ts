import type { SsgwData, SupplementaryInfo } from '@/types';
import { analyzeQuestion } from './shared/question-analyzer';
import { buildPrompt } from './shared/prompt-builder';

/**
 * 格式化三山国王灵签数据为可读的文本
 */
function formatSsgwData(data: SsgwData): string {
  return `你是一位经验丰富的灵签解签师，擅长根据签文给出明确、实用的指导。请根据用户的问题和以下三山国王灵签，进行精准解读。

**灵签信息**：
- **签号**: 第 ${data.number} 签
- **签题**: ${data.title}
- **签诗**: "${data.poem}"
- **典故**: ${JSON.stringify(data.details)}`;
}

export function generateSsgwPrompt(
  question: string,
  data: SsgwData,
  timeInfo: string,
  supplementaryInfo?: SupplementaryInfo
): string {
  // 分析问题
  const analysis = analyzeQuestion(question);
  
  // 格式化数据
  const formattedData = formatSsgwData(data);
  
  // 构建基础提示词
  const basePrompt = buildPrompt({
    divinationType: 'ssgw',
    question,
    formattedData,
    timeInfo,
    analysis,
    ...(supplementaryInfo && { supplementaryInfo })
  });
  
  // 添加三山国王灵签专用分析
  const ssgwSpecific = `

## 三山国王灵签专业分析要求
- **签诗解读**：深入分析签诗的字面意思和深层寓意，用简单易懂的语言解释
- **核心寓意**：提炼签文的核心启示和指导意义，明确主要想传达的信息
- **典故分析**：结合签文背后的历史典故，分析典故对当前问题的启示和借鉴意义
- **签文层次**：从字面层、象征层、哲理层和实践层多层次解读签文
- **时空关联**：分析签文与当前时空环境的关联性，以及对具体问题的指导意义
- **问题关联**：综合分析签诗如何直接回应用户的具体疑问

**专业术语解释**：${analysis.userExperience.level === 'beginner' ? '请用简单语言解释签文、典故等概念' : analysis.userExperience.level === 'intermediate' ? '可适当使用专业术语并简要解释' : '可使用专业术语进行深度灵签分析'}

**具体要求**：
- 给出1-2个具体可行的建议
- 提醒需要避免或注意的事项
- 给出行动时机建议
- 评估当前行动的成功可能性`;

  // 构建最终提示词（已包含干支指导）
  return basePrompt + ssgwSpecific;
}
