// @vitest-environment jsdom

import { describe, expect, it } from 'vitest';
import router from './index';

describe('router', () => {
  it('应使用正常路径路由而不是哈希路由', () => {
    expect(router.resolve('/divination/daily').href).toBe('/divination/daily');
    expect(router.resolve('/gongdebox').href).toBe('/gongdebox');
  });
});
