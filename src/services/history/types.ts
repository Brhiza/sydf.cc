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
