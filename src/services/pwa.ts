import { ref } from 'vue';

class PwaService {
  private static instance: PwaService;
  public installable = ref(false);
  private promptTrigger: (() => void) | null = null;

  private constructor() {}

  static getInstance(): PwaService {
    if (!PwaService.instance) {
      PwaService.instance = new PwaService();
    }
    return PwaService.instance;
  }

  setInstallable(isInstallable: boolean) {
    this.installable.value = isInstallable;
  }

  setPromptTrigger(trigger: () => void) {
    this.promptTrigger = trigger;
  }

  triggerPrompt() {
    this.promptTrigger?.();
  }
}

export const pwa = PwaService.getInstance();
