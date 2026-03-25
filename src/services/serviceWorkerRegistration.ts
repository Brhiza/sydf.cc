import { registerSW } from 'virtual:pwa-register';

type RegisterSWHandler = typeof registerSW;
type ReloadPageHandler = () => void;

export function registerAppServiceWorker(
  register: RegisterSWHandler = registerSW,
  reloadPage: ReloadPageHandler = () => window.location.reload()
) {
  let hasTriggeredRefresh = false;
  let updateServiceWorker: ((reloadPage?: boolean) => Promise<void>) | undefined;

  updateServiceWorker = register({
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

  return updateServiceWorker;
}
