import { describe, expect, it } from 'vitest';
import { divinationNavItems, getDivinationConfig } from './divination';

describe('divination config', () => {
  it('正式塔罗配置应直接返回统一的塔罗定义', () => {
    const config = getDivinationConfig('tarot');

    expect(config).not.toBeNull();
    expect(config?.type).toBe('tarot');
    expect(config?.title).toBe('塔罗占卜');
  });

  it('导航配置中不应再包含带下划线的独立旧类型', () => {
    expect(divinationNavItems.every((item) => !item.type.includes('_'))).toBe(true);
  });
});
