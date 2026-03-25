<template>
  <ContentSectionCard>
    <template #title>
      {{ title }}
      <span v-if="accentText" class="highlight-text">{{ accentText }}</span>
    </template>

    <p class="content-text">{{ description }}</p>

    <div v-if="link" class="callout-link">
      <a :href="link.href">{{ link.label }}</a>
    </div>
  </ContentSectionCard>
</template>

<script setup lang="ts">
import ContentSectionCard from './ContentSectionCard.vue';

export interface InfoCalloutLink {
  href: string;
  label: string;
}

withDefaults(
  defineProps<{
    title: string;
    accentText?: string;
    description: string;
    link?: InfoCalloutLink;
  }>(),
  {
    accentText: '',
    link: undefined,
  }
);
</script>

<style scoped>
.highlight-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
}

.callout-link {
  margin-top: var(--spacing-4);
  text-align: center;
}

.callout-link a {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-4);
  background: #eae7f8;
  color: #6b46c1;
  text-decoration: none;
  border-radius: var(--radius-md);
  font-weight: 500;
  transition: all 0.3s ease;
}

html.dark .callout-link a {
  background: #262628;
  color: #a78bfa;
}

.callout-link a:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 215, 0, 0.6);
  border-color: #ffd700;
}
</style>
