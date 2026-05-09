// @vitest-environment jsdom

import { mount } from '@vue/test-utils';
import { defineComponent, nextTick } from 'vue';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { eventBus } from '@/utils/eventBus';
import { useSimpleHistoryList } from './useSimpleHistoryList';

const mockGetHistoryRecords = vi.fn();
const mockTogglePin = vi.fn();
const mockRenameRecord = vi.fn();
const mockConfirmDeleteRecord = vi.fn();
const mockConfirmClearAllHistory = vi.fn();

vi.mock('./useHistoryActions', () => ({
  useHistoryActions: () => ({
    getHistoryRecords: mockGetHistoryRecords,
    togglePin: mockTogglePin,
    renameRecord: mockRenameRecord,
    confirmDeleteRecord: mockConfirmDeleteRecord,
    confirmClearAllHistory: mockConfirmClearAllHistory,
  }),
}));

const TestHarness = defineComponent({
  template: `
    <div>
      <div class="menu-container">
        <button class="inside-button" type="button">菜单内按钮</button>
      </div>
    </div>
  `,
  setup() {
    return useSimpleHistoryList();
  },
});

describe('useSimpleHistoryList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    eventBus.clear();
    mockGetHistoryRecords.mockReturnValue([]);
  });

  it('点击 document 本身时不应报错，并应关闭主菜单', async () => {
    const wrapper = mount(TestHarness);
    wrapper.vm.showMainMenu = true;

    expect(() => {
      document.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }).not.toThrow();

    await nextTick();

    expect(wrapper.vm.showMainMenu).toBe(false);
    wrapper.unmount();
  });

  it('点击菜单容器内元素时不应关闭主菜单', async () => {
    const wrapper = mount(TestHarness);
    wrapper.vm.showMainMenu = true;

    await wrapper.find('.inside-button').trigger('click');

    expect(wrapper.vm.showMainMenu).toBe(true);
    wrapper.unmount();
  });
});
