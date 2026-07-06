import { afterEach, describe, expect, it } from 'vitest';

import { TimeManager } from '../../utils/timeManager';
import { TimeManager as McTimeManager } from 'mingyu-core/calendar';
import { generateQimen } from 'mingyu-core/divination/qimen';

function setBothTimezones(offset: number) {
  TimeManager.setTimezoneOffsetMinutesOverride(offset);
  McTimeManager.setTimezoneOffsetMinutesOverride(offset);
}

describe('奇门格局标签', () => {
  afterEach(() => {
    TimeManager.setTimezoneOffsetMinutesOverride(null);
    McTimeManager.setTimezoneOffsetMinutesOverride(null);
  });

  it('应能识别星伏吟', () => {
    setBothTimezones(480);

    const data = generateQimen(new Date('2025-01-01T16:00:00+08:00'));

    expect(data.patternTags).toContain('星伏吟');
  });

  it('应能识别 mingyu-core 的反吟与增强格局', () => {
    setBothTimezones(480);

    const data = generateQimen(new Date('2025-01-03T18:00:00+08:00'));

    expect(data.patternTags).toEqual(expect.arrayContaining(['星反吟']));
    expect(data.patternTags?.some((tag) => tag.startsWith('三奇得'))).toBe(true);
    expect(data.classicPatterns?.length).toBeGreaterThan(0);
    expect(data.horseStar?.branch).toBeTypeOf('string');
  });

  it('应能识别门迫', () => {
    setBothTimezones(480);

    const data = generateQimen(new Date('2025-01-01T12:00:00+08:00'));

    const menpoTag = data.patternTags?.find((tag) => tag.startsWith('门迫'));

    expect(menpoTag).toBeTypeOf('string');
    expect(data.patternDetails).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          tag: menpoTag,
          summary: '门克宫，该宫事项易受压制，行动阻力偏大。',
        }),
      ])
    );
    expect(data.palaceInsights?.some((item) => item.level === '风险')).toBe(true);
  });

  it('应能识别门伏吟', () => {
    setBothTimezones(480);

    const data = generateQimen(new Date('2000-01-22T00:00:00+08:00'));

    expect(data.patternTags).toEqual(expect.arrayContaining(['门伏吟']));
    expect(data.palaceInsights).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          gong: 3,
          level: '风险',
        }),
      ])
    );
  });

  it('应支持原生飞盘法并保留完整九宫', () => {
    setBothTimezones(480);

    const data = generateQimen(new Date('2025-01-03T10:00:00+08:00'), 'feipan');

    expect(data.jiuGongGe).toHaveLength(9);
    expect(data.patternTags?.length).toBeGreaterThan(0);
  });

  it('应支持日家奇门排盘级别', () => {
    setBothTimezones(480);

    const data = generateQimen(new Date('2025-01-03T10:00:00+08:00'), 'zhuanpan', 'day');

    expect(data.scope).toBe('day');
    expect(data.jiuGongGe).toHaveLength(9);
    expect(data.yingQi?.description).toBeTypeOf('string');
  });
});
