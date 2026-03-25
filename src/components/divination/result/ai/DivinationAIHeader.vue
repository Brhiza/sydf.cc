<template>
  <div class="ai-header">
    <h3 class="ai-title">{{ title }}</h3>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<style scoped>
.ai-header {
  margin-bottom: var(--spacing-4);
  padding-bottom: var(--spacing-4);
  border-bottom: 1px solid var(--color-border-light);
}

.ai-title {
  margin: 0;
  color: var(--color-text-primary);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
}
</style>
