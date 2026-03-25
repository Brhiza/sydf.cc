import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { JSDOM } from 'jsdom';
import { createPrerenderHtml, getPrerenderRoutes } from './prerender';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const baseHtml = readFileSync(path.resolve(currentDir, '../../index.html'), 'utf8');

describe('getPrerenderRoutes', () => {
  it('应包含核心公开页面并排除设置页', () => {
    const routes = getPrerenderRoutes(false);
    const routePaths = routes.map((route) => route.path);

    expect(routePaths).toContain('/');
    expect(routePaths).toContain('/divination/daily');
    expect(routePaths).toContain('/divination/tarot');
    expect(routePaths).toContain('/gongdeboard');
    expect(routePaths).not.toContain('/settings');
    expect(routePaths).not.toContain('/history');
  });

  it('自定义构建不应包含关于页和人工咨询页', () => {
    const routes = getPrerenderRoutes(true);
    const routePaths = routes.map((route) => route.path);

    expect(routePaths).not.toContain('/about');
    expect(routePaths).not.toContain('/rengong');
    expect(routePaths).not.toContain('/gongdebox');
  });
});

describe('createPrerenderHtml', () => {
  it('应生成带有独立标题、canonical 和 noscript 回退正文的页面 HTML', () => {
    const route = getPrerenderRoutes(false).find((item) => item.path === '/divination/liuyao');

    expect(route).toBeDefined();

    const html = createPrerenderHtml(baseHtml, route!, false);
    const dom = new JSDOM(html);
    const { document } = dom.window;

    expect(document.title).toContain('六爻在线占卜');
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://sydf.cc/divination/liuyao'
    );
    expect(document.querySelector('#app > noscript')?.innerHTML).toContain('六爻占卜');
    expect(document.body.getAttribute('data-prerender-path')).toBe('/divination/liuyao');
    expect(document.querySelector('[data-seo-prerender="true"]')).not.toBeNull();
  });
});
