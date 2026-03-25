<template>
  <ResultInfoHeader :items="infoItems" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { QimenData } from '@/types/divination';
import type { SupplementaryInfo } from '@/types/divination';
import ResultInfoHeader from '../ResultInfoHeader.vue';
import { createQimenInfoItems } from './qimen-result';

const props = defineProps<{
  data: QimenData;
  question?: string;
  supplementaryInfo?: SupplementaryInfo;
}>();

const infoItems = computed(() => {
  return createQimenInfoItems(props.data, {
    question: props.question,
    supplementaryInfo: props.supplementaryInfo,
  });
});
</script>
