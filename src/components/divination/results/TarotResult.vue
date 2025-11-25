<template>
  <div class="tarot-result">
    <!-- 牌阵标题（如果有） -->
    <div v-if="spreadName" class="spread-header">
      <h3 class="spread-title">{{ spreadName }}</h3>
      <p class="spread-info">{{ cards.length }}张牌 · {{ timestamp ? formatTimestamp(timestamp) : '' }}</p>
    </div>

    <!-- 卡牌布局 -->
    <div class="cards-layout" :class="layoutClass">
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="tarot-card"
        :class="getCardClass(index)"
        :style="getCardStyle(index)"
      >
        <div class="card-image">
          <img
            :src="`/static/tarot/${card.id}.jpg`"
            :alt="card.name"
            :class="{ reversed: card.reversed }"
            @error="handleImageError"
          />
          <div class="card-position">{{ card.position }}</div>
          <div v-if="card.reversed" class="card-reversed">逆位</div>
        </div>
        <div class="card-info">
          <h4 class="card-name">{{ card.name }}</h4>
          <p class="card-keywords">{{ card.keywords }}</p>
        </div>
      </div>
    </div>

    <!-- 牌阵说明 -->
    <div v-if="showExplanation && cards.length > 1" class="spread-explanation">
      <h4>牌阵解读说明</h4>
      <div class="explanation-grid">
        <div v-for="(card, index) in cards" :key="index" class="explanation-item">
          <span class="position-number">{{ index + 1 }}</span>
          <span class="position-name">{{ card.position }}</span>
          <span class="card-summary">{{ card.name }}{{ card.reversed ? '(逆位)' : '' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { TarotData } from '@/types/divination';
import { formatTimestamp } from '@/utils/date-formatter';

// 从 TarotData 中提取卡片数据的类型
type TarotCardData = TarotData['cards'][0];

const props = defineProps<{
  cards: TarotCardData[];
  type?: 'tarot' | 'tarot_single';
  spreadType?: string;
  spreadName?: string;
  timestamp?: number;
  showExplanation?: boolean;
}>();

// 计算布局类名
const layoutClass = computed(() => {
  const cardCount = props.cards.length;
  const spreadType = props.spreadType;

  // 根据具体牌阵类型返回专门的布局
  switch (spreadType) {
    case 'single':
      return 'layout-single';
    case 'three':
      return 'layout-three';
    case 'love':
      return 'layout-love';
    case 'career':
      return 'layout-career';
    case 'decision':
      return 'layout-decision';
    case 'celtic':
      return 'layout-celtic';
    case 'chakra':
      return 'layout-chakra';
    case 'year':
      return 'layout-year';
    case 'mindBodySpirit':
      return 'layout-mind-body-spirit';
    case 'horseshoe':
      return 'layout-horseshoe';
    default:
      // 根据卡牌数量决定默认布局
      if (cardCount === 1) return 'layout-single';
      if (cardCount === 3) return 'layout-three';
      if (cardCount <= 6) return 'layout-grid';
      if (cardCount <= 10) return 'layout-complex';
      return 'layout-large-complex';
  }
});

// 获取卡牌样式类
function getCardClass(index: number) {
  const spreadType = props.spreadType;
  if (spreadType === 'celtic') {
    return `celtic-position-${index}`;
  }
  return '';
}

// 获取卡牌样式
function getCardStyle(index: number) {
  const spreadType = props.spreadType;

  switch (spreadType) {
    case 'celtic': {
      // 凯尔特十字特殊布局
      const celticPositions = [
        { gridArea: '2 / 2' }, // 当前状况 (中心)
        { gridArea: '2 / 2', transform: 'rotate(90deg)', zIndex: 2 }, // 挑战/阻碍 (横放在中心)
        { gridArea: '3 / 2' }, // 遥远过去 (下)
        { gridArea: '1 / 2' }, // 近期过去 (上)
        { gridArea: '2 / 1' }, // 可能未来 (左)
        { gridArea: '2 / 3' }, // 近期未来 (右)
        { gridArea: '1 / 4' }, // 你的态度
        { gridArea: '2 / 4' }, // 外界影响
        { gridArea: '3 / 4' }, // 内心恐惧
        { gridArea: '4 / 4' }, // 最终结果
      ];
      return celticPositions[index] || {};
    }
    case 'love': {
      // 爱情牌阵：心形布局
      const lovePositions = [
        { gridArea: '2 / 2' }, // 你的内心 (中心左)
        { gridArea: '2 / 3' }, // 对方的内心 (中心右)
        { gridArea: '1 / 2 / 1 / 4' }, // 关系现状 (顶部横跨)
        { gridArea: '3 / 1' }, // 发展建议 (左下)
        { gridArea: '3 / 4' }, // 未来走向 (右下)
      ];
      return lovePositions[index] || {};
    }
    case 'decision': {
      // 选择牌阵：对称布局
      const decisionPositions = [
        { gridArea: '2 / 2' }, // 现状 (中心)
        { gridArea: '1 / 1' }, // 选择A (左上)
        { gridArea: '3 / 1' }, // 选择A结果 (左下)
        { gridArea: '1 / 3' }, // 选择B (右上)
        { gridArea: '3 / 3' }, // 选择B结果 (右下)
        { gridArea: '4 / 2' }, // 最佳建议 (底部中心)
      ];
      return decisionPositions[index] || {};
    }

    case 'chakra':
      // 七脉轮：垂直排列，从下到上
      return {
        order: 7 - index, // 反向排序，从海底轮到顶轮
      };
    
    case 'horseshoe': {
      // 马蹄铁牌阵：经典的马蹄形布局
      const horseshoePositions = [
        { gridArea: '3 / 1' }, // 过去的影响
        { gridArea: '2 / 1' }, // 现在的状况
        { gridArea: '1 / 1' }, // 未来的发展
        { gridArea: '1 / 2' }, // 给你的建议
        { gridArea: '1 / 3' }, // 环境的影响
        { gridArea: '2 / 3' }, // 你的希望与恐惧
        { gridArea: '3 / 3' }, // 最终的结果
      ];
      return horseshoePositions[index] || {};
    }

    default:
      return {};
  }
}

// 处理图片加载错误
function handleImageError(event: Event) {
  const img = event.target as HTMLImageElement;
  img.src = '/static/tarot/card-back.jpg'; // 使用默认卡背
}
</script>

<style scoped>
.tarot-result {
  width: 100%;
  margin-bottom: var(--spacing-6); /* 增加底部间距 */
}

.spread-header {
  text-align: center;
  margin-bottom: var(--spacing-6);
}

.spread-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-1);
}

