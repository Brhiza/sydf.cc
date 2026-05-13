import { JSDOM } from 'jsdom';
import { applySeoMetaToDocument } from '../dom';
import { resolveSeoMeta } from '../resolve';
import { renderPrerenderMarkup } from './markup';
import type { PrerenderRoute } from './routes';

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
