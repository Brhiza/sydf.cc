// @vitest-environment jsdom

import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import RemoteRecordsTable from './RemoteRecordsTable.vue';

describe('RemoteRecordsTable', () => {
  it('会渲染表头和页脚插槽', () => {
    const wrapper = mount(RemoteRecordsTable, {
      props: {
        headers: [
          { key: 'name', label: '捐赠人' },
          { key: 'amount', label: '金额' },
        ],
      },
      slots: {
        default: '<tr><td>张三</td><td class="amount-cell">88元</td></tr>',
        footer: '<tr class="total-row"><td>总计</td><td>88元</td></tr>',
      },
    });

    expect(wrapper.text()).toContain('捐赠人');
    expect(wrapper.text()).toContain('金额');
    expect(wrapper.find('.amount-cell').exists()).toBe(true);
    expect(wrapper.find('.total-row').exists()).toBe(true);
  });
});
