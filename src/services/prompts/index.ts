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
import { generateGenericPromptSync } from './shared/prompt-generator';

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
      return await generateDailyFortunePrompt(
        question,
        data as DailyFortuneData,
        timeInfo,
        supplementaryInfo
      );
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
  return generateGenericPromptSync({
    divinationType: type,
    question,
    data,
    timeInfo,
    supplementaryInfo,
  });
}

// 导出共享模块，供其他地方使用
export * from './shared/types';
export * from './shared/question-analyzer';
export * from './shared/prompt-builder';
export * from './shared/time-utils';
