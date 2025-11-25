import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { HistoryRecord } from '@/services/history';
import { historyService } from '@/services/history';

export function useHistoryManager(initialSelectedId: string | null) {
  const router = useRouter();
  const historyRecords = ref<HistoryRecord[]>([]);
  const selectedRecord = ref<HistoryRecord | null>(null);

  /**
   * 加载历史记录
   */
  function loadHistory() {
    historyRecords.value = historyService.getRecords();
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
    if (confirm('确定要清空所有历史记录吗？此操作不可撤销。')) {
      historyService.clearRecords();
      historyRecords.value = [];
      selectedRecord.value = null;
    }
  }

  /**
   * 删除单条历史记录
   * @param id - 记录ID
   */
  function deleteHistoryRecord(id: string) {
    if (confirm('确定要删除这条记录吗？此操作不可撤销。')) {
      historyService.deleteRecord(id);
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
