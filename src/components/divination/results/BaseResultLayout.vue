<template>
  <div class="base-result-layout">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
// 这个组件目前只提供一个包裹层和样式，未来可以扩展更多通用功能
</script>

<style scoped>
.base-result-layout {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-6);
  padding: var(--spacing-5);
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--color-primary) 3%, transparent), transparent),
    var(--color-background);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl);
  font-size: 16px;
  line-height: 1.6;
  color: var(--color-text-primary);
}

@media (max-width: 768px) {
  .base-result-layout {
    gap: var(--spacing-3);
    padding: var(--spacing-4);
  }
}

@media (max-width: 480px) {
  .base-result-layout {
    padding: var(--spacing-3);
  }
}
</style>
