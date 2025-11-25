/**
 * 统一错误处理工具
 * 提供一致的错误处理机制
 */

// 定义错误类型
export enum ErrorType {
  NETWORK_ERROR = 'NETWORK_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  BUSINESS_ERROR = 'BUSINESS_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

// 错误信息接口
export interface AppError {
  type: ErrorType;
  message: string;
  code?: string;
  timestamp: number;
  originalError?: unknown;
}

/**
 * 创建应用错误
 */
export function createAppError(
  type: ErrorType,
  message: string,
  code?: string,
  originalError?: unknown
): AppError {
  const error: AppError = {
    type,
    message,
    timestamp: Date.now(),
  };
  
  if (code !== undefined) {
    error.code = code;
  }
  
  if (originalError !== undefined) {
    error.originalError = originalError;
  }
  
  return error;
}

/**
 * 网络错误处理
 */
export function handleNetworkError(error: unknown): AppError {
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return createAppError(
      ErrorType.NETWORK_ERROR,
      '网络连接失败，请检查网络设置',
      'NETWORK_CONNECT_ERROR',
      error
    );
  }

  if (error instanceof DOMException && error.name === 'AbortError') {
    return createAppError(
      ErrorType.NETWORK_ERROR,
      '请求已取消',
      'REQUEST_ABORTED',
      error
    );
  }

  return createAppError(
    ErrorType.NETWORK_ERROR,
    '网络请求失败',
    'NETWORK_REQUEST_ERROR',
    error
  );
}

/**
 * 业务错误处理
 */
export function handleBusinessError(error: unknown, defaultMessage = '操作失败'): AppError {
  if (error instanceof Error) {
    return createAppError(
      ErrorType.BUSINESS_ERROR,
      error.message || defaultMessage,
      'BUSINESS_ERROR',
      error
    );
  }

  if (typeof error === 'string') {
    return createAppError(
      ErrorType.BUSINESS_ERROR,
      error || defaultMessage,
      'BUSINESS_ERROR'
    );
  }

  return createAppError(
    ErrorType.BUSINESS_ERROR,
    defaultMessage,
    'BUSINESS_ERROR',
    error
  );
}

/**
 * 验证错误处理
 */
export function handleValidationError(error: unknown, defaultMessage = '数据验证失败'): AppError {
  return createAppError(
    ErrorType.VALIDATION_ERROR,
    typeof error === 'string' ? error : defaultMessage,
    'VALIDATION_ERROR',
    error
  );
}

/**
 * 通用错误处理
 */
export function handleError(error: unknown, defaultMessage = '发生未知错误'): AppError {
  // 检查是否已经是 AppError
  if (isAppError(error)) {
    return error as AppError;
  }

  // 检查网络错误
  if (error instanceof TypeError || 
      (error instanceof DOMException && ['AbortError', 'NetworkError'].includes(error.name))) {
    return handleNetworkError(error);
  }

  // 检查普通错误
  if (error instanceof Error) {
    return createAppError(
      ErrorType.UNKNOWN_ERROR,
      error.message || defaultMessage,
      'GENERIC_ERROR',
      error
    );
  }

  // 检查字符串错误
  if (typeof error === 'string') {
    return createAppError(
      ErrorType.UNKNOWN_ERROR,
      error || defaultMessage,
      'GENERIC_ERROR'
    );
  }

  // 默认错误
  return createAppError(
    ErrorType.UNKNOWN_ERROR,
    defaultMessage,
    'GENERIC_ERROR',
    error
  );
}

/**
 * 检查是否为 AppError
 */
export function isAppError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'type' in error &&
    'message' in error &&
    'timestamp' in error &&
    Object.values(ErrorType).includes((error as AppError).type)
  );
}

/**
 * 记录错误日志
 */
export function logError(error: AppError, context?: string): void {
  const logEntry = {
    timestamp: new Date(error.timestamp).toISOString(),
    type: error.type,
    message: error.message,
    code: error.code,
    context: context || 'unknown',
    originalError: error.originalError
  };

  console.error('应用错误:', logEntry);
  
  // 在生产环境中，可以将错误发送到监控服务
  // if (process.env.NODE_ENV === 'production') {
  //   sendErrorToMonitoringService(logEntry);
  // }
}

/**
 * 从错误中提取用户友好的消息
 */
export function getUserFriendlyMessage(error: AppError): string {
  switch (error.type) {
    case ErrorType.NETWORK_ERROR:
      return '网络连接出现问题，请检查网络设置后重试';
    case ErrorType.VALIDATION_ERROR:
      return error.message || '输入的数据格式不正确';
    case ErrorType.BUSINESS_ERROR:
      return error.message || '操作失败，请重试';
    default:
      return error.message || '发生了一些问题，请稍后重试';
  }
}
