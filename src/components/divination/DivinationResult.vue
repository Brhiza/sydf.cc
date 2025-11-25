<template>
  <div class="content-card">
    <div class="result-header">
      <h2 class="section-title">{{ resultTitle }}</h2>
    </div>

    <div v-if="result.data" class="result-content">
      <!-- 使用对应的结果组件 -->
      <LiuyaoResult v-if="showLiuyaoResult && liuyaoData" :data="liuyaoData" />
      <MeihuaResult v-if="showMeihuaResult && meihuaData" :data="meihuaData" />
      <QimenResult v-if="showQimenResult && qimenData" :data="qimenData" />
      <TarotResult
        v-if="showTarotResult && tarotData && tarotType"
        :cards="tarotData.cards || []"
        :type="tarotType"
        :spread-type="tarotData.spreadType"
        :spread-name="tarotData.spreadName"
        :timestamp="tarotData.timestamp"
        :show-explanation="true"
      />
      <!-- 三山国王灵签使用特殊的组件，不在这里显示 -->
      <SsgwResult v-if="showSsgwResult && ssgwData" :data="ssgwData" />
      <!-- 今日运势结果 -->
      <DailyResult v-if="showDailyResult && dailyData" :fortune-data="dailyData" :ai-response="result.aiResponse || ''" />
    </div>

    <!-- AI解读部分 - 沉浸式显示在排盘结果下方 -->
    <div v-if="conversationHistory.length > 0 || isAiLoading" class="ai-content">
      <div class="ai-header">
        <h3 class="ai-title">{{ aiSectionTitle }}</h3>
      </div>
      <div class="ai-response-content">
        <!-- 对话历史 -->
        <div v-if="conversationHistory.length > 0" class="conversation-history">
          <div
            v-for="(message, index) in conversationHistory.filter(m => m.role !== 'system')"
            v-show="shouldShowMessage(message, index)"
            :key="message.id || index"
            class="chat-message"
            :class="`message-${message.role}`"
          >
            <!-- 如果是助手消息且内容为空，则显示加载器 -->
            <div v-if="message.role === 'assistant' && !unref(message.content) && (isAiLoading || isFollowUpLoading)" class="loading-dots">
              <span></span><span></span><span></span>
            </div>
            <div v-else class="markdown-container">
              <StreamingMarkdown :content="message.content || ''" :is-complete="!(isAiLoading || isFollowUpLoading)" />
            </div>

            <!-- 复制按钮 -->
            <div v-if="message.role === 'assistant' && unref(message.content)" class="copy-button-wrapper">
              <button 
                class="copy-button" 
                :title="copiedMessageId === message.id ? '已复制' : '复制'" 
                :disabled="message.id === lastAssistantMessage?.id && (isAiLoading || isFollowUpLoading)"
                @click="handleCopy(message, $event)"
              >
                <svg v-if="copiedMessageId === message.id" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 固定免责声明 -->
      <div v-if="!isCustomBuild && conversationHistory.length > 0 && !error" class="disclaimer">
        <div class="disclaimer-content">
          <div class="disclaimer-icon">⚠️</div>
          <div class="disclaimer-text">
            请注意：内容完全基于 AI 模型的胡言乱语，旨在利用国产前沿大数据算法提供一种思考和决策的辅助视角，不构成任何形式的建议。请结合您的实际情况，理性参考，自主决策，命运终究掌握在自己手中。
          </div>
        </div>
      </div>
    </div>

    <!-- 错误状态 -->
    <div v-if="error" class="error-state">
      <div class="error-content">
        <div class="error-line-1">哈哈，AI开小差咯</div>
        <div class="error-line-2">{{ error }}</div>
        <div class="error-line-3">
          <slot name="error-actions">
            <button class="retry-button" @click="$emit('retry')">重新生成解读</button>
          </slot>
        </div>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="result-actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import StreamingMarkdown from '@/components/common/StreamingMarkdown.vue';
import type { DivinationType, DivinationResult as DivinationResultType, ChatMessage } from '@/types';
import { computed, unref, ref } from 'vue';
const isCustomBuild = computed(() => import.meta.env.VITE_APP_BUILD_TARGET === 'CUSTOM');
import { useClipboard } from '@/composables/useClipboard';
import { LiuyaoResult, MeihuaResult, QimenResult, SsgwResult, TarotResult, DailyResult } from './results';

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
  retry: [];
}>();

