export interface AppSettings {
  autoSave: boolean;
  maxHistoryItems: number;
  theme: 'light' | 'dark';
  useCustomApi: boolean;
  customApiKey?: string;
  customApiEndpoint?: string;
}

export const DEFAULT_SETTINGS: AppSettings = {
  autoSave: true,
  maxHistoryItems: 100,
  theme: 'light',
  useCustomApi: false,
};

const MAX_HISTORY_ITEMS_LIMIT = 1000;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value));
}

function resolveOptionalString(value: unknown, fallback?: string): string | undefined {
  return typeof value === 'string' ? value : fallback;
}

export function normalizeAppSettings<T extends AppSettings>(defaults: T, value: unknown): T {
  const raw = isRecord(value) ? value : {};
  const maxHistoryItems = raw.maxHistoryItems;
  const customApiKey = resolveOptionalString(raw.customApiKey, defaults.customApiKey);
  const customApiEndpoint = resolveOptionalString(
    raw.customApiEndpoint,
    defaults.customApiEndpoint
  );
  const normalized: AppSettings = {
    ...defaults,
    autoSave: typeof raw.autoSave === 'boolean' ? raw.autoSave : defaults.autoSave,
    maxHistoryItems:
      Number.isInteger(maxHistoryItems) &&
      Number(maxHistoryItems) > 0 &&
      Number(maxHistoryItems) <= MAX_HISTORY_ITEMS_LIMIT
        ? Number(maxHistoryItems)
        : defaults.maxHistoryItems,
    theme: raw.theme === 'light' || raw.theme === 'dark' ? raw.theme : defaults.theme,
    useCustomApi: typeof raw.useCustomApi === 'boolean' ? raw.useCustomApi : defaults.useCustomApi,
  };

  if (customApiKey !== undefined) {
    normalized.customApiKey = customApiKey;
  }
  if (customApiEndpoint !== undefined) {
    normalized.customApiEndpoint = customApiEndpoint;
  }

  return normalized as T;
}
