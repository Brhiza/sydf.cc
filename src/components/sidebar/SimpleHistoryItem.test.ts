// @vitest-environment jsdom
/* eslint-disable vue/one-component-per-file */

import { mount } from '@vue/test-utils';
import { defineComponent, nextTick } from 'vue';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import SimpleHistoryItem from './SimpleHistoryItem.vue';

vi.mock('./history/HistoryRecordCard.vue', () => ({
  default: defineComponent({
    emits: ['click'],
    template: `
      <div class="history-item" @click="$emit('click')">
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
    props: {
      showMenu: {
        type: Boolean,
        required: true,
      },
    },
    emits: ['toggle-menu', 'pin', 'edit', 'delete'],
    template: `
      <div class="history-actions-stub">
        <button class="toggle-menu-button" type="button" @click.stop="$emit('toggle-menu')">切换菜单</button>
        <div v-if="showMenu" class="action-menu-stub">
          <button class="pin-button" type="button" @click="$emit('pin')">置顶</button>
          <button class="edit-button" type="button" @click="$emit('edit')">编辑</button>
          <button class="delete-button" type="button" @click="$emit('delete')">删除</button>
        </div>
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

function mountItem() {
  const host = document.createElement('div');
  document.body.appendChild(host);

  return mount(SimpleHistoryItem, {
    attachTo: host,
    props: {
      record: createRecord(),
      isActive: false,
    },
  });
}

describe('SimpleHistoryItem', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('点击 document 本身时不应报错，并应关闭菜单', async () => {
    const wrapper = mountItem();

    await wrapper.find('.toggle-menu-button').trigger('click');
    expect(wrapper.find('.action-menu-stub').exists()).toBe(true);

    expect(() => {
      document.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }).not.toThrow();

    await nextTick();

    expect(wrapper.find('.action-menu-stub').exists()).toBe(false);
    wrapper.unmount();
  });

  it('点击历史项本身时应选中记录并关闭已打开的菜单', async () => {
    const wrapper = mountItem();

    await wrapper.find('.toggle-menu-button').trigger('click');
    expect(wrapper.find('.action-menu-stub').exists()).toBe(true);

    await wrapper.find('.history-item').trigger('click');
    await nextTick();

    expect(wrapper.emitted('click')?.[0]).toEqual([createRecord()]);
    expect(wrapper.find('.action-menu-stub').exists()).toBe(false);
    wrapper.unmount();
  });

  it('点击菜单按钮自身时应只打开菜单，不应被外部点击逻辑立即关闭', async () => {
    const wrapper = mountItem();

    await wrapper.find('.toggle-menu-button').trigger('click');
    expect(wrapper.find('.action-menu-stub').exists()).toBe(true);
    wrapper.unmount();
  });

  it('选择菜单项后应触发对应操作并关闭菜单', async () => {
    const wrapper = mountItem();

    await wrapper.find('.toggle-menu-button').trigger('click');
    await wrapper.find('.pin-button').trigger('click');
    await nextTick();

    expect(wrapper.emitted('pin')?.[0]).toEqual(['history-1']);
    expect(wrapper.find('.action-menu-stub').exists()).toBe(false);
    wrapper.unmount();
  });
});
