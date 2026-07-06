import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  onRequest,
  resetDevApiDivinationRateLimitForTests,
} from '../../functions/api/v1/divination.ts';
import { QUESTION_TEXT_MAX_LENGTH } from '../shared/question-text';
import { TimeManager } from '../utils/timeManager';

describe('开发者 API 兼容性', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    resetDevApiDivinationRateLimitForTests();
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
    let capturedRequestBody: Record<string, unknown> | null = null;
    const fetchMock = vi.fn(async (request: Request) => {
      capturedRequestBody = JSON.parse(await request.clone().text());

      return new Response(
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
    expect(
      ((capturedRequestBody as {
        messages?: Array<{ role?: string; content?: string }>;
      } | null)?.messages?.find((message) => message.role === 'user')?.content || '')
    ).not.toContain('奇门排盘：');
  });

  it('奇门应支持原生排盘设置', async () => {
    const fetchMock = vi.fn(async () =>
      new Response(
        JSON.stringify({
          choices: [
            {
              message: {
                content: '日家奇门测试解读',
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
        question: '这个月适合推进新项目吗？',
        stream: false,
        options: {
          datetime: '2026-01-01T12:00:00+08:00',
          supplementaryInfo: {
            qimenSettings: {
              method: 'feipan',
              scope: 'day',
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
    expect(data.type).toBe('qimen');
    expect(data.interpretation).toBe('日家奇门测试解读');
    expect(data.divination.scope).toBe('day');
    expect(data.divination.classicPatterns?.length).toBeGreaterThan(0);
    expect(data.divination.directions?.goodDirections?.length).toBeGreaterThan(0);
  });

  it('奇门非法原生排盘设置应回到默认且不写入提示词', async () => {
    let capturedRequestBody: Record<string, unknown> | null = null;
    const fetchMock = vi.fn(async (request: Request) => {
      capturedRequestBody = JSON.parse(await request.clone().text());

      return new Response(
        JSON.stringify({
          choices: [
            {
              message: {
                content: '默认奇门测试解读',
              },
            },
          ],
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
        type: 'qimen',
        question: '这个月适合推进新项目吗？',
        stream: false,
        options: {
          datetime: '2026-01-01T12:00:00+08:00',
          supplementaryInfo: {
            qimenSettings: {
              method: '坏排盘',
              scope: '坏级别',
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
    const userPrompt =
      ((capturedRequestBody as {
        messages?: Array<{ role?: string; content?: string }>;
      } | null)?.messages?.find((message) => message.role === 'user')?.content || '');

    expect(response.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(data.type).toBe('qimen');
    expect(data.interpretation).toBe('默认奇门测试解读');
    expect(userPrompt).not.toContain('奇门排盘：');
    expect(userPrompt).not.toContain('坏排盘');
    expect(userPrompt).not.toContain('坏级别');
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
    expect(data.divination.originalName).toBe('地山谦');
    expect(data.divination.changedName).toBe('地火明夷');
    expect(data.divination.calculation).toMatchObject({
      method: '数字起卦法',
      number: 123456,
      upperTrigramIndex: 8,
      lowerTrigramIndex: 7,
      movingYaoIndex: 1,
    });
  });

  it('梅花非法数字起卦参数应回到默认时间起卦', async () => {
    const fetchMock = vi.fn(async () =>
      new Response(
        JSON.stringify({
          choices: [
            {
              message: {
                content: '梅花默认解读',
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
              number: 0,
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
    expect(data.interpretation).toBe('梅花默认解读');
    expect(data.divination.calculation).toMatchObject({
      method: '年月日时起卦法',
      methodKey: 'time',
    });
  });

  it('三山国王灵签应使用请求指定时间生成签文时间', async () => {
    const fetchMock = vi.fn(async () =>
      new Response(
        JSON.stringify({
          choices: [
            {
              message: {
                content: '灵签测试解读',
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

    const datetime = '2026-03-16T12:00:00+08:00';
    const request = new Request('https://sydf.cc/api/v1/divination', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer test-dev-key',
      },
      body: JSON.stringify({
        type: 'ssgw',
        question: '这件事该怎么处理？',
        stream: false,
        options: {
          datetime,
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
    expect(data.type).toBe('ssgw');
    expect(data.interpretation).toBe('灵签测试解读');
    expect(data.divination.timestamp).toBe(new Date(datetime).getTime());
    expect(data.divination.ganzhi).toMatchObject({
      year: '丙午',
      month: '辛卯',
      day: '己丑',
      hour: '庚午',
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
    expect(
      ((capturedRequestBody as {
        messages?: Array<{ role?: string; content?: string }>;
      } | null)?.messages?.find((message) => message.role === 'user')?.content || '')
    ).toContain('公历：2026年3月24日');
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('今日运势接口应拒绝不存在的日期', async () => {
    const fetchMock = vi.fn();
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
          date: '2026-02-30',
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

    expect(response.status).toBe(400);
    expect(data.ok).toBe(false);
    expect(data.error.code).toBe('BAD_REQUEST');
    expect(data.error.message).toContain('date 不是有效日期');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('开发者 API 提前返回错误后应恢复原时区设置', async () => {
    TimeManager.setTimezoneOffsetMinutesOverride(0);
    const timezoneSpy = vi.spyOn(TimeManager, 'setTimezoneOffsetMinutesOverride');
    const fetchMock = vi.fn();
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
          date: '2026-02-30',
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

    const calls = timezoneSpy.mock.calls.map(([offset]) => offset);

    expect(response.status).toBe(400);
    expect(calls[0]).toBe(480);
    expect(calls.at(-1)).toBe(0);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('今日运势补充信息日期也应拒绝不存在的日期', async () => {
    const fetchMock = vi.fn();
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
          supplementaryInfo: {
            date: '2026-02-30',
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

    expect(response.status).toBe(400);
    expect(data.ok).toBe(false);
    expect(data.error.code).toBe('BAD_REQUEST');
    expect(data.error.message).toContain('date 不是有效日期');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('起卦时间应拒绝不存在的日期', async () => {
    const fetchMock = vi.fn();
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
          datetime: '2026-02-30T12:00:00+08:00',
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

    expect(response.status).toBe(400);
    expect(data.ok).toBe(false);
    expect(data.error.code).toBe('BAD_REQUEST');
    expect(data.error.message).toContain('datetime 不是有效日期');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('旧版单牌塔罗接口应统一走普通塔罗单牌牌阵数据结构', async () => {
    let capturedRequestBody: Record<string, unknown> | null = null;
    const fetchMock = vi.fn(async (request: Request) => {
      capturedRequestBody = JSON.parse(await request.clone().text());

      return new Response(
        JSON.stringify({
          choices: [
            {
              message: {
                content: '单牌提示：先稳住节奏，再做决定。',
              },
            },
          ],
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
        type: 'tarot_single',
        question: '我现在该怎么做？',
        stream: false,
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
    expect(data.type).toBe('tarot');
    expect(data.divination.spreadType).toBe('single');
    expect(data.divination.spreadName).toBe('单牌指引');
    expect(data.divination.cards).toHaveLength(1);
    expect(
      ((capturedRequestBody as {
        messages?: Array<{ role?: string; content?: string }>;
      } | null)?.messages?.find((message) => message.role === 'user')?.content || '')
    ).toContain('【类型】tarot');
  });

  it('塔罗接口未传牌阵时应默认使用单牌指引', async () => {
    const fetchMock = vi.fn(async () =>
      new Response(
        JSON.stringify({
          choices: [
            {
              message: {
                content: '默认单牌解读',
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
        type: 'tarot',
        question: '我现在该怎么做？',
        stream: false,
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
    expect(data.type).toBe('tarot');
    expect(data.divination.spreadType).toBe('single');
    expect(data.divination.spreadName).toBe('单牌指引');
    expect(data.divination.cards).toHaveLength(1);
    expect(data.interpretation).toBe('默认单牌解读');
  });

  it('异常 options 应被当作未传并继续使用默认参数', async () => {
    const fetchMock = vi.fn(async () =>
      new Response(
        JSON.stringify({
          choices: [
            {
              message: {
                content: '异常参数默认解读',
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
        type: 'tarot',
        question: '我现在该怎么做？',
        stream: false,
        options: ['bad'],
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
    expect(data.type).toBe('tarot');
    expect(data.divination.spreadType).toBe('single');
    expect(data.interpretation).toBe('异常参数默认解读');
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('异常 supplementaryInfo 应被忽略且不写入提示词', async () => {
    let capturedRequestBody: Record<string, unknown> | null = null;
    const fetchMock = vi.fn(async (request: Request) => {
      capturedRequestBody = JSON.parse(await request.clone().text());

      return new Response(
        JSON.stringify({
          choices: [
            {
              message: {
                content: '补充信息默认解读',
              },
            },
          ],
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
        type: 'qimen',
        question: '现在适合推进项目吗？',
        stream: false,
        options: {
          datetime: '2026-01-01T12:00:00+08:00',
          supplementaryInfo: ['bad'],
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
    const userPrompt =
      ((capturedRequestBody as {
        messages?: Array<{ role?: string; content?: string }>;
      } | null)?.messages?.find((message) => message.role === 'user')?.content || '');

    expect(response.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(data.type).toBe('qimen');
    expect(data.interpretation).toBe('补充信息默认解读');
    expect(userPrompt).not.toContain('【补充信息】');
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('非法基础补充信息应被忽略且不写入提示词', async () => {
    let capturedRequestBody: Record<string, unknown> | null = null;
    const fetchMock = vi.fn(async (request: Request) => {
      capturedRequestBody = JSON.parse(await request.clone().text());

      return new Response(
        JSON.stringify({
          choices: [
            {
              message: {
                content: '非法补充信息默认解读',
              },
            },
          ],
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
        type: 'liuyao',
        question: '我近期换工作是否顺利？',
        stream: false,
        options: {
          datetime: '2026-03-16T12:00:00+08:00',
          supplementaryInfo: {
            birthYear: -1,
            dayPillar: {
              heavenlyStem: '坏天干',
              earthlyBranch: '坏地支',
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
    const userPrompt =
      ((capturedRequestBody as {
        messages?: Array<{ role?: string; content?: string }>;
      } | null)?.messages?.find((message) => message.role === 'user')?.content || '');

    expect(response.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(data.interpretation).toBe('非法补充信息默认解读');
    expect(userPrompt).not.toContain('出生年份：');
    expect(userPrompt).not.toContain('日柱：');
    expect(userPrompt).not.toContain('坏天干');
    expect(userPrompt).not.toContain('坏地支');
  });

  it('合法日柱应写入开发者 API 提示词', async () => {
    let capturedRequestBody: Record<string, unknown> | null = null;
    const fetchMock = vi.fn(async (request: Request) => {
      capturedRequestBody = JSON.parse(await request.clone().text());

      return new Response(
        JSON.stringify({
          choices: [
            {
              message: {
                content: '合法补充信息解读',
              },
            },
          ],
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
        type: 'qimen',
        question: '现在适合推进项目吗？',
        stream: false,
        options: {
          datetime: '2026-01-01T12:00:00+08:00',
          supplementaryInfo: {
            birthYear: 1990,
            dayPillar: {
              heavenlyStem: '甲',
              earthlyBranch: '子',
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
    const userPrompt =
      ((capturedRequestBody as {
        messages?: Array<{ role?: string; content?: string }>;
      } | null)?.messages?.find((message) => message.role === 'user')?.content || '');

    expect(response.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(data.interpretation).toBe('合法补充信息解读');
    expect(userPrompt).toContain('出生年份：1990');
    expect(userPrompt).toContain('日柱：甲子');
  });

  it('异常 stream/debug 开关不应开启流式响应或调试信息', async () => {
    const fetchMock = vi.fn(async () =>
      new Response(
        JSON.stringify({
          choices: [
            {
              message: {
                content: '普通响应',
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
        type: 'tarot',
        question: '我现在该怎么做？',
        stream: 'true',
        debug: 'true',
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
    expect(response.headers.get('Content-Type')).toContain('application/json');
    expect(data.ok).toBe(true);
    expect(data.interpretation).toBe('普通响应');
    expect(data.debug).toBeUndefined();
  });

  it('超长 question 应裁剪后再写入开发者 API 提示词', async () => {
    let capturedRequestBody: Record<string, unknown> | null = null;
    const fetchMock = vi.fn(async (request: Request) => {
      capturedRequestBody = JSON.parse(await request.clone().text());

      return new Response(
        JSON.stringify({
          choices: [
            {
              message: {
                content: '裁剪后解读',
              },
            },
          ],
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    });
    vi.stubGlobal('fetch', fetchMock);

    const longQuestion = ` ${'问'.repeat(QUESTION_TEXT_MAX_LENGTH + 20)} `;
    const request = new Request('https://sydf.cc/api/v1/divination', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer test-dev-key',
      },
      body: JSON.stringify({
        type: 'liuyao',
        question: longQuestion,
        stream: false,
        options: {
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
    const userPrompt =
      ((capturedRequestBody as {
        messages?: Array<{ role?: string; content?: string }>;
      } | null)?.messages?.find((message) => message.role === 'user')?.content || '');

    expect(response.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(userPrompt).toContain(`【问题】${'问'.repeat(QUESTION_TEXT_MAX_LENGTH)}`);
    expect(userPrompt).not.toContain('问'.repeat(QUESTION_TEXT_MAX_LENGTH + 1));
  });

  it('请求体过大时应提前拒绝且不调用上游 AI', async () => {
    const fetchMock = vi.fn();
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
        extra: 'x'.repeat(70 * 1024),
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

    expect(response.status).toBe(413);
    expect(data.ok).toBe(false);
    expect(data.error.code).toBe('PAYLOAD_TOO_LARGE');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('同一开发者客户端超过限额时不再调用上游 AI', async () => {
    const fetchMock = vi.fn(
      async () =>
        new Response(JSON.stringify({ choices: [{ message: { content: '测试解读' } }] }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
    );
    vi.stubGlobal('fetch', fetchMock);

    const createRequest = () =>
      new Request('https://sydf.cc/api/v1/divination', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer test-dev-key',
          'CF-Connecting-IP': '203.0.113.20',
        },
        body: JSON.stringify({
          type: 'daily',
          stream: false,
          options: {
            date: '2026-03-24',
          },
        }),
      });

    const env = {
      DEV_API_KEY: 'test-dev-key',
      OPENAI_API_KEY: 'test-openai-key',
      DEV_API_RATE_LIMIT_MAX: '1',
      DEV_API_RATE_LIMIT_WINDOW_MS: '60000',
    };

    const firstResponse = await onRequest({ request: createRequest(), env });
    const secondResponse = await onRequest({ request: createRequest(), env });
    const secondData = await secondResponse.json();

    expect(firstResponse.status).toBe(200);
    expect(secondResponse.status).toBe(429);
    expect(secondResponse.headers.get('Retry-After')).toBe('60');
    expect(secondData.error.code).toBe('RATE_LIMITED');
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('非调试模式下不应返回上游 AI 原始错误正文', async () => {
    const fetchMock = vi.fn(
      async () =>
        new Response('upstream secret detail', {
          status: 500,
          headers: { 'Content-Type': 'text/plain' },
        })
    );
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

    expect(response.status).toBe(502);
    expect(data.error.code).toBe('AI_ERROR');
    expect(data.error.details).toBeUndefined();
  });
});
