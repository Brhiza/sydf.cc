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

export const getGanZhiForDateTool = {
  type: 'function' as const,
  function: {
    name: 'get_ganzhi_for_date',
    description:
      '获取指定公历日期的公历、农历、干支和节气信息。用于查询某一天的具体历法信息或日运分析。',
    parameters: {
      type: 'object' as const,
      properties: {
        year: {
          type: 'number',
          description: '公历年份，例如 2026',
        },
        month: {
          type: 'number',
          description: '公历月份，例如 3',
        },
        day: {
          type: 'number',
          description: '公历日期，例如 20',
        },
      },
      required: ['year', 'month', 'day'],
    },
  },
};
