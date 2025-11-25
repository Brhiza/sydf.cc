<template>
  <div class="markdown-content streaming-markdown-content">
    <div v-html="finalContent"></div>
    <div v-if="isThinking" class="thinking-bubble" v-html="thinkingContent"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { marked } from 'marked';

interface Props {
  content: string | { value: string };
  isComplete?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isComplete: false,
});

const fullText = computed(() => typeof props.content === 'string' ? props.content : props.content.value);
const finalContent = ref('');
const thinkingContent = ref('');
const isThinking = ref(false);

marked.setOptions({
  breaks: true,
  gfm: true,
});

const thinkingTags = ['think', 'thinking', 'reason', 'analyze', 'reflect'];
const tagTitles: Record<string, string> = {
  think: '查看AI的思考过程',
  thinking: '查看AI的详细思考',
  reason: '查看AI的推理过程',
  analyze: '查看AI的分析过程',
  reflect: '查看AI的反思过程'
};
const tagStatus: Record<string, string> = {
  think: 'AI正在思考...',
  thinking: 'AI正在详细思考...',
  reason: 'AI正在推理...',
  analyze: 'AI正在分析...',
  reflect: 'AI正在反思...'
};

watch(
  [fullText, () => props.isComplete],
  async ([newFullText, newIsComplete], [_oldFullText, _oldIsComplete]) => {
    let processedHTML = '';
    let currentThinking = '';
    let inThinkingBlock = false;
    
    const tagPattern = thinkingTags.map(tag => `<${tag}>|</${tag}>`).join('|');
    const parts = newFullText.split(new RegExp(`(${tagPattern})`, 'g'));

    let currentTagType = '';

    for (const part of parts) {
      const openingTagMatch = part.match(/^<(\w+)>$/);
      const closingTagMatch = part.match(/^<\/(\w+)>$/);

      if (openingTagMatch && thinkingTags.includes(openingTagMatch[1])) {
        inThinkingBlock = true;
        currentTagType = openingTagMatch[1];
        currentThinking = '';
      } else if (closingTagMatch && thinkingTags.includes(closingTagMatch[1])) {
        if (inThinkingBlock && currentTagType === closingTagMatch[1]) {
          // 正常闭合
          const thinkingHTML = await marked.parse(currentThinking);
          const detailsTag = newIsComplete
            ? `<details class="thinking-${currentTagType}"><summary>${tagTitles[currentTagType]}</summary><div class="thinking-content">${thinkingHTML}</div></details>`
            : `<details open class="thinking-${currentTagType}"><summary>${tagStatus[currentTagType]}</summary><div class="thinking-content">${thinkingHTML}</div></details>`;
          processedHTML += detailsTag;
          inThinkingBlock = false;
          currentTagType = '';
        } else if (!inThinkingBlock) {
          // 处理没有开始标签的结束标签
          currentThinking = processedHTML;
          processedHTML = '';
          const thinkingHTML = await marked.parse(currentThinking);
          const tagType = closingTagMatch[1];
          const detailsTag = `<details class="thinking-${tagType}"><summary>${tagTitles[tagType] || '查看AI的思考过程'}</summary><div class="thinking-content">${thinkingHTML}</div></details>`;
          processedHTML += detailsTag;
          currentThinking = '';
        }
      } else if (part) {
        if (inThinkingBlock) {
          currentThinking += part;
        } else {
          processedHTML += await marked.parse(part);
        }
      }
    }

    // Update reactive refs
    if (inThinkingBlock) {
      finalContent.value = processedHTML;
      thinkingContent.value = await marked.parse(currentThinking);
      isThinking.value = true;
    } else {
      finalContent.value = processedHTML;
      thinkingContent.value = '';
      isThinking.value = false;
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.thinking-bubble {
  background-color: var(--color-bg-tertiary);
  border-radius: 12px;
  padding: 12px 18px;
  margin-top: var(--spacing-4);
  border: 1px solid var(--color-border-light);
}
.streaming-markdown-content :deep(details) {
  background-color: var(--color-bg-tertiary);
  border-radius: 12px;
  padding: 12px 18px;
  margin-top: var(--spacing-4);
  border: 1px solid var(--color-border-light);
}
.streaming-markdown-content :deep(summary) {
  cursor: pointer;
  font-weight: 600;
  color: var(--color-text-secondary);
}

/* 为不同类型的思考标签添加样式 */
.streaming-markdown-content :deep(.thinking-think) {
  border-left: 4px solid #8b5cf6;
}
.streaming-markdown-content :deep(.thinking-thinking) {
  border-left: 4px solid #8b5cf6;
}
.streaming-markdown-content :deep(.thinking-reason) {
  border-left: 4px solid #10b981;
}
.streaming-markdown-content :deep(.thinking-analyze) {
  border-left: 4px solid #f59e0b;
}
.streaming-markdown-content :deep(.thinking-reflect) {
  border-left: 4px solid #ef4444;
}
</style>
