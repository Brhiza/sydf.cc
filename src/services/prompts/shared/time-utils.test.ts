import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getFormattedTimeInfoForDivination } from './time-utils';

describe('time-utils', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-05-05T12:00:00+08:00'));
  });

  it('会优先使用占卜结果自身的时间戳生成时间信息', async () => {
    const formatted = await getFormattedTimeInfoForDivination({
      timestamp: new Date('2026-03-20T12:00:00+08:00').getTime(),
    } as never);

    expect(formatted).toContain('公历：2026年3月20日');
  });

  it('今日运势只有 date 时也会按目标日期生成时间信息', async () => {
    const formatted = await getFormattedTimeInfoForDivination({
      date: '2026-03-24',
    } as never);

    expect(formatted).toContain('公历：2026年3月24日');
  });

  it('缺少占卜时间时才回退到当前时间', async () => {
    const formatted = await getFormattedTimeInfoForDivination(undefined);

    expect(formatted).toContain('公历：2026年5月5日');
  });
});