const { copy, copied } = useClipboard();
const copiedMessageId = ref<string | null>(null);

const assistantMessages = computed(() => props.conversationHistory.filter(m => m.role === 'assistant'));
const lastAssistantMessage = computed(() => assistantMessages.value.length > 0 ? assistantMessages.value[assistantMessages.value.length - 1] : null);

function handleCopy(message: ChatMessage, event: MouseEvent) {
  const button = event.currentTarget as HTMLElement;
  const messageElement = button.closest('.chat-message');
  if (!messageElement) return;

  const contentContainer = messageElement.querySelector('.markdown-container');
  if (!contentContainer) return;

  const contentClone = contentContainer.cloneNode(true) as HTMLElement;
  contentClone.querySelectorAll('details').forEach(detailsElement => detailsElement.remove());

  const textToCopy = (contentClone.textContent || '').trim();
  
  copy(textToCopy);
  
  // 使用 watch 来响应 copied 状态的变化
  const unwatch = watch(copied, (isCopied) => {
    if (isCopied) {
      copiedMessageId.value = message.id || null;
      // 2秒后重置 copiedMessageId，而不是 copied 本身
      setTimeout(() => {
        copiedMessageId.value = null;
      }, 2000);
      // 状态更新后立即停止监听，避免不必要的重复触发
      unwatch();
    }
  });
}

const aiSectionTitle = computed(() => {
  const assistantMessages = props.conversationHistory.filter(m => m.role === 'assistant');
  const lastAssistantMessage = assistantMessages[assistantMessages.length - 1];

  // 如果正在加载，并且最后一条助手消息为空，则显示“正在思考”
  if ((props.isAiLoading || props.isFollowUpLoading) && lastAssistantMessage && !unref(lastAssistantMessage.content)) {
    return 'AI正在思考...';
  }
  return 'AI深度解读';
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
    daily: '今日运势结果',
  } as const;

  return type in typeMap ? typeMap[type as keyof typeof typeMap] : '占卜结果';
});

// 根据占卜类型决定显示哪种结果组件
const showLiuyaoResult = computed(() => props.type === 'liuyao');
const showMeihuaResult = computed(() => props.type === 'meihua');
const showQimenResult = computed(() => props.type === 'qimen');
const showTarotResult = computed(() => ['tarot', 'tarot_single'].includes(props.type));
const showSsgwResult = computed(() => props.type === 'ssgw');
const showDailyResult = computed(() => props.type === 'daily');

const tarotData = computed(() => {
  if (showTarotResult.value) {
    return props.result.data as import('@/types').TarotData;
  }
  return null;
});

const liuyaoData = computed(() => {
  if (showLiuyaoResult.value) {
    return props.result.data as import('@/types').LiuyaoData;
  }
  return null;
});

const meihuaData = computed(() => {
  if (showMeihuaResult.value) {
    return props.result.data as import('@/types').MeihuaData;
  }
  return null;
});

const qimenData = computed(() => {
  if (showQimenResult.value) {
    return props.result.data as import('@/types').QimenData;
  }
  return null;
});

const ssgwData = computed(() => {
  if (showSsgwResult.value) {
    return props.result.data as import('@/types').SsgwData;
  }
  return null;
});

const dailyData = computed(() => {
  if (showDailyResult.value) {
    return props.result.data as import('@/types').DailyFortuneData;
  }
  return null;
});

const tarotType = computed(() => {
  if (showTarotResult.value) {
    return props.type as 'tarot' | 'tarot_single';
  }
  return null;
});

// 判断是否应该显示消息
function shouldShowMessage(message: ChatMessage, index: number): boolean {
  // 对于今日运势，隐藏第一个用户问题和第一个助手回复
  if (props.type === 'daily') {
    // 隐藏第一条用户消息（index === 0 且 role === 'user'）
    if (index === 0 && message.role === 'user') {
      return false;
    }
    // 隐藏第一条助手消息（通常是紧接着用户问题的回复）
    if (index === 1 && message.role === 'assistant') {
      return false;
    }
  }
  return true;
}

