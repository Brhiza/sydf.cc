<template>
  <div class="page-container">
    <!-- 占卜输入组件 -->
    <DivinationInput
      v-if="!result && !isLoading"
      title="今日运势"
      description="基于日家奇门遁甲算法，为您解析今日的整体运势，包含事业、财富、感情、健康等各方面的详细指导"
      button-text="查看今日运势"
      :loading="isLoading"
      :loading-text="loadingTip"
      divination-type="daily"
      :show-inspiration="false"
      @submit="handleSubmit"
      @clear="handleClear"
    />

    <!-- 结果页头操作 -->
    <div v-if="result && !route.query.historyId" class="result-header-actions">
      <button class="btn-secondary" @click="handleClear">← 返回</button>
    </div>

    <!-- 运势结果 -->
    <div v-if="result" class="content-card">
      <div class="section-header">
        <h2 class="section-title">今日运势</h2>
      </div>
      
      <!-- AI加载状态 -->
      <div v-if="isAILoading" class="ai-loading">
        <div class="ai-loading-content">
          <div class="ai-loading-spinner"></div>
          <span>AI大师正在解读运势...</span>
        </div>
      </div>
      
      <div class="fortune-result">
        <!-- 运势内容 -->
        <DailyResult 
          :fortune-data="result" 
          :ai-response="aiResponse" 
          :show-lucky="true"
          :detailed-analysis="parsedDetailedAnalysis"
        />
      </div>
      
      <!-- 开发模式删除按钮 -->
      <div v-if="isDevMode" class="result-actions">
        <button 
          class="btn-danger" 
          @click="deleteTodayFortune"
        >
          🗑️ 删除今日运势
        </button>
      </div>
    </div>

    <!-- AI对话结果显示 - 只显示真正的对话内容，不显示重复的AI解析 -->
    <div v-if="result && hasVisibleConversation" class="content-card">
      <div class="conversation-section">
        <h3 class="section-title">AI对话</h3>
        
        <!-- 对话历史 -->
        <div class="conversation-history">
          <div
            v-for="(message, index) in conversationHistory.filter(m => m.role !== 'system')"
            v-show="shouldShowMessage(message, index)"
            :key="message.id || index"
            class="chat-message"
            :class="`message-${message.role}`"
          >
            <!-- 如果是助手消息且内容为空，则显示加载器 -->
            <div v-if="message.role === 'assistant' && !message.content && (isFollowUpLoading)" class="loading-dots">
              <span></span><span></span><span></span>
            </div>
            <div v-else class="message-content">
              {{ message.content }}
            </div>
          </div>
        </div>
        
        <!-- 错误状态 -->
        <div v-if="error" class="error-state">
          <div class="error-content">
            <div class="error-line-1">哈哈，AI开小差咯</div>
            <div class="error-line-2">{{ error }}</div>
            <div class="error-line-3">
              <button class="retry-button" @click="handleRetry">重新生成解读</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- AI 操作按钮 -->
    <div v-if="result" class="ai-actions">
      <button v-if="isAILoading" class="btn-secondary" @click="cancelGeneration">取消生成</button>
      <button
        v-if="!isAILoading && (error || isCancelled)"
        class="btn-primary"
        @click="handleRetry"
      >
        重新生成
      </button>
    </div>

    <!-- 追问输入卡片 -->
    <div v-if="result && hasAiResponse && !isAILoading" class="content-card follow-up-card">
      <!-- 追问输入框 -->
      <div class="follow-up-input">
        <textarea
          v-model="followUpQuestion"
          placeholder="对今日运势进行追问..."
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
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { DailyLimitService } from '@/services/dailyLimitService';
import { divinationService } from '@/services/divination';
import { historyService } from '@/services/history';
import type { DailyFortuneData } from '@/types/divination';
import type { ChatMessage } from '@/types/chat';
import DivinationInput from '@/components/divination/DivinationInput.vue';
import DailyResult from '@/components/divination/results/DailyResult.vue';

const route = useRoute();

// 响应式数据
const isLoading = ref(false);
const isAILoading = ref(false);
const result = ref<DailyFortuneData | null>(null);
const aiResponse = ref('');
const isFromCache = ref(false);
const error = ref<string | null>(null);
const conversationHistory = ref<ChatMessage[]>([]);
const followUpQuestion = ref('');
const isFollowUpLoading = ref(false);
const isCancelled = ref(false);
const abortController = ref<AbortController | null>(null);

// 加载提示语
const loadingTips = [
  '正在解析天机，请稍候...',
  '奇门遁甲排盘中...',
  'AI大师正在为您解读运势...',
  '正在分析今日吉凶...',
  '正在计算幸运元素...'
];

