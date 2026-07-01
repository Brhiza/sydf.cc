import { describe, expect, it } from 'vitest';
import {
  isCompatibleDivinationType,
  isDivinationType,
  normalizeDivinationType,
  resolveTarotSpreadType,
} from './divination-type';

describe('divination-type', () => {
  it('旧单牌塔罗类型应统一归一化为普通塔罗', () => {
    expect(normalizeDivinationType('tarot_single')).toBe('tarot');
  });

  it('其他占卜类型应保持原样', () => {
    expect(normalizeDivinationType('qimen')).toBe('qimen');
    expect(normalizeDivinationType('daily')).toBe('daily');
  });

  it('旧单牌塔罗兼容入口应统一回到 single 牌阵', () => {
    expect(resolveTarotSpreadType('tarot_single')).toBe('single');
    expect(resolveTarotSpreadType('tarot')).toBe('single');
    expect(resolveTarotSpreadType('tarot', 'celtic')).toBe('celtic');
    expect(resolveTarotSpreadType('qimen')).toBeUndefined();
  });

  it('兼容类型校验应复用统一名单', () => {
    expect(isCompatibleDivinationType('tarot_single')).toBe(true);
    expect(isCompatibleDivinationType('tarot')).toBe(true);
    expect(isCompatibleDivinationType('unknown')).toBe(false);
  });

  it('正式页面卦种校验不应再接受旧兼容入口', () => {
    expect(isDivinationType('tarot')).toBe(true);
    expect(isDivinationType('daily')).toBe(true);
    expect(isDivinationType('tarot_single')).toBe(false);
  });
});
