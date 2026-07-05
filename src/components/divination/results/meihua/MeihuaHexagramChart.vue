<template>
  <div class="paipan-section">
    <div class="paipan-section-header">
      <h3 class="paipan-section-title">梅花排盘</h3>
      <span class="paipan-section-meta">主卦 / 互卦 / 变卦</span>
    </div>
    <div class="paipan-scroll">
      <div class="hexagram-container">
        <div class="main-hexagram">
          <div v-for="(yaoDetail, index) in reversedYaosDetail" :key="index" class="yao-line">
            <span class="yao-position">{{ getYaoPositionName(yaoDetail.position) }}</span>
            <YaoSymbol :yao-type="yaoDetail.yaoType" :is-main="true" />
            <span class="change-mark">
              <span v-if="yaoDetail.isChanging">●</span>
            </span>
            <span class="trigram-info">
              <template v-if="'tiYong' in yaoDetail">
                {{ yaoDetail.tiYong }}
              </template>
            </span>
          </div>
        </div>

        <div v-if="data.interName" class="inter-hexagram">
          <div v-for="(yaoDetail, index) in reversedYaosDetail" :key="index" class="yao-line">
            <YaoSymbol
              :yao-type="getInterYaoType(data.yaosDetail, yaoDetail.position, !!data.interHexagram)"
              :is-main="false"
            />
            <span class="inter-trigram-info">
              {{ getTrigramInfo(yaoDetail.position, data.interHexagram) }}
            </span>
          </div>
        </div>

        <div class="changed-hexagram">
          <div v-for="(yaoDetail, index) in reversedYaosDetail" :key="index" class="yao-line">
            <YaoSymbol
              :yao-type="
                yaoDetail.isChanging
                  ? LiuyaoHelpers.getChangedYaoType(yaoDetail.yaoType)
                  : yaoDetail.yaoType
              "
              :is-main="false"
            />
            <span class="changed-trigram-info">
              {{ getTrigramInfo(yaoDetail.position, data.changedHexagram) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue';
import { useHexagramDisplay } from '@/composables/useHexagramDisplay';
import type { MeihuaData } from '@/types/divination';
import { LiuyaoHelpers } from '@/components/divination/results/liuyao/liuyao-helpers';
import YaoSymbol from '../../common/YaoSymbol.vue';
import { getInterYaoType, getTrigramInfo, getYaoPositionName } from './meihua-result';

const props = defineProps<{
  data: MeihuaData;
}>();

const { reversedYaosDetail } = useHexagramDisplay(toRef(props, 'data'));
</script>

<style scoped>
@import '@/styles/components/results.css';

.main-hexagram {
  flex: 1 1 40%;
  min-width: 0;
}

.inter-hexagram {
  flex: 1 1 28%;
  min-width: 0;
}

.changed-hexagram {
  flex: 1 1 28%;
  min-width: 0;
}

.yao-position {
  width: clamp(14px, 4vw, 24px);
  flex-shrink: 0;
  color: var(--color-text-secondary);
  font-size: 15px;
  font-weight: var(--font-weight-medium);
  text-align: left;
}

.trigram-info {
  flex: 1 1 auto;
  min-width: 0;
  color: var(--color-text-primary);
  font-size: 15px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.inter-trigram-info {
  flex: 1 1 auto;
  min-width: 0;
  color: var(--color-text-secondary);
  font-size: 15px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.changed-trigram-info {
  flex: 1 1 auto;
  min-width: 0;
  color: var(--color-text-primary);
  font-size: 15px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .yao-position {
    font-size: 13px;
  }

  .trigram-info {
    width: 32px;
    font-size: 13px;
  }

  .inter-trigram-info,
  .changed-trigram-info {
    width: 28px;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .yao-position {
    font-size: 12px;
  }

  .trigram-info {
    width: 26px;
    font-size: 12px;
  }

  .inter-trigram-info,
  .changed-trigram-info {
    width: 22px;
    font-size: 12px;
  }
}
</style>
