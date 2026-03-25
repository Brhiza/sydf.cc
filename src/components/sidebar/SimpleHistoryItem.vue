<template>
  <HistoryRecordCard :is-active="isActive" @click="handleClick">
    <HistoryRecordSummary :record="record" :is-active="isActive" />
    <template #actions>
      <HistoryRecordActionsMenu
        :pinned="!!record.pinned"
        :show-menu="showMenu"
        :is-active="isActive"
        @toggle-menu="toggleMenu"
        @pin="handlePin"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </template>
  </HistoryRecordCard>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import type { HistoryRecord } from '@/services';
import HistoryRecordCard from './history/HistoryRecordCard.vue';
import HistoryRecordSummary from './history/HistoryRecordSummary.vue';
import HistoryRecordActionsMenu from './history/HistoryRecordActionsMenu.vue';

const props = defineProps<{
  record: HistoryRecord;
  isActive: boolean;
}>();

const emit = defineEmits<{
  (e: 'click', record: HistoryRecord): void;
  (e: 'pin', recordId: string): void;
  (e: 'edit', recordId: string): void;
  (e: 'delete', recordId: string): void;
}>();

const showMenu = ref(false);

// 处理点击
function handleClick() {
  emit('click', props.record);
}

// 切换菜单
function toggleMenu() {
  showMenu.value = !showMenu.value;
}

// 处理置顶
function handlePin() {
  emit('pin', props.record.id);
  showMenu.value = false;
}

// 处理编辑
function handleEdit() {
  emit('edit', props.record.id);
  showMenu.value = false;
}

// 处理删除
function handleDelete() {
  emit('delete', props.record.id);
  showMenu.value = false;
}

// 点击外部关闭菜单
function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement;
  const isInside = target.closest('.history-item');
  
  if (!isInside) {
    showMenu.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
