<template>
  <div>
    <SupplementaryRadioGroup
      v-model="gender"
      label="性别"
      :options="genderOptions"
    />

    <div class="form-group">
      <label for="birthYear" class="form-label">出生年份:</label>
      <input
        id="birthYear"
        v-model.number="birthYear"
        type="number"
        placeholder="例如: 1990"
        class="year-input"
      />
    </div>

    <div class="form-group">
      <label class="form-label">日干:</label>
      <div class="input-with-remark narrow">
        <CustomSelect v-model="dayPillarHeavenlyStem" :options="heavenlyStems" placeholder="请选择日干" />
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">日支:</label>
      <div class="input-with-remark narrow">
        <CustomSelect v-model="dayPillarEarthlyBranch" :options="earthlyBranches" placeholder="请选择日支" />
      </div>
    </div>

    <SupplementaryRadioGroup
      v-model="interpretationStyle"
      label="解读风格"
      :options="interpretationStyleOptions"
    />

    <SupplementaryRadioGroup
      v-model="outputLength"
      label="输出长度"
      :options="outputLengthOptions"
    />

    <div class="form-group form-actions">
      <button class="reset-button" @click="$emit('reset')">重置</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomSelect from '@/components/common/CustomSelect.vue';
import SupplementaryRadioGroup from './SupplementaryRadioGroup.vue';

type Gender = '男' | '女' | undefined;
type InterpretationStyle = '入门' | '专业' | undefined;
type OutputLength = '精简' | '详细' | '超详细' | undefined;
type SelectOption = { name: string; remark: string };

defineProps<{
  heavenlyStems: SelectOption[];
  earthlyBranches: SelectOption[];
}>();

defineEmits<{
  reset: [];
}>();

const gender = defineModel<Gender>('gender');
const birthYear = defineModel<number | undefined>('birthYear');
const dayPillarHeavenlyStem = defineModel<string>('dayPillarHeavenlyStem', { default: '' });
const dayPillarEarthlyBranch = defineModel<string>('dayPillarEarthlyBranch', { default: '' });
const interpretationStyle = defineModel<InterpretationStyle>('interpretationStyle');
const outputLength = defineModel<OutputLength>('outputLength');

const genderOptions = [
  { label: '男', value: '男' },
  { label: '女', value: '女' },
];

const interpretationStyleOptions = [
  { label: '入门', value: '入门' },
  { label: '专业', value: '专业' },
];

const outputLengthOptions = [
  { label: '精简', value: '精简' },
  { label: '详细', value: '详细' },
  { label: '超详细', value: '超详细' },
];
</script>

<style scoped>
@import './supplementary-info.shared.css';
</style>
