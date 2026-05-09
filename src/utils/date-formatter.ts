/**
 * 日期格式化工具
 * 提供统一的日期时间格式化功能
 */

function pad2(value: number | string): string {
  return String(value).padStart(2, '0');
}

function isDateKey(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function formatDateParts(
  year: number | string,
  month: number | string,
  day: number | string,
  hour: number | string,
  minute: number | string
): string {
  return `${year}年${pad2(month)}月${pad2(day)}日 ${pad2(hour)}时${pad2(minute)}分`;
}

export function formatLocalDateKey(date: Date = new Date()): string {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

export function createAnchoredDateFromDateKey(value: string): Date | null {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const anchoredDate = new Date(year, month - 1, day, 12, 0, 0, 0);

  if (
    anchoredDate.getFullYear() !== year ||
    anchoredDate.getMonth() !== month - 1 ||
    anchoredDate.getDate() !== day
  ) {
    return null;
  }

  return anchoredDate;
}

export function normalizeDateKey(value: string | Date): string {
  if (value instanceof Date) {
    return formatLocalDateKey(value);
  }

  if (isDateKey(value)) {
    return value;
  }

  const parsedDate = new Date(value);
  if (!Number.isNaN(parsedDate.getTime())) {
    return formatLocalDateKey(parsedDate);
  }

  return value;
}

export function getMonthDayFromDateKey(value: string | Date): { month: number; day: number } {
  const dateKey = normalizeDateKey(value);
  const match = dateKey.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (match) {
    return {
      month: Number(match[2]),
      day: Number(match[3]),
    };
  }

  const fallbackDate = value instanceof Date ? value : new Date(value);
  return {
    month: fallbackDate.getMonth() + 1,
    day: fallbackDate.getDate(),
  };
}

export function getStartOfTomorrow(date: Date = new Date()): Date {
  const tomorrow = new Date(date);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
}

/**
 * 格式化干支信息
 */
export function formatGanZhi(ganzhi: { year: string; month: string; day: string; hour: string; formatted?: string } | undefined): string {
  if (!ganzhi) return '';
  // 如果有formatted字段，直接使用；否则按照标准格式拼接
  if (ganzhi.formatted) {
    return ganzhi.formatted;
  }
  return `${ganzhi.year}年 ${ganzhi.month}月 ${ganzhi.day}日 ${ganzhi.hour}时`;
}

/**
 * 格式化时间信息
 */
export function formatDateTime(timeInfo: { [key: string]: string } | undefined, timestamp?: number): string {
  if (!timeInfo && !timestamp) return '';

  if (timeInfo) {
    // 从 timeInfo 中获取时间信息，如果存在的话
    const year = timeInfo.year || '';
    const month = timeInfo.month || '';
    const day = timeInfo.day || '';
    const hour = timeInfo.hour || '';
    const minute = timeInfo.minute || '';

    if (year && month && day && hour && minute) {
      return formatDateParts(year, month, day, hour, minute);
    }
  }

  if (timestamp) {
    const date = new Date(timestamp);
    return formatDateParts(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes()
    );
  }

  if (timeInfo) {
    const year = timeInfo.year || '';
    const month = timeInfo.month || '';
    const day = timeInfo.day || '';
    const hour = timeInfo.hour || '';
    const minute = timeInfo.minute || '';
    return formatDateParts(year, month || '00', day || '00', hour || '00', minute || '00');
  }

  return '';
}

/**
 * 格式化日期为 YYYY年MM月DD日
 */
export function formatDateOnly(timestamp?: number): string {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return `${date.getFullYear()}年${pad2(date.getMonth() + 1)}月${pad2(date.getDate())}日`;
}

/**
 * 格式化Unix时间戳为中文日期时间
 */
export function formatTimestamp(timestamp?: number): string {
  if (!timestamp) return '';
  return formatDateTime(undefined, timestamp);
}

/**
 * 格式化时间差
 */
export function formatTimeAgo(timestamp: number): string {
  if (!timestamp) return '';
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (days > 0) {
    return `${days}天前`;
  } else if (hours > 0) {
    return `${hours}小时前`;
  } else if (minutes > 0) {
    return `${minutes}分钟前`;
  } else {
    return '刚刚';
  }
}
