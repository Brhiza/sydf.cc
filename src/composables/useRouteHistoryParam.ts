import type { LocationQueryRaw } from 'vue-router';

export interface RouteLikeForHistory {
  path?: string;
  query: Record<string, unknown>;
}

export interface RouterLikeForHistory {
  replace: (to: { path: string; query: LocationQueryRaw }) => unknown;
}

export interface UseRouteHistoryParamOptions {
  route: RouteLikeForHistory;
  router: RouterLikeForHistory | null;
  fallbackPath?: string;
}

export function useRouteHistoryParam(options: UseRouteHistoryParamOptions) {
  function getRouteHistoryId(): string | null {
    const historyId = options.route.query.historyId;
    if (typeof historyId !== 'string') {
      return null;
    }
    const trimmed = historyId.trim();
    return trimmed ? trimmed : null;
  }

  function clearHistoryParam(): void {
    const historyId = getRouteHistoryId();
    if (!historyId || !options.router) {
      return;
    }

    const newQuery = { ...options.route.query };
    delete newQuery.historyId;
    options.router.replace({
      path: options.route.path || options.fallbackPath || '/',
      query: newQuery as LocationQueryRaw,
    });
  }

  return { getRouteHistoryId, clearHistoryParam };
}
