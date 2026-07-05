<template>
  <div class="tarot-card" :class="cardClass" :style="cardStyle">
    <div class="card-image">
      <img
        :src="`/static/tarot/${card.id}.jpg`"
        :alt="card.name"
        width="540"
        height="720"
        loading="lazy"
        decoding="async"
        :class="{ reversed: card.reversed }"
        @error="handleImageError"
      />
      <div class="card-position" :class="{ 'has-reversed': card.reversed }">{{ card.position }}</div>
      <div v-if="card.reversed" class="card-reversed">逆位</div>
    </div>
    <div class="card-info">
      <div class="card-heading">
        <h4 class="card-name">{{ card.name }}</h4>
        <span class="card-orientation" :class="{ reversed: card.reversed }">
          {{ card.reversed ? '逆位' : '正位' }}
        </span>
      </div>
      <p class="card-position-text">{{ card.position }}</p>
      <div v-if="card.keywords.length" class="card-keywords" aria-label="关键词">
        <span v-for="keyword in card.keywords" :key="keyword" class="keyword-chip">
          {{ keyword }}
        </span>
      </div>
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
  const img = event.currentTarget
  if (!(img instanceof HTMLImageElement)) {
    return
  }

  img.src = '/static/tarot/card-back.jpg'
}
</script>

<style scoped>
.tarot-card {
  width: 160px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: var(--spacing-2);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--color-primary) 3%, transparent), transparent),
    var(--color-background);
  box-shadow: var(--shadow-sm);
  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast),
    transform var(--transition-fast);
  position: relative;
}

.tarot-card:hover {
  transform: translateY(-4px);
  z-index: 10;
  border-color: color-mix(in srgb, var(--color-primary) 32%, var(--color-border));
  box-shadow: var(--shadow-md);
}

.card-image {
  position: relative;
  width: 100%;
  margin-bottom: var(--spacing-3);
}

.card-image img {
  width: 100%;
  height: auto;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-base);
  transition: transform 0.5s ease;
  display: block;
}

.card-image img.reversed {
  transform: rotate(180deg);
}

.card-position {
  position: absolute;
  top: 8px;
  left: 8px;
  max-width: calc(100% - 16px);
  background-color: color-mix(in srgb, var(--color-black) 68%, transparent);
  color: var(--color-white);
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-tight);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-position.has-reversed {
  max-width: calc(100% - 64px);
}

.card-reversed {
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: color-mix(in srgb, var(--color-danger) 88%, transparent);
  color: var(--color-white);
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
}

.card-info {
  display: grid;
  gap: var(--spacing-2);
  min-width: 0;
}

.card-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-2);
  min-width: 0;
}

.card-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
  line-height: var(--line-height-tight);
  min-width: 0;
  overflow-wrap: anywhere;
}

.card-orientation {
  flex: 0 0 auto;
  padding: 2px var(--spacing-2);
  border-radius: var(--radius-full);
  background: var(--color-primary-muted);
  color: var(--color-primary);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
}

.card-orientation.reversed {
  background: color-mix(in srgb, var(--color-danger) 12%, transparent);
  color: var(--color-danger);
}

.card-position-text {
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-tight);
}

.card-keywords {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-1);
  margin: 0;
}

.keyword-chip {
  padding: 2px var(--spacing-2);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-full);
  background: var(--color-background-soft);
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs);
  line-height: var(--line-height-tight);
}

@media (max-width: 480px) {
  .tarot-card {
    padding: var(--spacing-1);
  }

  .card-image {
    margin-bottom: var(--spacing-2);
  }

  .card-info {
    gap: var(--spacing-1);
  }

  .card-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: var(--spacing-1);
  }

  .card-name {
    font-size: var(--font-size-sm);
  }

  .card-position-text,
  .card-keywords {
    display: none;
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
