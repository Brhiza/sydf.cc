<template>
  <div v-if="renderer" class="result-content">
    <component :is="rendererComponent" v-bind="renderer.props" />
  </div>
</template>

<script setup lang="ts">
import type { DivinationResult as DivinationResultType, DivinationType } from '@/types'
import { computed } from 'vue'
import {
  LiuyaoResult,
  MeihuaResult,
  QimenResult,
  SsgwResult,
  TarotResult,
  DailyInterpretationResult,
} from '../results'
import { resolveResultRenderer } from './divination-result-body'

const props = defineProps<{
  type: DivinationType
  result: DivinationResultType
  question?: string
}>()

const componentMap = {
  liuyao: LiuyaoResult,
  meihua: MeihuaResult,
  qimen: QimenResult,
  tarot: TarotResult,
  ssgw: SsgwResult,
  daily: DailyInterpretationResult,
} as const;

const renderer = computed(() => resolveResultRenderer(props.type, props.result, props.question))

const rendererComponent = computed(() => {
  if (!renderer.value) {
    return null
  }
  return componentMap[renderer.value.kind]
})
</script>

<style scoped>
.result-content {
  margin-bottom: 0;
}
</style>
