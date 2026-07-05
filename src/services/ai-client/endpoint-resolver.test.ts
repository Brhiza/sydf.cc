import { describe, expect, it } from 'vitest';
import { resolveCustomModelsEndpoint, resolveEndpointConfig } from './endpoint-resolver';

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

    it('endpoint 带空白和 /v1 尾斜杠时应清理后使用', () => {
      const config = resolveEndpointConfig({
        useCustomApi: true,
        customApiEndpoint: ' https://api.example.com/v1/ ',
        customApiKey: 'sk-xxx',
        selectedModel: 'gpt-4',
      });
      expect(config.endpoint).toBe('https://api.example.com/v1/chat/completions');
    });

    it('允许本机 HTTP 调试端点', () => {
      const config = resolveEndpointConfig({
        useCustomApi: true,
        customApiEndpoint: 'http://localhost:11434/v1',
        customApiKey: 'sk-xxx',
        selectedModel: 'llama3',
      });
      expect(config.endpoint).toBe('http://localhost:11434/v1/chat/completions');
      expect(config.apiKey).toBe('sk-xxx');
    });

    it('清理 endpoint 中的账号密码、查询参数和锚点', () => {
      const config = resolveEndpointConfig({
        useCustomApi: true,
        customApiEndpoint: 'https://user:pass@api.example.com/v1?token=bad#secret',
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

    it('启用自定义但 endpoint 为非本机 HTTP 时回退默认且不携带密钥', () => {
      const config = resolveEndpointConfig({
        useCustomApi: true,
        customApiEndpoint: 'http://api.example.com/v1',
        customApiKey: 'sk-xxx',
        selectedModel: 'gpt-4',
      });
      expect(config.endpoint).toBe('/api/ai');
      expect(config.apiKey).toBeUndefined();
    });

    it('启用自定义但 endpoint 为相对路径时回退默认且不携带密钥', () => {
      const config = resolveEndpointConfig({
        useCustomApi: true,
        customApiEndpoint: '/api/ai',
        customApiKey: 'sk-xxx',
        selectedModel: 'gpt-4',
      });
      expect(config.endpoint).toBe('/api/ai');
      expect(config.apiKey).toBeUndefined();
    });

    it('默认配置下 modelOverride 生效', () => {
      const config = resolveEndpointConfig({ useCustomApi: false }, 'gpt-5-turbo');
      expect(config.model).toBe('gpt-5-turbo');
    });
  });

  describe('resolveCustomModelsEndpoint', () => {
    it('从聊天补全地址解析模型列表地址', () => {
      expect(resolveCustomModelsEndpoint('https://api.example.com/v1/chat/completions')).toBe(
        'https://api.example.com/v1/models'
      );
    });

    it('保留自定义路径前缀并解析模型列表地址', () => {
      expect(resolveCustomModelsEndpoint('https://api.example.com/openai/v1')).toBe(
        'https://api.example.com/openai/v1/models'
      );
    });

    it('不为非本机 HTTP 地址生成模型列表地址', () => {
      expect(resolveCustomModelsEndpoint('http://api.example.com/v1')).toBeNull();
    });
  });
});
