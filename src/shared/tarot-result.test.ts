import { describe, expect, it } from 'vitest';

import { mapMingyuTarotResult } from './tarot-result';

describe('tarot-result', () => {
  it('会把 mingyu-core 塔罗结果映射为项目统一结果结构', () => {
    const result = mapMingyuTarotResult(
      {
        spreadType: 'single',
        spreadName: '单牌指引',
        timestamp: 1711111111111,
        cards: [
          {
            card: {
              number: 1,
              name: '愚者',
            },
            isReversed: false,
            position: '当前指引',
          },
        ],
      },
      () => '自由,开始'
    );

    expect(result).toEqual({
      spreadType: 'single',
      spreadName: '单牌指引',
      timestamp: 1711111111111,
      cards: [
        {
          id: 1,
          name: '愚者',
          reversed: false,
          position: '当前指引',
          keywords: ['自由', '开始'],
        },
      ],
    });
  });
});
