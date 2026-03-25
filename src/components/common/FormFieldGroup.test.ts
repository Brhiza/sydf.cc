// @vitest-environment jsdom

import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import FormFieldGroup from './FormFieldGroup.vue';

describe('FormFieldGroup', () => {
  it('会渲染标签、内容和提示', () => {
    const wrapper = mount(FormFieldGroup, {
      props: {
        label: 'API 密钥',
        hint: '请输入与 OpenAI 格式兼容的 API 密钥',
      },
      slots: {
        default: '<input class="form-input" />',
      },
    });

    expect(wrapper.text()).toContain('API 密钥');
    expect(wrapper.text()).toContain('请输入与 OpenAI 格式兼容的 API 密钥');
    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('禁用时会附带统一禁用类名', () => {
    const wrapper = mount(FormFieldGroup, {
      props: {
        label: '选择模型',
        disabled: true,
      },
    });

    expect(wrapper.classes()).toContain('form-disabled');
  });
});
