// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest';
import { applySeoMeta, resolveSeoMeta } from './index';

describe('resolveSeoMeta', () => {
  it('应为首页生成可索引的 SEO 元信息', () => {
    const meta = resolveSeoMeta(
      {
        name: 'home',
        path: '/',
        params: {},
      } as any,
      false
    );

    expect(meta.title).toContain('时月东方');
    expect(meta.description).toContain('AI 在线占卜');
    expect(meta.canonicalUrl).toBe('https://sydf.cc/');
    expect(meta.robots).toBe('index, follow');
  });

  it('应为占卜页面生成对应的 canonical 与描述', () => {
    const meta = resolveSeoMeta(
      {
        name: 'divination',
        path: '/divination/tarot',
        params: {
          type: 'tarot',
        },
      } as any,
      false
    );

    expect(meta.title).toContain('塔罗牌在线占卜');
    expect(meta.description).toContain('塔罗牌在线占卜');
    expect(meta.canonicalUrl).toBe('https://sydf.cc/divination/tarot');
  });

  it('应为历史详情页返回 noindex', () => {
    const meta = resolveSeoMeta(
      {
        name: 'history-detail',
        path: '/history/demo-id',
        params: {
          id: 'demo-id',
        },
      } as any,
      false
    );

    expect(meta.robots).toBe('noindex, nofollow');
  });
});

describe('applySeoMeta', () => {
  afterEach(() => {
    document.title = '';
    document.head.innerHTML = '';
    document.documentElement.lang = '';
  });

  it('应更新文档标题、canonical、OG 与结构化数据', () => {
    applySeoMeta(
      resolveSeoMeta(
        {
          name: 'about',
          path: '/about',
          params: {},
        } as any,
        false
      )
    );

    expect(document.title).toContain('关于本站与使用说明');
    expect(document.documentElement.lang).toBe('zh-CN');
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toContain(
      '项目背景'
    );
    expect(document.querySelector('meta[property="og:url"]')?.getAttribute('content')).toBe(
      'https://sydf.cc/about'
    );
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://sydf.cc/about'
    );
    expect(document.getElementById('seo-structured-data')?.textContent).toContain('BreadcrumbList');
  });
});
