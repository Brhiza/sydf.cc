import { describe, expect, it } from 'vitest';
import {
  meihuaAnimalOptions,
  meihuaColorOptions,
  meihuaDirectionOptions,
  meihuaObjectOptions,
  meihuaPersonOptions,
  meihuaSoundOptions,
} from './meihua-omens';

describe('meihua-omens', () => {
  it('应集中导出梅花外应选项，供页面直接复用', () => {
    expect(meihuaDirectionOptions.map((item) => item.name)).toContain('东');
    expect(meihuaPersonOptions.map((item) => item.name)).toContain('少女');
    expect(meihuaAnimalOptions.map((item) => item.name)).toContain('马');
    expect(meihuaObjectOptions.map((item) => item.name)).toContain('金玉圆器');
    expect(meihuaSoundOptions.map((item) => item.name)).toContain('洪亮金石');
    expect(meihuaColorOptions.map((item) => item.name)).toContain('金白');
  });
});
