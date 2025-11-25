import { ref, onMounted, onUnmounted } from 'vue';
import { storageService } from '@/services/storageService';

type ThemeType = 'light' | 'dark' | 'auto';

interface ThemeConfig {
  text: string;
  icon: string;
}

export interface ThemeComposable {
  currentTheme: ReturnType<typeof ref<ThemeType>>;
  themeConfig: ReturnType<typeof ref<ThemeConfig>>;
  toggleTheme: () => void;
  setTheme: (theme: ThemeType) => void;
  getAvailableThemes: () => Array<{ type: ThemeType; text: string; icon: string }>;
}

export function useTheme(): ThemeComposable {
  const currentTheme = ref<ThemeType>('auto');
  const themeConfig = ref<ThemeConfig>({
    text: '自动主题',
    icon: '🌓'
  });

  // 检查系统主题偏好
  function checkSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  // 获取当前有效主题（考虑auto模式）
  function getEffectiveTheme(): 'light' | 'dark' {
    if (currentTheme.value === 'auto') {
      return checkSystemTheme() ? 'dark' : 'light';
    }
    return currentTheme.value;
  }

  // 应用主题
  function applyTheme(theme: 'light' | 'dark') {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // 更新PWA主题色
    updatePwaThemeColor(theme);
    
    // 通知Service Worker主题变更
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        registration.active?.postMessage({
          type: 'THEME_CHANGE',
          theme: theme
        });
      });
    }
  }

  // 更新PWA主题色
  function updatePwaThemeColor(theme: 'light' | 'dark') {
    // 更新meta标签中的主题色
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      const themeColor = theme === 'dark' ? '#191a1b' : '#ffffff';
      themeColorMeta.setAttribute('content', themeColor);
    }
    
    // 更新Apple主题色
    const appleThemeColorMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
    if (appleThemeColorMeta) {
      if (theme === 'dark') {
        appleThemeColorMeta.setAttribute('content', 'black-translucent');
      } else {
        appleThemeColorMeta.setAttribute('content', 'default');
      }
    }
  }

  // 切换主题（循环切换：auto -> light -> dark -> auto）
  function toggleTheme() {
    const themes: ThemeType[] = ['auto', 'light', 'dark'];
    const currentIndex = themes.indexOf(currentTheme.value);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  }

  // 设置主题
  function setTheme(theme: ThemeType) {
    currentTheme.value = theme;
    
    // 应用当前有效主题
    const effectiveTheme = getEffectiveTheme();
    applyTheme(effectiveTheme);
    
    // 更新显示配置
    updateThemeConfig();
    
    // 保存到存储
    storageService.setItem('theme', theme);
  }

  // 更新主题配置显示
  function updateThemeConfig() {
    const themeInfo = {
      auto: { text: '自动主题', icon: '🌓' },
      light: { text: '浅色主题', icon: '☀️' },
      dark: { text: '深色主题', icon: '🌙' }
    };
    
    const info = themeInfo[currentTheme.value];
    themeConfig.value = {
      text: info.text,
      icon: info.icon
    };
  }

  // 获取可用主题列表
  function getAvailableThemes(): Array<{ type: ThemeType; text: string; icon: string }> {
    return [
      { type: 'auto', text: '自动主题', icon: '🔄' },
      { type: 'light', text: '浅色主题', icon: '☀️' },
      { type: 'dark', text: '深色主题', icon: '🌙' }
    ];
  }

  onMounted(() => {
    // 初始化主题
    const savedTheme = storageService.getItem<string>('theme') as ThemeType | null;
    if (savedTheme && ['light', 'dark', 'auto'].includes(savedTheme)) {
      currentTheme.value = savedTheme;
    } else {
      // 默认使用自动模式
      currentTheme.value = 'auto';
    }
    
    // 应用当前有效主题
    const effectiveTheme = getEffectiveTheme();
    applyTheme(effectiveTheme);
    
    // 更新显示配置
    updateThemeConfig();
    
    // 监听系统主题变化（仅在auto模式下）
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e: MediaQueryListEvent) => {
      if (currentTheme.value === 'auto') {
        // 使用事件对象获取新的匹配状态
        const newTheme = e.matches ? 'dark' : 'light';
        applyTheme(newTheme);
      }
    };
    mediaQuery.addEventListener('change', handleThemeChange);
    
    // 清理函数
    onUnmounted(() => {
      mediaQuery.removeEventListener('change', handleThemeChange);
    });
  });

  return {
    currentTheme,
    themeConfig,
    toggleTheme,
    setTheme,
    getAvailableThemes
  };
}
