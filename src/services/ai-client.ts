/**
 * 统一的 AI 服务入口
 * 主类只负责:配置解析 + 请求去重 + 调度准备/工具循环子模块
 */
import type { ChatMessage } from '@/types';
import { useSettingsStore } from '@/stores/settings';
import {
  getCurrentTimeInfoTool,
  getGanZhiForDateTool,
  getGanZhiForMonthTool,
  getGanZhiForYearTool,
} from './tools';
import { resolveEndpointConfig } from './ai-client/endpoint-resolver';
import { buildInsightMessages } from './ai-client/insight-message';
import { prepareRequestContext } from './ai-client/request-context';
import { runToolLoop } from './ai-client/tool-loop';
import type { AIResponse, AITool } from './ai-client/types';

export type { AIResponse };

const AVAILABLE_TOOLS: AITool[] = [
  getCurrentTimeInfoTool,
  getGanZhiForDateTool,
  getGanZhiForMonthTool,
  getGanZhiForYearTool,
];

class AIServiceSingleton {
  private static instance: AIServiceSingleton;
  private pendingRequests: Map<string, Promise<AIResponse>> = new Map();

  private constructor() {}

  public static getInstance(): AIServiceSingleton {
    if (!AIServiceSingleton.instance) {
      AIServiceSingleton.instance = new AIServiceSingleton();
    }
    return AIServiceSingleton.instance;
  }

  public async generateResponse(
    initialMessages: ChatMessage[],
    signal?: AbortSignal,
    onChunk?: (chunk: string) => void,
    modelOverride?: string
  ): Promise<AIResponse> {
    if (signal?.aborted) {
      return Promise.reject(new DOMException('Aborted', 'AbortError'));
    }

    const settingsStore = useSettingsStore();
    const { endpoint, apiKey, model } = resolveEndpointConfig(
      settingsStore.settings,
      modelOverride
    );

    if (!Array.isArray(initialMessages)) {
      console.error('generateResponse 需要一个 ChatMessage 数组');
      initialMessages = [{ role: 'user', content: String(initialMessages) }];
    }

    const messages = [...initialMessages];
    const requestKey = `${endpoint}:${model}:${JSON.stringify(messages)}`;
    if (this.pendingRequests.has(requestKey) && !onChunk) {
      return this.pendingRequests.get(requestKey)!;
    }

    const prepared = prepareRequestContext(messages, AVAILABLE_TOOLS);
    const requestPromise = runToolLoop({
      endpoint,
      apiKey,
      model,
      messages: prepared.messages,
      prepared,
      signal,
      onChunk,
    });

    if (!onChunk) {
      this.pendingRequests.set(requestKey, requestPromise);
      requestPromise.finally(() => {
        this.pendingRequests.delete(requestKey);
      });
    }

    return requestPromise;
  }
}

export const AIService = AIServiceSingleton.getInstance();

export const generatePromptAIResponse = (
  prompt: string,
  signal?: AbortSignal,
  onChunk?: (chunk: string) => void
) => {
  const messages: ChatMessage[] = [{ role: 'user', content: prompt }];
  return AIService.generateResponse(messages, signal, onChunk);
};

/**
 * 为追问获取 AI 见解
 */
export function getAIInsight(
  input: ChatMessage[] | string,
  onChunk: (chunk: string) => void,
  onComplete: (content: string) => void,
  onError: (error: string) => void
): void {
  const messages = buildInsightMessages(input);
  AIService.generateResponse(messages, undefined, onChunk)
    .then((response) => onComplete(response.content || ''))
    .catch((err) => {
      const errorMessage = err instanceof Error ? err.message : 'AI解读暂时不可用，请稍后重试。';
      onError(errorMessage);
    });
}

/**
 * 增强版 AI 处理:支持自定义 system prompt
 */
export async function generateTwoStageAIResponseWithSystem<T>(
  originalQuestion: string,
  promptGenerator: (question: string, data: T) => string | Promise<string>,
  data: T,
  systemPrompt: string,
  signal?: AbortSignal,
  onChunk?: (chunk: string) => void
): Promise<AIResponse> {
  try {
    const finalPrompt = await promptGenerator(originalQuestion, data);
    const systemMessage: ChatMessage = { role: 'system', content: systemPrompt };
    const userMessage: ChatMessage = { role: 'user', content: finalPrompt };
    return await AIService.generateResponse([systemMessage, userMessage], signal, onChunk);
  } catch (error) {
    console.error('增强版AI处理失败:', error);
    throw error;
  }
}
