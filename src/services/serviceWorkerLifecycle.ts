export interface ServiceWorkerLifecycleController {
  skipWaiting: () => void;
  claimClients: () => void;
}

export function enableImmediateServiceWorkerActivation(
  controller: ServiceWorkerLifecycleController
): void {
  controller.skipWaiting()
  controller.claimClients()
}
