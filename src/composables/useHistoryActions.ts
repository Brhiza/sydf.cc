import type { HistoryRecord } from '@/services/history'
import { historyService } from '@/services/history'

interface HistoryServiceLike {
  getRecords: () => HistoryRecord[]
  togglePinRecord: (id: string) => boolean
  renameRecord: (id: string, question: string) => boolean
  deleteRecord: (id: string) => boolean
  clearRecords: () => void
}

interface UseHistoryActionsOptions {
  history?: HistoryServiceLike
}

export function useHistoryActions(options: UseHistoryActionsOptions = {}) {
  const currentHistoryService = options.history ?? historyService

  function getHistoryRecords() {
    return currentHistoryService.getRecords()
  }

  function togglePin(recordId: string) {
    return currentHistoryService.togglePinRecord(recordId)
  }

  function renameRecord(record: Pick<HistoryRecord, 'id' | 'question'>) {
    const newLabel = prompt('修改标签:', record.question)
    if (!newLabel?.trim()) {
      return false
    }

    return currentHistoryService.renameRecord(record.id, newLabel)
  }

  function confirmDeleteRecord(id: string, message = '确定要删除这条记录吗？此操作不可撤销。') {
    if (!confirm(message)) {
      return false
    }

    return currentHistoryService.deleteRecord(id)
  }

  function confirmClearAllHistory(message = '确定要清空所有历史记录吗？此操作不可撤销。') {
    if (!confirm(message)) {
      return false
    }

    currentHistoryService.clearRecords()
    return true
  }

  return {
    getHistoryRecords,
    togglePin,
    renameRecord,
    confirmDeleteRecord,
    confirmClearAllHistory,
  }
}
