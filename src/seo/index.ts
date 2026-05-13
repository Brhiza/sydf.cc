import type { Router } from 'vue-router';
import { applySeoMeta } from './dom';
import { resolveSeoMeta, type RouteLike } from './resolve';

export { applySeoMeta, applySeoMetaToDocument } from './dom';
export { resolveSeoMeta, type ResolvedSeoMeta, type RouteLike } from './resolve';

interface SetupSeoOptions {
  isCustomBuild: boolean;
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
