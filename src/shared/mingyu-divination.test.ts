import { beforeEach, describe, expect, it, vi } from 'vitest';

const {
  mockGenerateLiuyao,
  mockGenerateMeihua,
  mockGenerateQimen,
  mockDrawSpreadCards,
  mockGetCardKeywords,
  mockDrawRandomSign,
} = vi.hoisted(() => ({
  mockGenerateLiuyao: vi.fn(() => ({ originalName: '乾为天' })),
  mockGenerateMeihua: vi.fn(() => ({ calculation: { method: '年月日时起卦法' } })),
  mockGenerateQimen: vi.fn(() => ({ scope: 'hour' })),
  mockDrawSpreadCards: vi.fn(() => ({
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
  })),
  mockGetCardKeywords: vi.fn(() => '开始,自由'),
  mockDrawRandomSign: vi.fn(() => ({ number: 1, title: '第一签' })),
}));

vi.mock('mingyu-core/divination/liuyao', () => ({
  generateLiuyao: mockGenerateLiuyao,
}));

vi.mock('mingyu-core/divination/meihua', () => ({
  generateMeihua: mockGenerateMeihua,
}));

vi.mock('mingyu-core/divination/qimen', () => ({
  generateQimen: mockGenerateQimen,
}));

vi.mock('mingyu-core/divination/tarot', () => ({
  drawSpreadCards: mockDrawSpreadCards,
  getCardKeywords: mockGetCardKeywords,
}));

vi.mock('mingyu-core/divination/ssgw', () => ({
  drawRandomSign: mockDrawRandomSign,
}));

import {
  generateMingyuLiuyao,
  generateMingyuMeihua,
  generateMingyuDailyQimen,
  generateMingyuQimen,
  generateMingyuSsgw,
  generateMingyuTarot,
} from './mingyu-divination';
import { DEFAULT_QIMEN_METHOD, DEFAULT_QIMEN_SCOPE } from './qimen-settings';

describe('mingyu-divination', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('六爻应使用 mingyu-core 默认入口', () => {
    generateMingyuLiuyao();

    expect(mockGenerateLiuyao).toHaveBeenCalledWith(undefined);
  });

  it('六爻应支持透传指定时间给 mingyu-core', () => {
    const date = new Date('2026-03-16T12:00:00+08:00');

    generateMingyuLiuyao(date);

    expect(mockGenerateLiuyao).toHaveBeenCalledWith(date);
  });

  it('梅花应把起卦设置透传给 mingyu-core', () => {
    generateMingyuMeihua({ method: 'number', number: 123 });

    expect(mockGenerateMeihua).toHaveBeenCalledWith(undefined, {
      method: 'number',
      number: 123,
    });
  });

  it('梅花应支持透传指定时间和起卦设置', () => {
    const date = new Date('2026-03-16T12:00:00+08:00');

    generateMingyuMeihua({ method: 'number', number: 123 }, date);

    expect(mockGenerateMeihua).toHaveBeenCalledWith(date, {
      method: 'number',
      number: 123,
    });
  });

  it('奇门未传设置时应固定默认时家转盘', () => {
    generateMingyuQimen();

    expect(mockGenerateQimen).toHaveBeenCalledWith(
      undefined,
      DEFAULT_QIMEN_METHOD,
      DEFAULT_QIMEN_SCOPE
    );
  });

  it('奇门应支持透传指定时间并继续固定默认时家转盘', () => {
    const date = new Date('2026-03-16T12:00:00+08:00');

    generateMingyuQimen(undefined, date);

    expect(mockGenerateQimen).toHaveBeenCalledWith(date, DEFAULT_QIMEN_METHOD, DEFAULT_QIMEN_SCOPE);
  });

  it('奇门应透传解析后的原生设置', () => {
    generateMingyuQimen({ method: 'feipan', scope: 'day' });

    expect(mockGenerateQimen).toHaveBeenCalledWith(undefined, 'feipan', 'day');
  });

  it('今日运势日家奇门应固定使用默认方法和日家级别', () => {
    const date = new Date('2025-01-03T10:00:00+08:00');

    generateMingyuDailyQimen(date);

    expect(mockGenerateQimen).toHaveBeenCalledWith(date, DEFAULT_QIMEN_METHOD, 'day');
  });

  it('塔罗未传牌阵时应默认单牌指引，并映射为项目结果结构', async () => {
    const result = await generateMingyuTarot();

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
          keywords: ['开始', '自由'],
        },
      ],
    });
  });

  it('三山国王灵签应使用 mingyu-core 抽签入口', async () => {
    const result = await generateMingyuSsgw();

    expect(mockDrawRandomSign).toHaveBeenCalledWith(undefined);
    expect(result).toMatchObject({ number: 1, title: '第一签' });
  });

  it('三山国王灵签应支持透传指定时间', async () => {
    const date = new Date('2026-03-16T12:00:00+08:00');

    await generateMingyuSsgw(date);

    expect(mockDrawRandomSign).toHaveBeenCalledWith(date);
  });
});
