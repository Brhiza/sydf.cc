import type { ChatMessage } from '@/types';

const MAX_HISTORY_LENGTH = 10;
const USER_SECTION_MARKER = '用户追问：';

function splitPromptToMessages(input: string): ChatMessage[] {
  const lines = input.split('\n');
  let systemContent = '';
  let userContent = '';
  let inUserSection = false;

  for (const line of lines) {
    if (line.includes(USER_SECTION_MARKER)) {
      inUserSection = true;
    }
    if (inUserSection) {
      userContent += `${line}\n`;
    } else {
      systemContent += `${line}\n`;
    }
  }

  if (!inUserSection) {
    return [{ role: 'user', content: input }];
  }
  return [
    { role: 'system', content: systemContent.trim() },
    { role: 'user', content: userContent.trim() },
  ];
}

function truncateHistory(messages: ChatMessage[]): ChatMessage[] {
  if (messages.length <= MAX_HISTORY_LENGTH) {
    return messages;
  }
  return [messages[0], ...messages.slice(-MAX_HISTORY_LENGTH)];
}

export function buildInsightMessages(input: ChatMessage[] | string): ChatMessage[] {
  if (typeof input === 'string') {
    return splitPromptToMessages(input);
  }
  return truncateHistory(input);
}
