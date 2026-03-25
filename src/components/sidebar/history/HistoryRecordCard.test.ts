// @vitest-environment jsdom

import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import HistoryRecordCard from './HistoryRecordCard.vue';

describe('HistoryRecordCard', () => {
  it('regular 模式会渲染按钮外壳并转发点击事件', async () => {
    const wrapper = mount(HistoryRecordCard, {
      props: {
        tag: 'button',
        size: 'regular',
      },
      slots: {
        default: '<div class="record-summary">历史记录</div>',
      },
    });

    await wrapper.trigger('click');

    expect(wrapper.element.tagName).toBe('BUTTON');
    expect(wrapper.classes()).toContain('history-item-regular');
    expect(wrapper.emitted('click')).toHaveLength(1);
  });

  it('compact 模式支持激活态和操作区插槽', () => {
    const wrapper = mount(HistoryRecordCard, {
      props: {
        isActive: true,
      },
      slots: {
        default: '<div class="record-summary">历史记录</div>',
        actions: '<button class="record-action">更多</button>',
      },
    });

    expect(wrapper.classes()).toContain('history-item-compact');
    expect(wrapper.classes()).toContain('active');
    expect(wrapper.find('.record-action').exists()).toBe(true);
  });
});
