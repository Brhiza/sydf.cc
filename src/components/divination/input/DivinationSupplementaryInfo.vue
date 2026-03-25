<template>
  <div class="supplementary-info">
    <div class="info-header">
      <a class="toggle-info" @click="showSupplementaryInfo = !showSupplementaryInfo">
        {{ showSupplementaryInfo ? '收起' : supplementaryInfoToggleText }}
        <span class="arrow" :class="{ down: !showSupplementaryInfo, up: showSupplementaryInfo }"></span>
      </a>

      <div class="info-header-actions">
        <div v-if="showDivinationMethodSelector" class="method-switcher">
          <button
            v-for="option in methodOptions"
            :key="option.value"
            type="button"
            class="method-chip"
            :class="{ active: meihuaMethod === option.value }"
            @click="meihuaMethod = option.value"
          >
            {{ option.label }}
          </button>
        </div>

        <DatePicker v-if="divinationType === 'daily'" v-model="localDate" />
      </div>
    </div>

    <MeihuaMethodFields
      v-model:meihua-method="meihuaMethod"
      v-model:meihua-number="meihuaNumber"
      v-model:meihua-external-direction="meihuaExternalDirection"
      v-model:meihua-external-count="meihuaExternalCount"
      v-model:meihua-external-person="meihuaExternalPerson"
      v-model:meihua-external-animal="meihuaExternalAnimal"
      v-model:meihua-external-object="meihuaExternalObject"
      v-model:meihua-external-sound="meihuaExternalSound"
      v-model:meihua-external-color="meihuaExternalColor"
      :show-divination-method-selector="showDivinationMethodSelector"
      :meihua-direction-options="meihuaDirectionOptions"
      :meihua-person-options="meihuaPersonOptions"
      :meihua-animal-options="meihuaAnimalOptions"
      :meihua-object-options="meihuaObjectOptions"
      :meihua-sound-options="meihuaSoundOptions"
      :meihua-color-options="meihuaColorOptions"
    />

    <transition name="fade">
      <div v-if="showSupplementaryInfo" class="info-form">
        <div class="info-notice">
          <p class="notice-text">💡 以下所有选项均非必选，填写后可获得更精准的个性化解读</p>
        </div>

        <BasicSupplementaryFields
          v-model:gender="gender"
          v-model:birth-year="birthYear"
          v-model:day-pillar-heavenly-stem="dayPillarHeavenlyStem"
          v-model:day-pillar-earthly-branch="dayPillarEarthlyBranch"
          v-model:interpretation-style="interpretationStyle"
          v-model:output-length="outputLength"
          :heavenly-stems="heavenlyStems"
          :earthly-branches="earthlyBranches"
          @reset="$emit('reset')"
        />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import type { DivinationType, MeihuaDivinationMethod } from '@/types/divination';
import DatePicker from '@/components/common/DatePicker.vue';
import BasicSupplementaryFields from './BasicSupplementaryFields.vue';
import MeihuaMethodFields from './MeihuaMethodFields.vue';

type Gender = '男' | '女' | undefined;
type InterpretationStyle = '入门' | '专业' | undefined;
type OutputLength = '精简' | '详细' | '超详细' | undefined;
type SelectOption = { name: string; remark: string };

defineProps<{
  divinationType?: DivinationType | '';
  showDivinationMethodSelector: boolean;
  supplementaryInfoToggleText: string;
  heavenlyStems: SelectOption[];
  earthlyBranches: SelectOption[];
  meihuaDirectionOptions: SelectOption[];
  meihuaPersonOptions: SelectOption[];
  meihuaAnimalOptions: SelectOption[];
  meihuaObjectOptions: SelectOption[];
  meihuaSoundOptions: SelectOption[];
  meihuaColorOptions: SelectOption[];
}>();

defineEmits<{
  (e: 'reset'): void;
}>();

const showSupplementaryInfo = defineModel<boolean>('showSupplementaryInfo', { default: false });
const localDate = defineModel<string>('localDate', { default: '' });
const gender = defineModel<Gender>('gender');
const birthYear = defineModel<number | undefined>('birthYear');
const dayPillarHeavenlyStem = defineModel<string>('dayPillarHeavenlyStem', { default: '' });
const dayPillarEarthlyBranch = defineModel<string>('dayPillarEarthlyBranch', { default: '' });
const interpretationStyle = defineModel<InterpretationStyle>('interpretationStyle');
const outputLength = defineModel<OutputLength>('outputLength');
const meihuaMethod = defineModel<MeihuaDivinationMethod>('meihuaMethod', { default: 'time' });
const meihuaNumber = defineModel<number | undefined>('meihuaNumber');
const meihuaExternalDirection = defineModel<string | undefined>('meihuaExternalDirection');
const meihuaExternalCount = defineModel<number | undefined>('meihuaExternalCount');
const meihuaExternalPerson = defineModel<string | undefined>('meihuaExternalPerson');
const meihuaExternalAnimal = defineModel<string | undefined>('meihuaExternalAnimal');
const meihuaExternalObject = defineModel<string | undefined>('meihuaExternalObject');
const meihuaExternalSound = defineModel<string | undefined>('meihuaExternalSound');
const meihuaExternalColor = defineModel<string | undefined>('meihuaExternalColor');

const methodOptions = [
  { label: '时间', value: 'time' },
  { label: '数字', value: 'number' },
  { label: '随机', value: 'random' },
  { label: '外应', value: 'external' },
] as const;
</script>

<style scoped>
@import './supplementary-info.shared.css';

.supplementary-info {
  width: 100%;
  max-width: 600px;
  margin-top: 16px;
  margin-bottom: 24px;
  text-align: left;
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  width: 100%;
}

.info-header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.toggle-info {
  color: var(--color-text-secondary);
  cursor: pointer;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  transition: color 0.3s;
}

.toggle-info:hover {
  color: var(--color-primary);
}

.arrow {
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 6px;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  transition: transform 0.3s;
}

.arrow.down {
  border-top: 5px solid currentColor;
}

.arrow.up {
  border-bottom: 5px solid currentColor;
}

.info-form {
  margin-top: 12px;
  padding: 16px;
  background: var(--color-background-muted);
  border-radius: 12px;
  border: 1px solid var(--color-border-light);
}

.method-switcher {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px;
  border: 1px solid var(--color-border-light);
  border-radius: 999px;
  background: var(--color-background-muted);
}

.method-chip {
  border: none;
  background: transparent;
  color: var(--color-text-secondary);
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 13px;
  line-height: 1;
  cursor: pointer;
  transition: all 0.2s ease;
}

.method-chip:hover {
  color: var(--color-primary);
}

.method-chip.active {
  background: var(--color-primary);
  color: #fff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .info-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .info-header-actions {
    width: 100%;
    justify-content: space-between;
  }

  .method-switcher {
    flex-wrap: wrap;
    width: 100%;
    border-radius: 16px;
  }
}
</style>
