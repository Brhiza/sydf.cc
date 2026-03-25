// @vitest-environment jsdom

import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import HistoryListFilters from './HistoryListFilters.vue';

describe('HistoryListFilters', () => {
  it('搜索框输入时会转发搜索事件', async () => {
    const wrapper = mount(HistoryListFilters, {
      props: {
        showSearch: true,
        showFilter: false,
        searchQuery: '',
        selectedType: '',
        filterItems: [],
      },
    });

    await wrapper.get('input').setValue('奇门');

    expect(wrapper.emitted('update:search-query')).toEqual([['奇门']]);
  });

  it('筛选下拉选择后会转发类型事件', async () => {
    const wrapper = mount(HistoryListFilters, {
      props: {
        showSearch: false,
        showFilter: true,
        searchQuery: '',
        selectedType: '',
        filterItems: [
          { type: 'qimen', title: '奇门遁甲' },
          { type: 'tarot', title: '塔罗' },
        ],
      },
      attachTo: document.body,
    });

    await wrapper.get('.selected').trigger('click');
    await wrapper.findAll('.option-item')[1].trigger('click');

    expect(wrapper.emitted('update:selected-type')).toEqual([['qimen']]);
  });
});
