import { describe, expect, it } from 'vitest';
import { createTarotHeaderItems } from './tarot-result';

describe('tarot-result', () => {
  it('会生成统一的塔罗头部信息项', () => {
    const timestamp = new Date(2026, 2, 24, 20, 8, 0).getTime();

    expect(createTarotHeaderItems('单牌指引', 1, timestamp)).toEqual([
      { label: '牌阵名称', value: '单牌指引' },
      { label: '抽牌数量', value: '1张牌' },
      { label: '起卦时间', value: '2026年03月24日 20时08分' },
    ]);
  });

  it('没有牌阵名和时间时仍会保留最基础的信息项', () => {
    expect(createTarotHeaderItems('', 3)).toEqual([
      { label: '抽牌数量', value: '3张牌' },
    ]);
  });
});
