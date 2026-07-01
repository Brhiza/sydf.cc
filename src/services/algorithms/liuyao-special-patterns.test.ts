import { describe, expect, it } from 'vitest';

import { generateLiuyao } from './liuyao';

describe('六爻特殊卦式', () => {
  it('无动爻应输出静卦标记', () => {
    // 验证经典案例：已知的静卦
    const result = generateLiuyao(new Date('2026-01-01T12:00:00+08:00'));

    expect(result.specialPattern).toBe('静卦');
    expect(result.changingYaos).toHaveLength(0);
    expect(result.isChaotic).toBe(false);
    expect(result.specialAdvice).toContain('本卦卦意');
  });

  it('应输出完整的卦象数据结构', () => {
    const result = generateLiuyao();

    expect(result.originalName).toBeTruthy();
    expect(result.changedName).toBeTruthy();
    expect(result.yaoArray).toHaveLength(6);
    expect(result.yaosDetail).toHaveLength(6);
    expect(result.palace?.name).toBeTruthy();
    expect(result.palace?.wuxing).toBeTruthy();
    expect(result.ganzhi?.year).toBeTruthy();
    expect(result.ganzhi?.month).toBeTruthy();
    expect(result.ganzhi?.day).toBeTruthy();
    expect(result.ganzhi?.hour).toBeTruthy();
    expect(Array.isArray(result.sixGods)).toBe(true);
    expect(result.sixGods).toHaveLength(6);
    expect(Array.isArray(result.sixRelatives)).toBe(true);
    expect(result.sixRelatives).toHaveLength(6);
    expect(Array.isArray(result.worldAndResponse)).toBe(true);
    expect(result.worldAndResponse).toHaveLength(6);
    expect(Array.isArray(result.voidBranches)).toBe(true);
    expect(typeof result.timestamp).toBe('number');
  });
});
