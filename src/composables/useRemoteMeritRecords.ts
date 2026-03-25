import { computed, ref } from 'vue';
import { formatDateOnly } from '@/utils/date-formatter';

interface MeritRecordBase {
  amount: number;
  date: string;
}

interface FetchResponseLike {
  ok: boolean;
  status: number;
  json: () => Promise<unknown>;
}

type Fetcher = (input: string, init?: RequestInit) => Promise<FetchResponseLike>;

interface UseRemoteMeritRecordsOptions<T extends MeritRecordBase> {
  url: string;
  errorMessage?: string;
  fetcher?: Fetcher;
  mapData?: (data: unknown) => T[];
}

export function useRemoteMeritRecords<T extends MeritRecordBase>(
  options: UseRemoteMeritRecordsOptions<T>
) {
  const fetcher = options.fetcher ?? ((input: string, init?: RequestInit) => fetch(input, init));
  const mapData = options.mapData ?? ((data: unknown) => data as T[]);

  const records = ref<T[]>([]);
  const dataSource = ref({
    url: options.url,
    isLoading: false,
    error: null as string | null,
  });

  const totalAmount = computed(() => {
    const total = records.value.reduce((sum, record) => sum + record.amount, 0);
    return Math.round(total * 100) / 100;
  });

  const recordCount = computed(() => records.value.length);

  const averageAmount = computed(() => {
    if (recordCount.value === 0) {
      return 0;
    }

    return Math.round(totalAmount.value / recordCount.value);
  });

  function formatAmount(amount: number): string {
    return `¥${amount.toLocaleString()}`;
  }

  function formatRecordDate(dateString: string): string {
    const timestamp = new Date(dateString).getTime();
    if (Number.isNaN(timestamp)) {
      return dateString;
    }

    return formatDateOnly(timestamp);
  }

  async function fetchRemoteData() {
    dataSource.value.isLoading = true;
    dataSource.value.error = null;

    try {
      const timestamp = Date.now();
      const urlWithCache = `${dataSource.value.url}?_t=${timestamp}`;
      const response = await fetcher(urlWithCache, { cache: 'no-cache' });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      records.value = mapData(await response.json());
    } catch (error) {
      console.error('获取远程数据失败:', error);
      dataSource.value.error = options.errorMessage || '获取远程数据失败';
    } finally {
      dataSource.value.isLoading = false;
    }
  }

  function handleTouchStart(event: TouchEvent) {
    event.preventDefault();
  }

  function handleTouchEnd(event: TouchEvent) {
    event.preventDefault();
    void fetchRemoteData();
  }

  return {
    records,
    dataSource,
    totalAmount,
    recordCount,
    averageAmount,
    formatAmount,
    formatRecordDate,
    fetchRemoteData,
    handleTouchStart,
    handleTouchEnd,
  };
}
