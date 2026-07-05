<template>
  <div class="thinking-animation ai-thinking-indicator" role="status" :aria-label="label">
    <span class="thinking-mark" aria-hidden="true">
      <span class="thinking-seal"></span>
    </span>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string;
  }>(),
  {
    label: 'AI 加载中',
  }
);
</script>

<style scoped>
.ai-thinking-indicator {
  display: inline-flex;
  align-items: center;
  min-height: 38px;
  color: inherit;
  font-size: 14px;
  line-height: 1.4;
}

.thinking-mark {
  position: relative;
  width: 34px;
  height: 34px;
  flex: 0 0 auto;
  display: inline-grid;
  place-items: center;
}

.thinking-seal {
  position: absolute;
}

.thinking-seal {
  inset: 5px;
  border: 2px solid currentColor;
  opacity: 0.68;
  transform: rotate(45deg);
  animation: thinking-seal-turn 2.2s ease-in-out infinite;
}

.thinking-seal::before {
  content: "";
  position: absolute;
  inset: 5px;
  border: 1px solid currentColor;
  opacity: 0.34;
}

.thinking-seal::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: currentColor;
  box-shadow: 0 0 16px color-mix(in srgb, currentColor 38%, transparent);
  transform: translate(-50%, -50%);
}

@keyframes thinking-seal-turn {
  0%,
  100% {
    transform: rotate(45deg) scale(0.88);
    opacity: 0.48;
  }

  50% {
    transform: rotate(135deg) scale(1);
    opacity: 0.94;
  }
}
</style>
