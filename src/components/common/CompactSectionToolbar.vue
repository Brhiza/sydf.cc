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
  padding: 8px 12px 4px 12px;
}

.compact-toolbar-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-secondary);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.6px;
}

.compact-toolbar-actions {
  display: flex;
  gap: 2px;
  align-items: center;
}
</style>
