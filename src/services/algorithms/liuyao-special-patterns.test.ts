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
  mockGenerateYaosByTime: vi.fn(),
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

describe('六爻特殊卦式', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('无动爻应标记为静卦', () => {
    mockGenerateYaosByTime.mockReturnValue([7, 8, 7, 8, 7, 8]);

    const result = generateLiuyao(new Date('2026-01-01T12:00:00+08:00'));

    expect(result.changingYaos).toHaveLength(0);
    expect(result.specialPattern).toBe('静卦');
    expect(result.specialAdvice).toContain('本卦卦意');
    expect(result.isChaotic).toBe(false);
  });

  it('五动爻应标记为独静卦', () => {
    mockGenerateYaosByTime.mockReturnValue([6, 9, 6, 9, 6, 8]);

    const result = generateLiuyao(new Date('2026-01-01T12:00:00+08:00'));

    expect(result.changingYaos).toHaveLength(5);
    expect(result.specialPattern).toBe('独静卦');
    expect(result.specialAdvice).toContain('独静爻');
    expect(result.isChaotic).toBe(false);
  });

  it('乾卦六动应改按用九处理', () => {
    mockGenerateYaosByTime.mockReturnValue([9, 9, 9, 9, 9, 9]);

    const result = generateLiuyao(new Date('2026-01-01T12:00:00+08:00'));

    expect(result.originalName).toBe('乾为天');
    expect(result.specialPattern).toBe('乾卦用九');
    expect(result.specialAdvice).toContain('用九');
    expect(result.isChaotic).toBe(false);
  });

  it('坤卦六动应改按用六处理', () => {
    mockGenerateYaosByTime.mockReturnValue([6, 6, 6, 6, 6, 6]);

    const result = generateLiuyao(new Date('2026-01-01T12:00:00+08:00'));

    expect(result.originalName).toBe('坤为地');
    expect(result.specialPattern).toBe('坤卦用六');
    expect(result.specialAdvice).toContain('用六');
    expect(result.isChaotic).toBe(false);
  });
});
