/**
 * 追问模式专用提示词
 * 重用原始占卜的完整数据，确保追问的准确性和一致性
 */
import { generatePrompt } from './index';

export interface FollowUpContext {
  originalQuestion: string;
  originalResponse: string;
  divinationType: string;
  followUpQuestion: string;
  currentTime: string;
  timeInfo?: {
    solar: string;
    lunar: string;
    ganzhi: string;
    jieqi: string;
  };
  originalData?: any;
  supplementaryInfo?: {
    gender?: '男' | '女';
    birthYear?: number;
    model?: string;
  } | null;
}

export interface FollowUpPromptConfig {
  followUpType: 'clarification' | 'deeper_analysis' | 'action_guidance' | 'time_related' | 'choice_comparison';
  urgency: 'low' | 'medium' | 'high';
  detailLevel: 'brief' | 'detailed' | 'comprehensive';
}

/**
 * 追问类型检测器
 */
export function detectFollowUpType(question: string): FollowUpPromptConfig['followUpType'] {
  const clarificationPatterns = /什么意思|什么是|解释一下| clarify|explain/i;
  const deeperAnalysisPatterns = /为什么|why|深入|详细|进一步|分析/i;
  const actionGuidancePatterns = /怎么办|如何|怎么|how|应该|建议/i;
  const timeRelatedPatterns = /什么时候|何时|几时|多久|when|time/i;
  const choiceComparisonPatterns = /还是|或者|比较|对比|哪个|or|compare/i;

  if (clarificationPatterns.test(question)) return 'clarification';
  if (deeperAnalysisPatterns.test(question)) return 'deeper_analysis';
  if (actionGuidancePatterns.test(question)) return 'action_guidance';
  if (timeRelatedPatterns.test(question)) return 'time_related';
  if (choiceComparisonPatterns.test(question)) return 'choice_comparison';
  
  return 'clarification'; // 默认为澄清类问题
}

/**
 * 追问紧急程度检测器
 */
export function detectUrgency(question: string): FollowUpPromptConfig['urgency'] {
  const urgentPatterns = /急|紧急|马上|立即|urgent|asap|现在/i;
  const relaxedPatterns = /慢慢|不急|考虑|think|consider/i;
  
  if (urgentPatterns.test(question)) return 'high';
  if (relaxedPatterns.test(question)) return 'low';
  return 'medium';
}

/**
 * 详细程度检测器
 */
export function detectDetailLevel(question: string): FollowUpPromptConfig['detailLevel'] {
  const briefPatterns = /简单|简短|概括|summary|brief/i;
  const detailedPatterns = /详细|具体|深入|comprehensive|detailed/i;
  const comprehensivePatterns = /全面|完整|thorough|complete/i;
  
  if (briefPatterns.test(question)) return 'brief';
  if (comprehensivePatterns.test(question)) return 'comprehensive';
  if (detailedPatterns.test(question)) return 'detailed';
  return 'detailed'; // 默认为详细
}

/**
 * 生成追问模式专用提示词
 * 重用原始占卜的完整数据，确保追问的准确性和一致性
 */
export async function generateFollowUpPrompt(context: FollowUpContext): Promise<string> {
  const { originalQuestion, originalResponse, divinationType, followUpQuestion, originalData, supplementaryInfo } = context;
  
  // 重用原始占卜的提示词生成逻辑
  // 这样可以确保所有占卜类型都能获得完整的数据处理
  let basePrompt = '';
  
  if (originalData) {
    try {
      // 使用静态导入的提示词生成器
      basePrompt = await generatePrompt(divinationType as any, followUpQuestion, originalData, supplementaryInfo || undefined);
    } catch (error) {
      console.error('生成基础提示词失败:', error);
    }
  }
  
  // 构建追问专用的上下文信息
  const followUpContext = `
---
## 追问上下文
**原始问题**：${originalQuestion || '无原始问题'}
**原始解读**：${originalResponse || '无原始解读'}

**当前追问**：${followUpQuestion}

## 追问解答要求
1. **基于原始占卜**：以上述占卜数据为基础进行追问解答
2. **保持一致性**：确保追问解答与原始解读逻辑一致
3. **深入分析**：针对追问内容提供更深层次的分析
4. **实用导向**：给出具体可行的建议和行动指导
5. **直接回答**：立即开始回答追问，不要重复原始解读

---

`;

  // 将追问上下文插入到原始提示词中
  if (basePrompt) {
    // 在数据信息之后、用户问题之前插入追问上下文
    const dataEndIndex = basePrompt.indexOf('**用户问题**：');
    if (dataEndIndex !== -1) {
      const finalPrompt = basePrompt.slice(0, dataEndIndex) + followUpContext + basePrompt.slice(dataEndIndex);
      return finalPrompt;
    }
  }
  
  // 如果无法重用原始逻辑，抛出错误而不是使用简化版本
  throw new Error('无法生成追问提示词：缺少必要的原始数据');
}
