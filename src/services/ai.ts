/**
 * 统一的AI服务
 */
import type { ChatMessage, SupplementaryInfo, ToolCall } from '@/types';
import { useSettingsStore } from '@/stores/settings';
import {
  getCurrentTimeInfoTool,
  getGanZhiForMonthTool,
  getGanZhiForYearTool,
  toolExecutors,
} from './tools';

// OpenAI 兼容请求体接口
interface AITool {
  type: 'function';
  function: {
    name: string;
    description: string;
    parameters: {
      type: 'object';
      properties: Record<string, unknown>;
      required?: string[];
    };
  };
}

interface OpenAIRequestBody {
  model: string;
  messages: ChatMessage[];
  max_tokens?: number;
  temperature?: number;
  stream: boolean;
  tools?: AITool[];
  tool_choice?: 'auto' | 'none' | { type: 'function', function: { name: string } };
}

// AI响应接口
export interface AIResponse {
  content: string | null;
  tool_calls?: ToolCall[];
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

/**
 * AI服务类
 */
class AIServiceSingleton {
  private static instance: AIServiceSingleton;
  private pendingRequests: Map<string, Promise<AIResponse>> = new Map();

  private constructor() {
    // 构造函数不需要做任何特殊处理
  }

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
    const settingsStore = useSettingsStore();
    const { useCustomApi, customApiEndpoint, customApiKey, selectedModel } = settingsStore.settings;
    
    let endpoint: string;
    let apiKey: string | undefined;
    let model: string;
    
    if (useCustomApi && customApiEndpoint && customApiKey) {
      if (customApiEndpoint.endsWith('/v1/chat/completions')) {
        endpoint = customApiEndpoint;
      } else if (customApiEndpoint.endsWith('/v1')) {
        endpoint = `${customApiEndpoint}/chat/completions`;
      } else {
        const cleanEndpoint = customApiEndpoint.replace(/\/$/, '');
        endpoint = `${cleanEndpoint}/v1/chat/completions`;
      }
      apiKey = customApiKey;
      model = modelOverride || selectedModel;
    } else {
      // 统一使用 /api/ai 作为所有版本的标准API路径
      endpoint = '/api/ai';
      apiKey = undefined;
      model = modelOverride || 'default-model';
    }

    if (!Array.isArray(initialMessages)) {
      console.error('generateResponse 需要一个 ChatMessage 数组');
      initialMessages = [{ role: 'user', content: String(initialMessages) }];
    }

    const messages = [...initialMessages];
    
    // 请求去重：如果相同的请求正在进行中，直接返回该Promise
    const requestKey = `${endpoint}:${model}:${JSON.stringify(messages)}`;
    if (this.pendingRequests.has(requestKey) && !onChunk) {
      return this.pendingRequests.get(requestKey)!;
    }

    const requestPromise = this.executeRequest(messages, endpoint, apiKey, model, signal, onChunk);
    
    if (!onChunk) {
      this.pendingRequests.set(requestKey, requestPromise);
      requestPromise.finally(() => {
        this.pendingRequests.delete(requestKey);
      });
    }
    
    return requestPromise;
  }

  private async executeRequest(
    messages: ChatMessage[],
    endpoint: string,
    apiKey: string | undefined,
    model: string,
    signal?: AbortSignal,
    onChunk?: (chunk: string) => void
  ): Promise<AIResponse> {
    const availableTools = [
      getCurrentTimeInfoTool,
      getGanZhiForMonthTool,
      getGanZhiForYearTool,
    ];

    const maxToolCalls = 3;
    for (let i = 0; i < maxToolCalls; i++) {
      const body: OpenAIRequestBody = {
        model: model,
        messages: messages,
        max_tokens: 8192,
        stream: !!onChunk,
        tools: availableTools,
        tool_choice: 'auto',
      };

      const maxRetries = 3;
      const timeout = 30000;
      let lastError = null;
      
      let responseResult: AIResponse | null = null;

      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), timeout);
          const requestSignal = signal ? this.linkSignals(signal, controller.signal) : controller.signal;

