import { DIVINATION_CONFIGS, divinationNavItems } from '../config/divination';
import type { DivinationType } from '../types';
import { JSDOM } from 'jsdom';
import { applySeoMetaToDocument, resolveSeoMeta, type RouteLike } from './index';

interface PrerenderLink {
  href: string;
  label: string;
}

interface PrerenderContentBlock {
  title: string;
  paragraphs?: string[];
  items?: string[];
  links?: PrerenderLink[];
}

export interface PrerenderRoute extends RouteLike {
  contentTitle: string;
  lead: string;
  blocks: PrerenderContentBlock[];
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderParagraphs(paragraphs: string[] | undefined): string {
  if (!paragraphs || paragraphs.length === 0) {
    return '';
  }

  return paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('');
}

function renderItems(items: string[] | undefined): string {
  if (!items || items.length === 0) {
    return '';
  }

  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
}

function renderLinks(links: PrerenderLink[] | undefined): string {
  if (!links || links.length === 0) {
    return '';
  }

  return `<p class="seo-prerender-links">${links
    .map((link) => `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`)
    .join('')}</p>`;
}

function createDivinationRoute(type: DivinationType): PrerenderRoute {
  const config = DIVINATION_CONFIGS[type];
  const examples = config.examples.map((example) => example.text);
  const relatedLinks = divinationNavItems
    .filter((item) => item.type !== type)
    .slice(0, 4)
    .map((item) => ({
      href: `/divination/${item.type}`,
      label: item.title,
    }));

  const usageBlock: PrerenderContentBlock =
    examples.length > 0
      ? {
          title: '适合提问的问题',
          items: examples,
        }
      : {
          title: '使用说明',
          paragraphs: ['进入页面后可直接开始操作，无需额外配置。'],
        };

  return {
    name: 'divination',
    path: `/divination/${type}`,
    params: {
      type,
    },
    contentTitle: config.title,
    lead: config.description,
    blocks: [
      {
        title: '功能说明',
        paragraphs: [
          `${config.title}页面支持直接在线起卦或抽牌，页面加载后即可进入正式交互。`,
          '结果内容由算法与 AI 解读共同生成，适合用于日常娱乐、方向梳理和问题整理。',
        ],
      },
      usageBlock,
      {
        title: '相关页面',
        links: relatedLinks,
      },
    ],
  };
}

function createHomeRoute(isCustomBuild: boolean): PrerenderRoute {
  const links = divinationNavItems.map((item) => ({
    href: `/divination/${item.type}`,
    label: item.title,
  }));

  if (!isCustomBuild) {
    links.push(
      { href: '/about', label: '关于本站' },
      { href: '/gongdebox', label: '功德箱' },
      { href: '/gongdeboard', label: '功德榜' }
    );
  }

  return {
    name: 'home',
    path: '/',
    params: {},
    contentTitle: '欢迎来到时月东方',
    lead: '这里提供今日运势、六爻、梅花易数、奇门遁甲、塔罗牌与三山国王灵签的在线入口。',
    blocks: [
      {
        title: '主要服务',
        items: divinationNavItems.map((item) => `${item.title}：${item.description}`),
      },
      {
        title: '快速入口',
        links,
      },
      {
        title: '使用提示',
        paragraphs: ['本站内容以简体中文展示，结果仅供娱乐参考，不替代现实中的判断与沟通。'],
      },
    ],
  };
}

function createStaticRoutes(isCustomBuild: boolean): PrerenderRoute[] {
  const routes: PrerenderRoute[] = [
    {
      name: 'gongdeboard',
      path: '/gongdeboard',
      params: {},
      contentTitle: '功德榜',
      lead: '查看公开展示的捐赠统计、捐赠人数与历史捐赠记录。',
      blocks: [
        {
          title: '页面内容',
          paragraphs: ['该页面用于展示公开捐赠数据、统计信息与远程同步的捐赠记录。'],
        },
        {
          title: '相关入口',
          links: [{ href: '/gongdebox', label: '查看功德箱' }],
        },
      ],
    },
  ];

  if (!isCustomBuild) {
    routes.push(
      {
        name: 'about',
        path: '/about',
        params: {},
        contentTitle: '关于本站',
        lead: '了解时月东方的项目背景、免责声明、联系方式与使用说明。',
        blocks: [
          {
            title: '页面内容',
            paragraphs: [
              '该页面介绍项目背景、使用提醒与联系渠道，适合首次访问时快速了解站点定位。',
            ],
          },
        ],
      },
      {
        name: 'gongdebox',
        path: '/gongdebox',
        params: {},
        contentTitle: '功德箱',
        lead: '查看捐赠方式、捐赠证书与相关公益记录。',
        blocks: [
          {
            title: '页面内容',
            paragraphs: ['该页面提供收款码展示、捐赠证书记录与功德榜入口。'],
          },
          {
            title: '相关入口',
            links: [{ href: '/gongdeboard', label: '查看功德榜' }],
          },
        ],
      },
      {
        name: 'rengong',
        path: '/rengong',
        params: {},
        contentTitle: '人工咨询',
        lead: '查看人工咨询联系方式，了解八字、紫微与人工起卦等服务。',
        blocks: [
          {
            title: '页面内容',
            paragraphs: ['该页面提供人工咨询联系入口，适合需要更深入交流的用户。'],
          },
        ],
      }
    );
  }

  return routes;
}

export function getPrerenderRoutes(isCustomBuild: boolean): PrerenderRoute[] {
  return [
    createHomeRoute(isCustomBuild),
    createDivinationRoute('daily'),
    createDivinationRoute('liuyao'),
    createDivinationRoute('meihua'),
    createDivinationRoute('qimen'),
    createDivinationRoute('tarot'),
    createDivinationRoute('ssgw'),
    ...createStaticRoutes(isCustomBuild),
  ];
}

export function renderPrerenderMarkup(route: PrerenderRoute): string {
  return `
    <noscript>
      <section data-seo-prerender="true" class="seo-prerender-shell">
        <style>
          .seo-prerender-shell {
            max-width: 960px;
            margin: 0 auto;
            padding: 32px 20px 48px;
            color: #1f2937;
            font: 16px/1.8 "PingFang SC", "Microsoft YaHei", sans-serif;
          }
          .seo-prerender-shell h1,
          .seo-prerender-shell h2 {
            margin: 0 0 16px;
            line-height: 1.3;
          }
          .seo-prerender-shell h1 {
            font-size: 32px;
          }
          .seo-prerender-shell h2 {
            margin-top: 28px;
            font-size: 22px;
          }
          .seo-prerender-shell p,
          .seo-prerender-shell li {
            margin: 0 0 12px;
          }
          .seo-prerender-shell ul {
            padding-left: 22px;
            margin: 0;
          }
          .seo-prerender-links {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
          }
          .seo-prerender-links a {
            color: #2563eb;
            text-decoration: none;
          }
        </style>
        <main>
          <h1>${escapeHtml(route.contentTitle)}</h1>
          <p>${escapeHtml(route.lead)}</p>
          ${route.blocks
            .map(
              (block) => `
                <section>
                  <h2>${escapeHtml(block.title)}</h2>
                  ${renderParagraphs(block.paragraphs)}
                  ${renderItems(block.items)}
                  ${renderLinks(block.links)}
                </section>
              `
            )
            .join('')}
        </main>
      </section>
    </noscript>
  `.trim();
}

export function createPrerenderHtml(
  baseHtml: string,
  route: PrerenderRoute,
  isCustomBuild: boolean
): string {
  const dom = new JSDOM(baseHtml);
  const { document } = dom.window;

  applySeoMetaToDocument(document, resolveSeoMeta(route, isCustomBuild));

  const appElement = document.getElementById('app');
  if (!appElement) {
    throw new Error('预渲染失败：未找到 #app 容器');
  }

  appElement.innerHTML = renderPrerenderMarkup(route);
  document.body.setAttribute('data-prerender-path', route.path);

  return `<!DOCTYPE html>\n${document.documentElement.outerHTML}`;
}
