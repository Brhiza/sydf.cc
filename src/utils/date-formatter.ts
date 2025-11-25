/**
 * 日期格式化工具
 * 提供统一的日期时间格式化功能
 */

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
  
  if (timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString('zh-CN');
  }
  
  if (timeInfo) {
    // 从 timeInfo 中获取时间信息，如果存在的话
    const year = timeInfo.year || '';
    const month = timeInfo.month || '';
    const day = timeInfo.day || '';
    const hour = timeInfo.hour || '';
    const minute = timeInfo.minute || '';
    return `${year}年${month}月${day}日 ${hour}时${minute}分`;
  }
  
  return '';
}

/**
 * 格式化Unix时间戳为中文日期时间
 */
export function formatTimestamp(timestamp?: number): string {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toLocaleString('zh-CN');
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
