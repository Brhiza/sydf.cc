// @vitest-environment jsdom

import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import MeritStatsCard from './MeritStatsCard.vue';

describe('MeritStatsCard', () => {
  it('会渲染标题、高亮文案和统计项', () => {
    const wrapper = mount(MeritStatsCard, {
      props: {
        title: '功德统计',
        accentText: '爱心汇聚',
        items: [
          { label: '总额', value: 100 },
          { label: '人数', value: 2 },
        ],
      },
    });

    expect(wrapper.text()).toContain('功德统计');
    expect(wrapper.text()).toContain('爱心汇聚');
    expect(wrapper.text()).toContain('总额');
    expect(wrapper.text()).toContain('人数');
  });
});
