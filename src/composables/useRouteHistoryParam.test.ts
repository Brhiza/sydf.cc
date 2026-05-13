import { describe, expect, it, vi } from 'vitest';
import { useRouteHistoryParam } from './useRouteHistoryParam';

function createRoute(query: Record<string, unknown> = {}, path = '/divination/daily') {
  return { path, query };
}

function createRouter() {
  return { replace: vi.fn() };
}

describe('useRouteHistoryParam', () => {
  describe('getRouteHistoryId', () => {
    it('historyId 为空时返回 null', () => {
      const route = createRoute();
      const { getRouteHistoryId } = useRouteHistoryParam({ route, router: createRouter() });
      expect(getRouteHistoryId()).toBeNull();
    });

    it('historyId 非字符串时返回 null', () => {
      const route = createRoute({ historyId: ['a', 'b'] });
      const { getRouteHistoryId } = useRouteHistoryParam({ route, router: createRouter() });
      expect(getRouteHistoryId()).toBeNull();
    });

    it('historyId 仅含空白时返回 null', () => {
      const route = createRoute({ historyId: '   ' });
      const { getRouteHistoryId } = useRouteHistoryParam({ route, router: createRouter() });
      expect(getRouteHistoryId()).toBeNull();
    });

    it('historyId 有效时返回去除空白的字符串', () => {
      const route = createRoute({ historyId: '  abc123  ' });
      const { getRouteHistoryId } = useRouteHistoryParam({ route, router: createRouter() });
      expect(getRouteHistoryId()).toBe('abc123');
    });
  });

  describe('clearHistoryParam', () => {
    it('historyId 为空时不调用 router.replace', () => {
      const route = createRoute();
      const router = createRouter();
      const { clearHistoryParam } = useRouteHistoryParam({ route, router });
      clearHistoryParam();
      expect(router.replace).not.toHaveBeenCalled();
    });

    it('router 为 null 时安全跳过', () => {
      const route = createRoute({ historyId: 'abc' });
      const { clearHistoryParam } = useRouteHistoryParam({ route, router: null });
      expect(() => clearHistoryParam()).not.toThrow();
    });

    it('调用 router.replace 移除 historyId 但保留其他参数', () => {
      const route = createRoute({ historyId: 'abc', tab: 'detail' });
      const router = createRouter();
      const { clearHistoryParam } = useRouteHistoryParam({ route, router });
      clearHistoryParam();
      expect(router.replace).toHaveBeenCalledTimes(1);
      const arg = router.replace.mock.calls[0][0];
      expect(arg.path).toBe('/divination/daily');
      expect(arg.query).toEqual({ tab: 'detail' });
    });

    it('route.path 为空时使用 fallbackPath', () => {
      const route = createRoute({ historyId: 'abc' }, '');
      const router = createRouter();
      const { clearHistoryParam } = useRouteHistoryParam({
        route,
        router,
        fallbackPath: '/fallback',
      });
      clearHistoryParam();
      expect(router.replace.mock.calls[0][0].path).toBe('/fallback');
    });

    it('fallbackPath 也为空时使用根路径', () => {
      const route = createRoute({ historyId: 'abc' }, '');
      const router = createRouter();
      const { clearHistoryParam } = useRouteHistoryParam({ route, router });
      clearHistoryParam();
      expect(router.replace.mock.calls[0][0].path).toBe('/');
    });
  });
});
