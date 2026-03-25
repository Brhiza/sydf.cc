import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createPrerenderHtml, getPrerenderRoutes } from '../src/seo/prerender';

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const BASE_HTML_PATH = path.join(DIST_DIR, 'index.html');

function isCustomBuild(): boolean {
  return process.argv.includes('--custom-build') || process.env.VITE_APP_BUILD_TARGET === 'CUSTOM';
}

function resolveOutputPath(routePath: string): string {
  if (routePath === '/') {
    return path.join(DIST_DIR, 'index.html');
  }

  const normalizedPath = routePath.replace(/^\/+/, '');
  return path.join(DIST_DIR, normalizedPath, 'index.html');
}

async function writeRouteHtml(routePath: string, html: string): Promise<void> {
  const outputPath = resolveOutputPath(routePath);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, 'utf8');
}

async function main(): Promise<void> {
  const baseHtml = await readFile(BASE_HTML_PATH, 'utf8');
  const customBuild = isCustomBuild();
  const routes = getPrerenderRoutes(customBuild);

  for (const route of routes) {
    const html = createPrerenderHtml(baseHtml, route, customBuild);
    await writeRouteHtml(route.path, html);
  }

  console.log(`已生成 ${routes.length} 个静态 SEO 页面`);
}

void main().catch((error) => {
  console.error('生成静态 SEO 页面失败：', error);
  process.exitCode = 1;
});
