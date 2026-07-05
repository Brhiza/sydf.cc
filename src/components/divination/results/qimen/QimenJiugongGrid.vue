<template>
  <div class="paipan-section">
    <div class="paipan-section-header">
      <h3 class="paipan-section-title">奇门九宫</h3>
      <span class="paipan-section-meta">盘面焦点已标记</span>
    </div>
    <div class="jiugong-container">
      <div class="jiugong-grid">
        <div
          v-for="(gong, index) in arrangedGongs"
          :key="gong.gong"
          class="gong-cell"
          :class="[
            getQimenGongClass(index),
            { 'question-focus': highlightedGongs.includes(gong.gong) },
          ]"
        >
          <div class="gong-header">
            <span class="gong-name">{{ gong.name }}</span>
            <span class="gong-direction">{{ gong.direction }}</span>
          </div>
          <div class="gong-content">
            <div class="tian-pan">
              <span class="star">{{ gong.tianPan.star }}</span>
              <span class="stem">{{ gong.tianPan.stem }}</span>
            </div>
            <div v-if="!isCenterGong(gong)" class="ren-pan">
              <span class="door">{{ gong.renPan.door }}</span>
            </div>
            <div class="di-pan">
              <span class="stem">{{ gong.diPan.stem }}</span>
            </div>
            <div v-if="!isCenterGong(gong)" class="shen-pan">
              <span class="god">{{ gong.shenPan.god }}</span>
            </div>
            <div v-if="isCenterGong(gong)" class="zhong-gong">
              <span class="zhong-text">中宫</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { QimenData } from '@/types/divination';
import { arrangeQimenGongs, getQimenGongClass, isCenterGong } from './qimen-result';

const props = defineProps<{
  data: QimenData;
  highlightedGongs?: number[];
}>();

const arrangedGongs = computed(() => {
  return arrangeQimenGongs(props.data.jiuGongGe);
});

const highlightedGongs = computed(() => props.highlightedGongs || []);
</script>

<style scoped>
@import '@/styles/components/results.css';

.jiugong-container {
  display: flex;
  justify-content: center;
  margin-top: var(--spacing-2);
}

.jiugong-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 2px;
  width: 100%;
  max-width: 480px;
  aspect-ratio: 1;
  overflow: hidden;
  border: 2px solid var(--color-border);
  border-radius: 8px;
  background:
    linear-gradient(90deg, transparent 49.5%, rgba(30, 118, 58, 0.06) 50%, transparent 50.5%),
    linear-gradient(0deg, transparent 49.5%, rgba(30, 118, 58, 0.06) 50%, transparent 50.5%),
    var(--color-background-soft);
  isolation: isolate;
}

.jiugong-grid::before {
  content: '';
  position: absolute;
  inset: -40%;
  z-index: 0;
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    rgba(30, 118, 58, 0.12) 42deg,
    transparent 96deg
  );
  opacity: 0.56;
  pointer-events: none;
  animation: qimen-plate-sweep 18s linear infinite;
}

.gong-cell {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 120px;
  padding: 8px;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border-light);
}

.gong-cell.middle-center {
  background: var(--color-background-mute);
  border: 2px solid var(--color-primary);
}

.gong-cell.question-focus {
  box-shadow: inset 0 0 0 2px rgba(30, 118, 58, 0.28);
  background:
    linear-gradient(180deg, rgba(53, 150, 95, 0.06), rgba(53, 150, 95, 0)),
    var(--color-background-soft);
}

.gong-cell.question-focus::after {
  content: '';
  position: absolute;
  inset: 5px;
  border: 1px solid rgba(30, 118, 58, 0.38);
  border-radius: 6px;
  pointer-events: none;
  animation: qimen-focus-pulse 2.8s ease-in-out infinite;
}

.gong-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  font-size: 12px;
}

.gong-name {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
}

.gong-direction {
  color: var(--color-text-secondary);
  font-size: 10px;
}

.gong-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
}

.tian-pan,
.ren-pan,
.di-pan,
.shen-pan {
  margin: 2px 0;
  font-size: 13px;
  line-height: 1.2;
}

.tian-pan {
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
}

.ren-pan {
  color: var(--color-success);
  font-weight: var(--font-weight-medium);
}

.di-pan {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-bold);
}

.shen-pan {
  color: var(--color-warning);
  font-size: 11px;
}

.star,
.door,
.stem,
.god {
  display: inline-block;
  margin: 0 2px;
}

.zhong-gong {
  margin: 2px 0;
  color: var(--color-text-secondary);
  font-size: 12px;
  text-align: center;
}

.zhong-text {
  font-style: italic;
}

@media (max-width: 768px) {
  .jiugong-grid {
    max-width: 100%;
    gap: 1px;
  }

  .gong-cell {
    min-height: 100px;
    padding: 6px;
  }

  .gong-header {
    font-size: 11px;
  }

  .gong-direction {
    font-size: 9px;
  }

  .tian-pan,
  .ren-pan,
  .di-pan,
  .shen-pan {
    font-size: 12px;
  }

  .shen-pan {
    font-size: 10px;
  }
}

@media (max-width: 480px) {
  .gong-cell {
    min-height: 80px;
    padding: 4px;
  }

  .tian-pan,
  .ren-pan,
  .di-pan,
  .shen-pan {
    font-size: 11px;
  }

  .shen-pan {
    font-size: 9px;
  }
}

@keyframes qimen-plate-sweep {
  to {
    transform: rotate(360deg);
  }
}

@keyframes qimen-focus-pulse {
  0%,
  100% {
    opacity: 0.38;
  }

  50% {
    opacity: 1;
  }
}
</style>
