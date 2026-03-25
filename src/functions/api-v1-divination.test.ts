import { afterEach, describe, expect, it, vi } from 'vitest';

import { onRequest } from '../../functions/api/v1/divination.ts';
import { TimeManager } from '../utils/timeManager';

describe('开发者 API 兼容性', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    TimeManager.setTimezoneOffsetMinutesOverride(null);
  });

  it('六爻旧版 method/divinationNumber 字段应被忽略并继续返回默认结果', async () => {
    const fetchMock = vi.fn(async () =>
      new Response(
        JSON.stringify({
          choices: [
            {
              message: {
                content: '测试解读',
              },
            },
          ],
          usage: { total_tokens: 1 },
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    );
    vi.stubGlobal('fetch', fetchMock);

    const request = new Request('https://sydf.cc/api/v1/divination', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer test-dev-key',
      },
      body: JSON.stringify({
        type: 'liuyao',
        question: '我近期换工作是否顺利？',
        stream: false,
        options: {
          method: 'number',
          divinationNumber: 123456,
          datetime: '2026-03-16T12:00:00+08:00',
        },
      }),
    });

    const response = await onRequest({
      request,
      env: {
        DEV_API_KEY: 'test-dev-key',
        OPENAI_API_KEY: 'test-openai-key',
      },
    });

    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(data.type).toBe('liuyao');
    expect(data.interpretation).toBe('测试解读');
    expect(data.divination.originalName).toBeTypeOf('string');
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('奇门旧版 method/divinationNumber 字段应被忽略并继续按时间起局', async () => {
    const fetchMock = vi.fn(async () =>
      new Response(
        JSON.stringify({
          choices: [
            {
              message: {
                content: '奇门测试解读',
              },
            },
          ],
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    );
    vi.stubGlobal('fetch', fetchMock);

    const request = new Request('https://sydf.cc/api/v1/divination', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer test-dev-key',
      },
      body: JSON.stringify({
        type: 'qimen',
        question: '现在适合推进项目吗？',
        stream: false,
        options: {
          method: 'random',
          divinationNumber: 789,
          datetime: '2026-01-01T12:00:00+08:00',
        },
      }),
    });

    const response = await onRequest({
      request,
      env: {
        DEV_API_KEY: 'test-dev-key',
        OPENAI_API_KEY: 'test-openai-key',
      },
    });

    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(data.type).toBe('qimen');
    expect(data.interpretation).toBe('奇门测试解读');
    expect(data.divination.timeInfo.solarTerm).toBeTypeOf('string');
    expect(data.divination.juShu).toBeGreaterThanOrEqual(1);
    expect(data.divination.juShu).toBeLessThanOrEqual(9);
  });

  it('梅花应支持数字起卦并返回对应起卦信息', async () => {
    const fetchMock = vi.fn(async () =>
      new Response(
        JSON.stringify({
          choices: [
            {
              message: {
                content: '梅花测试解读',
              },
            },
          ],
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    );
    vi.stubGlobal('fetch', fetchMock);

    const request = new Request('https://sydf.cc/api/v1/divination', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer test-dev-key',
      },
      body: JSON.stringify({
        type: 'meihua',
        question: '这件事会怎么发展？',
        stream: false,
        options: {
          datetime: '2026-03-16T12:00:00+08:00',
          supplementaryInfo: {
            meihuaSettings: {
              method: 'number',
              number: 123456,
            },
          },
        },
      }),
    });

    const response = await onRequest({
      request,
      env: {
        DEV_API_KEY: 'test-dev-key',
        OPENAI_API_KEY: 'test-openai-key',
      },
    });

    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(data.type).toBe('meihua');
    expect(data.interpretation).toBe('梅花测试解读');
    expect(data.divination.originalName).toBe('坤为地');
    expect(data.divination.changedName).toBe('雷地豫');
    expect(data.divination.calculation).toMatchObject({
      method: '数字起卦法',
      number: 123456,
      upperTrigramIndex: 8,
      lowerTrigramIndex: 8,
      movingYaoIndex: 6,
    });
  });

  it('今日运势非流式接口应返回普通文本解读', async () => {
    let capturedRequestBody: Record<string, unknown> | null = null;
    const fetchMock = vi.fn(async (request: Request) => {
      capturedRequestBody = JSON.parse(await request.clone().text());

      return new Response(
        JSON.stringify({
          choices: [
            {
              message: {
                content: '整体判断：今日宜稳中求进。\n\n关键趋势：上午更适合整理与收口，下午再逐步推进计划。\n\n行动建议：先把最重要的一件事落实，再考虑扩展安排。\n\n注意事项：避免情绪化承诺，也不要同时铺开太多事情。',
              },
            },
          ],
          usage: { total_tokens: 1 },
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    });
    vi.stubGlobal('fetch', fetchMock);

    const request = new Request('https://sydf.cc/api/v1/divination', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer test-dev-key',
      },
      body: JSON.stringify({
        type: 'daily',
        stream: false,
        options: {
          date: '2026-03-24',
        },
      }),
    });

    const response = await onRequest({
      request,
      env: {
        DEV_API_KEY: 'test-dev-key',
        OPENAI_API_KEY: 'test-openai-key',
      },
    });

    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(data.type).toBe('daily');
    expect(data.interpretation).toContain('整体判断');
    expect(data.interpretationText).toBeUndefined();
    expect(data.structuredInterpretation).toBeUndefined();
    expect(
      (capturedRequestBody as { response_format?: { type?: string } } | null)?.response_format
    ).toBeUndefined();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