          const headers: HeadersInit = { 'Content-Type': 'application/json' };
          if (apiKey) {
            headers['Authorization'] = `Bearer ${apiKey}`;
          }

          const response = await fetch(endpoint, {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
            signal: requestSignal,
          });

          clearTimeout(timeoutId);

          if (!response.ok) {
            throw await this.handleErrorResponse(response);
          }

          if (onChunk && response.body) {
            responseResult = await this.handleStreamResponse(response, onChunk);
          } else {
            const data = await response.json();
            const message = data.choices?.[0]?.message;
            responseResult = {
              content: message.content,
              tool_calls: message.tool_calls,
              usage: data.usage,
            };
          }
          break; // Success, exit retry loop
        } catch (error) {
          lastError = error;
          if (error instanceof DOMException && error.name === 'AbortError') {
            if (!signal?.aborted) {
              console.error(`AI 请求超时 (${timeout}ms)`);
              throw new Error(`AI 请求超时，请检查网络连接或API端点设置。`);
            }
            throw error;
          }
          if (attempt < maxRetries) {
            const delay = Math.min(500 * Math.pow(2, attempt - 1), 2000);
            console.debug(`AI服务调用失败，后台自动重试 (${attempt}/${maxRetries})，${delay}ms后重试`);
            await new Promise(resolve => setTimeout(resolve, delay));
          } else {
            console.error(`AI服务调用失败，所有重试均已用尽:`, lastError);
            if (!useCustomApi) {
              return { content: '抱歉，AI服务暂时不可用，请稍后重试。' };
            }
            throw lastError;
          }
        }
      }

      if (!responseResult) {
        throw new Error('AI response is null after retries.');
      }

      const { content, tool_calls } = responseResult;

      if (tool_calls && tool_calls.length > 0) {
        messages.push({ role: 'assistant', content: content || null, tool_calls });

        // 只处理第一个工具调用，以避免一次性执行多个工具
        const toolCall = tool_calls[0];
        const executor = toolExecutors[toolCall.function.name];
        if (executor) {
          try {
            const args = JSON.parse(toolCall.function.arguments);
            const result = await executor(args);
            messages.push({
              role: 'tool',
              tool_call_id: toolCall.id,
              content: result,
            });
          } catch (e) {
            console.error(`Error executing tool ${toolCall.function.name}:`, e);
            messages.push({
              role: 'tool',
              tool_call_id: toolCall.id,
              content: JSON.stringify({ error: `Error executing tool: ${e}` }),
            });
          }
        } else {
          messages.push({
            role: 'tool',
            tool_call_id: toolCall.id,
            content: JSON.stringify({ error: `Tool not found: ${toolCall.function.name}` }),
          });
        }
      } else {
        return { ...responseResult, content: content || '' };
      }
    }
    
    throw new Error('Exceeded maximum tool call limit.');
  }

  private async handleErrorResponse(response: Response): Promise<Error> {
    let errorDetails = '';
    try {
      const errorData = await response.json();
      errorDetails = errorData.error?.message || errorData.message || response.statusText;
    } catch {
      errorDetails = response.statusText;
    }
    const userFriendlyMessage = this.getErrorMessage(response.status);
    return new Error(`${userFriendlyMessage} (错误代码: ${response.status} - ${errorDetails})`);
  }

  private getErrorMessage(status: number): string {
    const messages: { [key: number]: string } = {
      400: '请求参数错误',
      401: 'API密钥无效或已过期',
      403: '访问被拒绝，请检查API权限',
      404: 'API端点不存在，请检查地址是否正确',
      429: '请求过于频繁，请稍等片刻或者更换模型重试',
      500: '服务器内部错误',
      502: '网关错误，服务暂时不可用',
      503: '服务暂时不可用',
      504: '请求超时，请稍后重试',
    };
    return messages[status] || (status >= 500 ? '服务器错误' : '请求失败');
  }

  private async handleStreamResponse(
    response: Response,
    onChunk: (chunk: string) => void
  ): Promise<AIResponse> {
    if (!response.body) {
      throw new Error('Response body is null');
    }
    
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let content: string | null = null;
    const toolCalls: ToolCall[] = [];
    let inThinkingState = false;
    let contentBuffer = '';
    let lastFlushTime = Date.now();
    const FLUSH_INTERVAL = 16; // 16ms刷新间隔（60fps）

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        // 批量处理lines，减少循环次数
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          if (line.trim() === '' || !line.startsWith('data: ')) continue;

          const data = line.slice(6).trim();
          if (data === '[DONE]') break;
          if (data === '') continue;

          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta;
            if (!delta) continue;

            if (delta.content) {
              if (inThinkingState) {
                inThinkingState = false;
                if (contentBuffer) {
                  onChunk(contentBuffer);
                  contentBuffer = '';
                }
                onChunk('');
              }
              contentBuffer += delta.content;
              content = (content || '') + delta.content;
            }

            if (delta.tool_calls) {
              if (!inThinkingState) {
                inThinkingState = true;
                if (contentBuffer) {
                  onChunk(contentBuffer);
                  contentBuffer = '';
                }
                onChunk('');
              }
              for (const toolCallChunk of delta.tool_calls) {
                const index = toolCallChunk.index;
                // 只处理和显示第一个工具调用
                if (index > 0) continue;

                if (!toolCalls[index]) {
                  toolCalls[index] = { id: '', type: 'function', function: { name: '', arguments: '' } };
                  if (toolCallChunk.id) toolCalls[index].id = toolCallChunk.id;
                  if (toolCallChunk.function?.name) {
                    toolCalls[index].function.name = toolCallChunk.function.name;
                    contentBuffer += `\n调用工具: ${toolCallChunk.function.name}...`;
                  }
                }
                if (toolCallChunk.function?.arguments) {
                  toolCalls[index].function.arguments += toolCallChunk.function.arguments;
                }
              }
            }

            const isThinking = 'reasoning_content' in delta;
            const reasoningChunk = delta.reasoning_content;
            if (reasoningChunk) {
              if (isThinking && !inThinkingState) {
                inThinkingState = true;
                if (contentBuffer) {
                  onChunk(contentBuffer);
                  contentBuffer = '';
                }
                onChunk('');
              }
              contentBuffer += reasoningChunk;
            }

            // 定期刷新缓冲区，提升响应速度
            const now = Date.now();
            if (now - lastFlushTime > FLUSH_INTERVAL && contentBuffer) {
              onChunk(contentBuffer);
              contentBuffer = '';
              lastFlushTime = now;
            }
          } catch (e) {
            console.debug('跳过非 JSON 数据:', data, e);
          }
        }
      }
      
      // 确保剩余缓冲区内容被刷新
      if (contentBuffer) {
        onChunk(contentBuffer);
      }
    } finally {
      reader.releaseLock();
    }

    if (inThinkingState) {
      onChunk('');
    }

    const result: AIResponse = { content };
    if (toolCalls.length > 0) {
      result.tool_calls = toolCalls;
    }
    return result;
  }

  // 链接多个Abort信号的辅助函数
  private linkSignals(...signals: (AbortSignal | undefined)[]): AbortSignal {
    const controller = new AbortController();
    for (const signal of signals) {
      if (signal) {
        if (signal.aborted) {
          controller.abort(signal.reason);
          return controller.signal;
        }
        signal.addEventListener('abort', () => controller.abort(signal.reason), {
          signal: controller.signal,
        });
      }
    }
    return controller.signal;
  }
}

