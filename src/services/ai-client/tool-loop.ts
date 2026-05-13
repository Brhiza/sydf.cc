import type { ChatMessage } from '@/types';
import { toolExecutors } from '../tools';
import { sendRequestWithRetry } from './request-executor';
import type { AIResponse, OpenAIRequestBody, PreparedRequestContext } from './types';

const MAX_TOOL_CALLS = 3;

async function executeToolCall(
  toolCall: NonNullable<AIResponse['tool_calls']>[number]
): Promise<ChatMessage> {
  const executor = toolExecutors[toolCall.function.name];
  if (!executor) {
    return {
      role: 'tool',
      tool_call_id: toolCall.id,
      content: JSON.stringify({ error: `Tool not found: ${toolCall.function.name}` }),
    };
  }
  try {
    const args = JSON.parse(toolCall.function.arguments);
    const result = await executor(args);
    return { role: 'tool', tool_call_id: toolCall.id, content: result };
  } catch (e) {
    console.error(`Error executing tool ${toolCall.function.name}:`, e);
    return {
      role: 'tool',
      tool_call_id: toolCall.id,
      content: JSON.stringify({ error: `Error executing tool: ${e}` }),
    };
  }
}

export interface ToolLoopOptions {
  endpoint: string;
  apiKey?: string;
  model: string;
  messages: ChatMessage[];
  prepared: PreparedRequestContext;
  signal?: AbortSignal;
  onChunk?: (chunk: string) => void;
}

export async function runToolLoop({
  endpoint,
  apiKey,
  model,
  messages,
  prepared,
  signal,
  onChunk,
}: ToolLoopOptions): Promise<AIResponse> {
  const workingMessages = [...messages];

  for (let i = 0; i < MAX_TOOL_CALLS; i++) {
    const body: OpenAIRequestBody = {
      model,
      messages: workingMessages,
      max_tokens: 8192,
      stream: !!onChunk,
    };
    if (prepared.tools) body.tools = prepared.tools;
    if (prepared.toolChoice) body.tool_choice = prepared.toolChoice;

    const responseResult = await sendRequestWithRetry({
      endpoint,
      apiKey,
      body,
      signal,
      onChunk,
    });

    const { content, tool_calls } = responseResult;

    if (!tool_calls || tool_calls.length === 0) {
      return { ...responseResult, content: content || '' };
    }

    workingMessages.push({ role: 'assistant', content: content || null, tool_calls });
    // 只处理第一个工具调用，以避免一次性执行多个工具
    workingMessages.push(await executeToolCall(tool_calls[0]));
  }

  throw new Error('Exceeded maximum tool call limit.');
}
