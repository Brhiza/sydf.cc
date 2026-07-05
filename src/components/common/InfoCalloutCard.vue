<template>
  <ContentSectionCard>
    <template #title>
      {{ title }}
      <span v-if="accentText" class="highlight-text">{{ accentText }}</span>
    </template>

    <p class="content-text">{{ description }}</p>

    <slot name="before-link"></slot>

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
  background: linear-gradient(
    135deg,
    var(--color-primary) 0%,
    var(--color-primary-light) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: var(--font-weight-bold);
}

.callout-link {
  display: flex;
  justify-content: center;
  margin-top: var(--spacing-4);
}

.callout-link a {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-3);
  background: var(--color-primary-muted);
  color: var(--color-primary);
  text-decoration: none;
  border: 1px solid color-mix(in srgb, var(--color-primary) 16%, var(--color-border-light));
  border-radius: var(--radius-lg);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-tight);
  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast),
    box-shadow var(--transition-fast),
    transform var(--transition-fast);
}

.callout-link a:hover {
  background:
    linear-gradient(135deg, var(--color-primary-muted), var(--color-background)),
    linear-gradient(120deg, transparent 0%, rgba(255, 215, 0, 0.32) 48%, transparent 70%);
  background-size:
    100% 100%,
    240% 100%;
  border-color: color-mix(in srgb, var(--color-primary) 32%, var(--color-border));
  box-shadow:
    var(--shadow-sm),
    0 0 18px rgba(255, 215, 0, 0.46);
  transform: translateY(-1px);
  animation: goldGlow 1.8s ease-in-out infinite;
}

.callout-link a:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

@keyframes goldGlow {
  0%,
  100% {
    background-position:
      0 0,
      0% 50%;
    box-shadow:
      var(--shadow-sm),
      0 0 12px rgba(255, 215, 0, 0.3);
  }

  50% {
    background-position:
      0 0,
      100% 50%;
    box-shadow:
      var(--shadow-sm),
      0 0 22px rgba(255, 215, 0, 0.58);
  }
}
</style>
