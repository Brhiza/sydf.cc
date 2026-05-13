import { describe, expect, it } from 'vitest';
import {
  getTarotCardClass,
  getTarotCardStyle,
  resolveTarotLayout,
} from './tarot-layout';

describe('tarot-layout', () => {
  it('会按牌阵类型返回固定布局类名', () => {
    expect(resolveTarotLayout(5, 'love').className).toBe('layout-love');
    expect(resolveTarotLayout(10, 'celtic').className).toBe('layout-celtic');
  });

  it('未显式指定牌阵时会按牌数回退布局', () => {
    expect(resolveTarotLayout(1).className).toBe('layout-single');
    expect(resolveTarotLayout(3).className).toBe('layout-three');
    expect(resolveTarotLayout(5).className).toBe('layout-grid');
    expect(resolveTarotLayout(9).className).toBe('layout-complex');
    expect(resolveTarotLayout(12).className).toBe('layout-large-complex');
  });

  it('布局模式和样式变量来自统一配置', () => {
    expect(resolveTarotLayout(10, 'celtic').modeClass).toBe('layout-mode-grid');
    expect(resolveTarotLayout(7, 'chakra')).toMatchObject({
      className: 'layout-chakra',
      modeClass: 'layout-mode-flex',
    });

    expect(resolveTarotLayout(3, 'three').styleVars).toMatchObject({
      '--tarot-layout-gap': 'var(--spacing-4)',
      '--tarot-layout-compact-flex-direction': 'column',
      '--tarot-layout-compact-align-items': 'center',
    });
  });

  it('复杂牌阵会保留响应式尺寸配置', () => {
    expect(resolveTarotLayout(12).styleVars).toMatchObject({
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
