import { describe, expect, it } from 'vitest';
import { formatDateOnly, formatDateTime, formatGanZhi, formatTimestamp } from './date-formatter';

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
});
