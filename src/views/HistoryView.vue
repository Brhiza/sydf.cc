<template>
  <div class="page-container">
    <!-- 单个历史记录详情 -->
    <div v-if="showDetail && selectedRecord" class="content-card">
      <div class="detail-header">
        <div class="header-left">
          <h2 class="section-title">{{ getDivinationTitle(selectedRecord.type) }}</h2>
          <p class="detail-date">{{ formatDateTime(selectedRecord.timestamp) }}</p>
        </div>
        <div class="header-actions">
          <button class="btn-secondary" @click="goBack">
            <span class="back-icon">←</span>
            <span class="back-text">返回</span>
          </button>
        </div>
      </div>

      <div class="detail-content">
        <div class="detail-question">
          <h3 class="section-subtitle">问题</h3>
          <p class="content-text">{{ selectedRecord.question }}</p>
        </div>

        <div class="detail-result">
          <h3 class="section-subtitle">结果</h3>
          <DivinationResult
            :type="selectedRecord.type"
            :result="{ ...selectedRecord.result, id: selectedRecord.id }"
            :conversation-history="selectedRecord.conversationHistory || []"
            :error="getAIError(selectedRecord)"
            @retry="handleRetryAI(selectedRecord)"
          />
        </div>

        <!-- AI对话历史 -->
        <div v-if="selectedRecord.conversationHistory && selectedRecord.conversationHistory.length > 0" class="detail-conversation">
          <h3 class="section-subtitle">AI对话</h3>
          <div class="conversation-history">
            <div
              v-for="(message, index) in selectedRecord.conversationHistory.filter(m => m.role !== 'system')"
              :key="message.id || index"
              class="chat-message"
              :class="`message-${message.role}`"
            >
              <div class="message-content">
                {{ message.content }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button class="btn-danger" @click="deleteHistoryRecord(selectedRecord.id)">
          <span class="delete-icon">🗑️</span>
          <span class="delete-text">删除记录</span>
        </button>
      </div>
    </div>

    <!-- 历史记录列表 -->
    <div v-else class="content-card">
      <div class="card-header">
        <h2 class="page-title">历史记录</h2>
        <p class="content-text">这里保存了您最近的占卜记录，仅保存在本地哦。</p>
      </div>

      <div class="history-content">
        <div v-if="historyRecords.length === 0" class="empty-message">
          <div class="empty-icon">📜</div>
          <p>暂无历史记录</p>
          <p class="empty-hint">您的占卜记录将会显示在这里</p>
        </div>

        <div v-else class="history-list">
          <div v-for="record in historyRecords" :key="record.id" class="history-item">
            <button class="history-item-button" @click="viewHistoryDetail(record)">
              <div class="item-header">
                <span class="item-type">{{ getDivinationTitle(record.type) }}</span>
                <span class="item-date">{{ formatDate(record.timestamp) }}</span>
              </div>
              <div class="item-question">{{ record.question }}</div>
            </button>
          </div>
        </div>
      </div>

      <div v-if="historyRecords.length > 0" class="form-actions">
        <button class="btn-danger" @click="clearAllHistory">清空历史记录</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DivinationResult from '@/components/divination/DivinationResult.vue';
import { getDivinationConfig } from '@/config/divination';
import { useHistoryManager } from '@/composables/useHistoryManager';
import { useHistoryAI } from '@/composables/useHistoryAI';
import type { DivinationType } from '@/types';
import { onMounted, onUnmounted, watch } from 'vue';
import { eventBus, EVENTS } from '@/utils/eventBus';

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

// 格式化日期（简短版）
function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('zh-CN');
}

// 格式化日期时间（完整版）
function formatDateTime(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleString('zh-CN');
}

// 获取占卜标题
function getDivinationTitle(type: DivinationType): string {
  const config = getDivinationConfig(type);
  return config ? config.title : '未知占卜';
}

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
.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-6); /* 24px */
  padding-bottom: var(--spacing-4); /* 16px */
  border-bottom: 1px solid var(--color-border);
}

.header-left {
  flex: 1;
}

.detail-date {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm); /* 14px */
  margin: var(--spacing-2) 0 0 0; /* 8px top */
}

.detail-content {
  margin-bottom: var(--spacing-6); /* 24px */
}

.detail-question,
.detail-result,
.detail-conversation {
  margin-bottom: var(--spacing-6); /* 24px */
}

/* 历史记录列表样式 */
.card-header {
  margin-bottom: var(--spacing-6); /* 24px */
}

.history-content {
  margin-bottom: var(--spacing-6); /* 24px */
}

.empty-message {
  text-align: center;
  padding: var(--spacing-12) var(--spacing-4); /* 48px 16px */
  color: var(--color-text-secondary);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-4); /* 16px */
}

.empty-hint {
  font-size: var(--font-size-sm); /* 14px */
  opacity: 0.7;
  margin: var(--spacing-2) 0 0 0; /* 8px top */
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3); /* 12px */
}

.history-item-button {
  width: 100%;
  text-align: left;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md); /* 6px */
  padding: var(--spacing-4); /* 16px */
  transition: all 0.2s ease;
  cursor: pointer;
}

.history-item-button:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-2); /* 8px */
}

.item-type {
  font-weight: 600;
  color: var(--color-primary);
  font-size: var(--font-size-sm); /* 14px */
}

.item-date {
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs); /* 12px */
}

.item-question {
  color: var(--color-text-primary);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 对话历史样式 */
.conversation-history {
  margin-top: var(--spacing-4);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.chat-message {
  padding: 12px 18px;
  border-radius: 18px;
  max-width: 90%;
  line-height: 1.7;
  word-wrap: break-word;
  position: relative;
  box-shadow: var(--shadow-sm);
}

.message-user {
  background-color: var(--color-primary);
  color: white;
  align-self: flex-end;
  border-radius: 18px;
}

.message-user .message-content {
  color: white !important;
}

.message-assistant {
  background-color: var(--color-bg-secondary);
  color: var(--color-text-primary);
  align-self: flex-start;
  border-radius: 18px;
}

.message-content {
  white-space: pre-wrap;
  line-height: 1.6;
}
</style>