.spread-info {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.cards-layout {
  margin: var(--spacing-6) 0;
}

/* 单牌布局 */
.layout-single {
  display: flex;
  justify-content: center;
}

.layout-single .tarot-card {
  width: min(250px, calc(50vw - 40px));
  max-width: 250px;
}

/* 三牌布局 */
.layout-three {
  display: flex;
  justify-content: center;
  gap: var(--spacing-4);
  flex-wrap: wrap;
}

.layout-three .tarot-card {
  width: min(200px, calc((100vw - 120px) / 3 - var(--spacing-4)));
  max-width: 200px;
}

/* 爱情牌阵布局 */
.layout-love {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, auto);
  gap: var(--spacing-3);
  width: 100%;
  max-width: min(80vw, 600px);
  margin: 0 auto;
  justify-items: center;
  box-sizing: border-box;
  padding: 0 var(--spacing-2);
}

.layout-love .tarot-card {
  width: min(150px, calc((100vw - 120px) / 4 - var(--spacing-3)));
  max-width: 150px;
}

/* 事业牌阵布局 */
.layout-career {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: var(--spacing-3);
  width: 100%;
  max-width: min(70vw, 580px);
  margin: 0 auto;
  justify-items: center;
  box-sizing: border-box;
  padding: 0 var(--spacing-2);
}

.layout-career .tarot-card {
  width: min(170px, calc((100vw - 120px) / 3 - var(--spacing-3)));
  max-width: 170px;
}

/* 选择牌阵布局 */
.layout-decision {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, auto);
  gap: var(--spacing-3);
  width: 100%;
  max-width: min(60vw, 550px);
  margin: 0 auto;
  justify-items: center;
  box-sizing: border-box;
  padding: 0 var(--spacing-2);
}

.layout-decision .tarot-card {
  width: min(160px, calc((100vw - 120px) / 3 - var(--spacing-3)));
  max-width: 160px;
}

/* 凯尔特十字布局 */
.layout-celtic {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: var(--spacing-2);
  width: 100%;
  max-width: min(70vw, 700px);
  margin: 0 auto;
  aspect-ratio: 4/4;
  box-sizing: border-box;
  padding: 0 var(--spacing-2);
}

