import { afterEach, describe, expect, it, vi } from 'vitest';

import { TimeManager } from '../../utils/timeManager';
import { TimeManager as McTimeManager } from 'mingyu-core/calendar';
import { generateMeihua } from 'mingyu-core/divination/meihua';

function setBothTimezones(offset: number) {
  TimeManager.setTimezoneOffsetMinutesOverride(offset);
  McTimeManager.setTimezoneOffsetMinutesOverride(offset);
}

describe('梅花易数分支起卦', () => {
  afterEach(() => {
    TimeManager.setTimezoneOffsetMinutesOverride(null);
    McTimeManager.setTimezoneOffsetMinutesOverride(null);
    vi.restoreAllMocks();
  });

  it('数字起卦应按数字规则生成主卦、动爻和变卦体用', () => {
    setBothTimezones(480);

    const data = generateMeihua(new Date('2026-03-16T12:00:00+08:00'), {
      method: 'number',
      number: 123456,
    });

    expect(data.calculation).toMatchObject({
      method: '数字起卦法',
      number: 123456,
      upperTrigramIndex: 8,
      lowerTrigramIndex: 7,
      movingYaoIndex: 1,
    });
    expect(data.originalName).toBe('地山谦');
    expect(data.changedName).toBe('地火明夷');
    expect(data.tiGua.name).toBe('坤');
    expect(data.yongGua.name).toBe('艮');
    expect(data.changedTiGua?.name).toBe('坤');
    expect(data.changedYongGua?.name).toBe('离');
    expect(data.analysis.changedTiYongRelation).toBe('用生体');
  });

  it('随机起卦应直接使用随机出的上下卦与动爻', () => {
    setBothTimezones(480);
    const randomSpy = vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0);

    const data = generateMeihua(new Date('2026-03-16T12:00:00+08:00'), {
      method: 'random',
    });

    expect(randomSpy).toHaveBeenCalledTimes(3);
    expect(data.calculation).toMatchObject({
      method: '随机起卦法',
      upperTrigramIndex: 1,
      lowerTrigramIndex: 1,
      movingYaoIndex: 1,
    });
    expect(data.originalName).toBe('乾为天');
    expect(data.tiGua.name).toBe('乾');
    expect(data.yongGua.name).toBe('乾');
  });
});
