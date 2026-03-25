<template>
  <BaseResultLayout>
    <LiuyaoResultHeader :data="data" />
    <LiuyaoHexagramChart :data="data" />
  </BaseResultLayout>
</template>

<script setup lang="ts">
import type { LiuyaoData } from '@/types/divination';
import BaseResultLayout from './BaseResultLayout.vue';
import LiuyaoHexagramChart from './liuyao/LiuyaoHexagramChart.vue';
import LiuyaoResultHeader from './liuyao/LiuyaoResultHeader.vue';

defineProps<{
  data: LiuyaoData;
}>();
</script>
