<template>
  <div v-if="items.length > 0" class="sidebar-footer">
    <ul class="footer-list">
      <FooterLink
        v-for="item in items"
        :key="item.path"
        :path="item.path"
        :title="item.title"
        :is-active="item.isActive"
        @navigate="$emit('navigate', $event)"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import FooterLink from '@/components/sidebar/FooterLink.vue'

export interface SidebarFooterLinkItem {
  path: string
  title: string
  isActive: boolean
}

defineProps<{
  items: SidebarFooterLinkItem[]
}>()

defineEmits<{
  (e: 'navigate', path: string): void
}>()
</script>

<style scoped>
.sidebar-footer {
  padding: 6px 8px 8px 8px;
  border-top: none;
  flex-shrink: 0;
  background: inherit;
  margin-top: 2px;
}

.footer-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

@media (max-width: 768px) {
  .sidebar-footer {
    padding: 4px 8px 6px 8px;
  }
}
</style>
