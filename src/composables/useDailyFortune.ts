import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { DAILY_LIMIT_STORAGE_KEY, DailyLimitService } from '@/services/dailyLimitService'
import { divinationService } from '@/services/divination'
import { historyService } from '@/services/history'
import {
  buildUpdatedHistoryRecord,
  generateRegeneratedAI,
  regenerateConversationMessage,
} from '@/services/ai-regeneration'
import type { DailyFortuneData } from '@/types/divination'
import type { ChatMessage, ChatMessageRetryTarget } from '@/types/chat'
import type { DivinationResult, SupplementaryInfo } from '@/types/divination'
import type { HistoryRecord } from '@/types/common'
import {
  applyDailyRecordToState,
  clearDailyRecordFromState,
  createFallbackDailyHistoryRecord,
  getDailyDateLabel,
  getDailyPageTitle,
  getDailyStorageKeys,
  getTodayDateString,
  hasVisibleDailyConversation,
  isRequestCancelled,
  type DailyFortuneRecordLike,
} from './useDailyFortune.shared'

interface RouteLike {
  query: Record<string, unknown>
}

interface DailyLimitServiceLike {
  hasUsedToday: () => boolean
  markAsUsed: () => void
  resetRecord: () => void
  cleanupExpiredRecord: () => void
}

interface HistoryServiceLike {
  getRecord?: (id: string) => {
    id: string
    type: 'daily' | string
    question: string
    result: {
      type: 'daily' | string
      data: DailyFortuneData
      aiResponse?: string
      supplementaryInfo?: SupplementaryInfo
    }
    conversationHistory?: ChatMessage[]
    timestamp: number
    summary: string
  } | undefined
  getDailyFortuneForDate: (date: string) => {
    id: string
    type: 'daily'
    question: string
    result: {
      type: 'daily'
      data: DailyFortuneData
      aiResponse?: string
      supplementaryInfo?: SupplementaryInfo
    }
    conversationHistory?: ChatMessage[]
    timestamp: number
    summary: string
  } | undefined
  updateRecord: (id: string, record: unknown) => boolean
  deleteRecord: (id: string) => boolean
  findTodayDailyFortune: () => { id: string } | undefined
}

interface DivinationServiceLike {
  startDivination: typeof divinationService.startDivination
  sendFollowUp: typeof divinationService.sendFollowUp
}

interface UseDailyFortuneOptions {
  route?: RouteLike
  historyService?: HistoryServiceLike
  divinationService?: DivinationServiceLike
  dailyLimitService?: DailyLimitServiceLike
  isDevMode?: boolean
  generateRegeneratedAI?: typeof generateRegeneratedAI
  regenerateConversationMessage?: typeof regenerateConversationMessage
}

