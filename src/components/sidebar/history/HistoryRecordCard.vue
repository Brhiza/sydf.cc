<template>
  <component
    :is="tag"
    class="history-item"
    :class="[
      `history-item-${size}`,
      {
        active: isActive,
        interactive,
      },
    ]"
    :type="tag === 'button' ? buttonType : undefined"
    :role="tag === 'div' && interactive ? 'button' : undefined"
    :tabindex="tag === 'div' && interactive ? 0 : undefined"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <slot></slot>
    <div v-if="$slots.actions" class="history-item-actions">
      <slot name="actions"></slot>
    </div>
  </component>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    tag?: 'div' | 'button';
    size?: 'compact' | 'regular';
    isActive?: boolean;
    interactive?: boolean;
    buttonType?: 'button' | 'submit' | 'reset';
  }>(),
  {
    tag: 'div',
    size: 'compact',
    isActive: false,
    interactive: true,
    buttonType: 'button',
  }
);

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

function handleClick(event: MouseEvent) {
  if (!props.interactive) {
    return;
  }

  emit('click', event);
}

function handleKeydown(event: KeyboardEvent) {
  if (props.tag !== 'div' || !props.interactive) {
    return;
  }

  if (event.target !== event.currentTarget || !event.currentTarget) {
    return;
  }

  if (event.key !== 'Enter' && event.key !== ' ') {
    return;
  }

  event.preventDefault();
  emit('click', new MouseEvent('click'));
}
</script>

<style scoped>
.history-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  border: 1px solid transparent;
  text-align: left;
  position: relative;
  color: var(--color-text-secondary);
  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast),
    box-shadow var(--transition-fast),
    color var(--transition-fast);
}

button.history-item {
  appearance: none;
  font: inherit;
}

.history-item-compact {
  padding: var(--spacing-2);
  border-radius: var(--radius-lg);
  background: transparent;
}

.history-item-regular {
  padding: var(--spacing-4);
  border-radius: var(--radius-lg);
  background: var(--color-background);
  border-color: var(--color-border-light);
}

.history-item.interactive {
  cursor: pointer;
}

.history-item-compact.interactive:hover {
  background: var(--color-background-soft);
  color: var(--color-text-primary);
}

.history-item-regular.interactive:hover {
  border-color: color-mix(in srgb, var(--color-primary) 28%, var(--color-border));
  box-shadow: var(--shadow-sm);
}

.history-item:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.history-item.active {
  background: var(--color-primary-muted);
  border-color: color-mix(in srgb, var(--color-primary) 18%, transparent);
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
  box-shadow: var(--shadow-sm);
}

html.dark .history-item.active {
  background: var(--color-background-soft);
  color: var(--color-text-primary);
}

.history-item-actions {
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .history-item-compact {
    padding: var(--spacing-2);
    gap: var(--spacing-2);
  }
}
</style>
