import { beforeEach, describe, expect, it, vi } from 'vitest'
import { formatHistoryRecordTime, getHistoryTypeLabel } from './history-record'

describe('history-record', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-25T12:00:00+08:00'))
  })

  it('会返回统一的类型标签', () => {
    expect(getHistoryTypeLabel('qimen')).toBe('奇门')
    expect(getHistoryTypeLabel('daily')).toBe('运势')
  })

  it('默认使用相对时间', () => {
    const tenMinutesAgo = new Date('2026-03-25T11:50:00+08:00').getTime()
    expect(formatHistoryRecordTime(tenMinutesAgo)).toBe('10分钟前')
  })

  it('指定 date 模式时返回日期', () => {
    const timestamp = new Date('2026-03-01T08:30:00+08:00').getTime()
    expect(formatHistoryRecordTime(timestamp, 'date')).toBe('2026年03月01日')
  })
})
