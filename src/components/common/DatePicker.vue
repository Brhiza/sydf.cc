<template>
  <div class="date-picker-container">
    <label for="fortune-date" class="date-picker-label">选择日期:</label>
    <input
      id="fortune-date"
      type="date"
      :value="modelValue"
      class="date-picker-input"
      @input="updateDate"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string; // YYYY-MM-DD
}

interface Emits {
  (e: 'update:modelValue', value: string): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

const updateDate = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<style scoped>
.date-picker-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.date-picker-label {
  font-size: 13px;
  color: var(--color-text-secondary);
  white-space: nowrap;
}

.date-picker-input {
  padding: 4px 8px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 13px;
  background: var(--color-background);
  color: var(--color-text-primary);
  cursor: pointer;
  width: 130px;
}

.date-picker-input:focus {
  outline: none;
  border-color: var(--color-primary);
  background: var(--color-background);
  box-shadow: 0 0 0 3px rgba(107, 70, 193, 0.15);
}
</style>