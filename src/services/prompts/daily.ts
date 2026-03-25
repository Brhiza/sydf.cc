import type { DailyFortuneData, SupplementaryInfo } from '@/types/divination';
import { buildSupplementaryInfoLines } from './shared/prompt-guidance';

function buildDailyFortuneDataPayload(fortuneData: DailyFortuneData): string {
  return JSON.stringify(fortuneData, null, 2);
}

export async function generateDailyFortunePrompt(
  question: string,
  fortuneData: DailyFortuneData,
  _timeInfo?: string,
  supplementaryInfo?: SupplementaryInfo
): Promise<string> {
  const supplementaryInfoLines = buildSupplementaryInfoLines(supplementaryInfo, {
    includeAgeAndZodiac: true,
    includeDayPillar: false,
    delimiter: '：',
  });

  return [
    '你将收到一份已经由程序计算好的今日运势原始数据。',
    '你的任务是基于这份数据，直接输出给用户看的解读正文。',
    '不要重复抄写整份原始 JSON，也不要再要求用户提供已经存在的数据。',
    '不要逐项罗列原始分数、幸运数字、幸运颜色、幸运方向、幸运时辰等程序字段，除非它们对建议有直接帮助。',
    '请直接使用结构化文本输出，例如“整体判断 / 关键趋势 / 行动建议 / 注意事项”等自然分段，不要输出 JSON。',
    supplementaryInfoLines.length > 0
      ? `**求测者信息**：\n${supplementaryInfoLines.join('\n')}`
      : '',
    `**今日运势原始数据（JSON）**：\n${buildDailyFortuneDataPayload(fortuneData)}`,
    `**用户问题**：\n"${question}"`,
    '请直接给出结论、分析和建议，保持简体中文、结构清晰、可执行。',
  ]
    .filter(Boolean)
    .join('\n\n');
}
