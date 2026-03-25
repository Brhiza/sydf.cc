<template>
  <aside
    class="sidebar"
    :class="{ 'sidebar-collapsed': props.isCollapsed, 'sidebar-initialized': isInitialized }"
  >
    <SidebarHeader
      :title="sidebarTitle"
      :theme-title="themeConfig.text"
      :theme-icon="themeConfig.icon"
      @toggle-theme="toggleTheme"
    />

    <SidebarPrimaryNav :items="primaryNavItems" @navigate="navigateToPath" />

    <SimpleHistoryList
      :selected-history-id="selectedHistoryId"
      @update:selected-history-id="setSelectedHistoryId"
      @navigate="navigateToPath"
    />

    <SidebarFooterLinks :items="footerNavItems" @navigate="navigateToPath" />
  </aside>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
import { useSidebarNavigation } from '@/composables/useSidebarNavigation'
import { useViewport } from '@/composables/useViewport'
import SimpleHistoryList from '@/components/sidebar/SimpleHistoryList.vue'
import SidebarHeader from '@/components/layout/sidebar/SidebarHeader.vue'
import SidebarPrimaryNav from '@/components/layout/sidebar/SidebarPrimaryNav.vue'
import SidebarFooterLinks from '@/components/layout/sidebar/SidebarFooterLinks.vue'

const props = defineProps<{ isCollapsed: boolean }>()

const { themeConfig, toggleTheme } = useTheme()
useViewport()

const {
  selectedHistoryId,
  isInitialized,
  sidebarTitle,
  primaryNavItems,
  footerNavItems,
  navigateToPath,
  setSelectedHistoryId,
} = useSidebarNavigation()

defineExpose({})
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

.sidebar.sidebar-initialized {
  transition: all 0.3s ease;
}

.sidebar-collapsed {
  transform: translateX(-100%);
}

@media (max-width: 768px) {
  .sidebar {
    width: 280px;
    height: calc(var(--vh, 1vh) * 100);
    min-height: 100vh;
    min-height: 100dvh;
    position: fixed;
    background: var(--color-background);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  .sidebar.sidebar-initialized {
    transition: transform 0.3s ease;
  }

  html.dark .sidebar {
    background: var(--color-sidebar-background);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  }
}

@media (max-width: 480px) {
  .sidebar {
    width: 240px;
  }
}
</style>
