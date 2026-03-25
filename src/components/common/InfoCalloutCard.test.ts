// @vitest-environment jsdom

import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import InfoCalloutCard from './InfoCalloutCard.vue';

describe('InfoCalloutCard', () => {
  it('会渲染标题、高亮文案、正文和入口链接', () => {
    const wrapper = mount(InfoCalloutCard, {
      props: {
        title: '探索未来',
        accentText: '解读术数',
        description: '一个基于 AI 和传统排盘逻辑的免费网站。',
        link: {
          href: '/gongdebox',
          label: '🙏 功德箱',
        },
      },
    });

    expect(wrapper.text()).toContain('探索未来');
    expect(wrapper.text()).toContain('解读术数');
    expect(wrapper.text()).toContain('一个基于 AI 和传统排盘逻辑的免费网站。');
    expect(wrapper.find('.callout-link a').attributes('href')).toBe('/gongdebox');
  });
});
