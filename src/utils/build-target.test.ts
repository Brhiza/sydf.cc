import { describe, expect, it } from 'vitest';
import { isCustomBuild } from './build-target';

describe('isCustomBuild', () => {
  it('当构建目标显式为 CUSTOM 时应返回 true', () => {
    expect(isCustomBuild({ buildTarget: 'CUSTOM' })).toBe(true);
  });

  it('当未配置构建目标但 mode 为 oyyy 时应返回 true', () => {
    expect(isCustomBuild({ mode: 'oyyy' })).toBe(true);
  });

  it('当构建目标为空且 mode 不是 oyyy 时应返回 false', () => {
    expect(isCustomBuild({ buildTarget: '', mode: 'production' })).toBe(false);
  });
});
