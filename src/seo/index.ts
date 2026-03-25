import { getDivinationConfig } from '../config/divination';
import type { DivinationType } from '../types';
import type { RouteLocationNormalizedLoaded, Router } from 'vue-router';

const DEFAULT_SITE_URL = 'https://sydf.cc';
const DEFAULT_IMAGE_PATH = '/static/pwa1.jpg';
const DEFAULT_IMAGE_WIDTH = '540';
const DEFAULT_IMAGE_HEIGHT = '720';
const DEFAULT_LOCALE = 'zh_CN';
const DEFAULT_LANGUAGE = 'zh-CN';

interface PageSeoDefinition {
  pageTitle: string;
  description: string;
  keywords: string[];
  robots?: string;
  ogType?: 'website' | 'article';
  schemaType?: 'WebPage' | 'AboutPage' | 'CollectionPage' | 'SearchResultsPage';
}

export interface ResolvedSeoMeta {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  robots: string;
  ogType: 'website' | 'article';
  imageUrl: string;
  imageAlt: string;
  schema: Record<string, unknown>;
}

interface SetupSeoOptions {
  isCustomBuild: boolean;
}

export type RouteLike = Pick<RouteLocationNormalizedLoaded, 'name' | 'path' | 'params'>;

const STATIC_PAGE_SEO: Record<string, PageSeoDefinition> = {
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
  'history-detail': {
    pageTitle: '历史记录详情',
    description: '查看本地保存的占卜历史详情。',
    keywords: ['历史记录详情', '占卜详情', '本地记录'],
    robots: 'noindex, nofollow',
    schemaType: 'WebPage',
  },
  about: {
    pageTitle: '关于本站与使用说明',
    description: '了解时月东方的项目背景、免责声明、联系方式与使用说明。',
    keywords: ['关于时月东方', '使用说明', '免责声明'],
    schemaType: 'AboutPage',
  },
  gongdebox: {
    pageTitle: '功德箱与捐赠方式',
    description: '查看时月东方功德箱、捐赠方式、捐赠证书与公益记录。',
    keywords: ['功德箱', '捐赠', '公益记录'],
    schemaType: 'CollectionPage',
  },
  gongdeboard: {
    pageTitle: '功德榜',
    description: '查看时月东方公开的功德榜、捐赠统计与捐赠记录。',
    keywords: ['功德榜', '捐赠记录', '公益统计'],
    schemaType: 'CollectionPage',
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

const DIVINATION_PAGE_SEO: Record<DivinationType, PageSeoDefinition> = {
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
  tarot_single: {
    pageTitle: '塔罗单牌在线占卜',
    description: '免费体验塔罗单牌在线占卜，快速获得当下问题的方向提示与 AI 解读。',
    keywords: ['塔罗单牌', '单张塔罗', '在线抽牌', 'AI塔罗'],
    schemaType: 'WebPage',
  },
  ssgw: {
    pageTitle: '三山国王灵签在线抽签',
    description: '免费体验三山国王灵签在线抽签，通过求签与圣杯流程获取问题指引与 AI 解读。',
    keywords: ['三山国王', '灵签', '在线抽签', '求签'],
    schemaType: 'WebPage',
  },
};

function getSiteUrl(): string {
  const configuredSiteUrl =
    (typeof import.meta !== 'undefined' &&
      'env' in import.meta &&
      typeof import.meta.env?.VITE_SITE_URL === 'string' &&
      import.meta.env.VITE_SITE_URL.trim().length > 0 &&
      import.meta.env.VITE_SITE_URL.trim()) ||
    (typeof process !== 'undefined' &&
      typeof process.env?.VITE_SITE_URL === 'string' &&
      process.env.VITE_SITE_URL.trim().length > 0 &&
      process.env.VITE_SITE_URL.trim()) ||
    DEFAULT_SITE_URL;

  return configuredSiteUrl.replace(/\/+$/, '');
}

function getBrandName(isCustomBuild: boolean): string {
  return isCustomBuild ? '时月东方 oyyy 版' : '时月东方';
}

function composeTitle(pageTitle: string, isCustomBuild: boolean): string {
  return `${pageTitle} - ${getBrandName(isCustomBuild)}`;
}

function getCanonicalUrl(path: string): string {
  const normalizedPath = path === '/' ? '/' : path.replace(/\/+$/, '');
  return `${getSiteUrl()}${normalizedPath}`;
}

function getImageUrl(): string {
  return `${getSiteUrl()}${DEFAULT_IMAGE_PATH}`;
}

function createBreadcrumbItems(
  route: RouteLike,
  pageTitle: string
): Array<Record<string, unknown>> {
  const homeItem = {
    '@type': 'ListItem',
    position: 1,
    name: '首页',
    item: `${getSiteUrl()}/`,
  };

  if (route.path === '/') {
    return [homeItem];
  }

  return [
    homeItem,
    {
      '@type': 'ListItem',
      position: 2,
      name: pageTitle,
      item: getCanonicalUrl(route.path),
    },
  ];
}

function createStructuredData(
  route: RouteLike,
  definition: PageSeoDefinition,
  resolvedTitle: string
): Record<string, unknown> {
  const canonicalUrl = getCanonicalUrl(route.path);
  const siteUrl = getSiteUrl();

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: '时月东方',
        url: `${siteUrl}/`,
        inLanguage: DEFAULT_LANGUAGE,
        description:
          '免费 AI 在线占卜平台，提供今日运势、六爻、梅花易数、奇门遁甲、塔罗牌与三山国王灵签。',
      },
      {
        '@type': definition.schemaType || 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: resolvedTitle,
        description: definition.description,
        inLanguage: DEFAULT_LANGUAGE,
        isPartOf: {
          '@id': `${siteUrl}/#website`,
        },
        breadcrumb: {
          '@id': `${canonicalUrl}#breadcrumb`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: createBreadcrumbItems(route, definition.pageTitle),
      },
    ],
  };
}

