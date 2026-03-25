import { beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick, reactive } from 'vue';
import { useDivinationInputState } from './useDivinationInputState';

describe('useDivinationInputState', () => {
  const emit = {
    updateModelValue: vi.fn(),
    updateSelectedDate: vi.fn(),
    submit: vi.fn(),
    typeChange: vi.fn(),
    clear: vi.fn(),
  };

  const supplementaryInfo = {
    getSupplementaryInfo: vi.fn(),
  };

  const ssgw = {
    startShaking: vi.fn(),
  };

  const focusQuestionInput = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    supplementaryInfo.getSupplementaryInfo.mockReturnValue({
      date: '2026-03-24',
      interpretationStyle: '专业',
    });
  });

  function createState(overrides: Partial<Parameters<typeof useDivinationInputState>[0]> = {}) {
    const props = reactive({
      title: '标题',
      description: '描述',
      placeholder: '请输入问题',
      loading: false,
      modelValue: '',
      selectedDate: '2026-03-24',
      showInspiration: true,
      divinationType: 'qimen' as const,
      ...overrides,
    });

    const state = useDivinationInputState(props, {
      emit,
      supplementaryInfo,
      ssgw,
      focusQuestionInput,
      buildTarget: 'DEFAULT',
    });

    return { props, state };
  }

  it('外部 selectedDate 变化时会同步更新本地日期', async () => {
    const { props, state } = createState();

    props.selectedDate = '2026-03-30';
    await nextTick();

    expect(state.localDate.value).toBe('2026-03-30');
    expect(emit.updateSelectedDate).toHaveBeenCalledWith('2026-03-30');
  });

  it('塔罗类型初始化时会立即同步默认牌阵', () => {
    createState({ divinationType: 'tarot' });

    expect(emit.typeChange).toHaveBeenCalledWith('tarot_single');
  });

  it('三山国王灵签空问题提交时会使用默认问题并先清空结果', () => {
    const { state } = createState({ divinationType: 'ssgw' });

    state.handleSubmit();

    expect(emit.clear).toHaveBeenCalledTimes(1);
    expect(ssgw.startShaking).toHaveBeenCalledWith('心中所想之事', {
      date: '2026-03-24',
      interpretationStyle: '专业',
    });
  });

  it('今日运势提交时会带上固定问题和日期', () => {
    const { state } = createState({ divinationType: 'daily' });

    state.handleSubmit();

    expect(emit.clear).toHaveBeenCalledTimes(1);
    expect(emit.submit).toHaveBeenCalledWith({
      question: '请为我分析今日运势',
      supplementaryInfo: {
        date: '2026-03-24',
        interpretationStyle: '专业',
      },
      date: '2026-03-24',
    });
  });

  it('直接提交问题时会裁剪空白并触发提交', () => {
    const { state } = createState({ divinationType: 'qimen' });

    state.handleDirectSubmit('  我接下来该怎么做？  ');

    expect(state.question.value).toBe('我接下来该怎么做？');
    expect(emit.submit).toHaveBeenCalledWith({
      question: '我接下来该怎么做？',
      supplementaryInfo: {
        date: '2026-03-24',
        interpretationStyle: '专业',
      },
    });
  });

  it('梅花提交时会透传自定义起卦设置', () => {
    supplementaryInfo.getSupplementaryInfo.mockReturnValue({
      interpretationStyle: '专业',
      meihuaSettings: {
        method: 'external',
        externalOmens: {
          direction: '东',
          person: '少女',
          count: 5,
        },
      },
    });

    const { state } = createState({ divinationType: 'meihua' });
    state.question.value = '我接下来该怎么做？';

    state.handleSubmit();

    expect(emit.submit).toHaveBeenCalledWith({
      question: '我接下来该怎么做？',
      supplementaryInfo: {
        interpretationStyle: '专业',
        meihuaSettings: {
          method: 'external',
          externalOmens: {
            direction: '东',
            person: '少女',
            count: 5,
          },
        },
      },
    });
  });

  it('选择灵感问题时会聚焦输入框', () => {
    const { state } = createState();

    state.selectQuestion('新的问题');

    expect(state.question.value).toBe('新的问题');
    expect(focusQuestionInput).toHaveBeenCalledTimes(1);
  });
});
