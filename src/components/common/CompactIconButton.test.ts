// @vitest-environment jsdom

import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import CompactIconButton from './CompactIconButton.vue';

describe('CompactIconButton', () => {
  it('点击时会转发点击事件', async () => {
    const wrapper = mount(CompactIconButton, {
      props: {
        title: '更多',
      },
      slots: {
        default: '<span class="icon-slot">⋯</span>',
      },
    });

    await wrapper.trigger('click');

    expect(wrapper.emitted('click')).toHaveLength(1);
    expect(wrapper.find('.icon-slot').exists()).toBe(true);
  });

  it('会附带紧凑模式和激活态类名', () => {
    const wrapper = mount(CompactIconButton, {
      props: {
        title: '更多操作',
        size: 'compact',
        active: true,
        revealOnHover: true,
      },
    });

    expect(wrapper.classes()).toContain('compact-icon-button-compact');
    expect(wrapper.classes()).toContain('active');
    expect(wrapper.classes()).toContain('hover-reveal');
  });
});
