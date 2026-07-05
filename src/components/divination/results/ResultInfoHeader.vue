<template>
  <div class="result-header">
    <div class="result-header-grid">
      <div v-for="item in items" :key="item.label" :class="['info-line', item.className]">
        <span class="info-label">{{ item.label }}</span>
        <span class="info-value">{{ item.value }}</span>
      </div>
    </div>
    <div v-if="$slots.default" class="result-header-extra">
      <slot></slot>
    </div>
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
  padding-bottom: var(--spacing-3);
  border-bottom: 1px solid var(--color-border-light);
}

.result-header-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--spacing-3);
}

.info-line {
  display: grid;
  grid-template-columns: minmax(72px, auto) minmax(0, 1fr);
  align-items: baseline;
  gap: var(--spacing-2);
  min-width: 0;
  line-height: 1.45;
}

.info-label {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  white-space: nowrap;
}

.info-value {
  min-width: 0;
  color: var(--color-text-primary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  text-align: left;
  overflow-wrap: anywhere;
}

.result-header-extra {
  margin-top: var(--spacing-3);
  padding-top: var(--spacing-3);
  border-top: 1px solid var(--color-border-light);
}

@media (max-width: 768px) {
  .result-header {
    padding-bottom: var(--spacing-3);
  }

  .result-header-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-2);
  }

  .info-line {
    grid-template-columns: minmax(68px, auto) minmax(0, 1fr);
  }

  .info-label {
    font-size: 13px;
  }

  .info-value {
    font-size: 15px;
  }
}
</style>
