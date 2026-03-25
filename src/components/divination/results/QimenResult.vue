<template>
  <BaseResultLayout class="qimen-result">
    <QimenBasicInfo :data="data" :question="question" :supplementary-info="supplementaryInfo" />
    <QimenJiugongGrid :data="data" :highlighted-gongs="highlightedGongs" />
  </BaseResultLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { QimenData } from '@/types/divination';
import type { SupplementaryInfo } from '@/types/divination';
import BaseResultLayout from './BaseResultLayout.vue';
import QimenBasicInfo from './qimen/QimenBasicInfo.vue';
import QimenJiugongGrid from './qimen/QimenJiugongGrid.vue';
import { createQimenPriorityPalaces } from '@/utils/qimen-guidance';

const props = defineProps<{
  data: QimenData;
  question?: string;
  supplementaryInfo?: SupplementaryInfo;
}>();

const highlightedGongs = computed(() =>
  createQimenPriorityPalaces(props.question, props.data, props.supplementaryInfo)
    .slice(0, 2)
    .map((item) => item.gong)
);
</script>

<style scoped>
.qimen-result {
  width: 100%;
}
</style>
