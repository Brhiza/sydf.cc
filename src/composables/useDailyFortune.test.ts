// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import { useDailyFortune } from './useDailyFortune';
import { hasVisibleDailyConversation } from './useDailyFortune.shared';

vi.hoisted(() => {
  const store = new Map<string, string>();
  const storage: Storage = {
    get length() {
      return store.size;
    },
    clear() {
      store.clear();
    },
    getItem(key: string) {
      return store.has(key) ? store.get(key)! : null;
    },
    key(index: number) {
      return Array.from(store.keys())[index] ?? null;
    },
    removeItem(key: string) {
      store.delete(key);
    },
    setItem(key: string, value: string) {
      store.set(key, String(value));
    },
  };

  Object.defineProperty(globalThis, 'localStorage', {
    value: storage,
    configurable: true,
    writable: true,
  });
});

describe('useDailyFortune', () => {
  const mockStartDivination = vi.fn();
  const mockSendFollowUp = vi.fn();
  const mockGetDailyFortuneForDate = vi.fn();
  const mockGetRecord = vi.fn();
  const mockUpdateRecord = vi.fn();
  const mockDeleteRecord = vi.fn();
  const mockFindTodayDailyFortune = vi.fn();
  const mockHasUsedToday = vi.fn();
  const mockMarkAsUsed = vi.fn();
  const mockResetRecord = vi.fn();
  const mockCleanupExpiredRecord = vi.fn();
  const mockGenerateRegeneratedAI = vi.fn();
  const mockRegenerateConversationMessage = vi.fn();
  const mockReplace = vi.fn();
  const confirmMock = vi.fn();
  const alertMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
    mockGetDailyFortuneForDate.mockReturnValue(undefined);
    mockGetRecord.mockReturnValue(undefined);
    mockHasUsedToday.mockReturnValue(false);
    mockGenerateRegeneratedAI.mockResolvedValue({
      aiResponse: '重新生成后的今日运势解读',
      conversationHistory: [
        { id: 'user-regenerated', role: 'user', content: '请为我分析2026-03-25的运势' },
        { id: 'assistant-regenerated', role: 'assistant', content: '重新生成后的今日运势解读' },
      ],
      target: 'primary',
    });
    mockRegenerateConversationMessage.mockReset();
    mockReplace.mockReset();
    confirmMock.mockReturnValue(true);
    vi.stubGlobal('confirm', confirmMock);
    vi.stubGlobal('alert', alertMock);
    localStorage.clear();
  });

  it('发起今日运势时应向占卜服务传递 AbortSignal', async () => {
    mockStartDivination.mockResolvedValue(undefined);

    const dailyFortune = useDailyFortune({
      route: { query: {} },
      divinationService: {
        startDivination: mockStartDivination,
        sendFollowUp: mockSendFollowUp,
      },
      historyService: {
        getRecord: mockGetRecord,
        getDailyFortuneForDate: mockGetDailyFortuneForDate,
        updateRecord: mockUpdateRecord,
        deleteRecord: mockDeleteRecord,
        findTodayDailyFortune: mockFindTodayDailyFortune,
      },
      dailyLimitService: {
        hasUsedToday: mockHasUsedToday,
        markAsUsed: mockMarkAsUsed,
        resetRecord: mockResetRecord,
        cleanupExpiredRecord: mockCleanupExpiredRecord,
      },
      isDevMode: false,
    });

    await dailyFortune.startDailyFortune();

    expect(mockStartDivination).toHaveBeenCalledTimes(1);
    expect(mockStartDivination).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'daily',
        signal: expect.any(AbortSignal),
      }),
      expect.any(Object)
    );
  });

  it('取消生成后，后续错误回调不应污染页面错误状态', async () => {
    let capturedCallbacks:
      | {
          onInitialResult: (result: { data: unknown }) => void;
          onAIChunk: (chunk: string) => void;
          onAIComplete: (result: { aiResponse?: string }) => void;
          onAIError: (error: string) => void;
          onConversationUpdate: (history: unknown[]) => void;
        }
      | undefined;

    mockStartDivination.mockImplementation(async (_request, callbacks) => {
      capturedCallbacks = callbacks;
    });

    const dailyFortune = useDailyFortune({
      route: { query: {} },
      divinationService: {
        startDivination: mockStartDivination,
        sendFollowUp: mockSendFollowUp,
      },
      historyService: {
        getRecord: mockGetRecord,
        getDailyFortuneForDate: mockGetDailyFortuneForDate,
        updateRecord: mockUpdateRecord,
        deleteRecord: mockDeleteRecord,
        findTodayDailyFortune: mockFindTodayDailyFortune,
      },
      dailyLimitService: {
        hasUsedToday: mockHasUsedToday,
        markAsUsed: mockMarkAsUsed,
        resetRecord: mockResetRecord,
        cleanupExpiredRecord: mockCleanupExpiredRecord,
      },
      isDevMode: false,
    });

    await dailyFortune.startDailyFortune();

    dailyFortune.cancelGeneration();

    capturedCallbacks?.onAIError('网络连接出现问题，请检查网络设置后重试');
    await nextTick();

    expect(dailyFortune.isCancelled.value).toBe(true);
    expect(dailyFortune.isAILoading.value).toBe(false);
    expect(dailyFortune.error.value).toBeNull();
  });

  it('带 historyId 进入时应优先加载对应的今日运势历史记录', async () => {
    mockGetRecord.mockReturnValue({
      id: 'history-daily-1',
      type: 'daily',
      question: '3 月 25 日运势',
      result: {
        type: 'daily',
        data: { date: '2026-03-25' },
        aiResponse: '历史中的今日运势解读',
      },
      conversationHistory: [
        { id: 'user-1', role: 'user', content: '请为我分析今日运势' },
        { id: 'assistant-1', role: 'assistant', content: '历史中的今日运势解读' },
      ],
      timestamp: 1,
      summary: '3 月 25 日运势',
    });

    const dailyFortune = useDailyFortune({
      route: { query: { historyId: 'history-daily-1' } },
      divinationService: {
        startDivination: mockStartDivination,
        sendFollowUp: mockSendFollowUp,
      },
      historyService: {
        getRecord: mockGetRecord,
        getDailyFortuneForDate: mockGetDailyFortuneForDate,
        updateRecord: mockUpdateRecord,
        deleteRecord: mockDeleteRecord,
        findTodayDailyFortune: mockFindTodayDailyFortune,
      },
      dailyLimitService: {
        hasUsedToday: mockHasUsedToday,
        markAsUsed: mockMarkAsUsed,
        resetRecord: mockResetRecord,
        cleanupExpiredRecord: mockCleanupExpiredRecord,
      },
      isDevMode: false,
    });

    await nextTick();

    expect(mockGetRecord).toHaveBeenCalledWith('history-daily-1');
    expect(dailyFortune.result.value).toEqual({ date: '2026-03-25' });
    expect(dailyFortune.aiResponse.value).toBe('历史中的今日运势解读');
    expect(dailyFortune.conversationHistory.value).toHaveLength(2);
    expect(dailyFortune.selectedDate.value).toBe('2026-03-25');
  });

  it('带无效 historyId 进入时应退出错误的历史上下文', async () => {
    mockGetRecord.mockReturnValue(undefined);
    mockGetDailyFortuneForDate.mockReturnValue(undefined);

    const dailyFortune = useDailyFortune({
      route: {
        path: '/divination/daily',
        query: { historyId: 'missing-history' },
      },
      router: {
        replace: mockReplace,
      },
      divinationService: {
        startDivination: mockStartDivination,
        sendFollowUp: mockSendFollowUp,
      },
      historyService: {
        getRecord: mockGetRecord,
        getDailyFortuneForDate: mockGetDailyFortuneForDate,
        updateRecord: mockUpdateRecord,
        deleteRecord: mockDeleteRecord,
        findTodayDailyFortune: mockFindTodayDailyFortune,
      },
      dailyLimitService: {
        hasUsedToday: mockHasUsedToday,
        markAsUsed: mockMarkAsUsed,
        resetRecord: mockResetRecord,
        cleanupExpiredRecord: mockCleanupExpiredRecord,
      },
      isDevMode: false,
    });

    await nextTick();

    expect(dailyFortune.result.value).toBeNull();
    expect(mockReplace).toHaveBeenCalledWith({
      path: '/divination/daily',
      query: {},
    });
  });

  it('今日运势首轮 AI 失败后应保留可见的助手错误消息，便于重新生成', async () => {
    let capturedCallbacks:
      | {
          onInitialResult: (result: { data: unknown }) => void;
          onAIChunk: (chunk: string) => void;
          onAIComplete: (result: { aiResponse?: string }) => void;
          onAIError: (error: string) => void;
          onConversationUpdate: (history: { role: string; content: string }[]) => void;
        }
      | undefined;

    mockStartDivination.mockImplementation(async (_request, callbacks) => {
      capturedCallbacks = callbacks;
    });

    const dailyFortune = useDailyFortune({
      route: { query: {} },
      divinationService: {
        startDivination: mockStartDivination,
        sendFollowUp: mockSendFollowUp,
      },
      historyService: {
        getRecord: mockGetRecord,
        getDailyFortuneForDate: mockGetDailyFortuneForDate,
        updateRecord: mockUpdateRecord,
        deleteRecord: mockDeleteRecord,
        findTodayDailyFortune: mockFindTodayDailyFortune,
      },
      dailyLimitService: {
        hasUsedToday: mockHasUsedToday,
        markAsUsed: mockMarkAsUsed,
        resetRecord: mockResetRecord,
        cleanupExpiredRecord: mockCleanupExpiredRecord,
      },
      isDevMode: false,
    });

    const selectedDate = dailyFortune.selectedDate.value;
    await dailyFortune.startDailyFortune();

    capturedCallbacks?.onInitialResult({
      data: { date: selectedDate },
    });
    capturedCallbacks?.onConversationUpdate([
      { role: 'user', content: `请为我分析${selectedDate}的运势` },
      { role: 'assistant', content: '' },
    ]);
    capturedCallbacks?.onAIError('抱歉，AI服务暂时不可用，请稍后重试。');

    expect(dailyFortune.error.value).toBe('抱歉，AI服务暂时不可用，请稍后重试。');
    expect(dailyFortune.conversationHistory.value).toMatchObject([
      { role: 'user', content: `请为我分析${selectedDate}的运势` },
      { role: 'assistant', content: '抱歉，AI服务暂时不可用，请稍后重试。' },
    ]);
    expect(hasVisibleDailyConversation(dailyFortune.conversationHistory.value, false)).toBe(true);
    expect(mockUpdateRecord).toHaveBeenCalledWith(
      `daily-${selectedDate}`,
      expect.objectContaining({
        result: expect.objectContaining({
          aiResponse: '抱歉，AI服务暂时不可用，请稍后重试。',
        }),
        conversationHistory: expect.arrayContaining([
          expect.objectContaining({ role: 'user', content: `请为我分析${selectedDate}的运势` }),
          expect.objectContaining({
            role: 'assistant',
            content: '抱歉，AI服务暂时不可用，请稍后重试。',
          }),
        ]),
      })
    );
  });

  it('带 historyId 查看历史记录时，追问应命中当前历史记录而不是同日期其他记录', async () => {
    mockGetRecord.mockReturnValue({
      id: 'history-daily-1',
      type: 'daily',
      question: '3 月 25 日运势',
      result: {
        type: 'daily',
        data: { date: '2026-03-25' },
        aiResponse: '当前查看的历史解读',
      },
      conversationHistory: [
        { id: 'user-1', role: 'user', content: '请为我分析2026-03-25的运势' },
        { id: 'assistant-1', role: 'assistant', content: '当前查看的历史解读' },
      ],
      timestamp: 1,
      summary: '3 月 25 日运势',
    });
    mockGetDailyFortuneForDate.mockReturnValue({
      id: 'daily-latest',
      type: 'daily',
      question: '3 月 25 日运势',
      result: {
        type: 'daily',
        data: { date: '2026-03-25' },
        aiResponse: '同日期另一条记录',
      },
      conversationHistory: [],
      timestamp: 2,
      summary: '3 月 25 日运势',
    });

    const dailyFortune = useDailyFortune({
      route: { query: { historyId: 'history-daily-1' } },
      divinationService: {
        startDivination: mockStartDivination,
        sendFollowUp: mockSendFollowUp,
      },
      historyService: {
        getRecord: mockGetRecord,
        getDailyFortuneForDate: mockGetDailyFortuneForDate,
        updateRecord: mockUpdateRecord,
        deleteRecord: mockDeleteRecord,
        findTodayDailyFortune: mockFindTodayDailyFortune,
      },
      dailyLimitService: {
        hasUsedToday: mockHasUsedToday,
        markAsUsed: mockMarkAsUsed,
        resetRecord: mockResetRecord,
        cleanupExpiredRecord: mockCleanupExpiredRecord,
      },
      isDevMode: false,
    });

    await nextTick();
    dailyFortune.followUpQuestion.value = '继续分析一下';
    dailyFortune.handleSendFollowUp();

    expect(mockSendFollowUp).toHaveBeenCalledTimes(1);
    expect(mockSendFollowUp).toHaveBeenCalledWith(
      'history-daily-1',
      expect.arrayContaining([
        expect.objectContaining({ role: 'user', content: '请为我分析2026-03-25的运势' }),
        expect.objectContaining({ role: 'assistant', content: '当前查看的历史解读' }),
      ]),
      '继续分析一下',
      expect.any(Object)
    );
  });

  it('带 historyId 查看历史记录时，重新生成应更新当前历史记录而不是同日期其他记录', async () => {
    mockGetRecord.mockReturnValue({
      id: 'history-daily-1',
      type: 'daily',
      question: '3 月 25 日运势',
      result: {
        type: 'daily',
        data: { date: '2026-03-25' },
        aiResponse: '当前查看的历史解读',
      },
      conversationHistory: [
        { id: 'user-1', role: 'user', content: '请为我分析2026-03-25的运势' },
        { id: 'assistant-1', role: 'assistant', content: '当前查看的历史解读' },
      ],
      timestamp: 1,
      summary: '3 月 25 日运势',
    });
    mockGetDailyFortuneForDate.mockReturnValue({
      id: 'daily-latest',
      type: 'daily',
      question: '3 月 25 日运势',
      result: {
        type: 'daily',
        data: { date: '2026-03-25' },
        aiResponse: '同日期另一条记录',
      },
      conversationHistory: [],
      timestamp: 2,
      summary: '3 月 25 日运势',
    });

    const dailyFortune = useDailyFortune({
      route: { query: { historyId: 'history-daily-1' } },
      divinationService: {
        startDivination: mockStartDivination,
        sendFollowUp: mockSendFollowUp,
      },
      historyService: {
        getRecord: mockGetRecord,
        getDailyFortuneForDate: mockGetDailyFortuneForDate,
        updateRecord: mockUpdateRecord,
        deleteRecord: mockDeleteRecord,
        findTodayDailyFortune: mockFindTodayDailyFortune,
      },
      dailyLimitService: {
        hasUsedToday: mockHasUsedToday,
        markAsUsed: mockMarkAsUsed,
        resetRecord: mockResetRecord,
        cleanupExpiredRecord: mockCleanupExpiredRecord,
      },
      isDevMode: false,
      generateRegeneratedAI: mockGenerateRegeneratedAI,
      regenerateConversationMessage: mockRegenerateConversationMessage,
    });

    await nextTick();
    dailyFortune.handleRetry();
    await Promise.resolve();
    await nextTick();

    expect(mockGenerateRegeneratedAI).toHaveBeenCalledTimes(1);
    expect(mockGenerateRegeneratedAI).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'history-daily-1',
        question: '3 月 25 日运势',
      }),
      expect.objectContaining({
        signal: expect.any(AbortSignal),
        onChunk: expect.any(Function),
        onConversationUpdate: expect.any(Function),
      })
    );
    expect(mockUpdateRecord).toHaveBeenCalledWith(
      'history-daily-1',
      expect.objectContaining({
        result: expect.objectContaining({
          aiResponse: '重新生成后的今日运势解读',
        }),
      })
    );
  });

  it('重试首轮错误助手消息时应继续流式回填今日运势主解读', async () => {
    let resolveRetry:
      | ((value: {
          aiResponse: string;
          conversationHistory: {
            id: string;
            role: 'user' | 'assistant';
            content: string;
          }[];
          target: 'primary';
        }) => void)
      | undefined;

    mockGetRecord.mockReturnValue({
      id: 'history-daily-1',
      type: 'daily',
      question: '3 月 25 日运势',
      result: {
        type: 'daily',
        data: { date: '2026-03-25' },
        aiResponse: '抱歉，AI服务暂时不可用，请稍后重试。',
      },
      conversationHistory: [
        { id: 'user-1', role: 'user', content: '请为我分析2026-03-25的运势' },
        {
          id: 'assistant-1',
          role: 'assistant',
          content: '抱歉，AI服务暂时不可用，请稍后重试。',
          isError: true,
        },
      ],
      timestamp: 1,
      summary: '3 月 25 日运势',
    });

    mockRegenerateConversationMessage.mockImplementation(
      (_record, _target, options) =>
        new Promise((resolve) => {
          options.onChunk?.('新的');
          options.onConversationUpdate?.([
            { id: 'user-1', role: 'user', content: '请为我分析2026-03-25的运势' },
            { id: 'assistant-1', role: 'assistant', content: '新的' },
          ]);
          resolveRetry = resolve;
        })
    );

    const dailyFortune = useDailyFortune({
      route: { query: { historyId: 'history-daily-1' } },
      divinationService: {
        startDivination: mockStartDivination,
        sendFollowUp: mockSendFollowUp,
      },
      historyService: {
        getRecord: mockGetRecord,
        getDailyFortuneForDate: mockGetDailyFortuneForDate,
        updateRecord: mockUpdateRecord,
        deleteRecord: mockDeleteRecord,
        findTodayDailyFortune: mockFindTodayDailyFortune,
      },
      dailyLimitService: {
        hasUsedToday: mockHasUsedToday,
        markAsUsed: mockMarkAsUsed,
        resetRecord: mockResetRecord,
        cleanupExpiredRecord: mockCleanupExpiredRecord,
      },
      isDevMode: false,
      regenerateConversationMessage: mockRegenerateConversationMessage,
    });

    await nextTick();

    dailyFortune.handleRetry({
      displayedIndex: 0,
      messageId: 'assistant-1',
    });
    await Promise.resolve();

    expect(dailyFortune.aiResponse.value).toBe('新的');
    expect(dailyFortune.conversationHistory.value).toMatchObject([
      { role: 'user', content: '请为我分析2026-03-25的运势' },
      { role: 'assistant', content: '新的' },
    ]);

    resolveRetry?.({
      aiResponse: '新的今日运势解读',
      conversationHistory: [
        { id: 'user-1', role: 'user', content: '请为我分析2026-03-25的运势' },
        { id: 'assistant-1', role: 'assistant', content: '新的今日运势解读' },
      ],
      target: 'primary',
    });
    await Promise.resolve();
    await nextTick();

    expect(dailyFortune.aiResponse.value).toBe('新的今日运势解读');
    expect(mockUpdateRecord).toHaveBeenCalledWith(
      'history-daily-1',
      expect.objectContaining({
        result: expect.objectContaining({
          aiResponse: '新的今日运势解读',
        }),
      })
    );
  });

  it('删除指定日期运势时不应误删整份历史记录或今日限制', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-25T09:00:00'));

    mockGetDailyFortuneForDate.mockReturnValue({
      id: 'history-daily-old',
      type: 'daily',
      question: '3 月 24 日运势',
      result: {
        type: 'daily',
        data: { date: '2026-03-24' },
        aiResponse: '旧记录',
      },
      conversationHistory: [],
      timestamp: 1,
      summary: '3 月 24 日运势',
    });

    localStorage.setItem('sydf-history', 'keep-history');
    localStorage.setItem('divination:daily:limit', 'keep-limit');
    localStorage.setItem('divination:daily:cache', 'remove-cache');
    localStorage.setItem('divination:daily:result', 'remove-result');
    localStorage.setItem('divination:daily:2026-03-24:cache', 'remove-dated-cache');
    localStorage.setItem('custom-cache', 'keep-custom-cache');
    localStorage.setItem('foo-daily-note', 'keep-daily-note');

    const dailyFortune = useDailyFortune({
      route: { query: {} },
      divinationService: {
        startDivination: mockStartDivination,
        sendFollowUp: mockSendFollowUp,
      },
      historyService: {
        getRecord: mockGetRecord,
        getDailyFortuneForDate: mockGetDailyFortuneForDate,
        updateRecord: mockUpdateRecord,
        deleteRecord: mockDeleteRecord,
        findTodayDailyFortune: mockFindTodayDailyFortune,
      },
      dailyLimitService: {
        hasUsedToday: mockHasUsedToday,
        markAsUsed: mockMarkAsUsed,
        resetRecord: mockResetRecord,
        cleanupExpiredRecord: mockCleanupExpiredRecord,
      },
      isDevMode: false,
    });

    dailyFortune.selectedDate.value = '2026-03-24';
    await dailyFortune.deleteTodayFortune();

    expect(mockDeleteRecord).toHaveBeenCalledWith('history-daily-old');
    expect(localStorage.getItem('sydf-history')).toBe('keep-history');
    expect(localStorage.getItem('divination:daily:limit')).toBe('keep-limit');
    expect(localStorage.getItem('divination:daily:cache')).toBeNull();
    expect(localStorage.getItem('divination:daily:result')).toBeNull();
    expect(localStorage.getItem('divination:daily:2026-03-24:cache')).toBeNull();
    expect(localStorage.getItem('custom-cache')).toBe('keep-custom-cache');
    expect(localStorage.getItem('foo-daily-note')).toBe('keep-daily-note');
    expect(mockResetRecord).not.toHaveBeenCalled();
  });

  it('历史记录被外部删除后刷新时应退出历史上下文并清空旧运势', async () => {
    mockGetRecord.mockReturnValue({
      id: 'history-daily-1',
      type: 'daily',
      question: '3 月 25 日运势',
      result: {
        type: 'daily',
        data: { date: '2026-03-25' },
        aiResponse: '历史中的今日运势解读',
      },
      conversationHistory: [
        { id: 'user-1', role: 'user', content: '请为我分析今日运势' },
        { id: 'assistant-1', role: 'assistant', content: '历史中的今日运势解读' },
      ],
      timestamp: 1,
      summary: '3 月 25 日运势',
    });

    const dailyFortune = useDailyFortune({
      route: {
        path: '/divination/daily',
        query: { historyId: 'history-daily-1' },
      },
      router: {
        replace: mockReplace,
      },
      divinationService: {
        startDivination: mockStartDivination,
        sendFollowUp: mockSendFollowUp,
      },
      historyService: {
        getRecord: mockGetRecord,
        getDailyFortuneForDate: mockGetDailyFortuneForDate,
        updateRecord: mockUpdateRecord,
        deleteRecord: mockDeleteRecord,
        findTodayDailyFortune: mockFindTodayDailyFortune,
      },
      dailyLimitService: {
        hasUsedToday: mockHasUsedToday,
        markAsUsed: mockMarkAsUsed,
        resetRecord: mockResetRecord,
        cleanupExpiredRecord: mockCleanupExpiredRecord,
      },
      isDevMode: false,
    });

    await nextTick();
    expect(dailyFortune.result.value).toEqual({ date: '2026-03-25' });

    mockGetRecord.mockReturnValue(undefined);
    mockGetDailyFortuneForDate.mockReturnValue(undefined);
    dailyFortune.refreshHistoryState();

    expect(dailyFortune.result.value).toBeNull();
    expect(dailyFortune.aiResponse.value).toBe('');
    expect(dailyFortune.conversationHistory.value).toEqual([]);
    expect(mockReplace).toHaveBeenCalledWith({
      path: '/divination/daily',
      query: {},
    });
  });

  it('非历史模式下缓存记录被外部删除后刷新时应清空当前今日运势', async () => {
    const record = {
      id: 'daily-cache-1',
      type: 'daily',
      question: '3 月 25 日运势',
      result: {
        type: 'daily',
        data: { date: '2026-03-25' },
        aiResponse: '缓存中的今日运势解读',
      },
      conversationHistory: [
        { id: 'user-1', role: 'user', content: '请为我分析2026-03-25的运势' },
        { id: 'assistant-1', role: 'assistant', content: '缓存中的今日运势解读' },
      ],
      timestamp: 1,
      summary: '3 月 25 日运势',
    };

    mockGetDailyFortuneForDate.mockImplementation((date: string) => {
      if (date === '2026-03-25') {
        return record;
      }
      return undefined;
    });

    const dailyFortune = useDailyFortune({
      route: { query: {} },
      divinationService: {
        startDivination: mockStartDivination,
        sendFollowUp: mockSendFollowUp,
      },
      historyService: {
        getRecord: mockGetRecord,
        getDailyFortuneForDate: mockGetDailyFortuneForDate,
        updateRecord: mockUpdateRecord,
        deleteRecord: mockDeleteRecord,
        findTodayDailyFortune: mockFindTodayDailyFortune,
      },
      dailyLimitService: {
        hasUsedToday: mockHasUsedToday,
        markAsUsed: mockMarkAsUsed,
        resetRecord: mockResetRecord,
        cleanupExpiredRecord: mockCleanupExpiredRecord,
      },
      isDevMode: false,
    });

    dailyFortune.selectedDate.value = '2026-03-25';
    await nextTick();

    expect(dailyFortune.result.value).toEqual({ date: '2026-03-25' });
    expect(dailyFortune.aiResponse.value).toBe('缓存中的今日运势解读');

    mockGetDailyFortuneForDate.mockReturnValue(undefined);
    dailyFortune.refreshHistoryState();

    expect(dailyFortune.result.value).toBeNull();
    expect(dailyFortune.aiResponse.value).toBe('');
    expect(dailyFortune.conversationHistory.value).toEqual([]);
  });
});
