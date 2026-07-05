import { describe, expect, it, vi } from 'vitest';

vi.mock('virtual:pwa-register', () => ({
  registerSW: vi.fn(),
}));

import {
  registerAppServiceWorker,
  registerServiceWorkerUpdateChecks,
} from './serviceWorkerRegistration';

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

  it('应在页面打开、回到页面和定时任务中主动检查新版本', async () => {
    const update = vi.fn().mockResolvedValue(undefined);
    const serviceWorker = {
      ready: Promise.resolve({ update }),
    };
    const listeners = new Map<string, () => void>();
    const addEventListener = vi.fn((type: string, listener: () => void) => {
      listeners.set(type, listener);
    });
    const documentTarget = {
      visibilityState: 'visible' as DocumentVisibilityState,
      addEventListener,
    };
    const windowTarget = {
      addEventListener,
    };
    let intervalHandler: (() => void) | undefined;
    const setIntervalHandler = vi.fn((handler: () => void) => {
      intervalHandler = handler;
      return 1;
    });

    registerServiceWorkerUpdateChecks({
      intervalMs: 300000,
      serviceWorker,
      documentTarget,
      windowTarget,
      setIntervalHandler,
    });
    await Promise.resolve();

    listeners.get('focus')?.();
    listeners.get('visibilitychange')?.();
    intervalHandler?.();
    await Promise.resolve();

    expect(setIntervalHandler).toHaveBeenCalledWith(expect.any(Function), 300000);
    expect(update).toHaveBeenCalledTimes(4);
  });
});
