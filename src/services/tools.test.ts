import { describe, expect, it } from 'vitest';

import { toolExecutors } from './tools';

describe('时间工具策略', () => {
  it('月份干支工具应拒绝不合法月份参数', async () => {
    const result = JSON.parse(await toolExecutors.get_ganzhi_for_month({ year: 2026, month: 13 }));

    expect(result).toEqual({ error: '月份参数不合法' });
  });

  it('年份干支工具应拒绝非整数年份参数', async () => {
    const result = JSON.parse(await toolExecutors.get_ganzhi_for_year({ year: 2026.5 }));

    expect(result).toEqual({ error: '年份参数不合法' });
  });

  it('干支工具应拒绝非对象参数', async () => {
    const result = JSON.parse(await toolExecutors.get_ganzhi_for_date(null));

    expect(result).toEqual({ error: '工具参数格式不合法' });
  });

  it('日期干支工具应拒绝核心历法不支持的年份', async () => {
    const result = JSON.parse(
      await toolExecutors.get_ganzhi_for_date({ year: 1800, month: 1, day: 1 })
    );

    expect(result).toEqual({ error: '年份参数不合法' });
  });
});
