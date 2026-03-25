import { beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick, reactive, ref } from 'vue';
import { useUnifiedDivinationPage } from './useUnifiedDivinationPage';

function createDivinationStub() {
  return {
    question: ref(''),
    isLoading: ref(false),
    result: ref(null),
    aiResponse: ref(''),
    error: ref<string | null>(null),
    isAiLoading: ref(false),
    viewingHistory: ref(false),
    isCancelled: ref(false),
    conversationHistory: ref([]),
    followUpQuestion: ref(''),
    isFollowUpLoading: ref(false),
    hasResult: ref(false),
    hasAiResponse: ref(false),
    startDivination: vi.fn(),
    clearResult: vi.fn(),
    regenerateAI: vi.fn(),
    clearHistoryParam: vi.fn(),
    cancelGeneration: vi.fn(),
    handleSendFollowUp: vi.fn(),
    handleHistoryParam: vi.fn(),
  };
}

describe('useUnifiedDivinationPage', () => {
  const mockGetConfig = vi.fn();
  const emitHistorySelectionReset = vi.fn();
  const scrollTo = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetConfig.mockReturnValue({
      title: '测试占卜',
      description: '说明',
      buttonText: '开始占卜',
      placeholder: '请输入问题',
      examples: [],
    });
  });

  it('切换占卜类型时，非历史模式会清理状态并重置滚动', async () => {
    const props = reactive({ divinationType: 'qimen' as const });
    const route = reactive({ query: {} as Record<string, unknown> });
    const divination = createDivinationStub();
    const pageContainerRef = ref<{ scrollTop: number } | null>({ scrollTop: 120 });

    useUnifiedDivinationPage(props, pageContainerRef as never, {
      route,
      divination,
      getConfig: mockGetConfig,
      emitHistorySelectionReset,
      scrollTo,
      buildTarget: 'DEFAULT',
    });

    props.divinationType = 'liuyao';
    await nextTick();
    await nextTick();

    expect(divination.clearResult).toHaveBeenCalledTimes(1);
    expect(divination.clearHistoryParam).toHaveBeenCalledTimes(1);
    expect(pageContainerRef.value?.scrollTop).toBe(0);
    expect(scrollTo).toHaveBeenCalledWith(0, 0);
    expect(emitHistorySelectionReset).toHaveBeenCalledTimes(1);
  });

  it('查看历史记录时切换类型不应重置当前状态', async () => {
    const props = reactive({ divinationType: 'qimen' as const });
    const route = reactive({ query: {} as Record<string, unknown> });
    const divination = createDivinationStub();
    divination.viewingHistory.value = true;

    useUnifiedDivinationPage(props, ref(null), {
      route,
      divination,
      getConfig: mockGetConfig,
      emitHistorySelectionReset,
      scrollTo,
      buildTarget: 'DEFAULT',
    });

    props.divinationType = 'meihua';
    await nextTick();

    expect(divination.clearResult).not.toHaveBeenCalled();
    expect(divination.clearHistoryParam).not.toHaveBeenCalled();
    expect(emitHistorySelectionReset).not.toHaveBeenCalled();
  });

  it('带 historyId 进入页面时会立即加载历史记录', () => {
    const props = reactive({ divinationType: 'qimen' as const });
    const route = reactive({
      query: { historyId: 'history-1' } as Record<string, unknown>,
    });
    const divination = createDivinationStub();

    useUnifiedDivinationPage(props, ref(null), {
      route,
      divination,
      getConfig: mockGetConfig,
      emitHistorySelectionReset,
      scrollTo,
      buildTarget: 'DEFAULT',
    });

    expect(divination.handleHistoryParam).toHaveBeenCalledTimes(1);
  });

  it('离开历史记录模式时会清空当前结果', async () => {
    const props = reactive({ divinationType: 'qimen' as const });
    const route = reactive({
      query: { historyId: 'history-1' } as Record<string, unknown>,
    });
    const divination = createDivinationStub();

    useUnifiedDivinationPage(props, ref(null), {
      route,
      divination,
      getConfig: mockGetConfig,
      emitHistorySelectionReset,
      scrollTo,
      buildTarget: 'DEFAULT',
    });

    vi.clearAllMocks();
    route.query = {};
    await nextTick();

    expect(divination.clearResult).toHaveBeenCalledTimes(1);
  });

  it('塔罗切换牌阵后提交时会带上 spreadType', () => {
    const props = reactive({ divinationType: 'tarot' as const });
    const route = reactive({ query: {} as Record<string, unknown> });
    const divination = createDivinationStub();

    const page = useUnifiedDivinationPage(props, ref(null), {
      route,
      divination,
      getConfig: mockGetConfig,
      emitHistorySelectionReset,
      scrollTo,
      buildTarget: 'DEFAULT',
    });

    page.handleTypeChange('tarot_celtic');
    page.handleSubmit({
      question: '接下来会怎样？',
    });

    expect(divination.question.value).toBe('接下来会怎样？');
    expect(divination.startDivination).toHaveBeenCalledWith({
      spreadType: 'celtic',
    });
  });
});
