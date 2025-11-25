<template>
  <header class="top-bar">
    <div class="top-bar-content">
      <button
        class="menu-toggle"
        :class="{ 'menu-active': !sidebarCollapsed }"
        @click="$emit('toggle-sidebar')"
      >
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>

      <div class="top-bar-title">
        <h1>{{ isCustomBuild ? '时月东方 oyyy 版' : '时月东方' }}</h1>
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
import { computed } from 'vue';
const isCustomBuild = computed(() => import.meta.env.VITE_APP_BUILD_TARGET === 'CUSTOM');

interface Props {
  sidebarCollapsed?: boolean;
}

interface Emits {
  (e: 'toggle-sidebar'): void;
}

defineProps<Props>();
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
  border-bottom: 1px solid var(--color-border);
  z-index: 999;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  transition: left 0.3s ease;
  display: none; /* 默认隐藏 */
}

/* 暗色模式下的阴影适配 */
html.dark .top-bar {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}


.top-bar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 20px;
  position: relative;
}

.menu-toggle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: background-color 0.3s ease;
  position: absolute;
  left: 20px;
}

.menu-toggle:hover {
  background-color: var(--color-background-muted);
}

.hamburger-line {
  width: 20px;
  height: 2px;
  background-color: var(--color-text-primary);
  margin: 2px 0;
  transition: all 0.3s ease;
  border-radius: 1px;
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
  font-weight: 900;
  color: var(--color-text-primary);
  margin: 0;
}

.top-bar-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  position: absolute;
  right: 20px;
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
