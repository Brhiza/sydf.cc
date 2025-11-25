/**
 * 设置状态管理
 */
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { storageService } from '../services/storageService';

// 定义设置类型
interface UserSettings {
  customApiKey: string;
  customApiEndpoint: string;
  useCustomApi: boolean;
  selectedModel: string;
  availableModels: string[];
}

interface Model {
  id: string;
}

// 默认设置
const DEFAULT_SETTINGS: UserSettings = {
  customApiKey: import.meta.env.VITE_APP_API_KEY || '',
  customApiEndpoint: import.meta.env.VITE_APP_API_ENDPOINT || '',
  useCustomApi: !!import.meta.env.VITE_APP_API_KEY,
  selectedModel: import.meta.env.VITE_APP_DEFAULT_MODEL || '',
  availableModels: [],
};

// 本地存储键名
const SETTINGS_STORAGE_KEY = 'sydf-settings';

/**
 * 设置状态管理Store
 */
export const useSettingsStore = defineStore('settings', () => {
  // 状态
  const settings = ref<UserSettings>({ ...DEFAULT_SETTINGS });
  const error = ref<string | null>(null);
  const isLoadingModels = ref(false);

  /**
   * 加载设置
   */
  function loadSettings() {
    try {
      const savedSettings = storageService.getItem<UserSettings>(SETTINGS_STORAGE_KEY);
      if (savedSettings) {
        settings.value = { ...DEFAULT_SETTINGS, ...savedSettings };
      } else {
        settings.value = { ...DEFAULT_SETTINGS };
      }
    } catch (err) {
      console.error('设置加载失败:', err);
      settings.value = { ...DEFAULT_SETTINGS };
    }
  }

  /**
   * 更新设置
   * @param newSettings 新设置
   */
  function updateSettings(newSettings: Partial<UserSettings>) {
    try {
      const updatedSettings: UserSettings = {
        customApiKey: newSettings.customApiKey ?? settings.value.customApiKey,
        customApiEndpoint: newSettings.customApiEndpoint ?? settings.value.customApiEndpoint,
        useCustomApi: newSettings.useCustomApi ?? settings.value.useCustomApi,
        selectedModel: newSettings.selectedModel ?? settings.value.selectedModel,
        availableModels: newSettings.availableModels ?? settings.value.availableModels,
      };

      // 当关闭自定义API时，重置模型
      if (newSettings.useCustomApi === false) {
        updatedSettings.availableModels = [];
        updatedSettings.selectedModel = '';
      }

      storageService.setItem(SETTINGS_STORAGE_KEY, updatedSettings);
      settings.value = updatedSettings;
    } catch (err) {
      error.value = err instanceof Error ? err.message : '更新设置失败';
      console.error('设置更新错误:', err);
    }
  }

  /**
   * 重置设置为默认值
   */
  function resetSettings() {
    settings.value = { ...DEFAULT_SETTINGS };
    storageService.removeItem(SETTINGS_STORAGE_KEY);
  }

  /**
   * 获取可用模型列表
   * @param endpoint API端点
   * @param apiKey API密钥
   */
  async function fetchAvailableModels(endpoint: string, apiKey: string): Promise<string[]> {
    if (!endpoint || !apiKey) {
      return DEFAULT_SETTINGS.availableModels;
    }

    isLoadingModels.value = true;
    error.value = null;

    try {
      // 统一处理URL，移除路径末尾的/v1/chat/completions或/v1
      const baseUrl = endpoint.replace(/\/v1(\/chat\/completions)?\/?$/, '');
      const modelsUrl = `${baseUrl}/v1/models`;

      
      const response = await fetch(modelsUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.error?.message || `HTTP error! status: ${response.status}`;
        throw new Error(`获取模型列表失败: ${errorMessage}`);
      }

      const data = await response.json();

      if (!data.data || !Array.isArray(data.data)) {
        console.warn('API响应格式不符合预期:', data);
        throw new Error('API响应格式不符合预期');
      }

      const excludedKeywords = ['embedding', 'reranker', 'BAAI', 'bge'];
      const models = data.data
        .map((model: Model) => model.id)
        .filter((id: string) => !excludedKeywords.some(keyword => id.toLowerCase().includes(keyword.toLowerCase())))
        .sort((a: string, b: string) => {
          const getPrefix = (s: string) => s.split(/[-/]/)[0];
          const prefixA = getPrefix(a);
          const prefixB = getPrefix(b);

          if (prefixA !== prefixB) {
            return prefixA.localeCompare(prefixB);
          }
          
          return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
        });

      if (models.length > 0) {
        updateSettings({ availableModels: models });
      }
      
      return models.length > 0 ? models : settings.value.availableModels;
    } catch (err) {
      console.error('获取模型列表失败:', err);
      error.value = err instanceof Error ? err.message : '获取模型列表失败';
      // 在出错时，返回本地存储的或默认的可用模型列表
      return settings.value.availableModels;
    } finally {
      isLoadingModels.value = false;
    }
  }

  // 初始加载设置
  loadSettings();

  return {
    // 状态
    settings,
    error,
    isLoadingModels,

    // 方法
    loadSettings,
    updateSettings,
    resetSettings,
    fetchAvailableModels,
  };
});
