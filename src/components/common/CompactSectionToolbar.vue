<template>
  <div class="compact-toolbar">
    <component :is="titleTag" class="compact-toolbar-title">{{ title }}</component>
    <div v-if="$slots.actions" class="compact-toolbar-actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string;
    titleTag?: 'h2' | 'h3' | 'h4';
  }>(),
  {
    titleTag: 'h3',
  }
);
</script>

<style scoped>
.compact-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-2);
  min-height: 36px;
  padding: var(--spacing-2) var(--spacing-3) var(--spacing-1);
}

.compact-toolbar-title {
  min-width: 0;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  margin: 0;
  line-height: var(--line-height-tight);
  letter-spacing: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.compact-toolbar-actions {
  display: flex;
  gap: var(--spacing-1);
  align-items: center;
  flex: 0 0 auto;
  min-width: 0;
}
</style>
