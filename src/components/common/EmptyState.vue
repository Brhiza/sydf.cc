<template>
  <div class="empty-state" :class="[`empty-state-${size}`]">
    <div class="empty-icon" aria-hidden="true">{{ icon }}</div>
    <p class="empty-title">{{ title }}</p>
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
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl);
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--color-primary) 3%, transparent), transparent),
    var(--color-background);
  box-sizing: border-box;
  box-shadow: var(--shadow-sm);
}

.empty-state-default {
  padding: var(--spacing-8) var(--spacing-5);
}

.empty-state-compact {
  padding: var(--spacing-5) var(--spacing-3);
}

.empty-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto var(--spacing-3);
  display: grid;
  place-items: center;
  border-radius: var(--radius-full);
  background: var(--color-primary-muted);
  border: 1px solid var(--color-border-light);
  color: var(--color-primary);
  font-size: 1.65rem;
  line-height: 1;
}

.empty-state-compact .empty-icon {
  width: 40px;
  height: 40px;
  font-size: 22px;
  margin-bottom: var(--spacing-2);
}

.empty-state p {
  margin: var(--spacing-1) 0;
}

.empty-title {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
}

.empty-state-compact p {
  font-size: var(--font-size-sm);
  margin: 0;
}

.empty-hint {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  line-height: var(--line-height-normal);
  max-width: 28rem;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 480px) {
  .empty-state-default {
    padding: var(--spacing-6) var(--spacing-4);
  }

  .empty-icon {
    width: 44px;
    height: 44px;
    font-size: 1.5rem;
  }
}
</style>
