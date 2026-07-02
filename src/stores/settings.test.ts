// @vitest-environment jsdom

import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';
import { useSettingsStore } from './settings';

describe('settings store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  it('加载异常本地设置时应保持默认内置 API 通道', () => {
    localStorage.setItem(
      'sydf-settings',
      JSON.stringify({
        customApiKey: 123,
        customApiEndpoint: {},
        useCustomApi: 'true',
        selectedModel: false,
        availableModels: 'bad-models',
      })
    );

    const store = useSettingsStore();

    expect(store.settings.useCustomApi).toBe(false);
    expect(store.settings.customApiKey).toBe('');
    expect(store.settings.customApiEndpoint).toBe('');
    expect(store.settings.selectedModel).toBe('');
    expect(store.settings.availableModels).toEqual([]);
  });

  it('更新设置时应忽略异常字段并保留可用默认值', () => {
    const store = useSettingsStore();

    store.updateSettings({
      customApiKey: 123,
      customApiEndpoint: {},
      useCustomApi: 'true',
      selectedModel: false,
      availableModels: ['deepseek-chat', 123],
    } as unknown as Parameters<typeof store.updateSettings>[0]);

    expect(store.settings.useCustomApi).toBe(false);
    expect(store.settings.customApiKey).toBe('');
    expect(store.settings.customApiEndpoint).toBe('');
    expect(store.settings.selectedModel).toBe('');
    expect(store.settings.availableModels).toEqual(['deepseek-chat']);
  });
});
