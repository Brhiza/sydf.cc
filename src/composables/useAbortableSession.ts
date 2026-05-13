import { type Ref, ref } from 'vue';

export interface UseAbortableSessionOptions {
  isCancelled: Ref<boolean>;
}

export function useAbortableSession(options: UseAbortableSessionOptions) {
  const abortController = ref<AbortController | null>(null);

  function createController(): AbortController {
    const controller = new AbortController();
    abortController.value = controller;
    return controller;
  }

  function clearController(abort = false): void {
    if (abort && abortController.value) {
      abortController.value.abort();
    }
    abortController.value = null;
  }

  function cancel(onCancel?: () => void): boolean {
    if (!abortController.value) {
      return false;
    }
    abortController.value.abort();
    abortController.value = null;
    options.isCancelled.value = true;
    onCancel?.();
    return true;
  }

  return {
    abortController,
    createController,
    clearController,
    cancel,
  };
}
