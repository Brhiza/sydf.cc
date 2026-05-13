import type { ChatMessage } from '@/types/chat';
import { aiService } from '../aiService';
import { historyService } from '../history';
import { cloneSerializable } from '@/utils/clone';
import { handleError, logError, getUserFriendlyMessage } from '@/utils/error-handler';
import { createThrottledSaver } from '@/utils/throttled-saver';
import { buildHistoryRecordSnapshot } from './history-snapshot';

const FOLLOW_UP_HISTORY_SAVE_INTERVAL = 1000;

export interface FollowUpCallbacks {
  onChunk: (chunk: string) => void;
  onComplete: () => void;
  onError: (error: string) => void;
  onConversationUpdate: (history: ChatMessage[]) => void;
}

function reportFollowUpError(err: unknown, onError: (error: string) => void): void {
  const appError = handleError(err, '占卜流程失败');
  logError(appError, 'Divination Orchestrator');
  console.error('占卜流程失败:', err);
  onError(getUserFriendlyMessage(appError));
}

export async function sendFollowUp(
  resultId: string,
  conversationHistory: ChatMessage[],
  followUpQuestion: string,
  callbacks: FollowUpCallbacks
): Promise<void> {
  try {
    const record = historyService.getRecord(resultId);
    let latestConversationHistory: ChatMessage[] | null = null;

    const followUpSaver = createThrottledSaver(FOLLOW_UP_HISTORY_SAVE_INTERVAL, () => {
      if (!record || !latestConversationHistory) return;
      historyService.updateRecord(
        resultId,
        buildHistoryRecordSnapshot(
          record,
          {
            type: record.result.type,
            data: record.result.data,
            aiResponse: record.result.aiResponse || '',
            supplementaryInfo: record.result.supplementaryInfo,
          },
          latestConversationHistory
        )
      );
    });

    const wrappedCallbacks: FollowUpCallbacks = {
      ...callbacks,
      onConversationUpdate: (updatedHistory) => {
        callbacks.onConversationUpdate(updatedHistory);
        // 流式输出高频触发,本地持久化节流执行,避免 JSON 序列化阻塞界面
        latestConversationHistory = cloneSerializable(updatedHistory);
        followUpSaver.schedule();
      },
      onComplete: () => {
        followUpSaver.flush();
        callbacks.onComplete();
      },
      onError: (error) => {
        followUpSaver.flush();
        callbacks.onError(error);
      },
    };

    const context = {
      originalQuestion: record?.question || '',
      originalResponse: record?.result.aiResponse || '',
      divinationType: record?.type || 'liuyao',
      originalData: record?.result.data || null,
      supplementaryInfo: record?.result.supplementaryInfo || null,
    };

    await aiService.handleFollowUp(conversationHistory, followUpQuestion, wrappedCallbacks, context);
  } catch (err) {
    reportFollowUpError(err, callbacks.onError);
  }
}
