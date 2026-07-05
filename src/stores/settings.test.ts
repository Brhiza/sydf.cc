// @vitest-environment jsdom

import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useSettingsStore } from './settings';

describe('settings store', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
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

  it('获取模型列表时应拒绝非本机 HTTP 端点且不发送密钥', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const store = useSettingsStore();

    const models = await store.fetchAvailableModels('http://api.example.com/v1', 'sk-xxx');

    expect(models).toEqual([]);
    expect(store.error).toContain('API 端点必须是 HTTPS 地址');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('获取模型列表时应使用清理后的安全模型地址', async () => {
    const fetchMock = vi.fn(
      async () =>
        new Response(
          JSON.stringify({
            data: [{ id: 'gpt-4o' }],
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }
        )
    );
    vi.stubGlobal('fetch', fetchMock);
    const store = useSettingsStore();

    const models = await store.fetchAvailableModels(
      ' https://api.example.com/v1/chat/completions ',
      'sk-xxx'
    );

    expect(models).toEqual(['gpt-4o']);
    expect(fetchMock).toHaveBeenCalledWith('https://api.example.com/v1/models', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer sk-xxx',
        'Content-Type': 'application/json',
      },
    });
  });
});
