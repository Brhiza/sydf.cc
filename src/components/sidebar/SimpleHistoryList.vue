<template>
  <section class="history-section" aria-label="历史记录">
    <HistoryListToolbar
      :show-main-menu="showMainMenu"
      @toggle-search="toggleSearch"
      @toggle-filter="toggleFilter"
      @toggle-menu="toggleMainMenu"
      @clear-all="handleClearAll"
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
    <div class="history-list" aria-live="polite">
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
          @delete="handleRecordDelete"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import EmptyState from '@/components/common/EmptyState.vue';
import type { HistoryRecord } from '@/services/history';
import { useSimpleHistoryList } from '@/composables/useSimpleHistoryList';
import { buildHistoryResultPath } from '@/utils/history-navigation';
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
  findRecordById,
} = useSimpleHistoryList();

// 处理记录点击
function handleRecordClick(record: HistoryRecord) {
  emit('update:selectedHistoryId', record.id);
  emit('navigate', buildHistoryResultPath(record.type, record.id));
}

function exitSelectedHistoryContext(record?: Pick<HistoryRecord, 'type'> | null) {
  emit('update:selectedHistoryId', null);
  emit('navigate', record ? buildHistoryResultPath(record.type) : '/');
}

function handleRecordDelete(recordId: string) {
  const targetRecord = findRecordById(recordId);
  if (!handleDelete(recordId)) {
    return;
  }

  if (selectedHistoryId === recordId) {
    exitSelectedHistoryContext(targetRecord);
  }
}

function handleClearAll() {
  const selectedRecord = selectedHistoryId ? findRecordById(selectedHistoryId) : null;
  if (!clearAllHistory()) {
    return;
  }

  if (selectedHistoryId) {
    exitSelectedHistoryContext(selectedRecord);
  }
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
  padding: var(--spacing-1) var(--spacing-2);
  min-height: 0;
}

.records-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
}
</style>
