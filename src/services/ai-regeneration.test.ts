import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { HistoryRecord } from '@/types/common';

const {
  mockGenerateAIResponse,
  mockGeneratePromptAIResponse,
  mockGenerateFollowUpPromptWrapper,
  mockGetFormattedTimeInfo,
  mockGetDisplayTimeData,
} = vi.hoisted(() => ({
  mockGenerateAIResponse: vi.fn(),
  mockGeneratePromptAIResponse: vi.fn(),
  mockGenerateFollowUpPromptWrapper: vi.fn(),
  mockGetFormattedTimeInfo: vi.fn(),
  mockGetDisplayTimeData: vi.fn(),
}));

vi.mock('./aiService', () => ({
  aiService: {
    generateAIResponse: mockGenerateAIResponse,
  },
}));

vi.mock('./ai', () => ({
  generateAIResponse: mockGeneratePromptAIResponse,
}));

vi.mock('./prompts', () => ({
  generateFollowUpPromptWrapper: mockGenerateFollowUpPromptWrapper,
}));

vi.mock('./prompts/shared/time-utils', () => ({
  getFormattedTimeInfo: mockGetFormattedTimeInfo,
  getDisplayTimeData: mockGetDisplayTimeData,
}));

describe('ai-regeneration', () => {
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

  it('今日运势重生成时应使用真实分析问题而不是历史标题', async () => {
    const { generateRegeneratedAI } = await import('./ai-regeneration');

    const record: HistoryRecord = {
      id: 'daily-1',
      type: 'daily',
      question: '3 月 25 日运势',
      result: {
        type: 'daily',
        data: {
          date: '2026-03-25',
          overall: { score: 88, description: '顺利', luck: '吉' },
          aspects: {
            career: { score: 80, description: '稳', advice: '按计划推进' },
            wealth: { score: 79, description: '平', advice: '控制支出' },
            relationship: { score: 77, description: '和', advice: '多沟通' },
            health: { score: 76, description: '稳', advice: '规律作息' },
          },
          lucky: {
            numbers: [3],
            colors: ['青'],
            directions: ['东'],
            time: '辰时',
          },
          timestamp: Date.now(),
          ganzhi: { year: '甲子', month: '乙丑', day: '丙寅', hour: '丁卯' },
          qimen: {
            timeInfo: {
              solarTerm: '春分',
              epoch: '上元',
              juShu: 1,
              dunType: '阳遁',
              zhiFu: '天心',
              zhiShi: '开门',
            },
            jiuGongGe: [],
            analysis: {
              zhiFuAnalysis: '值符平稳',
              zhiShiAnalysis: '值使顺畅',
              palaceAnalysis: '宫位平和',
              wuxingAnalysis: '五行协调',
              overallAnalysis: '整体向好',
            },
          },
        },
        aiResponse: '旧内容',
        supplementaryInfo: {
          date: '2026-03-25',
        },
      },
      timestamp: Date.now(),
      summary: '3 月 25 日运势',
    };

    mockGenerateAIResponse.mockResolvedValue('新的今日运势解读');

    const regenerated = await generateRegeneratedAI(record);

    expect(mockGenerateAIResponse).toHaveBeenCalledWith(
      'daily',
      '请为我分析2026-03-25的运势',
      expect.any(Object),
      { date: '2026-03-25' },
      undefined,
      expect.any(Function)
    );
    expect(regenerated.conversationHistory[0]?.content).toBe('请为我分析2026-03-25的运势');
    expect(regenerated.aiResponse).toBe('新的今日运势解读');
    expect(regenerated.target).toBe('primary');
  });

  it('乱动卦重生成时应直接返回固定提示，不再调用 AI', async () => {
    const { generateRegeneratedAI } = await import('./ai-regeneration');

    const record: HistoryRecord = {
      id: 'liuyao-1',
      type: 'liuyao',
      question: '这件事会怎样？',
      result: {
        type: 'liuyao',
        data: {
          originalName: '乾为天',
          ganzhi: { year: '甲子', month: '乙丑', day: '丙寅', hour: '丁卯' },
          timestamp: Date.now(),
          yaoArray: [6, 7, 8, 9, 7, 8],
          changingYaos: [],
          sixGods: [],
          sixRelatives: [],
          najiaDizhi: [],
          wuxing: [],
          worldAndResponse: [],
          voidBranches: [],
          palace: { name: '乾宫', wuxing: '金' },
          yaosDetail: [],
          isChaotic: true,
          chaoticReason: '卦象动爻过多，请静心后再试。',
        },
        aiResponse: '',
      },
      timestamp: Date.now(),
      summary: '六爻',
    };

    const regenerated = await generateRegeneratedAI(record);

    expect(mockGenerateAIResponse).not.toHaveBeenCalled();
    expect(regenerated.aiResponse).toBe('卦象动爻过多，请静心后再试。');
    expect(regenerated.conversationHistory[1]?.content).toBe('卦象动爻过多，请静心后再试。');
    expect(regenerated.target).toBe('primary');
  });

  it('重生指定追问回复时应只重生该条并截断其后的分支', async () => {
    const { regenerateConversationMessage } = await import('./ai-regeneration');

    const record: HistoryRecord = {
      id: 'qimen-1',
      type: 'qimen',
      question: '接下来会怎样？',
      result: {
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
      },
      conversationHistory: [
        { id: 'user-0', role: 'user', content: '接下来会怎样？' },
        { id: 'assistant-0', role: 'assistant', content: '主解读' },
        { id: 'user-1', role: 'user', content: '还有什么要注意？' },
        { id: 'assistant-1', role: 'assistant', content: '旧追问解读一' },
        { id: 'user-2', role: 'user', content: '再具体一点。' },
        { id: 'assistant-2', role: 'assistant', content: '旧追问解读二' },
      ],
      timestamp: Date.now(),
      summary: '奇门',
    };

    mockGenerateFollowUpPromptWrapper.mockResolvedValue('追问提示词');
    mockGeneratePromptAIResponse.mockResolvedValue({
      content: '新的追问解读一',
    });

    const regenerated = await regenerateConversationMessage(record, {
      displayedIndex: 3,
      messageId: 'assistant-1',
    });

    expect(mockGenerateFollowUpPromptWrapper).toHaveBeenCalledWith(
      expect.objectContaining({
        originalQuestion: '接下来会怎样？',
        originalResponse: '主解读',
        followUpQuestion: '还有什么要注意？',
      })
    );
    expect(mockGeneratePromptAIResponse).toHaveBeenCalledWith(
      '追问提示词',
      undefined,
      expect.any(Function)
    );
    expect(regenerated.target).toBe('follow_up');
    expect(regenerated.aiResponse).toBe('主解读');
    expect(regenerated.conversationHistory).toEqual([
      { id: 'user-0', role: 'user', content: '接下来会怎样？' },
      { id: 'assistant-0', role: 'assistant', content: '主解读' },
      { id: 'user-1', role: 'user', content: '还有什么要注意？' },
      { id: 'assistant-1', role: 'assistant', content: '新的追问解读一' },
    ]);
  });
});
