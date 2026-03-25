<template>
  <div ref="messageRef" class="chat-message" :class="`message-${message.role}`">
    <div v-if="showLoadingDots" class="loading-dots">
      <span></span><span></span><span></span>
    </div>
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

const showLoadingDots = computed(() => {
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

  const contentClone = contentContainer.cloneNode(true) as HTMLElement;
  contentClone.querySelectorAll('details').forEach((detailsElement) => detailsElement.remove());
  const textToCopy = (contentClone.textContent || '').trim();

  copy(textToCopy);
}
</script>

<style scoped>
.chat-message {
  position: relative;
  max-width: 90%;
  padding: 12px 18px;
  border-radius: 18px;
  box-shadow: var(--shadow-sm);
  line-height: 1.7;
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
  padding-left: 20px;
}

.message-user {
  align-self: flex-end;
  background-color: var(--color-primary);
  color: white;
  border-radius: 18px;
}

.message-user :deep(p),
.message-user :deep(li),
.message-user :deep(span),
.message-user :deep(code),
.message-user :deep(strong),
.message-user :deep(em) {
  color: white !important;
}

.message-assistant {
  position: relative;
  align-self: flex-start;
  padding-bottom: 36px;
  background-color: var(--color-bg-secondary);
  color: var(--color-text-primary);
  border-radius: 18px;
}

.message-actions {
  position: absolute;
  bottom: 10px;
  left: 15px;
  z-index: 10;
  display: flex;
  gap: 8px;
}

.markdown-container {
  position: relative;
  z-index: 1;
}

.message-action-button {
  padding: 4px;
  border: none;
  background: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.message-action-button:hover {
  opacity: 1;
}

.message-action-button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.message-action-button svg {
  display: block;
}

.loading-dots {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 24px;
}

.loading-dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: currentColor;
  opacity: 0;
  animation: blink 1.4s infinite both;
}

.loading-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.loading-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes blink {
  0%,
  80%,
  100% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
}
</style>
