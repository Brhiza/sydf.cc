export interface EndpointConfig {
  endpoint: string;
  apiKey: string | undefined;
  model: string;
}

export interface EndpointResolverSettings {
  useCustomApi: boolean;
  customApiEndpoint?: string;
  customApiKey?: string;
  selectedModel?: string;
}

const DEFAULT_MODEL = 'default-model';
const DEFAULT_ENDPOINT = '/api/ai';

function normalizeCustomEndpoint(rawEndpoint: string): string {
  if (rawEndpoint.endsWith('/v1/chat/completions')) {
    return rawEndpoint;
  }
  if (rawEndpoint.endsWith('/v1')) {
    return `${rawEndpoint}/chat/completions`;
  }
  const cleanEndpoint = rawEndpoint.replace(/\/$/, '');
  return `${cleanEndpoint}/v1/chat/completions`;
}

export function resolveEndpointConfig(
  settings: EndpointResolverSettings,
  modelOverride?: string
): EndpointConfig {
  const { useCustomApi, customApiEndpoint, customApiKey, selectedModel } = settings;

  if (useCustomApi && customApiEndpoint && customApiKey) {
    return {
      endpoint: normalizeCustomEndpoint(customApiEndpoint),
      apiKey: customApiKey,
      model: modelOverride || selectedModel || DEFAULT_MODEL,
    };
  }

  return {
    endpoint: DEFAULT_ENDPOINT,
    apiKey: undefined,
    model: modelOverride || DEFAULT_MODEL,
  };
}
