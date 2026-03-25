// @vitest-environment jsdom
/* eslint-disable vue/one-component-per-file */

import { mount } from '@vue/test-utils';
import { computed, defineComponent, ref } from 'vue';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import UnifiedDivinationView from './UnifiedDivinationView.vue';

const useUnifiedDivinationPageMock = vi.fn();

vi.mock('vue-router', () => ({
  useRoute: () => ({ query: {} }),
}));

vi.mock('@/composables/useUnifiedDivinationPage', () => ({
  useUnifiedDivinationPage: () => useUnifiedDivinationPageMock(),
}));

vi.mock('@/components/divination/DivinationInput.vue', () => ({
  default: defineComponent({
    template: '<div class="divination-input-stub"></div>',
  }),
}));

vi.mock('@/components/divination/DivinationResult.vue', () => ({
  default: defineComponent({
    template: '<div class="divination-result-stub"></div>',
  }),
}));

vi.mock('./components/UnifiedFollowUpComposer.vue', () => ({
  default: defineComponent({
    template: '<div class="follow-up-composer-stub"></div>',
  }),
}));

vi.mock('./components/UnifiedResultHeaderActions.vue', () => ({
  default: defineComponent({
    template: '<div class="result-header-actions-stub"></div>',
  }),
}));

vi.mock('./components/UnifiedDailyDivinationContent.vue', () => ({
  default: defineComponent({
    template: '<div class="unified-daily-content-stub"></div>',
  }),
}));

describe('UnifiedDivinationView daily', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useUnifiedDivinationPageMock.mockReturnValue({
      question: ref(''),
      isLoading: ref(false),
      result: ref(null),
      aiResponse: ref(''),
      error: ref<string | null>(null),
      isAiLoading: ref(false),
      hasResult: computed(() => false),
      hasAiResponse: computed(() => false),
      viewingHistory: ref(false),
      isCancelled: ref(false),
      clearResult: vi.fn(),
      conversationHistory: ref([]),
      followUpQuestion: ref(''),
      isFollowUpLoading: ref(false),
      handleSendFollowUp: vi.fn(),
      adaptedResult: computed(() => ({ data: {}, aiResponse: '' })),
      config: computed(() => null),
      isCustomBuild: computed(() => false),
      handleTypeChange: vi.fn(),
      handleSubmit: vi.fn(),
      handleClear: vi.fn(),
      clearError: vi.fn(),
      handleRetry: vi.fn(),
    });
  });

  it('今日运势应直接走专用内容组件，不再走通用结果页分支', () => {
    const wrapper = mount(UnifiedDivinationView, {
      props: {
        divinationType: 'daily',
      },
    });

    expect(wrapper.find('.unified-daily-content-stub').exists()).toBe(true);
    expect(wrapper.find('.divination-result-stub').exists()).toBe(false);
  });
});
