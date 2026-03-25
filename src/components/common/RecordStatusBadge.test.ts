// @vitest-environment jsdom

import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import RecordStatusBadge from './RecordStatusBadge.vue';

describe('RecordStatusBadge', () => {
  it('会渲染文案和状态类名', () => {
    const wrapper = mount(RecordStatusBadge, {
      props: {
        label: '匿名',
        tone: 'warning',
      },
    });

    expect(wrapper.text()).toContain('匿名');
    expect(wrapper.classes()).toContain('record-status-badge-warning');
  });
});
