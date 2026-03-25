// @vitest-environment jsdom

import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import CompactDropdownMenu from './CompactDropdownMenu.vue';

describe('CompactDropdownMenu', () => {
  it('点击菜单项时会发出选择事件', async () => {
    const wrapper = mount(CompactDropdownMenu, {
      props: {
        items: [
          { key: 'pin', label: '置顶', icon: '📌' },
          { key: 'delete', label: '删除', icon: '🗑️', tone: 'danger' },
        ],
      },
    });

    await wrapper.findAll('.compact-dropdown-item')[1].trigger('click');

    expect(wrapper.emitted('select')).toEqual([['delete']]);
  });

  it('紧凑模式会附带对应类名', () => {
    const wrapper = mount(CompactDropdownMenu, {
      props: {
        size: 'compact',
        items: [{ key: 'edit', label: '修改标签' }],
      },
    });

    expect(wrapper.classes()).toContain('compact-dropdown-menu-compact');
  });
});
