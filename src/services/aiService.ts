/**
 * AI服务 - 专门处理AI相关的功能
 */
import type { ChatMessage } from '@/types/chat';
import { generateTwoStageAIResponseWithSystem, getAIInsight } from './ai';
import type { 
  DivinationType,
  DivinationData,
  LiuyaoData, 
  MeihuaData, 
  QimenData, 
  TarotData, 
  SsgwData,
  DailyFortuneData
} from '@/types/divination';
import { generatePrompt, generateFollowUpPromptWrapper } from './prompts';
import { getFormattedTimeInfo, getDisplayTimeData } from './prompts/shared/time-utils';
import { handleError, logError, getUserFriendlyMessage } from '@/utils/error-handler';

export interface AIServiceCallbacks {
  onAIChunk?: (chunk: string) => void;
  onAIError?: (error: string) => void;
}

export class AIService {
  /**
   * 生成AI响应
   */
  async generateAIResponse(
    type: DivinationType,
    question: string,
    data: LiuyaoData | MeihuaData | QimenData | TarotData | SsgwData | DailyFortuneData,
    supplementaryInfo: { gender?: '男' | '女'; birthYear?: number; model?: string } | undefined,
    signal?: AbortSignal,
    onAIChunk?: (chunk: string) => void
  ): Promise<string> {
    try {
      // 使用分离的system和user prompt架构
      const systemPrompt = this.generateSystemPrompt(type);
      const promptGenerator = async (
        question: string,
        data: LiuyaoData | MeihuaData | QimenData | TarotData | SsgwData | DailyFortuneData
      ) => await generatePrompt(type, question, data, supplementaryInfo);

      const response = await generateTwoStageAIResponseWithSystem(
        question,
        promptGenerator,
        data,
        systemPrompt,
        signal,
        onAIChunk,
        supplementaryInfo
      );

      return response.content ?? '';
    } catch (error) {
      const appError = handleError(error, 'AI响应生成失败');
      logError(appError, 'AI Service - generateAIResponse');
      throw new Error(getUserFriendlyMessage(appError));
    }
  }

  /**
   * 生成针对占卜类型的system prompt
   */
  private generateSystemPrompt(type: DivinationType): string {
    const baseSystemPrompt = `你是一个专业的占卜AI助手。

**核心要求**：
- 你必须总是使用简体中文来回答。
- 请专注于提供实用、准确、有深度的解读。

**时间处理**：
- 所有占卜都已提供精准的“时间信息”（公历、农历、干支）。你必须直接使用此信息进行分析，仅在推算未来或过去日期时才可调用工具。

**占卜类型专用能力**：`;

    const systemPrompts = {
      liuyao: `${baseSystemPrompt}
你是精通六爻占卜的专业占卜师，宗于京房易理。

**专业能力**：
- **核心分析**：必须围绕用神的"旺衰"展开，这是吉凶判断的根本。结合月建、日辰判断用神的强弱、生旺墓绝。
- **六亲关系**：精准解读世爻、应爻、用神、原神、忌神、仇神之间的生克冲合关系。
- **爻象变化**：详尽分析动爻，特别是"父化财"、"官化兄"等爻变，以及暗动、伏藏等情况。
- **神煞辅助**：结合空亡、月破、驿马、贵人等神煞信息进行综合判断。
- **行动建议**：基于卦象分析，提供具体、可行的行动建议和时机把握，避免空泛理论。

请始终用专业、沉稳的语气回答，确保解读既有深度又易于理解和应用。`,

      meihua: `${baseSystemPrompt}
你是精通梅花易数的专业占卜师，宗于邵氏心易。

**专业能力**：
- **核心分析**：必须围绕"体用"生克展开。明确指出体卦、用卦，并以此为中心进行吉凶判断。
- **一体三用**：按照"用卦为事之始，互卦为事之中，变卦为事之终"的逻辑层次，分析它们与体卦的生克关系，形成完整判断链条。
- **旺衰权衡**：结合四季旺衰，判断体用卦的强弱，从而更精准地判断生克力量。
- **外应参考**：可适当结合起卦时的声音、方位、人物等外应，丰富解读。

请以简洁明了的方式回答，注重实用性和时效性。`,

      qimen: `${baseSystemPrompt}
你是深谙奇门遁甲的战略顾问，精通转盘奇门之法。

**专业能力**：
- **格局为重**：精准解析天盘、地盘、人盘、神盘的配置关系，并必须识别出盘中的关键"吉格"与"凶格"，并解释其具体影响。
- **主客分析**：分析值符、值使、时干、日干等关键用神的落宫状态，判断主客双方的优劣态势。
- **决策指导**：基于格局和用神分析，为所问之事判断最有利的行动时机、方位和策略。
- **趋吉避凶**：明确指出盘中的吉方与凶方，以及有利与不利的行动。

请以权威、严谨的语气回答，如同古代军师为统帅献策。`,

      tarot: `${baseSystemPrompt}
你是一位智慧与慈悲并存的塔罗解读师。

**解读核心**：
1.  **整合叙事**：将所有牌融合成一个流畅、简洁的故事，直接回应用户的问题。
2.  **关键解读**：点出1-2张关键牌，并解释其核心作用。
3.  **简明扼要**：解读应直击要点，避免不必要的细节。语言富有启发性，但不过于冗长。
4.  **赋能建议**：提供清晰、可行的行动建议。

**输出要求**：
- **语气**：专业、温暖、有洞见。
- **语言**：简体中文。`,

      tarot_single: `${baseSystemPrompt}
你是专业的塔罗牌单牌解读师。

**专业能力**：
- 精准把握单张塔罗牌在特定问题中的核心含义
- 分析牌面正逆位对问题的不同影响
- 提供简洁而深刻的洞察和直接建议
- 将牌面象征与用户的实际情况紧密结合

请以直接、清晰的方式回答，注重实用性和针对性。`,

      ssgw: `${baseSystemPrompt}
你是精通三山国王灵签的解签师。

**专业能力**：
- 精确理解签诗的隐喻和哲理内涵
- 解读典故故事对现实问题的启示意义
- 将古老的智慧应用到现代生活情境中
- 提供既符合传统又能指导现实的建议

请以平实、智慧的方式回答，让古老灵签焕发现代价值。`,

      daily: `${baseSystemPrompt}
你是一位精通日家奇门遁甲的玄学大师，此生所有精力都致力于研究日家，精通各种古籍和算法。

**专业能力**：
- 基于今日干支分析整体气场特点和五行能量分布
- 深度解读各方面运势（事业、财富、感情、健康）的内在联系
- 提供幸运元素（数字、颜色、方向、时辰）的具体运用指导
- 结合传统日家理论给出实用的开运建议和注意事项
- 将玄学智慧与现代生活实际相结合，提供可操作的指导

请用专业而不失亲和力的语言，让求测者既能感受到玄学的深度，又能获得实用的生活指导。解读要体现出日家奇门遁甲的精髓。`,

      default: `${baseSystemPrompt}
你是专业的占卜AI助手。

**专业能力**：
- 能够根据用户的问题提供有深度的解读
- 结合传统智慧和现代思维给出建议
- 保持客观、理性的分析态度
- 注重实用性和可操作性

请以专业、智慧的方式回答，为用户提供有价值的指导。`
    };

    return systemPrompts[type] || systemPrompts.default;
  }

