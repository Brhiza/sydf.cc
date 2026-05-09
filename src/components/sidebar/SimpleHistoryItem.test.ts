// @vitest-environment jsdom
/* eslint-disable vue/one-component-per-file */

import { mount } from '@vue/test-utils';
import { defineComponent, nextTick } from 'vue';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SimpleHistoryItem from './SimpleHistoryItem.vue';

vi.mock('./history/HistoryRecordCard.vue', () => ({
  default: defineComponent({
    template: `
      <div class="history-item">
        <slot />
        <slot name="actions" />
      </div>
    `,
  }),
}));

vi.mock('./history/HistoryRecordSummary.vue', () => ({
  default: defineComponent({
    template: '<div class="history-summary-stub"></div>',
  }),
}));

vi.mock('./history/HistoryRecordActionsMenu.vue', () => ({
  default: defineComponent({
    props: ['showMenu'],
    emits: ['toggle-menu'],
    template: `
      <div class="history-actions-stub">
        <button class="toggle-menu-button" type="button" @click="$emit('toggle-menu')">切换菜单</button>
        <div v-if="showMenu" class="action-menu-stub">菜单</div>
      </div>
    `,
  }),
}));

function createRecord() {
  return {
    id: 'history-1',
    type: 'qimen',
    question: '接下来会怎样？',
    result: {
      type: 'qimen',
      data: {
        jiuGongGe: [],
      },
      aiResponse: '测试解读',
    },
    timestamp: 1,
    summary: '测试摘要',
  };
}

describe('SimpleHistoryItem', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('点击 document 本身时不应报错，并应关闭菜单', async () => {
    const wrapper = mount(SimpleHistoryItem, {
      props: {
        record: createRecord(),
        isActive: false,
      },
    });

    await wrapper.find('.toggle-menu-button').trigger('click');
    expect(wrapper.find('.action-menu-stub').exists()).toBe(true);

    expect(() => {
      document.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }).not.toThrow();

    await nextTick();

    expect(wrapper.find('.action-menu-stub').exists()).toBe(false);
    wrapper.unmount();
  });

  it('点击历史项内部时不应误关闭菜单', async () => {
    const wrapper = mount(SimpleHistoryItem, {
      props: {
        record: createRecord(),
        isActive: false,
      },
    });

    await wrapper.find('.toggle-menu-button').trigger('click');
    expect(wrapper.find('.action-menu-stub').exists()).toBe(true);

    await wrapper.find('.history-item').trigger('click');

    expect(wrapper.find('.action-menu-stub').exists()).toBe(true);
    wrapper.unmount();
  });
});
