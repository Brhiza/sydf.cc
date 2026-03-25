<template>
  <DivinationInput
    v-if="!result && !isLoading"
    title="今日运势"
    :description="isCustomBuild ? '' : config?.description || ''"
    :button-text="config?.buttonText || '查看今日运势'"
    :loading="isLoading"
    :loading-text="loadingTip"
    :placeholder="config?.placeholder || ''"
    divination-type="daily"
    :show-inspiration="false"
    :selected-date="selectedDate"
    @submit="handleSubmit"
    @clear="handleClear"
    @update:selected-date="selectedDate = $event"
  />

  <UnifiedResultHeaderActions v-if="result && !route.query.historyId" @back="handleClear" />

  <ContentSectionCard
    v-if="result"
    class="daily-interpretation-card"
    :title="pageTitle"
    use-header
    header-divider
  >
    <DailyInterpretationResult :ai-response="aiResponse" :is-loading="isAILoading" />
  </ContentSectionCard>

  <div v-if="result && (hasVisibleConversation || error)" class="content-card">
    <DivinationAISection
      type="daily"
      :conversation-history="conversationHistory"
      :is-ai-loading="isAILoading"
      :is-follow-up-loading="isFollowUpLoading"
      :error="error"
      @retry="handleRetry"
    />
  </div>

  <UnifiedFollowUpComposer
    v-if="result && hasAiResponse && !isAILoading"
    v-model="followUpQuestion"
    :disabled="isFollowUpLoading"
    @send="handleSendFollowUp"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ContentSectionCard from '@/components/common/ContentSectionCard.vue';
import DivinationInput from '@/components/divination/DivinationInput.vue';
import DivinationAISection from '@/components/divination/result/DivinationAISection.vue';
import DailyInterpretationResult from '@/components/divination/results/DailyInterpretationResult.vue';
import { getDivinationConfig } from '@/config/divination';
import { useDailyFortune } from '@/composables/useDailyFortune';
import UnifiedFollowUpComposer from './UnifiedFollowUpComposer.vue';
import UnifiedResultHeaderActions from './UnifiedResultHeaderActions.vue';

const config = computed(() => getDivinationConfig('daily'));

const {
  route,
  selectedDate,
  isLoading,
  isAILoading,
  result,
  aiResponse,
  error,
  conversationHistory,
  followUpQuestion,
  isFollowUpLoading,
  hasAiResponse,
  pageTitle,
  loadingTip,
  hasVisibleConversation,
  startDailyFortune,
  handleClear,
  handleRetry,
  handleSendFollowUp,
} = useDailyFortune();

function handleSubmit() {
  void startDailyFortune();
}
</script>

<style scoped>
.daily-interpretation-card :deep(.form-actions) {
  justify-content: center;
}

@media (max-width: 480px) {
  .daily-interpretation-card :deep(.form-actions) {
    margin-top: var(--spacing-4);
  }
}
</style>
