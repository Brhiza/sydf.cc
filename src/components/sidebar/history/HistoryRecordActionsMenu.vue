<template>
  <div class="item-actions">
    <CompactIconButton
      class="action-btn"
      title="更多操作"
      size="compact"
      :active="isActive"
      reveal-on-hover
      @click.stop="$emit('toggle-menu')"
    >
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <circle cx="2" cy="8" r="1.5" />
        <circle cx="8" cy="8" r="1.5" />
        <circle cx="14" cy="8" r="1.5" />
      </svg>
    </CompactIconButton>

    <CompactDropdownMenu
      v-if="showMenu"
      class="action-menu"
      size="compact"
      :items="menuItems"
      @select="handleMenuSelect"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CompactDropdownMenu, {
  type CompactDropdownMenuItem,
} from '@/components/common/CompactDropdownMenu.vue';
import CompactIconButton from '@/components/common/CompactIconButton.vue';

const props = defineProps<{
  pinned: boolean
  showMenu: boolean
  isActive: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle-menu'): void
  (e: 'pin'): void
  (e: 'edit'): void
  (e: 'delete'): void
}>()

const menuItems = computed<CompactDropdownMenuItem[]>(() => [
  {
    key: 'pin',
    label: props.pinned ? '取消置顶' : '置顶',
    icon: props.pinned ? '📌' : '📍',
  },
  {
    key: 'edit',
    label: '修改标签',
    icon: '✏️',
  },
  {
    key: 'delete',
    label: '删除',
    icon: '🗑️',
    tone: 'danger',
  },
])

function handleMenuSelect(key: string) {
  if (key === 'pin') {
    emit('pin')
    return
  }

  if (key === 'edit') {
    emit('edit')
    return
  }

  if (key === 'delete') {
    emit('delete')
  }
}
</script>

<style scoped>
.item-actions {
  position: relative;
}

.action-menu {
  position: absolute;
  top: 100%;
  right: 0;
}
</style>
