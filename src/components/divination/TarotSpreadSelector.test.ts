// @vitest-environment jsdom

import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, it } from 'vitest';
import TarotSpreadSelector from './TarotSpreadSelector.vue';

describe('TarotSpreadSelector', () => {
  it('点击 document 本身时应关闭全部牌阵面板且不报错', async () => {
    const wrapper = mount(TarotSpreadSelector, {
      props: {
        selectedSpread: 'three',
      },
      attachTo: document.body,
    });

    await wrapper.find('.expand-button').trigger('click');
    expect(wrapper.find('.all-spreads-panel').exists()).toBe(true);

    expect(() => {
      document.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }).not.toThrow();
    await nextTick();

    expect(wrapper.find('.all-spreads-panel').exists()).toBe(false);
    wrapper.unmount();
  });
});
