import { beforeEach, describe, expect, it, vi } from 'vitest'

const {
  mockGenerateDivination,
  mockGenerateAIResponse,
  mockHandleFollowUp,
  mockAddRecord,
  mockUpdateRecord,
  mockGetRecord,
  mockHandleError,
  mockLogError,
  mockGetUserFriendlyMessage,
} = vi.hoisted(() => ({
  mockGenerateDivination: vi.fn(),
  mockGenerateAIResponse: vi.fn(),
  mockHandleFollowUp: vi.fn(),
  mockAddRecord: vi.fn(),
  mockUpdateRecord: vi.fn(),
  mockGetRecord: vi.fn(),
  mockHandleError: vi.fn((error: unknown, fallbackMessage: string) => ({
    message: error instanceof Error ? error.message : fallbackMessage,
  })),
  mockLogError: vi.fn(),
  mockGetUserFriendlyMessage: vi.fn((error: { message?: string }) => error.message || '未知错误'),
}))

vi.mock('./dataGenerationService', () => ({
  dataGenerationService: {
    generateDivination: mockGenerateDivination,
  },
}))

vi.mock('./aiService', () => ({
  aiService: {
    generateAIResponse: mockGenerateAIResponse,
    handleFollowUp: mockHandleFollowUp,
  },
}))

vi.mock('./history', () => ({
  historyService: {
    addRecord: mockAddRecord,
    updateRecord: mockUpdateRecord,
    getRecord: mockGetRecord,
  },
}))

vi.mock('@/utils/error-handler', () => ({
  handleError: mockHandleError,
  logError: mockLogError,
  getUserFriendlyMessage: mockGetUserFriendlyMessage,
}))

import { DivinationOrchestrator } from './divination-orchestrator'

