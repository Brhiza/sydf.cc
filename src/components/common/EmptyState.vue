<template>
  <div class="empty-state" :class="[`empty-state-${size}`]">
    <div class="empty-icon">{{ icon }}</div>
    <p>{{ title }}</p>
    <p v-if="hint" class="empty-hint">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    icon?: string;
    title: string;
    hint?: string;
    size?: 'default' | 'compact';
  }>(),
  {
    icon: '📄',
    hint: '',
    size: 'default',
  }
);
</script>

<style scoped>
.empty-state {
  text-align: center;
  color: #999;
}

.empty-state-default {
  padding: var(--spacing-8);
}

.empty-state-compact {
  padding: 24px 12px;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-2);
}

.empty-state-compact .empty-icon {
  font-size: 32px;
  margin-bottom: 8px;
  opacity: 0.5;
}

.empty-state p {
  margin: var(--spacing-1) 0;
}

.empty-state-compact p {
  font-size: 12px;
  margin: 0;
}

.empty-hint {
  font-size: var(--font-size-sm);
  opacity: 0.7;
}

html.dark .empty-state {
  color: #6b7280;
}
</style>
