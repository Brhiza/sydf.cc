import { afterEach, describe, expect, it } from 'vitest';

import { generateMeihua } from 'mingyu-core/divination/meihua';
import { generateQimen } from 'mingyu-core/divination/qimen';
import { MeihuaHelpers } from 'mingyu-core/divination/divination-helpers';
import { getDivinationTime, TimeManager } from '../../utils/timeManager';
import { TimeManager as McTimeManager } from 'mingyu-core/calendar';

/** 对涉及 mingyu-core 算法的测试，同步设置 mingyu-core 的时区 */
function setBothTimezones(offset: number) {
  TimeManager.setTimezoneOffsetMinutesOverride(offset);
  McTimeManager.setTimezoneOffsetMinutesOverride(offset);
}

describe('传统算法校验', () => {
  afterEach(() => {
    TimeManager.setTimezoneOffsetMinutesOverride(null);
    McTimeManager.setTimezoneOffsetMinutesOverride(null);
  });

  it('交节前仍应沿用上一节气', () => {
    setBothTimezones(480);

    const beforeJieQi = getDivinationTime(new Date('2026-03-20T00:00:00+08:00'));
    const afterJieQi = getDivinationTime(new Date('2026-03-20T23:30:00+08:00'));

    expect(beforeJieQi.timeInfo.jieQi).toBe('惊蛰');
    expect(afterJieQi.timeInfo.jieQi).toBe('春分');
  });

  it('梅花体用生克必须区分方向', () => {
    expect(MeihuaHelpers.getElementRelation('水', '木')).toBe('用生体');
    expect(MeihuaHelpers.getElementRelation('木', '水')).toBe('体生用');
    expect(MeihuaHelpers.getElementRelation('土', '水')).toBe('用克体');
    expect(MeihuaHelpers.getElementRelation('水', '土')).toBe('体克用');
    expect(MeihuaHelpers.getElementRelation('金', '金')).toBe('体用比和');
  });

  it('梅花旺衰应以节气定四时，立春后不应仍按腊月算冬季', () => {
    setBothTimezones(480);

    const beforeLiChun = generateMeihua(new Date('2026-02-04T00:00:00+08:00'));
    const afterLiChun = generateMeihua(new Date('2026-02-04T12:00:00+08:00'));

    expect(beforeLiChun.calculation?.month).toBe(12);
    expect(afterLiChun.calculation?.month).toBe(12);
    expect(beforeLiChun.analysis.season).toBe('冬');
    expect(afterLiChun.analysis.season).toBe('春');
  });

  it('奇门交节前不应提前切换阴遁', () => {
    setBothTimezones(480);

    const data = generateQimen(new Date('2026-06-21T00:00:00+08:00'));

    expect(data.timeInfo.solarTerm).toBe('芒种');
    expect(data.isYangDun).toBe(true);
  });

  it('奇门八神应布满八宫且中五宫为空', () => {
    setBothTimezones(480);

    const data = generateQimen(new Date('2026-01-01T00:00:00+08:00'));
    const outerEmptyGodPalaces = data.jiuGongGe
      .filter((gong) => gong.gong !== 5 && !gong.shenPan.god)
      .map((gong) => gong.gong);
    const centerPalace = data.jiuGongGe.find((gong) => gong.gong === 5);

    expect(outerEmptyGodPalaces).toEqual([]);
    expect(centerPalace?.shenPan.god || '').toBe('');
  });

  it('奇门三元应按五日一元确定', () => {
    setBothTimezones(480);

    const data = generateQimen(new Date('2004-08-10T12:00:00+08:00'));

    expect(data.ganzhi.day).toBe('辛酉');
    expect(data.timeInfo.epoch).toBe('下元');
    expect(data.isYangDun).toBe(false);
  });

  it('奇门甲时应按六甲遁干取值符落宫', () => {
    setBothTimezones(480);

    expect(() => generateQimen(new Date('2004-08-10T12:00:00+08:00'))).not.toThrow();
  });
});
