import type { DivinationType } from '@/types/divination'
import { formatDateOnly } from '@/utils/date-formatter'

const HISTORY_TYPE_LABELS: Record<DivinationType, string> = {
  liuyao: '六爻',
  meihua: '梅花',
  qimen: '奇门',
  tarot: '塔罗',
  tarot_single: '塔罗',
  ssgw: '灵签',
  daily: '运势',
}

export function getHistoryTypeLabel(type: DivinationType): string {
  return HISTORY_TYPE_LABELS[type] || '未知'
}

export function formatHistoryRecordTime(timestamp: number, mode: 'relative' | 'date' = 'relative'): string {
  if (mode === 'date') {
    return formatDateOnly(timestamp)
  }

  const now = Date.now()
  const diff = now - timestamp
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days < 7) return `${days}天前`

  return formatDateOnly(timestamp)
}
