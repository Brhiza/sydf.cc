<template>
  <div class="page-container">
    <ContentSectionCard
      v-if="showDetail && selectedRecord"
      :title="getDivinationTitle(selectedRecord.type)"
      use-header
      header-divider
    >
      <template #header-actions>
        <div class="header-actions">
          <button class="btn-secondary" @click="goBack">
            <span class="back-icon">←</span>
            <span class="back-text">返回</span>
          </button>
        </div>
      </template>

      <ResultInfoHeader :items="detailInfoItems" />

      <DivinationResult
        :type="selectedRecord.type"
        :result="{ ...selectedRecord.result, id: selectedRecord.id }"
        :question="selectedRecord.question"
        :conversation-history="selectedRecord.conversationHistory || []"
        :error="getAIError(selectedRecord)"
        @retry="(target) => handleRetryAI(selectedRecord, target)"
      />

      <template #actions>
        <button class="btn-danger" @click="deleteHistoryRecord(selectedRecord.id)">
          <span class="delete-icon">🗑️</span>
          <span class="delete-text">删除记录</span>
        </button>
      </template>
    </ContentSectionCard>

    <ContentSectionCard v-else title="历史记录">
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
import DivinationResult from '@/components/divination/DivinationResult.vue';
import ResultInfoHeader from '@/components/divination/results/ResultInfoHeader.vue';
import HistoryRecordCard from '@/components/sidebar/history/HistoryRecordCard.vue';
import HistoryRecordSummary from '@/components/sidebar/history/HistoryRecordSummary.vue';
import { getDivinationConfig } from '@/config/divination';
import { useHistoryManager } from '@/composables/useHistoryManager';
import { useHistoryAI } from '@/composables/useHistoryAI';
import type { DivinationType } from '@/types';
import { computed, onMounted, onUnmounted, watch } from 'vue';
import { eventBus, EVENTS } from '@/utils/eventBus';
import { createHistoryDetailInfoItems } from './history/history-detail';

// 接收父组件传递的属性
const props = defineProps({
  selectedRecordId: {
    type: String,
    default: null,
  },
  showDetail: {
    type: Boolean,
    default: false,
  },
});

// 历史记录管理
const {
  historyRecords,
  selectedRecord,
  loadHistory,
  viewHistoryDetail,
  clearAllHistory,
  deleteHistoryRecord,
  goBack,
} = useHistoryManager(props.selectedRecordId);

// AI 相关逻辑
const { getAIError, handleRetryAI } = useHistoryAI();

// 获取占卜标题
function getDivinationTitle(type: DivinationType): string {
  const config = getDivinationConfig(type);
  return config ? config.title : '未知占卜';
}

const detailInfoItems = computed(() => {
  if (!selectedRecord.value) {
    return [];
  }

  return createHistoryDetailInfoItems(selectedRecord.value);
});

// 监听props变化
watch(
  () => props.selectedRecordId,
  (newId) => {
    if (newId) {
      const record = historyRecords.value.find((r) => r.id === newId);
      if (record) {
        selectedRecord.value = record;
      }
    } else {
      selectedRecord.value = null;
    }
  }
);

// 组件挂载时加载数据
onMounted(() => {
  loadHistory();
  
  // 监听历史记录更新事件
  eventBus.on(EVENTS.HISTORY_UPDATED, loadHistory);
});

// 组件卸载时移除事件监听
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
