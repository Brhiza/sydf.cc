<template>
  <div class="content-card">
    <div class="result-header">
      <h2 class="section-title">{{ resultTitle }}</h2>
    </div>

    <DivinationResultBody :type="type" :result="result" :question="question" />

    <DivinationAISection
      v-if="showAISection"
      :type="type"
      :conversation-history="conversationHistory"
      :is-ai-loading="isAiLoading"
      :is-follow-up-loading="isFollowUpLoading"
      :error="error"
      @retry="(target) => $emit('retry', target)"
    />

    <DivinationErrorState
      v-if="error"
      :error="error"
      :show-retry-button="showErrorRetryButton"
      @retry="$emit('retry')"
    >
      <slot name="error-actions"></slot>
    </DivinationErrorState>

    <!-- 操作按钮 -->
    <div class="result-actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DivinationType, DivinationResult as DivinationResultType, ChatMessage, ChatMessageRetryTarget } from '@/types';
import { computed } from 'vue';
import DivinationResultBody from './result/DivinationResultBody.vue';
import DivinationAISection from './result/DivinationAISection.vue';
import DivinationErrorState from './result/DivinationErrorState.vue';
import {
  getDisplayedConversationHistory,
  hasVisibleAssistantContent,
} from './result/ai/divination-ai-section';

const props = withDefaults(defineProps<{
  type: DivinationType;
  result: DivinationResultType;
  title?: string;
  isAiLoading?: boolean;
  error?: string | null;
  question?: string;
  conversationHistory?: ChatMessage[];
  isFollowUpLoading?: boolean;
}>(), {
  title: '',
  isAiLoading: false,
  error: null,
  question: '',
  conversationHistory: () => [],
  isFollowUpLoading: false,
});

const emit = defineEmits<{
  retry: [target?: ChatMessageRetryTarget];
}>();

const showErrorRetryButton = computed(() => {
  return !hasVisibleAssistantContent(props.type, props.conversationHistory);
});

const showAISection = computed(() => {
  if (props.type !== 'daily') {
    return true;
  }

  return getDisplayedConversationHistory(props.type, props.conversationHistory).length > 0;
});

// 计算结果标题
const resultTitle = computed(() => {
  if (props.title) return props.title;

  const { type, result } = props;

  // 对于塔罗牌，根据实际牌阵类型显示标题
  if (type === 'tarot' || type === 'tarot_single') {
    // TypeScript 现在知道 result.data 是 TarotData 类型
    const data = result.data as import('@/types').TarotData;
    const spreadName = data.spreadName;
    if (spreadName) {
      return `塔罗牌·${spreadName}结果`;
    }
    // 如果没有牌阵名称，根据卡牌数量判断
    const cardCount = data.cards?.length || 0;
    if (cardCount === 1) {
      return '塔罗牌·单牌指引结果';
    } else if (cardCount === 3) {
      return '塔罗牌·时间流牌阵结果';
    } else {
      return '塔罗牌占卜结果';
    }
  }

  // 其他占卜类型的标题
  const typeMap = {
    liuyao: '六爻占卜结果',
    meihua: '梅花易数结果',
    qimen: '奇门遁甲结果',
    ssgw: '三山国王灵签结果',
    daily: '今日运势',
  } as const;

  return type in typeMap ? typeMap[type as keyof typeof typeMap] : '占卜结果';
});
</script>

<style scoped>
/* 组件特定样式 */
.result-header {
  margin-bottom: var(--spacing-4);
  padding-bottom: var(--spacing-4);
  border-bottom: 1px solid var(--color-border-light);
}

.result-actions {
  display: flex;
  justify-content: center;
  gap: var(--spacing-4);
  margin-top: var(--spacing-4);
}
</style>
