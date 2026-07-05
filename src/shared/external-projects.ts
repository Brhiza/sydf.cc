export const EXTERNAL_DAILY_FORTUNE_URL = 'https://qm.sydf.cc/';

export const EXTERNAL_PROJECT_LINKS = [
  {
    id: 'mingyu',
    name: '命语',
    description: '算命、占卜与综合提示词生成项目',
    href: 'https://aov.cc/',
  },
  {
    id: 'shiyue-qimen',
    name: '时月奇门',
    description: '年月日时奇门\n今日运势也在这里',
    href: EXTERNAL_DAILY_FORTUNE_URL,
  },
  {
    id: 'chuai-ce',
    name: '揣测',
    description: '小六壬专门项目，适合快速起课占断',
    href: 'https://xlr.sydf.cc/',
  },
] as const;
