<template>
  <section class="content-card content-section-card">
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
  </section>
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
.content-section-card {
  min-width: 0;
}

.section-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--spacing-4);
  min-width: 0;
  margin-bottom: var(--spacing-6);
}

.section-header .section-title {
  min-width: 0;
  margin-bottom: 0;
}

.section-header-divider {
  padding-bottom: var(--spacing-4);
  border-bottom: 1px solid var(--color-border-light);
}

.section-header :slotted(*) {
  flex: 0 0 auto;
}

@media (max-width: 480px) {
  .section-header {
    align-items: stretch;
    flex-direction: column;
    gap: var(--spacing-3);
  }
}
</style>
