import { describe, expect, it } from 'vitest';
import type {
  DivinationResult,
  LiuyaoData,
  TarotData,
} from '@/types';
import { resolveResultRenderer } from './divination-result-body';

describe('divination-result-body', () => {
  it('会按六爻类型解析为六爻结果参数', () => {
    const result = {
      id: 'liuyao-1',
      type: 'liuyao',
      data: {
        originalName: '乾为天',
      },
      aiResponse: '',
    } as DivinationResult;

    expect(resolveResultRenderer('liuyao', result)).toEqual({
      kind: 'liuyao',
      props: {
        data: result.data as LiuyaoData,
      },
    });
  });

  it('会按塔罗类型生成统一卡牌参数', () => {
    const result = {
      id: 'tarot-1',
      type: 'tarot',
      data: {
        cards: [{ id: 1, name: '愚者', position: '现状', reversed: false, keywords: ['开始'] }],
        spreadType: 'single',
        spreadName: '单牌指引',
        timestamp: 123,
      },
      aiResponse: '',
    } as DivinationResult;

    expect(resolveResultRenderer('tarot', result)).toEqual({
      kind: 'tarot',
      props: {
        cards: (result.data as TarotData).cards,
        type: 'tarot',
        spreadType: 'single',
        spreadName: '单牌指引',
        timestamp: 123,
        showExplanation: true,
      },
    });
  });

  it('会把今日运势的文本解读透传给结果组件', () => {
    const result = {
      id: 'daily-1',
      type: 'daily',
      data: {
        date: '2026-03-24',
      },
      aiResponse: '今日整体平稳',
    } as DivinationResult;

    expect(resolveResultRenderer('daily', result)).toEqual({
      kind: 'daily',
      props: {
        aiResponse: '今日整体平稳',
      },
    });
  });

  it('没有数据时返回空', () => {
    expect(resolveResultRenderer('ssgw', { id: 'x', type: 'ssgw', data: null as never })).toBeNull();
  });
});
