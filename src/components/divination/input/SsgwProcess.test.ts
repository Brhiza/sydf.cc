// @vitest-environment jsdom

import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SsgwProcess from './SsgwProcess.vue';

const baseProps = {
  isShaking: false,
  shakingMessage: '',
  shakingProgress: 0,
  isTossing: false,
  showTossResult: true,
  currentQian: 18,
  beiResults: [],
  tossCount: 1,
  isApproved: false,
};

describe('SsgwProcess', () => {
  it('掷杯结果应作为普通文本渲染，不执行 HTML', () => {
    const wrapper = mount(SsgwProcess, {
      props: {
        ...baseProps,
        tossResult: [
          { title: '<img src=x onerror=alert(1)>', detail: '<script>alert(1)</script>' },
        ],
      },
    });

    expect(wrapper.text()).toContain('<img src=x onerror=alert(1)>');
    expect(wrapper.text()).toContain('<script>alert(1)</script>');
    expect(wrapper.find('img[src="x"]').exists()).toBe(false);
    expect(wrapper.find('script').exists()).toBe(false);
  });
});
