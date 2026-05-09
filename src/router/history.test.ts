import { describe, expect, it } from 'vitest';
import historyRoutes from './history';

describe('history router', () => {
  it('历史模块只保留列表页路由，不再保留独立详情入口', () => {
    expect(historyRoutes).toHaveLength(1);
    expect(historyRoutes[0]).toMatchObject({
      path: '/history',
      name: 'history',
    });
    expect(historyRoutes.some((route) => route.name === 'history-detail')).toBe(false);
  });
});
