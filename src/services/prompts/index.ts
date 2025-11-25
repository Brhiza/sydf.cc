/**
 * 提示词系统主入口
 * 重构版本 - 使用共享逻辑和统一架构
 */

import type { DivinationData, DivinationType, LiuyaoData, MeihuaData, QimenData, SsgwData, SupplementaryInfo, TarotData, DailyFortuneData } from '@/types';
import { generateLiuyaoPrompt } from './liuyao';
import { generateMeihuaPrompt } from './meihua';
import { generateQimenPrompt } from './qimen';
import { generateSsgwPrompt } from './ssgw';
import { generateTarotPrompt } from './tarot';
import { generateDailyFortunePrompt } from './daily';
import { generateFollowUpPrompt, type FollowUpContext } from './followup';
import { getFormattedTimeInfo } from './shared/time-utils';
import { analyzeQuestion } from './shared/question-analyzer';
import { buildPrompt } from './shared/prompt-builder';

/**
 * 生成追问模式专用提示词
 */
export async function generateFollowUpPromptWrapper(context: FollowUpContext): Promise<string> {
  return await generateFollowUpPrompt(context);
}

/**
 * 主要的提示词生成函数
 */
export async function generatePrompt(
  type: DivinationType,
  question: string,
  data: DivinationData,
  supplementaryInfo?: SupplementaryInfo
): Promise<string> {
  // 获取完整的历法时间信息
  const timeInfo = await getFormattedTimeInfo();

  switch (type) {
    case 'liuyao':
      return generateLiuyaoPrompt(question, data as LiuyaoData, timeInfo, supplementaryInfo);
    case 'meihua':
      return generateMeihuaPrompt(question, data as MeihuaData, timeInfo, supplementaryInfo);
    case 'qimen':
      return generateQimenPrompt(question, data as QimenData, timeInfo, supplementaryInfo);
    case 'tarot':
    case 'tarot_single':
      return generateTarotPrompt(question, data as TarotData, timeInfo, supplementaryInfo);
    case 'ssgw':
      return generateSsgwPrompt(question, data as SsgwData, timeInfo, supplementaryInfo);
    case 'daily':
      return await generateDailyFortunePrompt(data as DailyFortuneData, supplementaryInfo, timeInfo);
    default:
      // 通用占卜处理
      return await generateGenericPrompt(type, question, data, timeInfo, supplementaryInfo);
  }
}

/**
 * 通用占卜提示词生成
 */
async function generateGenericPrompt(
  type: DivinationType,
  question: string,
  data: DivinationData,
  timeInfo: string,
  supplementaryInfo?: SupplementaryInfo
): Promise<string> {
  // 分析问题
  const analysis = analyzeQuestion(question);
  
  // 格式化数据（简单处理）
  const formattedData = formatGenericData(data);
  
  // 构建提示词（已包含干支指导）
  return buildPrompt({
    divinationType: type,
    question,
    formattedData,
    timeInfo,
    analysis,
    ...(supplementaryInfo && { supplementaryInfo })
  });
}

/**
 * 格式化通用数据
 */
function formatGenericData(data: DivinationData): string {
  if (!data) {
    return '暂无详细数据';
  }
  
  // 尝试提取基本信息
  const infoParts: string[] = [];
  
  // 使用类型断言来安全访问属性
  const dataAny = data as unknown as Record<string, unknown>;
  
  if (dataAny.originalName && typeof dataAny.originalName === 'string') {
    infoParts.push(`主卦：${dataAny.originalName}`);
  }
  
  if (dataAny.changedName && typeof dataAny.changedName === 'string') {
    infoParts.push(`变卦：${dataAny.changedName}`);
  }
  
  if (dataAny.interName && typeof dataAny.interName === 'string') {
    infoParts.push(`互卦：${dataAny.interName}`);
  }
  
  if (dataAny.ganzhi && typeof dataAny.ganzhi === 'object' && dataAny.ganzhi !== null) {
    const ganzhi = dataAny.ganzhi as Record<string, unknown>;
    const { year, month, day, hour } = ganzhi;
    if (typeof year === 'string' && typeof month === 'string' && typeof day === 'string' && typeof hour === 'string') {
      infoParts.push(`干支：${year}年 ${month}月 ${day}日 ${hour}时`);
    }
  }
  
  if (infoParts.length === 0) {
    return JSON.stringify(data, null, 2);
  }
  
  return infoParts.join('\n');
}

// 导出共享模块，供其他地方使用
export * from './shared/types';
export * from './shared/question-analyzer';
export * from './shared/prompt-builder';
export * from './shared/time-utils';
