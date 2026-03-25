import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { divinationNavItems } from '@/config/divination'
import { eventBus, EVENTS } from '@/utils/eventBus'
import type { SidebarPrimaryNavItem } from '@/components/layout/sidebar/SidebarPrimaryNav.vue'
import type { SidebarFooterLinkItem } from '@/components/layout/sidebar/SidebarFooterLinks.vue'

export function useSidebarNavigation() {
  const route = useRoute()
  const router = useRouter()
  const selectedHistoryId = ref<string | null>(null)
  const isInitialized = ref(false)
  const isCustomBuild = computed(() => import.meta.env.VITE_APP_BUILD_TARGET === 'CUSTOM')
  const sidebarTitle = computed(() => (isCustomBuild.value ? '时月东方 oyyy 版' : '时月东方'))

  watch(
    () => route.params.id,
    (newId) => {
      if (newId && typeof newId === 'string') {
        selectedHistoryId.value = newId
      } else {
        selectedHistoryId.value = null
      }
    },
    { immediate: true }
  )

  function setSelectedHistoryId(id: string | null) {
    selectedHistoryId.value = id
  }

  function navigateToPath(path: string) {
    if (!path.includes('historyId')) {
      selectedHistoryId.value = null
    }

    if (route.path === path && Object.keys(route.query).length > 0) {
      router.replace({ path, query: {} })
    } else if (route.path !== path) {
      router.push(path)
    }
  }

  function isNavItemActive(path: string): boolean {
    if (route.query.historyId || selectedHistoryId.value) {
      return false
    }

    if (route.name === 'divination') {
      return route.path === path
    }

    return route.path === path
  }

  const primaryNavItems = computed<SidebarPrimaryNavItem[]>(() => [
    {
      path: '/',
      title: '首页',
      icon: '🏠',
      isActive: isNavItemActive('/'),
    },
    ...divinationNavItems.map((item) => {
      const path = `/divination/${item.type}`
      return {
        path,
        title: item.title,
        icon: item.icon,
        isActive: isNavItemActive(path),
      }
    }),
  ])

  const footerNavItems = computed<SidebarFooterLinkItem[]>(() => {
    if (isCustomBuild.value) {
      return []
    }

    return [
      {
        path: '/settings',
        title: '配置 Key',
        isActive: isNavItemActive('/settings'),
      },
      {
        path: '/about',
        title: '关于本站',
        isActive: isNavItemActive('/about'),
      },
    ]
  })

  function handleHistorySelectionReset() {
    selectedHistoryId.value = null
  }

  onMounted(() => {
    setTimeout(() => {
      isInitialized.value = true
    }, 100)

    eventBus.on(EVENTS.HISTORY_SELECTION_RESET, handleHistorySelectionReset)
  })

  onUnmounted(() => {
    eventBus.off(EVENTS.HISTORY_SELECTION_RESET, handleHistorySelectionReset)
  })

  return {
    selectedHistoryId,
    isInitialized,
    sidebarTitle,
    primaryNavItems,
    footerNavItems,
    navigateToPath,
    setSelectedHistoryId,
  }
}
