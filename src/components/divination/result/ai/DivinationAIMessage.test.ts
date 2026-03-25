// @vitest-environment jsdom

import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import DivinationAIMessage from './DivinationAIMessage.vue';

function createWrapper(props: Record<string, unknown> = {}) {
  return mount(DivinationAIMessage, {
    props: {
      message: {
        id: 'assistant-1',
        role: 'assistant',
        content: '整体平稳，按计划推进即可。',
      },
      ...props,
    },
    global: {
      stubs: {
        StreamingMarkdown: {
          props: ['content'],
          template: '<div class="streaming-markdown-stub">{{ content }}</div>',
        },
      },
    },
  });
}

describe('DivinationAIMessage', () => {
  it('AI 回复在开启重生成功能时会显示复制和重新生成按钮', () => {
    const wrapper = createWrapper({
      showRetryButton: true,
      isLastAssistantMessage: true,
    });

    expect(wrapper.find('button[title="复制"]').exists()).toBe(true);
    expect(wrapper.find('button[title="重新生成"]').exists()).toBe(true);
  });

  it('点击重新生成时会向上抛出 retry 事件', async () => {
    const wrapper = createWrapper({
      showRetryButton: true,
    });

    await wrapper.find('button[title="重新生成"]').trigger('click');

    expect(wrapper.emitted('retry')).toHaveLength(1);
  });

  it('加载中时会禁用复制和重新生成按钮', () => {
    const wrapper = createWrapper({
      showRetryButton: true,
      isLastAssistantMessage: true,
      isAiLoading: true,
    });

    expect(wrapper.find('button[title="复制"]').attributes('disabled')).toBeDefined();
    expect(wrapper.find('button[title="重新生成"]').attributes('disabled')).toBeDefined();
  });

  it('关闭重生成功能时不会显示重新生成按钮', () => {
    const wrapper = createWrapper({
      showRetryButton: false,
    });

    expect(wrapper.find('button[title="复制"]').exists()).toBe(true);
    expect(wrapper.find('button[title="重新生成"]').exists()).toBe(false);
  });
});
