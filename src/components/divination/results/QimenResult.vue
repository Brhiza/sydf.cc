<template>
  <div class="qimen-result">
    <!-- 基本信息区块 -->
    <div class="basic-info">
      <div class="info-line">
        <span class="info-label">起卦时间：</span>
        <span class="info-value">{{ formatDateTime(data.timeInfo) }}</span>
      </div>
      <div class="info-line">
        <span class="info-label">干支信息：</span>
        <span class="info-value">{{ formatGanZhi(data.ganzhi) }}</span>
      </div>
      <div class="info-line">
        <span class="info-label">遁甲局数：</span>
        <span class="info-value">{{ data.isYangDun ? '阳遁' : '阴遁' }}{{ data.juShu }}局</span>
      </div>
      <div class="info-line">
        <span class="info-label">值符值使：</span>
        <span class="info-value">{{ data.zhiFu }} {{ data.zhiShi }}</span>
      </div>
      <!-- 特殊时辰情况 -->
      <div v-if="data.specialConditions && data.specialConditions.description">
        <div class="info-line">
          <span class="info-label">特殊时辰：</span>
          <span class="info-value">{{ data.specialConditions.description }}</span>
        </div>
      </div>
    </div>

    <!-- 九宫格排盘区块 -->
    <div class="paipan-section">
      <div class="jiugong-container">
        <div class="jiugong-grid">
          <div
            v-for="(gong, index) in arrangedGongs"
            :key="index"
            class="gong-cell"
            :class="getGongClass(index)"
          >
            <div class="gong-header">
              <span class="gong-name">{{ gong.name }}</span>
              <span class="gong-direction">{{ gong.direction }}</span>
            </div>
            <div class="gong-content">
              <!-- 天盘 -->
              <div class="tian-pan">
                <span class="star">{{ gong.tianPan.star }}</span>
                <span class="stem">{{ gong.tianPan.stem }}</span>
              </div>
              <!-- 人盘 -->
              <div v-if="!gong.name.includes('中五宫')" class="ren-pan">
                <span class="door">{{ gong.renPan.door }}</span>
              </div>
              <!-- 地盘 -->
              <div class="di-pan">
                <span class="stem">{{ gong.diPan.stem }}</span>
              </div>
              <!-- 神盘 -->
              <div v-if="!gong.name.includes('中五宫')" class="shen-pan">
                <span class="god">{{ gong.shenPan.god }}</span>
              </div>
              <!-- 中宫标识 -->
              <div v-if="gong.name.includes('中五宫')" class="zhong-gong">
                <span class="zhong-text">中宫</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { QimenData } from '@/types/divination';
import { formatDateTime, formatGanZhi } from '@/utils/date-formatter';

const props = defineProps<{
  data: QimenData;
}>();

// 按九宫格顺序排列宫位（4 9 2 / 3 5 7 / 8 1 6）
const arrangedGongs = computed(() => {
  if (!props.data.jiuGongGe) return [];

  const gongs = props.data.jiuGongGe;
  const order = [3, 8, 1, 2, 4, 6, 7, 0, 5]; // 对应九宫格位置

  return order.map((index) => gongs[index]).filter(Boolean);
});

// 获取宫位样式类
function getGongClass(index: number) {
  const positions = [
    'top-left',
    'top-center',
    'top-right',
    'middle-left',
    'middle-center',
    'middle-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
  ];
  return positions[index] || '';
}
</script>

<style scoped>
.qimen-result {
  margin-bottom: var(--spacing-8); /* 增加更多底部外间距，避免与容器贴合 */
}

/* 基本信息区块 - 参考六爻样式 */
.basic-info {
  margin-bottom: var(--spacing-3);
}

.info-line {
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-1);
  justify-content: space-between;
  line-height: 1.4;
}

.info-line:last-child {
  margin-bottom: 0;
}

.info-label {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  width: 80px;
  text-align: justify;
  text-align-last: justify;
  flex-shrink: 0;
  font-size: 16px;
}

.info-value {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
  flex: 1;
  text-align: left;
  margin-left: var(--spacing-2);
  font-size: 16px;
}


/* 排盘信息区块 */
.paipan-section {
  margin-bottom: var(--spacing-4);
}

.jiugong-container {
  display: flex;
  justify-content: center;
  margin: var(--spacing-4) 0;
}

.jiugong-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 2px;
  width: 100%;
  max-width: 480px;
  aspect-ratio: 1;
  border: 2px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
}

.gong-cell {
  background: var(--color-background-soft);
  border: 1px solid var(--color-border-light);
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 120px;
  position: relative;
}

.gong-cell.middle-center {
  background: var(--color-background-mute);
  border: 2px solid var(--color-primary);
}

.gong-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  font-size: 12px;
}

.gong-name {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.gong-direction {
  color: var(--color-text-secondary);
  font-size: 10px;
}

.gong-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
}

.tian-pan,
.ren-pan,
.di-pan,
.shen-pan {
  margin: 2px 0;
  font-size: 13px;
  line-height: 1.2;
}

.tian-pan {
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
}

.ren-pan {
  color: var(--color-success);
  font-weight: var(--font-weight-medium);
}

.di-pan {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-bold);
}

.shen-pan {
  color: var(--color-warning);
  font-size: 11px;
}

.star,
.door,
.stem,
.god {
  display: inline-block;
  margin: 0 2px;
}

.zhong-gong {
  margin: 2px 0;
  font-size: 12px;
  color: var(--color-text-secondary);
  text-align: center;
}

.zhong-text {
  font-style: italic;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .jiugong-grid {
    max-width: 100%;
    gap: 1px;
  }

  .gong-cell {
    padding: 6px;
    min-height: 100px;
  }

  .gong-header {
    font-size: 11px;
  }

  .gong-direction {
    font-size: 9px;
  }

  .tian-pan,
  .ren-pan,
  .di-pan,
  .shen-pan {
    font-size: 12px;
  }

  .shen-pan {
    font-size: 10px;
  }

  .info-label {
    font-size: 15px;
  }

  .info-value {
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .gong-cell {
    padding: 4px;
    min-height: 80px;
  }

  .tian-pan,
  .ren-pan,
  .di-pan,
  .shen-pan {
    font-size: 11px;
  }

  .shen-pan {
    font-size: 9px;
  }
}
</style>
