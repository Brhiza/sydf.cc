<template>
  <div class="paipan-section">
    <div class="hexagram-container">
      <div class="main-hexagram">
        <div
          v-for="row in displayRows"
          :key="row.key"
          class="yao-line"
        >
          <span class="six-god">{{ row.sixGod }}</span>
          <YaoSymbol :yao-type="row.yaoType" :is-main="true" />
          <span class="change-mark">{{ row.changeMarkSymbol }}</span>
          <span class="yao-info">{{ row.yaoInfo }}</span>
          <span class="void-mark">{{ row.voidMark }}</span>
          <span class="world-response">{{ row.worldResponseMark }}</span>
        </div>
      </div>

      <div class="changed-hexagram">
        <div
          v-for="row in displayRows"
          :key="row.key"
          class="yao-line"
        >
          <YaoSymbol :yao-type="row.changedYaoType" :is-main="false" />
          <span class="yao-info">{{ row.changedYaoInfo }}</span>
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
  flex: 0 0 auto;
  width: auto;
  min-width: 280px;
}

.changed-hexagram {
  flex: 0 0 auto;
  width: auto;
  min-width: 200px;
}

.six-god {
  width: 32px;
  flex-shrink: 0;
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
  text-align: left;
}

.yao-info {
  width: 75px;
  flex-shrink: 0;
  color: var(--color-text-primary);
}

.void-mark {
  width: 12px;
  flex-shrink: 0;
  color: var(--color-danger);
  font-size: var(--font-size-xs);
  font-weight: bold;
  text-align: center;
}

.world-response {
  width: 18px;
  flex-shrink: 0;
  color: var(--color-danger);
  font-weight: bold;
  text-align: center;
}

@media (max-width: 768px) {
  .main-hexagram {
    min-width: 200px;
  }

  .changed-hexagram {
    min-width: 150px;
  }

  .six-god {
    width: 26px;
    font-size: var(--font-size-xs);
  }

  .yao-info {
    width: 62px;
    font-size: var(--font-size-xs);
  }

  .void-mark {
    width: 8px;
    font-size: var(--font-size-xs);
  }

  .world-response {
    width: 14px;
    font-size: var(--font-size-xs);
  }
}

@media (max-width: 480px) {
  .main-hexagram {
    min-width: 170px;
  }

  .changed-hexagram {
    min-width: 130px;
  }

  .six-god {
    width: 24px;
    font-size: 13px;
  }

  .yao-info {
    width: 56px;
    font-size: 13px;
  }

  .void-mark {
    width: 8px;
    font-size: 12px;
  }

  .world-response {
    width: 14px;
    font-size: 13px;
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
