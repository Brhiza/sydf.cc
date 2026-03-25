import { computed, onMounted, onUnmounted, ref } from 'vue'
import { divinationNavItems } from '@/config/divination'
import type { HistoryRecord } from '@/services'
import { eventBus, EVENTS } from '@/utils/eventBus'
import { useHistoryActions } from './useHistoryActions'

export function useSimpleHistoryList() {
  const searchQuery = ref('')
  const selectedType = ref('')
  const showSearch = ref(false)
  const showFilter = ref(false)
  const showMainMenu = ref(false)
  const allRecords = ref<HistoryRecord[]>([])
  const { getHistoryRecords, togglePin, renameRecord, confirmDeleteRecord, confirmClearAllHistory } =
    useHistoryActions()

  const displayRecords = computed(() => {
    let records = allRecords.value

    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase()
      records = records.filter((record) => record.question.toLowerCase().includes(query))
    }

    if (selectedType.value) {
      records = records.filter((record) => record.type === selectedType.value)
    }

    return records
  })

  function loadHistory() {
    allRecords.value = getHistoryRecords()
  }

  function handlePin(recordId: string) {
    if (togglePin(recordId)) {
      loadHistory()
    }
  }

  function handleEdit(recordId: string) {
    const record = allRecords.value.find((item) => item.id === recordId)
    if (record && renameRecord(record)) {
      loadHistory()
    }
  }

  function handleDelete(recordId: string) {
    if (confirmDeleteRecord(recordId)) {
      loadHistory()
    }
  }

  function clearAllHistory() {
    if (confirmClearAllHistory()) {
      loadHistory()
      showMainMenu.value = false
    }
  }

  function toggleSearch() {
    showSearch.value = !showSearch.value
  }

  function toggleFilter() {
    showFilter.value = !showFilter.value
  }

  function toggleMainMenu() {
    showMainMenu.value = !showMainMenu.value
  }

  function getEmptyMessage() {
    if (searchQuery.value || selectedType.value) {
      return '没有找到匹配的历史记录'
    }
    return '暂无历史记录'
  }

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement

    if (showMainMenu.value && !target.closest('.menu-container')) {
      showMainMenu.value = false
    }
  }

  function onHistoryUpdated() {
    loadHistory()
  }

  onMounted(() => {
    loadHistory()
    document.addEventListener('click', handleClickOutside)
    eventBus.on(EVENTS.HISTORY_UPDATED, onHistoryUpdated)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    eventBus.off(EVENTS.HISTORY_UPDATED, onHistoryUpdated)
  })

  return {
    divinationNavItems,
    searchQuery,
    selectedType,
    showSearch,
    showFilter,
    showMainMenu,
    displayRecords,
    toggleSearch,
    toggleFilter,
    toggleMainMenu,
    handlePin,
    handleEdit,
    handleDelete,
    clearAllHistory,
    getEmptyMessage,
  }
}
