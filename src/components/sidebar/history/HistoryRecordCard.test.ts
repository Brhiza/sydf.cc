// @vitest-environment jsdom

import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import HistoryRecordCard from './HistoryRecordCard.vue';

describe('HistoryRecordCard', () => {
  it('div 模式应提供按钮语义，并支持 Enter 和空格触发点击', async () => {
    const wrapper = mount(HistoryRecordCard, {
      slots: {
        default: '历史记录',
      },
    });

    expect(wrapper.attributes('role')).toBe('button');
    expect(wrapper.attributes('tabindex')).toBe('0');

    await wrapper.trigger('keydown', { key: 'Enter' });
    await wrapper.trigger('keydown', { key: ' ' });

    expect(wrapper.emitted('click')).toHaveLength(2);
  });

  it('子元素键盘事件不应误触发卡片点击', async () => {
    const wrapper = mount(HistoryRecordCard, {
      slots: {
        default: '<button class="inner-button" type="button">子按钮</button>',
      },
    });

    await wrapper.find('.inner-button').trigger('keydown', { key: 'Enter' });

    expect(wrapper.emitted('click')).toBeUndefined();
  });

  it('button 模式交给原生按钮处理键盘行为，组件不额外手动触发', async () => {
    const wrapper = mount(HistoryRecordCard, {
      props: {
        tag: 'button',
      },
      slots: {
        default: '历史记录',
      },
    });

    expect(wrapper.attributes('type')).toBe('button');
    expect(wrapper.attributes('role')).toBeUndefined();
    expect(wrapper.attributes('tabindex')).toBeUndefined();

    await wrapper.trigger('keydown', { key: 'Enter' });
    expect(wrapper.emitted('click')).toBeUndefined();

    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
  });

  it('非交互模式不应暴露按钮语义，也不响应键盘触发', async () => {
    const wrapper = mount(HistoryRecordCard, {
      props: {
        interactive: false,
      },
      slots: {
        default: '历史记录',
      },
    });

    expect(wrapper.attributes('role')).toBeUndefined();
    expect(wrapper.attributes('tabindex')).toBeUndefined();

    await wrapper.trigger('keydown', { key: 'Enter' });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeUndefined();
  });
});
