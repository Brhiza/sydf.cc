<template>
  <div v-if="data" class="ssgw-info">
    <div class="info-item">
      <span class="label">签号：</span>
      <span class="value">第{{ data.number }}签</span>
    </div>
    <div class="info-item">
      <span class="label">签名：</span>
      <span class="value">{{ data.title }}</span>
    </div>
    <div class="info-item poem">
      <div class="poem-content">{{ data.poem }}</div>
    </div>

    <div v-if="data.story" class="info-item story">
      <span class="label">签文故事：</span>
      <div class="story-content">{{ data.story }}</div>
    </div>

    <div v-if="data.details" class="details-grid">
      <div v-for="(value, key) in data.details" :key="key" class="detail-item">
        <div class="detail-key">{{ key }}</div>
        <div class="detail-value">{{ value }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SsgwData } from '@/types/divination';

defineProps<{
  data: SsgwData | null;
}>();
</script>

<style scoped>
.ssgw-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.info-item {
  display: flex;
  align-items: baseline;
}

.info-item .label {
  font-weight: var(--font-weight-bold);
  margin-right: var(--spacing-2);
  min-width: 80px;
  color: var(--color-text-secondary);
}

.info-item .value {
  font-size: 1.1em;
}

.info-item.poem,
.info-item.story {
  flex-direction: column;
  align-items: flex-start;
}

.poem-content,
.story-content {
  white-space: pre-line;
  line-height: var(--line-height-relaxed);
  margin-top: var(--spacing-1);
  padding: var(--spacing-3);
  background-color: var(--color-background-secondary);
  border-radius: var(--radius-md);
  width: 100%;
}

.poem-content {
  font-style: italic;
  font-size: 1.2em;
  text-align: center;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-4);
  margin-top: var(--spacing-4);
  border-top: 1px solid var(--color-border-light);
  padding-top: var(--spacing-4);
}

.detail-item {
  background-color: var(--color-background-secondary);
  padding: var(--spacing-3);
  border-radius: var(--radius-md);
}

.detail-key {
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-2);
}

.detail-value {
  line-height: var(--line-height-normal);
}
</style>