  /**
   * 处理后续问题
   */
  async handleFollowUp(
    conversationHistory: ChatMessage[],
    followUpQuestion: string,
    callbacks: {
      onChunk: (chunk: string) => void;
      onComplete: () => void;
      onError: (error: string) => void;
      onConversationUpdate: (history: ChatMessage[]) => void;
    },
    context?: {
      originalQuestion?: string;
      originalResponse?: string;
      divinationType?: DivinationType;
      originalData?: DivinationData | null;
      supplementaryInfo?: { gender?: '男' | '女'; birthYear?: number; model?: string } | null;
    }
  ): Promise<void> {
    const { onChunk, onComplete, onError, onConversationUpdate } = callbacks;

    // 添加用户消息和AI占位符
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: followUpQuestion,
    };
    const assistantMessage: ChatMessage = {
      id: `msg-${Date.now() + 1}`,
      role: 'assistant',
      content: '',
    };
    
    conversationHistory.push(userMessage, assistantMessage);
    onConversationUpdate([...conversationHistory]);

    try {
      // 生成追问提示词
      const [currentTime, displayTimeData] = await Promise.all([
        getFormattedTimeInfo(),
        getDisplayTimeData()
      ]);

      const followUpContext = {
        originalQuestion: context?.originalQuestion || '',
        originalResponse: context?.originalResponse || '',
        divinationType: context?.divinationType || 'liuyao',
        followUpQuestion,
        currentTime,
        timeInfo: displayTimeData,
        originalData: context?.originalData || null,
        supplementaryInfo: context?.supplementaryInfo || null
      };

      const promptForAI = await generateFollowUpPromptWrapper(followUpContext);

      // 调用AI服务
      await getAIInsight(
        promptForAI,
        (chunk) => {
          assistantMessage.content += chunk;
          onChunk(chunk);
          onConversationUpdate([...conversationHistory]);
        },
        (finalContent) => {
          assistantMessage.content = finalContent;
          onComplete();
          onConversationUpdate([...conversationHistory]);
        },
        (error) => {
          const userFriendlyMessage = getUserFriendlyMessage(handleError(error, '后续问题处理失败'));
          assistantMessage.content = userFriendlyMessage;
          onError(userFriendlyMessage);
          onConversationUpdate([...conversationHistory]);
        }
      );
    } catch (error) {
      const userFriendlyMessage = getUserFriendlyMessage(handleError(error, '后续问题处理失败'));
      onError(userFriendlyMessage);
    }
  }
}

// 导出单例实例
export const aiService = new AIService();
