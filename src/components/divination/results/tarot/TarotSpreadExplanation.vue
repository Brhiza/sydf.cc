<template>
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

@media (max-width: 768px) {
  .explanation-grid {
    grid-template-columns: 1fr;
  }
}
</style>
