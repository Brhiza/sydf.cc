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
const INSECURE_LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '::1', '[::1]']);

function isSafeCustomApiUrl(url: URL): boolean {
  if (url.protocol === 'https:') {
    return true;
  }

  return url.protocol === 'http:' && INSECURE_LOCAL_HOSTS.has(url.hostname.toLowerCase());
}

function appendApiPath(pathname: string, suffix: 'chat' | 'models'): string {
  const cleanPath = pathname.replace(/\/+$/, '');

  if (cleanPath.endsWith('/v1/chat/completions')) {
    return suffix === 'chat' ? cleanPath : cleanPath.replace(/\/chat\/completions$/, '/models');
  }

  if (cleanPath.endsWith('/v1')) {
    return `${cleanPath}/${suffix === 'chat' ? 'chat/completions' : 'models'}`;
  }

  return `${cleanPath}/v1/${suffix === 'chat' ? 'chat/completions' : 'models'}`;
}

function normalizeCustomEndpoint(rawEndpoint: string, suffix: 'chat' | 'models'): string | null {
  const trimmed = rawEndpoint.trim();
  if (!trimmed) {
    return null;
  }

  try {
    const url = new URL(trimmed);
    if (!isSafeCustomApiUrl(url)) {
      return null;
    }

    url.username = '';
    url.password = '';
    url.search = '';
    url.hash = '';
    url.pathname = appendApiPath(url.pathname, suffix);
    return url.toString();
  } catch {
    return null;
  }
}

export function resolveCustomChatEndpoint(rawEndpoint: string): string | null {
  return normalizeCustomEndpoint(rawEndpoint, 'chat');
}

export function resolveCustomModelsEndpoint(rawEndpoint: string): string | null {
  return normalizeCustomEndpoint(rawEndpoint, 'models');
}

export function resolveEndpointConfig(
  settings: EndpointResolverSettings,
  modelOverride?: string
): EndpointConfig {
  const { useCustomApi, customApiEndpoint, customApiKey, selectedModel } = settings;
  const endpoint = customApiEndpoint ? resolveCustomChatEndpoint(customApiEndpoint) : null;

  if (useCustomApi && endpoint && customApiKey) {
    return {
      endpoint,
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
