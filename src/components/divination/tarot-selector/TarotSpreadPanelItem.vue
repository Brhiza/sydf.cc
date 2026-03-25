<template>
  <div class="spread-item" :class="{ active: isActive }" @click="$emit('select')">
    <div class="item-icon">{{ icon }}</div>
    <div class="item-content">
      <div class="item-title">{{ title }}</div>
      <div class="item-description">{{ description }}</div>
    </div>
    <div class="item-meta">
      <span class="item-count">{{ cardCount }}张</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  description: string
  cardCount: number
  isActive: boolean
}>()

defineEmits<{
  (e: 'select'): void
}>()
</script>

<style scoped>
.spread-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.spread-item:hover {
  background: var(--color-background-muted);
}

.spread-item.active {
  background: var(--color-primary-muted);
}

.spread-item.active .item-title {
  color: var(--color-primary);
  font-weight: 600;
}

.item-icon {
  font-size: 20px;
  width: 24px;
  text-align: center;
  color: var(--color-text-secondary);
}

.item-content {
  flex: 1;
  min-width: 0;
}

.item-title {
  font-size: 15px;
  font-weight: 500;
  color: var(--color-text-primary);
  margin-bottom: 4px;
}

.item-description {
  font-size: 12px;
  color: var(--color-text-secondary);
  line-height: 1.4;
}

.item-meta {
  flex-shrink: 0;
}

.item-count {
  background: var(--color-background-tertiary);
  color: var(--color-text-secondary);
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
}
</style>
