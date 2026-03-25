import { computed, nextTick, ref, watch, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import { getDivinationConfig } from '@/config/divination';
import { useDivinationUnified } from '@/composables/useDivinationUnified';
import type { DivinationType, SupplementaryInfo } from '@/types';
import { eventBus, EVENTS } from '@/utils/eventBus';
import type { ChatMessage, ChatMessageRetryTarget, DivinationResult } from '@/types';

interface PageProps {
  divinationType: DivinationType;
}

interface RouteLike {
  query: Record<string, unknown>;
}

interface DivinationStateLike {
  question: Ref<string>;
  isLoading: Ref<boolean>;
  result: Ref<DivinationResult | null>;
  aiResponse: Ref<string>;
  error: Ref<string | null>;
  isAiLoading: Ref<boolean>;
  viewingHistory: Ref<boolean>;
  isCancelled: Ref<boolean>;
  conversationHistory: Ref<ChatMessage[]>;
  followUpQuestion: Ref<string>;
  isFollowUpLoading: Ref<boolean>;
  hasResult: Ref<boolean>;
  hasAiResponse: Ref<boolean>;
  startDivination: (options?: {
    signNumber?: number;
    spreadType?: string;
    supplementaryInfo?: SupplementaryInfo | undefined;
  }) => unknown;
  clearResult: () => void;
  regenerateAI: (target?: ChatMessageRetryTarget) => unknown;
  clearHistoryParam: () => void;
  cancelGeneration: () => void;
  handleSendFollowUp: () => void;
  handleHistoryParam: () => void;
}

interface UseUnifiedDivinationPageOptions {
  route?: RouteLike;
  divination?: DivinationStateLike;
  getConfig?: typeof getDivinationConfig;
  emitHistorySelectionReset?: () => void;
  scrollTo?: (x: number, y: number) => void;
  buildTarget?: string;
}

export function useUnifiedDivinationPage(
  props: PageProps,
  pageContainerRef: Ref<HTMLElement | null>,
  options: UseUnifiedDivinationPageOptions = {}
) {
  const route = options.route ?? useRoute();
  const currentGetConfig = options.getConfig ?? getDivinationConfig;
  const emitHistorySelectionReset =
    options.emitHistorySelectionReset ?? (() => eventBus.emit(EVENTS.HISTORY_SELECTION_RESET));
  const scrollToPosition = options.scrollTo ?? ((x: number, y: number) => window.scrollTo(x, y));

  const config = computed(() => currentGetConfig(props.divinationType));
  const isCustomBuild = computed(() => {
    const buildTarget = options.buildTarget ?? import.meta.env.VITE_APP_BUILD_TARGET;
    return buildTarget === 'CUSTOM';
  });
  const currentSpread = ref('single');
  const divination = options.divination ?? useDivinationUnified(props);

  const adaptedResult = computed(() => {
    if (!divination.result.value) {
      return { data: {}, aiResponse: '' };
    }

    return {
      data: divination.result.value.data,
      aiResponse: divination.aiResponse.value,
    };
  });

  function handleTypeChange(type: string) {
    if (type.startsWith('tarot_')) {
      currentSpread.value = type.replace('tarot_', '');
    }
  }

  function handleSubmit(payload: {
    question: string;
    signNumber?: number;
    supplementaryInfo?: SupplementaryInfo | undefined;
  }) {
    if (payload.question) {
      divination.question.value = payload.question;
    }

    const options: {
      signNumber?: number;
      spreadType?: string;
      supplementaryInfo?: SupplementaryInfo | undefined;
    } = {};

    if (props.divinationType === 'tarot') {
      options.spreadType = currentSpread.value;
    } else if (props.divinationType === 'ssgw' && payload.signNumber !== undefined) {
      options.signNumber = payload.signNumber;
    }

    if (payload.supplementaryInfo) {
      options.supplementaryInfo = payload.supplementaryInfo;
    }

    divination.startDivination(options);
  }

  function handleClear() {
    divination.clearResult();
    divination.clearHistoryParam();
  }

  function clearError() {
    divination.error.value = null;
  }

  function handleRetry(target?: ChatMessageRetryTarget) {
    divination.regenerateAI(target);
  }

  async function resetScrollPosition() {
    await nextTick();

    if (pageContainerRef.value) {
      pageContainerRef.value.scrollTop = 0;
    }

    scrollToPosition(0, 0);
  }

  watch(
    () => props.divinationType,
    (newType, oldType) => {
      if (!divination.viewingHistory.value && oldType && newType !== oldType) {
        divination.clearResult();
        divination.clearHistoryParam();

        resetScrollPosition();
        emitHistorySelectionReset();
      }
    },
    { immediate: false }
  );

  watch(
    () => route.query.historyId,
    (newId, oldId) => {
      if (newId && typeof newId === 'string') {
        divination.handleHistoryParam();
      } else if (oldId && !newId) {
        divination.clearResult();
      }
    },
    { immediate: true }
  );

  return {
    route,
    ...divination,
    adaptedResult,
    config,
    isCustomBuild,
    handleTypeChange,
    handleSubmit,
    handleClear,
    clearError,
    handleRetry,
  };
}