// 计算属性
const hasAiResponse = computed(() => aiResponse.value !== '');
const loadingTip = computed(() => {
  const randomIndex = Math.floor(Math.random() * loadingTips.length);
  return loadingTips[randomIndex];
});
const isDevMode = computed(() => import.meta.env.DEV);

// 判断是否有可见的对话内容（过滤后的）
const hasVisibleConversation = computed(() => {
  if (conversationHistory.value.length === 0) return false;
  
  // 检查过滤后是否有可见的消息
  const visibleMessages = conversationHistory.value
    .filter(m => m.role !== 'system')
    .filter((message, index) => shouldShowMessage(message, index));
  
  return visibleMessages.length > 0 || isFollowUpLoading.value;
});

// 解析详细分析数据（用于处理用户提供的JSON数据）
const parsedDetailedAnalysis = computed(() => {
  if (!aiResponse.value) return null;
  
  try {
    // 如果AI响应是JSON格式，直接解析
    const trimmedResponse = aiResponse.value.trim();
    if (trimmedResponse.startsWith('{') && trimmedResponse.endsWith('}')) {
      const parsed = JSON.parse(trimmedResponse);
      console.log('解析详细分析数据成功:', parsed);
      return parsed;
    }
    
    // 尝试提取JSON代码块
    const jsonMatch = aiResponse.value.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[1]);
      console.log('从代码块解析详细分析数据成功:', parsed);
      return parsed;
    }
    
    return null;
  } catch (error) {
    console.error('解析详细分析数据失败:', error);
    return null;
  }
});

// 初始化
onMounted(() => {
  DailyLimitService.cleanupExpiredRecord();
  checkTodayFortune();
});

// 检查今日运势
function checkTodayFortune() {
  const todayRecord = historyService.findTodayDailyFortune();
  if (todayRecord) {
    // 如果找到今天的记录，直接显示
    const recordData = todayRecord.result.data as DailyFortuneData;
    
    result.value = recordData;
    aiResponse.value = todayRecord.result.aiResponse || '';
    conversationHistory.value = todayRecord.conversationHistory || [];
    isFromCache.value = true; // 标记为缓存结果
    
    // 确保标记为已使用
    if (!DailyLimitService.hasUsedToday()) {
      DailyLimitService.markAsUsed();
    }
  } else {
    isFromCache.value = false; // 重置缓存状态
    conversationHistory.value = [];
  }
}


// 处理DivinationInput组件的提交事件
function handleSubmit() {
  startDailyFortune();
}

// 开始抽取今日运势
async function startDailyFortune(forceRegenerateAI = false) {
  if (isLoading.value) return;
  
  // 首先检查是否已经有今天的运势记录
  const todayRecord = historyService.findTodayDailyFortune();
  if (todayRecord && !forceRegenerateAI) {
    const recordData = todayRecord.result.data as DailyFortuneData;
    result.value = recordData;
    aiResponse.value = todayRecord.result.aiResponse || '';
    isFromCache.value = true;
    
    // 确保标记为已使用
    if (!DailyLimitService.hasUsedToday()) {
      DailyLimitService.markAsUsed();
    }
    
    return;
  }
  
  // 如果是强制重新生成AI，且已有记录，则使用现有数据
  if (todayRecord && forceRegenerateAI) {
    const recordData = todayRecord.result.data as DailyFortuneData;
    result.value = recordData;
    isFromCache.value = true;
    
    // 设置加载状态，开始重新生成AI解读
    isAILoading.value = true;
    isLoading.value = false;
    aiResponse.value = ''; // 清空之前的AI响应
    
    try {
      // 执行占卜流程，只重新生成AI解读
      await divinationService.startDivination(
        {
          type: 'daily',
          question: '请为我分析今日运势',
          supplementaryInfo: {}
        },
        {
          onInitialResult: () => {
            // 使用现有的占卜结果，不需要更新
            isAILoading.value = true;
          },
          onAIChunk: (chunk) => {
            aiResponse.value += chunk;
          },
          onAIComplete: (finalResult) => {
            aiResponse.value = finalResult.aiResponse || '';
            isAILoading.value = false; // AI解读完成
            isLoading.value = false; // 整体流程完成
            
            // 更新历史记录中的AI响应
            todayRecord.result.aiResponse = finalResult.aiResponse || '';
            historyService.updateRecord(todayRecord.id, todayRecord);
          },
          onAIError: (errorMessage) => {
            isAILoading.value = false;
            isLoading.value = false;
            error.value = errorMessage;
          },
          onConversationUpdate: () => {
            // 今日运势不需要对话历史更新
          }
        }
      );
    } catch (error) {
      isAILoading.value = false;
      isLoading.value = false;
      alert('运势解读失败，请稍后重试');
    }
    
    return;
  }
  
  // 正常的首次生成流程
  isLoading.value = true;
  isAILoading.value = false;
  isFromCache.value = false; // 重置缓存状态，因为这是新的计算
  aiResponse.value = ''; // 清空之前的AI响应
  
  try {
    // 执行占卜流程
    await divinationService.startDivination(
      {
        type: 'daily',
        question: '请为我分析今日运势',
        supplementaryInfo: {}
      },
      {
        onInitialResult: (divinationResult) => {
          result.value = divinationResult.data as DailyFortuneData;
          // 初始结果生成完成，开始AI解读
          isAILoading.value = true;
        },
        onAIChunk: (chunk) => {
          aiResponse.value += chunk;
        },
        onAIComplete: (finalResult) => {
          aiResponse.value = finalResult.aiResponse || '';
          isAILoading.value = false; // AI解读完成
          isLoading.value = false; // 整体流程完成
          
          // 标记已使用
          DailyLimitService.markAsUsed();
        },
        onAIError: (errorMessage) => {
          isAILoading.value = false;
          isLoading.value = false;
          error.value = errorMessage;
        },
        onConversationUpdate: () => {
          // 今日运势不需要对话历史更新
        }
      }
    );
  } catch (error) {
    isAILoading.value = false;
    isLoading.value = false;
    alert('抽取运势失败，请稍后重试');
  }
}




