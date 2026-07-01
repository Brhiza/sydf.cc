import { describe, expect, it } from 'vitest';
import {
  formatQimenMethodLabel,
  formatQimenScopeLabel,
  formatQimenSettingsLabel,
} from './qimen-settings';

describe('qimen-settings', () => {
  it('会格式化默认奇门排盘设置', () => {
    expect(formatQimenScopeLabel()).toBe('时家');
    expect(formatQimenMethodLabel()).toBe('转盘法');
    expect(formatQimenSettingsLabel()).toBe('时家转盘法');
  });

  it('会格式化指定奇门排盘设置', () => {
    expect(formatQimenSettingsLabel({ method: 'feipan', scope: 'day' })).toBe('日家飞盘法');
    expect(formatQimenSettingsLabel({ method: 'zhuanpan', scope: 'year' })).toBe('年家转盘法');
  });
});
