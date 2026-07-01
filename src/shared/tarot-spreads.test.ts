import { describe, expect, it } from 'vitest';
import { DEFAULT_TAROT_SPREAD_KEY, resolveTarotSpreadName } from './tarot-spreads';

describe('tarot-spreads', () => {
  it('默认塔罗牌阵应保持单牌指引，保证用户直接可用', () => {
    expect(DEFAULT_TAROT_SPREAD_KEY).toBe('single');
  });

  it('优先使用结果内已有牌阵名称', () => {
    expect(resolveTarotSpreadName({ spreadName: '自定义牌阵', spreadType: 'single', cardCount: 1 })).toBe(
      '自定义牌阵'
    );
  });

  it('会按 mingyu-core 牌阵类型解析名称', () => {
    expect(resolveTarotSpreadName({ spreadType: 'single' })).toBe('单牌指引');
    expect(resolveTarotSpreadName({ spreadType: 'three' })).toBe('时间流牌阵');
  });

  it('旧数据缺少牌阵类型时会按卡牌数量兜底', () => {
    expect(resolveTarotSpreadName({ cardCount: 1 })).toBe('单牌指引');
    expect(resolveTarotSpreadName({ cardCount: 3 })).toBe('时间流牌阵');
    expect(resolveTarotSpreadName({ cardCount: 2 })).toBeUndefined();
  });
});