// 删除今日运势（开发模式）
async function deleteTodayFortune() {
  if (!confirm('确定要删除今日运势吗？此操作将清除所有相关数据，不可撤销。')) {
    return;
  }
  
  try {
    // 1. 查找并删除所有今日的历史记录
    const todayRecord = historyService.findTodayDailyFortune();
    if (todayRecord) {
      await historyService.deleteRecord(todayRecord.id);
    }
    
    // 2. 清除所有本地存储相关的数据
    const keysToRemove = [
      'daily_fortune_limit',
      'sydf-history',
      'daily-fortune-cache',
      'today-fortune-result',
      'fortune-cache-' + new Date().toISOString().split('T')[0]
    ];
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
    });
    
    // 3. 清除所有可能的缓存键
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.includes('fortune') || key.includes('daily') || key.includes('cache'))) {
        localStorage.removeItem(key);
      }
    }
    
    // 4. 重置所有响应式状态
    result.value = null;
    aiResponse.value = '';
    isFromCache.value = false;
    isLoading.value = false;
    isAILoading.value = false;
    
    // 5. 重置每日限制服务
    DailyLimitService.resetRecord();
    
    // 6. 强制刷新页面状态
    // 立即重新检查状态
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // 重新检查今日运势状态
    checkTodayFortune();
    
    // 7. 强制触发响应式更新
    await new Promise(resolve => setTimeout(resolve, 100));
    
    alert('今日运势已彻底删除，页面已重置');
  } catch (error) {
    alert('删除失败，请稍后重试');
  }
}

// 处理清除操作
function handleClear() {
  result.value = null;
  aiResponse.value = '';
  isFromCache.value = false;
  isLoading.value = false;
  isAILoading.value = false;
}


// 取消AI生成
function cancelGeneration() {
  if (abortController.value) {
    abortController.value.abort();
    isCancelled.value = true;
    isAILoading.value = false;
    isFollowUpLoading.value = false;
  }
}

// 处理重试
function handleRetry() {
  // 重置错误和取消状态
  error.value = null;
  isCancelled.value = false;
  
  // 如果有结果，重新生成AI解读
  if (result.value) {
    // 保留现有的占卜结果，只重新生成AI解读
    // 使用 forceRegenerateAI 参数强制重新生成AI
    startDailyFortune(true);
  } else {
    // 如果没有结果，重新开始整个流程
    startDailyFortune();
  }
}

// 判断是否应该显示消息（针对今日运势的特殊处理）
function shouldShowMessage(message: ChatMessage, index: number): boolean {
  // 对于今日运势，隐藏第一个用户问题和第一个助手回复
  // 隐藏第一条用户消息（index === 0 且 role === 'user'）
  if (index === 0 && message.role === 'user') {
    return false;
  }
  // 隐藏第一条助手消息（通常是紧接着用户问题的回复）
  if (index === 1 && message.role === 'assistant') {
    return false;
  }
  return true;
}

