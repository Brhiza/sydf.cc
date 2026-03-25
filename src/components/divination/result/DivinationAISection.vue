<template>
  <div v-if="showAISection" class="ai-content">
    <DivinationAIHeader :title="aiSectionTitle" />
    <div class="ai-response-content">
      <div v-if="displayedConversationHistory.length > 0" class="conversation-history">
        <DivinationAIMessage
          v-for="(message, index) in displayedConversationHistory"
          :key="message.id || index"
          :message="message"
          :is-ai-loading="isAiLoading"
          :is-follow-up-loading="isFollowUpLoading"
          :is-last-assistant-message="isLastAssistantMessage(message)"
          :show-retry-button="true"
          @retry="$emit('retry', { displayedIndex: index, messageId: message.id })"
        />
      </div>
      <div v-else-if="isAiLoading || isFollowUpLoading" class="ai-loading-state">
        <div class="loading-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>

    <DivinationAIDisclaimer v-if="showDisclaimer" />
  </div>
</template>

<script setup lang="ts">
import type { ChatMessage, ChatMessageRetryTarget, DivinationType } from '@/types'
import { computed } from 'vue'
import DivinationAIDisclaimer from './ai/DivinationAIDisclaimer.vue'
import DivinationAIHeader from './ai/DivinationAIHeader.vue'
import DivinationAIMessage from './ai/DivinationAIMessage.vue'
import {
  getAISectionTitle,
  getDisplayedConversationHistory,
  getLastAssistantMessage,
} from './ai/divination-ai-section'

const isCustomBuild = computed(() => import.meta.env.VITE_APP_BUILD_TARGET === 'CUSTOM')

const props = withDefaults(
  defineProps<{
    type: DivinationType
    conversationHistory?: ChatMessage[]
    isAiLoading?: boolean
    isFollowUpLoading?: boolean
    error?: string | null
  }>(),
  {
    conversationHistory: () => [],
    isAiLoading: false,
    isFollowUpLoading: false,
    error: null,
  }
)

defineEmits<{
  retry: [target: ChatMessageRetryTarget]
}>()

const displayedConversationHistory = computed(() => {
  const displayedMessages = getDisplayedConversationHistory(props.type, props.conversationHistory)

  if (displayedMessages.length > 0 || !props.error) {
    return displayedMessages
  }

  return [
    {
      id: 'assistant-error-fallback',
      role: 'assistant',
      content: props.error,
    } satisfies ChatMessage,
  ]
})

const lastAssistantMessage = computed(() => {
  return getLastAssistantMessage(props.conversationHistory)
})

function isLastAssistantMessage(message: ChatMessage) {
  const targetMessage = lastAssistantMessage.value
  if (!targetMessage) return false

  if (message.id && targetMessage.id) {
    return message.id === targetMessage.id
  }

  return message === targetMessage
}

const showAISection = computed(() => {
  return displayedConversationHistory.value.length > 0 || props.isAiLoading
})

const aiSectionTitle = computed(() => {
  return getAISectionTitle(props.conversationHistory, props.isAiLoading, props.isFollowUpLoading)
})

const showDisclaimer = computed(() => {
  return !isCustomBuild.value && props.conversationHistory.length > 0 && !props.error
})
</script>

<style scoped>
.ai-content {
  margin-top: 40px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.ai-response-content {
  color: var(--color-text-primary);
  line-height: 1.8;
  font-size: 16px;
}

.conversation-history {
  margin-top: var(--spacing-6);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.ai-loading-state {
  display: flex;
  justify-content: center;
  padding: var(--spacing-6) 0;
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

@media (max-width: 768px) {
  .ai-content {
    margin-top: 32px;
    padding: 0;
  }

  .ai-response-content {
    font-size: 15px;
  }
}
</style>
