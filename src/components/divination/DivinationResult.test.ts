// @vitest-environment jsdom
/* eslint-disable vue/one-component-per-file */

import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import type { ChatMessage, DivinationResult as DivinationResultType } from '@/types';
import DivinationResult from './DivinationResult.vue';

vi.mock('./result/DivinationResultBody.vue', () => ({
  default: defineComponent({
    template: '<div class="result-body-stub"></div>',
  }),
}));

vi.mock('./result/DivinationAISection.vue', () => ({
  default: defineComponent({
    template: '<div class="ai-section-stub"></div>',
  }),
}));

const baseResult = {
  id: 'daily-1',
  type: 'daily',
  data: {
    date: '2026-03-25',
  },
  aiResponse: '整体判断：今日宜稳中求进。',
} as DivinationResultType;

describe('DivinationResult', () => {
  it('今日运势首轮解读时不应重复渲染 AI 区块', () => {
    const wrapper = mount(DivinationResult, {
      props: {
        type: 'daily',
        result: baseResult,
        isAiLoading: true,
        conversationHistory: [
          { id: 'user-1', role: 'user', content: '请为我分析今日运势' },
          { id: 'assistant-1', role: 'assistant', content: '' },
        ] as ChatMessage[],
      },
    });

    expect(wrapper.find('.result-body-stub').exists()).toBe(true);
    expect(wrapper.find('.ai-section-stub').exists()).toBe(false);
  });

  it('今日运势有追问对话时应显示 AI 区块', () => {
    const wrapper = mount(DivinationResult, {
      props: {
        type: 'daily',
        result: baseResult,
        conversationHistory: [
          { id: 'user-1', role: 'user', content: '请为我分析今日运势' },
          { id: 'assistant-1', role: 'assistant', content: '整体判断：今日宜稳中求进。' },
          { id: 'user-2', role: 'user', content: '那下午适合出门吗？' },
          { id: 'assistant-2', role: 'assistant', content: '下午更适合处理轻量安排。' },
        ] as ChatMessage[],
      },
    });

    expect(wrapper.find('.ai-section-stub').exists()).toBe(true);
  });

  it('今日运势只有错误时也应继续走统一的 AI 区块，不再回退独立错误态', () => {
    const wrapper = mount(DivinationResult, {
      props: {
        type: 'daily',
        result: baseResult,
        error: '抱歉，AI服务暂时不可用，请稍后重试。',
        conversationHistory: [] as ChatMessage[],
      },
    });

    expect(wrapper.find('.ai-section-stub').exists()).toBe(true);
  });

  it('塔罗结果标题应直接按正式塔罗牌阵名称展示', () => {
    const wrapper = mount(DivinationResult, {
      props: {
        type: 'tarot',
        result: {
          id: 'tarot-1',
          type: 'tarot',
          data: {
            cards: [{ id: 1, name: '愚者', position: '现状', reversed: false, keywords: ['开始'] }],
            spreadType: 'single',
            spreadName: '单牌指引',
            timestamp: 1,
          },
          aiResponse: '测试解读',
        } as DivinationResultType,
      },
    });

    expect(wrapper.find('.section-title').text()).toBe('塔罗牌·单牌指引结果');
  });

  it('旧塔罗结果缺少牌阵名称时应从 mingyu-core 牌阵配置兜底', () => {
    const wrapper = mount(DivinationResult, {
      props: {
        type: 'tarot',
        result: {
          id: 'tarot-legacy-1',
          type: 'tarot',
          data: {
            cards: [
              { id: 1, name: '愚者', position: '现状', reversed: false, keywords: ['开始'] },
              { id: 2, name: '魔术师', position: '挑战', reversed: false, keywords: ['创造'] },
              { id: 3, name: '女祭司', position: '建议', reversed: false, keywords: ['直觉'] },
            ],
            spreadType: 'three',
            timestamp: 1,
          },
          aiResponse: '测试解读',
        } as DivinationResultType,
      },
    });

    expect(wrapper.find('.section-title').text()).toBe('塔罗牌·时间流牌阵结果');
  });
});
