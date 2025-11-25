<template>
  <BaseResultLayout>
    <ResultHeader :solar-time="formatSolarTime" :ganzhi-time="formatGanZhi">
      <!-- 卦象信息 -->
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
          <span class="hexagram-value"
            >{{ data.movingYao.yaoName }}（{{ data.movingYao.description }}）</span
          >
        </div>
        <div v-if="data.tiGua && data.yongGua && data.analysis" class="hexagram-line">
          <span class="hexagram-label">体用：</span>
          <span class="hexagram-value">
            {{ data.tiGua.name }}{{ data.tiGua.element }} (体) - {{ data.yongGua.name
            }}{{ data.yongGua.element }} (用)（{{ data.analysis.tiYongRelation }}）
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

        <!-- 互卦区域（如果存在） -->
        <div v-if="data.interName" class="inter-hexagram">
          <div v-for="(yaoDetail, index) in reversedYaosDetail" :key="index" class="yao-line">
            <YaoSymbol :yao-type="getInterYaoType(yaoDetail.position)" :is-main="false" />
            <span class="inter-trigram-info">
              {{ getInterTrigramInfo(yaoDetail.position) }}
            </span>
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
            <span class="changed-trigram-info">
              {{ getChangedTrigramInfo(yaoDetail.position) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 起卦数据（可选显示） -->
    <div v-if="data.calculation && showCalculation" class="calculation-section">
      <div class="calculation-title">起卦数据</div>
      <div class="calculation-details">
        <span>年支{{ data.calculation.yearZhi }}({{ data.calculation.yearZhiIndex }})</span>
        <span>月{{ data.calculation.month }}</span>
        <span>日{{ data.calculation.day }}</span>
        <span>时支{{ data.calculation.timeZhi }}({{ data.calculation.timeZhiIndex }})</span>
        <span>→</span>
        <span>上卦{{ data.calculation.upperTrigramIndex }}</span>
        <span>下卦{{ data.calculation.lowerTrigramIndex }}</span>
        <span>动爻{{ data.calculation.movingYaoIndex }}</span>
      </div>
    </div>
  </BaseResultLayout>
</template>

<script setup lang="ts">
import { ref, toRef } from 'vue';
import { LiuyaoHelpers } from '@/utils/divination-helpers';
import { useResultFormatting } from '@/composables/useResultFormatting';
import { useHexagramDisplay } from '@/composables/useHexagramDisplay';
import type { MeihuaData } from '@/types/divination';
import ResultHeader from './ResultHeader.vue';
import BaseResultLayout from './BaseResultLayout.vue';
import YaoSymbol from '../common/YaoSymbol.vue';

// 控制起卦数据显示
const showCalculation = ref(false);

const props = defineProps<{
  data: MeihuaData;
}>();

// 使用 Composable 进行时间格式化
const { formatSolarTime, formatGanZhi } = useResultFormatting(toRef(props, 'data'));

// 使用 Composable 进行爻象显示处理
const { reversedYaosDetail } = useHexagramDisplay(toRef(props, 'data'));

// 获取爻位名称
const getYaoPositionName = (position: number) => {
  const names = ['初', '二', '三', '四', '五', '上'];
  return names[position - 1] || '未知';
};

// 获取互卦爻象类型
const getInterYaoType = (position: number): '阳' | '阴' => {
  if (!props.data.interHexagram) return '阳';

  // 互卦的爻象计算：取主卦的2、3、4爻作为下卦，3、4、5爻作为上卦
  const yaosDetail = props.data.yaosDetail;
  if (!yaosDetail || yaosDetail.length < 6) return '阳';

  // 互卦爻位对应关系：
  // 互卦初爻 = 主卦二爻, 互卦二爻 = 主卦三爻, 互卦三爻 = 主卦四爻
  // 互卦四爻 = 主卦三爻, 互卦五爻 = 主卦四爻, 互卦上爻 = 主卦五爻
  const interYaoMapping = [2, 3, 4, 3, 4, 5]; // 互卦各爻对应主卦的爻位
  const mainYaoIndex = interYaoMapping[position - 1] - 1;

  return yaosDetail[mainYaoIndex]?.yaoType || '阳';
};

// 获取互卦八卦信息
const getInterTrigramInfo = (position: number) => {
  if (!props.data.interHexagram) return '';

  // 根据爻位确定属于上卦还是下卦
  if (position <= 3) {
    return props.data.interHexagram.lower;
  } else {
    return props.data.interHexagram.upper;
  }
};

// 获取变卦八卦信息
const getChangedTrigramInfo = (position: number) => {
  if (!props.data.changedHexagram) return '';

  // 根据爻位确定属于上卦还是下卦
  if (position <= 3) {
    return props.data.changedHexagram.lower;
  } else {
    return props.data.changedHexagram.upper;
  }
};
</script>

<style scoped>
@import '@/styles/components/results.css';

.inter-info {
  color: var(--color-primary);
  font-size: 0.9em;
  margin-left: var(--spacing-1);
}

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
  text-align: left;
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
  flex-shrink: 0;
  font-size: 16px;
}

.trigram-info {
  width: 40px;
  color: var(--color-text-primary);
  flex-shrink: 0;
  font-size: 16px;
  text-align: left;
}

.inter-trigram-info {
  width: 40px;
  color: var(--color-text-secondary);
  flex-shrink: 0;
  font-size: 16px;
  text-align: center;
}

.changed-trigram-info {
  width: 40px;
  color: var(--color-text-primary);
  flex-shrink: 0;
  font-size: 16px;
  text-align: center;
}

/* 起卦数据 */
.calculation-section {
  margin-top: var(--spacing-3);
  padding-top: var(--spacing-2);
  border-top: 1px solid var(--color-border-light);
}

.calculation-title {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-1);
  font-size: var(--font-size-xs);
}

.calculation-details {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-1);
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.calculation-details span {
  white-space: nowrap;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-hexagram {
    min-width: 140px;
  }

  .inter-hexagram {
    min-width: 90px;
  }

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

  .inter-trigram-info {
    width: 28px;
    font-size: 13px;
  }

  .changed-trigram-info {
    width: 28px;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .main-hexagram {
    min-width: 120px;
  }

  .inter-hexagram {
    min-width: 80px;
  }

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

  .inter-trigram-info {
    width: 22px;
    font-size: 12px;
  }

  .changed-trigram-info {
    width: 22px;
    font-size: 12px;
  }
}
</style>
