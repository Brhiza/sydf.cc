<template>
  <div class="error-state">
    <div class="error-content">
      <div class="error-line-1">哈哈，AI开小差咯</div>
      <div class="error-line-2">{{ error }}</div>
      <div class="error-line-3">
        <slot v-if="showRetryButton">
          <button class="retry-button" @click="$emit('retry')">重新生成解读</button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  error: string
  showRetryButton?: boolean
}>(), {
  showRetryButton: true,
})

defineEmits<{
  (e: 'retry'): void
}>()
</script>

<style scoped>
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-6);
  text-align: center;
  color: var(--color-danger);
}

.error-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.error-line-1 {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.error-line-2 {
  font-size: 14px;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.error-line-3 {
  margin-top: 8px;
}

.retry-button {
  background: var(--color-primary);
  color: white;
  border: none;
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: var(--font-size-sm);
  transition: background-color 0.2s;
}

.retry-button:hover {
  background: var(--color-primary-dark);
}
</style>
