// @vitest-environment jsdom
/* eslint-disable vue/one-component-per-file */

import { mount } from '@vue/test-utils';
import { computed, defineComponent } from 'vue';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SimpleHistoryList from './SimpleHistoryList.vue';

const useSimpleHistoryListMock = vi.fn();

vi.mock('@/composables/useSimpleHistoryList', () => ({
  useSimpleHistoryList: () => useSimpleHistoryListMock(),
}));

vi.mock('@/components/common/EmptyState.vue', () => ({
  default: defineComponent({
    template: '<div class="empty-state-stub"></div>',
  }),
}));

vi.mock('./history/HistoryListToolbar.vue', () => ({
  default: defineComponent({
    emits: ['clear-all'],
    template: '<button class="clear-all-button" @click="$emit(\'clear-all\')">清空</button>',
  }),
}));

vi.mock('./history/HistoryListFilters.vue', () => ({
  default: defineComponent({
    template: '<div class="history-filters-stub"></div>',
  }),
}));

vi.mock('./SimpleHistoryItem.vue', () => ({
  default: defineComponent({
    props: ['record', 'isActive'],
    emits: ['click', 'pin', 'edit', 'delete'],
    template: `
      <div class="simple-history-item-stub">
        <button class="record-click-button" @click="$emit('click', record)">打开</button>
        <button class="record-delete-button" @click="$emit('delete', record.id)">删除</button>
      </div>
    `,
  }),
}));

function createHistoryListState(overrides: Record<string, unknown> = {}) {
  return {
    divinationNavItems: [],
    searchQuery: { value: '' },
    selectedType: { value: '' },
    showSearch: { value: false },
    showFilter: { value: false },
    showMainMenu: { value: false },
    displayRecords: computed(() => [
      {
        id: 'history-1',
        type: 'qimen',
        question: '接下来会怎样？',
      },
    ]),
    toggleSearch: vi.fn(),
    toggleFilter: vi.fn(),
    toggleMainMenu: vi.fn(),
    handlePin: vi.fn(),
    handleEdit: vi.fn(),
    handleDelete: vi.fn(() => true),
    clearAllHistory: vi.fn(() => true),
    getEmptyMessage: vi.fn(() => '暂无历史记录'),
    findRecordById: vi.fn((id: string) =>
      id === 'history-1'
        ? {
            id: 'history-1',
            type: 'qimen',
            question: '接下来会怎样？',
          }
        : undefined
    ),
    ...overrides,
  };
}

describe('SimpleHistoryList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('删除当前正在查看的历史记录后应退出该历史上下文', async () => {
    useSimpleHistoryListMock.mockReturnValue(createHistoryListState());

    const wrapper = mount(SimpleHistoryList, {
      props: {
        selectedHistoryId: 'history-1',
      },
    });

    await wrapper.find('.record-delete-button').trigger('click');

    expect(wrapper.emitted('update:selectedHistoryId')?.[0]).toEqual([null]);
    expect(wrapper.emitted('navigate')?.[0]).toEqual(['/divination/qimen']);
  });

  it('删除失败或取消时不应误清当前历史上下文', async () => {
    useSimpleHistoryListMock.mockReturnValue(
      createHistoryListState({
        handleDelete: vi.fn(() => false),
      })
    );

    const wrapper = mount(SimpleHistoryList, {
      props: {
        selectedHistoryId: 'history-1',
      },
    });

    await wrapper.find('.record-delete-button').trigger('click');

    expect(wrapper.emitted('update:selectedHistoryId')).toBeUndefined();
    expect(wrapper.emitted('navigate')).toBeUndefined();
  });

  it('清空历史时如果当前正在查看历史详情，也应退出该历史上下文', async () => {
    useSimpleHistoryListMock.mockReturnValue(createHistoryListState());

    const wrapper = mount(SimpleHistoryList, {
      props: {
        selectedHistoryId: 'history-1',
      },
    });

    await wrapper.find('.clear-all-button').trigger('click');

    expect(wrapper.emitted('update:selectedHistoryId')?.[0]).toEqual([null]);
    expect(wrapper.emitted('navigate')?.[0]).toEqual(['/divination/qimen']);
  });

  it('塔罗历史点击后应跳转到统一结果页', async () => {
    useSimpleHistoryListMock.mockReturnValue(
      createHistoryListState({
        displayRecords: computed(() => [
          {
            id: 'history-tarot',
            type: 'tarot',
            question: '今天的方向是什么？',
          },
        ]),
      })
    );

    const wrapper = mount(SimpleHistoryList, {
      props: {
        selectedHistoryId: null,
      },
    });

    await wrapper.find('.record-click-button').trigger('click');

    expect(wrapper.emitted('navigate')?.[0]).toEqual(['/divination/tarot?historyId=history-tarot']);
  });
});
