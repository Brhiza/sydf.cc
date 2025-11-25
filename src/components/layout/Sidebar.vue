<template>
  <aside
    class="sidebar"
    :class="{ 'sidebar-collapsed': props.isCollapsed, 'sidebar-initialized': isInitialized }"
  >
    <!-- 顶部Logo区域 -->
    <div class="sidebar-header">
      <div class="logo-section">
        <span class="logo-text">{{ isCustomBuild ? '时月东方 oyyy 版' : '时月东方' }}</span>
        <img src="/static/favicon.png" alt="网站Logo" class="website-logo" />
        <!-- 主题切换按钮 -->
        <div class="theme-toggle-compact" :title="themeConfig?.text" @click="toggleTheme">
          <span class="theme-icon-compact">{{ themeConfig?.icon }}</span>
        </div>
      </div>
    </div>

    <!-- 主要功能导航 -->
    <nav class="sidebar-nav">
      <div class="nav-section">
        <ul class="nav-list">
          <NavItem
            path="/"
            title="首页"
            icon="🏠"
            :is-active="isNavItemActive('/')"
            @navigate="navigateToPath"
          />
          <NavItem
            v-for="item in divinationNavItems"
            :key="item.type"
            :path="item.type === 'daily' ? '/daily-fortune' : `/divination/${item.type}`"
            :title="item.title"
            :icon="item.icon"
            :is-active="isNavItemActive(item.type === 'daily' ? '/daily-fortune' : `/divination/${item.type}`)"
            @navigate="navigateToPath"
          />
        </ul>
      </div>
    </nav>

    <!-- 历史记录区域 -->
    <SimpleHistoryList
      :selected-history-id="selectedHistoryId"
      @update:selected-history-id="selectedHistoryId = $event"
      @navigate="navigateToPath"
    />

    <!-- 底部功能 -->
    <div class="sidebar-footer">
      <ul class="footer-list">
        <template v-if="!isCustomBuild">
          <FooterLink
            path="/settings"
            title="配置 Key"
            :is-active="isNavItemActive('/settings')"
            @navigate="navigateToPath"
          />
          <FooterLink
            path="/about"
            title="关于本站"
            :is-active="isNavItemActive('/about')"
            @navigate="navigateToPath"
          />
        </template>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTheme, type ThemeComposable } from '@/composables/useTheme';
import { useViewport } from '@/composables/useViewport';
import { divinationNavItems } from '@/config/divination';
import { eventBus, EVENTS } from '@/utils/eventBus';
import NavItem from '@/components/sidebar/NavItem.vue';
import SimpleHistoryList from '@/components/sidebar/SimpleHistoryList.vue';
import FooterLink from '@/components/sidebar/FooterLink.vue';

const props = defineProps<{ isCollapsed: boolean }>();

// 响应式状态
const selectedHistoryId = ref<string | null>(null);
const isInitialized = ref(false); // 标记是否已初始化，避免初始动画
const route = useRoute();
const router = useRouter();

// 使用可组合函数
const themeApi: ThemeComposable = useTheme();
const { themeConfig, toggleTheme } = themeApi;
useViewport();

const isCustomBuild = computed(() => import.meta.env.VITE_APP_BUILD_TARGET === 'CUSTOM');


watch(
  () => route.params.id,
  (newId) => {
    if (newId && typeof newId === 'string') {
      selectedHistoryId.value = newId;
    } else {
      selectedHistoryId.value = null;
    }
  }
);

// 导航到指定路径
function navigateToPath(path: string) {
  // 当导航到非历史记录相关路径时，清除历史记录选中状态
  if (!path.includes('historyId')) {
    selectedHistoryId.value = null;
  }

  // 如果当前已经在目标路径但有查询参数，强制刷新到无参数版本
  if (route.path === path && Object.keys(route.query).length > 0) {
    router.replace({ path, query: {} });
  } else if (route.path !== path) {
    // 如果路径不同，正常导航
    router.push(path);
  }
}

