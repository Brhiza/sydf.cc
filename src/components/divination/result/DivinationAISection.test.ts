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
});
