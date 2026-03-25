<template>
  <div class="result-header">
    <div
      v-for="item in items"
      :key="item.label"
      :class="['info-line', item.className]"
    >
      <span class="info-label">{{ item.label }}：</span>
      <span class="info-value">{{ item.value }}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
export interface ResultInfoHeaderItem {
  label: string;
  value: string;
  className?: string;
}

defineProps<{
  items: ResultInfoHeaderItem[];
}>();
</script>

<style scoped>
.result-header {
  margin-bottom: var(--spacing-4);
  padding: var(--spacing-4);
  background: var(--color-background-elevated);
  border-radius: var(--radius-md);
}

.info-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-2);
  line-height: 1.4;
}

.info-line:last-child {
  margin-bottom: 0;
}

.info-label {
  width: 80px;
  flex-shrink: 0;
  color: var(--color-text-secondary);
  font-size: 16px;
  font-weight: var(--font-weight-medium);
  text-align: justify;
  text-align-last: justify;
}

.info-value {
  flex: 1;
  margin-left: var(--spacing-2);
  color: var(--color-text-primary);
  font-size: 16px;
  font-weight: var(--font-weight-medium);
  text-align: left;
}

@media (max-width: 768px) {
  .info-label,
  .info-value {
    font-size: 15px;
  }
}
</style>
