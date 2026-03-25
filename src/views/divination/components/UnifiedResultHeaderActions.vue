<template>
  <div class="result-header-actions">
    <button class="btn-secondary" @click="$emit('back')">← 返回</button>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  back: [];
}>();
</script>

<style scoped>
.result-header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-6);
}

@media (max-width: 768px) {
  .result-header-actions {
    justify-content: flex-start;
    gap: var(--spacing-3);
    max-width: 100%;
  }
}
</style>
