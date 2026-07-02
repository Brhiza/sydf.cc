// @vitest-environment jsdom
/* eslint-disable vue/one-component-per-file */

import { mount } from '@vue/test-utils';
import { computed, defineComponent, nextTick, ref } from 'vue';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { eventBus, EVENTS } from '@/utils/eventBus';
import UnifiedDailyDivinationContent from './UnifiedDailyDivinationContent.vue';

const useDailyFortuneMock = vi.fn();

vi.mock('@/composables/useDailyFortune', () => ({
  useDailyFortune: () => useDailyFortuneMock(),
}));

vi.mock('@/components/common/ContentSectionCard.vue', () => ({
  default: defineComponent({
    template: '<section class="content-section-card"><slot /><slot name="actions" /></section>',
  }),
}));

vi.mock('@/components/divination/DivinationInput.vue', () => ({
  default: defineComponent({
    template: '<div class="divination-input-stub"></div>',
  }),
}));

vi.mock('@/components/divination/result/DivinationAISection.vue', () => ({
  default: defineComponent({
    template: '<div class="daily-ai-section-stub"></div>',
  }),
}));

vi.mock('@/components/divination/results/DailyInterpretationResult.vue', () => ({
  default: defineComponent({
    template: '<div class="daily-result-stub"></div>',
  }),
}));

vi.mock('./UnifiedFollowUpComposer.vue', () => ({
  default: defineComponent({
    template: '<div class="follow-up-composer-stub"></div>',
  }),
}));

vi.mock('./UnifiedResultHeaderActions.vue', () => ({
  default: defineComponent({
    template: '<div class="result-header-actions-stub"></div>',
  }),
}));

function createDailyFortuneState(overrides: Record<string, unknown> = {}) {
  return {
    route: { query: {} },
    selectedDate: ref('2026-03-25'),
    isLoading: ref(false),
    isAILoading: ref(false),
    result: ref({ date: '2026-03-25' }),
    aiResponse: ref('整体判断：今日宜稳中求进。'),
    error: ref<string | null>(null),
    conversationHistory: ref([]),
    followUpQuestion: ref(''),
    isFollowUpLoading: ref(false),
    hasAiResponse: computed(() => true),
    pageTitle: computed(() => '今日运势'),
    loadingTip: computed(() => '正在解析天机，请稍候...'),
    hasVisibleConversation: computed(() => false),
    startDailyFortune: vi.fn(),
    handleClear: vi.fn(),
    handleRetry: vi.fn(),
    handleSendFollowUp: vi.fn(),
    refreshHistoryState: vi.fn(),
    ...overrides,
  };
}

describe('UnifiedDailyDivinationContent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('首轮解读加载时不应额外渲染下方 AI 卡片', () => {
    useDailyFortuneMock.mockReturnValue(
      createDailyFortuneState({
        isAILoading: ref(true),
        hasVisibleConversation: computed(() => false),
      })
    );

    const wrapper = mount(UnifiedDailyDivinationContent);

    expect(wrapper.find('.content-section-card').exists()).toBe(true);
    expect(wrapper.find('.daily-result-stub').exists()).toBe(true);
    expect(wrapper.find('.daily-ai-section-stub').exists()).toBe(false);
  });

  it('首轮失败时应只显示统一 AI 区块，不再额外渲染独立错误态', () => {
    useDailyFortuneMock.mockReturnValue(
      createDailyFortuneState({
        error: ref('抱歉，AI服务暂时不可用，请稍后重试。'),
        hasVisibleConversation: computed(() => false),
      })
    );

    const wrapper = mount(UnifiedDailyDivinationContent);

    expect(wrapper.find('.daily-ai-section-stub').exists()).toBe(true);
  });

  it('查看今日运势历史时收到历史更新事件应刷新当前内容', async () => {
    const refreshHistoryState = vi.fn();

    useDailyFortuneMock.mockReturnValue(
      createDailyFortuneState({
        route: { query: { historyId: 'history-daily-1' } },
        refreshHistoryState,
      })
    );

    mount(UnifiedDailyDivinationContent);

    eventBus.emit(EVENTS.HISTORY_UPDATED);
    await nextTick();

    expect(refreshHistoryState).toHaveBeenCalledTimes(1);
  });

  it('historyId 格式异常时仍应显示结果返回按钮', () => {
    useDailyFortuneMock.mockReturnValue(
      createDailyFortuneState({
        route: { query: { historyId: ['history-daily-1'] } },
      })
    );

    const wrapper = mount(UnifiedDailyDivinationContent);

    expect(wrapper.find('.result-header-actions-stub').exists()).toBe(true);
  });

  it('historyId 格式异常且无结果时不应因历史更新刷新内容', async () => {
    const refreshHistoryState = vi.fn();

    useDailyFortuneMock.mockReturnValue(
      createDailyFortuneState({
        route: { query: { historyId: ['history-daily-1'] } },
        result: ref(null),
        refreshHistoryState,
      })
    );

    mount(UnifiedDailyDivinationContent);

    eventBus.emit(EVENTS.HISTORY_UPDATED);
    await nextTick();

    expect(refreshHistoryState).not.toHaveBeenCalled();
  });
});
