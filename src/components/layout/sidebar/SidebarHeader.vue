<template>
  <div class="sidebar-header">
    <div class="logo-section">
      <span class="logo-text">{{ title }}</span>
      <img src="/static/favicon.png" alt="网站Logo" class="website-logo" />
      <button
        class="theme-toggle-compact"
        type="button"
        :title="themeTitle"
        :aria-label="themeTitle || '切换主题'"
        @click="$emit('toggle-theme')"
      >
        <span class="theme-icon-compact">{{ themeIcon }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  themeTitle?: string
  themeIcon?: string
}>()

defineEmits<{
  (e: 'toggle-theme'): void
}>()
</script>

<style scoped>
.sidebar-header {
  padding: var(--spacing-3) var(--spacing-4) var(--spacing-2);
  border-bottom: none;
  margin-bottom: var(--spacing-1);
}

.logo-section {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
}

.logo-text {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  flex: 1;
  letter-spacing: 0;
  line-height: var(--line-height-tight);
}

.website-logo {
  width: 28px;
  height: 28px;
  border-radius: var(--radius-md);
  flex-shrink: 0;
}

.theme-toggle-compact {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast),
    transform var(--transition-fast);
  flex-shrink: 0;
  background: var(--color-background-soft);
  color: var(--color-text-primary);
}

.theme-toggle-compact:hover {
  background: var(--color-primary-muted);
  border-color: color-mix(in srgb, var(--color-primary) 24%, var(--color-border));
  transform: translateY(-1px);
}

.theme-toggle-compact:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.theme-icon-compact {
  font-size: 14px;
  line-height: 1;
}

@media (max-width: 768px) {
  .sidebar-header {
    padding: var(--spacing-3) var(--spacing-3) var(--spacing-2);
  }
}

@media (max-width: 480px) {
  .sidebar-header {
    padding: var(--spacing-2);
  }
}
</style>
