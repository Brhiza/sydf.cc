<template>
  <div class="paipan-section">
    <div class="hexagram-container">
      <div class="main-hexagram">
        <div
          v-for="(yaoDetail, index) in reversedYaosDetail"
          :key="index"
          class="yao-line"
        >
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
        <div
          v-for="(yaoDetail, index) in reversedYaosDetail"
          :key="index"
          class="yao-line"
        >
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
        <div
          v-for="(yaoDetail, index) in reversedYaosDetail"
          :key="index"
          class="yao-line"
        >
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
</template>

<script setup lang="ts">
import { toRef } from 'vue';
import { useHexagramDisplay } from '@/composables/useHexagramDisplay';
import type { MeihuaData } from '@/types/divination';
import { LiuyaoHelpers } from '@/utils/divination-helpers';
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
  flex: 0 0 auto;
  width: auto;
  min-width: 180px;
}

.inter-hexagram {
  flex: 0 0 auto;
  width: auto;
  min-width: 120px;
}

.changed-hexagram {
  flex: 0 0 auto;
  width: auto;
  min-width: 120px;
}

.yao-position {
  width: 24px;
  flex-shrink: 0;
  color: var(--color-text-secondary);
  font-size: 16px;
  font-weight: var(--font-weight-medium);
  text-align: left;
}

.trigram-info {
  width: 40px;
  flex-shrink: 0;
  color: var(--color-text-primary);
  font-size: 16px;
  text-align: left;
}

.inter-trigram-info {
  width: 40px;
  flex-shrink: 0;
  color: var(--color-text-secondary);
  font-size: 16px;
  text-align: center;
}

.changed-trigram-info {
  width: 40px;
  flex-shrink: 0;
  color: var(--color-text-primary);
  font-size: 16px;
  text-align: center;
}

@media (max-width: 768px) {
  .main-hexagram {
    min-width: 140px;
  }

  .inter-hexagram,
  .changed-hexagram {
    min-width: 90px;
  }

  .yao-position {
    width: 20px;
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
  .main-hexagram {
    min-width: 120px;
  }

  .inter-hexagram,
  .changed-hexagram {
    min-width: 80px;
  }

  .yao-position {
    width: 16px;
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
