import { computed, ref, watch } from 'vue';
import type { DivinationType, SupplementaryInfo } from '@/types/divination';
import { tarotSpreads } from '@/utils/tarot';

interface DivinationInputProps {
  title: string;
  description: string;
  placeholder?: string;
  loading?: boolean;
  modelValue?: string;
  selectedDate?: string;
  showInspiration?: boolean;
  divinationType?: DivinationType | '';
}

interface DivinationInputEmitters {
  updateModelValue: (value: string) => void;
  updateSelectedDate: (value: string) => void;
  submit: (payload: {
    question: string;
    signNumber?: number;
    supplementaryInfo?: SupplementaryInfo | undefined;
    date?: string;
  }) => void;
  typeChange: (type: string) => void;
  clear: () => void;
}

interface SupplementaryInfoController {
  getSupplementaryInfo: (options: { date?: string }) => SupplementaryInfo | undefined;
}

interface SsgwController {
  startShaking: (question: string, supplementaryInfo?: SupplementaryInfo) => void;
}

interface UseDivinationInputStateOptions {
  emit: DivinationInputEmitters;
  supplementaryInfo: SupplementaryInfoController;
  ssgw: SsgwController;
  focusQuestionInput?: () => void;
  buildTarget?: string;
}

type TarotSpreadKey = keyof typeof tarotSpreads;

export function useDivinationInputState(
  props: DivinationInputProps,
  options: UseDivinationInputStateOptions
) {
  const question = ref(props.modelValue || '');
  const localDate = ref(props.selectedDate || '');
  const selectedSpread = ref<TarotSpreadKey>('single');

  const isCustomBuild = computed(() => options.buildTarget === 'CUSTOM');
  const isSsgw = computed(() => props.divinationType === 'ssgw');
  const isDaily = computed(() => props.divinationType === 'daily');
  const isTarot = computed(() => props.divinationType === 'tarot' || props.divinationType === 'tarot_single');

  const computedPlaceholder = computed(() => {
    if (isSsgw.value) {
      return '可输入您的问题，也可直接求签';
    }

    return props.placeholder || '请输入您的问题';
  });

  const showQuestionInput = computed(() => !isDaily.value);

  const shouldShowInspiration = computed(() => {
    if (isSsgw.value || isDaily.value) {
      return false;
    }

    return props.showInspiration ?? true;
  });

  const computedTitle = computed(() => {
    if (isTarot.value) {
      const spread = tarotSpreads[selectedSpread.value];
      return spread ? `塔罗牌·${spread.name}` : props.title;
    }

    return props.title;
  });

  const computedDescription = computed(() => {
    if (isTarot.value) {
      const spread = tarotSpreads[selectedSpread.value];
      return spread ? spread.description : props.description;
    }

    return props.description;
  });

  function resetQuestion() {
    question.value = '';
  }

  function selectSpread(spreadKey: string) {
    selectedSpread.value = spreadKey as TarotSpreadKey;
    options.emit.typeChange(`tarot_${spreadKey}`);
    question.value = '';
  }

  function buildSupplementaryInfo() {
    return options.supplementaryInfo.getSupplementaryInfo({ date: localDate.value });
  }

  function handleSubmit() {
    const supplementaryInfo = buildSupplementaryInfo();

    if (isSsgw.value) {
      const questionToSubmit = question.value.trim() || '心中所想之事';
      options.emit.clear();
      options.ssgw.startShaking(questionToSubmit, supplementaryInfo);
      return;
    }

    if (isDaily.value) {
      options.emit.clear();
      options.emit.submit({
        question: '请为我分析今日运势',
        supplementaryInfo,
        date: localDate.value,
      });
      return;
    }

    if (!question.value.trim() || props.loading) {
      return;
    }

    options.emit.submit({
      question: question.value.trim(),
      supplementaryInfo,
    });
  }

  function selectQuestion(questionText: string) {
    if (props.loading) {
      return;
    }

    question.value = questionText;
    options.focusQuestionInput?.();
  }

  function handleDirectSubmit(questionText: string) {
    if (props.loading) {
      return;
    }

    const trimmedQuestion = questionText.trim();
    if (!trimmedQuestion) {
      console.error('问题为空，无法提交');
      return;
    }

    question.value = trimmedQuestion;

    options.emit.submit({
      question: trimmedQuestion,
      supplementaryInfo: buildSupplementaryInfo(),
    });
  }

  watch(
    () => props.modelValue,
    (newValue) => {
      question.value = newValue || '';
    }
  );

  watch(
    () => props.selectedDate,
    (newDate) => {
      localDate.value = newDate || '';
    }
  );

  watch(question, (newValue) => {
    options.emit.updateModelValue(newValue);
  });

  watch(localDate, (newDate) => {
    if (newDate) {
      options.emit.updateSelectedDate(newDate);
    }
  });

  watch(
    () => props.divinationType,
    (newType, oldType) => {
      if (oldType && newType !== oldType) {
        resetQuestion();
      }

      if (newType === 'tarot' || newType === 'tarot_single') {
        options.emit.typeChange(`tarot_${selectedSpread.value}`);
      }
    },
    { immediate: true }
  );

  return {
    question,
    localDate,
    selectedSpread,
    isCustomBuild,
    isTarot,
    computedPlaceholder,
    showQuestionInput,
    shouldShowInspiration,
    computedTitle,
    computedDescription,
    selectSpread,
    handleSubmit,
    selectQuestion,
    handleDirectSubmit,
  };
}
