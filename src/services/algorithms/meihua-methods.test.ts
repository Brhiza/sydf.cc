import { afterEach, describe, expect, it, vi } from 'vitest';

import { TimeManager } from '../../utils/timeManager';
import { generateMeihua } from './meihua';

describe('梅花易数分支起卦', () => {
  afterEach(() => {
    TimeManager.setTimezoneOffsetMinutesOverride(null);
    vi.restoreAllMocks();
  });

  it('数字起卦应按数字规则生成主卦、动爻和变卦体用', () => {
    TimeManager.setTimezoneOffsetMinutesOverride(480);

    const data = generateMeihua(new Date('2026-03-16T12:00:00+08:00'), {
      method: 'number',
      number: 123456,
    });

    expect(data.calculation).toMatchObject({
      method: '数字起卦法',
      number: 123456,
      upperTrigramIndex: 8,
      lowerTrigramIndex: 8,
      movingYaoIndex: 6,
    });
    expect(data.originalName).toBe('坤为地');
    expect(data.changedName).toBe('雷地豫');
    expect(data.tiGua.name).toBe('坤');
    expect(data.yongGua.name).toBe('坤');
    expect(data.changedTiGua?.name).toBe('坤');
    expect(data.changedYongGua?.name).toBe('震');
    expect(data.analysis.changedTiYongRelation).toBe('用克体');
  });

  it('随机起卦应直接使用随机出的上下卦与动爻', () => {
    TimeManager.setTimezoneOffsetMinutesOverride(480);
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

  it('外应起卦应按方位优先、数量定动爻并映射外应成卦', () => {
    TimeManager.setTimezoneOffsetMinutesOverride(480);

    const data = generateMeihua(new Date('2026-03-16T12:00:00+08:00'), {
      method: 'external',
      externalOmens: {
        direction: '东',
        person: '少女',
        count: 5,
      },
    });

    expect(data.calculation).toMatchObject({
      method: '外应起卦法',
      upperTrigramIndex: 4,
      lowerTrigramIndex: 2,
      movingYaoIndex: 5,
    });
    expect(data.calculation?.externalSummary).toContain('方位：东（震）');
    expect(data.calculation?.externalSummary).toContain('人物：少女（兑）');
    expect(data.originalName).toBe('雷泽归妹');
    expect(data.changedName).toBe('风泽中孚');
    expect(data.tiGua.name).toBe('兑');
    expect(data.yongGua.name).toBe('震');
    expect(data.changedTiGua?.name).toBe('兑');
    expect(data.changedYongGua?.name).toBe('巽');
    expect(data.analysis.tiYongRelation).toBe('体克用');
    expect(data.analysis.changedTiYongRelation).toBe('体克用');
  });

  it('外应起卦缺少数量时应报错', () => {
    expect(() =>
      generateMeihua(new Date('2026-03-16T12:00:00+08:00'), {
        method: 'external',
        externalOmens: {
          direction: '东',
          person: '少女',
        },
      })
    ).toThrow('外应起卦必须提供数量');
  });
});
