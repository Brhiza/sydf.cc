// @vitest-environment jsdom

import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import type { ChatMessage } from '@/types';
import DivinationAISection from './DivinationAISection.vue';

const conversationHistory: ChatMessage[] = [
  { id: 'user-1', role: 'user', content: '接下来会怎样？' },
  { id: 'assistant-1', role: 'assistant', content: '整体趋势平稳。' },
  { id: 'user-2', role: 'user', content: '还有什么要注意？' },
  { id: 'assistant-2', role: 'assistant', content: '注意节奏，不要急躁。' },
];

function createWrapper(type: 'qimen' | 'daily') {
  return mount(DivinationAISection, {
    props: {
      type,
      conversationHistory,
    },
    global: {
      stubs: {
        DivinationAIHeader: true,
        DivinationAIDisclaimer: true,
        StreamingMarkdown: {
          props: ['content'],
          template: '<div class="streaming-markdown-stub">{{ content }}</div>',
        },
      },
    },
  });
}

describe('DivinationAISection', () => {
  it('流式更新复用同一个助手消息对象时，也应立即从加载点切换为内容', async () => {
    const userMessage: ChatMessage = {
      id: 'user-streaming',
      role: 'user',
      content: '看看接下来的趋势',
    };
    const assistantMessage: ChatMessage = {
      id: 'assistant-streaming',
      role: 'assistant',
      content: '',
    };
    const streamingHistory = [userMessage, assistantMessage];

    const wrapper = mount(DivinationAISection, {
      props: {
        type: 'qimen',
        conversationHistory: [...streamingHistory],
        isAiLoading: true,
      },
      global: {
        stubs: {
          DivinationAIHeader: true,
          DivinationAIDisclaimer: true,
          StreamingMarkdown: {
            props: ['content'],
            template: '<div class="streaming-markdown-stub">{{ content }}</div>',
          },
        },
      },
    });

    expect(wrapper.find('.loading-dots').exists()).toBe(true);

    assistantMessage.content = '第一段解读';
    await wrapper.setProps({
      conversationHistory: [...streamingHistory],
      isAiLoading: true,
    } as Record<string, unknown>);

    expect(wrapper.find('.loading-dots').exists()).toBe(false);
    expect(wrapper.text()).toContain('第一段解读');
  });

  it('历史记录里留下空助手消息且已不在加载时，应显示中断提示和重新生成按钮', () => {
    const wrapper = mount(DivinationAISection, {
      props: {
        type: 'qimen',
        conversationHistory: [
          { id: 'user-interrupted', role: 'user', content: '我近期的桃花运怎么样？' },
          { id: 'assistant-interrupted', role: 'assistant', content: '' },
        ],
        isAiLoading: false,
      },
      global: {
        stubs: {
          DivinationAIHeader: true,
          DivinationAIDisclaimer: true,
          StreamingMarkdown: {
            props: ['content'],
            template: '<div class="streaming-markdown-stub">{{ content }}</div>',
          },
        },
      },
    });

    expect(wrapper.find('.loading-dots').exists()).toBe(false);
    expect(wrapper.text()).toContain('AI 解读已中断，可点击重新生成。');
    expect(wrapper.find('button[title="重新生成"]').exists()).toBe(true);
  });

  it('普通占卜会在每条 AI 回复上显示重新生成按钮，并继续向上抛出 retry 事件', async () => {
    const wrapper = createWrapper('qimen');

    const retryButtons = wrapper.findAll('button[title="重新生成"]');

    expect(retryButtons).toHaveLength(2);

    await retryButtons[0].trigger('click');

    expect(wrapper.emitted('retry')).toHaveLength(1);
    expect(wrapper.emitted('retry')?.[0]).toEqual([
      { displayedIndex: 1, messageId: 'assistant-1' },
    ]);
  });

  it('今日运势也会在可见的 AI 回复上显示重新生成按钮', () => {
    const wrapper = createWrapper('daily');

    expect(wrapper.findAll('button[title="重新生成"]')).toHaveLength(1);
  });

  it('没有可见对话历史但存在错误时，也应回退为带操作按钮的助手消息', () => {
    const wrapper = mount(DivinationAISection, {
      props: {
        type: 'qimen',
        conversationHistory: [],
        error: '抱歉，AI服务暂时不可用，请稍后重试。',
      },
      global: {
        stubs: {
          DivinationAIHeader: true,
          DivinationAIDisclaimer: true,
          StreamingMarkdown: {
            props: ['content'],
            template: '<div class="streaming-markdown-stub">{{ content }}</div>',
          },
        },
      },
    });

    expect(wrapper.text()).toContain('抱歉，AI服务暂时不可用，请稍后重试。');
    expect(wrapper.find('button[title="复制"]').exists()).toBe(true);
    expect(wrapper.find('button[title="重新生成"]').exists()).toBe(true);
  });

  it('失败时即使已有空的 AI 占位消息，也应显示可重新生成的助手错误消息', () => {
    const wrapper = mount(DivinationAISection, {
      props: {
        type: 'qimen',
        conversationHistory: [
          { id: 'user-error', role: 'user', content: '看看事业' },
          { id: 'assistant-empty', role: 'assistant', content: '' },
        ],
        error: 'AI响应生成失败',
      },
      global: {
        stubs: {
          DivinationAIHeader: true,
          DivinationAIDisclaimer: true,
          StreamingMarkdown: {
            props: ['content'],
            template: '<div class="streaming-markdown-stub">{{ content }}</div>',
          },
        },
      },
    });

    expect(wrapper.text()).toContain('AI响应生成失败');
    expect(wrapper.find('button[title="重新生成"]').exists()).toBe(true);
  });
});
