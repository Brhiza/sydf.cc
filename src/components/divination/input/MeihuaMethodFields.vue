<template>
  <div v-if="showDivinationMethodSelector && meihuaMethod === 'number'" class="method-panel">
    <div class="method-panel-row">
      <label for="meihuaNumber" class="form-label">起卦数字:</label>
      <input
        id="meihuaNumber"
        v-model.number="meihuaNumber"
        type="number"
        min="1"
        placeholder="请输入用于起卦的正整数"
        class="method-number-input"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MeihuaDivinationMethod } from '@/types/divination';

defineProps<{
  showDivinationMethodSelector: boolean;
}>();

const meihuaMethod = defineModel<MeihuaDivinationMethod>('meihuaMethod', { default: 'time' });
const meihuaNumber = defineModel<number | undefined>('meihuaNumber');
</script>

<style scoped>
@import './supplementary-info.shared.css';

.method-panel {
  margin-top: var(--spacing-3);
  padding: var(--spacing-4);
  background: var(--color-background-muted);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border-light);
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
}

.method-panel-row {
  display: grid;
  grid-template-columns: 70px minmax(0, 1fr);
  align-items: center;
  gap: var(--spacing-4);
}

.method-number-input {
  width: min(280px, 100%);
  max-width: 100%;
  min-width: 0;
  padding: var(--spacing-2) var(--spacing-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-background);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  box-sizing: border-box;
  transition:
    border-color var(--transition-fast),
    background-color var(--transition-fast),
    box-shadow var(--transition-fast);
}

.method-number-input:focus {
  outline: none;
  border-color: var(--color-primary);
  background: var(--color-background-soft);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-primary) 16%, transparent);
}

@media (max-width: 768px) {
  .method-panel {
    padding: var(--spacing-3);
  }

  .method-panel-row {
    grid-template-columns: 1fr;
    align-items: flex-start;
    gap: var(--spacing-2);
  }

  .method-number-input {
    width: 100%;
  }
}
</style>
