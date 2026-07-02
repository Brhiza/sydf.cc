import { beforeEach, describe, expect, it, vi } from 'vitest';

const {
  mockGenerateMingyuLiuyao,
  mockGenerateMingyuMeihua,
  mockGenerateMingyuQimen,
  mockGenerateMingyuTarot,
  mockGenerateMingyuSsgw,
  mockCalculateDailyFortune,
} = vi.hoisted(() => ({
  mockGenerateMingyuLiuyao: vi.fn(() => ({ type: 'liuyao-result' })),
  mockGenerateMingyuMeihua: vi.fn(() => ({ calculation: { method: '年月日时起卦法' } })),
  mockGenerateMingyuQimen: vi.fn(() => ({ type: 'qimen-result' })),
  mockGenerateMingyuTarot: vi.fn(),
  mockGenerateMingyuSsgw: vi.fn(() => ({ type: 'ssgw-result' })),
  mockCalculateDailyFortune: vi.fn((_date?: Date) => ({ type: 'daily-result' })),
}));

vi.mock('@/shared/mingyu-divination', () => ({
  generateMingyuLiuyao: mockGenerateMingyuLiuyao,
  generateMingyuMeihua: mockGenerateMingyuMeihua,
  generateMingyuQimen: mockGenerateMingyuQimen,
  generateMingyuTarot: mockGenerateMingyuTarot,
  generateMingyuSsgw: mockGenerateMingyuSsgw,
}));

vi.mock('./daily-fortune', () => ({
  calculateDailyFortune: mockCalculateDailyFortune,
}));

import { dataGenerationService } from './dataGenerationService';
import type { SupplementaryInfo } from '@/types/divination';

describe('DataGenerationService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('六爻应始终走默认算法入口', async () => {
    await dataGenerationService.generateDivination('liuyao', undefined, {
      divinationMethod: 'number',
      divinationNumber: 123456,
    } as unknown as SupplementaryInfo);

    expect(mockGenerateMingyuLiuyao).toHaveBeenCalledWith();
  });

  it('奇门未指定设置时应继续走默认时家转盘', async () => {
    await dataGenerationService.generateDivination('qimen', undefined, {
      divinationMethod: 'number',
      divinationNumber: 789,
    } as unknown as SupplementaryInfo);

    expect(mockGenerateMingyuQimen).toHaveBeenCalledWith(undefined);
  });

  it('奇门应透传原生排盘设置', async () => {
    await dataGenerationService.generateDivination('qimen', undefined, {
      qimenSettings: {
        method: 'feipan',
        scope: 'day',
      },
    });

    expect(mockGenerateMingyuQimen).toHaveBeenCalledWith({
      method: 'feipan',
      scope: 'day',
    });
  });

  it('梅花应透传自定义起卦设置', async () => {
    await dataGenerationService.generateDivination('meihua', undefined, {
      meihuaSettings: {
        method: 'external',
        externalOmens: {
          direction: '东',
          person: '少女',
          count: 5,
        },
      },
    });

    expect(mockGenerateMingyuMeihua).toHaveBeenCalledWith({
      method: 'external',
      externalOmens: {
        direction: '东',
        person: '少女',
        count: 5,
      },
    });
  });

  it('今日运势仍应继续读取 supplementaryInfo.date', async () => {
    await dataGenerationService.generateDivination('daily', undefined, {
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
    mockGenerateMingyuTarot.mockResolvedValue({
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
      timestamp: 1711111111111,
    });

    const result = await dataGenerationService.generateDivination('tarot', 'single');

    expect(mockGenerateMingyuTarot).toHaveBeenCalledWith('single');
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

  it('塔罗未传牌阵时应使用默认单牌指引', async () => {
    mockGenerateMingyuTarot.mockResolvedValue({
      spreadType: 'single',
      spreadName: '单牌指引',
      cards: [],
      timestamp: 1711111111111,
    });

    await dataGenerationService.generateDivination('tarot');

    expect(mockGenerateMingyuTarot).toHaveBeenCalledWith(undefined);
  });

  it('三山国王灵签应走统一核心库适配入口', async () => {
    await dataGenerationService.generateDivination('ssgw');

    expect(mockGenerateMingyuSsgw).toHaveBeenCalledWith();
  });
});
