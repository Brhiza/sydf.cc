<template>
  <div class="date-picker-container">
    <label :for="dateInputId" class="date-picker-label">选择日期</label>
    <input
      :id="dateInputId"
      type="date"
      :value="modelValue"
      class="date-picker-input"
      @input="updateDate"
    />
  </div>
</template>

<script setup lang="ts">
import { useId } from 'vue';

interface Props {
  modelValue: string; // YYYY-MM-DD
}

interface Emits {
  (e: 'update:modelValue', value: string): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();
const dateInputId = useId();

const updateDate = (event: Event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) {
    return;
  }

  emit('update:modelValue', target.value);
};
</script>

<style scoped>
.date-picker-container {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  min-width: 0;
  padding: var(--spacing-1);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  background: var(--color-background-soft);
  box-sizing: border-box;
  transition:
    border-color var(--transition-fast),
    background-color var(--transition-fast),
    box-shadow var(--transition-fast);
}

.date-picker-container:focus-within {
  border-color: var(--color-primary);
  background: var(--color-background-soft);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 14%, transparent);
}

.date-picker-label {
  padding-left: var(--spacing-2);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  white-space: nowrap;
  font-weight: var(--font-weight-medium);
}

.date-picker-input {
  min-height: 36px;
  padding: 0 var(--spacing-2);
  border: 0;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  background: color-mix(in srgb, var(--color-background) 88%, transparent);
  color: var(--color-text-primary);
  cursor: pointer;
  width: 142px;
  min-width: 0;
  transition:
    color var(--transition-fast),
    background-color var(--transition-fast);
}

.date-picker-input:hover {
  background: var(--color-background);
}

.date-picker-input:focus {
  outline: none;
  background: var(--color-background);
}

@media (max-width: 768px) {
  .date-picker-container {
    width: 100%;
  }

  .date-picker-input {
    flex: 1;
    width: auto;
  }
}
</style>
