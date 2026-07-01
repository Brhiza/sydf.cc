import { afterEach, describe, expect, it } from 'vitest';

import { TimeManager } from '../../utils/timeManager';
import { TimeManager as McTimeManager } from 'mingyu-core/calendar';
import { generateQimen } from 'mingyu-core/divination/qimen';
import { calculateDailyFortune } from './daily';

function setBothTimezones(offset: number) {
  TimeManager.setTimezoneOffsetMinutesOverride(offset);
  McTimeManager.setTimezoneOffsetMinutesOverride(offset);
}

describe('今日运势算法', () => {
  afterEach(() => {
    TimeManager.setTimezoneOffsetMinutesOverride(null);
    McTimeManager.setTimezoneOffsetMinutesOverride(null);
  });

  it('日家奇门排盘应直接使用 mingyu-core 输出', () => {
    setBothTimezones(480);

    const targetDate = new Date('2025-01-03T10:00:00+08:00');
    const coreQimen = generateQimen(targetDate, 'zhuanpan', 'day');
    const fortune = calculateDailyFortune(targetDate);

    expect(fortune.qimen.jiuGongGe).toEqual(coreQimen.jiuGongGe);
    expect(fortune.qimen.timeInfo).toEqual({
      solarTerm: coreQimen.timeInfo.solarTerm,
      epoch: coreQimen.timeInfo.epoch,
      juShu: coreQimen.juShu,
      dunType: coreQimen.isYangDun ? '阳遁' : '阴遁',
      zhiFu: coreQimen.zhiFu,
      zhiShi: coreQimen.zhiShi,
    });
    expect(fortune.qimen.jiuGongGe).toHaveLength(9);
  });
});
