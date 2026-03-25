// @vitest-environment jsdom
/* eslint-disable vue/one-component-per-file */

import { mount } from '@vue/test-utils';
import { computed, defineComponent, ref } from 'vue';
import { beforeEach, describe, expect, it, vi } from 'vitest';
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

vi.mock('@/components/divination/result/DivinationErrorState.vue', () => ({
  default: defineComponent({
    template: '<div class="divination-error-state-stub"></div>',
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
});
