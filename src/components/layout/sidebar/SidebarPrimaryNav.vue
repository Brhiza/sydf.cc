<template>
  <nav class="sidebar-nav">
    <div class="nav-section">
      <ul class="nav-list">
        <NavItem
          v-for="item in items"
          :key="item.path"
          :path="item.path"
          :title="item.title"
          :icon="item.icon"
          :is-active="item.isActive"
          @navigate="$emit('navigate', $event)"
        />
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import NavItem from '@/components/sidebar/NavItem.vue'

export interface SidebarPrimaryNavItem {
  path: string
  title: string
  icon: string
  isActive: boolean
}

defineProps<{
  items: SidebarPrimaryNavItem[]
}>()

defineEmits<{
  (e: 'navigate', path: string): void
}>()
</script>

<style scoped>
.sidebar-nav {
  padding: 8px 0 12px 0;
}

.nav-section {
  margin-bottom: 0;
}

.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