describe('DivinationOrchestrator', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    mockAddRecord.mockImplementation((record: Record<string, unknown>) => ({
      ...record,
      id: record.id ?? 'history-record-1',
      timestamp: 1711111111111,
      summary: '测试摘要',
    }))
  })

  it('应当让返回结果与历史记录共享同一个 id', async () => {
    mockGenerateDivination.mockResolvedValue({
      spreadType: 'single',
      spreadName: '单牌指引',
      cards: [],
      timestamp: 1711111111111,
    })
    mockGenerateAIResponse.mockResolvedValue('AI 解读完成')

    const orchestrator = new DivinationOrchestrator()
    const onInitialResult = vi.fn()

    await orchestrator.executeDivination(
      {
        type: 'tarot',
        question: '现在该怎么做？',
        spreadType: 'single',
      },
      {
        onInitialResult,
        onAIChunk: vi.fn(),
        onAIComplete: vi.fn(),
        onAIError: vi.fn(),
        onConversationUpdate: vi.fn(),
      }
    )

    const initialResult = onInitialResult.mock.calls[0][0] as { id: string }

    expect(onInitialResult).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'tarot',
      })
    )

    expect(mockAddRecord).toHaveBeenCalledWith(
      expect.objectContaining({
        id: initialResult.id,
        type: 'tarot',
        result: expect.objectContaining({
          type: 'tarot',
        }),
      })
    )
    expect(mockUpdateRecord).toHaveBeenCalledWith(
      initialResult.id,
      expect.objectContaining({
        id: initialResult.id,
        result: expect.objectContaining({
          type: 'tarot',
        }),
      })
    )
  })

  it('六爻乱动卦只应写入一次历史记录，并更新同一条记录', async () => {
    mockGenerateDivination.mockResolvedValue({
      originalName: '测试卦',
      changedName: '变卦',
      interName: '互卦',
      yaoArray: [6, 6, 6, 6, 6, 6],
      changingYaos: [],
      sixGods: [],
      sixRelatives: [],
      najiaDizhi: [],
      wuxing: [],
      worldAndResponse: [],
      voidBranches: [],
      palace: { name: '乾宫', wuxing: '金' },
      ganzhi: { year: '甲子', month: '乙丑', day: '丙寅', hour: '丁卯' },
      yaosDetail: [],
      timestamp: 1711111111111,
      isChaotic: true,
      chaoticReason: '乱动卦象',
    })

    const orchestrator = new DivinationOrchestrator()
    const onAIComplete = vi.fn()

    await orchestrator.executeDivination(
      {
        type: 'liuyao',
        question: '这件事是否可行？',
      },
      {
        onInitialResult: vi.fn(),
        onAIChunk: vi.fn(),
        onAIComplete,
        onAIError: vi.fn(),
        onConversationUpdate: vi.fn(),
      }
    )

    expect(mockAddRecord).toHaveBeenCalledTimes(1)
    expect(mockUpdateRecord).toHaveBeenCalledTimes(1)
    expect(onAIComplete).toHaveBeenCalledWith(
      expect.objectContaining({
        aiResponse: '乱动卦象',
      })
    )
    expect(mockGenerateAIResponse).not.toHaveBeenCalled()
  })

  it('AI 解读失败时只应回调一次错误', async () => {
    mockGenerateDivination.mockResolvedValue({
      spreadType: 'single',
      spreadName: '单牌指引',
      cards: [],
      timestamp: 1711111111111,
    })
    mockGenerateAIResponse.mockRejectedValue(new Error('AI 服务异常'))

    const orchestrator = new DivinationOrchestrator()
    const onAIError = vi.fn()

    await orchestrator.executeDivination(
      {
        type: 'tarot',
        question: '接下来会怎样？',
        spreadType: 'single',
      },
      {
        onInitialResult: vi.fn(),
        onAIChunk: vi.fn(),
        onAIComplete: vi.fn(),
        onAIError,
        onConversationUpdate: vi.fn(),
      }
    )

    expect(onAIError).toHaveBeenCalledTimes(1)
    expect(onAIError).toHaveBeenCalledWith('AI 服务异常')
  })

  it('今日运势保存历史标题时应直接使用日期键，不受 Date 字符串解析换日影响', async () => {
    const RealDate = Date

    class ShiftedDate extends RealDate {
      constructor(...args: any[]) {
        if (args.length === 1 && args[0] === '2026-03-16') {
          super('2026-03-15T16:00:00.000Z')
          return
        }

        super(...args)
      }

      static now() {
        return RealDate.now()
      }

      static parse(dateString: string) {
        return RealDate.parse(dateString)
      }

      static UTC(...args: Parameters<DateConstructor['UTC']>) {
        return RealDate.UTC(...args)
      }
    }

    vi.stubGlobal('Date', ShiftedDate as unknown as DateConstructor)

    mockGenerateDivination.mockResolvedValue({
      date: '2026-03-16',
      timestamp: 1711111111111,
    })
    mockGenerateAIResponse.mockResolvedValue('AI 解读完成')

    try {
      const orchestrator = new DivinationOrchestrator()

      await orchestrator.executeDivination(
        {
          type: 'daily',
          question: '请为我分析 2026-03-16 的运势',
          supplementaryInfo: {
            date: '2026-03-16',
          },
        },
        {
          onInitialResult: vi.fn(),
          onAIChunk: vi.fn(),
          onAIComplete: vi.fn(),
          onAIError: vi.fn(),
          onConversationUpdate: vi.fn(),
        }
      )

      expect(mockAddRecord).toHaveBeenCalledWith(
        expect.objectContaining({
          question: '3 月 16 日运势',
        })
      )
    } finally {
      vi.unstubAllGlobals()
    }
  })

  it('追问流式更新期间应节流保存历史记录，并在完成时保存最终内容', async () => {
    vi.useFakeTimers()

    const record = {
      id: 'history-record-1',
      type: 'tarot',
      question: '现在该怎么做？',
      result: {
        type: 'tarot',
        data: {
          spreadType: 'single',
          spreadName: '单牌指引',
          cards: [],
          timestamp: 1711111111111,
        },
        aiResponse: '初始解读',
      },
      conversationHistory: [],
      timestamp: 1711111111111,
      summary: '测试摘要',
    }
    mockGetRecord.mockReturnValue(record)
    mockHandleFollowUp.mockImplementation(async (_history, _question, callbacks) => {
      callbacks.onConversationUpdate([{ role: 'assistant', content: '第一段' }])
      callbacks.onConversationUpdate([{ role: 'assistant', content: '第二段' }])
      callbacks.onConversationUpdate([{ role: 'assistant', content: '最终内容' }])
      callbacks.onComplete()
    })

    const orchestrator = new DivinationOrchestrator()

    await orchestrator.sendFollowUp('history-record-1', [], '继续说说', {
      onChunk: vi.fn(),
      onComplete: vi.fn(),
      onError: vi.fn(),
      onConversationUpdate: vi.fn(),
    })

    expect(mockUpdateRecord).toHaveBeenCalledTimes(1)
    expect(mockUpdateRecord).toHaveBeenCalledWith(
      'history-record-1',
      expect.objectContaining({
        conversationHistory: [{ role: 'assistant', content: '最终内容' }],
      })
    )

    vi.useRealTimers()
  })

  it('追问保存历史时不应直接改写 getRecord 返回的原对象', async () => {
    const originalConversationHistory = [{ role: 'assistant', content: '旧内容' }]
    const record = {
      id: 'history-record-2',
      type: 'tarot',
      question: '下一步怎么做？',
      result: {
        type: 'tarot',
        data: {
          spreadType: 'single',
          spreadName: '单牌指引',
          cards: [],
          timestamp: 1711111111111,
        },
        aiResponse: '原始解读',
      },
      conversationHistory: originalConversationHistory,
      timestamp: 1711111111111,
      summary: '测试摘要',
    }

    mockGetRecord.mockReturnValue(record)
    mockHandleFollowUp.mockImplementation(async (_history, _question, callbacks) => {
      callbacks.onConversationUpdate([{ role: 'assistant', content: '新的追问内容' }])
      callbacks.onComplete()
    })

    const orchestrator = new DivinationOrchestrator()

    await orchestrator.sendFollowUp('history-record-2', [], '继续展开', {
      onChunk: vi.fn(),
      onComplete: vi.fn(),
      onError: vi.fn(),
      onConversationUpdate: vi.fn(),
    })

    expect(record.conversationHistory).toBe(originalConversationHistory)
    expect(record.conversationHistory).toEqual([{ role: 'assistant', content: '旧内容' }])
    expect(mockUpdateRecord).toHaveBeenCalledWith(
      'history-record-2',
      expect.objectContaining({
        conversationHistory: [{ role: 'assistant', content: '新的追问内容' }],
      })
    )
  })
})
