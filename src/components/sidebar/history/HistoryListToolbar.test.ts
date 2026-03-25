// @vitest-environment jsdom

import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import HistoryListToolbar from './HistoryListToolbar.vue';

describe('HistoryListToolbar', () => {
  it('点击按钮时会转发对应事件', async () => {
    const wrapper = mount(HistoryListToolbar, {
      props: {
        showMainMenu: false,
      },
    });

    const buttons = wrapper.findAll('.icon-btn');
    await buttons[0].trigger('click');
    await buttons[1].trigger('click');
    await buttons[2].trigger('click');

    expect(wrapper.emitted('toggle-search')).toHaveLength(1);
    expect(wrapper.emitted('toggle-filter')).toHaveLength(1);
    expect(wrapper.emitted('toggle-menu')).toHaveLength(1);
  });

  it('主菜单打开时可以触发清空事件', async () => {
    const wrapper = mount(HistoryListToolbar, {
      props: {
        showMainMenu: true,
      },
    });

    await wrapper.get('.compact-dropdown-item').trigger('click');

    expect(wrapper.emitted('clear-all')).toHaveLength(1);
  });
});
