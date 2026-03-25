<template>
  <div ref="pageContainerRef" :key="divinationType" class="page-container">
    <UnifiedDailyDivinationContent v-if="isDaily" />

    <template v-else>
      <DivinationInput
        v-if="!hasResult && !isLoading"
        v-model="question"
        :title="config?.title || ''"
        :description="isCustomBuild ? '' : config?.description || ''"
        :button-text="config?.buttonText || '开始占卜'"
        :loading="isLoading"
        :placeholder="config?.placeholder || ''"
        :examples="config?.examples || []"
        :divination-type="divinationType"
        :hide-after-submit="false"
        @submit="handleSubmit"
        @type-change="handleTypeChange"
        @clear="clearResult"
      />

      <UnifiedResultHeaderActions
        v-if="hasResult && !route.query.historyId"
        @back="handleClear"
      />

      <DivinationResult
        v-if="hasResult"
        :type="divinationType"
        :result="adaptedResult as any"
        :is-ai-loading="isAiLoading || isFollowUpLoading"
        :error="error"
        :question="question"
        :conversation-history="conversationHistory"
        :is-follow-up-loading="isFollowUpLoading"
        @retry="handleRetry"
      />

      <!-- 错误提示 -->
      <StatusPageCard
        v-if="error && !hasResult"
        tone="error"
        :description="error"
      >
        <template #actions>
          <button class="btn-primary" @click="clearError">重试</button>
        </template>
      </StatusPageCard>

      <UnifiedFollowUpComposer
        v-if="hasAiResponse && !isAiLoading"
        v-model="followUpQuestion"
        :disabled="isFollowUpLoading"
        @send="handleSendFollowUp"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import StatusPageCard from '@/components/common/StatusPageCard.vue';
import DivinationInput from '@/components/divination/DivinationInput.vue';
import DivinationResult from '@/components/divination/DivinationResult.vue';
import { useUnifiedDivinationPage } from '@/composables/useUnifiedDivinationPage';
import type { DivinationType } from '@/types';
import { computed, ref } from 'vue';
import UnifiedFollowUpComposer from './components/UnifiedFollowUpComposer.vue';
import UnifiedDailyDivinationContent from './components/UnifiedDailyDivinationContent.vue';
import UnifiedResultHeaderActions from './components/UnifiedResultHeaderActions.vue';

interface Props {
  divinationType: DivinationType;
}

const props = defineProps<Props>();
const pageContainerRef = ref<HTMLElement | null>(null);
const isDaily = computed(() => props.divinationType === 'daily');

const {
  route,
  question,
  isLoading,
  result,
  aiResponse,
  error,
  isAiLoading,
  hasResult,
  hasAiResponse,
  viewingHistory,
  isCancelled,
  clearResult,
  conversationHistory,
  followUpQuestion,
  isFollowUpLoading,
  handleSendFollowUp,
  adaptedResult,
  config,
  isCustomBuild,
  handleTypeChange,
  handleSubmit,
  handleClear,
  clearError,
  handleRetry,
} = useUnifiedDivinationPage(props, pageContainerRef);
</script>
