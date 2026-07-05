import { buildErrorFromResponse } from './error-mapper';
import { parseStreamResponse } from './stream-parser';
import type { AIResponse, OpenAIRequestBody } from './types';

const MAX_RETRIES = 3;
const REQUEST_TIMEOUT_MS = 30000;

function getErrorStatus(error: unknown): number | null {
  const status = (error as { status?: unknown })?.status;
  return typeof status === 'number' && Number.isFinite(status) ? status : null;
}

function shouldRetryError(error: unknown): boolean {
  const status = getErrorStatus(error);
  if (status === null) {
    return true;
  }

  return status === 429 || status >= 500;
}

function linkSignals(...signals: (AbortSignal | undefined)[]): AbortSignal {
  const controller = new AbortController();
  for (const signal of signals) {
    if (!signal) continue;
    if (signal.aborted) {
      controller.abort(signal.reason);
      return controller.signal;
    }
    signal.addEventListener('abort', () => controller.abort(signal.reason), {
      signal: controller.signal,
    });
  }
  return controller.signal;
}

async function parseResponse(
  response: Response,
  onChunk?: (chunk: string) => void
): Promise<AIResponse> {
  if (onChunk && response.body) {
    return parseStreamResponse(response, onChunk);
  }
  const data = await response.json();
  const message = data.choices?.[0]?.message;
  return {
    content: message?.content ?? null,
    tool_calls: message?.tool_calls,
    usage: data.usage,
  };
}

export interface SendRequestOptions {
  endpoint: string;
  apiKey?: string;
  body: OpenAIRequestBody;
  signal?: AbortSignal;
  onChunk?: (chunk: string) => void;
}

export async function sendRequestWithRetry({
  endpoint,
  apiKey,
  body,
  signal,
  onChunk,
}: SendRequestOptions): Promise<AIResponse> {
  let lastError: unknown = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
      const requestSignal = signal ? linkSignals(signal, controller.signal) : controller.signal;

      const headers: HeadersInit = { 'Content-Type': 'application/json' };
      if (apiKey) {
        headers['Authorization'] = `Bearer ${apiKey}`;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        signal: requestSignal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw await buildErrorFromResponse(response);
      }

      return await parseResponse(response, onChunk);
    } catch (error) {
      lastError = error;
      if (error instanceof DOMException && error.name === 'AbortError') {
        if (!signal?.aborted) {
          console.error(`AI 请求超时 (${REQUEST_TIMEOUT_MS}ms)`);
          throw new Error('AI 请求超时，请检查网络连接或API端点设置。', {
            cause: error,
          });
        }
        throw error;
      }
      if (attempt < MAX_RETRIES && shouldRetryError(error)) {
        const delay = Math.min(500 * Math.pow(2, attempt - 1), 2000);
        console.debug(`AI服务调用失败，后台自动重试 (${attempt}/${MAX_RETRIES})，${delay}ms后重试`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }

  console.error('AI服务调用失败，所有重试均已用尽:', lastError);
  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}
