<template>
  <button
    type="button"
    class="compact-icon-button"
    :class="[
      `compact-icon-button-${size}`,
      { active, 'hover-reveal': revealOnHover },
    ]"
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
  border: none;
  border-radius: 4px;
  background: transparent;
  color: var(--color-text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.compact-icon-button-default {
  width: 24px;
  height: 24px;
}

.compact-icon-button-compact {
  width: 20px;
  height: 20px;
}

.compact-icon-button:hover {
  background: rgba(0, 0, 0, 0.08);
  color: var(--color-text-primary);
}

html.dark .compact-icon-button:hover {
  background: rgba(255, 255, 255, 0.1);
}

.compact-icon-button.active {
  color: #6b46c1;
}

html.dark .compact-icon-button.active {
  color: rgba(255, 255, 255, 0.8);
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
    width: 18px;
    height: 18px;
  }

  .compact-icon-button.hover-reveal {
    opacity: 1;
  }
}
</style>
