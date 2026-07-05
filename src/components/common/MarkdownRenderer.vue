<template>
  <div class="markdown-content" v-html="renderedContent"></div>
</template>

<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue';
import cacheManager from '@/utils/cacheManager';
import { escapeHtml, renderSafeMarkdown } from '@/utils/markdown';

interface Props {
  content: string;
}

const props = defineProps<Props>();
const renderedContent = ref('');
let renderVersion = 0;
let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

function generateCacheKey(content: string): string {
  return cacheManager.generateKey('markdown', content);
}

async function processMarkdown(content: string): Promise<string> {
  const validContent = content ?? '';
  if (!validContent) {
    return '';
  }

  const cacheKey = generateCacheKey(validContent);
  const cachedResult = cacheManager.get('markdown', cacheKey) as string;
  if (cachedResult) {
    return cachedResult;
  }
  
  try {
    const parsed = await renderSafeMarkdown(validContent);
    cacheManager.set('markdown', cacheKey, parsed, 100);
    return parsed;
  } catch (error) {
    console.warn('Markdown 解析失败:', error);
    const fallback = escapeHtml(validContent).replace(/\n/g, '<br>');
    cacheManager.set('markdown', cacheKey, fallback, 100);
    return fallback;
  }
}

watch(
  () => props.content,
  async (newContent) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const currentVersion = ++renderVersion;
    debounceTimeout = setTimeout(async () => {
      const html = await processMarkdown(newContent);
      if (currentVersion === renderVersion) {
        renderedContent.value = html;
      }
    }, 50);
  },
  { immediate: true }
);

onUnmounted(() => {
  renderVersion += 1;
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }
});
</script>

<style scoped>
.markdown-content :deep(p:first-child) {
  margin-top: 0;
}
.markdown-content :deep(p:last-child) {
  margin-bottom: 0;
}
</style>
