<template>
  <div ref="selectorRef" class="tarot-spread-selector">
    <!-- 气泡按钮选择器 -->
    <div class="spread-bubbles-container">
      <div class="spread-bubbles">
        <button
          v-for="spreadKey in visibleSpreadKeys"
          :key="spreadKey"
          class="spread-bubble"
          :class="{ active: selectedSpread === spreadKey }"
          @click="selectSpread(spreadKey)"
        >
          <span class="bubble-icon">{{ getSpreadIcon(spreadKey) }}</span>
          <span class="bubble-text">{{ tarotSpreads[spreadKey as TarotSpreadKey].name }}</span>
        </button>

        <!-- 全部按钮 -->
        <button class="spread-bubble expand-button" @click="toggleShowAll">
          <span class="bubble-icon">⋯</span>
          <span class="bubble-text">全部</span>
        </button>
      </div>
    </div>

    <!-- 展开的牌阵面板 -->
    <transition name="slide-fade">
      <div v-if="showAllSpreads" class="all-spreads-panel">
        <div class="panel-header">
          <h3 class="panel-title">选择一个牌阵</h3>
          <button class="close-button" @click="closeAllSpreads">&times;</button>
        </div>
        <div class="panel-content">
          <div
            v-for="spreadKey in orderedSpreadKeys"
            :key="spreadKey"
            class="spread-item"
            :class="{ active: selectedSpread === spreadKey }"
            @click="selectSpreadFromPanel(spreadKey)"
          >
            <div class="item-icon">{{ getSpreadIcon(spreadKey) }}</div>
            <div class="item-content">
              <div class="item-title">{{ tarotSpreads[spreadKey as TarotSpreadKey].name }}</div>
              <div class="item-description">{{ tarotSpreads[spreadKey as TarotSpreadKey].description }}</div>
            </div>
            <div class="item-meta">
              <span class="item-count">{{ tarotSpreads[spreadKey as TarotSpreadKey].cardCount }}张</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { tarotSpreads } from '@/utils/tarot';
import { computed, onMounted, onUnmounted, ref } from 'vue';

// 定义 Props 和 Emits
defineProps<{
  selectedSpread: string;
}>();

const emit = defineEmits<{
  (e: 'update:selectedSpread', value: string): void;
}>();

// 响应式引用
const showAllSpreads = ref(false);
const selectorRef = ref<HTMLElement | null>(null);

// 定义牌阵键的类型
type TarotSpreadKey = keyof typeof tarotSpreads;

// 从 tarotSpreads 对象动态生成牌阵顺序
const orderedSpreadKeys = Object.keys(tarotSpreads) as TarotSpreadKey[];

// 简化的可见牌阵逻辑：显示前4个
const visibleSpreadKeys = computed(() => {
  return orderedSpreadKeys.slice(0, 4);
});

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

function getSpreadIcon(spreadKey: string): string {
  const icons: Record<string, string> = {
    single: '🔮',
    three: '🃏',
    love: '💕',
    career: '💼',
    decision: '⚖️',
    celtic: '✨',
    chakra: '🧘',
    year: '📅',
    mindBodySpirit: '🌿',
    horseshoe: '🐴',
  };
  return icons[spreadKey] || '🎴';
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

.spread-bubble {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  color: var(--color-text-secondary);
  font-size: 13px;
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.spread-bubble:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  box-shadow: var(--shadow-sm);
  transform: translateY(-1px);
}

.spread-bubble.active {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background: var(--color-primary-muted);
  font-weight: 600;
}

.spread-bubble.expand-button {
  color: var(--color-text-secondary);
}

.bubble-icon {
  font-size: 14px;
}

/* 展开面板样式 */
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

.spread-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.spread-item:hover {
  background: var(--color-background-muted);
}

.spread-item.active {
  background: var(--color-primary-muted);
}

.spread-item.active .item-title {
  color: var(--color-primary);
  font-weight: 600;
}

.item-icon {
  font-size: 20px;
  width: 24px;
  text-align: center;
  color: var(--color-text-secondary);
}

.item-content {
  flex: 1;
  min-width: 0;
}

.item-title {
  font-size: 15px;
  font-weight: 500;
  color: var(--color-text-primary);
  margin-bottom: 4px;
}

.item-description {
  font-size: 12px;
  color: var(--color-text-secondary);
  line-height: 1.4;
}

.item-meta {
  flex-shrink: 0;
}

.item-count {
  background: var(--color-background-tertiary);
  color: var(--color-text-secondary);
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
}

/* 过渡动画 */
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
