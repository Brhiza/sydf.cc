<template>
  <div class="tarot-card" :class="cardClass" :style="cardStyle">
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
</template>

<script setup lang="ts">
import type { TarotData } from '@/types/divination'

type TarotCardData = TarotData['cards'][0]

defineProps<{
  card: TarotCardData
  cardClass?: string
  cardStyle?: Record<string, string | number>
}>()

function handleImageError(event: Event) {
  const img = event.target as HTMLImageElement
  img.src = '/static/tarot/card-back.jpg'
}
</script>

<style scoped>
.tarot-card {
  width: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s ease;
  position: relative;
}

.tarot-card:hover {
  transform: translateY(-4px);
  z-index: 10;
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

@media (max-width: 480px) {
  .card-name {
    font-size: var(--font-size-sm);
  }

  .card-keywords {
    font-size: var(--font-size-xs);
  }

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
