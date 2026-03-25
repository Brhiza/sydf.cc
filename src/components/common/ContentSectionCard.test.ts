// @vitest-environment jsdom

import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import ContentSectionCard from './ContentSectionCard.vue';

describe('ContentSectionCard', () => {
  it('启用头部时会渲染标题和头部操作区', () => {
    const wrapper = mount(ContentSectionCard, {
      props: {
        title: '今日运势',
        useHeader: true,
      },
      slots: {
        'header-actions': '<button class="header-action">返回</button>',
      },
    });

    expect(wrapper.text()).toContain('今日运势');
    expect(wrapper.find('.header-action').exists()).toBe(true);
  });

  it('启用分隔线时会附带统一类名', () => {
    const wrapper = mount(ContentSectionCard, {
      props: {
        title: '结果',
        useHeader: true,
        headerDivider: true,
      },
    });

    expect(wrapper.find('.section-header').classes()).toContain('section-header-divider');
  });
});
