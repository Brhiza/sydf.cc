<template>
  <div class="tarot-spread-selector">
    <div class="spread-selector-header">
      <div class="spread-selector-copy">
        <span class="spread-selector-label">牌阵</span>
      </div>

      <button
        v-if="canExpand"
        type="button"
        class="spread-toggle"
        :aria-expanded="showAllSpreads"
        @click="showAllSpreads = !showAllSpreads"
      >
        {{ showAllSpreads ? '收起' : '更多牌阵' }}
      </button>
    </div>

    <div class="spread-options" :class="{ expanded: showAllSpreads }">
      <button
        v-for="spread in displayedSpreads"
        :key="spread.key"
        type="button"
        class="spread-option"
        :class="{ active: selectedSpread === spread.key }"
        :aria-pressed="selectedSpread === spread.key"
        @click="selectSpread(spread.key)"
      >
        <span class="spread-option-main">
          <span class="spread-option-name">{{ spread.name }}</span>
          <span class="spread-option-count">{{ spread.cardCount }}张</span>
        </span>
        <span class="spread-option-description">{{ spread.description }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { TAROT_SPREADS, type TarotSpreadKey } from '@/shared/tarot-spreads';

interface SpreadOption {
  key: TarotSpreadKey;
  name: string;
  description: string;
  cardCount: number;
}

const SPREAD_SUMMARIES: Partial<Record<TarotSpreadKey, string>> = {
  single: '快速聚焦当下，适合简单提问。',
  three: '按时间脉络看过去、现在与趋势。',
  love: '分析关系状态、双方心意与发展建议。',
  career: '梳理职场处境、机会挑战和行动方向。',
  decision: '比较选择利弊，辅助做出判断。',
  celtic: '深度拆解复杂问题，覆盖多重影响。',
  chakra: '查看身心灵能量状态与平衡点。',
  year: '按年度视角观察整体运势走向。',
  mindBodySpirit: '检视思想、身体与精神状态。',
  horseshoe: '概览问题起因、建议与最终结果。',
};

const props = defineProps<{
  selectedSpread: string;
}>();

const emit = defineEmits<{
  (e: 'update:selectedSpread', value: string): void;
}>();

const showAllSpreads = ref(false);

const spreadOptions = computed<SpreadOption[]>(() =>
  (Object.keys(TAROT_SPREADS) as TarotSpreadKey[]).map((key) => ({
    key,
    name: TAROT_SPREADS[key].name,
    description: SPREAD_SUMMARIES[key] ?? TAROT_SPREADS[key].description,
    cardCount: TAROT_SPREADS[key].cardCount,
  }))
);

const selectedSpreadMeta = computed(() =>
  spreadOptions.value.find((spread) => spread.key === props.selectedSpread)
);

const compactSpreads = computed(() => {
  const visible = spreadOptions.value.slice(0, 4);

  if (!selectedSpreadMeta.value || visible.some((spread) => spread.key === selectedSpreadMeta.value?.key)) {
    return visible;
  }

  return [...visible.slice(0, 3), selectedSpreadMeta.value];
});

const displayedSpreads = computed(() => (showAllSpreads.value ? spreadOptions.value : compactSpreads.value));
const canExpand = computed(() => spreadOptions.value.length > compactSpreads.value.length);

function selectSpread(spreadKey: string) {
  emit('update:selectedSpread', spreadKey);
}
</script>

<style scoped>
.tarot-spread-selector {
  display: grid;
  gap: var(--spacing-3);
  width: 100%;
  margin-bottom: var(--spacing-4);
}

.spread-selector-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-3);
  min-width: 0;
}

.spread-selector-copy {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-2);
  min-width: 0;
}

.spread-selector-label {
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  white-space: nowrap;
}

.spread-toggle {
  flex: 0 0 auto;
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-full);
  background: var(--color-background);
  color: var(--color-text-secondary);
  cursor: pointer;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-tight);
  padding: var(--spacing-1) var(--spacing-3);
  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast),
    color var(--transition-fast),
    box-shadow var(--transition-fast);
}

.spread-toggle:hover {
  border-color: color-mix(in srgb, var(--color-primary) 30%, var(--color-border));
  background: var(--color-background-soft);
  color: var(--color-primary);
}

.spread-toggle:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.spread-options {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--spacing-2);
}

.spread-options.expanded {
  grid-template-columns: repeat(auto-fit, minmax(132px, 1fr));
}

.spread-option {
  display: grid;
  gap: var(--spacing-1);
  min-width: 0;
  min-height: 70px;
  padding: var(--spacing-3);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--color-primary) 3%, transparent), transparent),
    var(--color-background);
  color: var(--color-text-primary);
  cursor: pointer;
  text-align: left;
  box-shadow: none;
  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast),
    box-shadow var(--transition-fast),
    transform var(--transition-fast);
}

.spread-option:hover {
  border-color: color-mix(in srgb, var(--color-primary) 32%, var(--color-border));
  box-shadow: var(--shadow-sm);
  transform: translateY(-1px);
}

.spread-option:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.spread-option.active {
  border-color: color-mix(in srgb, var(--color-primary) 52%, var(--color-border));
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--color-primary) 10%, transparent), transparent),
    var(--color-primary-muted);
  box-shadow: var(--shadow-sm);
}

.spread-option-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-2);
  min-width: 0;
}

.spread-option-name {
  min-width: 0;
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.spread-option-count {
  flex: 0 0 auto;
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs);
  line-height: var(--line-height-tight);
}

.spread-option.active .spread-option-name,
.spread-option.active .spread-option-count {
  color: var(--color-primary);
}

.spread-option-description {
  display: -webkit-box;
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs);
  line-height: 1.35;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

@media (max-width: 768px) {
  .tarot-spread-selector {
    gap: var(--spacing-2);
    margin-bottom: var(--spacing-3);
  }

  .spread-options,
  .spread-options.expanded {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .spread-option {
    min-height: 62px;
    padding: var(--spacing-2);
  }
}

@media (max-width: 360px) {
  .spread-selector-header {
    align-items: flex-start;
    flex-direction: column;
    gap: var(--spacing-2);
  }

  .spread-toggle {
    width: 100%;
  }
}
</style>
