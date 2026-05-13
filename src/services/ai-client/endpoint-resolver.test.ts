import { describe, expect, it } from 'vitest';
import { resolveEndpointConfig } from './endpoint-resolver';

describe('resolveEndpointConfig', () => {
  describe('自定义 API', () => {
    it('endpoint 已包含 /v1/chat/completions 时直接使用', () => {
      const config = resolveEndpointConfig({
        useCustomApi: true,
        customApiEndpoint: 'https://api.example.com/v1/chat/completions',
        customApiKey: 'sk-xxx',
        selectedModel: 'gpt-4',
      });
      expect(config.endpoint).toBe('https://api.example.com/v1/chat/completions');
      expect(config.apiKey).toBe('sk-xxx');
      expect(config.model).toBe('gpt-4');
    });

    it('endpoint 以 /v1 结尾时追加 /chat/completions', () => {
      const config = resolveEndpointConfig({
        useCustomApi: true,
        customApiEndpoint: 'https://api.example.com/v1',
        customApiKey: 'sk-xxx',
        selectedModel: 'gpt-4',
      });
      expect(config.endpoint).toBe('https://api.example.com/v1/chat/completions');
    });

    it('endpoint 既不带 /v1 也不带尾斜杠时拼上完整路径', () => {
      const config = resolveEndpointConfig({
        useCustomApi: true,
        customApiEndpoint: 'https://api.example.com',
        customApiKey: 'sk-xxx',
        selectedModel: 'gpt-4',
      });
      expect(config.endpoint).toBe('https://api.example.com/v1/chat/completions');
    });

    it('endpoint 末尾有斜杠时先去掉再拼接', () => {
      const config = resolveEndpointConfig({
        useCustomApi: true,
        customApiEndpoint: 'https://api.example.com/',
        customApiKey: 'sk-xxx',
        selectedModel: 'gpt-4',
      });
      expect(config.endpoint).toBe('https://api.example.com/v1/chat/completions');
    });

    it('modelOverride 优先于 selectedModel', () => {
      const config = resolveEndpointConfig(
        {
          useCustomApi: true,
          customApiEndpoint: 'https://api.example.com/v1',
          customApiKey: 'sk-xxx',
          selectedModel: 'gpt-4',
        },
        'claude-opus-4'
      );
      expect(config.model).toBe('claude-opus-4');
    });

    it('selectedModel 为空时退回 default-model', () => {
      const config = resolveEndpointConfig({
        useCustomApi: true,
        customApiEndpoint: 'https://api.example.com/v1',
        customApiKey: 'sk-xxx',
      });
      expect(config.model).toBe('default-model');
    });
  });

  describe('默认配置', () => {
    it('未启用自定义 API 时使用 /api/ai', () => {
      const config = resolveEndpointConfig({
        useCustomApi: false,
        customApiEndpoint: 'https://api.example.com/v1',
        customApiKey: 'sk-xxx',
        selectedModel: 'gpt-4',
      });
      expect(config.endpoint).toBe('/api/ai');
      expect(config.apiKey).toBeUndefined();
      expect(config.model).toBe('default-model');
    });

    it('启用自定义但缺少 endpoint 时回退默认', () => {
      const config = resolveEndpointConfig({
        useCustomApi: true,
        customApiKey: 'sk-xxx',
      });
      expect(config.endpoint).toBe('/api/ai');
      expect(config.apiKey).toBeUndefined();
    });

    it('启用自定义但缺少 apiKey 时回退默认', () => {
      const config = resolveEndpointConfig({
        useCustomApi: true,
        customApiEndpoint: 'https://api.example.com/v1',
      });
      expect(config.endpoint).toBe('/api/ai');
      expect(config.apiKey).toBeUndefined();
    });

    it('默认配置下 modelOverride 生效', () => {
      const config = resolveEndpointConfig(
        { useCustomApi: false },
        'gpt-5-turbo'
      );
      expect(config.model).toBe('gpt-5-turbo');
    });
  });
});
