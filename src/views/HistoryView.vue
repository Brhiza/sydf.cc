<template>
  <div class="page-container">
    <ContentSectionCard title="历史记录">
      <p class="content-text history-intro">这里保存了您最近的占卜记录，仅保存在本地哦。</p>

      <div class="history-content">
        <EmptyState
          v-if="historyRecords.length === 0"
          icon="📜"
          title="暂无历史记录"
          hint="您的占卜记录将会显示在这里"
        />

        <div v-else class="history-list">
          <HistoryRecordCard
            v-for="record in historyRecords"
            :key="record.id"
            tag="button"
            size="regular"
            @click="viewHistoryDetail(record)"
          >
            <HistoryRecordSummary
              :record="record"
              :is-active="false"
              size="regular"
              time-mode="date"
            />
          </HistoryRecordCard>
        </div>
      </div>

      <template v-if="historyRecords.length > 0" #actions>
        <button class="btn-danger" @click="clearAllHistory">清空历史记录</button>
      </template>
    </ContentSectionCard>
  </div>
</template>

<script setup lang="ts">
import ContentSectionCard from '@/components/common/ContentSectionCard.vue';
import EmptyState from '@/components/common/EmptyState.vue';
import HistoryRecordCard from '@/components/sidebar/history/HistoryRecordCard.vue';
import HistoryRecordSummary from '@/components/sidebar/history/HistoryRecordSummary.vue';
import { useHistoryManager } from '@/composables/useHistoryManager';
import { onMounted, onUnmounted } from 'vue';
import { eventBus, EVENTS } from '@/utils/eventBus';

const {
  historyRecords,
  loadHistory,
  viewHistoryDetail,
  clearAllHistory,
} = useHistoryManager();

onMounted(() => {
  loadHistory();
  eventBus.on(EVENTS.HISTORY_UPDATED, loadHistory);
});

onUnmounted(() => {
  eventBus.off(EVENTS.HISTORY_UPDATED, loadHistory);
});
</script>

<style scoped>
/* 页面特定样式 */
/* 历史记录列表样式 */
.history-content {
  margin-bottom: var(--spacing-6); /* 24px */
}

.history-intro {
  margin-bottom: var(--spacing-6);
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3); /* 12px */
}
</style>
