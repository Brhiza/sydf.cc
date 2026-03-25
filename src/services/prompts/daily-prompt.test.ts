import { beforeEach, describe, expect, it, vi } from 'vitest';
import { generateDailyFortunePrompt } from './daily';

describe('generateDailyFortunePrompt', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-25T12:00:00+08:00'));
  });

  it('会把求测者信息和原始数据写入今日运势提示词', async () => {
    const prompt = await generateDailyFortunePrompt(
      '请分析我今天的运势',
      {
        date: '2026-03-25',
        scores: {
          overall: 88,
          love: 75,
          career: 92,
          wealth: 80,
          health: 70,
        },
      } as never,
      undefined,
      {
        gender: '男',
        birthYear: 1990,
        interpretationStyle: '专业',
        outputLength: '详细',
      }
    );

    expect(prompt).toContain('**求测者信息**');
    expect(prompt).toContain('性别：男');
    expect(prompt).toContain('1990年（36岁，马）');
    expect(prompt).toContain('**今日运势原始数据（JSON）**');
    expect(prompt).toContain('请直接给出结论、分析和建议');
  });

  it('没有补充信息时不输出空白求测者信息段', async () => {
    const prompt = await generateDailyFortunePrompt(
      '请分析今天运势',
      {
        date: '2026-03-25',
      } as never
    );

    expect(prompt).not.toContain('**求测者信息**');
    expect(prompt).toContain('**用户问题**');
  });
});
