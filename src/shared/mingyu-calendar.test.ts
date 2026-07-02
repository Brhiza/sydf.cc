import { beforeEach, describe, expect, it, vi } from 'vitest';

const {
  mockGetCurrentTimeInfo,
  mockGetTimeInfo,
  mockFormatTimeDisplay,
  mockGetGanZhiForMonth,
  mockGetGanZhiForYear,
} = vi.hoisted(() => {
  const timeInfo = {
    solar: { year: 2026, month: 3, day: 24, hour: 12, minute: 0 },
    lunar: {
      year: '丙午',
      month: '辛卯',
      day: '丁酉',
      hour: '丙午',
      yearInChinese: '丙午年',
      monthInChinese: '二月',
      dayInChinese: '初六',
      hourInChinese: '午时',
      monthNumber: 2,
      dayNumber: 6,
    },
    ganzhi: { year: '丙午', month: '辛卯', day: '丁酉', hour: '丙午' },
    eightChar: { year: '丙午', month: '辛卯', day: '丁酉', hour: '丙午' },
    jieQi: '春分',
  };

  return {
    mockGetCurrentTimeInfo: vi.fn(() => timeInfo),
    mockGetTimeInfo: vi.fn(() => timeInfo),
    mockFormatTimeDisplay: vi.fn(() => ({
      solar: '公历：2026年3月24日',
      lunar: '农历：二月初六',
      ganzhi: '干支：丙午年 辛卯月 丁酉日 丙午时',
    })),
    mockGetGanZhiForMonth: vi.fn(() => [
      { date: '2026-03-24', ganZhi: '丁酉', lunarDate: '二月初六' },
    ]),
    mockGetGanZhiForYear: vi.fn(() => [{ month: 3, ganZhi: '辛卯' }]),
  };
});

vi.mock('mingyu-core/calendar', () => ({
  LunarUtil: {
    getCurrentTimeInfo: mockGetCurrentTimeInfo,
    getTimeInfo: mockGetTimeInfo,
    formatTimeDisplay: mockFormatTimeDisplay,
    getGanZhiForMonth: mockGetGanZhiForMonth,
    getGanZhiForYear: mockGetGanZhiForYear,
  },
}));

import {
  formatTimeDisplay,
  getCurrentTimeInfo,
  getGanZhiForMonth,
  getGanZhiForYear,
  getTimeInfo,
} from './mingyu-calendar';

describe('mingyu-calendar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('当前时间信息应统一透传给 mingyu-core', () => {
    const result = getCurrentTimeInfo();

    expect(mockGetCurrentTimeInfo).toHaveBeenCalledWith();
    expect(result.jieQi).toBe('春分');
  });

  it('指定时间信息应统一透传给 mingyu-core', () => {
    const date = new Date('2026-03-24T12:00:00+08:00');
    const result = getTimeInfo(date);

    expect(mockGetTimeInfo).toHaveBeenCalledWith(date);
    expect(result.solar.day).toBe(24);
  });

  it('时间展示格式应统一复用 mingyu-core 默认格式', () => {
    const timeInfo = getCurrentTimeInfo();
    const display = formatTimeDisplay(timeInfo);

    expect(mockFormatTimeDisplay).toHaveBeenCalledWith(timeInfo);
    expect(display.solar).toBe('公历：2026年3月24日');
  });

  it('月份和年份干支查询应统一透传给 mingyu-core', () => {
    expect(getGanZhiForMonth(2026, 3)).toEqual([
      { date: '2026-03-24', ganZhi: '丁酉', lunarDate: '二月初六' },
    ]);
    expect(getGanZhiForYear(2026)).toEqual([{ month: 3, ganZhi: '辛卯' }]);

    expect(mockGetGanZhiForMonth).toHaveBeenCalledWith(2026, 3);
    expect(mockGetGanZhiForYear).toHaveBeenCalledWith(2026);
  });
});
