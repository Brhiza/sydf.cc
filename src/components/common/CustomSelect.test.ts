// @vitest-environment jsdom

import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import CustomSelect from './CustomSelect.vue';

const options = [
  { name: 'gpt-5-mini', displayName: 'GPT-5 Mini', remark: '适合日常问答' },
  { name: 'gpt-5', displayName: 'GPT-5', remark: '适合复杂推理' },
  { name: 'gpt-4.1', displayName: 'GPT-4.1', remark: '兼容现有流程' },
];

function createWrapper(props: Record<string, unknown> = {}) {
  return mount(CustomSelect, {
    props: {
      options,
      modelValue: '',
      placeholder: '请选择模型',
      ...props,
    },
    attachTo: document.body,
  });
}

describe('CustomSelect', () => {
  it('点击选项后会发出更新并关闭面板', async () => {
    const wrapper = createWrapper();

    await wrapper.get('.selected').trigger('click');
    await wrapper.get('.option-item').trigger('click');

    expect(wrapper.emitted('update:modelValue')).toEqual([['gpt-5-mini']]);
    expect(wrapper.find('.items').classes()).toContain('selectHide');
  });

  it('支持键盘打开、切换高亮并确认选项', async () => {
    const wrapper = createWrapper();
    const root = wrapper.get('.custom-select');

    await root.trigger('keydown', { key: 'ArrowDown' });
    expect(wrapper.find('.items').classes()).not.toContain('selectHide');
    expect(wrapper.findAll('.option-item')[0].classes()).toContain('active');

    await root.trigger('keydown', { key: 'ArrowDown' });
    expect(wrapper.findAll('.option-item')[1].classes()).toContain('active');

    await root.trigger('keydown', { key: 'Enter' });
    expect(wrapper.emitted('update:modelValue')).toEqual([['gpt-5']]);
  });

  it('禁用时不会展开或触发选择', async () => {
    const wrapper = createWrapper({
      disabled: true,
    });

    await wrapper.get('.selected').trigger('click');

    expect(wrapper.find('.items').classes()).toContain('selectHide');
    expect(wrapper.find('.custom-select').classes()).toContain('disabled');
  });

  it('紧凑模式会带上对应样式类名', () => {
    const wrapper = createWrapper({
      size: 'compact',
    });

    expect(wrapper.classes()).toContain('custom-select-compact');
  });
});
