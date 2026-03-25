<template>
  <div class="cards-layout" :class="[layoutClass, layoutModeClass]" :style="layoutStyleVars">
    <TarotCardItem
      v-for="(card, index) in cards"
      :key="index"
      :card="card"
      :card-class="getTarotCardClass(spreadType, index)"
      :card-style="getTarotCardStyle(spreadType, index)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  getTarotCardClass,
  getTarotCardStyle,
  getTarotLayoutClass,
  getTarotLayoutModeClass,
  getTarotLayoutStyleVars,
} from './tarot-layout';
import type { TarotCardData } from './tarot-result';
import TarotCardItem from './TarotCardItem.vue';

interface Props {
  cards: TarotCardData[];
  spreadType?: string;
}

const props = defineProps<Props>();

const layoutClass = computed(() => getTarotLayoutClass(props.cards.length, props.spreadType));
const layoutModeClass = computed(() => getTarotLayoutModeClass(props.cards.length, props.spreadType));
const layoutStyleVars = computed(() => getTarotLayoutStyleVars(props.cards.length, props.spreadType));
</script>

<style scoped>
.cards-layout {
  --tarot-layout-max-width: 100%;
  --tarot-layout-gap: 0px;
  --tarot-layout-padding: 0px;
  --tarot-layout-background: transparent;
  --tarot-layout-card-width: 160px;
  --tarot-layout-card-max-width: 160px;
  --tarot-layout-grid-columns: none;
  --tarot-layout-grid-rows: auto;
  --tarot-layout-aspect-ratio: auto;
  --tarot-layout-flex-direction: row;
  --tarot-layout-flex-wrap: wrap;
  --tarot-layout-justify-content: center;
  --tarot-layout-align-items: stretch;
  --tarot-layout-desktop-max-width: var(--tarot-layout-max-width);
  --tarot-layout-desktop-gap: var(--tarot-layout-gap);
  --tarot-layout-desktop-padding: var(--tarot-layout-padding);
  --tarot-layout-desktop-card-width: var(--tarot-layout-card-width);
  --tarot-layout-desktop-card-max-width: var(--tarot-layout-card-max-width);
  --tarot-layout-desktop-flex-direction: var(--tarot-layout-flex-direction);
  --tarot-layout-desktop-justify-content: var(--tarot-layout-justify-content);
  --tarot-layout-desktop-align-items: var(--tarot-layout-align-items);
  --tarot-layout-tablet-max-width: var(--tarot-layout-max-width);
  --tarot-layout-tablet-gap: var(--tarot-layout-gap);
  --tarot-layout-tablet-padding: var(--tarot-layout-padding);
  --tarot-layout-tablet-card-width: var(--tarot-layout-card-width);
  --tarot-layout-tablet-card-max-width: var(--tarot-layout-card-max-width);
  --tarot-layout-tablet-flex-direction: var(--tarot-layout-flex-direction);
  --tarot-layout-tablet-justify-content: var(--tarot-layout-justify-content);
  --tarot-layout-tablet-align-items: var(--tarot-layout-align-items);
  --tarot-layout-mobile-max-width: var(--tarot-layout-max-width);
  --tarot-layout-mobile-gap: var(--tarot-layout-gap);
  --tarot-layout-mobile-padding: var(--tarot-layout-padding);
  --tarot-layout-mobile-card-width: var(--tarot-layout-card-width);
  --tarot-layout-mobile-card-max-width: var(--tarot-layout-card-max-width);
  --tarot-layout-mobile-flex-direction: var(--tarot-layout-flex-direction);
  --tarot-layout-mobile-justify-content: var(--tarot-layout-justify-content);
  --tarot-layout-mobile-align-items: var(--tarot-layout-align-items);
  --tarot-layout-compact-max-width: var(--tarot-layout-mobile-max-width);
  --tarot-layout-compact-gap: var(--tarot-layout-mobile-gap);
  --tarot-layout-compact-padding: var(--tarot-layout-mobile-padding);
  --tarot-layout-compact-card-width: var(--tarot-layout-mobile-card-width);
  --tarot-layout-compact-card-max-width: var(--tarot-layout-mobile-card-max-width);
  --tarot-layout-compact-flex-direction: var(--tarot-layout-mobile-flex-direction);
  --tarot-layout-compact-justify-content: var(--tarot-layout-mobile-justify-content);
  --tarot-layout-compact-align-items: var(--tarot-layout-mobile-align-items);
  --tarot-current-max-width: var(--tarot-layout-max-width);
  --tarot-current-gap: var(--tarot-layout-gap);
  --tarot-current-padding: var(--tarot-layout-padding);
  --tarot-current-card-width: var(--tarot-layout-card-width);
  --tarot-current-card-max-width: var(--tarot-layout-card-max-width);
  --tarot-current-flex-direction: var(--tarot-layout-flex-direction);
  --tarot-current-justify-content: var(--tarot-layout-justify-content);
  --tarot-current-align-items: var(--tarot-layout-align-items);
  margin: var(--spacing-6) auto;
  width: 100%;
  box-sizing: border-box;
  max-width: var(--tarot-current-max-width);
  gap: var(--tarot-current-gap);
  padding: var(--tarot-current-padding);
  background: var(--tarot-layout-background);
  border-radius: var(--radius-lg);
  aspect-ratio: var(--tarot-layout-aspect-ratio);
}

