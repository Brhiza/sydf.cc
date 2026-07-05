<template>
  <div class="markdown-content streaming-markdown-content">
    <div v-html="finalContent"></div>
    <AIThinkingIndicator v-if="isThinking" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import AIThinkingIndicator from '@/components/common/AIThinkingIndicator.vue';
import { renderSafeMarkdown } from '@/utils/markdown';

interface Props {
  content: string | { value: string };
  isComplete?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isComplete: false,
});

const fullText = computed(() => typeof props.content === 'string' ? props.content : props.content.value);
const finalContent = ref('');
const isThinking = ref(false);
let renderVersion = 0;

const thinkingTags = ['think', 'thinking', 'reason', 'analyze', 'reflect'];

watch(
  [fullText, () => props.isComplete],
  async ([newFullText, newIsComplete], [_oldFullText, _oldIsComplete]) => {
    const currentVersion = ++renderVersion;
    let processedHTML = '';
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
      } else if (closingTagMatch && thinkingTags.includes(closingTagMatch[1])) {
        if (inThinkingBlock && currentTagType === closingTagMatch[1]) {
          inThinkingBlock = false;
          currentTagType = '';
        }
      } else if (part) {
        if (!inThinkingBlock) {
          processedHTML += await renderSafeMarkdown(part);
          if (currentVersion !== renderVersion) {
            return;
          }
        }
      }
    }

    if (currentVersion === renderVersion) {
      finalContent.value = processedHTML;
      isThinking.value = inThinkingBlock && !newIsComplete;
    }
  },
  { immediate: true }
);
</script>