export function useDailyFortune(options: UseDailyFortuneOptions = {}) {
  const route = options.route ?? useRoute()
  const currentHistoryService = options.historyService ?? historyService
  const currentDivinationService = options.divinationService ?? divinationService
  const currentDailyLimitService = options.dailyLimitService ?? DailyLimitService
  const currentGenerateRegeneratedAI = options.generateRegeneratedAI ?? generateRegeneratedAI
  const currentRegenerateConversationMessage =
    options.regenerateConversationMessage ?? regenerateConversationMessage

  const selectedDate = ref(getTodayDateString())
  const isLoading = ref(false)
  const isAILoading = ref(false)
  const result = ref<DailyFortuneData | null>(null)
  const aiResponse = ref('')
  const isFromCache = ref(false)
  const error = ref<string | null>(null)
  const conversationHistory = ref<ChatMessage[]>([])
  const followUpQuestion = ref('')
  const isFollowUpLoading = ref(false)
  const isCancelled = ref(false)
  const abortController = ref<AbortController | null>(null)

  const loadingTips = [
    '正在解析天机，请稍候...',
    '奇门遁甲排盘中...',
    'AI大师正在为您解读运势...',
    '正在分析今日吉凶...',
    '正在计算幸运元素...',
  ]

  const hasAiResponse = computed(() => aiResponse.value !== '')
  const pageTitle = computed(() => getDailyPageTitle(selectedDate.value))
  const loadingTip = computed(() => {
    const randomIndex = Math.floor(Math.random() * loadingTips.length)
    return loadingTips[randomIndex]
  })
  const isDevMode = computed(() => options.isDevMode ?? import.meta.env.DEV)
  const hasVisibleConversation = computed(() => {
    return hasVisibleDailyConversation(conversationHistory.value, isFollowUpLoading.value)
  })

  currentDailyLimitService.cleanupExpiredRecord()

  function resetAbortController() {
    abortController.value = null
  }

  function createRequestController() {
    const controller = new AbortController()
    abortController.value = controller
    return controller
  }

  function checkFortuneForDate(date: string) {
    const record = currentHistoryService.getDailyFortuneForDate(date)
    if (record) {
      applyDailyRecordToState(record as DailyFortuneRecordLike, {
        result,
        aiResponse,
        conversationHistory,
        isFromCache,
        error,
        isCancelled,
      })

      if (date === getTodayDateString() && !currentDailyLimitService.hasUsedToday()) {
        currentDailyLimitService.markAsUsed()
      }
    } else {
      clearDailyRecordFromState({
        result,
        aiResponse,
        conversationHistory,
        isFromCache,
        error,
        isCancelled,
      })
    }
  }

  function loadHistoryRecord(historyId: string) {
    const record = currentHistoryService.getRecord?.(historyId)
    if (!record || record.type !== 'daily') {
      return
    }

    applyDailyRecordToState(record as DailyFortuneRecordLike, {
      result,
      aiResponse,
      conversationHistory,
      isFromCache,
      error,
      isCancelled,
    })
    selectedDate.value = record.result.data.date || selectedDate.value
  }

  async function startDailyFortune() {
    if (isLoading.value || isAILoading.value) return

    const date = selectedDate.value
    const record = currentHistoryService.getDailyFortuneForDate(date)

    error.value = null
    isCancelled.value = false

    if (record) {
      applyDailyRecordToState(record as DailyFortuneRecordLike, {
        result,
        aiResponse,
        conversationHistory,
        isFromCache,
        error,
        isCancelled,
      })

      if (date === getTodayDateString() && !currentDailyLimitService.hasUsedToday()) {
        currentDailyLimitService.markAsUsed()
      }

      return
    }

    const requestController = createRequestController()

    isLoading.value = true
    isAILoading.value = false
    isFromCache.value = false
    aiResponse.value = ''
    conversationHistory.value = []

    await currentDivinationService.startDivination(
      {
        type: 'daily',
        question: `请为我分析${date}的运势`,
        supplementaryInfo: { date },
        signal: requestController.signal,
      },
      {
        onInitialResult: (divinationResult: DivinationResult) => {
          if (isRequestCancelled(requestController)) return
          result.value = divinationResult.data as DailyFortuneData
          isLoading.value = false
          isAILoading.value = true
        },
        onAIChunk: (chunk) => {
          if (isRequestCancelled(requestController)) return
          aiResponse.value += chunk
        },
        onAIComplete: (finalResult) => {
          if (isRequestCancelled(requestController)) return
          aiResponse.value = finalResult.aiResponse || ''
          isAILoading.value = false
          isLoading.value = false
          resetAbortController()

          if (date === getTodayDateString()) {
            currentDailyLimitService.markAsUsed()
          }
        },
        onAIError: (errorMessage) => {
          if (isRequestCancelled(requestController)) return
          isAILoading.value = false
          isLoading.value = false
          error.value = errorMessage
          resetAbortController()
        },
        onConversationUpdate: (updatedHistory) => {
          if (isRequestCancelled(requestController)) return
          conversationHistory.value = updatedHistory
        },
      }
    )
  }

  async function deleteTodayFortune() {
    const date = selectedDate.value
    const dateLabel = getDailyDateLabel(date)
    if (!confirm(`确定要删除${dateLabel}运势吗？此操作将清除所有相关数据，不可撤销。`)) {
      return
    }

    try {
      const record = currentHistoryService.getDailyFortuneForDate(date)
      if (record) {
        currentHistoryService.deleteRecord(record.id)
      }

      const keysToRemove = ['sydf-history', ...getDailyStorageKeys(date)]

      if (date === getTodayDateString()) {
        keysToRemove.push(DAILY_LIMIT_STORAGE_KEY)
      }

      keysToRemove.forEach((key) => {
        localStorage.removeItem(key)
      })

      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i)
        if (key && (key.includes('fortune') || key.includes('daily') || key.includes('cache'))) {
          localStorage.removeItem(key)
        }
      }

      handleClear()

      if (date === getTodayDateString()) {
        currentDailyLimitService.resetRecord()
      }

      checkFortuneForDate(date)

      alert(`${dateLabel}运势已彻底删除，页面已重置`)
    } catch {
      alert('删除失败，请稍后重试')
    }
  }

  function handleClear() {
    if (abortController.value) {
      abortController.value.abort()
      resetAbortController()
    }

    clearDailyRecordFromState({
      result,
      aiResponse,
      conversationHistory,
      isFromCache,
      error,
      isCancelled,
    })
    isLoading.value = false
    isAILoading.value = false
    isCancelled.value = false
    error.value = null
    followUpQuestion.value = ''
  }

  function cancelGeneration() {
    if (abortController.value) {
      abortController.value.abort()
      resetAbortController()
      isCancelled.value = true
      isAILoading.value = false
      isLoading.value = false
      isFollowUpLoading.value = false
    }
  }

  function handleRetry(target?: ChatMessageRetryTarget) {
    error.value = null
    isCancelled.value = false

    if (!result.value) {
      void startDailyFortune()
      return
    }

    const record =
      currentHistoryService.getDailyFortuneForDate(selectedDate.value) ||
      (createFallbackDailyHistoryRecord({
        date: selectedDate.value,
        result: result.value,
        aiResponse: aiResponse.value,
        conversationHistory: conversationHistory.value,
      }) as HistoryRecord)

    const requestController = createRequestController()
    isAILoading.value = true
    isLoading.value = false
    if (!target) {
      aiResponse.value = ''
    }
    conversationHistory.value = []

    const regenerationTask = target
      ? currentRegenerateConversationMessage(record, target, {
          signal: requestController.signal,
          onConversationUpdate: (updatedHistory) => {
            if (isRequestCancelled(requestController)) return
            conversationHistory.value = updatedHistory
          },
        })
      : currentGenerateRegeneratedAI(record, {
          signal: requestController.signal,
          onChunk: (chunk) => {
            if (isRequestCancelled(requestController)) return
            aiResponse.value += chunk
          },
          onConversationUpdate: (updatedHistory) => {
            if (isRequestCancelled(requestController)) return
            conversationHistory.value = updatedHistory
          },
        })

    void regenerationTask
      .then((regenerated) => {
        if (isRequestCancelled(requestController)) return
        aiResponse.value = regenerated.aiResponse
        conversationHistory.value = regenerated.conversationHistory
        isAILoading.value = false
        isLoading.value = false
        resetAbortController()
        currentHistoryService.updateRecord(record.id, buildUpdatedHistoryRecord(record, regenerated))
      })
      .catch((regenerationError) => {
        if (isRequestCancelled(requestController)) return
        isAILoading.value = false
        isLoading.value = false
        error.value =
          regenerationError instanceof Error ? regenerationError.message : '重新生成失败，请稍后重试'
        resetAbortController()
      })
  }

  function handleSendFollowUp() {
    if (!followUpQuestion.value.trim() || isFollowUpLoading.value || !result.value) return

    isFollowUpLoading.value = true
    const currentConversation = [...conversationHistory.value]
    const originalQuestion = followUpQuestion.value.trim()
    followUpQuestion.value = ''

    const record = currentHistoryService.getDailyFortuneForDate(selectedDate.value)
    const recordId = record?.id || ''

    if (!recordId) {
      error.value = '占卜记录尚未保存完成，请稍后再试'
      isFollowUpLoading.value = false
      return
    }

    currentDivinationService.sendFollowUp(recordId, currentConversation, originalQuestion, {
      onChunk: () => {
        // 对话历史通过 onConversationUpdate 更新
      },
      onComplete: () => {
        isFollowUpLoading.value = false
      },
      onError: (errorMessage) => {
        error.value = errorMessage
        isFollowUpLoading.value = false
      },
      onConversationUpdate: (updatedHistory) => {
        conversationHistory.value = updatedHistory
      },
    })
  }

  watch(
    () => route.query.historyId,
    (historyId, oldHistoryId) => {
      if (typeof historyId === 'string' && historyId) {
        loadHistoryRecord(historyId)
        return
      }

      if (oldHistoryId && selectedDate.value) {
        checkFortuneForDate(selectedDate.value)
      }
    },
    { immediate: true }
  )

  watch(
    selectedDate,
    (date, oldDate) => {
      if (typeof route.query.historyId === 'string' && route.query.historyId) {
        return
      }

      if (oldDate && oldDate !== date && (isLoading.value || isAILoading.value)) {
        cancelGeneration()
      }
      if (date) {
        checkFortuneForDate(date)
      }
    },
    { immediate: true }
  )

  return {
    route,
    selectedDate,
    isLoading,
    isAILoading,
    result,
    aiResponse,
    isFromCache,
    error,
    conversationHistory,
    followUpQuestion,
    isFollowUpLoading,
    isCancelled,
    hasAiResponse,
    pageTitle,
    loadingTip,
    isDevMode,
    hasVisibleConversation,
    startDailyFortune,
    deleteTodayFortune,
    handleClear,
    cancelGeneration,
    handleRetry,
    handleSendFollowUp,
  }
}
