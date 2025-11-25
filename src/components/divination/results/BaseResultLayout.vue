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
  margin-bottom: var(--spacing-6);
  padding: var(--spacing-3);
  font-size: 16px;
  line-height: 1.6;
  color: var(--color-text-primary);
}
</style>
