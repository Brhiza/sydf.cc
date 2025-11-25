<template>
  <div class="result-header">
    <div v-if="solarTime" class="info-line">
      <span class="info-label">公历时间：</span>
      <span class="info-value">{{ solarTime }}</span>
    </div>
    <div v-if="ganzhiTime" class="info-line">
      <span class="info-label">干支：</span>
      <span class="info-value">{{ ganzhiTime }}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  solarTime?: string;
  ganzhiTime?: string;
}>();
</script>

<style scoped>
.result-header {
  margin-bottom: var(--spacing-3);
}

.info-line {
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-1);
  justify-content: space-between;
  line-height: 1.4;
}

.info-line:last-child {
  margin-bottom: 0;
}

.info-label {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  width: 80px;
  text-align: justify;
  text-align-last: justify;
  flex-shrink: 0;
  font-size: 16px;
}

.info-value {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
  flex: 1;
  text-align: left;
  margin-left: var(--spacing-2);
  font-size: 16px;
}
</style>
