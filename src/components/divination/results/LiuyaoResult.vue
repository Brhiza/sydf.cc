<template>
  <BaseResultLayout>
    <ResultHeader :solar-time="formatSolarTime" :ganzhi-time="formatGanZhi">
      <!-- 卦象信息 -->
      <div class="hexagram-info">
        <div class="hexagram-line">
          <span class="hexagram-label">主卦：</span>
          <span class="hexagram-value">
            {{ data.originalName }}
            <template v-if="data.palace?.name">（{{ data.palace.name }}宫）</template>
          </span>
        </div>
        <div class="hexagram-line">
          <span class="hexagram-label">变卦：</span>
          <span class="hexagram-value">{{ data.changedName }}</span>
        </div>
        <div v-if="data.voidBranches && data.voidBranches.length > 0" class="hexagram-line">
          <span class="hexagram-label">旬空：</span>
          <span class="hexagram-value">{{ data.voidBranches.join('、') }}</span>
        </div>
        <div v-if="data.interName" class="hexagram-line">
          <span class="hexagram-label">互卦：</span>
          <span class="hexagram-value">{{ data.interName }}</span>
        </div>
        <div v-if="data.changingYaos && data.changingYaos.length > 0" class="hexagram-line">
          <span class="hexagram-label">动爻：</span>
          <span class="hexagram-value">
            <span
              v-for="(changingYao, index) in data.changingYaos"
              :key="changingYao.position"
              class="changing-item"
              >第{{ changingYao.position }}爻（{{ changingYao.type }}）{{
                index < data.changingYaos.length - 1 ? '、' : ''
              }}</span>
          </span>
        </div>
      </div>
    </ResultHeader>

    <!-- 排盘信息区块 -->
    <div class="paipan-section">
      <div class="hexagram-container">
        <!-- 主卦区域 -->
        <div class="main-hexagram">
          <div v-for="(yaoDetail, index) in reversedYaosDetail" :key="index" class="yao-line">
            <template v-if="'sixGod' in yaoDetail">
              <span class="six-god">{{ yaoDetail.sixGod }}</span>
              <YaoSymbol :yao-type="yaoDetail.yaoType" :is-main="true" />
              <span class="change-mark">
                <span v-if="yaoDetail.isChanging">{{ yaoDetail.rawValue === 6 ? '×' : '●' }}</span>
              </span>
              <span class="yao-info">
                {{ yaoDetail.sixRelative }}{{ yaoDetail.najiaDizhi }}{{ yaoDetail.wuxing }}
              </span>
              <span class="void-mark">
                {{ yaoDetail.isVoid ? '空' : '' }}
              </span>
              <span class="world-response">
                {{ yaoDetail.isWorld ? '世' : yaoDetail.isResponse ? '应' : '' }}
              </span>
            </template>
          </div>
        </div>

        <!-- 变卦区域 -->
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
            <span class="yao-info">
              <template v-if="'sixGod' in yaoDetail">
                {{ LiuyaoHelpers.getChangedYaoInfo(yaoDetail) }}
              </template>
            </span>
          </div>
        </div>
      </div>
    </div>
  </BaseResultLayout>
</template>

<script setup lang="ts">
import { toRef } from 'vue';
import { LiuyaoHelpers } from '@/utils/divination-helpers';
import { useResultFormatting } from '@/composables/useResultFormatting';
import { useHexagramDisplay } from '@/composables/useHexagramDisplay';
import type { LiuyaoData } from '@/types/divination';

// 导入组件
import ResultHeader from './ResultHeader.vue';
import YaoSymbol from '../common/YaoSymbol.vue';
import BaseResultLayout from './BaseResultLayout.vue';

const props = defineProps<{
  data: LiuyaoData;
}>();

// 使用 Composable 进行时间格式化
const { formatSolarTime, formatGanZhi } = useResultFormatting(toRef(props, 'data'));

// 使用 Composable 进行爻象显示处理
const { reversedYaosDetail } = useHexagramDisplay(toRef(props, 'data'));
</script>

<style scoped>
/* 引入共享样式 */
@import '@/styles/components/results.css';

.changing-item {
  color: var(--color-text-primary);
}

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
  text-align: left;
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
  flex-shrink: 0;
}

.yao-info {
  width: 75px;
  color: var(--color-text-primary);
  flex-shrink: 0;
}

.void-mark {
  width: 12px;
  text-align: center;
  color: var(--color-danger);
  font-weight: bold;
  flex-shrink: 0;
  font-size: var(--font-size-xs);
}

.world-response {
  width: 18px;
  text-align: center;
  color: var(--color-danger);
  font-weight: bold;
  flex-shrink: 0;
}

/* 动爻信息 */
.changing-summary {
  padding: var(--spacing-2) 0;
  margin-top: var(--spacing-2);
  border-top: 1px solid #eee;
  font-size: var(--font-size-sm);
  line-height: 1.6;
  text-align: center;
}

.changing-summary-inline {
  color: var(--color-text-primary);
}

.changing-label {
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
}

/* 响应式设计 */
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

  .right-section {
    gap: 2px;
  }
}

@media (max-width: 360px) {
  .paipan-table {
    font-size: 10px;
  }

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
