import { computed } from 'vue';
import type { Ref } from 'vue';
import { formatDateTime, formatGanZhi as formatGanZhiText } from '@/utils/date-formatter';

interface TimeInfo {
  solar?: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
  };
}

interface FormattingData {
  timestamp?: number;
  ganzhi?: {
    year: string;
    month: string;
    day: string;
    hour: string;
  };
  timeInfo?: TimeInfo;
}

export function useResultFormatting(data: Ref<FormattingData>) {
  const formatSolarTime = computed(() => {
    const timeInfoWithSolar = data.value.timeInfo && 'solar' in data.value.timeInfo
      ? (data.value.timeInfo as TimeInfo)
      : undefined;

    if (timeInfoWithSolar?.solar) {
      const { solar } = timeInfoWithSolar;
      return formatDateTime({
        year: String(solar.year),
        month: String(solar.month),
        day: String(solar.day),
        hour: String(solar.hour),
        minute: String(solar.minute),
      });
    }

    return formatDateTime(undefined, data.value.timestamp);
  });

  const formatGanZhi = computed(() => {
    return formatGanZhiText(data.value.ganzhi);
  });

  return {
    formatSolarTime,
    formatGanZhi,
  };
}
