<template>
  <div class="sidebar-header">
    <div class="logo-section">
      <span class="logo-text">{{ title }}</span>
      <img src="/static/favicon.png" alt="网站Logo" class="website-logo" />
      <div class="theme-toggle-compact" :title="themeTitle" @click="$emit('toggle-theme')">
        <span class="theme-icon-compact">{{ themeIcon }}</span>
      </div>
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
  padding: 12px 16px 8px 16px;
  border-bottom: none;
  margin-bottom: 4px;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-text {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text-primary);
  flex: 1;
  letter-spacing: -0.02em;
}

.website-logo {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  flex-shrink: 0;
}

.theme-toggle-compact {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  background: rgba(0, 0, 0, 0.04);
}

html.dark .theme-toggle-compact {
  background: rgba(255, 255, 255, 0.08);
}

.theme-toggle-compact:hover {
  background: rgba(0, 0, 0, 0.08);
  transform: scale(1.05);
}

html.dark .theme-toggle-compact:hover {
  background: rgba(255, 255, 255, 0.12);
}

.theme-icon-compact {
  font-size: 14px;
  line-height: 1;
}

@media (max-width: 768px) {
  .sidebar-header {
    padding: 10px 12px 6px 12px;
  }
}

@media (max-width: 480px) {
  .sidebar-header {
    padding: 8px 10px 4px 10px;
  }
}
</style>
