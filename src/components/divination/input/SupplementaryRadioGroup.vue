<template>
  <div class="form-group">
    <label class="form-label">{{ label }}:</label>
    <div class="radio-group" :class="groupClass">
      <label
        v-for="option in options"
        :key="option.value"
        class="radio-label"
        :class="{ selected: modelValue === option.value }"
      >
        <input v-model="modelValue" type="radio" :value="option.value" />
        <span>{{ option.label }}</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
interface RadioOption {
  label: string;
  value: string;
}

defineProps<{
  label: string;
  options: RadioOption[];
  groupClass?: string;
}>();

const modelValue = defineModel<string | undefined>({ default: undefined });
</script>

<style scoped>
@import './supplementary-info.shared.css';
</style>
