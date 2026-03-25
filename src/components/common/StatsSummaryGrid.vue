<template>
  <div class="stats-container">
    <div
      v-for="item in items"
      :key="item.label"
      class="stat-item"
    >
      <div class="stat-number">{{ item.value }}</div>
      <div class="stat-label">{{ item.label }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  items: Array<{
    label: string;
    value: string | number;
  }>;
}>();
</script>

<style scoped>
.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--spacing-4);
  margin-top: var(--spacing-4);
}

.stat-item {
  padding: var(--spacing-4);
  background: #ffffff;
  border-radius: var(--radius-lg);
  text-align: center;
}

html.dark .stat-item {
  background: #262628;
  border: 1px solid #262628;
}

.stat-number {
  font-size: var(--font-size-xl);
  font-weight: 700;
  margin-bottom: var(--spacing-1);
}

.stat-label {
  font-size: var(--font-size-sm);
  font-weight: 500;
}

@media (max-width: 768px) {
  .stats-container {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-2);
  }

  .stat-item {
    padding: var(--spacing-2);
  }

  .stat-number {
    font-size: var(--font-size-lg);
  }

  .stat-label {
    font-size: var(--font-size-xs);
  }
}
</style>