// 判断导航项是否应该激活
function isNavItemActive(path: string): boolean {
  // 如果当前路由有 historyId 参数，说明是在查看历史记录，导航项不应该激活
  if (route.query.historyId) {
    return false;
  }

  // 如果有选中的历史记录，导航项不应该激活
  if (selectedHistoryId.value) {
    return false;
  }

  // 对于动态路由，我们需要检查当前的路由路径是否与导航项的路径完全匹配
  if (route.name === 'divination') {
    return route.path === path;
  }

  // 其他情况
  return route.path === path;
}


// 处理历史记录选中状态重置
function handleHistorySelectionReset() {
  selectedHistoryId.value = null;
}

// 生命周期
onMounted(() => {
  // 延迟启用动画，避免初始化时的闪烁
  setTimeout(() => {
    isInitialized.value = true;
  }, 100);

  // 监听历史记录选中状态重置事件
  eventBus.on(EVENTS.HISTORY_SELECTION_RESET, handleHistorySelectionReset);
});

onUnmounted(() => {
  // 移除历史记录选中状态重置事件监听
  eventBus.off(EVENTS.HISTORY_SELECTION_RESET, handleHistorySelectionReset);
});

// 暴露给父组件
defineExpose({});
</script>

<style scoped>
.sidebar {
  width: 240px;
  height: 100vh;
  background: var(--color-background);
  color: var(--color-text-primary);
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  box-shadow: none;
  border: none;
  flex-shrink: 0;
  overflow: hidden;
}

/* 只有在初始化完成后才启用动画 */
.sidebar.sidebar-initialized {
  transition: all 0.3s ease;
}


.sidebar-collapsed {
  transform: translateX(-100%);
}

/* 顶部Logo区域 */
.sidebar-header {
  padding: 12px 16px 8px 16px; /* 进一步减少内边距以节省空间 */
  border-bottom: none; /* 移除分隔线，更简洁 */
  margin-bottom: 4px; /* 进一步减少底部间距 */
}

html.dark .sidebar-header {
  border-bottom: none;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 8px; /* 减少间距以节省空间 */
}

.logo-text {
  font-size: 16px; /* 减小字体以节省空间 */
  font-weight: 700; /* 更粗的字体 */
  color: var(--color-text-primary);
  flex: 1;
  letter-spacing: -0.02em; /* 紧凑字间距 */
}

.website-logo {
  width: 28px; /* 减小尺寸以节省空间 */
  height: 28px;
  border-radius: 6px; /* 减小圆角 */
  margin-left: 0;
  flex-shrink: 0;
}

.theme-toggle-compact {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px; /* 减小尺寸以节省空间 */
  height: 28px;
  border-radius: 6px; /* 减小圆角 */
  margin-left: 0;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  background: rgba(0, 0, 0, 0.04); /* 添加背景色 */
}

html.dark .theme-toggle-compact {
  background: rgba(255, 255, 255, 0.08);
}

.theme-toggle-compact:hover {
  background: rgba(0, 0, 0, 0.08);
  transform: scale(1.05); /* 添加悬停效果 */
}

html.dark .theme-toggle-compact:hover {
  background: rgba(255, 255, 255, 0.12);
}

.theme-icon-compact {
  font-size: 14px; /* 减小图标尺寸以节省空间 */
  line-height: 1;
}

/* 主导航区域 */
.sidebar-nav {
  padding: 8px 0 12px 0; /* 进一步减少内边距以节省空间 */
}

.nav-section {
  margin-bottom: 0;
}

.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin-bottom: 4px; /* 增加间距 */
}

.nav-link {
  display: block;
  text-decoration: none;
  margin: 0 20px; /* 增加左右边距，参考图片 */
}

.nav-link-content {
  display: flex;
  align-items: center;
  padding: 8px 12px; /* 减少内边距以节省空间 */
  color: var(--color-text-secondary);
  transition: all 0.2s ease;
  border-radius: 6px; /* 减小圆角 */
  cursor: pointer;
  margin: 0;
  font-weight: 500;
  gap: 8px; /* 减少图标和文字间距以节省空间 */
}

