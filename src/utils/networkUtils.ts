/**
 * 网络请求工具类
 * 提供重试机制、请求取消、超时控制等功能
 */

interface RequestOptions extends RequestInit {
  timeout?: number;
  retryCount?: number;
  retryDelay?: number;
  signal?: AbortSignal;
}

interface NetworkResponse<T = unknown> {
  data: T;
  status: number;
  headers: Headers;
  ok: boolean;
}

class NetworkUtils {
  private static readonly DEFAULT_TIMEOUT = 30000; // 30秒
  private static readonly DEFAULT_RETRY_COUNT = 3;
  private static readonly DEFAULT_RETRY_DELAY = 1000;

  /**
   * 带重试机制的fetch请求
   * @param url 请求URL
   * @param options 请求选项
   * @returns Promise<NetworkResponse>
   */
  static async fetchWithRetry<T = unknown>(
    url: string,
    options: RequestOptions = {}
  ): Promise<NetworkResponse<T>> {
    const {
      timeout = this.DEFAULT_TIMEOUT,
      retryCount = this.DEFAULT_RETRY_COUNT,
      retryDelay = this.DEFAULT_RETRY_DELAY,
      signal,
      ...fetchOptions
    } = options;

    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= retryCount; attempt++) {
      let timeoutId: NodeJS.Timeout | undefined;
      
      try {
        // 创建超时控制器
        const timeoutController = new AbortController();
        timeoutId = setTimeout(() => timeoutController.abort(), timeout);

        // 合并信号
        const combinedSignal = signal ? 
          AbortSignal.any([signal, timeoutController.signal]) : 
          timeoutController.signal;

        const response = await fetch(url, {
          ...fetchOptions,
          signal: combinedSignal
        });

        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        return {
          data,
          status: response.status,
          headers: response.headers,
          ok: response.ok
        };

      } catch (error) {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        lastError = error as Error;

        // 如果是取消信号，直接抛出错误
        if (error instanceof Error && error.name === 'AbortError') {
          throw error;
        }

        // 如果是最后一次尝试，抛出错误
        if (attempt === retryCount) {
          throw lastError;
        }

        // 指数退避重试
        const delay = retryDelay * Math.pow(2, attempt - 1);
        await this.delay(delay);
        
        console.warn(`请求失败，${delay}ms后进行第${attempt + 1}次重试:`, error);
      }
    }

    throw lastError || new Error('请求失败');
  }

  /**
   * 流式请求处理
   * @param url 请求URL
   * @param options 请求选项
   * @param onChunk 数据块回调
   * @param onComplete 完成回调
   * @param onError 错误回调
   */
  static async fetchStream<T = unknown>(
    url: string,
    options: RequestOptions = {},
    onChunk?: (chunk: T) => void,
    onComplete?: (data: T[]) => void,
    onError?: (error: Error) => void
  ): Promise<void> {
    const {
      timeout = this.DEFAULT_TIMEOUT,
      retryCount = this.DEFAULT_RETRY_COUNT,
      retryDelay = this.DEFAULT_RETRY_DELAY,
      signal,
      ...fetchOptions
    } = options;

    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= retryCount; attempt++) {
      let timeoutId: NodeJS.Timeout | undefined;
      
      try {
        const timeoutController = new AbortController();
        timeoutId = setTimeout(() => timeoutController.abort(), timeout);

        const combinedSignal = signal ? 
          AbortSignal.any([signal, timeoutController.signal]) : 
          timeoutController.signal;

        const response = await fetch(url, {
          ...fetchOptions,
          signal: combinedSignal
        });

        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        if (!response.body) {
          throw new Error('响应体为空');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        const chunks: T[] = [];

        while (true) {
          const { done, value } = await reader.read();
          
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const parsedChunk = this.parseChunk<T>(chunk);
          
          if (parsedChunk) {
            chunks.push(parsedChunk);
            onChunk?.(parsedChunk);
          }
        }

        onComplete?.(chunks);
        return;

      } catch (error) {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        lastError = error as Error;

        if (error instanceof Error && error.name === 'AbortError') {
          onError?.(error);
          throw error;
        }

        if (attempt === retryCount) {
          onError?.(lastError);
          throw lastError;
        }

        const delay = retryDelay * Math.pow(2, attempt - 1);
        await this.delay(delay);
        
        console.warn(`流式请求失败，${delay}ms后进行第${attempt + 1}次重试:`, error);
      }
    }

    onError?.(lastError || new Error('流式请求失败'));
    throw lastError || new Error('流式请求失败');
  }

  /**
   * 解析数据块
   * @param chunk 原始数据块
   * @returns 解析后的数据
   */
  private static parseChunk<T>(chunk: string): T | null {
    try {
      // 尝试解析JSON
      if (chunk.trim().startsWith('{') || chunk.trim().startsWith('[')) {
        return JSON.parse(chunk);
      }
      
      // 如果不是JSON，直接返回
      return chunk as unknown as T;
    } catch (error) {
      console.warn('解析数据块失败:', error);
      return null;
    }
  }

  /**
   * 延迟函数
   * @param ms 延迟毫秒数
   */
  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * 创建请求控制器
   * @returns 控制器和信号
   */
  static createController(): {
    controller: AbortController;
    signal: AbortSignal;
  } {
    const controller = new AbortController();
    return {
      controller,
      signal: controller.signal
    };
  }

  /**
   * 检查网络连接状态
   * @returns 是否在线
   */
  static isOnline(): boolean {
    return typeof navigator !== 'undefined' && navigator.onLine;
  }

  /**
   * 等待网络恢复
   * @param timeout 超时时间
   * @returns Promise
   */
  static async waitForOnline(timeout = 30000): Promise<void> {
    if (this.isOnline()) return;

    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error('等待网络连接超时'));
      }, timeout);

      const handleOnline = () => {
        clearTimeout(timeoutId);
        window.removeEventListener('online', handleOnline);
        resolve();
      };

      window.addEventListener('online', handleOnline);
    });
  }
}

export default NetworkUtils;
