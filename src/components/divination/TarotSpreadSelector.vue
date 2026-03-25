<template>
  <div ref="selectorRef" class="tarot-spread-selector">
    <div class="spread-bubbles-container">
      <div class="spread-bubbles">
        <TarotSpreadBubble
          v-for="spreadKey in visibleSpreadKeys"
          :key="spreadKey"
          :icon="getTarotSpreadIcon(spreadKey)"
          :label="tarotSpreads[spreadKey].name"
          :is-active="selectedSpread === spreadKey"
          @select="selectSpread(spreadKey)"
        />

        <TarotSpreadBubble icon="⋯" label="全部" expand-button @select="toggleShowAll" />
      </div>
    </div>

    <transition name="slide-fade">
      <div v-if="showAllSpreads" class="all-spreads-panel">
        <div class="panel-header">
          <h3 class="panel-title">选择一个牌阵</h3>
          <button class="close-button" @click="closeAllSpreads">&times;</button>
        </div>
        <div class="panel-content">
          <TarotSpreadPanelItem
            v-for="spreadKey in orderedSpreadKeys"
            :key="spreadKey"
            :icon="getTarotSpreadIcon(spreadKey)"
            :title="tarotSpreads[spreadKey].name"
            :description="tarotSpreads[spreadKey].description"
            :card-count="tarotSpreads[spreadKey].cardCount"
            :is-active="selectedSpread === spreadKey"
            @select="selectSpreadFromPanel(spreadKey)"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { tarotSpreads } from '@/utils/tarot';
import { onMounted, onUnmounted, ref } from 'vue';
import TarotSpreadBubble from './tarot-selector/TarotSpreadBubble.vue';
import TarotSpreadPanelItem from './tarot-selector/TarotSpreadPanelItem.vue';
import {
  DEFAULT_VISIBLE_TAROT_SPREAD_KEYS,
  ORDERED_TAROT_SPREAD_KEYS,
  getTarotSpreadIcon,
  type TarotSpreadKey,
} from './tarot-selector/tarot-spread-selector.config';

// 定义 Props 和 Emits
defineProps<{
  selectedSpread: string;
}>();

const emit = defineEmits<{
  (e: 'update:selectedSpread', value: string): void;
}>();

const showAllSpreads = ref(false);
const selectorRef = ref<HTMLElement | null>(null);
const orderedSpreadKeys = ORDERED_TAROT_SPREAD_KEYS;
const visibleSpreadKeys = DEFAULT_VISIBLE_TAROT_SPREAD_KEYS;

// 方法
function selectSpread(spreadKey: string) {
  emit('update:selectedSpread', spreadKey);
}

function selectSpreadFromPanel(spreadKey: string) {
  selectSpread(spreadKey);
  closeAllSpreads();
}

function toggleShowAll() {
  showAllSpreads.value = !showAllSpreads.value;
}

function closeAllSpreads() {
  showAllSpreads.value = false;
}

function handleClickOutside(event: MouseEvent) {
  if (selectorRef.value && !selectorRef.value.contains(event.target as Node)) {
    closeAllSpreads();
  }
}

// 生命周期钩子
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.tarot-spread-selector {
  margin-bottom: 24px;
  width: 100%;
  position: relative;
}

.spread-bubbles-container {
  width: 100%;
}

.spread-bubbles {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-bottom: 0;
}

.all-spreads-panel {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--color-background);
  border: 1px solid var(--color-border-light);
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  overflow: hidden;
}

html.dark .all-spreads-panel {
  background: var(--color-background-elevated);
  border-color: var(--color-border);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border-light);
}

.panel-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  color: var(--color-text-secondary);
  padding: 0 4px;
}

.panel-content {
  max-height: 400px;
  overflow-y: auto;
  padding: 8px;
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
