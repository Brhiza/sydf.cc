// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { LocationQueryRaw } from 'vue-router';
import { useDivinationUnified } from './useDivinationUnified';

describe('useDivinationUnified', () => {
  const mockGetRecord = vi.fn();
  const mockSendFollowUp = vi.fn();
  const mockPerformDivination = vi.fn();
  const mockPush = vi.fn();
  const mockReplace = vi.fn();
  const route = {
    path: '/divination/qimen',
    query: {} as LocationQueryRaw,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    route.query = {};
    mockGetRecord.mockReturnValue(undefined);
  });

  it('切到历史记录后，旧请求回调不应覆盖当前历史内容', async () => {
    let capturedCallbacks:
      | {
          onInitialResult: (result: { id: string; data: unknown; aiResponse?: string }) => void;
          onAIChunk: (chunk: string) => void;
          onAIComplete: (result: { aiResponse?: string }) => void;
          onAIError: (error: string) => void;
          onConversationUpdate: (history: unknown[]) => void;
        }
      | undefined;

    mockPerformDivination.mockImplementation(async (_request, callbacks) => {
      capturedCallbacks = callbacks;
    });

    mockGetRecord.mockReturnValue({
      id: 'history-1',
      question: '历史问题',
      result: {
        id: 'history-1',
        type: 'qimen',
        data: { jiuGongGe: [] },
        aiResponse: '历史解读',
      },
      conversationHistory: [{ role: 'assistant', content: '历史对话' }],
    });

    const divination = useDivinationUnified(
      { divinationType: 'qimen' },
      {
        route,
        router: {
          push: mockPush,
          replace: mockReplace,
        },
        historyService: {
          getRecord: mockGetRecord,
        },
        divinationService: {
          sendFollowUp: mockSendFollowUp,
        },
        performDivination: mockPerformDivination,
      }
    );

    divination.question.value = '新占卜';
    await divination.startDivination();

    expect(divination.isLoading.value).toBe(true);
    expect(divination.isAiLoading.value).toBe(true);

    divination.loadResultFromHistory('history-1');

    capturedCallbacks?.onInitialResult({
      id: 'live-1',
      data: { jiuGongGe: [{ gong: 1 }] },
      aiResponse: '',
    });
    capturedCallbacks?.onAIChunk('被忽略的流式内容');
    capturedCallbacks?.onConversationUpdate([{ role: 'assistant', content: '新回调' }]);
    capturedCallbacks?.onAIComplete({ aiResponse: '被忽略的最终解读' });

    expect(divination.result.value?.id).toBe('history-1');
    expect(divination.aiResponse.value).toBe('历史解读');
    expect(divination.conversationHistory.value).toEqual([
      { role: 'assistant', content: '历史对话' },
    ]);
    expect(divination.isLoading.value).toBe(false);
    expect(divination.isAiLoading.value).toBe(false);
  });

  it('当前页首轮 AI 失败后应把错误写入助手消息，保证可以继续重试', async () => {
    let capturedCallbacks:
      | {
          onInitialResult: (result: { id: string; data: unknown; aiResponse?: string }) => void;
          onAIChunk: (chunk: string) => void;
          onAIComplete: (result: { aiResponse?: string }) => void;
          onAIError: (error: string) => void;
          onConversationUpdate: (history: { role: string; content: string }[]) => void;
        }
      | undefined;

    mockPerformDivination.mockImplementation(async (_request, callbacks) => {
      capturedCallbacks = callbacks;
    });

    const mockUpdateRecord = vi.fn();

    const divination = useDivinationUnified(
      { divinationType: 'qimen' },
      {
        route,
        router: {
          push: mockPush,
          replace: mockReplace,
        },
        historyService: {
          getRecord: mockGetRecord,
          updateRecord: mockUpdateRecord,
        },
        divinationService: {
          sendFollowUp: mockSendFollowUp,
        },
        performDivination: mockPerformDivination,
      }
    );

    divination.question.value = '这次合作是否顺利？';
    await divination.startDivination();

    capturedCallbacks?.onInitialResult({
      id: 'live-1',
      data: { jiuGongGe: [] },
      aiResponse: '',
    });
    capturedCallbacks?.onConversationUpdate([
      { role: 'user', content: '这次合作是否顺利？' },
      { role: 'assistant', content: '' },
    ]);
    capturedCallbacks?.onAIError('抱歉，AI服务暂时不可用，请稍后重试。');

    expect(divination.error.value).toBe('抱歉，AI服务暂时不可用，请稍后重试。');
    expect(divination.conversationHistory.value).toMatchObject([
      { role: 'user', content: '这次合作是否顺利？' },
      { role: 'assistant', content: '抱歉，AI服务暂时不可用，请稍后重试。' },
    ]);
    expect(mockUpdateRecord).toHaveBeenCalledWith(
      'live-1',
      expect.objectContaining({
        result: expect.objectContaining({
          aiResponse: '抱歉，AI服务暂时不可用，请稍后重试。',
        }),
        conversationHistory: expect.arrayContaining([
          expect.objectContaining({ role: 'user', content: '这次合作是否顺利？' }),
          expect.objectContaining({
            role: 'assistant',
            content: '抱歉，AI服务暂时不可用，请稍后重试。',
          }),
        ]),
      })
    );
  });

  it('找不到历史记录时会回退到当前占卜路由', () => {
    mockGetRecord.mockReturnValue(undefined);

    const divination = useDivinationUnified(
      { divinationType: 'qimen' },
      {
        route,
        router: {
          push: mockPush,
          replace: mockReplace,
        },
        historyService: {
          getRecord: mockGetRecord,
        },
        divinationService: {
          sendFollowUp: mockSendFollowUp,
        },
        performDivination: mockPerformDivination,
      }
    );

    divination.loadResultFromHistory('missing');

    expect(mockPush).toHaveBeenCalledWith('/divination/qimen');
    expect(divination.viewingHistory.value).toBe(false);
  });

  it('清理历史参数时会移除 historyId', () => {
    route.query = {
      historyId: 'history-1',
      foo: 'bar',
    };

    const divination = useDivinationUnified(
      { divinationType: 'qimen' },
      {
        route,
        router: {
          push: mockPush,
          replace: mockReplace,
        },
        historyService: {
          getRecord: mockGetRecord,
        },
        divinationService: {
          sendFollowUp: mockSendFollowUp,
        },
        performDivination: mockPerformDivination,
      }
    );

    divination.clearHistoryParam();

    expect(mockReplace).toHaveBeenCalledWith({
      path: '/divination/qimen',
      query: { foo: 'bar' },
    });
  });

  it('重新生成解读时应复用当前结果，不再重新执行整次占卜', async () => {
    const mockGenerateRegeneratedAI = vi.fn().mockResolvedValue({
      aiResponse: '新的解读',
      conversationHistory: [
        { role: 'user', content: '新占卜' },
        { role: 'assistant', content: '新的解读' },
      ],
      target: 'primary',
    });

    const divination = useDivinationUnified(
      { divinationType: 'qimen' },
      {
        route,
        router: {
          push: mockPush,
          replace: mockReplace,
        },
        historyService: {
          getRecord: mockGetRecord,
        },
        divinationService: {
          sendFollowUp: mockSendFollowUp,
        },
        performDivination: mockPerformDivination,
        generateRegeneratedAI: mockGenerateRegeneratedAI,
      }
    );

    divination.question.value = '新占卜';
    divination.result.value = {
      id: 'record-1',
      type: 'qimen',
      data: {
        jiuGongGe: [],
        ganzhi: { year: '甲子', month: '乙丑', day: '丙寅', hour: '丁卯' },
        isYangDun: true,
        juShu: 1,
        zhiFu: '天心',
        zhiShi: '开门',
        timeInfo: { solarTerm: '春分', epoch: '上元' },
        timestamp: Date.now(),
      },
      aiResponse: '旧解读',
    };
    divination.aiResponse.value = '旧解读';
    mockGetRecord.mockReturnValue({
      id: 'record-1',
      type: 'qimen',
      question: '新占卜',
      result: {
        type: 'qimen',
        data: divination.result.value.data,
        aiResponse: '旧解读',
      },
      conversationHistory: [{ role: 'assistant', content: '旧解读' }],
    });

    await divination.regenerateAI();

    expect(mockPerformDivination).not.toHaveBeenCalled();
    expect(mockGenerateRegeneratedAI).toHaveBeenCalledTimes(1);
    expect(divination.aiResponse.value).toBe('新的解读');
    expect(divination.conversationHistory.value).toEqual([
      { role: 'user', content: '新占卜' },
      { role: 'assistant', content: '新的解读' },
    ]);
  });

  it('指定消息重新生成时应走按消息重生逻辑', async () => {
    const mockGenerateRegeneratedAI = vi.fn();
    const mockRegenerateConversationMessage = vi.fn().mockResolvedValue({
      aiResponse: '主解读',
      conversationHistory: [
        { id: 'user-1', role: 'user', content: '新占卜' },
        { id: 'assistant-1', role: 'assistant', content: '主解读' },
        { id: 'user-2', role: 'user', content: '还有什么要注意？' },
        { id: 'assistant-2', role: 'assistant', content: '新的追问解读' },
      ],
      target: 'follow_up',
    });

    const divination = useDivinationUnified(
      { divinationType: 'qimen' },
      {
        route,
        router: {
          push: mockPush,
          replace: mockReplace,
        },
        historyService: {
          getRecord: mockGetRecord,
        },
        divinationService: {
          sendFollowUp: mockSendFollowUp,
        },
        performDivination: mockPerformDivination,
        generateRegeneratedAI: mockGenerateRegeneratedAI,
        regenerateConversationMessage: mockRegenerateConversationMessage,
      }
    );

    divination.question.value = '新占卜';
    divination.result.value = {
      id: 'record-1',
      type: 'qimen',
      data: {
        jiuGongGe: [],
        ganzhi: { year: '甲子', month: '乙丑', day: '丙寅', hour: '丁卯' },
        isYangDun: true,
        juShu: 1,
        zhiFu: '天心',
        zhiShi: '开门',
        timeInfo: { solarTerm: '春分', epoch: '上元' },
        timestamp: Date.now(),
      },
      aiResponse: '主解读',
    };
    divination.aiResponse.value = '主解读';
    divination.conversationHistory.value = [
      { id: 'user-1', role: 'user', content: '新占卜' },
      { id: 'assistant-1', role: 'assistant', content: '主解读' },
      { id: 'user-2', role: 'user', content: '还有什么要注意？' },
      { id: 'assistant-2', role: 'assistant', content: '旧追问解读' },
    ];
    mockGetRecord.mockReturnValue({
      id: 'record-1',
      type: 'qimen',
      question: '新占卜',
      result: {
        type: 'qimen',
        data: divination.result.value.data,
        aiResponse: '主解读',
      },
      conversationHistory: divination.conversationHistory.value,
      timestamp: Date.now(),
      summary: '奇门',
    });

    await divination.regenerateAI({
      displayedIndex: 3,
      messageId: 'assistant-2',
    });

    expect(mockGenerateRegeneratedAI).not.toHaveBeenCalled();
    expect(mockRegenerateConversationMessage).toHaveBeenCalledWith(
      expect.any(Object),
      { displayedIndex: 3, messageId: 'assistant-2' },
      expect.any(Object)
    );
    expect(divination.aiResponse.value).toBe('主解读');
    expect(divination.conversationHistory.value.at(-1)?.content).toBe('新的追问解读');
  });
});
