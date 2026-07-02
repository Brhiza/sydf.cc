import { computed, nextTick, ref, watch, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import { getDivinationConfig } from '@/config/divination';
import { useDivinationUnified } from '@/composables/useDivinationUnified';
import type { DivinationType, SupplementaryInfo } from '@/types';
import { eventBus, EVENTS } from '@/utils/eventBus';
import type { ChatMessage, ChatMessageRetryTarget, DivinationResult } from '@/types';
import { isCustomBuild } from '@/utils/build-target';
import { resolveRouteHistoryId } from './useRouteHistoryParam';

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
    spreadType?: string;
    supplementaryInfo?: SupplementaryInfo | undefined;
  }) => unknown;
  clearResult: () => void;
  detachResultForBackground: () => void;
  regenerateAI: (target?: ChatMessageRetryTarget) => unknown;
  clearHistoryParam: () => void;
  cancelGeneration: () => void;
  handleSendFollowUp: () => void;
  handleHistoryParam: () => void;
  refreshHistoryState: () => void;
}

interface UseUnifiedDivinationPageOptions {
  route?: RouteLike;
  divination?: DivinationStateLike;
  getConfig?: typeof getDivinationConfig;
  emitHistorySelectionReset?: () => void;
  scrollTo?: (x: number, y: number) => void;
  buildTarget?: string;
  mode?: string;
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
  const customBuildEnabled = computed(() =>
    isCustomBuild({
      buildTarget: options.buildTarget ?? import.meta.env.VITE_APP_BUILD_TARGET,
      mode: options.mode ?? import.meta.env.MODE,
    })
  );
  const currentSpread = ref('single');
  const divination = options.divination ?? useDivinationUnified(props);

  const displayResult = computed<DivinationResult | null>(() => {
    if (!divination.result.value) {
      return null;
    }

    return {
      ...divination.result.value,
      aiResponse: divination.aiResponse.value,
    };
  });

  function handleSpreadChange(spread: string) {
    if (!spread) {
      return;
    }

    currentSpread.value = spread.startsWith('tarot_') ? spread.replace('tarot_', '') : spread;
  }

  function handleSubmit(payload: {
    question: string;
    supplementaryInfo?: SupplementaryInfo | undefined;
  }) {
    if (payload.question) {
      divination.question.value = payload.question;
    }

    const options: {
      spreadType?: string;
      supplementaryInfo?: SupplementaryInfo | undefined;
    } = {};

    if (props.divinationType === 'tarot') {
      options.spreadType = currentSpread.value;
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
        divination.detachResultForBackground();
        divination.clearHistoryParam();

        resetScrollPosition();
        emitHistorySelectionReset();
      }
    },
    { immediate: false }
  );

  watch(
    () => resolveRouteHistoryId(route.query),
    (newId, oldId) => {
      if (newId) {
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
    displayResult,
    config,
    isCustomBuild: customBuildEnabled,
    handleSpreadChange,
    handleSubmit,
    handleClear,
    clearError,
    handleRetry,
  };
}
