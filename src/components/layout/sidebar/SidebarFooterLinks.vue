<template>
  <nav v-if="items.length > 0" class="sidebar-footer" aria-label="辅助链接">
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
  </nav>
</template>

<script setup lang="ts">
import FooterLink from '@/components/sidebar/FooterLink.vue';

export interface SidebarFooterLinkItem {
  path: string;
  title: string;
  isActive: boolean;
}

defineProps<{
  items: SidebarFooterLinkItem[];
}>();

defineEmits<{
  (e: 'navigate', path: string): void;
}>();
</script>

<style scoped>
.sidebar-footer {
  padding: var(--spacing-2);
  border-top: none;
  flex-shrink: 0;
  background: inherit;
  margin-top: var(--spacing-1);
}

.footer-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

@media (max-width: 768px) {
  .sidebar-footer {
    padding: var(--spacing-1) var(--spacing-2) var(--spacing-2);
  }
}
</style>
