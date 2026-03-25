<template>
  <ContentSectionCard :title="title" :title-tag="titleTag">
    <p class="content-text">{{ description }}</p>
    <img
      :src="imageSrc"
      :alt="imageAlt"
      class="qr-code"
      :style="{ maxWidth }"
    />
  </ContentSectionCard>
</template>

<script setup lang="ts">
import ContentSectionCard from './ContentSectionCard.vue';

withDefaults(defineProps<{
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  maxWidth?: string;
  titleTag?: 'h2' | 'h3';
}>(), {
  maxWidth: '160px',
  titleTag: 'h3',
});
</script>

<style scoped>
.qr-code {
  display: block;
  margin: 0;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
}

.qr-code:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

@media (max-width: 768px) {
  .qr-code {
    max-width: min(150px, 100%) !important;
  }
}
</style>
