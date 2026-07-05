// @vitest-environment jsdom

import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';
import { describe, expect, it } from 'vitest';
import DatePicker from './DatePicker.vue';

describe('DatePicker', () => {
  it('标签应关联当前实例的日期输入框', () => {
    const wrapper = mount(DatePicker, {
      props: {
        modelValue: '2026-07-05',
      },
    });

    const inputId = wrapper.get('input').attributes('id');

    expect(inputId).toBeTruthy();
    expect(wrapper.get('label').attributes('for')).toBe(inputId);
  });

  it('多个日期选择器实例不应生成重复 id', () => {
    const wrapper = mount(
      defineComponent({
        components: { DatePicker },
        template: `
          <div>
            <DatePicker model-value="2026-07-05" />
            <DatePicker model-value="2026-07-06" />
          </div>
        `,
      })
    );

    const ids = wrapper.findAll('input').map((input) => input.attributes('id'));

    expect(new Set(ids).size).toBe(ids.length);
  });

  it('修改日期时会发出更新事件', async () => {
    const wrapper = mount(DatePicker, {
      props: {
        modelValue: '2026-07-05',
      },
    });

    await wrapper.get('input').setValue('2026-07-06');

    expect(wrapper.emitted('update:modelValue')).toEqual([['2026-07-06']]);
  });
});
