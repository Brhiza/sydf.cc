import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { HistoryRecord } from '@/services/history';
import { buildHistoryResultPath } from '@/utils/history-navigation';
import { useHistoryActions } from './useHistoryActions';

export function useHistoryManager() {
  const router = useRouter();
  const historyRecords = ref<HistoryRecord[]>([]);
  const { getHistoryRecords, confirmClearAllHistory } = useHistoryActions();

  /**
   * 加载历史记录
   */
  function loadHistory() {
    historyRecords.value = getHistoryRecords();
  }

  /**
   * 查看历史记录详情
   * @param record - 历史记录
   */
  function viewHistoryDetail(record: HistoryRecord) {
    router.push(buildHistoryResultPath(record.type, record.id));
  }

  /**
   * 清空所有历史记录
   */
  function clearAllHistory() {
    if (confirmClearAllHistory()) {
      historyRecords.value = [];
    }
  }

  return {
    historyRecords,
    loadHistory,
    viewHistoryDetail,
    clearAllHistory,
  };
}
