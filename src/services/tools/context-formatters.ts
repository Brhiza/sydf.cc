import {
  formatTimeDisplay,
  getGanZhiForMonth,
  getGanZhiForYear,
  getTimeInfo,
} from '@/shared/mingyu-calendar';
import { formatDateLabel } from './date-utils';

export interface GanzhiQueryContext {
  resolution: 'date' | 'month' | 'year';
  message: string;
}

export function formatDateContext(date: Date): GanzhiQueryContext {
  const timeInfo = getTimeInfo(date);
  const display = formatTimeDisplay(timeInfo);
  return {
    resolution: 'date',
    message: [
      `以下是 ${formatDateLabel(date)} 对应的精确历法信息（按中午 12 点锚定，适用于日级分析）：`,
      display.solar,
      display.lunar,
      display.ganzhi,
      `节气：${timeInfo.jieQi}`,
    ].join('\n'),
  };
}

export function formatMonthContext(year: number, month: number): GanzhiQueryContext {
  const monthRows = getGanZhiForMonth(year, month);
  return {
    resolution: 'month',
    message: [
      `以下是 ${year}年${month}月 的每日干支信息（已由程序精确计算）：`,
      ...monthRows.map((row) => `${row.date}｜${row.lunarDate}｜日干支：${row.ganZhi}`),
    ].join('\n'),
  };
}

export function formatYearContext(year: number): GanzhiQueryContext {
  const yearRows = getGanZhiForYear(year);
  return {
    resolution: 'year',
    message: [
      `以下是 ${year}年 的各月月干支信息（已由程序精确计算）：`,
      ...yearRows.map((row) => `${year}年${row.month}月｜月干支：${row.ganZhi}`),
    ].join('\n'),
  };
}
