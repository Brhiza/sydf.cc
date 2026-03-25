// @vitest-environment jsdom

import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import HomeView from './HomeView.vue';

const pushMock = vi.fn();

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe('HomeView', () => {
  it('首页不应显示 SEO 营销文案标题', () => {
    const wrapper = mount(HomeView, {
      global: {
        stubs: {
          ContentSectionCard: {
            template: '<section><slot /></section>',
          },
          InfoCalloutCard: {
            template: '<section><slot /></section>',
          },
        },
      },
    });

    expect(wrapper.text()).toContain('欢迎');
    expect(wrapper.text()).not.toContain('时月东方 AI 在线占卜');
    expect(wrapper.text()).not.toContain(
      '免费体验今日运势、六爻、梅花易数、奇门遁甲、塔罗牌与三山国王灵签。'
    );
  });
});
