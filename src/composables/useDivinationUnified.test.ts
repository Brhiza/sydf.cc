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
      type: 'qimen',
      question: '历史问题',
      result: {
        id: 'history-1',
        type: 'qimen',
        data: { jiuGongGe: [] },
        aiResponse: '历史解读',
      },
      conversationHistory: [{ role: 'assistant', content: '历史对话' }],
      timestamp: 1,
      summary: '历史问题',
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

  it('历史记录类型与当前页面不匹配时不应错误加载到当前结果页', () => {
    mockGetRecord.mockReturnValue({
      id: 'history-tarot-1',
      type: 'tarot',
      question: '这段关系会如何？',
      result: {
        type: 'tarot',
        data: {
          cards: [],
        },
        aiResponse: '塔罗解读',
      },
      conversationHistory: [{ role: 'assistant', content: '塔罗对话' }],
      timestamp: 1,
      summary: '塔罗',
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

    divination.loadResultFromHistory('history-tarot-1');

    expect(divination.result.value).toBeNull();
    expect(divination.aiResponse.value).toBe('');
    expect(divination.viewingHistory.value).toBe(false);
    expect(mockPush).toHaveBeenCalledWith('/divination/qimen');
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

  it('重试追问消息时不应清空主解读内容', async () => {
    let resolveRetry:
      | ((value: {
          aiResponse: string;
          conversationHistory: {
            id: string;
            role: 'user' | 'assistant';
            content: string;
          }[];
          target: 'follow_up';
        }) => void)
      | undefined;

    const mockRegenerateConversationMessage = vi.fn().mockImplementation(
      (_record, _target, options) =>
        new Promise((resolve) => {
          options.onChunk?.('新的追问片段');
          options.onConversationUpdate?.([
            { id: 'user-1', role: 'user', content: '新占卜' },
            { id: 'assistant-1', role: 'assistant', content: '主解读' },
            { id: 'user-2', role: 'user', content: '还有什么要注意？' },
            { id: 'assistant-2', role: 'assistant', content: '新的追问片段' },
          ]);
          resolveRetry = resolve;
        })
    );

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

    const retryPromise = divination.regenerateAI({
      displayedIndex: 3,
      messageId: 'assistant-2',
    });
    await Promise.resolve();

    expect(divination.aiResponse.value).toBe('主解读');
    expect(divination.result.value?.aiResponse).toBe('主解读');

    resolveRetry?.({
      aiResponse: '主解读',
      conversationHistory: [
        { id: 'user-1', role: 'user', content: '新占卜' },
        { id: 'assistant-1', role: 'assistant', content: '主解读' },
        { id: 'user-2', role: 'user', content: '还有什么要注意？' },
        { id: 'assistant-2', role: 'assistant', content: '新的追问解读' },
      ],
      target: 'follow_up',
    });
    await retryPromise;

    expect(divination.aiResponse.value).toBe('主解读');
    expect(divination.conversationHistory.value.at(-1)?.content).toBe('新的追问解读');
  });

  it('重试首轮助手消息时应继续流式回填主解读', async () => {
    const mockRegenerateConversationMessage = vi.fn().mockImplementation(async (_record, _target, options) => {
      options.onChunk?.('新的');
      options.onConversationUpdate?.([
        { id: 'user-1', role: 'user', content: '新占卜' },
        { id: 'assistant-1', role: 'assistant', content: '新的' },
      ]);

      return {
        aiResponse: '新的解读',
        conversationHistory: [
          { id: 'user-1', role: 'user', content: '新占卜' },
          { id: 'assistant-1', role: 'assistant', content: '新的解读' },
        ],
        target: 'primary' as const,
      };
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
      aiResponse: '旧解读',
    };
    divination.aiResponse.value = '旧解读';
    divination.conversationHistory.value = [
      { id: 'user-1', role: 'user', content: '新占卜' },
      { id: 'assistant-1', role: 'assistant', content: '旧解读' },
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
        aiResponse: '旧解读',
      },
      conversationHistory: divination.conversationHistory.value,
      timestamp: Date.now(),
      summary: '奇门',
    });

    await divination.regenerateAI({
      displayedIndex: 1,
      messageId: 'assistant-1',
    });

    expect(divination.aiResponse.value).toBe('新的解读');
    expect(divination.result.value?.aiResponse).toBe('新的解读');
    expect(mockRegenerateConversationMessage).toHaveBeenCalledWith(
      expect.any(Object),
      { displayedIndex: 1, messageId: 'assistant-1' },
      expect.objectContaining({
        onChunk: expect.any(Function),
        onConversationUpdate: expect.any(Function),
      })
    );
  });

  it('历史记录被外部删除后刷新时应退出历史上下文并清空旧结果', () => {
    route.query = {
      historyId: 'history-1',
    };

    mockGetRecord.mockReturnValueOnce({
      id: 'history-1',
      type: 'qimen',
      question: '历史问题',
      result: {
        type: 'qimen',
        data: { jiuGongGe: [] },
        aiResponse: '历史解读',
      },
      conversationHistory: [{ role: 'assistant', content: '历史对话' }],
      timestamp: 1,
      summary: '历史问题',
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

    divination.loadResultFromHistory('history-1');
    expect(divination.result.value?.id).toBe('history-1');

    mockGetRecord.mockReturnValue(undefined);
    divination.refreshHistoryState();

    expect(divination.result.value).toBeNull();
    expect(divination.aiResponse.value).toBe('');
    expect(divination.conversationHistory.value).toEqual([]);
    expect(divination.viewingHistory.value).toBe(false);
    expect(mockReplace).toHaveBeenCalledWith({
      path: '/divination/qimen',
      query: {},
    });
  });

  it('历史记录被外部改写后刷新时应同步当前展示内容', () => {
    route.query = {
      historyId: 'history-1',
    };

    mockGetRecord.mockReturnValueOnce({
      id: 'history-1',
      type: 'qimen',
      question: '旧问题',
      result: {
        type: 'qimen',
        data: { jiuGongGe: [{ gong: 1 }] },
        aiResponse: '旧解读',
      },
      conversationHistory: [{ role: 'assistant', content: '旧对话' }],
      timestamp: 1,
      summary: '旧问题',
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

    divination.loadResultFromHistory('history-1');

    mockGetRecord.mockReturnValue({
      id: 'history-1',
      type: 'qimen',
      question: '新问题',
      result: {
        type: 'qimen',
        data: { jiuGongGe: [{ gong: 9 }] },
        aiResponse: '新解读',
      },
      conversationHistory: [{ role: 'assistant', content: '新对话' }],
      timestamp: 2,
      summary: '新问题',
    });

    divination.refreshHistoryState();

    expect(divination.question.value).toBe('新问题');
    expect(divination.aiResponse.value).toBe('新解读');
    expect(divination.conversationHistory.value).toEqual([
      { role: 'assistant', content: '新对话' },
    ]);
    expect(divination.result.value?.data).toEqual({
      jiuGongGe: [{ gong: 9 }],
    });
  });
});
