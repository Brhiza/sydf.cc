<template>
  <button
    type="button"
    class="compact-icon-button"
    :class="[`compact-icon-button-${size}`, { active, 'hover-reveal': revealOnHover }]"
    :title="title"
    :aria-label="ariaLabel || title"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string;
    ariaLabel?: string;
    size?: 'default' | 'compact';
    active?: boolean;
    revealOnHover?: boolean;
  }>(),
  {
    ariaLabel: '',
    size: 'default',
    active: false,
    revealOnHover: false,
  }
);

defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();
</script>

<style scoped>
.compact-icon-button {
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--color-text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  line-height: 1;
  padding: 0;
  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast),
    color var(--transition-fast),
    box-shadow var(--transition-fast),
    opacity var(--transition-fast),
    transform var(--transition-fast);
}

.compact-icon-button-default {
  width: 28px;
  height: 28px;
}

.compact-icon-button-compact {
  width: 24px;
  height: 24px;
}

.compact-icon-button:hover {
  background: var(--color-background-soft);
  border-color: var(--color-border-light);
  color: var(--color-text-primary);
  transform: translateY(-1px);
}

.compact-icon-button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-primary) 12%, transparent);
}

.compact-icon-button.active {
  background: var(--color-primary-muted);
  border-color: color-mix(in srgb, var(--color-primary) 24%, transparent);
  color: var(--color-primary);
}

.compact-icon-button.hover-reveal {
  opacity: 0;
}

.history-item:hover .compact-icon-button.hover-reveal,
.compact-icon-button.hover-reveal.active {
  opacity: 1;
}

@media (max-width: 768px) {
  .compact-icon-button-compact {
    width: 28px;
    height: 28px;
  }

  .compact-icon-button.hover-reveal {
    opacity: 1;
  }
}
</style>
