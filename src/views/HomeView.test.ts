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
            template: '<section><slot /><slot name="before-link" /></section>',
          },
        },
      },
    });

    expect(wrapper.text()).toContain('欢迎');
    expect(wrapper.text()).not.toContain('时月东方 AI 在线占卜');
    expect(wrapper.text()).not.toContain(
      '免费体验六爻、梅花易数、奇门遁甲、塔罗牌与三山国王灵签。'
    );
  });

  it('首页应单独展示外部项目入口，不再把今日运势放进工具区', () => {
    const wrapper = mount(HomeView, {
      global: {
        stubs: {
          ContentSectionCard: false,
          InfoCalloutCard: {
            template: '<section><slot /><slot name="before-link" /></section>',
          },
        },
      },
    });

    expect(wrapper.find('.external-projects-grid').text()).toContain('命语');
    expect(wrapper.find('.external-projects-grid').text()).toContain('时月奇门');
    expect(wrapper.find('.external-projects-grid').text()).toContain('揣测');
    expect(wrapper.find('.external-projects-grid').text()).not.toContain('aov.cc');
    expect(wrapper.find('.external-projects-grid').text()).not.toContain('qm.sydf.cc');
    expect(wrapper.find('.external-projects-grid').text()).not.toContain('xlr.sydf.cc');
    expect(wrapper.find('.tools-grid').text()).not.toContain('今日运势');
  });
});
