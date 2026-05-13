import { describe, expect, it, vi } from 'vitest';
import type { NavigationGuardWithThis } from 'vue-router';
import divinationRoutes from './divination';

describe('divination router', () => {
  it('正式卦种路由应放行，旧单牌兼容路由应回落到未找到页', () => {
    const mainRoute = divinationRoutes.find((route) => route.name === 'divination');
    expect(mainRoute?.beforeEnter).toBeTypeOf('function');

    const beforeEnter = mainRoute?.beforeEnter as
      | NavigationGuardWithThis<undefined>
      | undefined;

    const nextForTarot = vi.fn();
    beforeEnter?.call(
      undefined,
      { params: { type: 'tarot' } } as never,
      {} as never,
      nextForTarot
    );
    expect(nextForTarot).toHaveBeenCalledWith();

    const nextForLegacyTarot = vi.fn();
    beforeEnter?.call(
      undefined,
      { params: { type: 'tarot_single' } } as never,
      {} as never,
      nextForLegacyTarot
    );
    expect(nextForLegacyTarot).toHaveBeenCalledWith({ name: 'not-found' });
  });

  it('旧三山国王短链仍应重定向到统一结果页路由', () => {
    const legacyRoute = divinationRoutes.find((route) => route.path === '/ssgw');

    expect(legacyRoute).toMatchObject({
      redirect: '/divination/ssgw',
    });
  });
});