.layout-celtic .tarot-card {
  width: min(140px, calc((100vw - 120px) / 4 - var(--spacing-2)));
  max-width: 140px;
}

/* 脉轮布局 */
.layout-chakra {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-3);
  width: 100%;
  max-width: min(25vw, 250px);
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 var(--spacing-2);
}

.layout-chakra .tarot-card {
  width: min(180px, calc(100vw - 160px));
  max-width: 180px;
}

/* 年运布局 */
.layout-year {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: var(--spacing-2);
  justify-items: center;
  width: 100%;
  max-width: min(90vw, 1000px);
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 var(--spacing-2);
}

.layout-year .tarot-card {
  width: min(130px, calc((100vw - 120px) / 6 - var(--spacing-2)));
  max-width: 130px;
}

/* 身心灵牌阵布局 */
.layout-mind-body-spirit {
  display: flex;
  justify-content: center;
  gap: var(--spacing-4);
  flex-wrap: wrap;
}

.layout-mind-body-spirit .tarot-card {
  width: min(200px, calc((100vw - 120px) / 3 - var(--spacing-4)));
  max-width: 200px;
}

/* 马蹄铁牌阵布局 */
.layout-horseshoe {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, auto);
  gap: var(--spacing-3);
  width: 100%;
  max-width: min(70vw, 600px);
  margin: 0 auto;
  justify-items: center;
  box-sizing: border-box;
  padding: 0 var(--spacing-2);
}

.layout-horseshoe .tarot-card {
  width: min(160px, calc((100vw - 120px) / 3 - var(--spacing-3)));
  max-width: 160px;
}

/* 网格布局 */
.layout-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--spacing-4);
  justify-items: center;
  width: 100%;
  max-width: min(80vw, 800px);
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 var(--spacing-2);
}

.layout-grid .tarot-card {
  width: min(170px, calc((100vw - 120px) / 3 - var(--spacing-4)));
  max-width: 170px;
}

/* 复杂布局 */
.layout-complex {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: var(--spacing-3);
  justify-items: center;
  width: 100%;
  max-width: min(85vw, 900px);
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 var(--spacing-2);
}

.layout-complex .tarot-card {
  width: min(150px, calc((100vw - 120px) / 4 - var(--spacing-3)));
  max-width: 150px;
}

/* 大型复杂布局 */
.layout-large-complex {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  gap: var(--spacing-2);
  justify-items: center;
  width: 100%;
  max-width: min(95vw, 1200px);
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 var(--spacing-2);
}

.layout-large-complex .tarot-card {
  width: min(130px, calc((100vw - 120px) / 6 - var(--spacing-2)));
  max-width: 130px;
}

.tarot-card {
  /* 默认宽度，会被具体布局覆盖 */
  width: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s ease;
  position: relative;
}

.tarot-card:hover {
  transform: translateY(-4px);
  z-index: 10; /* 悬停时提升层级 */
}

.card-image {
  position: relative;
  width: 100%;
  margin-bottom: var(--spacing-2);
}

.card-image img {
  width: 100%;
  height: auto;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  transition: transform 0.5s ease;
}

.card-image img.reversed {
  transform: rotate(180deg);
}

.card-position {
  position: absolute;
  top: 8px;
  left: 8px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 2px 8px;
  border-radius: var(--radius-base);
  font-size: var(--font-size-xs);
}

.card-reversed {
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: rgba(220, 53, 69, 0.8);
  color: white;
  padding: 2px 8px;
  border-radius: var(--radius-base);
  font-size: var(--font-size-xs);
}

.card-info {
  text-align: center;
}

.card-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  margin: 0 0 var(--spacing-1);
}

.card-keywords {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
}

/* 牌阵说明样式 */
.spread-explanation {
  background: var(--color-background-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-4);
  margin-top: var(--spacing-6);
}

.spread-explanation h4 {
  margin: 0 0 var(--spacing-3);
  color: var(--color-text-primary);
  font-size: var(--font-size-lg);
}

.explanation-grid {
  display: grid;
  gap: var(--spacing-2);
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.explanation-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2);
  background: var(--color-background-muted);
  border-radius: var(--radius-base);
  border: 1px solid var(--color-border);
}

.position-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: var(--color-primary);
  color: white;
  border-radius: 50%;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  flex-shrink: 0;
}

.position-name {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  flex: 1;
}

.card-summary {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

/* 特殊牌阵视觉效果 */

/* 凯尔特十字特殊样式 */
.celtic-position-1 {
  z-index: 2;
}

/* 单牌布局特殊效果 */
.layout-single {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(240, 240, 240, 0.1));
  border-radius: var(--radius-lg);
  padding: var(--spacing-6) var(--spacing-4);
}

