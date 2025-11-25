/**
 * 统一的时间信息生成工具
 * 避免在多个地方重复相同的时间处理逻辑
 */

import { LunarUtil } from '@/utils/lunar';

/**
 * 获取格式化的完整时间信息
 * 包含公历、农历、干支和节气信息
 */
export async function getFormattedTimeInfo(): Promise<string> {
  const timeInfoData = LunarUtil.getCurrentTimeInfo();
  const timeDisplay = LunarUtil.formatTimeDisplay(timeInfoData);
  
  return `**时间信息**：
${timeDisplay.solar}
${timeDisplay.lunar}
${timeDisplay.ganzhi}
节气：${timeInfoData.jieQi}`;
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
