import { beforeEach, describe, expect, it, vi } from 'vitest';
import { QUESTION_TEXT_MAX_LENGTH } from '@/shared/question-text';
import type { ChatMessage } from '@/types/chat';

const {
  mockGetAIInsight,
  mockGenerateFollowUpPromptWrapper,
  mockGetFormattedTimeInfo,
  mockGetDisplayTimeData,
} = vi.hoisted(() => ({
  mockGetAIInsight: vi.fn(),
  mockGenerateFollowUpPromptWrapper: vi.fn(),
  mockGetFormattedTimeInfo: vi.fn(),
  mockGetDisplayTimeData: vi.fn(),
}));

vi.mock('./ai-client', () => ({
  getAIInsight: mockGetAIInsight,
  generateTwoStageAIResponseWithSystem: vi.fn(),
}));

vi.mock('./prompts', () => ({
  generatePrompt: vi.fn(),
  generateFollowUpPromptWrapper: mockGenerateFollowUpPromptWrapper,
}));

vi.mock('./prompts/shared/time-utils', () => ({
  getFormattedTimeInfo: mockGetFormattedTimeInfo,
  getDisplayTimeData: mockGetDisplayTimeData,
}));

describe('aiService.handleFollowUp', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetFormattedTimeInfo.mockResolvedValue('当前时间');
    mockGetDisplayTimeData.mockResolvedValue({
      solar: '公历',
      lunar: '农历',
      ganzhi: '干支',
      jieqi: '节气',
    });
  });

  it('追问前置流程抛错时也应把错误写回助手消息并同步对话历史', async () => {
    const { aiService } = await import('./aiService');
    const onChunk = vi.fn();
    const onComplete = vi.fn();
    const onError = vi.fn();
    const onConversationUpdate = vi.fn();
    const conversationHistory: ChatMessage[] = [];

    mockGenerateFollowUpPromptWrapper.mockRejectedValue(new Error('提示词生成失败'));

    await aiService.handleFollowUp(
      conversationHistory,
      '我还需要注意什么？',
      {
        onChunk,
        onComplete,
        onError,
        onConversationUpdate,
      },
      {
        originalQuestion: '这次合作是否顺利？',
        originalResponse: '整体可成。',
        divinationType: 'qimen',
        originalData: null,
        supplementaryInfo: null,
      }
    );

    expect(onError).toHaveBeenCalledWith('提示词生成失败');
    expect(onComplete).not.toHaveBeenCalled();
    expect(onConversationUpdate).toHaveBeenLastCalledWith([
      expect.objectContaining({ role: 'user', content: '我还需要注意什么？' }),
      expect.objectContaining({ role: 'assistant', content: '提示词生成失败' }),
    ]);
  });

  it('底层追问服务应裁剪超长问题再生成提示词', async () => {
    const { aiService } = await import('./aiService');
    const onConversationUpdate = vi.fn();
    const conversationHistory: ChatMessage[] = [];
    const longQuestion = '问'.repeat(QUESTION_TEXT_MAX_LENGTH + 20);

    mockGenerateFollowUpPromptWrapper.mockResolvedValue('追问提示词');
    mockGetAIInsight.mockImplementation(async (_prompt, _onChunk, onComplete) => {
      onComplete('后续解读');
    });

    await aiService.handleFollowUp(
      conversationHistory,
      longQuestion,
      {
        onChunk: vi.fn(),
        onComplete: vi.fn(),
        onError: vi.fn(),
        onConversationUpdate,
      },
      {
        originalQuestion: '原问题',
        originalResponse: '原解读',
        divinationType: 'qimen',
        originalData: null,
        supplementaryInfo: null,
      }
    );

    expect(mockGenerateFollowUpPromptWrapper).toHaveBeenCalledWith(
      expect.objectContaining({
        followUpQuestion: '问'.repeat(QUESTION_TEXT_MAX_LENGTH),
      })
    );
    expect(onConversationUpdate).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          role: 'user',
          content: '问'.repeat(QUESTION_TEXT_MAX_LENGTH),
        }),
      ])
    );
  });

  it('底层追问服务遇到空问题时不应写入空对话', async () => {
    const { aiService } = await import('./aiService');
    const onError = vi.fn();
    const onConversationUpdate = vi.fn();
    const conversationHistory: ChatMessage[] = [];

    await aiService.handleFollowUp(
      conversationHistory,
      '   ',
      {
        onChunk: vi.fn(),
        onComplete: vi.fn(),
        onError,
        onConversationUpdate,
      }
    );

    expect(onError).toHaveBeenCalledWith('请输入追问内容后再发送');
    expect(onConversationUpdate).not.toHaveBeenCalled();
    expect(conversationHistory).toEqual([]);
  });
});
