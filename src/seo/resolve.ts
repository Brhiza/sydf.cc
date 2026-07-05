import { getDivinationConfig } from '../config/divination';
import { isDivinationType } from '@/utils/divination-type';
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import {
  DEFAULT_IMAGE_PATH,
  DEFAULT_LANGUAGE,
  DEFAULT_SITE_URL,
  DIVINATION_PAGE_SEO,
  STATIC_PAGE_SEO,
  type PageSeoDefinition,
} from './definitions';

export type RouteLike = Pick<RouteLocationNormalizedLoaded, 'name' | 'path' | 'params'>;

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
          '免费 AI 在线占卜平台，提供六爻、梅花易数、奇门遁甲、塔罗牌与三山国王灵签，并收录相关外部项目入口。',
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

  const divinationType = String(route.params.type || '');
  if (!isDivinationType(divinationType)) {
    return null;
  }
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
