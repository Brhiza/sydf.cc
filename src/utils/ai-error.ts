export const AI_ERROR_KEYWORDS = [
  '抱歉',
  '暂时不可用',
  '请稍后重试',
  '出小差',
  '请求过于频繁',
  '服务器暂时繁忙',
] as const;

export function isAIErrorMessage(content: string | null | undefined): boolean {
  if (!content) {
    return false;
  }

  return AI_ERROR_KEYWORDS.some((keyword) => content.includes(keyword));
}