export const AIService = AIServiceSingleton.getInstance();

export const generateAIResponse = (
  prompt: string,
  signal?: AbortSignal,
  onChunk?: (chunk: string) => void
) => {
  const messages: ChatMessage[] = [{ role: 'user', content: prompt }];
  return AIService.generateResponse(messages, signal, onChunk);
};

/**
 * 为追问获取AI见解
 * @param input 对话历史或追问提示字符串
 * @param onChunk 流式响应回调
 * @returns Promise<void>
 */
export function getAIInsight(
  input: ChatMessage[] | string,
  onChunk: (chunk: string) => void,
  onComplete: (content: string) => void,
  onError: (error: string) => void
): void {
  let messages: ChatMessage[];
  
  if (typeof input === 'string') {
    // 如果是完整的追问提示词，将其拆分为 system 和 user 消息
    const lines = input.split('\n');
    let systemContent = '';
    let userContent = '';
    let isInUserSection = false;
    
    for (const line of lines) {
      if (line.includes('用户追问：')) {
        isInUserSection = true;
        userContent += line + '\n';
      } else if (isInUserSection) {
        userContent += line + '\n';
      } else {
        systemContent += line + '\n';
      }
    }
    
    // 如果找到了用户追问部分，则拆分为 system 和 user 消息
    if (isInUserSection) {
      messages = [
        {
          role: 'system',
          content: systemContent.trim(),
        },
        {
          role: 'user',
          content: userContent.trim(),
        }
      ];
    } else {
      // 如果没有找到用户追问部分，作为普通用户消息处理
      messages = [
        {
          role: 'user',
          content: input,
        }
      ];
    }
  } else {
    // 如果是ChatMessage数组，使用原有的逻辑但限制历史长度
    const MAX_HISTORY_LENGTH = 10;
    messages = input.length > MAX_HISTORY_LENGTH
      ? [input[0], ...input.slice(-MAX_HISTORY_LENGTH)]
      : input;
  }

  AIService.generateResponse(messages, undefined, onChunk)
    .then(response => {
      onComplete(response.content || '');
    })
    .catch(err => {
      const errorMessage = err instanceof Error ? err.message : 'AI解读暂时不可用，请稍后重试。';
      onError(errorMessage);
    });
}

