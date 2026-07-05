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
  padding: var(--spacing-10) var(--spacing-8);
}

.status-page-card-error {
  border-color: color-mix(in srgb, var(--color-danger) 42%, var(--color-border));
  background: color-mix(in srgb, var(--color-danger) 8%, var(--color-background));
}

.status-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto var(--spacing-4);
  display: grid;
  place-items: center;
  border-radius: var(--radius-full);
  background: var(--color-primary-muted);
  border: 1px solid var(--color-border-light);
  color: var(--color-primary);
  font-size: 2.25rem;
  line-height: 1;
}

.status-page-card-error .status-icon {
  background: color-mix(in srgb, var(--color-danger) 12%, var(--color-background));
  border-color: color-mix(in srgb, var(--color-danger) 32%, var(--color-border));
}

.status-headline {
  font-size: clamp(2.25rem, 8vw, 3.5rem);
  font-weight: 700;
  color: var(--color-primary);
  margin: 0 0 var(--spacing-2) 0;
  letter-spacing: 0;
  line-height: 1;
}

.status-title {
  margin-bottom: var(--spacing-3);
}

.status-description {
  margin-bottom: 0;
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
}

.status-page-card-error .status-description {
  color: var(--color-danger);
}

@media (max-width: 768px) {
  .status-page-card-spacious {
    padding: var(--spacing-8) var(--spacing-5);
  }

  .status-icon {
    width: 52px;
    height: 52px;
    font-size: 1.85rem;
  }
}

@media (max-width: 480px) {
  .status-page-card-spacious {
    padding: var(--spacing-6) var(--spacing-4);
  }
}
</style>
