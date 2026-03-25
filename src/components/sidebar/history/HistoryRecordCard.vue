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
    @click="$emit('click', $event)"
  >
    <slot></slot>
    <div v-if="$slots.actions" class="history-item-actions">
      <slot name="actions"></slot>
    </div>
  </component>
</template>

<script setup lang="ts">
withDefaults(
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

defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();
</script>

<style scoped>
.history-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  text-align: left;
  position: relative;
  transition: all 0.2s ease;
}

button.history-item {
  appearance: none;
  font: inherit;
}

.history-item-compact {
  padding: 6px 8px;
  border-radius: 6px;
  background: transparent;
}

.history-item-regular {
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
  background: var(--color-background);
  border: 1px solid var(--color-border);
}

.history-item.interactive {
  cursor: pointer;
}

.history-item-compact.interactive:hover {
  background: rgba(0, 0, 0, 0.04);
}

html.dark .history-item-compact.interactive:hover {
  background: rgba(255, 255, 255, 0.06);
}

.history-item-regular.interactive:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}

.history-item.active {
  background: #eae7f8;
  color: #6b46c1;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(234, 231, 248, 0.5);
}

html.dark .history-item.active {
  background: #232426;
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.history-item-actions {
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .history-item-compact {
    padding: 4px 6px;
    gap: 6px;
  }
}
</style>
