// @vitest-environment jsdom

import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { TAROT_SPREADS } from '@/shared/tarot-spreads';
import TarotSpreadSelector from './TarotSpreadSelector.vue';

describe('TarotSpreadSelector', () => {
  it('默认显示紧凑牌阵，点击更多后展示全部牌阵', async () => {
    const wrapper = mount(TarotSpreadSelector, {
      props: {
        selectedSpread: 'three',
      },
    });

    expect(wrapper.findAll('.spread-option')).toHaveLength(4);

    await wrapper.get('.spread-toggle').trigger('click');

    expect(wrapper.findAll('.spread-option')).toHaveLength(Object.keys(TAROT_SPREADS).length);
  });

  it('选中的牌阵不在默认范围内时，紧凑模式仍展示当前选中项', () => {
    const wrapper = mount(TarotSpreadSelector, {
      props: {
        selectedSpread: 'celtic',
      },
    });

    expect(wrapper.text()).toContain(TAROT_SPREADS.celtic.name);
    expect(wrapper.find('.spread-option.active').text()).toContain(TAROT_SPREADS.celtic.name);
  });

  it('顶部不重复显示当前牌阵，卡片使用短描述', () => {
    const wrapper = mount(TarotSpreadSelector, {
      props: {
        selectedSpread: 'three',
      },
    });

    expect(wrapper.find('.spread-selector-header').text()).not.toContain(TAROT_SPREADS.three.name);
    expect(wrapper.find('.spread-option.active').text()).toContain('按时间脉络看过去、现在与趋势。');
    expect(wrapper.find('.spread-option.active').text()).not.toContain(TAROT_SPREADS.three.description);
  });

  it('点击牌阵时应发出更新事件', async () => {
    const wrapper = mount(TarotSpreadSelector, {
      props: {
        selectedSpread: 'single',
      },
    });

    await wrapper.findAll('.spread-option')[1].trigger('click');

    expect(wrapper.emitted('update:selectedSpread')?.[0]).toEqual(['three']);
  });
});
