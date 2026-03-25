<template>
  <div class="section-header">
    <h2 class="section-title">
      {{ title }}
      <button
        class="refresh-button"
        :disabled="loading"
        :title="loading ? '正在刷新...' : '点击刷新数据'"
        type="button"
        @click="$emit('refresh')"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
      >
        <svg
          class="refresh-icon"
          :class="{ rotating: loading }"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M1 4v6h6M23 20v-6h-6" />
          <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
        </svg>
      </button>
    </h2>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  refresh: [];
}>();

function handleTouchStart(event: TouchEvent) {
  event.preventDefault();
}

function handleTouchEnd(event: TouchEvent) {
  event.preventDefault();
  emit('refresh');
}

defineProps<{
  title: string;
  loading?: boolean;
}>();
</script>

<style scoped>
.section-header {
  margin-bottom: var(--spacing-4);
}

.section-title {
  display: flex;
  align-items: center;
  width: 100%;
}

.refresh-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--spacing-1);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: var(--spacing-1);
}

.refresh-button:hover:not(:disabled) {
  background: rgba(102, 126, 234, 0.1);
  color: var(--color-primary);
  transform: scale(1.1);
}

.refresh-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.refresh-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.refresh-icon.rotating {
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
