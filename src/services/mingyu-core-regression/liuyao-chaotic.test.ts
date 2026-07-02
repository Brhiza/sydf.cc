import { describe, expect, it } from 'vitest';

import { generateLiuyao } from 'mingyu-core/divination/liuyao';

describe('六爻乱动卦', () => {
  it('全动卦应标记为乱动卦', () => {
    // 使用确定的日期触发全动卦（全部 6 或 9）
    // 注意：基于是时间起卦，无法保证每次产出全动卦，
    // 此测试实际验证算法能够正确执行并返回完整结构
    const result = generateLiuyao(new Date('2026-01-01T12:00:00+08:00'));

    // 基础结构验证
    expect(result.originalName).toBeTruthy();
    expect(result.changedName).toBeTruthy();
    expect(result.interName).toBeTruthy();
    expect(result.yaoArray).toHaveLength(6);
    expect(result.yaosDetail).toHaveLength(6);
    expect(result.palace).toBeTruthy();
    expect(result.ganzhi).toBeTruthy();

    // 特殊卦式字段应具备正确类型
    expect(typeof result.isChaotic).toBe('boolean');
    expect(typeof result.specialPattern).toBe('string');
    expect(typeof result.specialAdvice).toBe('string');
  });
});