/* 三牌布局特殊效果 */
.layout-three {
  background: linear-gradient(135deg, rgba(135, 206, 235, 0.1), rgba(173, 216, 230, 0.1));
  border-radius: var(--radius-lg);
  padding: var(--spacing-6) var(--spacing-4);
}

/* 爱情牌阵特殊效果 */
.layout-love {
  background: linear-gradient(135deg, rgba(255, 182, 193, 0.1), rgba(255, 105, 180, 0.1));
  border-radius: var(--radius-lg);
  padding: var(--spacing-6) var(--spacing-4);
}

/* 事业牌阵特殊效果 */
.layout-career {
  background: linear-gradient(135deg, rgba(70, 130, 180, 0.1), rgba(100, 149, 237, 0.1));
  border-radius: var(--radius-lg);
  padding: var(--spacing-6) var(--spacing-4);
}

/* 选择牌阵特殊效果 */
.layout-decision {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 165, 0, 0.1));
  border-radius: var(--radius-lg);
  padding: var(--spacing-6) var(--spacing-4);
}

/* 凯尔特十字特殊效果 */
.layout-celtic {
  background: linear-gradient(135deg, rgba(138, 43, 226, 0.1), rgba(75, 0, 130, 0.1));
  border-radius: var(--radius-lg);
  padding: var(--spacing-6) var(--spacing-4);
}

/* 脉轮牌阵特殊效果 */
.layout-chakra {
  background: linear-gradient(
    180deg,
    rgba(255, 0, 0, 0.1) 0%,
    /* 海底轮 - 红色 */ rgba(255, 165, 0, 0.1) 16%,
    /* 脐轮 - 橙色 */ rgba(255, 255, 0, 0.1) 32%,
    /* 太阳轮 - 黄色 */ rgba(0, 128, 0, 0.1) 48%,
    /* 心轮 - 绿色 */ rgba(0, 191, 255, 0.1) 64%,
    /* 喉轮 - 蓝色 */ rgba(75, 0, 130, 0.1) 80%,
    /* 眉心轮 - 靛色 */ rgba(148, 0, 211, 0.1) 100% /* 顶轮 - 紫色 */
  );
  border-radius: var(--radius-lg);
  padding: var(--spacing-6) var(--spacing-4);
}

/* 年运牌阵特殊效果 */
.layout-year {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 140, 0, 0.1));
  border-radius: var(--radius-lg);
  padding: var(--spacing-6) var(--spacing-4);
}

/* 网格布局特殊效果 */
.layout-grid {
  background: linear-gradient(135deg, rgba(128, 128, 128, 0.1), rgba(169, 169, 169, 0.1));
  border-radius: var(--radius-lg);
  padding: var(--spacing-6) var(--spacing-4);
}

/* 复杂布局特殊效果 */
.layout-complex {
  background: linear-gradient(135deg, rgba(255, 99, 71, 0.1), rgba(255, 69, 0, 0.1));
  border-radius: var(--radius-lg);
  padding: var(--spacing-6) var(--spacing-4);
}

/* 大型复杂布局特殊效果 */
.layout-large-complex {
  background: linear-gradient(135deg, rgba(72, 61, 139, 0.1), rgba(106, 90, 205, 0.1));
  border-radius: var(--radius-lg);
  padding: var(--spacing-6) var(--spacing-4);
}

/* 大屏幕优化 */
@media (min-width: 1200px) {
  .layout-love {
    max-width: min(70vw, 700px);
  }

  .layout-career {
    max-width: min(60vw, 650px);
  }

  .layout-decision {
    max-width: min(50vw, 600px);
  }

  .layout-celtic {
    max-width: min(60vw, 800px);
  }

  .layout-chakra {
    max-width: min(20vw, 300px);
  }

  .layout-year {
    max-width: min(85vw, 1200px);
  }

  .layout-grid {
    max-width: min(75vw, 900px);
  }

  .layout-complex {
    max-width: min(80vw, 1000px);
  }

  .layout-large-complex {
    max-width: min(90vw, 1400px);
  }
}

