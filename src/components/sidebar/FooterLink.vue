<template>
  <li class="footer-item">
    <button
      :class="{ 'footer-link-active': isActive }"
      class="footer-link"
      type="button"
      @click="handleClick"
    >
      <span class="footer-text">{{ title }}</span>
    </button>
  </li>
</template>

<script setup lang="ts">
const props = defineProps<{
  path: string;
  title: string;
  isActive: boolean;
}>();

const emit = defineEmits<{
  (e: 'navigate', path: string): void;
}>();

const handleClick = () => {
  emit('navigate', props.path);
};
</script>

<style scoped>
.footer-item {
  margin-bottom: var(--spacing-1);
}

.footer-link {
  width: 100%;
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2);
  border: 1px solid transparent;
  border-radius: var(--radius-lg);
  background: transparent;
  color: var(--color-text-secondary);
  text-decoration: none;
  font: inherit;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  text-align: left;
  margin: 0;
  cursor: pointer;
  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast),
    color var(--transition-fast),
    transform var(--transition-fast);
}

.footer-link:hover {
  background: var(--color-background-soft);
  color: var(--color-text-primary);
  transform: translateX(2px);
}

.footer-link:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.footer-link.footer-link-active {
  background: var(--color-primary-muted);
  border-color: color-mix(in srgb, var(--color-primary) 18%, transparent);
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
  box-shadow: var(--shadow-sm);
}

html.dark .footer-link.footer-link-active {
  background: var(--color-background-soft);
  color: var(--color-text-primary);
}

.footer-text {
  font-weight: inherit;
  line-height: var(--line-height-normal);
}

@media (max-width: 768px) {
  .footer-link {
    padding: var(--spacing-2);
    margin: 0;
  }
}

@media (max-width: 480px) {
  .footer-text {
    font-size: var(--font-size-sm);
  }

  .footer-link {
    padding: var(--spacing-2);
    margin: 0;
  }
}
</style>
