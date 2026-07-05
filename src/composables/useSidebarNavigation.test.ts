// @vitest-environment jsdom

import { nextTick, reactive } from 'vue';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const useRouteMock = vi.fn();
const pushMock = vi.fn();
const replaceMock = vi.fn();

vi.mock('vue-router', () => ({
  useRoute: () => useRouteMock(),
  useRouter: () => ({
    push: pushMock,
    replace: replaceMock,
  }),
}));

vi.mock('@/utils/eventBus', () => ({
  eventBus: {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
  },
  EVENTS: {
    HISTORY_SELECTION_RESET: 'history_selection_reset',
  },
}));

describe('useSidebarNavigation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useRouteMock.mockReturnValue(
      reactive({
        path: '/',
        name: 'home',
        params: {},
        query: {},
      })
    );
  });

  it('侧栏不再显示今日运势入口', async () => {
    const { useSidebarNavigation } = await import('./useSidebarNavigation');
    const navigation = useSidebarNavigation();
    const dailyItem = navigation.primaryNavItems.value.find((item) => item.title === '今日运势');

    expect(dailyItem).toBeUndefined();
  });

  it('带 historyId 直达历史详情时应同步高亮当前历史记录', async () => {
    const route = reactive({
      path: '/divination/qimen',
      name: 'divination',
      params: { type: 'qimen' },
      query: { historyId: 'history-1' },
    });
    useRouteMock.mockReturnValue(route);

    const { useSidebarNavigation } = await import('./useSidebarNavigation');
    const navigation = useSidebarNavigation();

    expect(navigation.selectedHistoryId.value).toBe('history-1');
  });

  it('historyId 带空白时应使用清理后的历史记录编号', async () => {
    const route = reactive({
      path: '/divination/qimen',
      name: 'divination',
      params: { type: 'qimen' },
      query: { historyId: '  history-1  ' },
    });
    useRouteMock.mockReturnValue(route);

    const { useSidebarNavigation } = await import('./useSidebarNavigation');
    const navigation = useSidebarNavigation();

    expect(navigation.selectedHistoryId.value).toBe('history-1');
  });

  it('historyId 格式异常时不应关闭当前导航高亮', async () => {
    const route = reactive({
      path: '/divination/qimen',
      name: 'divination',
      params: { type: 'qimen' },
      query: { historyId: ['history-1'] },
    });
    useRouteMock.mockReturnValue(route);

    const { useSidebarNavigation } = await import('./useSidebarNavigation');
    const navigation = useSidebarNavigation();
    const qimenItem = navigation.primaryNavItems.value.find((item) => item.title === '奇门遁甲');

    expect(navigation.selectedHistoryId.value).toBeNull();
    expect(qimenItem?.isActive).toBe(true);
  });

  it('退出历史详情后应清空当前历史高亮', async () => {
    const route = reactive({
      path: '/divination/qimen',
      name: 'divination',
      params: { type: 'qimen' },
      query: { historyId: 'history-1' as string | undefined },
    });
    useRouteMock.mockReturnValue(route);

    const { useSidebarNavigation } = await import('./useSidebarNavigation');
    const navigation = useSidebarNavigation();

    expect(navigation.selectedHistoryId.value).toBe('history-1');

    route.query.historyId = undefined;
    await nextTick();

    expect(navigation.selectedHistoryId.value).toBeNull();
  });
});
