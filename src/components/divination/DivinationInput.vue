<template>
  <div class="input-card" :class="{ loading: loading }">
    <DivinationPromptCard
      :divination-type="divinationType"
      :title="computedTitle"
      :description="computedDescription"
      :placeholder="computedPlaceholder"
      :button-text="buttonText"
      :loading="loading"
      :question="question"
      :selected-spread="selectedSpread"
      :is-tarot="isTarot"
      :is-custom-build="isCustomBuild"
      :show-question-input="showQuestionInput"
      :disable-submit="loading || (divinationType !== 'ssgw' && divinationType !== 'daily' && !question.trim())"
      @update:question="question = $event"
      @update:selected-spread="selectSpread"
      @submit="handleSubmit"
    />

    <DivinationSupplementaryInfo
      v-model:show-supplementary-info="showSupplementaryInfo"
      v-model:local-date="localDate"
      v-model:gender="gender"
      v-model:birth-year="birthYear"
      v-model:day-pillar-heavenly-stem="dayPillarHeavenlyStem"
      v-model:day-pillar-earthly-branch="dayPillarEarthlyBranch"
      v-model:interpretation-style="interpretationStyle"
      v-model:output-length="outputLength"
      v-model:meihua-method="meihuaMethod"
      v-model:meihua-number="meihuaNumber"
      v-model:meihua-external-direction="meihuaExternalDirection"
      v-model:meihua-external-count="meihuaExternalCount"
      v-model:meihua-external-person="meihuaExternalPerson"
      v-model:meihua-external-animal="meihuaExternalAnimal"
      v-model:meihua-external-object="meihuaExternalObject"
      v-model:meihua-external-sound="meihuaExternalSound"
      v-model:meihua-external-color="meihuaExternalColor"
      v-model:qimen-method="qimenMethod"
      v-model:qimen-scope="qimenScope"
      :divination-type="divinationType"
      :show-divination-method-selector="divinationType === 'meihua'"
      :show-qimen-method-selector="divinationType === 'qimen'"
      :supplementary-info-toggle-text="supplementaryInfoToggleText"
      :heavenly-stems="heavenlyStems"
      :earthly-branches="earthlyBranches"
      :meihua-direction-options="meihuaDirectionOptions"
      :meihua-person-options="meihuaPersonOptions"
      :meihua-animal-options="meihuaAnimalOptions"
      :meihua-object-options="meihuaObjectOptions"
      :meihua-sound-options="meihuaSoundOptions"
      :meihua-color-options="meihuaColorOptions"
      @reset="resetSupplementaryInfo"
    />

    <SsgwProcess
      v-if="divinationType === 'ssgw'"
      :is-shaking="isShaking"
      :shaking-message="shakingMessage"
      :shaking-progress="shakingProgress"
      :is-tossing="isTossing"
      :show-toss-result="showTossResult"
      :bei-results="beiResults"
      :toss-result="tossResult"
      :toss-count="tossCount"
      :is-approved="isApproved"
      @toss="tossShengBei"
    />
  </div>

  <!-- 问题灵感面板 - 根据条件显示 -->
  <InspirationPanel
    v-if="shouldShowInspiration"
    :spread-type="isTarot ? selectedSpread : null"
    @select="selectQuestion"
    @submit="handleDirectSubmit"
  />
</template>

<script setup lang="ts">
import type { DivinationType, QuestionExample, SupplementaryInfo } from '@/types/divination';
import { useSsgw } from '@/composables/useSsgw';
import { useDivinationInputState } from '@/composables/useDivinationInputState';
import { useSupplementaryInfo } from '@/composables/useSupplementaryInfo';
import { computed } from 'vue';
import InspirationPanel from './InspirationPanel.vue';
import DivinationSupplementaryInfo from './input/DivinationSupplementaryInfo.vue';
import SsgwProcess from './input/SsgwProcess.vue';
import DivinationPromptCard from './input/DivinationPromptCard.vue';

interface Props {
  title: string;
  description: string;
  placeholder?: string;
  buttonText?: string;
  loading?: boolean;
  modelValue?: string;
  selectedDate?: string; // YYYY-MM-DD
  examples?: (QuestionExample | string)[];
  showInspiration?: boolean;
  hideAfterSubmit?: boolean; // 提交后是否隐藏问题灵感
  divinationType?: DivinationType | ''; // 占卜类型
}

