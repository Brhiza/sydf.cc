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
        type: 'tarot_single',
        question: '现在该怎么做？',
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

    expect(mockAddRecord).toHaveBeenCalledWith(
      expect.objectContaining({
        id: initialResult.id,
      })
    )
    expect(mockUpdateRecord).toHaveBeenCalledWith(
      initialResult.id,
      expect.objectContaining({
        id: initialResult.id,
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
        type: 'tarot_single',
        question: '接下来会怎样？',
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
})
