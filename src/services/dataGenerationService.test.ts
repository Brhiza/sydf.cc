import { beforeEach, describe, expect, it, vi } from 'vitest';

const {
  mockGenerateLiuyao,
  mockGenerateMeihua,
  mockGenerateQimen,
  mockDrawSpreadCards,
  mockGetCardKeywords,
  mockGetSignByNumber,
  mockCalculateDailyFortune,
} = vi.hoisted(() => ({
  mockGenerateLiuyao: vi.fn(() => ({ type: 'liuyao-result' })),
  mockGenerateMeihua: vi.fn(() => ({ calculation: { method: '年月日时起卦法' } })),
  mockGenerateQimen: vi.fn(() => ({ type: 'qimen-result' })),
  mockDrawSpreadCards: vi.fn(),
  mockGetCardKeywords: vi.fn(() => '关键词'),
  mockGetSignByNumber: vi.fn(),
  mockCalculateDailyFortune: vi.fn((_date?: Date) => ({ type: 'daily-result' })),
}));

vi.mock('./algorithms/liuyao', () => ({
  generateLiuyao: mockGenerateLiuyao,
}));

vi.mock('./algorithms/meihua', () => ({
  generateMeihua: mockGenerateMeihua,
}));

vi.mock('./algorithms/qimen', () => ({
  generateQimen: mockGenerateQimen,
}));

vi.mock('@/utils/tarot', () => ({
  drawSpreadCards: mockDrawSpreadCards,
  getCardKeywords: mockGetCardKeywords,
}));

vi.mock('./algorithms/ssgw', () => ({
  getSignByNumber: mockGetSignByNumber,
}));

vi.mock('./algorithms/daily', () => ({
  calculateDailyFortune: mockCalculateDailyFortune,
}));

import { dataGenerationService } from './dataGenerationService';
import type { SupplementaryInfo } from '@/types/divination';

describe('DataGenerationService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('六爻、奇门应始终走默认算法入口', async () => {
    await dataGenerationService.generateDivination('liuyao', undefined, undefined, {
      divinationMethod: 'number',
      divinationNumber: 123456,
    } as unknown as SupplementaryInfo);
    await dataGenerationService.generateDivination('qimen', undefined, undefined, {
      divinationMethod: 'number',
      divinationNumber: 789,
    } as unknown as SupplementaryInfo);

    expect(mockGenerateLiuyao).toHaveBeenCalledWith();
    expect(mockGenerateQimen).toHaveBeenCalledWith();
  });

  it('梅花应透传自定义起卦设置', async () => {
    await dataGenerationService.generateDivination('meihua', undefined, undefined, {
      meihuaSettings: {
        method: 'external',
        externalOmens: {
          direction: '东',
          person: '少女',
          count: 5,
        },
      },
    });

    expect(mockGenerateMeihua).toHaveBeenCalledWith(undefined, {
      method: 'external',
      externalOmens: {
        direction: '东',
        person: '少女',
        count: 5,
      },
    });
  });

  it('今日运势仍应继续读取 supplementaryInfo.date', async () => {
    await dataGenerationService.generateDivination('daily', undefined, undefined, {
      date: '2026-03-16',
    });

    expect(mockCalculateDailyFortune).toHaveBeenCalledTimes(1);
    const calledDate = mockCalculateDailyFortune.mock.calls[0]?.[0] as Date;
    expect(calledDate).toBeInstanceOf(Date);
    expect(calledDate.getFullYear()).toBe(2026);
    expect(calledDate.getMonth()).toBe(2);
    expect(calledDate.getDate()).toBe(16);
    expect(calledDate.getHours()).toBe(12);
  });

  it('塔罗应直接按传入牌阵走统一生成链路', async () => {
    mockDrawSpreadCards.mockReturnValue({
      spreadType: 'single',
      spreadName: '单牌指引',
      cards: [
        {
          card: { number: 1, name: '愚者' },
          isReversed: false,
          position: '当前指引',
        },
      ],
      timestamp: 1711111111111,
    });

    const result = await dataGenerationService.generateDivination('tarot', 'single');

    expect(mockDrawSpreadCards).toHaveBeenCalledWith('single');
    expect(result).toMatchObject({
      spreadType: 'single',
      spreadName: '单牌指引',
      cards: [
        {
          id: 1,
          name: '愚者',
          reversed: false,
          position: '当前指引',
          keywords: ['关键词'],
        },
      ],
    });
  });
});