.nav-link-content:hover {
  background: rgba(0, 0, 0, 0.04); /* 更精致的悬停效果 */
  color: var(--color-text-primary);
  transform: translateX(2px); /* 添加微妙的移动效果 */
}

html.dark .nav-link-content:hover {
  background: rgba(255, 255, 255, 0.06);
}

.nav-link-content.nav-link-active {
  background: var(--color-primary-muted); /* 使用浅紫色高光 */
  color: var(--color-primary); /* 深紫色文字 */
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(234, 231, 248, 0.5); /* 添加阴影 */
}

html.dark .nav-link-content.nav-link-active {
  background: var(--color-background-elevated); /* 暗色模式使用深灰色 */
  color: var(--color-text-primary); /* 白色文字 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3); /* 暗色模式阴影 */
}

.nav-icon {
  font-size: 16px; /* 减小图标尺寸以节省空间 */
  margin-right: 0; /* 移除额外间距，使用gap控制 */
  width: 16px;
  text-align: center;
  flex-shrink: 0;
}

.nav-link-content.nav-link-active .nav-icon {
  color: var(--color-primary); /* 深紫色图标 */
}

html.dark .nav-link-content.nav-link-active .nav-icon {
  color: var(--color-text-primary); /* 暗色模式下的白色图标 */
}

.nav-text {
  font-size: 14px; /* 减小字体尺寸以节省空间 */
  font-weight: inherit;
  line-height: 1.3;
}

/* 历史记录区域 */
.history-section {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 0;
  border-top: none; /* 移除顶部分隔线，更简洁 */
  margin-top: 4px; /* 进一步减少顶部间距以节省空间 */
}

html.dark .history-section {
  border-top: none;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px 6px 16px; /* 减少左右内边距以为标题腾出更多空间 */
  position: relative;
}

.history-controls {
  padding: 0 12px 12px; /* 减少水平内边距 */
  display: flex;
  flex-direction: row;
  gap: 6px; /* 减小间距 */
  align-items: center;
}

.search-input {
  flex: 1; /* 占据剩余空间 */
  min-width: 0; /* 允许输入框收缩 */
}

.type-select {
  flex-shrink: 0; /* 防止下拉菜单收缩 */
  padding: 6px 24px 6px 8px; /* 调整右侧内边距为箭头留出空间 */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.25em 1.25em;
}

.search-input,
.type-select {
  padding: 6px 10px; /* 减小内边距 */
  border-radius: 6px;
  border: 1px solid var(--color-border);
  background: var(--color-background-muted);
  color: var(--color-text-primary);
  font-size: 12px !important;
}

.search-input::placeholder {
  color: var(--color-text-secondary);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-right {
  position: relative;
}

.section-title {
  font-size: 13px; /* 稍微增大字体尺寸，参考图片 */
  font-weight: 600;
  color: var(--color-text-secondary);
  margin: 0;
  text-transform: uppercase; /* 保持大写效果 */
  letter-spacing: 0.8px; /* 增加字间距 */
}

.menu-btn {
  background: rgba(0, 0, 0, 0.04); /* 添加背景色 */
  border: none;
  cursor: pointer;
  color: var(--color-text-secondary);
  padding: 6px; /* 增加内边距 */
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px; /* 添加圆角 */
  transition: all 0.2s ease;
}

html.dark .menu-btn {
  background: rgba(255, 255, 255, 0.08);
}

.menu-btn:hover {
  color: var(--color-text-primary);
  background: rgba(0, 0, 0, 0.08);
  transform: scale(1.05);
}

html.dark .menu-btn:hover {
  background: rgba(255, 255, 255, 0.12);
}

.menu-btn svg {
  width: 16px; /* 增加尺寸 */
  height: 16px;
}

.action-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: white; /* 使用纯白背景 */
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px; /* 增加圆角 */
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12); /* 增强阴影 */
  min-width: 160px;
  z-index: 100;
  overflow: hidden;
}

