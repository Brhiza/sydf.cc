<template>
  <ContentSectionCard
    class="status-page-card"
    :class="[
      `status-page-card-${tone}`,
      {
        'status-page-card-centered': centered,
        'status-page-card-spacious': spacious,
      },
    ]"
  >
    <div v-if="icon" class="status-icon">{{ icon }}</div>
    <div v-if="headline" class="status-headline">{{ headline }}</div>
    <component :is="titleTag" v-if="title" class="section-title status-title">{{ title }}</component>
    <p v-if="description" class="content-text status-description">{{ description }}</p>

    <div v-if="$slots.actions" class="form-actions">
      <slot name="actions"></slot>
    </div>
  </ContentSectionCard>
</template>

<script setup lang="ts">
import ContentSectionCard from './ContentSectionCard.vue';

withDefaults(
  defineProps<{
    icon?: string;
    headline?: string;
    title?: string;
    description?: string;
    tone?: 'default' | 'error';
    titleTag?: 'h1' | 'h2' | 'h3';
    centered?: boolean;
    spacious?: boolean;
  }>(),
  {
    icon: '',
    headline: '',
    title: '',
    description: '',
    tone: 'default',
    titleTag: 'h2',
    centered: true,
    spacious: false,
  }
);
</script>

<style scoped>
.status-page-card-centered {
  text-align: center;
}

.status-page-card-spacious {
  padding: var(--spacing-16) var(--spacing-8);
}

.status-page-card-error {
  border-color: var(--color-error);
  background-color: var(--color-error-light, #fee);
}

.status-icon {
  font-size: 4rem;
  margin-bottom: var(--spacing-4);
}

.status-headline {
  font-size: 4rem;
  font-weight: 700;
  color: var(--color-primary);
  margin: 0 0 var(--spacing-4) 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.status-title {
  margin-bottom: var(--spacing-4);
}

.status-description {
  margin-bottom: 0;
}

.status-page-card-error .status-description {
  color: var(--color-error);
}

@media (max-width: 768px) {
  .status-page-card-spacious {
    padding: var(--spacing-10) var(--spacing-5);
  }

  .status-headline,
  .status-icon {
    font-size: 3rem;
  }
}
</style>