interface Emits {
  (e: 'update:modelValue', value: string): void;
  (e: 'update:selectedDate', value: string): void;
  (e: 'submit', payload: { question: string; supplementaryInfo?: SupplementaryInfo | undefined; date?: string }): void;
  (e: 'spreadChange', spread: string): void;
  (e: 'clear'): void;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '请输入您的问题',
  buttonText: '询问赛博大师',
  loading: false,
  modelValue: '',
  selectedDate: '',
  examples: () => [],
  showInspiration: true,
  hideAfterSubmit: true,
  divinationType: '',
});

const emit = defineEmits<Emits>();

// 使用 useSupplementaryInfo 可组合函数
const {
  showSupplementaryInfo,
  gender,
  birthYear,
  interpretationStyle,
  outputLength,
  dayPillarHeavenlyStem,
  dayPillarEarthlyBranch,
  meihuaMethod,
  meihuaNumber,
  meihuaExternalDirection,
  meihuaExternalCount,
  meihuaExternalPerson,
  meihuaExternalAnimal,
  meihuaExternalObject,
  meihuaExternalSound,
  meihuaExternalColor,
  qimenMethod,
  qimenScope,
  heavenlyStems,
  earthlyBranches,
  meihuaDirectionOptions,
  meihuaPersonOptions,
  meihuaAnimalOptions,
  meihuaObjectOptions,
  meihuaSoundOptions,
  meihuaColorOptions,
  supplementaryInfoToggleText,
  getSupplementaryInfo,
  resetSupplementaryInfo,
} = useSupplementaryInfo();

// 使用 useSsgw 可组合函数
const {
  isShaking,
  shakingMessage,
  shakingProgress,
  isTossing,
  showTossResult,
  beiResults,
  tossResult,
  tossCount,
  isApproved,
  startShaking,
  tossShengBei,
} = useSsgw(emit);

const {
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
} = useDivinationInputState(props, {
  emit: {
    updateModelValue: (value) => emit('update:modelValue', value),
    updateSelectedDate: (value) => emit('update:selectedDate', value),
    submit: (payload) => emit('submit', payload),
    spreadChange: (spread) => emit('spreadChange', spread),
    clear: () => emit('clear'),
  },
  supplementaryInfo: {
    getSupplementaryInfo,
  },
  ssgw: {
    startShaking,
  },
  focusQuestionInput: () => {
    const promptInput = document.getElementById('userInput');
    if (promptInput) {
      promptInput.focus();
    }
  },
  buildTarget: import.meta.env.VITE_APP_BUILD_TARGET,
  mode: import.meta.env.MODE,
});
</script>

<style scoped>
.input-card {
  width: 100%;
  background: var(--color-background);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-base);
  border: 1px solid var(--color-border-light);
  padding: var(--spacing-8);
  box-sizing: border-box;
  transition:
    border-color var(--transition-base),
    box-shadow var(--transition-base),
    transform var(--transition-base);
  position: relative;
  overflow: visible;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

html.dark .input-card {
  background: var(--color-background-elevated);
}

.input-card.loading {
  box-shadow: var(--shadow-md);
}

.toggle-container {
  display: flex;
  background: var(--color-background-muted);
  border-radius: var(--radius-lg);
  padding: var(--spacing-1);
  width: 100%;
  max-width: 300px;
}

.toggle-button {
  flex: 1;
  padding: var(--spacing-2) var(--spacing-4);
  border: none;
  background: transparent;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  border-radius: var(--radius-md);
  transition:
    background-color var(--transition-base),
    color var(--transition-base),
    box-shadow var(--transition-base);
}

.toggle-button.active {
  background: var(--color-primary);
  color: var(--color-text-inverse);
  box-shadow: var(--shadow-sm);
}

.tarot-spread-container {
  width: 100%;
  max-width: 600px;
  /* 允许下拉菜单超出容器显示 */
  overflow: visible;
  position: relative;
  z-index: 10;
}

@media (max-width: 768px) {
  .input-card {
    padding: var(--spacing-6) var(--spacing-4);
  }

  .tarot-spread-container {
    margin-bottom: 2px;
  }
}

@media (max-width: 480px) {
  .input-card {
    padding: var(--spacing-5) var(--spacing-3);
  }

  .tarot-spread-container {
    margin-bottom: 0;
  }
}
</style>
