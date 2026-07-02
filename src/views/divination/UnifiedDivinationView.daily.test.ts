// @vitest-environment jsdom
/* eslint-disable vue/one-component-per-file */

import { mount } from '@vue/test-utils';
import { computed, defineComponent, nextTick, ref } from 'vue';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { eventBus, EVENTS } from '@/utils/eventBus';
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
      route: { query: {} },
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
      refreshHistoryState: vi.fn(),
      displayResult: computed(() => null),
      config: computed(() => null),
      isCustomBuild: computed(() => false),
      handleSpreadChange: vi.fn(),
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

  it('非今日运势进入结果态时不应因缺少 route 绑定而白屏', () => {
    useUnifiedDivinationPageMock.mockReturnValue({
      route: { query: {} },
      question: ref('测试问题'),
      isLoading: ref(false),
      result: ref({
        id: 'result-1',
        type: 'qimen',
        data: { jiuGongGe: [] },
        aiResponse: '测试解读',
      }),
      aiResponse: ref('测试解读'),
      error: ref<string | null>(null),
      isAiLoading: ref(false),
      hasResult: computed(() => true),
      hasAiResponse: computed(() => true),
      viewingHistory: ref(false),
      isCancelled: ref(false),
      clearResult: vi.fn(),
      conversationHistory: ref([]),
      followUpQuestion: ref(''),
      isFollowUpLoading: ref(false),
      handleSendFollowUp: vi.fn(),
      refreshHistoryState: vi.fn(),
      displayResult: computed(() => ({
        id: 'result-1',
        type: 'qimen',
        data: { jiuGongGe: [] },
        aiResponse: '测试解读',
      })),
      config: computed(() => null),
      isCustomBuild: computed(() => false),
      handleSpreadChange: vi.fn(),
      handleSubmit: vi.fn(),
      handleClear: vi.fn(),
      clearError: vi.fn(),
      handleRetry: vi.fn(),
    });

    const wrapper = mount(UnifiedDivinationView, {
      props: {
        divinationType: 'qimen',
      },
    });

    expect(wrapper.find('.divination-result-stub').exists()).toBe(true);
    expect(wrapper.find('.result-header-actions-stub').exists()).toBe(true);
  });

  it('查看历史详情时收到历史更新事件应刷新当前结果', async () => {
    const refreshHistoryState = vi.fn();

    useUnifiedDivinationPageMock.mockReturnValue({
      route: { query: { historyId: 'history-1' } },
      question: ref('测试问题'),
      isLoading: ref(false),
      result: ref({
        id: 'history-1',
        type: 'qimen',
        data: { jiuGongGe: [] },
        aiResponse: '测试解读',
      }),
      aiResponse: ref('测试解读'),
      error: ref<string | null>(null),
      isAiLoading: ref(false),
      hasResult: computed(() => true),
      hasAiResponse: computed(() => true),
      viewingHistory: ref(true),
      isCancelled: ref(false),
      clearResult: vi.fn(),
      conversationHistory: ref([]),
      followUpQuestion: ref(''),
      isFollowUpLoading: ref(false),
      handleSendFollowUp: vi.fn(),
      refreshHistoryState,
      displayResult: computed(() => ({
        id: 'history-1',
        type: 'qimen',
        data: { jiuGongGe: [] },
        aiResponse: '测试解读',
      })),
      config: computed(() => null),
      isCustomBuild: computed(() => false),
      handleSpreadChange: vi.fn(),
      handleSubmit: vi.fn(),
      handleClear: vi.fn(),
      clearError: vi.fn(),
      handleRetry: vi.fn(),
    });

    mount(UnifiedDivinationView, {
      props: {
        divinationType: 'qimen',
      },
    });

    eventBus.emit(EVENTS.HISTORY_UPDATED);
    await nextTick();

    expect(refreshHistoryState).toHaveBeenCalledTimes(1);
  });

  it('historyId 格式异常时仍应显示结果返回按钮', () => {
    useUnifiedDivinationPageMock.mockReturnValue({
      route: { query: { historyId: ['history-1'] } },
      question: ref('测试问题'),
      isLoading: ref(false),
      result: ref({
        id: 'result-1',
        type: 'qimen',
        data: { jiuGongGe: [] },
        aiResponse: '测试解读',
      }),
      aiResponse: ref('测试解读'),
      error: ref<string | null>(null),
      isAiLoading: ref(false),
      hasResult: computed(() => true),
      hasAiResponse: computed(() => true),
      viewingHistory: ref(false),
      isCancelled: ref(false),
      clearResult: vi.fn(),
      conversationHistory: ref([]),
      followUpQuestion: ref(''),
      isFollowUpLoading: ref(false),
      handleSendFollowUp: vi.fn(),
      refreshHistoryState: vi.fn(),
      displayResult: computed(() => ({
        id: 'result-1',
        type: 'qimen',
        data: { jiuGongGe: [] },
        aiResponse: '测试解读',
      })),
      config: computed(() => null),
      isCustomBuild: computed(() => false),
      handleSpreadChange: vi.fn(),
      handleSubmit: vi.fn(),
      handleClear: vi.fn(),
      clearError: vi.fn(),
      handleRetry: vi.fn(),
    });

    const wrapper = mount(UnifiedDivinationView, {
      props: {
        divinationType: 'qimen',
      },
    });

    expect(wrapper.find('.result-header-actions-stub').exists()).toBe(true);
  });

  it('historyId 格式异常时收到历史更新事件不应刷新当前结果', async () => {
    const refreshHistoryState = vi.fn();

    useUnifiedDivinationPageMock.mockReturnValue({
      route: { query: { historyId: ['history-1'] } },
      question: ref('测试问题'),
      isLoading: ref(false),
      result: ref({
        id: 'result-1',
        type: 'qimen',
        data: { jiuGongGe: [] },
        aiResponse: '测试解读',
      }),
      aiResponse: ref('测试解读'),
      error: ref<string | null>(null),
      isAiLoading: ref(false),
      hasResult: computed(() => true),
      hasAiResponse: computed(() => true),
      viewingHistory: ref(false),
      isCancelled: ref(false),
      clearResult: vi.fn(),
      conversationHistory: ref([]),
      followUpQuestion: ref(''),
      isFollowUpLoading: ref(false),
      handleSendFollowUp: vi.fn(),
      refreshHistoryState,
      displayResult: computed(() => ({
        id: 'result-1',
        type: 'qimen',
        data: { jiuGongGe: [] },
        aiResponse: '测试解读',
      })),
      config: computed(() => null),
      isCustomBuild: computed(() => false),
      handleSpreadChange: vi.fn(),
      handleSubmit: vi.fn(),
      handleClear: vi.fn(),
      clearError: vi.fn(),
      handleRetry: vi.fn(),
    });

    mount(UnifiedDivinationView, {
      props: {
        divinationType: 'qimen',
      },
    });

    eventBus.emit(EVENTS.HISTORY_UPDATED);
    await nextTick();

    expect(refreshHistoryState).not.toHaveBeenCalled();
  });
});
