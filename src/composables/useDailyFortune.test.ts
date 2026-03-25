// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { useDailyFortune } from './useDailyFortune'

describe('useDailyFortune', () => {
  const mockStartDivination = vi.fn()
  const mockSendFollowUp = vi.fn()
  const mockGetDailyFortuneForDate = vi.fn()
  const mockGetRecord = vi.fn()
  const mockUpdateRecord = vi.fn()
  const mockDeleteRecord = vi.fn()
  const mockFindTodayDailyFortune = vi.fn()
  const mockHasUsedToday = vi.fn()
  const mockMarkAsUsed = vi.fn()
  const mockResetRecord = vi.fn()
  const mockCleanupExpiredRecord = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    mockGetDailyFortuneForDate.mockReturnValue(undefined)
    mockGetRecord.mockReturnValue(undefined)
    mockHasUsedToday.mockReturnValue(false)
  })

  it('发起今日运势时应向占卜服务传递 AbortSignal', async () => {
    mockStartDivination.mockResolvedValue(undefined)

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
    })

    await dailyFortune.startDailyFortune()

    expect(mockStartDivination).toHaveBeenCalledTimes(1)
    expect(mockStartDivination).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'daily',
        signal: expect.any(AbortSignal),
      }),
      expect.any(Object)
    )
  })

  it('取消生成后，后续错误回调不应污染页面错误状态', async () => {
    let capturedCallbacks:
      | {
          onInitialResult: (result: { data: unknown }) => void
          onAIChunk: (chunk: string) => void
          onAIComplete: (result: { aiResponse?: string }) => void
          onAIError: (error: string) => void
          onConversationUpdate: (history: unknown[]) => void
        }
      | undefined

    mockStartDivination.mockImplementation(async (_request, callbacks) => {
      capturedCallbacks = callbacks
    })

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
    })

    await dailyFortune.startDailyFortune()

    dailyFortune.cancelGeneration()

    capturedCallbacks?.onAIError('网络连接出现问题，请检查网络设置后重试')
    await nextTick()

    expect(dailyFortune.isCancelled.value).toBe(true)
    expect(dailyFortune.isAILoading.value).toBe(false)
    expect(dailyFortune.error.value).toBeNull()
  })

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
    })

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
    })

    await nextTick()

    expect(mockGetRecord).toHaveBeenCalledWith('history-daily-1')
    expect(dailyFortune.result.value).toEqual({ date: '2026-03-25' })
    expect(dailyFortune.aiResponse.value).toBe('历史中的今日运势解读')
    expect(dailyFortune.conversationHistory.value).toHaveLength(2)
    expect(dailyFortune.selectedDate.value).toBe('2026-03-25')
  })
})