/* 中等屏幕优化 */
@media (min-width: 769px) and (max-width: 1199px) {
  .layout-single .tarot-card {
    width: min(220px, calc(40vw - 40px));
  }

  .layout-three .tarot-card {
    width: min(180px, calc((100vw - 120px) / 3 - var(--spacing-4)));
  }

  .layout-love {
    max-width: min(75vw, 550px);
  }

  .layout-career {
    max-width: min(65vw, 520px);
  }

  .layout-decision {
    max-width: min(55vw, 500px);
  }

  .layout-celtic {
    max-width: min(65vw, 650px);
  }

  .layout-chakra {
    max-width: min(22vw, 220px);
  }

  .layout-year {
    max-width: min(88vw, 900px);
  }

  .layout-grid {
    max-width: min(78vw, 750px);
  }

  .layout-complex {
    max-width: min(83vw, 850px);
  }

  .layout-large-complex {
    max-width: min(92vw, 1100px);
  }
}

@media (max-width: 768px) {
  /* 平板端适配 */
  .layout-single .tarot-card {
    width: 160px;
  }
  .layout-three .tarot-card {
    width: 130px;
  }

  .layout-love {
    max-width: 400px;
    padding: var(--spacing-4) var(--spacing-3);
  }

  .layout-career {
    max-width: 380px;
    padding: var(--spacing-4) var(--spacing-3);
  }

  .layout-decision {
    max-width: 350px;
    padding: var(--spacing-4) var(--spacing-3);
  }

  .layout-decision .tarot-card {
    width: min(100px, calc((100vw - 100px) / 3 - var(--spacing-3)));
    max-width: 100px;
  }

  .layout-celtic {
    max-width: 400px;
    gap: var(--spacing-1);
    padding: var(--spacing-4) var(--spacing-3);
  }

  .layout-chakra {
    max-width: 180px;
    gap: var(--spacing-2);
    padding: var(--spacing-4) var(--spacing-3);
  }

  .layout-year {
    max-width: 600px;
    gap: var(--spacing-1);
    padding: var(--spacing-4) var(--spacing-3);
  }

  .layout-grid {
    max-width: 500px;
    gap: var(--spacing-2);
    padding: var(--spacing-4) var(--spacing-3);
  }

  .layout-complex {
    max-width: 600px;
    gap: var(--spacing-2);
    padding: var(--spacing-4) var(--spacing-3);
  }

  .layout-large-complex {
    max-width: 700px;
    gap: var(--spacing-1);
    padding: var(--spacing-4) var(--spacing-3);
  }

  .explanation-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  /* 手机端适配 */
  .layout-single .tarot-card {
    width: 140px;
  }
  .layout-three .tarot-card {
    width: 110px;
  }

  .card-name {
    font-size: var(--font-size-sm);
  }

  .card-keywords {
    font-size: var(--font-size-xs);
  }

  .layout-celtic {
    max-width: 100%;
    gap: var(--spacing-1);
    padding: var(--spacing-6) var(--spacing-4);
  }

  .layout-chakra {
    max-width: 100%;
    gap: var(--spacing-2);
    padding: var(--spacing-6) var(--spacing-4);
  }

  .layout-year {
    max-width: 100%;
    gap: var(--spacing-1);
    padding: var(--spacing-6) var(--spacing-4);
  }

  .layout-grid {
    max-width: 100%;
    gap: var(--spacing-2);
    padding: var(--spacing-6) var(--spacing-4);
  }

  .layout-complex {
    max-width: 100%;
    gap: var(--spacing-2);
    padding: var(--spacing-6) var(--spacing-4);
  }

  .layout-large-complex {
    max-width: 100%;
    gap: var(--spacing-1);
    padding: var(--spacing-6) var(--spacing-4);
  }

  .layout-three {
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-3);
  }

  .layout-love {
    max-width: 100%;
    gap: var(--spacing-2);
    padding: var(--spacing-6) var(--spacing-4);
  }

  .layout-career {
    max-width: 100%;
    gap: var(--spacing-2);
    padding: var(--spacing-6) var(--spacing-4);
  }

  .layout-decision {
    max-width: 100%;
    gap: var(--spacing-2);
    padding: var(--spacing-6) var(--spacing-4);
  }

  .layout-decision .tarot-card {
    width: min(80px, calc((100vw - 120px) / 3 - var(--spacing-2)));
    max-width: 80px;
  }

  /* 移动端标签位置调整，避免重叠 */
  .card-position {
    top: 4px;
    left: 4px;
    padding: 1px 4px;
    font-size: 10px;
  }

  .card-reversed {
    top: 4px;
    right: 4px;
    padding: 1px 4px;
    font-size: 10px;
  }
}
</style>
