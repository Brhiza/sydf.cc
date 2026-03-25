<template>
  <button class="spread-bubble" :class="{ active: isActive, 'expand-button': expandButton }" @click="$emit('select')">
    <span class="bubble-icon">{{ icon }}</span>
    <span class="bubble-text">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  icon: string
  label: string
  isActive?: boolean
  expandButton?: boolean
}>()

defineEmits<{
  (e: 'select'): void
}>()
</script>

<style scoped>
.spread-bubble {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  color: var(--color-text-secondary);
  font-size: 13px;
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.spread-bubble:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  box-shadow: var(--shadow-sm);
  transform: translateY(-1px);
}

.spread-bubble.active {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background: var(--color-primary-muted);
  font-weight: 600;
}

.spread-bubble.expand-button {
  color: var(--color-text-secondary);
}

.bubble-icon {
  font-size: 14px;
}
</style>
