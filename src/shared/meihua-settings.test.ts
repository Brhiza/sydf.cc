import { describe, expect, it } from 'vitest';
import { normalizeMeihuaSettings } from './meihua-settings';

describe('meihua-settings', () => {
  it('未传或非法设置应回到默认时间起卦', () => {
    expect(normalizeMeihuaSettings()).toBeUndefined();
    expect(normalizeMeihuaSettings({ method: 'bad-method' })).toBeUndefined();
    expect(normalizeMeihuaSettings({ method: 'number', number: 0 })).toBeUndefined();
    expect(normalizeMeihuaSettings({ method: 'number', number: 12.5 })).toBeUndefined();
    expect(normalizeMeihuaSettings({ method: 'external', externalOmens: {} })).toBeUndefined();
  });

  it('数字起卦只保留正整数', () => {
    expect(normalizeMeihuaSettings({ method: 'number', number: 123456 })).toEqual({
      method: 'number',
      number: 123456,
    });
  });

  it('外应起卦只保留可映射且完整的外应信息', () => {
    expect(
      normalizeMeihuaSettings({
        method: 'external',
        externalOmens: {
          direction: '东',
          person: '长男',
          count: 7,
          animal: '不存在',
        },
      })
    ).toEqual({
      method: 'external',
      externalOmens: {
        direction: '东',
        person: '长男',
        count: 7,
      },
    });
  });
});
