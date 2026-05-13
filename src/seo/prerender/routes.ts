import { divinationNavItems, getDivinationConfig } from '../../config/divination';
import type { DivinationType } from '../../types';
import type { RouteLike } from '../resolve';

export interface PrerenderLink {
  href: string;
  label: string;
}

export interface PrerenderContentBlock {
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

function createDivinationRoute(type: DivinationType): PrerenderRoute {
  const config = getDivinationConfig(type);
  if (!config) {
    throw new Error(`未找到占卜配置: ${type}`);
  }
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
      { href: 'https://lk.sydf.cc/', label: '功德箱' }
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
  const routes: PrerenderRoute[] = [];

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
