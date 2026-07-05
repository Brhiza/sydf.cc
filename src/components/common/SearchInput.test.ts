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

  it('输入框应提供明确的可访问名称', () => {
    const wrapper = mount(SearchInput, {
      props: {
        modelValue: '',
        placeholder: '搜索历史记录...',
        ariaLabel: '搜索历史记录',
      },
    });

    expect(wrapper.get('input').attributes('aria-label')).toBe('搜索历史记录');
  });
});
