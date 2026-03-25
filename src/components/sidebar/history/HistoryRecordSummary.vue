<template>
  <div class="item-content" :class="[`item-content-${size}`]">
    <div class="item-title" :class="{ active: isActive }">
      <span v-if="record.pinned" class="pin-indicator">📌</span>
      {{ record.question }}
    </div>
    <div class="item-meta" :class="{ active: isActive }">
      <span class="item-type" :class="{ active: isActive }">{{ typeLabel }}</span>
      <span class="item-time">{{ formattedTime }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { HistoryRecord } from '@/services'
import { formatHistoryRecordTime, getHistoryTypeLabel } from '@/utils/history-record'

const props = defineProps<{
  record: HistoryRecord
  isActive: boolean
  size?: 'compact' | 'regular'
  timeMode?: 'relative' | 'date'
}>()

const typeLabel = computed(() => getHistoryTypeLabel(props.record.type))
const formattedTime = computed(() => formatHistoryRecordTime(props.record.timestamp, props.timeMode || 'relative'))
</script>

<style scoped>
.item-content {
  flex: 1;
  min-width: 0;
}

.item-content-regular .item-title {
  font-size: 15px;
  color: var(--color-text-primary);
  margin-bottom: 6px;
}

.item-content-regular .item-meta {
  gap: 8px;
  font-size: 12px;
}

.item-content-regular .item-type {
  font-size: 11px;
  padding: 2px 6px;
}

.item-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-secondary);
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-title.active {
  color: #6b46c1;
}

html.dark .item-title.active {
  color: #ffffff;
}

.pin-indicator {
  display: inline-block;
  margin-right: 2px;
  font-size: 10px;
  animation: pin-pulse 2s infinite;
}

@keyframes pin-pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}

.item-meta {
  display: flex;
  gap: 6px;
  font-size: 10px;
  color: var(--color-text-secondary);
}

.item-meta.active {
  color: #6b46c1;
}

html.dark .item-meta.active {
  color: rgba(255, 255, 255, 0.8);
}

.item-type {
  background: var(--color-background-muted);
  padding: 1px 4px;
  border-radius: 3px;
  font-size: 9px;
}

.item-type.active {
  background: rgba(107, 70, 193, 0.1);
  color: #6b46c1;
}

html.dark .item-type.active {
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
}

.item-time {
  opacity: 0.7;
}

@media (max-width: 768px) {
  .item-title {
    font-size: 13px;
  }

  .item-meta {
    font-size: 9px;
  }

  .item-type {
    font-size: 8px;
    padding: 1px 3px;
  }
}
</style>
