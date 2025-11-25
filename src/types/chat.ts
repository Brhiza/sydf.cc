/**
 * 聊天相关的TypeScript类型定义
 */

// 聊天角色类型
export type ChatRole = 'system' | 'user' | 'assistant' | 'tool';

// AI工具调用接口
export interface ToolCall {
  id: string;
  type: 'function';
  function: {
    name: string;
    arguments: string; // A JSON string of arguments
  };
}

// 聊天消息接口
export interface ChatMessage {
  id?: string;
  role: ChatRole;
  content: string | null; // 内容可以为null，当有工具调用时
  tool_calls?: ToolCall[];
  tool_call_id?: string;
}
