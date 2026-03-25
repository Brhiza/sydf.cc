import { beforeEach, describe, expect, it, vi } from 'vitest';

const {
  mockGenerateLiuyao,
  mockGenerateMeihua,
  mockGenerateQimen,
  mockDrawSingleCard,
  mockDrawSpreadCards,
  mockGetCardKeywords,
  mockGetSignByNumber,
  mockCalculateDailyFortune,
} = vi.hoisted(() => ({
  mockGenerateLiuyao: vi.fn(() => ({ type: 'liuyao-result' })),
  mockGenerateMeihua: vi.fn(() => ({ calculation: { method: '年月日时起卦法' } })),
  mockGenerateQimen: vi.fn(() => ({ type: 'qimen-result' })),
  mockDrawSingleCard: vi.fn(),
  mockDrawSpreadCards: vi.fn(),
  mockGetCardKeywords: vi.fn(() => '关键词'),
  mockGetSignByNumber: vi.fn(),
  mockCalculateDailyFortune: vi.fn(() => ({ type: 'daily-result' })),
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
  drawSingleCard: mockDrawSingleCard,
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

describe('DataGenerationService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('六爻、奇门应始终走默认算法入口', async () => {
    await dataGenerationService.generateDivination('liuyao', undefined, undefined, {
      divinationMethod: 'number',
      divinationNumber: 123456,
    });
    await dataGenerationService.generateDivination('qimen', undefined, undefined, {
      divinationMethod: 'number',
      divinationNumber: 789,
    });

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
    expect(mockCalculateDailyFortune.mock.calls[0][0]).toBeInstanceOf(Date);
  });
});
