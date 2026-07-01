import { LunarUtil } from 'mingyu-core/calendar';
import { createAnchoredDate, isValidDateParts, pad2 } from './date-utils';

export const toolExecutors: { [key: string]: (args: unknown) => Promise<string> } = {
  get_current_time_info: async () => {
    try {
      const timeInfo = LunarUtil.getCurrentTimeInfo();
      return JSON.stringify(timeInfo);
    } catch (error) {
      console.error('执行 get_current_time_info 工具时出错:', error);
      return JSON.stringify({ error: '获取当前时间信息失败' });
    }
  },
  get_ganzhi_for_month: async (args: unknown) => {
    try {
      const { year, month } = args as { year: number; month: number };
      if (!year || !month) {
        return JSON.stringify({ error: '缺少年份或月份参数' });
      }
      const data = LunarUtil.getGanZhiForMonth(year, month);
      return JSON.stringify(data);
    } catch (error) {
      console.error('执行 get_ganzhi_for_month 工具时出错:', error);
      return JSON.stringify({ error: '获取月份干支信息失败' });
    }
  },
  get_ganzhi_for_year: async (args: unknown) => {
    try {
      const { year } = args as { year: number };
      if (!year) {
        return JSON.stringify({ error: '缺少年份参数' });
      }
      const data = LunarUtil.getGanZhiForYear(year);
      return JSON.stringify(data);
    } catch (error) {
      console.error('执行 get_ganzhi_for_year 工具时出错:', error);
      return JSON.stringify({ error: '获取年份干支信息失败' });
    }
  },
  get_ganzhi_for_date: async (args: unknown) => {
    try {
      const { year, month, day } = args as { year: number; month: number; day: number };
      if (!year || !month || !day) {
        return JSON.stringify({ error: '缺少年份、月份或日期参数' });
      }

      if (!isValidDateParts(year, month, day)) {
        return JSON.stringify({ error: '日期参数不合法' });
      }

      const date = createAnchoredDate(year, month, day);
      const timeInfo = LunarUtil.getTimeInfo(date);
      const display = LunarUtil.formatTimeDisplay(timeInfo);
      return JSON.stringify({
        date: `${year}-${pad2(month)}-${pad2(day)}`,
        solar: display.solar,
        lunar: display.lunar,
        ganzhi: display.ganzhi,
        jieQi: timeInfo.jieQi,
        raw: timeInfo,
      });
    } catch (error) {
      console.error('执行 get_ganzhi_for_date 工具时出错:', error);
      return JSON.stringify({ error: '获取指定日期干支信息失败' });
    }
  },
};
