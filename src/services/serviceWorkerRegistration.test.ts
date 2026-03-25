import { describe, expect, it, vi } from 'vitest';

vi.mock('virtual:pwa-register', () => ({
  registerSW: vi.fn(),
}));

import { registerAppServiceWorker } from './serviceWorkerRegistration';

describe('registerAppServiceWorker', () => {
  it('发现新版本时应立即更新并刷新页面', async () => {
    const updateServiceWorker = vi.fn().mockResolvedValue(undefined);
    let onNeedRefresh: (() => void) | undefined;
    const register = vi.fn((options?: { onNeedRefresh?: () => void }) => {
      onNeedRefresh = options?.onNeedRefresh;
      return updateServiceWorker;
    });
    const reloadPage = vi.fn();

    registerAppServiceWorker(register as never, reloadPage);
    onNeedRefresh?.();
    await Promise.resolve();

    expect(register).toHaveBeenCalledWith(
      expect.objectContaining({
        immediate: true,
        onNeedRefresh: expect.any(Function),
      })
    );
    expect(updateServiceWorker).toHaveBeenCalledWith(true);
    expect(reloadPage).toHaveBeenCalledTimes(1);
  });

  it('重复收到刷新通知时只处理一次', async () => {
    let onNeedRefresh: (() => void) | undefined;
    const updateServiceWorker = vi.fn().mockResolvedValue(undefined);
    const register = vi.fn((options?: { onNeedRefresh?: () => void }) => {
      onNeedRefresh = options?.onNeedRefresh;
      return updateServiceWorker;
    });
    const reloadPage = vi.fn();

    registerAppServiceWorker(register as never, reloadPage);
    onNeedRefresh?.();
    onNeedRefresh?.();
    await Promise.resolve();

    expect(updateServiceWorker).toHaveBeenCalledTimes(1);
    expect(reloadPage).toHaveBeenCalledTimes(1);
  });
});
