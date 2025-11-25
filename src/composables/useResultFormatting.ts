import { computed } from 'vue';
import type { Ref } from 'vue';

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
    // 首先尝试使用数据中的timestamp，如果没有则尝试其他时间信息
    const timestamp = data.value.timestamp;
    
    // 如果没有timestamp，尝试从其他字段获取时间信息
    if (!timestamp) {
      // 对于奇门遁甲，尝试从timeInfo中获取
      if ('timeInfo' in data.value && data.value.timeInfo && typeof data.value.timeInfo === 'object' && 'solar' in data.value.timeInfo) {
        const solar = (data.value.timeInfo as TimeInfo).solar;
        if (solar) {
          return `${solar.year}年${solar.month}月${solar.day}日${solar.hour}时${solar.minute}分`;
        }
      }
      
      // 如果都没有时间信息，返回空字符串
      return '';
    }
    
    const time = new Date(timestamp);
    return `${time.getFullYear()}年${
      time.getMonth() + 1
    }月${time.getDate()}日${time.getHours()}时${time.getMinutes()}分`;
  });

  const formatGanZhi = computed(() => {
    if (!data.value.ganzhi) return '';
    const { year, month, day, hour } = data.value.ganzhi;
    return `${year}年 ${month}月 ${day}日 ${hour}时`;
  });

  return {
    formatSolarTime,
    formatGanZhi,
  };
}
