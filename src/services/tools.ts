import { LunarUtil } from '@/utils/lunar';

/**
 * 定义一个工具，用于获取当前完整的历法信息
 */
export const getCurrentTimeInfoTool = {
  type: 'function' as const,
  function: {
    name: 'get_current_time_info',
    description: '获取当前准确的公历、农历、干支和节气信息。当用户需要对于后续具体时间进行占卜或查询时使用。',
    parameters: {
      type: 'object' as const,
      properties: {},
      required: [],
    },
  },
};

/**
 * 定义一个工具，用于获取指定月份每日的干支信息
 */
export const getGanZhiForMonthTool = {
  type: 'function' as const,
  function: {
    name: 'get_ganzhi_for_month',
    description:
      '获取指定公历年份和月份中，每一天的公历日期、农历日期和对应的日干支信息。用于查询特定月份的每日运势分析。',
    parameters: {
      type: 'object' as const,
      properties: {
        year: {
          type: 'number',
          description: '公历年份，例如 2025',
        },
        month: {
          type: 'number',
          description: '公历月份，例如 12',
        },
      },
      required: ['year', 'month'],
    },
  },
};

/**
 * 定义一个工具，用于获取指定年份每月的干支信息
 */
export const getGanZhiForYearTool = {
  type: 'function' as const,
  function: {
    name: 'get_ganzhi_for_year',
    description: '获取指定公历年份中，每个月的月干支信息。用于查询某一整年的运势概览。',
    parameters: {
      type: 'object' as const,
      properties: {
        year: {
          type: 'number',
          description: '公历年份，例如 2025',
        },
      },
      required: ['year'],
    },
  },
};

/**
 * 工具执行器映射
 * 当 AI 决定调用某个工具时，我们在这里查找并执行对应的本地函数
 */
export const toolExecutors: { [key: string]: (args: any) => Promise<any> } = {
  get_current_time_info: async () => {
    try {
      const timeInfo = LunarUtil.getCurrentTimeInfo();
      return JSON.stringify(timeInfo);
    } catch (error) {
      console.error('执行 get_current_time_info 工具时出错:', error);
      return JSON.stringify({ error: '获取当前时间信息失败' });
    }
  },
  get_ganzhi_for_month: async (args: { year: number; month: number }) => {
    try {
      const { year, month } = args;
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
  get_ganzhi_for_year: async (args: { year: number }) => {
    try {
      const { year } = args;
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
};