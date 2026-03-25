<template>
  <ResultInfoHeader :items="headerItems">
    <slot></slot>
  </ResultInfoHeader>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ResultInfoHeader from './ResultInfoHeader.vue';

interface ResultHeaderItem {
  label: string;
  value: string;
}

const props = withDefaults(defineProps<{
  solarTime?: string;
  ganzhiTime?: string;
  solarLabel?: string;
  ganzhiLabel?: string;
}>(), {
  solarTime: '',
  ganzhiTime: '',
  solarLabel: '起卦时间',
  ganzhiLabel: '干支信息',
});

const headerItems = computed<ResultHeaderItem[]>(() => {
  return [
    props.solarTime ? { label: props.solarLabel, value: props.solarTime } : null,
    props.ganzhiTime ? { label: props.ganzhiLabel, value: props.ganzhiTime } : null,
  ].filter((item): item is ResultHeaderItem => !!item);
});
</script>