/**
 * AI处理：直接使用用户问题生成回答
 * @param originalQuestion 用户原始问题
 * @param promptGenerator 生成最终提示词的函数
 * @param data 占卜数据
 * @param signal 可选的AbortSignal
 * @param onChunk 流式响应回调
 * @returns Promise<AIResponse>
 */
export async function generateTwoStageAIResponse<T>(
  originalQuestion: string,
  promptGenerator: (question: string, data: T) => string,
  data: T,
  signal?: AbortSignal,
  onChunk?: (chunk: string) => void
): Promise<AIResponse> {
  try {
    // 直接使用原始问题生成最终回答
    const finalPrompt = promptGenerator(originalQuestion, data);
    const messages: ChatMessage[] = [{ role: 'user', content: finalPrompt }];
    
    const response = await AIService.generateResponse(messages, signal, onChunk);
    
    return response;
  } catch (error) {
    console.error('AI处理失败:', error);
    throw error;
  }
}

/**
 * 增强版AI处理：支持自定义system prompt
 * @param originalQuestion 用户原始问题
 * @param promptGenerator 生成最终提示词的函数
 * @param data 占卜数据
 * @param systemPrompt 自定义system prompt
 * @param signal 可选的AbortSignal
 * @param onChunk 流式响应回调
 * @returns Promise<AIResponse>
 */
export async function generateTwoStageAIResponseWithSystem<T>(
  originalQuestion: string,
  promptGenerator: (question: string, data: T) => string | Promise<string>,
  data: T,
  systemPrompt: string,
  signal?: AbortSignal,
  onChunk?: (chunk: string) => void,
  supplementaryInfo?: SupplementaryInfo
): Promise<AIResponse> {
  try {
    // 直接使用原始问题生成最终回答，并添加system prompt
    const finalPrompt = await promptGenerator(originalQuestion, data);
    const systemMessage: ChatMessage = {
      role: 'system',
      content: systemPrompt,
    };
    const userMessage: ChatMessage = {
      role: 'user',
      content: finalPrompt,
    };
    
    const response = await AIService.generateResponse([systemMessage, userMessage], signal, onChunk);
    
    return response;
  } catch (error) {
    console.error('增强版AI处理失败:', error);
    throw error;
  }
}