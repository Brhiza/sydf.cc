import { beforeEach, describe, expect, it, vi } from 'vitest';
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

vi.mock('./ai', () => ({
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
});