function resolveStaticPageSeo(route: RouteLike): PageSeoDefinition | null {
  const routeName = typeof route.name === 'string' ? route.name : '';
  return STATIC_PAGE_SEO[routeName] || null;
}

function resolveDivinationSeo(route: RouteLike): PageSeoDefinition | null {
  if (route.name !== 'divination') {
    return null;
  }

  const divinationType = String(route.params.type || '') as DivinationType;
  const pageSeo = DIVINATION_PAGE_SEO[divinationType];

  if (pageSeo) {
    return pageSeo;
  }

  const config = getDivinationConfig(divinationType);
  if (!config) {
    return null;
  }

  return {
    pageTitle: `${config.title}在线占卜`,
    description: `${config.title}页面，提供在线起卦与 AI 解读服务。`,
    keywords: [config.title, '在线占卜', 'AI解读'],
    schemaType: 'WebPage',
  };
}

export function resolveSeoMeta(route: RouteLike, isCustomBuild: boolean): ResolvedSeoMeta {
  const definition =
    resolveDivinationSeo(route) || resolveStaticPageSeo(route) || STATIC_PAGE_SEO['not-found'];

  const title = composeTitle(definition.pageTitle, isCustomBuild);
  const description = definition.description;
  const keywords = definition.keywords.join(', ');
  const canonicalUrl = getCanonicalUrl(route.path);
  const robots = definition.robots || 'index, follow';
  const imageUrl = getImageUrl();
  const imageAlt = `${definition.pageTitle} - 时月东方`;

  return {
    title,
    description,
    keywords,
    canonicalUrl,
    robots,
    ogType: definition.ogType || 'website',
    imageUrl,
    imageAlt,
    schema: createStructuredData(route, definition, title),
  };
}

function isTagName(element: Element | null, tagName: string): boolean {
  return element?.tagName.toLowerCase() === tagName;
}

function ensureMetaTag(
  targetDocument: Document,
  attributeName: 'name' | 'property',
  key: string
): HTMLMetaElement {
  const selector = `meta[${attributeName}="${key}"]`;
  const existingTag = targetDocument.head.querySelector(selector);

  if (isTagName(existingTag, 'meta')) {
    const metaTag = existingTag as HTMLMetaElement;
    metaTag.setAttribute('data-seo-managed', 'true');
    return metaTag;
  }

  const meta = targetDocument.createElement('meta');
  meta.setAttribute(attributeName, key);
  meta.setAttribute('data-seo-managed', 'true');
  targetDocument.head.appendChild(meta);
  return meta;
}

