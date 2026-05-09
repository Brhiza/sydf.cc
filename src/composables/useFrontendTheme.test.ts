import { describe, expect, it } from 'vitest';
import { getFrontendThemeFromSearch, normalizeFrontendTheme, resolveFrontendTheme } from './useFrontendTheme';

describe('useFrontendTheme', () => {
  it('默认应回落到 v1', () => {
    expect(resolveFrontendTheme()).toBe('v1');
  });

  it('识别查询参数中的 v2 开关', () => {
    expect(getFrontendThemeFromSearch('?frontend-theme=v2')).toBe('v2');
  });

  it('识别存储值中的 v2', () => {
    expect(normalizeFrontendTheme('theme-v2')).toBe('v2');
  });

  it('未知值应忽略', () => {
    expect(normalizeFrontendTheme('unknown')).toBeNull();
  });
});
