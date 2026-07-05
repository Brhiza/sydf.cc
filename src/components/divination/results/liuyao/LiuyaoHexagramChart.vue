<template>
  <div class="paipan-section">
    <div class="paipan-section-header">
      <h3 class="paipan-section-title">六爻排盘</h3>
      <span class="paipan-section-meta">本卦 / 变卦</span>
    </div>
    <div class="paipan-scroll">
      <div class="hexagram-container">
        <div class="main-hexagram">
          <div v-for="row in displayRows" :key="row.key" class="yao-line">
            <span class="six-god">{{ row.sixGod }}</span>
            <YaoSymbol :yao-type="row.yaoType" :is-main="true" />
            <span class="change-mark">{{ row.changeMarkSymbol }}</span>
            <span class="yao-info">{{ row.yaoInfo }}</span>
            <span class="void-mark">{{ row.voidMark }}</span>
            <span class="world-response">{{ row.worldResponseMark }}</span>
          </div>
        </div>

        <div class="changed-hexagram">
          <div v-for="row in displayRows" :key="row.key" class="yao-line">
            <YaoSymbol :yao-type="row.changedYaoType" :is-main="false" />
            <span class="yao-info">{{ row.changedYaoInfo }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { LiuyaoData } from '@/types/divination';
import YaoSymbol from '../../common/YaoSymbol.vue';
import { createLiuyaoDisplayRows } from './liuyao-result';

const props = defineProps<{
  data: LiuyaoData;
}>();

const displayRows = computed(() => {
  return createLiuyaoDisplayRows(props.data);
});
</script>

<style scoped>
@import '@/styles/components/results.css';

.main-hexagram {
  flex: 1 1 58%;
  min-width: 0;
}

.changed-hexagram {
  flex: 1 1 38%;
  min-width: 0;
}

.six-god {
  width: clamp(18px, 4vw, 28px);
  flex-shrink: 0;
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
  text-align: left;
}

.yao-info {
  flex: 1 1 auto;
  min-width: 0;
  color: var(--color-text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.void-mark {
  width: clamp(6px, 2vw, 12px);
  flex-shrink: 0;
  color: var(--color-danger);
  font-size: var(--font-size-xs);
  font-weight: bold;
  text-align: center;
}

.world-response {
  width: clamp(10px, 3vw, 18px);
  flex-shrink: 0;
  color: var(--color-danger);
  font-weight: bold;
  text-align: center;
}

@media (max-width: 768px) {
  .six-god {
    font-size: var(--font-size-xs);
  }

  .yao-info {
    font-size: var(--font-size-xs);
  }

  .void-mark {
    font-size: var(--font-size-xs);
  }

  .world-response {
    font-size: var(--font-size-xs);
  }
}

@media (max-width: 480px) {
  .six-god {
    font-size: 12px;
  }

  .yao-info {
    font-size: 12px;
  }

  .void-mark {
    width: 8px;
    font-size: 12px;
  }

  .world-response {
    width: 14px;
    font-size: 12px;
  }
}

@media (max-width: 360px) {
  .six-god {
    width: 18px;
    font-size: 10px;
  }

  .yao-info {
    width: 46px;
    font-size: 10px;
  }

  .void-mark {
    width: 5px;
    font-size: 9px;
  }

  .world-response {
    width: 10px;
    font-size: 10px;
  }
}
</style>
