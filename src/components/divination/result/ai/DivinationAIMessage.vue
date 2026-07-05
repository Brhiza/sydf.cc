<template>
  <div ref="messageRef" class="chat-message" :class="`message-${message.role}`">
    <AIThinkingIndicator v-if="showThinkingIndicator" class="ai-thinking-status" />
    <div v-else class="markdown-container">
      <StreamingMarkdown
        :content="message.content || ''"
        :is-complete="!(isAiLoading || isFollowUpLoading)"
      />
    </div>

    <div v-if="showMessageActions" class="message-actions">
      <button
        type="button"
        class="message-action-button"
        :title="copied ? '已复制' : '复制'"
        :disabled="isCopyDisabled"
        @click="handleCopy"
      >
        <svg
          v-if="copied"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      </button>
      <button
        v-if="showRetryAction"
        type="button"
        class="message-action-button"
        title="重新生成"
        :disabled="isRetryDisabled"
        @click="emit('retry')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M23 4v6h-6"></path>
          <path d="M1 20v-6h6"></path>
          <path d="M3.51 9a9 9 0 0 1 14.13-3.36L23 10"></path>
          <path d="M20.49 15a9 9 0 0 1-14.13 3.36L1 14"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import AIThinkingIndicator from '@/components/common/AIThinkingIndicator.vue';
import StreamingMarkdown from '@/components/common/StreamingMarkdown.vue';
import { useClipboard } from '@/composables/useClipboard';
import type { ChatMessage } from '@/types';

const props = withDefaults(
  defineProps<{
    message: ChatMessage;
    isAiLoading?: boolean;
    isFollowUpLoading?: boolean;
    isLastAssistantMessage?: boolean;
    showRetryButton?: boolean;
  }>(),
  {
    isAiLoading: false,
    isFollowUpLoading: false,
    isLastAssistantMessage: false,
    showRetryButton: false,
  }
);

const emit = defineEmits<{
  retry: [];
}>();

const { copy, copied } = useClipboard();
const messageRef = ref<HTMLElement | null>(null);

const showThinkingIndicator = computed(() => {
  return (
    props.message.role === 'assistant' &&
    !props.message.content &&
    (props.isAiLoading || props.isFollowUpLoading)
  );
});

const showCopyButton = computed(() => {
  return props.message.role === 'assistant' && !!props.message.content;
});

const showRetryAction = computed(() => {
  return props.showRetryButton && props.message.role === 'assistant' && !!props.message.content;
});

const showMessageActions = computed(() => {
  return showCopyButton.value || showRetryAction.value;
});

const isCopyDisabled = computed(() => {
  return props.isLastAssistantMessage && (props.isAiLoading || props.isFollowUpLoading);
});

const isRetryDisabled = computed(() => {
  return props.isAiLoading || props.isFollowUpLoading;
});

function handleCopy() {
  const contentContainer = messageRef.value?.querySelector('.markdown-container');
  if (!contentContainer) return;

  const contentClone = contentContainer.cloneNode(true);
  if (!(contentClone instanceof Element)) {
    return;
  }

  contentClone.querySelectorAll('details').forEach((detailsElement) => detailsElement.remove());
  const textToCopy = (contentClone.textContent || '').trim();

  copy(textToCopy);
}
</script>

<style scoped>
.chat-message {
  position: relative;
  max-width: 90%;
  padding: var(--spacing-3) var(--spacing-4);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  line-height: var(--line-height-relaxed);
  word-wrap: break-word;
}

.chat-message :deep(p:first-child) {
  margin-top: 0;
}

.chat-message :deep(p:last-child) {
  margin-bottom: 0;
}

.chat-message :deep(ul),
.chat-message :deep(ol) {
  padding-left: var(--spacing-5);
}

.message-user {
  align-self: flex-end;
  background-color: var(--color-primary);
  border-color: color-mix(in srgb, var(--color-primary) 40%, transparent);
  color: var(--color-white);
  border-radius: var(--radius-xl);
}

.message-user :deep(p),
.message-user :deep(li),
.message-user :deep(span),
.message-user :deep(code),
.message-user :deep(strong),
.message-user :deep(em) {
  color: var(--color-white) !important;
}

.message-assistant {
  position: relative;
  align-self: flex-start;
  padding-bottom: var(--spacing-8);
  background-color: var(--color-background-soft);
  color: var(--color-text-primary);
  border-radius: var(--radius-xl);
}

.message-actions {
  position: absolute;
  bottom: var(--spacing-2);
  left: var(--spacing-3);
  z-index: 1;
  display: flex;
  gap: var(--spacing-1);
}

.markdown-container {
  position: relative;
  z-index: 1;
}

.message-action-button {
  width: 26px;
  height: 26px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--color-text-secondary);
  cursor: pointer;
  opacity: 0.6;
  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast),
    color var(--transition-fast),
    opacity var(--transition-fast);
}

.message-action-button:hover {
  background: var(--color-background);
  border-color: var(--color-border-light);
  color: var(--color-text-primary);
  opacity: 1;
}

.message-action-button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.message-action-button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.message-action-button svg {
  display: block;
}

</style>
