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
  isAiLoading?: boolean
}>()

const componentMap = {
  liuyao: LiuyaoResult,
  meihua: MeihuaResult,
  qimen: QimenResult,
  tarot: TarotResult,
  ssgw: SsgwResult,
  daily: DailyInterpretationResult,
} as const;

const renderer = computed(() =>
  resolveResultRenderer(props.type, props.result, props.question, props.isAiLoading ?? false)
)

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

.result-content :deep(.base-result-layout) {
  gap: var(--spacing-3);
  padding: var(--spacing-4);
}

@media (max-width: 480px) {
  .result-content :deep(.base-result-layout) {
    gap: var(--spacing-3);
    padding: var(--spacing-3);
  }
}

@media (max-width: 768px) {
  .result-content :deep(.base-result-layout) {
    gap: var(--spacing-2);
    margin-bottom: var(--spacing-3);
    padding: 0;
    border: 0;
    border-radius: 0;
    background: transparent;
  }
}
</style>