html.dark .action-dropdown {
  background: var(--color-background-elevated);
  border: 1px solid var(--color-border);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.dropdown-item {
  padding: 12px 16px; /* 增加内边距 */
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}

.dropdown-item:hover {
  background: rgba(0, 0, 0, 0.04);
}

html.dark .dropdown-item:hover {
  background: rgba(255, 255, 255, 0.08);
}

.dropdown-icon {
  font-size: 16px; /* 增加尺寸 */
  color: var(--color-text-secondary);
}

.dropdown-text {
  font-size: 14px; /* 增加字体尺寸 */
  color: var(--color-text-primary);
}

.history-list {
  flex: 1;
  overflow-y: auto;
  overflow-x: visible;
  padding: 0 8px; /* 减少左右内边距以为标题腾出更多空间 */
  min-height: 0;
  /* 隐藏滚动条但保持滚动功能 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

/* 隐藏WebKit浏览器的滚动条 */
.history-list::-webkit-scrollbar {
  display: none;
}

.empty-history {
  padding: 24px 8px; /* 减少左右内边距以保持一致性 */
  text-align: center;
  color: var(--color-text-secondary);
  font-size: 14px; /* 保持字体尺寸 */
  line-height: 1.5;
}

/* 加载更多按钮 */
.load-more-container {
  padding: 8px; /* 减少左右内边距以保持一致性 */
  text-align: center;
}

.load-more-btn {
  width: 100%;
  padding: 8px 12px;
  background: var(--color-background-muted);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  color: var(--color-text-secondary);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.load-more-btn:hover {
  background: var(--color-background);
  border-color: var(--color-border);
  color: var(--color-text-primary);
}

.history-item {
  display: flex;
  align-items: center;
  gap: 8px; /* 进一步减少间距以节省空间 */
  padding: 10px 8px; /* 进一步减少左右内边距以为标题腾出更多空间 */
  padding-right: 32px; /* 进一步减少右侧预留空间 */
  border-radius: 10px; /* 保持圆角 */
  margin: 0 0 4px 0; /* 减少底部边距以节省空间 */
  text-decoration: none;
  color: var(--color-text-primary);
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
  font-weight: 500;
}

/* 当历史记录项有活动菜单时，提升其层级 */
.history-item.has-active-menu {
  z-index: 10000;
}

.history-item:hover {
  background: rgba(0, 0, 0, 0.04);
  transform: translateX(2px); /* 添加微妙的移动效果 */
}

html.dark .history-item:hover {
  background: rgba(255, 255, 255, 0.06);
}

.history-item.active {
  background: var(--color-primary-muted); /* 使用浅紫色高光 */
  color: var(--color-primary); /* 深紫色文字 */
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(234, 231, 248, 0.5);
}

html.dark .history-item.active {
  background: var(--color-background-elevated); /* 暗色模式使用深灰色 */
  color: var(--color-text-primary); /* 白色文字 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3); /* 暗色模式阴影 */
}

.history-item.selected {
  background: rgba(99, 102, 241, 0.1);
  color: var(--color-primary);
  font-weight: 600;
  border: 1px solid rgba(99, 102, 241, 0.2);
}

html.dark .history-item.selected {
  background: rgba(99, 102, 241, 0.15);
  color: var(--color-primary-light);
  border: 1px solid rgba(139, 92, 246, 0.3);
}

.select-checkbox {
  width: 18px;
  height: 18px;
  border-radius: 4px;
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-background);
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.2s ease;
}

.select-checkbox:hover {
  border-color: var(--color-primary);
}

.checkbox-checked {
  color: var(--color-primary);
  font-weight: bold;
  font-size: 12px;
}

/* 历史记录项操作按钮 */
.history-actions {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.action-menu-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-text-secondary);
  padding: 2px; /* 减少内边距以节省空间 */
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px; /* 固定宽度 */
  height: 18px; /* 固定高度 */
}

.action-menu-btn:hover {
  color: var(--color-text-primary);
}

.action-menu-btn svg {
  width: 14px;
  height: 14px;
}

.record-action-dropdown {
  position: absolute;
  background: white; /* 使用纯白背景，与其他下拉菜单保持一致 */
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px; /* 增加圆角，与其他下拉菜单保持一致 */
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12); /* 增强阴影 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 120px;
  max-width: 140px;
  z-index: 9999;
  overflow: visible; /* 允许内容溢出 */
  white-space: nowrap; /* 防止文字换行 */
  /* 位置由JavaScript动态设置 */
  transition: all 0.2s ease;
}

