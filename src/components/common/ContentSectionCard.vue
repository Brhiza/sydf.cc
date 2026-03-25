<template>
  <div class="content-card">
    <div
      v-if="useHeader"
      class="section-header"
      :class="{ 'section-header-divider': headerDivider }"
    >
      <component :is="titleTag" class="section-title">
        <slot name="title">{{ title }}</slot>
      </component>
      <slot name="header-actions"></slot>
    </div>
    <component :is="titleTag" v-else-if="title || $slots.title" class="section-title">
      <slot name="title">{{ title }}</slot>
    </component>

    <slot></slot>

    <div v-if="$slots.actions" class="form-actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string;
  titleTag?: 'h2' | 'h3';
  useHeader?: boolean;
  headerDivider?: boolean;
}>(), {
  title: '',
  titleTag: 'h2',
  useHeader: false,
  headerDivider: false,
});
</script>

<style scoped>
.section-header-divider {
  margin-bottom: var(--spacing-6);
  padding-bottom: var(--spacing-4);
  border-bottom: 1px solid var(--color-border);
}
</style>
