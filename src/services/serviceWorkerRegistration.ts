import { registerSW } from 'virtual:pwa-register';

type RegisterSWHandler = typeof registerSW;
type ReloadPageHandler = () => void;

const DEFAULT_UPDATE_CHECK_INTERVAL_MS = 5 * 60 * 1000;

interface ServiceWorkerUpdateRegistration {
  update: () => void | Promise<unknown>;
}

interface ServiceWorkerUpdateContainer {
  ready: Promise<ServiceWorkerUpdateRegistration>;
}

interface UpdateCheckEventTarget {
  addEventListener: (type: string, listener: () => void) => void;
}

interface UpdateCheckDocumentTarget extends UpdateCheckEventTarget {
  visibilityState?: DocumentVisibilityState;
}

interface ServiceWorkerUpdateCheckOptions {
  intervalMs?: number;
  serviceWorker?: ServiceWorkerUpdateContainer;
  documentTarget?: UpdateCheckDocumentTarget;
  windowTarget?: UpdateCheckEventTarget;
  setIntervalHandler?: (handler: () => void, timeout: number) => unknown;
}

function getServiceWorkerContainer(): ServiceWorkerUpdateContainer | undefined {
  if (typeof navigator === 'undefined' || !navigator.serviceWorker) {
    return undefined;
  }

  return navigator.serviceWorker;
}

function checkServiceWorkerUpdate(serviceWorker: ServiceWorkerUpdateContainer): void {
  void serviceWorker.ready
    .then((registration) => registration.update())
    .catch(() => {
      // 更新检查失败不影响用户继续使用，下一次检查会再次尝试。
    });
}

export function registerServiceWorkerUpdateChecks({
  intervalMs = DEFAULT_UPDATE_CHECK_INTERVAL_MS,
  serviceWorker = getServiceWorkerContainer(),
  documentTarget = typeof document === 'undefined' ? undefined : document,
  windowTarget = typeof window === 'undefined' ? undefined : window,
  setIntervalHandler = typeof window === 'undefined' ? undefined : window.setInterval.bind(window),
}: ServiceWorkerUpdateCheckOptions = {}): void {
  if (!serviceWorker) {
    return;
  }

  const checkForUpdate = () => checkServiceWorkerUpdate(serviceWorker);

  checkForUpdate();

  if (intervalMs > 0 && setIntervalHandler) {
    setIntervalHandler(checkForUpdate, intervalMs);
  }

  windowTarget?.addEventListener('focus', checkForUpdate);
  documentTarget?.addEventListener('visibilitychange', () => {
    if (!documentTarget.visibilityState || documentTarget.visibilityState === 'visible') {
      checkForUpdate();
    }
  });
}

export function registerAppServiceWorker(
  register: RegisterSWHandler = registerSW,
  reloadPage: ReloadPageHandler = () => window.location.reload()
) {
  let hasTriggeredRefresh = false;

  const updateServiceWorker = register({
    immediate: true,
    onOfflineReady() {
      // 应用已准备好离线使用
    },
    onNeedRefresh() {
      if (hasTriggeredRefresh || !updateServiceWorker) {
        return;
      }

      hasTriggeredRefresh = true;
      void updateServiceWorker(true).finally(() => {
        reloadPage();
      });
    },
  });

  registerServiceWorkerUpdateChecks();

  return updateServiceWorker;
}
