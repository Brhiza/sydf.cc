<template>
  <ContentSectionCard>
    <template #title>
      {{ title }}
      <span v-if="accentText" class="highlight-text">{{ accentText }}</span>
    </template>
    <StatsSummaryGrid :items="items" />
  </ContentSectionCard>
</template>

<script setup lang="ts">
import ContentSectionCard from '@/components/common/ContentSectionCard.vue';
import StatsSummaryGrid from '@/components/common/StatsSummaryGrid.vue';

withDefaults(
  defineProps<{
    title?: string;
    accentText?: string;
    items: Array<{
      label: string;
      value: string | number;
    }>;
  }>(),
  {
    title: '功德统计',
    accentText: '爱心汇聚',
  }
);
</script>

<style scoped>
.highlight-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
}
</style>
