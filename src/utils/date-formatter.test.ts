import { describe, expect, it, vi } from 'vitest';
import {
  createAnchoredDateFromDateKey,
  formatDateOnly,
  formatDateTime,
  formatGanZhi,
  formatTimestamp,
  getMonthDayFromDateKey,
  normalizeDateKey,
} from './date-formatter';

describe('date-formatter', () => {
  it('会按统一格式格式化完整 timeInfo', () => {
    expect(
      formatDateTime({
        year: '2026',
        month: '3',
        day: '4',
        hour: '5',
        minute: '6',
      })
    ).toBe('2026年03月04日 05时06分');
  });

  it('timeInfo 不完整时会回退到 timestamp', () => {
    const timestamp = new Date(2026, 2, 24, 20, 8, 0).getTime();

    expect(
      formatDateTime(
        {
          solarTerm: '春分',
          epoch: '上元',
        },
        timestamp
      )
    ).toBe('2026年03月24日 20时08分');
  });

  it('formatTimestamp 会复用统一的时间格式', () => {
    const timestamp = new Date(2026, 0, 2, 3, 4, 0).getTime();

    expect(formatTimestamp(timestamp)).toBe('2026年01月02日 03时04分');
  });

  it('formatDateOnly 会输出统一日期格式', () => {
    const timestamp = new Date(2026, 0, 2, 3, 4, 0).getTime();

    expect(formatDateOnly(timestamp)).toBe('2026年01月02日');
  });

  it('formatGanZhi 会优先使用 formatted 字段', () => {
    expect(
      formatGanZhi({
        year: '甲子',
        month: '乙丑',
        day: '丙寅',
        hour: '丁卯',
        formatted: '甲子年 乙丑月 丙寅日 丁卯时',
      })
    ).toBe('甲子年 乙丑月 丙寅日 丁卯时');
  });

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
