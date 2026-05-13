import type { ChatMessage, ToolCall } from '@/types';

export interface AITool {
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

export interface OpenAIRequestBody {
  model: string;
  messages: ChatMessage[];
  max_tokens?: number;
  temperature?: number;
  stream: boolean;
  tools?: AITool[];
  tool_choice?: 'auto' | 'none' | { type: 'function'; function: { name: string } };
}

export interface PreparedRequestContext {
  messages: ChatMessage[];
  tools?: AITool[];
  toolChoice?: OpenAIRequestBody['tool_choice'];
}

export interface AIResponse {
  content: string | null;
  tool_calls?: ToolCall[];
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}
