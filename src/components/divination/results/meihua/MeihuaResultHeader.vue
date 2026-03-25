<template>
  <ResultHeader :solar-time="formatSolarTime" :ganzhi-time="formatGanZhi">
    <div class="hexagram-info">
      <div class="hexagram-line">
        <span class="hexagram-label">主卦：</span>
        <span class="hexagram-value">
          {{ data.originalName }}
          <template v-if="data.mainHexagram?.upper && data.mainHexagram?.lower">
            （{{ data.mainHexagram.upper }}-{{ data.mainHexagram.lower }}）
          </template>
        </span>
      </div>
      <div class="hexagram-line">
        <span class="hexagram-label">变卦：</span>
        <span class="hexagram-value">
          {{ data.changedName }}
          <template v-if="data.changedHexagram?.upper && data.changedHexagram?.lower">
            （{{ data.changedHexagram.upper }}-{{ data.changedHexagram.lower }}）
          </template>
        </span>
      </div>
      <div v-if="data.interName" class="hexagram-line">
        <span class="hexagram-label">互卦：</span>
        <span class="hexagram-value">
          {{ data.interName }}
          <template v-if="data.interHexagram?.upper && data.interHexagram?.lower">
            （{{ data.interHexagram.upper }}-{{ data.interHexagram.lower }}）
          </template>
        </span>
      </div>
      <div v-if="data.movingYao" class="hexagram-line">
        <span class="hexagram-label">动爻：</span>
        <span class="hexagram-value">
          {{ data.movingYao.yaoName }}（{{ data.movingYao.description }}）
        </span>
      </div>
      <div v-if="data.calculation?.method" class="hexagram-line">
        <span class="hexagram-label">起卦方式：</span>
        <span class="hexagram-value">
          {{ data.calculation.method }}
          <template v-if="typeof data.calculation.number === 'number'">
            （数字：{{ data.calculation.number }}）
          </template>
          <template v-else-if="data.calculation.externalSummary">
            （{{ data.calculation.externalSummary }}）
          </template>
        </span>
      </div>
      <div v-if="data.tiGua && data.yongGua && data.analysis" class="hexagram-line">
        <span class="hexagram-label">体用：</span>
        <span class="hexagram-value">
          {{ data.tiGua.name }}{{ data.tiGua.element }} (体) - {{ data.yongGua.name
          }}{{ data.yongGua.element }} (用)（{{ data.analysis.tiYongRelation }}）
        </span>
      </div>
      <div
        v-if="data.changedTiGua && data.changedYongGua && data.analysis?.changedTiYongRelation"
        class="hexagram-line"
      >
        <span class="hexagram-label">变卦体用：</span>
        <span class="hexagram-value">
          {{ data.changedTiGua.name }}{{ data.changedTiGua.element }} (体) -
          {{ data.changedYongGua.name }}{{ data.changedYongGua.element }} (用)
          （{{ data.analysis.changedTiYongRelation }}）
        </span>
      </div>
    </div>
  </ResultHeader>
</template>

<script setup lang="ts">
import { toRef } from 'vue';
import { useResultFormatting } from '@/composables/useResultFormatting';
import type { MeihuaData } from '@/types/divination';
import ResultHeader from '../ResultHeader.vue';

const props = defineProps<{
  data: MeihuaData;
}>();

const { formatSolarTime, formatGanZhi } = useResultFormatting(toRef(props, 'data'));
</script>

<style scoped>
@import '@/styles/components/results.css';
</style>
