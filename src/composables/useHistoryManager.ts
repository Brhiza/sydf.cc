import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { HistoryRecord } from '@/services/history';
import { useHistoryActions } from './useHistoryActions';

export function useHistoryManager(initialSelectedId: string | null) {
  const router = useRouter();
  const historyRecords = ref<HistoryRecord[]>([]);
  const selectedRecord = ref<HistoryRecord | null>(null);
  const { getHistoryRecords, confirmClearAllHistory, confirmDeleteRecord } = useHistoryActions();

  /**
   * 加载历史记录
   */
  function loadHistory() {
    historyRecords.value = getHistoryRecords();
    if (initialSelectedId) {
      const record = historyRecords.value.find(r => r.id === initialSelectedId);
      if (record) {
        selectedRecord.value = record;
      } else {
        router.push('/history');
      }
    }
  }

  /**
   * 查看历史记录详情
   * @param record - 历史记录
   */
  function viewHistoryDetail(record: HistoryRecord) {
    router.push(`/divination/${record.type}?historyId=${record.id}`);
  }

  /**
   * 清空所有历史记录
   */
  function clearAllHistory() {
    if (confirmClearAllHistory()) {
      historyRecords.value = [];
      selectedRecord.value = null;
    }
  }

  /**
   * 删除单条历史记录
   * @param id - 记录ID
   */
  function deleteHistoryRecord(id: string) {
    if (confirmDeleteRecord(id)) {
      goBack();
    }
  }

  /**
   * 返回历史记录列表
   */
  function goBack() {
    router.push('/history');
  }

  return {
    historyRecords,
    selectedRecord,
    loadHistory,
    viewHistoryDetail,
    clearAllHistory,
    deleteHistoryRecord,
    goBack,
  };
}
