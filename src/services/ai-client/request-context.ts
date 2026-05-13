import type { ChatMessage } from '@/types';
import {
  extractUserIntentText,
  resolveGanzhiQueryContext,
  shouldEnableGanzhiTools,
} from '../tools';
import type { AITool, PreparedRequestContext } from './types';

function insertSystemMessage(
  messages: ChatMessage[],
  supplementalMessage: ChatMessage
): ChatMessage[] {
  const insertIndex = messages.findIndex((message) => message.role !== 'system');
  if (insertIndex === -1) {
    return [...messages, supplementalMessage];
  }
  return [
    ...messages.slice(0, insertIndex),
    supplementalMessage,
    ...messages.slice(insertIndex),
  ];
}

function findLatestUserText(messages: ChatMessage[]): string | undefined {
  const latestUser = [...messages]
    .reverse()
    .find((message) => message.role === 'user' && typeof message.content === 'string');
  return typeof latestUser?.content === 'string' ? latestUser.content : undefined;
}

export function prepareRequestContext(
  messages: ChatMessage[],
  availableTools: AITool[]
): PreparedRequestContext {
  const intentText = extractUserIntentText(findLatestUserText(messages));
  const localGanzhiContext = resolveGanzhiQueryContext(intentText);

  if (localGanzhiContext) {
    const supplementalMessage: ChatMessage = {
      role: 'system',
      content: [
        '以下补充时间信息已经由程序精确计算，和用户当前问题直接相关。',
        '你必须优先使用这些信息作答，不要再次调用任何时间或干支工具。',
        '',
        localGanzhiContext.message,
      ].join('\n'),
    };
    return {
      messages: insertSystemMessage(messages, supplementalMessage),
    };
  }

  if (shouldEnableGanzhiTools(intentText)) {
    return {
      messages: [...messages],
      tools: availableTools,
      toolChoice: 'auto',
    };
  }

  return { messages: [...messages] };
}
