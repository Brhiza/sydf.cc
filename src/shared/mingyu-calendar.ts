import { LunarUtil } from 'mingyu-core/calendar';
import type { TimeInfo } from 'mingyu-core/calendar';

export type { TimeInfo };
export type TimeDisplay = ReturnType<typeof LunarUtil.formatTimeDisplay>;
export type MonthGanZhiRow = ReturnType<typeof LunarUtil.getGanZhiForMonth>[number];
export type YearGanZhiRow = ReturnType<typeof LunarUtil.getGanZhiForYear>[number];

export function getCurrentTimeInfo(): TimeInfo {
  return LunarUtil.getCurrentTimeInfo();
}

export function getTimeInfo(date: Date): TimeInfo {
  return LunarUtil.getTimeInfo(date);
}

export function formatTimeDisplay(timeInfo: TimeInfo): TimeDisplay {
  return LunarUtil.formatTimeDisplay(timeInfo);
}

export function getGanZhiForMonth(year: number, month: number): MonthGanZhiRow[] {
  return LunarUtil.getGanZhiForMonth(year, month);
}

export function getGanZhiForYear(year: number): YearGanZhiRow[] {
  return LunarUtil.getGanZhiForYear(year);
}