// 发送追问
function handleSendFollowUp() {
  if (!followUpQuestion.value.trim() || isFollowUpLoading.value || !result.value) return;

  isFollowUpLoading.value = true;
  const currentConversation = [...conversationHistory.value];
  const originalQuestion = followUpQuestion.value.trim();
  followUpQuestion.value = ''; // Clear input immediately

  // 查找今日运势的历史记录ID
  const todayRecord = historyService.findTodayDailyFortune();
  let recordId = '';
  
  if (todayRecord) {
    recordId = todayRecord.id;
  } else {
    // 如果没有找到历史记录，说明记录可能还没有保存，需要等待或创建
    error.value = '占卜记录尚未保存完成，请稍后再试';
    isFollowUpLoading.value = false;
    return;
  }

  divinationService.sendFollowUp(
    recordId,
    currentConversation,
    originalQuestion,
    {
      onChunk: () => {
        // The conversationHistory is updated via the onConversationUpdate callback
      },
      onComplete: () => {
        isFollowUpLoading.value = false;
      },
      onError: (errorMessage) => {
        error.value = errorMessage;
        isFollowUpLoading.value = false;
      },
      onConversationUpdate: (updatedHistory) => {
        conversationHistory.value = updatedHistory;
      },
    }
  );
}
</script>

<style scoped>
/* 页面特定样式 */

/* 章节头部样式 - 参考其他页面 */
.section-header {
  margin-bottom: var(--spacing-6); /* 24px */
  padding-bottom: var(--spacing-4); /* 16px */
  border-bottom: 1px solid var(--color-border);
}

/* 结果页头操作 - 参考其他结果组件 */
.result-header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-6);
}


.btn-danger {
  background: var(--color-danger);
  color: var(--color-text-inverse);
  border: 1px solid var(--color-danger);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
}

.btn-danger:hover {
  background: var(--color-danger-dark);
  border-color: var(--color-danger-dark);
}

/* AI加载状态 - 参考其他组件 */
.ai-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-4);
  margin-bottom: var(--spacing-4);
  background: var(--color-primary-muted);
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-md);
}

.ai-loading-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  font-size: var(--font-size-sm);
  color: var(--color-primary);
}

.ai-loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-primary-muted);
  border-top: 2px solid var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* 结果操作区域 */
.result-actions {
  display: flex;
  justify-content: center;
  margin-top: var(--spacing-6);
}

/* 运势结果样式 */
.fortune-result {
  margin-bottom: var(--spacing-6);
}




/* 响应式设计 */
@media (max-width: 768px) {
  .result-header-actions {
    margin-bottom: var(--spacing-4);
  }

  .ai-loading {
    padding: var(--spacing-3);
    margin-bottom: var(--spacing-3);
  }

}

@media (max-width: 480px) {
  .result-header-actions {
    margin-bottom: var(--spacing-3);
  }

  .ai-loading {
    padding: var(--spacing-2);
    margin-bottom: var(--spacing-2);
  }

  .ai-loading-content {
    font-size: var(--font-size-xs);
    gap: var(--spacing-2);
  }

  .ai-loading-spinner {
    width: 16px;
    height: 16px;
    border-width: 2px;
  }


  .result-actions {
    margin-top: var(--spacing-4);
  }
}

/* 追问输入框样式 */
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

.follow-up-input button:disabled {
  background-color: var(--color-gray-400);
  cursor: not-allowed;
}

.follow-up-input button:hover:not(:disabled) {
  background-color: var(--color-primary-dark);
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

/* 对话历史样式 */
.conversation-section {
  margin-bottom: var(--spacing-6);
}

.conversation-history {
  margin-top: var(--spacing-4);
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

.message-user {
  background-color: var(--color-primary);
  color: white;
  align-self: flex-end;
  border-radius: 18px;
}

.message-user .message-content {
  color: white !important;
}

.message-assistant {
  background-color: var(--color-bg-secondary);
  color: var(--color-text-primary);
  align-self: flex-start;
  border-radius: 18px;
  position: relative;
  padding-bottom: 36px;
}

.message-content {
  white-space: pre-wrap;
  line-height: 1.6;
}

/* 错误状态样式 */
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

.retry-button {
  background: var(--color-primary);
  color: white;
  border: none;
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: var(--font-size-sm);
  transition: background-color 0.2s;
}

.retry-button:hover {
  background: var(--color-primary-dark);
}

/* AI 操作按钮样式 */
.ai-actions:not(:empty) {
  margin-top: var(--spacing-4);
}

.ai-actions {
  display: flex;
  justify-content: center;
  gap: var(--spacing-3);
}

.btn-secondary {
  background: var(--color-bg-secondary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: var(--font-size-sm);
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: var(--color-bg-hover);
  border-color: var(--color-border-hover);
}

.btn-primary {
  background: var(--color-primary);
  color: var(--color-text-inverse);
  border: 1px solid var(--color-primary);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: var(--font-size-sm);
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: var(--color-primary-dark);
  border-color: var(--color-primary-dark);
}

</style>
