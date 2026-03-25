// @vitest-environment jsdom

import { reactive } from 'vue';
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

  it('今日运势导航应统一指向 /divination/daily', async () => {
    const { useSidebarNavigation } = await import('./useSidebarNavigation');
    const navigation = useSidebarNavigation();
    const dailyItem = navigation.primaryNavItems.value.find((item) => item.title === '今日运势');

    expect(dailyItem?.path).toBe('/divination/daily');
  });
});
