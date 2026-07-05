// @vitest-environment jsdom

import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import TopBar from './TopBar.vue';

vi.mock('@/utils/build-target', () => ({
  isCustomBuild: () => false,
}));

describe('TopBar', () => {
  it('菜单按钮应声明控制侧栏和当前展开状态', () => {
    const wrapper = mount(TopBar, {
      props: {
        sidebarCollapsed: true,
      },
    });

    const button = wrapper.get('.menu-toggle');

    expect(button.attributes('aria-controls')).toBe('app-sidebar');
    expect(button.attributes('aria-expanded')).toBe('false');
  });

  it('点击菜单按钮会发出切换侧栏事件', async () => {
    const wrapper = mount(TopBar, {
      props: {
        sidebarCollapsed: false,
      },
    });

    await wrapper.get('.menu-toggle').trigger('click');

    expect(wrapper.get('.menu-toggle').attributes('aria-expanded')).toBe('true');
    expect(wrapper.emitted('toggle-sidebar')).toHaveLength(1);
  });
});
