import { afterEach, describe, expect, it, vi } from 'vitest';
import { useSsgw } from './useSsgw';

describe('useSsgw', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('圣杯确认后只提交问题和补充信息，不再提交本地签号', async () => {
    vi.useFakeTimers();
    vi.spyOn(Math, 'random').mockReturnValueOnce(0.6).mockReturnValueOnce(0.4);

    const emit = vi.fn();
    const ssgw = useSsgw(emit);

    ssgw.startShaking('心中所想之事', { interpretationStyle: '专业' });
    await vi.advanceTimersByTimeAsync(5100);

    expect(ssgw.showTossResult.value).toBe(true);

    ssgw.tossShengBei();
    await vi.advanceTimersByTimeAsync(4300);

    expect(emit).toHaveBeenCalledWith('submit', {
      question: '心中所想之事',
      supplementaryInfo: { interpretationStyle: '专业' },
    });
    expect(emit.mock.calls[0]?.[1]).not.toHaveProperty('signNumber');
  });
});
