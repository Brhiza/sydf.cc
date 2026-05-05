/**
 * 统一的时间信息生成工具
 * 避免在多个地方重复相同的时间处理逻辑
 */

import type { DivinationData } from '@/types/divination';
import { LunarUtil } from '@/utils/lunar';

function formatTimeInfoBlock(timeInfoData: ReturnType<typeof LunarUtil.getCurrentTimeInfo>): string {
  const timeDisplay = LunarUtil.formatTimeDisplay(timeInfoData);

  return `**时间信息**：
${timeDisplay.solar}
${timeDisplay.lunar}
${timeDisplay.ganzhi}
节气：${timeInfoData.jieQi}`;
}

function createAnchoredDateFromDateString(date: string): Date | null {
  const match = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const parsed = new Date(year, month - 1, day, 12, 0, 0, 0);
  if (
    parsed.getFullYear() !== year ||
    parsed.getMonth() !== month - 1 ||
    parsed.getDate() !== day
  ) {
    return null;
  }

  return parsed;
}

function extractDivinationDate(data?: DivinationData): Date | null {
  if (!data || typeof data !== 'object') {
    return null;
  }

  if ('timestamp' in data && typeof data.timestamp === 'number' && Number.isFinite(data.timestamp)) {
    return new Date(data.timestamp);
  }

  if ('date' in data && typeof data.date === 'string') {
    return createAnchoredDateFromDateString(data.date);
  }

  return null;
}

/**
 * 获取格式化的完整时间信息
 * 包含公历、农历、干支和节气信息
 */
export async function getFormattedTimeInfo(date?: Date): Promise<string> {
  const timeInfoData = date ? LunarUtil.getTimeInfo(date) : LunarUtil.getCurrentTimeInfo();
  return formatTimeInfoBlock(timeInfoData);
}

/**
 * 获取当前占卜数据对应的格式化时间信息
 * 优先使用占卜本身的时间，避免被“当前时间”污染
 */
export async function getFormattedTimeInfoForDivination(data?: DivinationData): Promise<string> {
  const divinationDate = extractDivinationDate(data);
  return getFormattedTimeInfo(divinationDate || undefined);
}

/**
 * 获取原始时间数据
 * 用于需要自定义格式化的场景
 */
export async function getRawTimeData() {
  return LunarUtil.getCurrentTimeInfo();
}

/**
 * 获取格式化显示的时间数据
 * 用于需要分别处理各部分时间信息的场景
 */
export async function getDisplayTimeData() {
  const timeInfoData = LunarUtil.getCurrentTimeInfo();
  const timeDisplay = LunarUtil.formatTimeDisplay(timeInfoData);
  
  return {
    ...timeDisplay,
    jieqi: timeInfoData.jieQi
  };
}
