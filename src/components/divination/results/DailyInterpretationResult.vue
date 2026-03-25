<template>
  <div class="daily-interpretation-result">
    <div v-if="content" class="daily-interpretation-content">
      <MarkdownRenderer :content="content" />
    </div>
    <div v-else-if="isLoading" class="daily-interpretation-placeholder">
      AI 正在解读今日运势...
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import MarkdownRenderer from '@/components/common/MarkdownRenderer.vue';

interface Props {
  aiResponse?: string;
  isLoading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  aiResponse: '',
  isLoading: false,
});

const content = computed(() => props.aiResponse.trim());
</script>

<style scoped>
.daily-interpretation-result {
  padding: var(--spacing-4);
}

.daily-interpretation-content,
.daily-interpretation-placeholder {
  padding: var(--spacing-4);
  background: var(--color-background-elevated);
  border-radius: var(--radius-md);
}

.daily-interpretation-placeholder {
  color: var(--color-text-secondary);
  line-height: 1.7;
}
</style>
