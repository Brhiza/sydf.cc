import { describe, expect, it } from 'vitest';
import {
  DEFAULT_QIMEN_SETTINGS,
  formatQimenMethodLabel,
  formatQimenScopeLabel,
  formatQimenSettingsLabel,
  isDefaultQimenSettings,
  resolveQimenSettings,
} from './qimen-settings';

describe('qimen-settings', () => {
  it('会格式化默认奇门排盘设置', () => {
    expect(formatQimenScopeLabel()).toBe('时家');
    expect(formatQimenMethodLabel()).toBe('转盘法');
    expect(formatQimenSettingsLabel()).toBe('时家转盘法');
  });

  it('会解析默认奇门排盘设置', () => {
    expect(resolveQimenSettings()).toEqual(DEFAULT_QIMEN_SETTINGS);
    expect(resolveQimenSettings({ method: 'feipan' })).toEqual({
      method: 'feipan',
      scope: 'hour',
    });
    expect(isDefaultQimenSettings()).toBe(true);
    expect(isDefaultQimenSettings({ method: 'zhuanpan', scope: 'hour' })).toBe(true);
    expect(isDefaultQimenSettings({ method: 'feipan', scope: 'hour' })).toBe(false);
  });

  it('无效奇门排盘设置应回到默认值', () => {
    const invalidSettings = {
      method: 'unknown',
      scope: 'bad-scope',
    };

    expect(resolveQimenSettings(invalidSettings)).toEqual(DEFAULT_QIMEN_SETTINGS);
    expect(isDefaultQimenSettings(invalidSettings)).toBe(true);
    expect(formatQimenScopeLabel('bad-scope')).toBe('时家');
    expect(formatQimenMethodLabel('unknown')).toBe('转盘法');
  });

  it('会格式化指定奇门排盘设置', () => {
    expect(formatQimenSettingsLabel({ method: 'feipan', scope: 'day' })).toBe('日家飞盘法');
    expect(formatQimenSettingsLabel({ method: 'zhuanpan', scope: 'year' })).toBe('年家转盘法');
  });
});