function setMetaContent(
  targetDocument: Document,
  attributeName: 'name' | 'property',
  key: string,
  content: string
): void {
  ensureMetaTag(targetDocument, attributeName, key).setAttribute('content', content);
}

function ensureCanonicalLink(targetDocument: Document): HTMLLinkElement {
  const existingLink = targetDocument.head.querySelector('link[rel="canonical"]');

  if (isTagName(existingLink, 'link')) {
    const canonicalLink = existingLink as HTMLLinkElement;
    canonicalLink.setAttribute('data-seo-managed', 'true');
    return canonicalLink;
  }

  const link = targetDocument.createElement('link');
  link.rel = 'canonical';
  link.setAttribute('data-seo-managed', 'true');
  targetDocument.head.appendChild(link);
  return link;
}

function ensureStructuredDataScript(targetDocument: Document): HTMLScriptElement {
  const existingScript = targetDocument.getElementById('seo-structured-data');

  if (isTagName(existingScript, 'script')) {
    return existingScript as HTMLScriptElement;
  }

  const script = targetDocument.createElement('script');
  script.id = 'seo-structured-data';
  script.type = 'application/ld+json';
  targetDocument.head.appendChild(script);
  return script;
}

export function applySeoMetaToDocument(targetDocument: Document, meta: ResolvedSeoMeta): void {
  targetDocument.title = meta.title;
  targetDocument.documentElement.lang = DEFAULT_LANGUAGE;

  setMetaContent(targetDocument, 'name', 'description', meta.description);
  setMetaContent(targetDocument, 'name', 'keywords', meta.keywords);
  setMetaContent(targetDocument, 'name', 'robots', meta.robots);
  setMetaContent(targetDocument, 'name', 'googlebot', meta.robots);
  setMetaContent(targetDocument, 'name', 'bingbot', meta.robots);
  setMetaContent(targetDocument, 'name', 'twitter:card', 'summary_large_image');
  setMetaContent(targetDocument, 'name', 'twitter:title', meta.title);
  setMetaContent(targetDocument, 'name', 'twitter:description', meta.description);
  setMetaContent(targetDocument, 'name', 'twitter:url', meta.canonicalUrl);
  setMetaContent(targetDocument, 'name', 'twitter:image', meta.imageUrl);
  setMetaContent(targetDocument, 'name', 'twitter:image:alt', meta.imageAlt);

  setMetaContent(targetDocument, 'property', 'og:type', meta.ogType);
  setMetaContent(targetDocument, 'property', 'og:url', meta.canonicalUrl);
  setMetaContent(targetDocument, 'property', 'og:title', meta.title);
  setMetaContent(targetDocument, 'property', 'og:description', meta.description);
  setMetaContent(targetDocument, 'property', 'og:image', meta.imageUrl);
  setMetaContent(targetDocument, 'property', 'og:image:width', DEFAULT_IMAGE_WIDTH);
  setMetaContent(targetDocument, 'property', 'og:image:height', DEFAULT_IMAGE_HEIGHT);
  setMetaContent(targetDocument, 'property', 'og:image:alt', meta.imageAlt);
  setMetaContent(targetDocument, 'property', 'og:site_name', '时月东方');
  setMetaContent(targetDocument, 'property', 'og:locale', DEFAULT_LOCALE);

  ensureCanonicalLink(targetDocument).href = meta.canonicalUrl;
  ensureStructuredDataScript(targetDocument).textContent = JSON.stringify(meta.schema);
}

export function applySeoMeta(meta: ResolvedSeoMeta): void {
  if (typeof document === 'undefined') {
    return;
  }

  applySeoMetaToDocument(document, meta);
}

export function setupSeo(router: Router, options: SetupSeoOptions): void {
  if (typeof document === 'undefined') {
    return;
  }

  const updateSeo = (route: RouteLike) => {
    applySeoMeta(resolveSeoMeta(route, options.isCustomBuild));
  };

  updateSeo(router.currentRoute.value);
  router.afterEach((to) => {
    updateSeo(to);
  });
}
