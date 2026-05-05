import { describe, expect, it } from 'vitest';

import {
  extractUserIntentText,
  resolveGanzhiQueryContext,
  shouldEnableGanzhiTools,
} from './tools';

describe('时间工具策略', () => {
  it('应从完整提示词中提取真实用户问题', () => {
    const prompt = `**时间信息**：
公历：2026年3月20日 12时0分

**用户问题**：
"这件事会怎样？"`;

    expect(extractUserIntentText(prompt)).toBe('这件事会怎样？');
  });

  it('应为明确日期查询生成本地干支上下文', () => {
    const context = resolveGanzhiQueryContext('请告诉我 2026年3月20日 的干支信息');

    expect(context).not.toBeNull();
    expect(context?.resolution).toBe('date');
    expect(context?.message).toContain('2026年3月20日');
    expect(context?.message).toContain('干支：');
  });

  it('应为相对月份查询生成本地月度干支上下文', () => {
    const context = resolveGanzhiQueryContext('帮我看一下明年3月的每日干支', new Date('2026-05-05T12:00:00+08:00'));

    expect(context).not.toBeNull();
    expect(context?.resolution).toBe('month');
    expect(context?.message).toContain('2027年3月');
    expect(context?.message).toContain('每日干支');
  });

  it('普通占卜问题不应误开干支工具', () => {
    const prompt = `**时间信息**：
公历：2026年3月20日 12时0分
农历：丙午年 二月初二 午时
干支：丙午年 辛卯月 癸巳日 戊午时

**用户问题**：
"这件事会怎样？"`;

    expect(shouldEnableGanzhiTools(prompt)).toBe(false);
  });

  it('泛化的明年类问题不应误解析成整年干支上下文', () => {
    const question = '明年工作会怎么样？';

    expect(resolveGanzhiQueryContext(question)).toBeNull();
    expect(shouldEnableGanzhiTools(question)).toBe(false);
  });

  it('无法本地精确展开的时间范围问题应保留工具兜底', () => {
    const question = '未来三个月哪几天更适合出行？';

    expect(resolveGanzhiQueryContext(question)).toBeNull();
    expect(shouldEnableGanzhiTools(question)).toBe(true);
  });
});
