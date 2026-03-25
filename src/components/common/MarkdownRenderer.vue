<template>
  <div class="markdown-content" v-html="renderedContent"></div>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue';
import cacheManager from '@/utils/cacheManager';
import { escapeHtml, renderSafeMarkdown } from '@/utils/markdown';

interface Props {
  content: string;
}

const props = defineProps<Props>();
const renderedContent = ref('');

// 生成缓存键
function generateCacheKey(content: string): string {
  return cacheManager.generateKey('markdown', content);
}

// 防抖处理
let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

async function processMarkdown(content: string): Promise<string> {
  if (!content || content === undefined) return '';
  
  // 确保content是有效字符串
  const validContent = content || '';
  
  // 检查缓存
  const cacheKey = generateCacheKey(validContent);
  const cachedResult = cacheManager.get('markdown', cacheKey) as string;
  if (cachedResult) {
    return cachedResult;
  }
  
  try {
    const parsed = await renderSafeMarkdown(content);
    cacheManager.set('markdown', cacheKey, parsed, 100);
    return parsed;
  } catch (error) {
    console.warn('Markdown 解析失败:', error);
    // 如果解析失败，回退为转义后的纯文本
    const fallback = escapeHtml(content).replace(/\n/g, '<br>');
    cacheManager.set('markdown', cacheKey, fallback, 100);
    return fallback;
  }
}

watch(
  () => props.content,
  async (newContent) => {
    // 清除之前的防抖
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    
    // 使用防抖优化频繁更新
    debounceTimeout = setTimeout(async () => {
      renderedContent.value = await processMarkdown(newContent || '');
    }, 50); // 50ms防抖延迟
  },
  { immediate: true }
);

// 组件卸载时清理
onUnmounted(() => {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }
  // 可选：清理缓存
  // markdownCache.clear();
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
