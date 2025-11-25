import type { SupplementaryInfo, TarotData } from '@/types';
import { analyzeQuestion } from './shared/question-analyzer';
import { buildPrompt } from './shared/prompt-builder';

type TarotCard = TarotData['cards'][0];

/**
 * 格式化塔罗牌数据为可读的文本
 */
function formatTarotData(data: TarotData): string {
  if (!Array.isArray(data.cards)) {
    return '塔罗牌数据格式错误';
  }

  return data.cards
    .map((card: TarotCard) => 
      `- **${card.position}**: ${card.name} ${card.reversed ? ' (逆位)' : ''} (关键词: ${card.keywords.join(', ')})`
    )
    .join('\n');
}

export function generateTarotPrompt(
  question: string,
  data: TarotData,
  timeInfo: string,
  supplementaryInfo?: SupplementaryInfo
): string {
  // 分析问题
  const analysis = analyzeQuestion(question);
  
  // 格式化数据
  const formattedData = formatTarotData(data);
  
  // 构建基础提示词
  const basePrompt = buildPrompt({
    divinationType: 'tarot',
    question,
    formattedData,
    timeInfo,
    analysis,
    ...(supplementaryInfo && { supplementaryInfo })
  });
  
  // 添加塔罗牌专用分析
  const tarotSpecific = `

## 塔罗牌专业分析要求
- **整体解读**：将所有牌融合成一个流畅、简洁的故事，直接回应用户的问题
- **关键牌面**：点出1-2张关键牌，并解释其核心作用
- **牌面速解**：${data.cards.map((card: TarotCard) =>
    `- **${card.position}**: ${card.name} ${card.reversed ? ' (逆位)' : ''} - 一句话点明这张牌在此处的核心启示`
  ).join('\n')}
- **核心建议**：基于牌阵，提供1-2个最关键、最可行的行动建议
- **展望与提醒**：简要说明若遵循建议，可能出现的积极展望，并提醒需要注意的潜在挑战

**专业术语解释**：${analysis.userExperience.level === 'beginner' ? '请用简单语言解释塔罗牌的基本概念' : analysis.userExperience.level === 'intermediate' ? '可适当使用专业术语并简要解释' : '可使用专业术语进行深度分析'}

**解读要求**：
- 语言富有启发性，但不过于冗长
- 注重实用性和针对性
- 保持专业、温暖、有洞见的语气`;

  // 构建最终提示词（已包含干支指导）
  return basePrompt + tarotSpecific;
}
