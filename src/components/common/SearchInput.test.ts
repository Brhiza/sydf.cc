// @vitest-environment jsdom

import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SearchInput from './SearchInput.vue';

describe('SearchInput', () => {
  it('输入内容时会发出更新事件', async () => {
    const wrapper = mount(SearchInput, {
      props: {
        modelValue: '',
        placeholder: '搜索历史记录...',
      },
    });

    await wrapper.get('input').setValue('六爻');

    expect(wrapper.emitted('update:modelValue')).toEqual([['六爻']]);
  });

  it('点击清空按钮会清空内容并发出 clear', async () => {
    const wrapper = mount(SearchInput, {
      props: {
        modelValue: '塔罗',
      },
    });

    await wrapper.get('.clear-button').trigger('click');

    expect(wrapper.emitted('update:modelValue')).toEqual([['']]);
    expect(wrapper.emitted('clear')).toHaveLength(1);
  });

  it('紧凑模式会带上对应样式类名', () => {
    const wrapper = mount(SearchInput, {
      props: {
        modelValue: '',
        size: 'compact',
      },
    });

    expect(wrapper.classes()).toContain('search-input-compact');
  });
});
