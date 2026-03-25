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
  type?: 'tarot' | 'tarot_single';
  spreadType?: string;
  spreadName?: string;
  timestamp?: number;
  showExplanation?: boolean;
}>();
</script>

<style scoped>
.tarot-result {
  width: 100%;
}
</style>
