// @vitest-environment jsdom

import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import CompactSectionToolbar from './CompactSectionToolbar.vue';

describe('CompactSectionToolbar', () => {
  it('会渲染标题和操作区', () => {
    const wrapper = mount(CompactSectionToolbar, {
      props: {
        title: '最近',
      },
      slots: {
        actions: '<button class="test-action">操作</button>',
      },
    });

    expect(wrapper.text()).toContain('最近');
    expect(wrapper.find('.test-action').exists()).toBe(true);
  });
});
