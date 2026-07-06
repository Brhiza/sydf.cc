import { describe, expect, it } from 'vitest';
import { normalizeMeihuaSettings } from './meihua-settings';

describe('meihua-settings', () => {
  it('未传或非法设置应回到默认时间起卦', () => {
    expect(normalizeMeihuaSettings()).toBeUndefined();
    expect(normalizeMeihuaSettings({ method: 'bad-method' })).toBeUndefined();
    expect(normalizeMeihuaSettings({ method: 'external' })).toBeUndefined();
    expect(normalizeMeihuaSettings({ method: 'number', number: 0 })).toBeUndefined();
    expect(normalizeMeihuaSettings({ method: 'number', number: 12.5 })).toBeUndefined();
  });

  it('数字起卦只保留正整数', () => {
    expect(normalizeMeihuaSettings({ method: 'number', number: 123456 })).toEqual({
      method: 'number',
      number: 123456,
    });
  });

  it('随机起卦只保留起卦方式', () => {
    expect(normalizeMeihuaSettings({ method: 'random', number: 123456 })).toEqual({
      method: 'random',
    });
  });
});
