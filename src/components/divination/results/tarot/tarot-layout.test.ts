import { describe, expect, it } from 'vitest';
import {
  getTarotCardClass,
  getTarotCardStyle,
  getTarotLayoutClass,
  getTarotLayoutConfig,
  getTarotLayoutModeClass,
  getTarotLayoutStyleVars,
} from './tarot-layout';

describe('tarot-layout', () => {
  it('会按牌阵类型返回固定布局类名', () => {
    expect(getTarotLayoutClass(5, 'love')).toBe('layout-love');
    expect(getTarotLayoutClass(10, 'celtic')).toBe('layout-celtic');
  });

  it('未显式指定牌阵时会按牌数回退布局', () => {
    expect(getTarotLayoutClass(1)).toBe('layout-single');
    expect(getTarotLayoutClass(3)).toBe('layout-three');
    expect(getTarotLayoutClass(5)).toBe('layout-grid');
    expect(getTarotLayoutClass(9)).toBe('layout-complex');
    expect(getTarotLayoutClass(12)).toBe('layout-large-complex');
  });

  it('布局模式和样式变量来自统一配置', () => {
    expect(getTarotLayoutModeClass(10, 'celtic')).toBe('layout-mode-grid');
    expect(getTarotLayoutConfig(7, 'chakra')).toMatchObject({
      className: 'layout-chakra',
      mode: 'flex',
      flexDirection: 'column',
    });

    expect(getTarotLayoutStyleVars(3, 'three')).toMatchObject({
      '--tarot-layout-gap': 'var(--spacing-4)',
      '--tarot-layout-compact-flex-direction': 'column',
      '--tarot-layout-compact-align-items': 'center',
    });
  });

  it('复杂牌阵会保留响应式尺寸配置', () => {
    expect(getTarotLayoutStyleVars(12)).toMatchObject({
      '--tarot-layout-max-width': 'min(95vw, 1200px)',
      '--tarot-layout-mobile-gap': 'var(--spacing-1)',
      '--tarot-layout-compact-max-width': '100%',
    });
  });

  it('凯尔特十字会生成专用定位类名', () => {
    expect(getTarotCardClass('celtic', 1)).toBe('celtic-position-1');
    expect(getTarotCardClass('love', 1)).toBe('');
  });

  it('特殊牌阵会生成预设定位样式', () => {
    expect(getTarotCardStyle('celtic', 1)).toEqual({
      gridArea: '2 / 2',
      transform: 'rotate(90deg)',
      zIndex: 2,
    });
    expect(getTarotCardStyle('chakra', 2)).toEqual({
      order: 5,
    });
    expect(getTarotCardStyle('horseshoe', 6)).toEqual({
      gridArea: '3 / 3',
    });
  });

  it('未知牌阵不会附带额外定位', () => {
    expect(getTarotCardStyle(undefined, 0)).toEqual({});
  });
});