</script>

<style scoped>
/* 组件特定样式 */
.result-header {
  margin-bottom: var(--spacing-4);
  padding-bottom: var(--spacing-4);
  border-bottom: 1px solid var(--color-border-light);
}

.user-question {
  background: var(--color-background-muted);
  border-radius: 12px;
  padding: 16px 20px;
  margin-top: 16px;
  text-align: left;
}

.question-label {
  font-weight: 600;
  color: var(--color-text-secondary);
  font-size: 0.9em;
}

.question-text {
  color: var(--color-text-primary);
  font-size: 1em;
  line-height: 1.5;
  margin-left: 8px;
}

.result-content {
  margin-bottom: 0;
}

/* AI解读沉浸式样式 - 参考排盘结果样式 */
.ai-content {
  margin-top: 40px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.ai-header {
  margin-bottom: var(--spacing-4);
  padding-bottom: var(--spacing-4);
  border-bottom: 1px solid var(--color-border-light);
}

.ai-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.ai-response-content {
  color: var(--color-text-primary);
  line-height: 1.8;
  font-size: 16px;
}

/* 加载和错误状态 */
.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-6);
  text-align: center;
}

.error-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.error-line-1 {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.error-line-2 {
  font-size: 14px;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.error-line-3 {
  margin-top: 8px;
}

.loading-dots {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 24px; /* 根据字体大小调整 */
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

.error-state {
  color: var(--color-danger);
}

.result-actions {
  display: flex;
  justify-content: center;
  gap: var(--spacing-4);
  margin-top: var(--spacing-4);
}

/* 响应式样式 */
@media (max-width: 768px) {
  .ai-content {
    margin-top: 32px;
    padding: 0;
  }

  .ai-response-content {
    font-size: 15px;
  }
}

.conversation-history {
  margin-top: var(--spacing-6);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.chat-message {
  padding: 12px 18px;
  border-radius: 18px;
  max-width: 90%;
  line-height: 1.7;
  word-wrap: break-word;
  position: relative;
  box-shadow: var(--shadow-sm);
}

/* 强制Markdown渲染器内容样式 */
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
  background-color: var(--color-primary);
  color: white;
  align-self: flex-end;
  border-radius: 18px; /* Symmetrical rounded corners */
}

/* 强制用户消息气泡内的文本颜色为白色，以覆盖Markdown的默认样式 */
.message-user :deep(p),
.message-user :deep(li),
.message-user :deep(span),
.message-user :deep(code),
.message-user :deep(strong),
.message-user :deep(em) {
  color: white !important;
}

.message-assistant {
  background-color: var(--color-bg-secondary);
  color: var(--color-text-primary);
  align-self: flex-start;
  border-radius: 18px; /* Symmetrical rounded corners */
  position: relative;
  padding-bottom: 36px; /* 为复制按钮留出更多空间 */
}

.copy-button-wrapper {
  position: absolute;
  bottom: 10px;
  left: 15px;
  z-index: 10;
}

.markdown-container {
  position: relative;
  z-index: 1;
}

.copy-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  opacity: 0.6;
  transition: opacity 0.2s;
  color: var(--color-text-secondary);
}

.copy-button:hover {
  opacity: 1;
}

.copy-button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.copy-button svg {
  display: block;
}


/* 免责声明样式 */
.disclaimer {
  margin-top: var(--spacing-6);
  padding: var(--spacing-4);
  background: linear-gradient(135deg, var(--color-background-muted) 0%, var(--color-background-muted) 100%);
  border: 1px solid var(--color-border-light);
  border-radius: 12px;
  font-size: 14px;
}

.disclaimer-content {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-3);
  line-height: 1.6;
}

.disclaimer-icon {
  font-size: 18px;
  opacity: 0.8;
  flex-shrink: 0;
  margin-top: 2px;
}

.disclaimer-text {
  color: var(--color-text-secondary);
  font-size: 13px;
  flex: 1;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .disclaimer {
    margin-top: var(--spacing-5);
    padding: var(--spacing-3);
  }
  
  .disclaimer-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--spacing-2);
  }
  
  .disclaimer-icon {
    margin-top: 0;
  }
}
</style>
