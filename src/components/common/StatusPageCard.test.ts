// @vitest-environment jsdom

import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import StatusPageCard from './StatusPageCard.vue';

describe('StatusPageCard', () => {
  it('会渲染图标、标题、说明和操作区', () => {
    const wrapper = mount(StatusPageCard, {
      props: {
        icon: '🔮',
        headline: '404',
        title: '页面未找到',
        description: '您访问的页面不存在',
        spacious: true,
      },
      slots: {
        actions: '<button class="back-home">返回首页</button>',
      },
    });

    expect(wrapper.text()).toContain('404');
    expect(wrapper.text()).toContain('页面未找到');
    expect(wrapper.text()).toContain('您访问的页面不存在');
    expect(wrapper.find('.back-home').exists()).toBe(true);
  });

  it('错误态会附带统一错误类名', () => {
    const wrapper = mount(StatusPageCard, {
      props: {
        description: '加载失败',
        tone: 'error',
      },
    });

    expect(wrapper.classes()).toContain('status-page-card-error');
  });
});
