/**
 * 设置组合式API
 */
import { useSettingsStore } from '@/stores/settings';
import { computed } from 'vue';

/**
 * 设置组合式API
 */
export function useSettings() {
  // 获取Store
  const settingsStore = useSettingsStore();

  // 计算属性
  const customApiKey = computed(() => settingsStore.settings.customApiKey);
  const customApiEndpoint = computed(() => settingsStore.settings.customApiEndpoint);
  const useCustomApi = computed(() => settingsStore.settings.useCustomApi);
  const selectedModel = computed(() => settingsStore.settings.selectedModel);
  const availableModels = computed(() => settingsStore.settings.availableModels);
  const isLoadingModels = computed(() => settingsStore.isLoadingModels);
  const error = computed(() => settingsStore.error);

  /**
   * 更新自定义API密钥
   * @param value API密钥
   */
  function updateCustomApiKey(value: string) {
    settingsStore.updateSettings({ customApiKey: value });
  }

  /**
   * 更新自定义API端点
   * @param value API端点
   */
  function updateCustomApiEndpoint(value: string) {
    settingsStore.updateSettings({ customApiEndpoint: value });
  }

  /**
   * 更新是否使用自定义API
   * @param value 是否使用自定义API
   */
  function updateUseCustomApi(value: boolean) {
    settingsStore.updateSettings({ useCustomApi: value });
  }

  /**
   * 更新选择的模型
   * @param value 模型名称
   */
  function updateSelectedModel(value: string) {
    settingsStore.updateSettings({ selectedModel: value });
  }

  /**
   * 获取可用模型列表
   * @param apiEndpoint 可选的API端点，如果不提供则使用store中的设置
   * @param apiKey 可选的API密钥，如果不提供则使用store中的设置
   */
  async function fetchAvailableModels(apiEndpoint?: string, apiKey?: string) {
    return settingsStore.fetchAvailableModels(
      apiEndpoint || settingsStore.settings.customApiEndpoint,
      apiKey || settingsStore.settings.customApiKey
    );
  }

  /**
   * 重置所有设置
   */
  function resetSettings() {
    settingsStore.resetSettings();
  }

  return {
    // 状态
    customApiKey,
    customApiEndpoint,
    useCustomApi,
    selectedModel,
    availableModels,
    isLoadingModels,
    error,

    // 方法
    updateCustomApiKey,
    updateCustomApiEndpoint,
    updateUseCustomApi,
    updateSelectedModel,
    fetchAvailableModels,
    resetSettings,
  };
}
