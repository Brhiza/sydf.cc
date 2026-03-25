<template>
  <div class="input-card" :class="{ loading: loading }">
    <DivinationPromptCard
      :divination-type="divinationType"
      :title="computedTitle"
      :description="computedDescription"
      :placeholder="computedPlaceholder"
      :button-text="buttonText"
      :loading-text="loadingText"
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
      :divination-type="divinationType"
      :show-divination-method-selector="divinationType === 'meihua'"
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
      :current-qian="currentQian"
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
  loadingText?: string;
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
  (e: 'submit', payload: { question: string; signNumber?: number; supplementaryInfo?: SupplementaryInfo | undefined; date?: string }): void;
  (e: 'typeChange', type: string): void;
  (e: 'clear'): void;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '请输入您的问题',
  buttonText: '询问赛博大师',
  loadingText: 'AI思考中',
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
  currentQian,
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
    typeChange: (type) => emit('typeChange', type),
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
});
</script>

<style scoped>
.input-card {
  width: 100%;
  background: var(--color-background);
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--color-border-light);
  padding: 32px;
  box-sizing: border-box;
  transition: all 0.3s ease;
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
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.toggle-container {
  display: flex;
  background: var(--color-background-muted);
  border-radius: 12px;
  padding: 4px;
  width: 100%;
  max-width: 300px;
}

.toggle-button {
  flex: 1;
  padding: 10px 16px;
  border: none;
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.toggle-button.active {
  background: var(--color-primary);
  color: white;
  box-shadow: 0 2px 8px rgba(161, 52, 219, 0.3);
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
    padding: 24px 16px;
  }

  .tarot-spread-container {
    margin-bottom: 2px;
  }
}

@media (max-width: 480px) {
  .input-card {
    padding: 20px 12px;
  }

  .tarot-spread-container {
    margin-bottom: 0;
  }
}
</style>
