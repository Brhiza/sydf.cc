import { describe, expect, it, vi } from 'vitest';
import {
  createAnchoredDateFromDateKey,
  getMonthDayFromDateKey,
  normalizeDateKey,
} from './date-formatter';

describe('date-formatter', () => {
  it('normalizeDateKey 会保持 YYYY-MM-DD 字符串稳定，不受时区换日影响', () => {
    expect(normalizeDateKey('2026-03-25')).toBe('2026-03-25');
    expect(getMonthDayFromDateKey('2026-03-25')).toEqual({ month: 3, day: 25 });
  });

  it('createAnchoredDateFromDateKey 会把日期锚定到本地中午，避免跨时区跨日', () => {
    const anchoredDate = createAnchoredDateFromDateKey('2026-03-25');

    expect(anchoredDate).not.toBeNull();
    expect(anchoredDate?.getFullYear()).toBe(2026);
    expect(anchoredDate?.getMonth()).toBe(2);
    expect(anchoredDate?.getDate()).toBe(25);
    expect(anchoredDate?.getHours()).toBe(12);
    expect(createAnchoredDateFromDateKey('2026-02-30')).toBeNull();
  });

  it('getMonthDayFromDateKey 遇到无效日期时应回到当前日期，避免展示 NaN', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 6, 2, 9, 0, 0));

    try {
      expect(getMonthDayFromDateKey('2026-02-30')).toEqual({ month: 7, day: 2 });
    } finally {
      vi.useRealTimers();
    }
  });
});