.layout-mode-flex {
  display: flex;
  flex-wrap: var(--tarot-layout-flex-wrap);
  justify-content: var(--tarot-current-justify-content);
  align-items: var(--tarot-current-align-items);
  flex-direction: var(--tarot-current-flex-direction);
}

.layout-mode-grid {
  display: grid;
  grid-template-columns: var(--tarot-layout-grid-columns);
  grid-template-rows: var(--tarot-layout-grid-rows);
  justify-items: center;
}

.cards-layout .tarot-card {
  width: var(--tarot-current-card-width);
  max-width: var(--tarot-current-card-max-width);
}

.celtic-position-1 {
  z-index: 2;
}

@media (min-width: 1200px) {
  .cards-layout {
    --tarot-current-max-width: var(--tarot-layout-desktop-max-width);
    --tarot-current-gap: var(--tarot-layout-desktop-gap);
    --tarot-current-padding: var(--tarot-layout-desktop-padding);
    --tarot-current-card-width: var(--tarot-layout-desktop-card-width);
    --tarot-current-card-max-width: var(--tarot-layout-desktop-card-max-width);
    --tarot-current-flex-direction: var(--tarot-layout-desktop-flex-direction);
    --tarot-current-justify-content: var(--tarot-layout-desktop-justify-content);
    --tarot-current-align-items: var(--tarot-layout-desktop-align-items);
  }
}

@media (min-width: 769px) and (max-width: 1199px) {
  .cards-layout {
    --tarot-current-max-width: var(--tarot-layout-tablet-max-width);
    --tarot-current-gap: var(--tarot-layout-tablet-gap);
    --tarot-current-padding: var(--tarot-layout-tablet-padding);
    --tarot-current-card-width: var(--tarot-layout-tablet-card-width);
    --tarot-current-card-max-width: var(--tarot-layout-tablet-card-max-width);
    --tarot-current-flex-direction: var(--tarot-layout-tablet-flex-direction);
    --tarot-current-justify-content: var(--tarot-layout-tablet-justify-content);
    --tarot-current-align-items: var(--tarot-layout-tablet-align-items);
  }
}

@media (max-width: 768px) {
  .cards-layout {
    --tarot-current-max-width: var(--tarot-layout-mobile-max-width);
    --tarot-current-gap: var(--tarot-layout-mobile-gap);
    --tarot-current-padding: var(--tarot-layout-mobile-padding);
    --tarot-current-card-width: var(--tarot-layout-mobile-card-width);
    --tarot-current-card-max-width: var(--tarot-layout-mobile-card-max-width);
    --tarot-current-flex-direction: var(--tarot-layout-mobile-flex-direction);
    --tarot-current-justify-content: var(--tarot-layout-mobile-justify-content);
    --tarot-current-align-items: var(--tarot-layout-mobile-align-items);
  }
}

@media (max-width: 480px) {
  .cards-layout {
    --tarot-current-max-width: var(--tarot-layout-compact-max-width);
    --tarot-current-gap: var(--tarot-layout-compact-gap);
    --tarot-current-padding: var(--tarot-layout-compact-padding);
    --tarot-current-card-width: var(--tarot-layout-compact-card-width);
    --tarot-current-card-max-width: var(--tarot-layout-compact-card-max-width);
    --tarot-current-flex-direction: var(--tarot-layout-compact-flex-direction);
    --tarot-current-justify-content: var(--tarot-layout-compact-justify-content);
    --tarot-current-align-items: var(--tarot-layout-compact-align-items);
  }
}
</style>
