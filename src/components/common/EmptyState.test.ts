// @vitest-environment jsdom

import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import EmptyState from './EmptyState.vue';

describe('EmptyState', () => {
  it('会渲染标题和提示', () => {
    const wrapper = mount(EmptyState, {
      props: {
        icon: '📜',
        title: '暂无历史记录',
        hint: '您的占卜记录将会显示在这里',
      },
    });

    expect(wrapper.text()).toContain('暂无历史记录');
    expect(wrapper.text()).toContain('您的占卜记录将会显示在这里');
  });

  it('紧凑模式会附带对应类名', () => {
    const wrapper = mount(EmptyState, {
      props: {
        title: '没有找到匹配的历史记录',
        size: 'compact',
      },
    });

    expect(wrapper.classes()).toContain('empty-state-compact');
  });
});
