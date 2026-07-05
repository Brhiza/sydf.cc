<template>
  <div class="item-content" :class="[`item-content-${size}`]">
    <div class="item-title" :class="{ active: isActive }" :title="record.question">
      <span v-if="record.pinned" class="pin-indicator" aria-label="已置顶">置顶</span>
      <span class="item-question">{{ record.question }}</span>
    </div>
    <div class="item-meta" :class="{ active: isActive }">
      <span class="item-type" :class="{ active: isActive }">{{ typeLabel }}</span>
      <span class="item-time">{{ formattedTime }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { HistoryRecord } from '@/services/history';
import { formatHistoryRecordTime, getHistoryTypeLabel } from '@/utils/history-record';

const props = defineProps<{
  record: HistoryRecord;
  isActive: boolean;
  size?: 'compact' | 'regular';
  timeMode?: 'relative' | 'date';
}>();

const typeLabel = computed(() => getHistoryTypeLabel(props.record.type));
const formattedTime = computed(() => formatHistoryRecordTime(props.record.timestamp, props.timeMode || 'relative'));
</script>

<style scoped>
.item-content {
  flex: 1;
  min-width: 0;
}

.item-content-regular .item-title {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-1);
}

.item-content-regular .item-meta {
  gap: var(--spacing-2);
  font-size: var(--font-size-xs);
}

.item-content-regular .item-type {
  font-size: var(--font-size-xs);
  padding: 2px var(--spacing-2);
}

.item-title {
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
  min-width: 0;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-1);
  line-height: var(--line-height-tight);
}

.item-title.active {
  color: var(--color-primary);
}

html.dark .item-title.active {
  color: var(--color-text-primary);
}

.pin-indicator {
  flex-shrink: 0;
  padding: 1px 5px;
  border: 1px solid color-mix(in srgb, var(--color-primary) 22%, var(--color-border));
  border-radius: var(--radius-sm);
  background: color-mix(in srgb, var(--color-primary) 8%, var(--color-background));
  color: var(--color-primary);
  font-size: 10px;
  font-weight: var(--font-weight-semibold);
  line-height: 1.2;
}

.item-question {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
  min-width: 0;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  line-height: var(--line-height-tight);
}

.item-meta.active {
  color: var(--color-primary);
}

html.dark .item-meta.active {
  color: var(--color-text-secondary);
}

.item-type {
  flex-shrink: 0;
  background: var(--color-background-soft);
  padding: 2px var(--spacing-1);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
}

.item-type.active {
  background: color-mix(in srgb, var(--color-primary) 10%, var(--color-background));
  border-color: color-mix(in srgb, var(--color-primary) 18%, var(--color-border));
  color: var(--color-primary);
}

html.dark .item-type.active {
  background: var(--color-background);
  color: var(--color-text-primary);
}

.item-time {
  min-width: 0;
  opacity: 0.7;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .item-title {
    font-size: var(--font-size-sm);
  }

  .item-meta {
    font-size: var(--font-size-xs);
  }

  .item-type {
    padding: 1px var(--spacing-1);
  }
}
</style>
