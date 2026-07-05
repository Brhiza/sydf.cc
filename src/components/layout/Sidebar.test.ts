// @vitest-environment jsdom
/* eslint-disable vue/one-component-per-file */

import { mount } from '@vue/test-utils';
import { computed, defineComponent, ref } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import Sidebar from './Sidebar.vue';

vi.mock('@/composables/useTheme', () => ({
  useTheme: () => ({
    themeConfig: computed(() => ({
      text: '切换主题',
      icon: '🌙',
    })),
    toggleTheme: vi.fn(),
  }),
}));

vi.mock('@/composables/useViewport', () => ({
  useViewport: () => ({}),
}));

vi.mock('@/composables/useSidebarNavigation', () => ({
  useSidebarNavigation: () => ({
    selectedHistoryId: ref(null),
    isInitialized: ref(true),
    sidebarTitle: computed(() => '时月东方'),
    primaryNavItems: computed(() => []),
    footerNavItems: computed(() => []),
    navigateToPath: vi.fn(),
    setSelectedHistoryId: vi.fn(),
  }),
}));

vi.mock('@/components/layout/sidebar/SidebarHeader.vue', () => ({
  default: defineComponent({
    template: '<div class="sidebar-header-stub"></div>',
  }),
}));

vi.mock('@/components/layout/sidebar/SidebarPrimaryNav.vue', () => ({
  default: defineComponent({
    template: '<nav class="sidebar-primary-nav-stub"></nav>',
  }),
}));

vi.mock('@/components/sidebar/SimpleHistoryList.vue', () => ({
  default: defineComponent({
    template: '<div class="simple-history-list-stub"></div>',
  }),
}));

vi.mock('@/components/layout/sidebar/SidebarFooterLinks.vue', () => ({
  default: defineComponent({
    template: '<nav class="sidebar-footer-links-stub"></nav>',
  }),
}));

describe('Sidebar', () => {
  it('展开时应暴露主导航语义', () => {
    const wrapper = mount(Sidebar, {
      props: {
        isCollapsed: false,
      },
    });

    expect(wrapper.attributes('id')).toBe('app-sidebar');
    expect(wrapper.attributes('aria-label')).toBe('主导航');
    expect(wrapper.attributes('aria-hidden')).toBeUndefined();
    expect(wrapper.attributes('inert')).toBeUndefined();
  });

  it('收起时应从可访问树中隐藏并禁止内部焦点', () => {
    const wrapper = mount(Sidebar, {
      props: {
        isCollapsed: true,
      },
    });

    expect(wrapper.classes()).toContain('sidebar-collapsed');
    expect(wrapper.attributes('aria-hidden')).toBe('true');
    expect(wrapper.attributes('inert')).toBeDefined();
  });
});
