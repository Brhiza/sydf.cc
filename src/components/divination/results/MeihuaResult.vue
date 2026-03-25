<template>
  <BaseResultLayout>
    <MeihuaResultHeader :data="data" />
    <MeihuaHexagramChart :data="data" />
  </BaseResultLayout>
</template>

<script setup lang="ts">
import type { MeihuaData } from '@/types/divination';
import BaseResultLayout from './BaseResultLayout.vue';
import MeihuaHexagramChart from './meihua/MeihuaHexagramChart.vue';
import MeihuaResultHeader from './meihua/MeihuaResultHeader.vue';

defineProps<{
  data: MeihuaData;
}>();
</script>
