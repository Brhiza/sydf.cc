<template>
  <div class="history-section">
    <HistoryListToolbar
      :show-main-menu="showMainMenu"
      @toggle-search="toggleSearch"
      @toggle-filter="toggleFilter"
      @toggle-menu="toggleMainMenu"
      @clear-all="clearAllHistory"
    />

    <HistoryListFilters
      :show-search="showSearch"
      :show-filter="showFilter"
      :search-query="searchQuery"
      :selected-type="selectedType"
      :filter-items="divinationNavItems"
      @update:search-query="searchQuery = $event"
      @update:selected-type="selectedType = $event"
    />

    <!-- 历史记录列表 -->
    <div class="history-list">
      <EmptyState
        v-if="displayRecords.length === 0"
        icon="📜"
        :title="getEmptyMessage()"
        size="compact"
      />

      <div v-else class="records-container">
        <SimpleHistoryItem
          v-for="record in displayRecords"
          :key="record.id"
          :record="record"
          :is-active="selectedHistoryId === record.id"
          @click="handleRecordClick"
          @pin="handlePin"
          @edit="handleEdit"
          @delete="handleDelete"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EmptyState from '@/components/common/EmptyState.vue';
import type { HistoryRecord } from '@/services';
import { useSimpleHistoryList } from '@/composables/useSimpleHistoryList';
import SimpleHistoryItem from './SimpleHistoryItem.vue';
import HistoryListToolbar from './history/HistoryListToolbar.vue';
import HistoryListFilters from './history/HistoryListFilters.vue';

const { selectedHistoryId } = defineProps<{
  selectedHistoryId: string | null;
}>();

const emit = defineEmits<{
  (e: 'update:selectedHistoryId', id: string | null): void;
  (e: 'navigate', path: string): void;
}>();

const {
  divinationNavItems,
  searchQuery,
  selectedType,
  showSearch,
  showFilter,
  showMainMenu,
  displayRecords,
  toggleSearch,
  toggleFilter,
  toggleMainMenu,
  handlePin,
  handleEdit,
  handleDelete,
  clearAllHistory,
  getEmptyMessage,
} = useSimpleHistoryList();

// 处理记录点击
function handleRecordClick(record: HistoryRecord) {
  emit('update:selectedHistoryId', record.id);
  emit('navigate', `/divination/${record.type}?historyId=${record.id}`);
}
</script>

<style scoped>
.history-section {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}

.history-list {
  flex: 1;
  overflow-y: auto;
  padding: 4px 8px; /* 减少内边距以节省空间 */
  min-height: 0;
}

.records-container {
  display: flex;
  flex-direction: column;
  gap: 2px; /* 减少间距以节省空间 */
}
</style>
