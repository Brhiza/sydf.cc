const HTTP_ERROR_MESSAGES: Record<number, string> = {
  400: '请求参数错误',
  401: 'API密钥无效或已过期',
  403: '访问被拒绝，请检查API权限',
  404: 'API端点不存在，请检查地址是否正确',
  429: '请求过于频繁，请稍等片刻或者更换模型重试',
  500: '服务器内部错误',
  502: '网关错误，服务暂时不可用',
  503: '服务暂时不可用',
  504: '请求超时，请稍后重试',
};

export function getHttpErrorMessage(status: number): string {
  return HTTP_ERROR_MESSAGES[status] || (status >= 500 ? '服务器错误' : '请求失败');
}

export async function buildErrorFromResponse(response: Response): Promise<Error> {
  let errorDetails;
  try {
    const errorData = await response.json();
    errorDetails = errorData.error?.message || errorData.message || response.statusText;
  } catch {
    errorDetails = response.statusText;
  }
  const userFriendlyMessage = getHttpErrorMessage(response.status);
  return new Error(`${userFriendlyMessage} (错误代码: ${response.status} - ${errorDetails})`);
}
