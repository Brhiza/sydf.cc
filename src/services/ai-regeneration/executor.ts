import type { ChatMessage, ChatMessageRetryTarget } from '@/types/chat';
import { isPrimaryConversationRetryTarget } from '@/utils/conversation-history';
import type { AIRegenerationRecord, RegeneratedAIResult } from './types';
import type { generateRegeneratedAI, regenerateConversationMessage } from './regenerate';

type GenerateRegeneratedAI = typeof generateRegeneratedAI;
type RegenerateConversationMessage = typeof regenerateConversationMessage;

export type AIRegenerationExecutionResult =
  | { status: 'completed'; regenerated: RegeneratedAIResult }
  | { status: 'failed'; errorMessage: string }
  | { status: 'cancelled' }
  | { status: 'stale' };

export interface ExecuteAIRegenerationOptions {
  record: AIRegenerationRecord;
  target?: ChatMessageRetryTarget;
  signal?: AbortSignal;
  shouldSyncPrimaryResponse: boolean;
  generateRegeneratedAI: GenerateRegeneratedAI;
  regenerateConversationMessage: RegenerateConversationMessage;
  isStale?: () => boolean;
  isCancelled?: () => boolean;
  onPrimaryChunk?: (chunk: string) => void;
  onConversationUpdate?: (history: ChatMessage[]) => void;
  fallbackErrorMessage?: string;
}

export function shouldSyncPrimaryRegenerationResponse(
  record: AIRegenerationRecord,
  target?: ChatMessageRetryTarget
): boolean {
  return (
    !target ||
    isPrimaryConversationRetryTarget(record.type, record.conversationHistory || [], target)
  );
}

export async function executeAIRegeneration(
  options: ExecuteAIRegenerationOptions
): Promise<AIRegenerationExecutionResult> {
  const isStale = () => options.isStale?.() ?? false;

  try {
    const regenerationOptions = {
      signal: options.signal,
      onChunk: (chunk: string) => {
        if (isStale() || !options.shouldSyncPrimaryResponse) return;
        options.onPrimaryChunk?.(chunk);
      },
      onConversationUpdate: (history: ChatMessage[]) => {
        if (isStale()) return;
        options.onConversationUpdate?.(history);
      },
    };

    const regenerated = options.target
      ? await options.regenerateConversationMessage(
          options.record,
          options.target,
          regenerationOptions
        )
      : await options.generateRegeneratedAI(options.record, regenerationOptions);

    if (isStale()) {
      return { status: 'stale' };
    }

    return { status: 'completed', regenerated };
  } catch (error) {
    if (isStale()) {
      return { status: 'stale' };
    }

    if (options.isCancelled?.()) {
      return { status: 'cancelled' };
    }

    return {
      status: 'failed',
      errorMessage:
        error instanceof Error
          ? error.message
          : options.fallbackErrorMessage || '重新生成失败，请稍后重试',
    };
  }
}
