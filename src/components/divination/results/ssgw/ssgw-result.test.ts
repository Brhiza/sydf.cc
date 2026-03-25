import { describe, expect, it } from 'vitest';
import { createSsgwHeaderItems } from './ssgw-result';

describe('ssgw-result', () => {
  it('会生成统一的灵签头部信息项', () => {
    const timestamp = new Date(2026, 2, 24, 20, 8, 0).getTime();

    expect(
      createSsgwHeaderItems({
        number: 12,
        title: '春风得意',
        poem: '签文',
        timestamp,
        ganzhi: {
          year: '甲子',
          month: '乙丑',
          day: '丙寅',
          hour: '丁卯',
        },
      })
    ).toEqual([
      { label: '起卦时间', value: '2026年03月24日 20时08分' },
      { label: '干支信息', value: '甲子年 乙丑月 丙寅日 丁卯时' },
      { label: '签号', value: '第12签' },
      { label: '签名', value: '春风得意' },
    ]);
  });
});
