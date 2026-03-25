<template>
  <ResultHeader :solar-time="formatSolarTime" :ganzhi-time="formatGanZhi">
    <div class="hexagram-info">
      <div
        v-for="item in summaryItems"
        :key="item.label"
        :class="['hexagram-line', item.className]"
      >
        <span class="hexagram-label">{{ item.label }}：</span>
        <span class="hexagram-value">{{ item.value }}</span>
      </div>
    </div>
  </ResultHeader>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue';
import { useResultFormatting } from '@/composables/useResultFormatting';
import type { LiuyaoData } from '@/types/divination';
import ResultHeader from '../ResultHeader.vue';
import { createLiuyaoSummaryItems } from './liuyao-result';

const props = defineProps<{
  data: LiuyaoData;
}>();

const { formatSolarTime, formatGanZhi } = useResultFormatting(toRef(props, 'data'));

const summaryItems = computed(() => {
  return createLiuyaoSummaryItems(props.data);
});
</script>

<style scoped>
@import '@/styles/components/results.css';

.special-advice-line .hexagram-value {
  line-height: 1.6;
}
</style>
