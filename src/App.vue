<script setup lang="ts">
import Sidebar from '@/components/layout/Sidebar.vue';
import TopBar from '@/components/layout/TopBar.vue';
import { onMounted, onUnmounted, ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useTheme } from '@/composables/useTheme';

// 使用主题管理composable
useTheme();

const isCustomBuild = computed(() => import.meta.env.VITE_APP_BUILD_TARGET === 'CUSTOM');

// 移动端适配
const isMobile = ref(window.innerWidth <= 768);
const sidebarCollapsed = ref(window.innerWidth <= 768);
const route = useRoute();

function checkScreenSize() {
  isMobile.value = window.innerWidth <= 768;
  if (isMobile.value) {
    sidebarCollapsed.value = true;
  }
}

function toggleSidebar() {
  sidebarCollapsed.value = !sidebarCollapsed.value;
}

// 关闭sidebar
function closeSidebar() {
  sidebarCollapsed.value = true;
}

// 处理document点击事件，用于移动端关闭sidebar
function handleDocumentClick(event: Event) {
  if (!isMobile.value || sidebarCollapsed.value) {
    return;
  }

  const target = event.target as Element;
  const sidebar = document.querySelector('.sidebar');
  const topBarToggle = document.querySelector('.menu-toggle');

  // 如果点击的是sidebar内部或者topbar的切换按钮，不关闭sidebar
  if (sidebar?.contains(target) || topBarToggle?.contains(target)) {
    return;
  }

  // 否则关闭sidebar
  closeSidebar();
}

// 删除了过度工程化的滚动重置函数，使用简单的工具函数替代

// 监听路由变化，在移动设备上自动收起侧边栏
watch(
  () => route?.fullPath,
  () => {
    if (isMobile.value) {
      closeSidebar();
    }
  },
  { immediate: false }
);

onMounted(() => {
  if (isCustomBuild.value) {
    document.documentElement.classList.add('oyyy-theme');
    document.title = '时月东方 oyyy 版';
  }
  // 监听document点击事件，用于移动端关闭sidebar
  document.addEventListener('click', handleDocumentClick);
  
  // 监听窗口大小变化
  window.addEventListener('resize', checkScreenSize);
});

// 清理事件监听器
onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick);
  window.removeEventListener('resize', checkScreenSize);
});
</script>

<template>
  <div class="app-container">
    <Sidebar ref="sidebarRef" :is-collapsed="sidebarCollapsed" />
    <div class="main-wrapper" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <TopBar :sidebar-collapsed="sidebarCollapsed" @toggle-sidebar="toggleSidebar" />
      <main class="main-content">
        <div class="content-wrapper">
          <router-view :key="route.fullPath" />
        </div>
      </main>
    </div>
  </div>
</template>

<style>
/* 导入新的样式系统 */
@import '@/styles/main.css';
@import '@/styles/layout/app.css';
@import '@/styles/markdown.css'; /* 确保在变量定义后导入 */

.app-container {
  /* 适配安全区域 */
  padding-top: env(safe-area-inset-top);
  padding-right: env(safe-area-inset-right);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
}

html {
  background-color: var(--color-background);
}

/* 将背景设置到body上，确保覆盖整个视口 */
body {
  min-height: 100vh; /* 确保背景覆盖整个视口 */
  min-height: -webkit-fill-available; /* 适配移动端浏览器视口高度 */
  overflow-x: hidden; /* 防止水平溢出 */
}

html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
