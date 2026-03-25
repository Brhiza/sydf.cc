import { afterEach, describe, expect, it } from 'vitest';

import { TimeManager } from '../../utils/timeManager';
import { generateQimen } from './qimen';

describe('奇门格局标签', () => {
  afterEach(() => {
    TimeManager.setTimezoneOffsetMinutesOverride(null);
  });

  it('应能识别星伏吟', () => {
    TimeManager.setTimezoneOffsetMinutesOverride(480);

    const data = generateQimen(new Date('2025-01-02T08:00:00+08:00'));

    expect(data.patternTags).toContain('星伏吟');
  });

  it('应能识别门伏吟与星反吟并存', () => {
    TimeManager.setTimezoneOffsetMinutesOverride(480);

    const data = generateQimen(new Date('2025-01-03T10:00:00+08:00'));

    expect(data.patternTags).toEqual(expect.arrayContaining(['星反吟', '门伏吟']));
  });

  it('应能识别门迫', () => {
    TimeManager.setTimezoneOffsetMinutesOverride(480);

    const data = generateQimen(new Date('2025-01-01T12:00:00+08:00'));

    expect(data.patternTags).toEqual(expect.arrayContaining(['门迫（巽四宫惊门）']));
    expect(data.patternDetails).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          tag: '门迫（巽四宫惊门）',
          summary: '门受宫克，该宫事项易受压制，行动阻力偏大。',
        }),
      ])
    );
    expect(data.palaceInsights).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          gong: 4,
          level: '风险',
        }),
      ])
    );
  });

  it('应能识别击刑', () => {
    TimeManager.setTimezoneOffsetMinutesOverride(480);

    const data = generateQimen(new Date('2000-01-22T00:00:00+08:00'));

    expect(data.patternTags).toEqual(expect.arrayContaining(['击刑（时干戊落震三宫）']));
    expect(data.patternDetails).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          tag: '击刑（时干戊落震三宫）',
          summary: '时干落击刑位，主压力、掣肘或规章束缚，宜谨慎行事。',
        }),
      ])
    );
    expect(data.palaceInsights).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          gong: 3,
          level: '风险',
        }),
      ])
    );
  });
});
