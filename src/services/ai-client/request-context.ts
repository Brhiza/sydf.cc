import type { ChatMessage } from '@/types';
import type { AITool, PreparedRequestContext } from './types';

export function prepareRequestContext(
  messages: ChatMessage[],
  availableTools: AITool[]
): PreparedRequestContext {
  if (availableTools.length === 0) {
    return { messages: [...messages] };
  }

  return {
    messages: [...messages],
    tools: availableTools,
    toolChoice: 'auto',
  };
}
