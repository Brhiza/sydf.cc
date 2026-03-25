import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useRemoteMeritRecords } from './useRemoteMeritRecords';

describe('useRemoteMeritRecords', () => {
  const fetcher = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('拉取成功后会更新记录和统计值', async () => {
    fetcher.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => [
        { amount: 10, date: '2026-03-24' },
        { amount: 20.5, date: '2026-03-25' },
      ],
    });

    const merit = useRemoteMeritRecords({
      url: 'https://example.com/data.json',
      fetcher,
    });

    await merit.fetchRemoteData();

    expect(merit.records.value).toHaveLength(2);
    expect(merit.totalAmount.value).toBe(30.5);
    expect(merit.recordCount.value).toBe(2);
    expect(merit.averageAmount.value).toBe(15);
  });

  it('空记录时平均值应为 0，避免出现 Infinity', () => {
    const merit = useRemoteMeritRecords({
      url: 'https://example.com/data.json',
      fetcher,
    });

    expect(merit.recordCount.value).toBe(0);
    expect(merit.averageAmount.value).toBe(0);
  });

  it('拉取失败时会记录错误信息', async () => {
    fetcher.mockRejectedValue(new Error('network'));

    const merit = useRemoteMeritRecords({
      url: 'https://example.com/data.json',
      fetcher,
      errorMessage: '获取远程数据失败，使用本地数据',
    });

    await merit.fetchRemoteData();

    expect(merit.dataSource.value.error).toBe('获取远程数据失败，使用本地数据');
    expect(merit.dataSource.value.isLoading).toBe(false);
  });

  it('触摸结束时会触发刷新', async () => {
    fetcher.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => [],
    });

    const merit = useRemoteMeritRecords({
      url: 'https://example.com/data.json',
      fetcher,
    });

    const preventDefault = vi.fn();
    merit.handleTouchEnd({ preventDefault } as unknown as TouchEvent);

    await Promise.resolve();

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });
});
