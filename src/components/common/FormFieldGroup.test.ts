// @vitest-environment jsdom

import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import FormFieldGroup from './FormFieldGroup.vue';

describe('FormFieldGroup', () => {
  it('应把标签和提示关联到指定控件', () => {
    const wrapper = mount(FormFieldGroup, {
      props: {
        label: 'API 密钥',
        hint: '请输入与 OpenAI 格式兼容的 API 密钥',
        labelFor: 'custom-api-key',
        hintId: 'custom-api-key-hint',
      },
      slots: {
        default: '<input id="custom-api-key" aria-describedby="custom-api-key-hint" />',
      },
    });

    expect(wrapper.get('label').attributes('for')).toBe('custom-api-key');
    expect(wrapper.get('.form-hint').attributes('id')).toBe('custom-api-key-hint');
    expect(wrapper.get('input').attributes('aria-describedby')).toBe('custom-api-key-hint');
  });

  it('禁用状态应落到外层样式类上', () => {
    const wrapper = mount(FormFieldGroup, {
      props: {
        label: '选择模型',
        disabled: true,
      },
      slots: {
        default: '<button type="button">选择</button>',
      },
    });

    expect(wrapper.classes()).toContain('form-disabled');
  });
});
