// @vitest-environment jsdom

import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import HistoryRecordActionsMenu from './HistoryRecordActionsMenu.vue';

describe('HistoryRecordActionsMenu', () => {
  it('会根据置顶状态渲染不同文案', () => {
    const wrapper = mount(HistoryRecordActionsMenu, {
      props: {
        pinned: true,
        showMenu: true,
        isActive: false,
      },
    });

    expect(wrapper.text()).toContain('取消置顶');
  });

  it('选择菜单项时会转发对应事件', async () => {
    const wrapper = mount(HistoryRecordActionsMenu, {
      props: {
        pinned: false,
        showMenu: true,
        isActive: false,
      },
    });

    const items = wrapper.findAll('.compact-dropdown-item');
    await items[0].trigger('click');
    await items[1].trigger('click');
    await items[2].trigger('click');

    expect(wrapper.emitted('pin')).toHaveLength(1);
    expect(wrapper.emitted('edit')).toHaveLength(1);
    expect(wrapper.emitted('delete')).toHaveLength(1);
  });
});
