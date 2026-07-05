<template>
  <li class="nav-item">
    <button
      :class="{ 'nav-link-active': isActive }"
      class="nav-link-content"
      type="button"
      @click="handleClick"
    >
      <span class="nav-icon">{{ icon }}</span>
      <span class="nav-text">{{ title }}</span>
    </button>
  </li>
</template>

<script setup lang="ts">
const props = defineProps<{
  path: string;
  title: string;
  icon: string;
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
.nav-item {
  margin-bottom: var(--spacing-1);
}

.nav-link-content {
  width: 100%;
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  padding: var(--spacing-2) var(--spacing-4);
  border: 1px solid transparent;
  border-radius: var(--radius-lg);
  background: transparent;
  color: var(--color-text-secondary);
  cursor: pointer;
  margin: 0;
  font: inherit;
  font-weight: var(--font-weight-medium);
  text-align: left;
  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast),
    color var(--transition-fast),
    transform var(--transition-fast);
}

.nav-link-content:hover {
  background: var(--color-background-soft);
  color: var(--color-text-primary);
  transform: translateX(2px);
}

.nav-link-content:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.nav-link-content.nav-link-active {
  background: var(--color-primary-muted);
  border-color: color-mix(in srgb, var(--color-primary) 18%, transparent);
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
  box-shadow: var(--shadow-sm);
}

html.dark .nav-link-content.nav-link-active {
  background: var(--color-background-soft);
  color: var(--color-text-primary);
}

.nav-icon {
  font-size: 18px;
  width: 20px;
  text-align: center;
  flex-shrink: 0;
}

.nav-link-content.nav-link-active .nav-icon {
  color: var(--color-primary);
}

html.dark .nav-link-content.nav-link-active .nav-icon {
  color: var(--color-text-primary);
}

.nav-text {
  font-size: var(--font-size-sm);
  font-weight: inherit;
  line-height: var(--line-height-normal);
}

@media (max-width: 768px) {
  .nav-link-content {
    padding: var(--spacing-2) var(--spacing-3);
    margin: 0 var(--spacing-3);
  }
}

@media (max-width: 480px) {
  .nav-text {
    font-size: var(--font-size-sm);
  }

  .nav-link-content {
    padding: var(--spacing-2);
    margin: 0 var(--spacing-1);
  }
}
</style>
