<template>
  <BaseResultLayout class="tarot-result">
    <TarotSpreadHeader
      :spread-name="spreadName"
      :card-count="cards.length"
      :timestamp="timestamp"
    />
    <TarotCardsLayout
      :cards="cards"
      :spread-type="spreadType"
    />
    <TarotSpreadExplanation :cards="cards" :show-explanation="showExplanation" />
  </BaseResultLayout>
</template>

<script setup lang="ts">
import type { TarotCardData } from './tarot/tarot-result';
import BaseResultLayout from './BaseResultLayout.vue';
import TarotCardsLayout from './tarot/TarotCardsLayout.vue';
import TarotSpreadExplanation from './tarot/TarotSpreadExplanation.vue';
import TarotSpreadHeader from './tarot/TarotSpreadHeader.vue';

const props = defineProps<{
  cards: TarotCardData[];
  spreadType?: string;
  spreadName?: string;
  timestamp?: number;
  showExplanation?: boolean;
}>();
</script>

<style scoped>
.tarot-result {
  width: 100%;
  gap: var(--spacing-2);
}

.tarot-result :deep(.result-header) {
  padding-bottom: var(--spacing-2);
}

.tarot-result :deep(.result-header-grid) {
  gap: var(--spacing-2);
}

.tarot-result :deep(.info-line) {
  line-height: 1.35;
}

.tarot-result :deep(.cards-layout) {
  margin: var(--spacing-2) auto var(--spacing-3);
}

.tarot-result :deep(.spread-explanation) {
  margin-top: var(--spacing-2);
}

@media (max-width: 768px) {
  .tarot-result {
    gap: var(--spacing-2);
  }

  .tarot-result :deep(.result-header-grid) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: var(--spacing-1) var(--spacing-2);
  }

  .tarot-result :deep(.info-line) {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .tarot-result :deep(.info-label) {
    font-size: var(--font-size-xs);
  }

  .tarot-result :deep(.info-value) {
    font-size: var(--font-size-sm);
  }
}
</style>