/* 暗色模式下的历史记录菜单背景 */
html.dark .record-action-dropdown {
  background: var(--color-background-elevated);
  border: 1px solid var(--color-border);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

/* 移除固定定位规则，改为JavaScript动态控制 */

.record-action-dropdown .dropdown-item {
  padding: 8px 12px;
  font-size: 13px;
  transition: background-color 0.2s ease;
}

.record-action-dropdown .dropdown-item:hover {
  background: rgba(0, 0, 0, 0.04); /* 与其他下拉菜单保持一致 */
}

/* 暗色模式下的菜单项hover效果 */
html.dark .record-action-dropdown .dropdown-item:hover {
  background: rgba(255, 255, 255, 0.08);
}

.record-action-dropdown .dropdown-item.delete-item:hover {
  background: rgba(239, 68, 68, 0.1);
  color: var(--color-danger);
}

.record-action-dropdown .dropdown-item.delete-item:hover .dropdown-icon {
  color: var(--color-danger);
}

.record-action-dropdown .dropdown-icon {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.record-action-dropdown .dropdown-text {
  font-size: 13px;
  color: var(--color-text-primary);
}

/* 选择模式操作区域 */
.selection-actions {
  padding: 12px;
  border-top: 1px solid var(--color-border);
  background: var(--color-background-muted);
}

.selection-info {
  font-size: 12px;
  color: var(--color-text-secondary);
  margin-bottom: 8px;
  text-align: center;
}

.selection-buttons {
  display: flex;
  gap: 8px;
}

.selection-btn {
  flex: 1;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cancel-btn {
  background: var(--color-background-muted);
  color: var(--color-text-secondary);
}

.cancel-btn:hover {
  background: var(--color-background-hover);
}

.delete-selected-btn {
  background: var(--color-danger);
  color: white;
}

.delete-selected-btn:hover:not(:disabled) {
  background: var(--color-danger-dark);
}

.selection-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.history-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--color-background-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
}

.history-content {
  flex: 1;
  min-width: 0;
  overflow: hidden; /* 防止内容溢出 */
}

.history-title {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.select-mode-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 10px;
  font-size: 13px;
  color: var(--color-text-secondary);
  background-color: var(--color-background-muted);
  border-radius: 6px;
  margin-bottom: 6px;
}

.select-actions {
  display: flex;
  gap: 6px;
}

.select-action-btn {
  background: var(--color-primary);
  color: white;
  border: none;
  padding: 3px 6px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}

.select-action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.select-action-btn.cancel {
  background: var(--color-background-muted);
  color: var(--color-text-secondary);
}

/* 底部功能区域 */
.sidebar-footer {
  padding: 6px 8px 8px 8px; /* 减少内边距以节省空间 */
  border-top: none; /* 移除分隔线，更简洁 */
  flex-shrink: 0;
  background: inherit;
  margin-top: 2px; /* 进一步减少顶部间距以节省空间 */
}

html.dark .sidebar-footer {
  border-top: none;
}

.footer-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.footer-item {
  margin-bottom: 2px; /* 减少间距以节省空间 */
}

.footer-link {
  display: flex;
  align-items: center;
  padding: 6px; /* 减少内边距以节省空间 */
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 13px; /* 减小字体尺寸以节省空间 */
  font-weight: 500;
  border-radius: 6px; /* 减小圆角以节省空间 */
  margin: 0; /* 移除边距，由父容器统一控制 */
  cursor: pointer;
  gap: 6px; /* 减少间距以节省空间 */
}

.footer-link:hover {
  background: rgba(0, 0, 0, 0.04);
  color: var(--color-text-primary);
  transform: translateX(2px); /* 添加微妙的移动效果 */
}

html.dark .footer-link:hover {
  background: rgba(255, 255, 255, 0.06);
}

.footer-link.footer-link-active {
  background: var(--color-primary-muted); /* 使用浅紫色高光 */
  color: var(--color-primary); /* 深紫色文字 */
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(234, 231, 248, 0.5);
}

html.dark .footer-link.footer-link-active {
  background: var(--color-background-elevated); /* 暗色模式使用深灰色 */
  color: var(--color-text-primary); /* 白色文字 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3); /* 暗色模式阴影 */
}

.footer-text {
  font-weight: inherit;
  line-height: 1.4;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .sidebar {
    width: 280px; /* 减小移动端宽度以更紧凑 */
    height: calc(var(--vh, 1vh) * 100);
    min-height: 100vh;
    min-height: 100dvh;
    position: fixed; /* 移动端恢复固定定位 */
    background: var(--color-background); /* 移动端恢复背景 */
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15); /* 移动端恢复阴影 */
  }

  /* 移动端也只有在初始化完成后才启用动画 */
  .sidebar.sidebar-initialized {
    transition: transform 0.3s ease;
  }

html.dark .sidebar {
    background: var(--color-sidebar-background); /* 移动端暗色模式背景 */
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  }

  /* 调整移动端的内边距 */
  .sidebar-header {
    padding: 10px 12px 6px 12px; /* 减少移动端内边距 */
  }

  .nav-link-content {
    padding: 6px 10px; /* 减少移动端内边距 */
    margin: 0 8px; /* 减少移动端边距 */
  }

  .history-section .section-header {
    padding: 8px 12px 4px 12px; /* 减少移动端内边距 */
  }

  .history-list {
    padding: 0 8px; /* 减少移动端内边距 */
  }

  .footer-link {
    padding: 4px; /* 进一步减少移动端内边距 */
    margin: 0; /* 移除边距，由父容器控制 */
  }

  /* 确保底部区域有足够的内边距 */
  .sidebar-footer {
    padding: 4px 8px 6px 8px; /* 减少移动端内边距 */
  }

  /* 历史记录区域的间距调整 */
  .section-header {
    padding: 4px 8px; /* 减少移动端内边距 */
  }

  .history-item {
    padding: 4px 8px; /* 减少移动端内边距 */
    margin: 0 4px 1px 4px; /* 减少移动端边距 */
  }

  .load-more-container {
    padding: 6px 8px; /* 减少移动端内边距 */
  }
}

@media (max-width: 480px) {
  .sidebar {
    width: 240px; /* 进一步减小小屏幕设备宽度 */
  }

  .nav-text,
  .footer-text {
    font-size: 12px; /* 减小字体尺寸以节省空间 */
  }

  .history-title {
    font-size: 11px; /* 减小字体尺寸以节省空间 */
  }

  /* 小屏幕设备的间距进一步优化 */
  .sidebar-header {
    padding: 8px 10px 4px 10px; /* 减少小屏幕设备内边距 */
  }

  .nav-link-content {
    padding: 4px 8px; /* 减少小屏幕设备内边距 */
    margin: 0 4px;
  }

  .footer-link {
    padding: 3px; /* 最小屏幕设备进一步减少内边距 */
    margin: 0; /* 移除边距，由父容器控制 */
  }

  .section-header {
    padding: 3px 6px; /* 减少小屏幕设备内边距 */
  }

  .history-item {
    padding: 3px 6px; /* 减少小屏幕设备内边距 */
    margin: 0 3px 1px 3px; /* 减少小屏幕设备边距 */
  }

  /* 移动端菜单按钮优化 */
  .action-menu-btn {
    width: 20px; /* 减小移动端按钮尺寸 */
    height: 20px;
    padding: 2px;
  }

  .action-menu-btn svg {
    width: 14px;
    height: 14px;
  }

  /* 移动端菜单优化 - JavaScript动态控制定位 */
  .record-action-dropdown {
    /* 移动端菜单样式优化 */
    max-width: 120px !important;
    /* 确保过渡动画正常工作 */
    transition: all 0.2s ease !important;
  }
}

.action-icon {
  font-size: 16px;
  line-height: 1;
  display: inline-block;
  transform: rotate(90deg);
  font-weight: bold;
}
</style>
