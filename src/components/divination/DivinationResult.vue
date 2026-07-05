<template>
  <div :class="['content-card', 'divination-result-card', `divination-result-card-${type}`]">
    <div v-if="showHeader" class="result-header">
      <h2 class="section-title">{{ resultTitle }}</h2>
    </div>

    <DivinationResultBody
      :type="type"
      :result="result"
      :question="question"
      :is-ai-loading="isAiLoading"
    />

    <DivinationAISection
      v-if="showAISection"
      :type="type"
      :conversation-history="conversationHistory"
      :is-ai-loading="isAiLoading"
      :is-follow-up-loading="isFollowUpLoading"
      :error="error"
      @retry="(target) => $emit('retry', target)"
    />

    <!-- 操作按钮 -->
    <div class="result-actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  DivinationType,
  DivinationResult as DivinationResultType,
  ChatMessage,
  ChatMessageRetryTarget,
} from '@/types';
import { computed } from 'vue';
import DivinationResultBody from './result/DivinationResultBody.vue';
import DivinationAISection from './result/DivinationAISection.vue';
import { getDisplayedConversationHistory } from './result/ai/divination-ai-section';
import { resolveTarotSpreadName } from '@/shared/tarot-spreads';

const props = withDefaults(
  defineProps<{
    type: DivinationType;
    result: DivinationResultType;
    title?: string;
    showHeader?: boolean;
    isAiLoading?: boolean;
    error?: string | null;
    question?: string;
    conversationHistory?: ChatMessage[];
    isFollowUpLoading?: boolean;
  }>(),
  {
    title: '',
    showHeader: true,
    isAiLoading: false,
    error: null,
    question: '',
    conversationHistory: () => [],
    isFollowUpLoading: false,
  }
);

const emit = defineEmits<{
  retry: [target?: ChatMessageRetryTarget];
}>();

const showAISection = computed(() => {
  if (props.type !== 'daily') {
    return true;
  }

  return (
    getDisplayedConversationHistory(props.type, props.conversationHistory).length > 0 ||
    !!props.error
  );
});

// 计算结果标题
const resultTitle = computed(() => {
  if (props.title) return props.title;

  const { type, result } = props;

  // 对于塔罗牌，根据实际牌阵类型显示标题
  if (type === 'tarot') {
    // TypeScript 现在知道 result.data 是 TarotData 类型
    const data = result.data as import('@/types').TarotData;
    const spreadName = resolveTarotSpreadName({
      spreadName: data.spreadName,
      spreadType: data.spreadType,
      cardCount: data.cards?.length || 0,
    });
    if (spreadName) {
      return `塔罗牌·${spreadName}结果`;
    }
    return '塔罗牌占卜结果';
  }

  // 其他占卜类型的标题
  const typeMap = {
    liuyao: '六爻占卜结果',
    meihua: '梅花易数结果',
    qimen: '奇门遁甲结果',
    ssgw: '三山国王灵签结果',
    daily: '今日运势',
  } as const;

  return typeMap[type];
});
</script>

<style scoped>
/* 组件特定样式 */
.result-header {
  margin-bottom: var(--spacing-5);
  padding-bottom: var(--spacing-4);
  border-bottom: 1px solid var(--color-border-light);
}

.result-header .section-title {
  margin: 0;
  color: var(--color-text-primary);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
}

.result-actions {
  display: flex;
  justify-content: center;
  gap: var(--spacing-4);
  margin-top: var(--spacing-4);
}

@media (max-width: 768px) {
  .divination-result-card {
    padding: var(--spacing-4);
  }

  .result-header {
    margin-bottom: var(--spacing-3);
    padding-bottom: var(--spacing-3);
  }

  .result-header .section-title {
    font-size: var(--font-size-xl);
  }
}

@media (max-width: 480px) {
  .divination-result-card {
    padding: var(--spacing-3);
  }

  .result-actions {
    margin-top: var(--spacing-3);
  }
}
</style>
