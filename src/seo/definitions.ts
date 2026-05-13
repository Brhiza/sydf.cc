import type { DivinationType } from '../types';

export const DEFAULT_SITE_URL = 'https://sydf.cc';
export const DEFAULT_IMAGE_PATH = '/static/pwa1.jpg';
export const DEFAULT_IMAGE_WIDTH = '540';
export const DEFAULT_IMAGE_HEIGHT = '720';
export const DEFAULT_LOCALE = 'zh_CN';
export const DEFAULT_LANGUAGE = 'zh-CN';

export interface PageSeoDefinition {
  pageTitle: string;
  description: string;
  keywords: string[];
  robots?: string;
  ogType?: 'website' | 'article';
  schemaType?: 'WebPage' | 'AboutPage' | 'CollectionPage' | 'SearchResultsPage';
}

export const STATIC_PAGE_SEO: Record<string, PageSeoDefinition> = {
  home: {
    pageTitle: 'AI 在线占卜，免费六爻、梅花易数、奇门遁甲、塔罗牌与今日运势',
    description:
      '时月东方提供免费的 AI 在线占卜服务，支持今日运势、六爻、梅花易数、奇门遁甲、塔罗牌和三山国王灵签，适合感情、事业、财运与决策参考。',
    keywords: ['时月东方', 'AI占卜', '免费占卜', '在线算命', '今日运势', '塔罗牌'],
    schemaType: 'WebPage',
  },
  history: {
    pageTitle: '历史记录',
    description: '查看与管理本地保存的占卜历史记录。',
    keywords: ['历史记录', '占卜记录', '本地记录'],
    robots: 'noindex, nofollow',
    schemaType: 'CollectionPage',
  },
  about: {
    pageTitle: '关于本站与使用说明',
    description: '了解时月东方的项目背景、免责声明、联系方式与使用说明。',
    keywords: ['关于时月东方', '使用说明', '免责声明'],
    schemaType: 'AboutPage',
  },
  rengong: {
    pageTitle: '人工咨询',
    description: '查看时月东方的人工咨询联系方式，了解八字、紫微与人工起卦等服务。',
    keywords: ['人工咨询', '八字咨询', '紫微', '人工起卦'],
    schemaType: 'WebPage',
  },
  settings: {
    pageTitle: 'API 配置',
    description: '配置自定义 API 密钥、端点与模型。',
    keywords: ['API 配置', '自定义模型', '接口设置'],
    robots: 'noindex, nofollow',
    schemaType: 'WebPage',
  },
  'not-found': {
    pageTitle: '页面不存在',
    description: '您访问的页面不存在，请返回时月东方首页继续使用在线占卜工具。',
    keywords: ['404', '页面不存在'],
    robots: 'noindex, nofollow',
    schemaType: 'WebPage',
  },
};

export const DIVINATION_PAGE_SEO: Partial<Record<DivinationType, PageSeoDefinition>> = {
  daily: {
    pageTitle: '今日运势在线查询',
    description: '免费查看今日运势，基于日家奇门遁甲思路提供事业、财运、感情与健康方向的 AI 解读。',
    keywords: ['今日运势', '每日运势', '奇门遁甲', 'AI运势'],
    schemaType: 'WebPage',
  },
  liuyao: {
    pageTitle: '六爻在线占卜',
    description:
      '免费体验六爻在线占卜，输入问题即可获取卦象分析与 AI 解读，适合感情、事业、财运与决策参考。',
    keywords: ['六爻占卜', '六爻在线排盘', 'AI解卦', '周易占卜'],
    schemaType: 'WebPage',
  },
  meihua: {
    pageTitle: '梅花易数在线占卜',
    description: '免费使用梅花易数在线占卜，通过数字与起卦方式快速获得事件趋势判断与 AI 解读。',
    keywords: ['梅花易数', '梅花易数在线', 'AI起卦', '易经占卜'],
    schemaType: 'WebPage',
  },
  qimen: {
    pageTitle: '奇门遁甲在线占卜',
    description: '免费体验奇门遁甲在线占卜，适合复杂局势分析、时机判断与行动决策参考。',
    keywords: ['奇门遁甲', '奇门遁甲在线', 'AI占卜', '决策参考'],
    schemaType: 'WebPage',
  },
  tarot: {
    pageTitle: '塔罗牌在线占卜',
    description:
      '免费体验塔罗牌在线占卜，支持多种牌阵与 AI 解读，适合感情、事业、关系与自我探索问题。',
    keywords: ['塔罗牌', '塔罗占卜', '在线抽牌', 'AI塔罗'],
    schemaType: 'WebPage',
  },
  ssgw: {
    pageTitle: '三山国王灵签在线抽签',
    description: '免费体验三山国王灵签在线抽签，通过求签与圣杯流程获取问题指引与 AI 解读。',
    keywords: ['三山国王', '灵签', '在线抽签', '求签'],
    schemaType: 'WebPage',
  },
};
