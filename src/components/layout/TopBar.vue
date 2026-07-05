<template>
  <header class="top-bar">
    <div class="top-bar-content">
      <button
        class="menu-toggle"
        :class="{ 'menu-active': !sidebarCollapsed }"
        type="button"
        aria-label="切换侧边栏"
        aria-controls="app-sidebar"
        :aria-expanded="String(!sidebarCollapsed)"
        @click="$emit('toggle-sidebar')"
      >
        <span class="hamburger-line" aria-hidden="true"></span>
        <span class="hamburger-line" aria-hidden="true"></span>
        <span class="hamburger-line" aria-hidden="true"></span>
      </button>

      <div class="top-bar-title">
        <h1>{{ customBuildEnabled ? '时月东方 oyyy 版' : '时月东方' }}</h1>
      </div>

      <div class="top-bar-actions">
        <slot name="actions">
          <!-- 默认内容，可以添加其他操作按钮 -->
        </slot>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { isCustomBuild } from '@/utils/build-target';

const customBuildEnabled = isCustomBuild({
  buildTarget: import.meta.env.VITE_APP_BUILD_TARGET,
  mode: import.meta.env.MODE,
});

interface Props {
  sidebarCollapsed?: boolean;
}

interface Emits {
  (e: 'toggle-sidebar'): void;
}

withDefaults(defineProps<Props>(), {
  sidebarCollapsed: true,
});
defineEmits<Emits>();
</script>

<style scoped>
.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 60px;
  background: var(--color-background);
  border-bottom: 1px solid var(--color-border-light);
  z-index: var(--z-sticky);
  box-shadow: var(--shadow-sm);
  transition: left var(--transition-slow);
  display: none; /* 默认隐藏 */
}

.top-bar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 var(--spacing-5);
  position: relative;
}

.menu-toggle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  padding: var(--spacing-2);
  border-radius: var(--radius-lg);
  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast);
  position: absolute;
  left: var(--spacing-5);
}

.menu-toggle:hover {
  background-color: var(--color-background-soft);
  border-color: var(--color-border-light);
}

.menu-toggle:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.hamburger-line {
  width: 20px;
  height: 2px;
  background-color: var(--color-text-primary);
  margin: 2px 0;
  transition:
    opacity var(--transition-fast),
    transform var(--transition-fast);
  border-radius: var(--radius-full);
}

.menu-active .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.menu-active .hamburger-line:nth-child(2) {
  opacity: 0;
}

.menu-active .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

.top-bar-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.top-bar-title h1 {
  font-size: 30px;
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0;
  line-height: var(--line-height-tight);
}

.top-bar-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  position: absolute;
  right: var(--spacing-5);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .top-bar {
    left: 0;
    display: block; /* 移动端显示 */
  }

  .top-bar-title h1 {
    font-size: 18px;
  }
}
</style>
