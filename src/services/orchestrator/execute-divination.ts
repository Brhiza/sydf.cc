import type { ChatMessage } from '@/types/chat';
import type {
  DivinationRequest,
  DivinationResult,
  LiuyaoData,
} from '@/types/divination';
import { dataGenerationService } from '../dataGenerationService';
import { historyService } from '../history';
import { handleError, logError, getUserFriendlyMessage } from '@/utils/error-handler';
import { createId } from '@/utils/id';
import { cloneSerializable } from '@/utils/clone';
import { getMonthDayFromDateKey } from '@/utils/date-formatter';
import { createThrottledSaver } from '@/utils/throttled-saver';
import {
  buildHistoryRecordSnapshot,
  buildHistoryResultSnapshot,
} from './history-snapshot';
import { handleChaoticLiuyao, isChaoticLiuyao } from './chaotic-liuyao';
import { generateAIInterpretation } from './ai-interpretation';

const PRIMARY_HISTORY_SAVE_INTERVAL = 1000;

export interface DivinationCallbacks {
  onInitialResult: (result: DivinationResult) => void;
  onAIChunk: (chunk: string) => void;
  onAIComplete: (finalResult: DivinationResult) => void;
  onAIError: (error: string) => void;
  onConversationUpdate: (history: ChatMessage[]) => void;
}

function resolveFinalQuestion(request: DivinationRequest): string {
  if (request.type !== 'daily') return request.question;
  const targetDate = request.supplementaryInfo?.date || new Date();
  const { month, day } = getMonthDayFromDateKey(targetDate);
  return `${month} 月 ${day} 日运势`;
}

function reportError(err: unknown, onAIError: (error: string) => void): void {
  const appError = handleError(err, '占卜流程失败');
  logError(appError, 'Divination Orchestrator');
  const userFriendlyMessage = getUserFriendlyMessage(appError);
  console.error('占卜流程失败:', err);
  onAIError(userFriendlyMessage);
}

export async function executeDivination(
  request: DivinationRequest,
  callbacks: DivinationCallbacks
): Promise<void> {
  const { type, question, spreadType, supplementaryInfo, signal } = request;
  const { onInitialResult, onAIChunk, onAIComplete, onAIError, onConversationUpdate } = callbacks;
  const normalizedSpreadType = type === 'tarot' ? spreadType || 'three' : spreadType;

  try {
    const data = await dataGenerationService.generateDivination(
      type,
      normalizedSpreadType,
      supplementaryInfo
    );

    const initialResult: DivinationResult = {
      id: createId(),
      type,
      data,
      aiResponse: '',
      ...(supplementaryInfo && { supplementaryInfo }),
    };

    const conversationHistory: ChatMessage[] = [
      { id: `msg-${Date.now()}`, role: 'user', content: question },
      { id: `msg-${Date.now() + 1}`, role: 'assistant', content: '' },
    ];

    const initialRecord = historyService.addRecord({
      id: initialResult.id,
      type,
      question: resolveFinalQuestion(request),
      result: buildHistoryResultSnapshot(initialResult),
      conversationHistory: cloneSerializable(conversationHistory),
    });

    onInitialResult(initialResult);
    onConversationUpdate([...conversationHistory]);

    if (isChaoticLiuyao(type, data)) {
      return handleChaoticLiuyao(
        data as LiuyaoData,
        initialResult,
        initialRecord,
        conversationHistory,
        onAIComplete,
        onConversationUpdate
      );
    }

    // 流式写盘采用节流避免高频 JSON 序列化阻塞界面
    const primarySaver = createThrottledSaver(PRIMARY_HISTORY_SAVE_INTERVAL, () => {
      historyService.updateRecord(
        initialRecord.id,
        buildHistoryRecordSnapshot(initialRecord, initialResult, conversationHistory)
      );
    });

    try {
      await generateAIInterpretation({
        type,
        question,
        data,
        supplementaryInfo,
        signal,
        conversationHistory,
        initialResult,
        onAIChunk,
        onAIComplete: (finalResult) => {
          historyService.updateRecord(
            initialRecord.id,
            buildHistoryRecordSnapshot(initialRecord, finalResult, conversationHistory)
          );
          onAIComplete(finalResult);
        },
        onConversationUpdate,
        onPartialHistoryUpdate: primarySaver.schedule,
      });
      primarySaver.flush();
    } catch (error) {
      primarySaver.flush();
      throw error;
    }
  } catch (err) {
    reportError(err, onAIError);
  }
}
