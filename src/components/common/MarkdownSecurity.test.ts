// @vitest-environment jsdom

import { flushPromises, mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import MarkdownRenderer from './MarkdownRenderer.vue';
import StreamingMarkdown from './StreamingMarkdown.vue';

async function waitForMarkdownRenderer() {
  await flushPromises();
  await new Promise((resolve) => setTimeout(resolve, 80));
  await flushPromises();
}

describe('Markdown 安全渲染', () => {
  it('MarkdownRenderer 不应透传原始 HTML', async () => {
    const wrapper = mount(MarkdownRenderer, {
      props: {
        content: '正常文本\n<img src=x onerror="alert(1)"><script>alert(1)</script>',
      },
    });

    await waitForMarkdownRenderer();

    const html = wrapper.html();
    expect(html).not.toContain('<script');
    expect(wrapper.find('script').exists()).toBe(false);
    expect(wrapper.find('img').exists()).toBe(false);
    expect(html).toContain('&lt;img');
  });

  it('StreamingMarkdown 不应输出 javascript: 链接', async () => {
    const wrapper = mount(StreamingMarkdown, {
      props: {
        content: '[危险链接](javascript:alert(1))',
        isComplete: true,
      },
    });

    await flushPromises();

    const html = wrapper.html();
    expect(html).not.toContain('href="javascript:alert(1)"');
    expect(html).toContain('危险链接');
  });

  it('StreamingMarkdown 完整思考块不应输出思考内容', async () => {
    const wrapper = mount(StreamingMarkdown, {
      props: {
        content:
          '<think>分析<img src=x onerror="alert(1)"><script>alert(1)</script>[危险链接](javascript:alert(1))</think>最终结论',
        isComplete: true,
      },
    });

    await flushPromises();

    const html = wrapper.html();
    expect(wrapper.find('details').exists()).toBe(false);
    expect(wrapper.find('script').exists()).toBe(false);
    expect(wrapper.find('img').exists()).toBe(false);
    expect(html).not.toContain('href="javascript:alert(1)"');
    expect(html).not.toContain('分析');
    expect(html).not.toContain('&lt;img');
    expect(html).toContain('最终结论');
  });

  it('StreamingMarkdown 未闭合思考块只显示思考动画', async () => {
    const wrapper = mount(StreamingMarkdown, {
      props: {
        content: '<think>正在分析<script>alert(1)</script><img src=x onerror="alert(1)">',
        isComplete: false,
      },
    });

    await flushPromises();

    const html = wrapper.html();
    expect(wrapper.find('.thinking-animation').exists()).toBe(true);
    expect(wrapper.find('script').exists()).toBe(false);
    expect(wrapper.find('img').exists()).toBe(false);
    expect(html).not.toContain('&lt;script');
    expect(html).not.toContain('正在分析');
    expect(wrapper.find('.thinking-animation').exists()).toBe(true);
  });
});
