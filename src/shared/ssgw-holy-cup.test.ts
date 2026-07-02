import { describe, expect, it, vi } from 'vitest';
import { resolveSsgwHolyCupResult, tossSsgwHolyCup } from './ssgw-holy-cup';

describe('ssgw-holy-cup', () => {
  it('一平一凸应判定为圣杯', () => {
    expect(resolveSsgwHolyCupResult('ping', 'tu')).toBe('圣杯');
    expect(resolveSsgwHolyCupResult('tu', 'ping')).toBe('圣杯');
  });

  it('两平应判定为笑杯，两凸应判定为阴杯', () => {
    expect(resolveSsgwHolyCupResult('ping', 'ping')).toBe('笑杯');
    expect(resolveSsgwHolyCupResult('tu', 'tu')).toBe('阴杯');
  });

  it('投掷只返回杯筊确认结果，不生成签号', () => {
    const random = vi.fn().mockReturnValueOnce(0.6).mockReturnValueOnce(0.4);

    expect(tossSsgwHolyCup(random)).toEqual({
      result: '圣杯',
      bei1: 'ping',
      bei2: 'tu',
    });
    expect(random).toHaveBeenCalledTimes(2);
  });
});
