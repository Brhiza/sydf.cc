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

vi.mock('./result/DivinationErrorState.vue', () => ({
  default: defineComponent({
    template: '<div class="error-state-stub"></div>',
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
});
