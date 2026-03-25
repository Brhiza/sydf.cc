<template>
  <span class="record-status-badge" :class="[`record-status-badge-${tone}`, `record-status-badge-${size}`]">
    <slot>{{ label }}</slot>
  </span>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string;
    tone?: 'warning' | 'muted';
    size?: 'default' | 'compact';
  }>(),
  {
    tone: 'warning',
    size: 'default',
  }
);
</script>

<style scoped>
.record-status-badge {
  display: inline-flex;
  align-items: center;
  border-radius: var(--radius-sm);
  font-weight: 600;
  white-space: nowrap;
}

.record-status-badge-default {
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--font-size-sm);
}

.record-status-badge-compact {
  padding: 1px 6px;
  font-size: 12px;
}

.record-status-badge-warning {
  background: #ffd54f;
  color: #5d4037;
}

.record-status-badge-muted {
  background: var(--color-background-muted);
  color: var(--color-text-secondary);
}

html.dark .record-status-badge-warning {
  background: #4e421c;
  color: #fde68a;
}

html.dark .record-status-badge-muted {
  background: #262628;
  color: #d1d5db;
}
</style>
