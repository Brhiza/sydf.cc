import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const storage = new Map<string, string>();

vi.mock('./storageService', () => ({
  storageService: {
    getItem: (key: string) => {
      const value = storage.get(key);
      return value ? JSON.parse(value) : null;
    },
    setItem: (key: string, value: unknown) => {
      storage.set(key, JSON.stringify(value));
    },
    removeItem: (key: string) => {
      storage.delete(key);
    },
    clear: () => {
      storage.clear();
    },
  },
}));

describe('DailyLimitService', () => {
  beforeEach(() => {
    storage.clear();
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 2, 24, 20, 8, 0));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('markAsUsed 后应记录本地日期键', async () => {
    const { DailyLimitService } = await import('./dailyLimitService');

    DailyLimitService.markAsUsed();

    expect(DailyLimitService.getRecord()).toMatchObject({
      date: '2026-03-24',
      hasUsed: true,
    });
    expect(DailyLimitService.hasUsedToday()).toBe(true);
  });

  it('getTodayStatus 应返回统一格式的使用时间和下次可用时间', async () => {
    const { DailyLimitService } = await import('./dailyLimitService');

    DailyLimitService.markAsUsed();

    expect(DailyLimitService.getTodayStatus()).toEqual({
      hasUsed: true,
      canDraw: false,
      usedTime: '2026年03月24日 20时08分',
      nextAvailableTime: '2026年03月25日 00时00分',
    });
  });

  it('cleanupExpiredRecord 会清理非今日记录', async () => {
    const { DailyLimitService, DAILY_LIMIT_STORAGE_KEY } = await import('./dailyLimitService');

    storage.set(
      DAILY_LIMIT_STORAGE_KEY,
      JSON.stringify({
        date: '2026-03-23',
        hasUsed: true,
        timestamp: new Date(2026, 2, 23, 20, 8, 0).getTime(),
      })
    );

    DailyLimitService.cleanupExpiredRecord();

    expect(DailyLimitService.getRecord()).toEqual({
      date: '',
      hasUsed: false,
      timestamp: 0,
    });
  });
});
