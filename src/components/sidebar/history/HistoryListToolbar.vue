<template>
  <CompactSectionToolbar title="最近">
    <template #actions>
      <CompactIconButton class="icon-btn" title="搜索" @click="$emit('toggle-search')">
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
      </CompactIconButton>
      <CompactIconButton class="icon-btn" title="筛选" @click="$emit('toggle-filter')">
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/>
        </svg>
      </CompactIconButton>
      <div class="menu-container">
        <CompactIconButton class="icon-btn" title="更多" @click="$emit('toggle-menu')">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <circle cx="2" cy="8" r="1.5" />
            <circle cx="8" cy="8" r="1.5" />
            <circle cx="14" cy="8" r="1.5" />
          </svg>
        </CompactIconButton>
        <CompactDropdownMenu
          v-if="showMainMenu"
          :items="menuItems"
          @select="handleMenuSelect"
        />
      </div>
    </template>
  </CompactSectionToolbar>
</template>

<script setup lang="ts">
import CompactDropdownMenu, {
  type CompactDropdownMenuItem,
} from '@/components/common/CompactDropdownMenu.vue';
import CompactIconButton from '@/components/common/CompactIconButton.vue';
import CompactSectionToolbar from '@/components/common/CompactSectionToolbar.vue';

defineProps<{
  showMainMenu: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle-search'): void
  (e: 'toggle-filter'): void
  (e: 'toggle-menu'): void
  (e: 'clear-all'): void
}>()

const menuItems: CompactDropdownMenuItem[] = [
  {
    key: 'clear-all',
    label: '清除所有',
    icon: '🗑️',
  },
]

function handleMenuSelect(key: string) {
  if (key === 'clear-all') {
    emit('clear-all')
  }
}
</script>

<style scoped>
.menu-container {
  position: relative;
}
</style>
