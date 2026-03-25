import { beforeEach, describe, expect, it, vi } from 'vitest';

const {
  mockGetDivinationTime,
  mockGenerateYaosByTime,
} = vi.hoisted(() => ({
  mockGetDivinationTime: vi.fn(() => ({
    ganzhi: {
      year: '甲子',
      month: '乙丑',
      day: '丙寅',
      hour: '丁卯',
    },
    timestamp: 1711111111111,
  })),
  mockGenerateYaosByTime: vi.fn(() => [6, 9, 6, 9, 6, 9]),
}));

vi.mock('../../utils/timeManager.ts', async () => {
  const actual = await vi.importActual<typeof import('../../utils/timeManager.ts')>('../../utils/timeManager.ts');
  return {
    ...actual,
    getDivinationTime: mockGetDivinationTime,
    generateYaosByTime: mockGenerateYaosByTime,
  };
});

import { generateLiuyao } from './liuyao';

describe('六爻乱动卦', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('全动卦应标记为乱动卦', () => {
    const result = generateLiuyao(new Date('2026-01-01T12:00:00+08:00'));

    expect(mockGenerateYaosByTime).toHaveBeenCalledWith(1711111111111, 6);
    expect(result.changingYaos).toHaveLength(6);
    expect(result.specialPattern).toBe('全动卦');
    expect(result.specialAdvice).toContain('总观本卦与变卦');
    expect(result.isChaotic).toBe(true);
    expect(result.chaoticReason).toContain('乱动卦');
  });
});
