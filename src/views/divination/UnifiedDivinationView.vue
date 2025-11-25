<template>
  <div ref="pageContainerRef" :key="divinationType" class="page-container">
    <!-- 占卜输入组件 -->
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

    <!-- 结果页头操作 -->
    <div v-if="hasResult && !route.query.historyId" class="result-header-actions">
      <button class="btn-secondary" @click="handleClear">← 返回</button>
    </div>

    <!-- 占卜结果组件 -->
    <!-- 三山国王灵签使用特殊组件 -->
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

    <!-- AI 操作按钮 -->
    <div v-if="hasResult" class="ai-actions">
      <button v-if="isAiLoading" class="btn-secondary" @click="cancelGeneration">取消生成</button>
      <button
        v-if="!isAiLoading && (error || isCancelled)"
        class="btn-primary"
        @click="handleRetry"
      >
        重新生成
      </button>
    </div>

    <!-- 错误提示 -->
    <div v-if="error && !hasResult" class="content-card error-card">
      <p class="content-text">{{ error }}</p>
      <div class="form-actions">
        <button class="btn-primary" @click="clearError">重试</button>
      </div>
    </div>

    <!-- 追问输入卡片 -->
   <div v-if="hasAiResponse && !isAiLoading" class="content-card follow-up-card">
      <!-- 追问输入框 -->
      <div class="follow-up-input">
        <textarea
          v-model="followUpQuestion"
          placeholder="对AI的解读进行追问..."
          :disabled="isFollowUpLoading"
          @keydown.enter.prevent="handleSendFollowUp"
        ></textarea>
        <button :disabled="isFollowUpLoading" @click="handleSendFollowUp">
          <span v-if="!isFollowUpLoading">发送</span>
          <span v-else>发送中...</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DivinationInput from '@/components/divination/DivinationInput.vue';
import DivinationResult from '@/components/divination/DivinationResult.vue';
import { useDivinationUnified } from '@/composables/useDivinationUnified';
import type { DivinationType, SupplementaryInfo } from '@/types';
import { getDivinationConfig } from '@/config/divination';
import { eventBus, EVENTS } from '@/utils/eventBus';
import { computed, onMounted, ref, watch, nextTick } from 'vue';
const isCustomBuild = computed(() => import.meta.env.VITE_APP_BUILD_TARGET === 'CUSTOM');
import { useRoute } from 'vue-router';

// Props
interface Props {
  divinationType: DivinationType;
}

const props = defineProps<Props>();
const route = useRoute();

// 获取配置 - 使用computed确保配置能响应divinationType变化
const config = computed(() => getDivinationConfig(props.divinationType));

// 页面容器引用
const pageContainerRef = ref<HTMLElement | null>(null);

// 使用统一的占卜逻辑
const {
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
  startDivination,
  clearResult,
  regenerateAI,
  handleHistoryParam,
  clearHistoryParam,
  cancelGeneration,
  conversationHistory,
  followUpQuestion,
  isFollowUpLoading,
  handleSendFollowUp,
} = useDivinationUnified(props);

// 适配结果数据格式
const adaptedResult = computed(() => {
  if (!result.value) return { data: {}, aiResponse: '' };

  return {
    data: result.value.data,
    aiResponse: aiResponse.value,
  };
});

// 处理类型变化（塔罗牌阵选择）
const currentSpread = ref('single');

function handleTypeChange(type: string) {
  if (type.startsWith('tarot_')) {
    const newSpread = type.replace('tarot_', '');
    currentSpread.value = newSpread;
  }
}

// 处理提交
function handleSubmit(payload: {
  question: string;
  signNumber?: number;
  supplementaryInfo?: SupplementaryInfo | undefined;
}) {
  if (payload.question) {
    question.value = payload.question;
  }

  const options: {
    signNumber?: number;
    spreadType?: string;
    supplementaryInfo?: SupplementaryInfo | undefined;
  } = {};

  if (props.divinationType === 'tarot') {
    options.spreadType = currentSpread.value;
  } else if (props.divinationType === 'ssgw' && payload.signNumber !== undefined) {
    options.signNumber = payload.signNumber;
  }

  if (payload.supplementaryInfo) {
    options.supplementaryInfo = payload.supplementaryInfo;
  }

  startDivination(options);
}

