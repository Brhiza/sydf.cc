<template>
  <div v-if="showExplanation && cards.length > 1" class="spread-explanation">
    <div class="explanation-header">
      <h4>牌阵解读说明</h4>
      <span>{{ cards.length }} 张牌</span>
    </div>
    <div class="explanation-grid">
      <div v-for="(card, index) in cards" :key="index" class="explanation-item">
        <span class="position-number">{{ index + 1 }}</span>
        <span class="position-name">{{ card.position }}</span>
        <span class="card-summary">
          {{ card.name }}
          <span v-if="card.reversed" class="summary-reversed">逆位</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TarotData } from '@/types/divination'

type TarotCardData = TarotData['cards'][0]

defineProps<{
  cards: TarotCardData[]
  showExplanation?: boolean
}>()
</script>

<style scoped>
.spread-explanation {
  margin-top: var(--spacing-2);
  padding-top: var(--spacing-3);
  border-top: 1px solid var(--color-border-light);
}

.explanation-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-2);
}

.explanation-header h4 {
  margin: 0;
  color: var(--color-text-primary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
}

.explanation-header span {
  flex: 0 0 auto;
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
}

.explanation-grid {
  display: grid;
  gap: 0 var(--spacing-4);
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}

.explanation-item {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: var(--spacing-2);
  min-width: 0;
  padding: var(--spacing-2) 0;
  border-bottom: 1px solid var(--color-border-light);
}

.explanation-item:nth-last-child(-n + 2) {
  border-bottom-color: transparent;
}

.position-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  background: var(--color-primary-muted);
  color: var(--color-primary);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
}

.position-name {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-summary {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-align: right;
  white-space: nowrap;
}

.summary-reversed {
  margin-left: var(--spacing-1);
  color: var(--color-danger);
  font-weight: var(--font-weight-semibold);
}

@media (max-width: 768px) {
  .explanation-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0 var(--spacing-3);
  }

  .explanation-item:nth-last-child(-n + 2) {
    border-bottom-color: var(--color-border-light);
  }

  .explanation-item:nth-last-child(-n + 1) {
    border-bottom-color: transparent;
  }
}

@media (max-width: 480px) {
  .explanation-header {
    align-items: center;
  }

  .explanation-item {
    grid-template-columns: auto minmax(0, 1fr);
    gap: var(--spacing-1);
    padding: var(--spacing-1) 0;
  }

  .position-number {
    width: 20px;
    height: 20px;
  }

  .position-name,
  .card-summary {
    font-size: var(--font-size-xs);
  }

  .card-summary {
    grid-column: 2;
    text-align: left;
  }
}
</style>
