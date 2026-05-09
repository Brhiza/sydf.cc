import { onMounted } from 'vue';
import { storageService } from '@/services/storageService';

export type FrontendTheme = 'v1' | 'v2';

export const FRONTEND_THEME_STORAGE_KEY = 'frontend-theme';
export const FRONTEND_THEME_CLASS = 'theme-v2';

const QUERY_THEME_KEYS = ['frontend-theme', 'frontendTheme', 'uiTheme', 'themeVersion'];
const V2_VALUES = ['v2', '2', 'theme-v2', 'frontend-v2', 'next'];
const V1_VALUES = ['v1', '1', 'theme-v1', 'frontend-v1', 'default', 'current'];

export function normalizeFrontendTheme(value: unknown): FrontendTheme | null {
  if (typeof value !== 'string') {
    return null;
  }

  const normalizedValue = value.trim().toLowerCase();

  if (V2_VALUES.includes(normalizedValue)) {
    return 'v2';
  }

  if (V1_VALUES.includes(normalizedValue)) {
    return 'v1';
  }

  return null;
}

export function getFrontendThemeFromSearch(search: string): FrontendTheme | null {
  const params = new URLSearchParams(search);

  for (const key of QUERY_THEME_KEYS) {
    const theme = normalizeFrontendTheme(params.get(key));
    if (theme) {
      return theme;
    }
  }

  return null;
}

export function resolveFrontendTheme(options: {
  search?: string;
  storedTheme?: string | null;
  envTheme?: string | null;
} = {}): FrontendTheme {
  return (
    getFrontendThemeFromSearch(options.search || '') ||
    normalizeFrontendTheme(options.storedTheme) ||
    normalizeFrontendTheme(options.envTheme) ||
    'v1'
  );
}

export function applyFrontendTheme(theme: FrontendTheme) {
  document.documentElement.classList.toggle(FRONTEND_THEME_CLASS, theme === 'v2');
  storageService.setItem(FRONTEND_THEME_STORAGE_KEY, theme);
}

export function bootstrapFrontendTheme(options: {
  search?: string;
  storedTheme?: string | null;
  envTheme?: string | null;
} = {}): FrontendTheme {
  const theme = resolveFrontendTheme(options);
  applyFrontendTheme(theme);
  return theme;
}

export function useFrontendTheme() {
  function setFrontendTheme(theme: FrontendTheme) {
    applyFrontendTheme(theme);
  }

  onMounted(() => {
    bootstrapFrontendTheme({
      search: window.location.search,
      storedTheme: storageService.getItem<string>(FRONTEND_THEME_STORAGE_KEY),
      envTheme: import.meta.env.VITE_APP_FRONTEND_THEME,
    });
  });

  return {
    setFrontendTheme,
  };
}