// 处理清除
function handleClear() {
  clearResult();
  clearHistoryParam();
}

// 清除错误
function clearError() {
  error.value = null;
}

// 处理重试
function handleRetry() {
  regenerateAI();
}

// 滚动重置函数
async function resetScrollPosition() {
  await nextTick();
  if (pageContainerRef.value) {
    pageContainerRef.value.scrollTop = 0;
  }
  window.scrollTo(0, 0);
}

// 监听占卜类型变化，完全重置状态
watch(
  () => props.divinationType,
  (newType, oldType) => {
    if (!viewingHistory.value && oldType && newType !== oldType) {
      // 完全重置所有状态
      clearResult();
      clearHistoryParam();
      question.value = '';
      followUpQuestion.value = '';
      conversationHistory.value = [];
      error.value = null;
      isCancelled.value = false;
      
      // 使用全面的滚动重置函数
      resetScrollPosition();
      
      // 触发历史记录选中状态重置事件
      eventBus.emit(EVENTS.HISTORY_SELECTION_RESET);
    }
  },
  { immediate: false }
);

// 监听配置变化
watch(config, () => {
    // 配置更新处理
});

// 监听路由变化
watch(
  () => route.query.historyId,
  (newId, oldId) => {
    if (newId && typeof newId === 'string') {
      handleHistoryParam();
    } else if (oldId && !newId) {
      // 从历史记录模式切换到新建模式
            clearResult();
    }
  },
  { immediate: true }
);

// 组件挂载时处理历史记录
onMounted(() => {
  handleHistoryParam();
});
</script>

<style scoped>
/* 页面特定样式 */
.result-header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-6); /* 24px */
}

/* 移动端响应式设计 */
@media (max-width: 768px) {
  .result-header-actions {
    justify-content: flex-start;
    gap: var(--spacing-3); /* 按钮之间的间距 */
    max-width: 100%;
  }
  
}

.error-card {
  text-align: center;
  border-color: var(--color-error);
  background-color: var(--color-error-light, #fee);
}

.error-card .content-text {
  color: var(--color-error);
  margin-bottom: var(--spacing-4); /* 16px */
}

.ai-actions:not(:empty) {
  margin-top: var(--spacing-4);
}

.ai-actions {
  display: flex;
  justify-content: center;
}

.follow-up-card {
 padding: var(--spacing-2);
}

.follow-up-input {
 display: block;
 position: relative;
}

.follow-up-input textarea {
 width: 100%;
 padding: 16px 20px;
 padding-right: 100px; /* 为按钮留出空间 */
 border-radius: 16px;
 background-color: var(--color-bg-secondary);
 color: var(--color-text-primary);
 font-size: 16px;
 line-height: 1.6;
 resize: vertical;
 min-height: 58px;
 transition: border-color 0.2s, box-shadow 0.2s;
}

.follow-up-input textarea:focus {
 outline: none;
 border-color: var(--color-primary-light);
 box-shadow: 0 0 0 4px rgba(var(--color-primary-rgb), 0.1);
}

.follow-up-input button {
 position: absolute;
 right: 8px;
 top: 50%;
 transform: translateY(-50%);
 height: 42px;
 padding: 0 24px;
 border: none;
 background-color: var(--color-primary);
 color: white;
 border-radius: 12px;
 cursor: pointer;
 font-size: 16px;
 font-weight: 600;
 transition: background-color 0.2s;
}

.follow-up-input button:disabled .loading-dots {
 display: block;
}

.follow-up-input button .loading-dots {
 display: none;
}

.follow-up-input button:disabled {
  background-color: var(--color-gray-400);
  cursor: not-allowed;
}

.loading-dots span {
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
