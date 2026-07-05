<template>
  <ContentSectionCard :title="title" :title-tag="titleTag">
    <p class="content-text qr-description">{{ description }}</p>
    <div class="qr-frame">
      <img
        :src="imageSrc"
        :alt="imageAlt"
        class="qr-code"
        :style="{ maxWidth }"
        loading="lazy"
        decoding="async"
      />
    </div>
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
.qr-description {
  max-width: 42rem;
}

.qr-frame {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: var(--spacing-2);
  padding: var(--spacing-4);
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--color-primary) 4%, transparent), transparent),
    var(--color-background-soft);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  transition:
    border-color var(--transition-base),
    box-shadow var(--transition-base),
    transform var(--transition-base);
}

.qr-frame:hover {
  border-color: color-mix(in srgb, var(--color-primary) 26%, var(--color-border));
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.qr-code {
  display: block;
  margin: 0;
  width: 100%;
  border-radius: var(--radius-lg);
  transition: transform var(--transition-base);
}

.qr-frame:hover .qr-code {
  transform: scale(1.012);
}

@media (max-width: 768px) {
  .qr-frame {
    width: 100%;
  }

  .qr-code {
    max-width: min(150px, 100%) !important;
  }
}
</style>
