// @vitest-environment jsdom

import { mount } from '@vue/test-utils';
import { nextTick, defineComponent } from 'vue';
import { beforeEach, describe, expect, it } from 'vitest';
import { useSupplementaryInfo } from './useSupplementaryInfo';
import { DEFAULT_QIMEN_METHOD, DEFAULT_QIMEN_SCOPE } from '@/shared/qimen-settings';

function mountSupplementaryInfo() {
  let state!: ReturnType<typeof useSupplementaryInfo>;

  const TestHarness = defineComponent({
    setup() {
      state = useSupplementaryInfo();
      return () => null;
    },
  });

  const wrapper = mount(TestHarness);
  return { state, wrapper };
}

describe('useSupplementaryInfo', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('默认状态不应提交梅花或奇门高级参数', async () => {
    const { state, wrapper } = mountSupplementaryInfo();
    await nextTick();

    expect(state.getSupplementaryInfo()).toBeUndefined();
    expect(state.supplementaryInfoToggleText.value).toBe('补充信息');

    wrapper.unmount();
  });

  it('只有用户主动修改奇门设置后才提交奇门高级参数', async () => {
    const { state, wrapper } = mountSupplementaryInfo();
    await nextTick();

    state.qimenScope.value = 'day';
    await nextTick();

    expect(state.getSupplementaryInfo()).toEqual({
      qimenSettings: {
        method: DEFAULT_QIMEN_METHOD,
        scope: 'day',
      },
    });
    expect(state.supplementaryInfoToggleText.value).toBe('已补充信息');

    wrapper.unmount();
  });

  it('重置后应回到直接可用的默认状态', async () => {
    const { state, wrapper } = mountSupplementaryInfo();
    await nextTick();

    state.qimenMethod.value = 'feipan';
    state.meihuaMethod.value = 'random';
    await nextTick();

    state.resetSupplementaryInfo();
    await nextTick();

    expect(state.qimenMethod.value).toBe(DEFAULT_QIMEN_METHOD);
    expect(state.qimenScope.value).toBe(DEFAULT_QIMEN_SCOPE);
    expect(state.meihuaMethod.value).toBe('time');
    expect(state.getSupplementaryInfo()).toBeUndefined();

    wrapper.unmount();
  });

  it('旧缓存中的非法高级参数应回到默认状态', async () => {
    localStorage.setItem(
      'supplementaryInfo',
      JSON.stringify({
        meihuaSettings: {
          method: 'bad-method',
          number: 8,
          externalOmens: {
            direction: '坏方向',
            count: Number.NaN,
          },
        },
        qimenSettings: {
          method: 'bad-method',
          scope: 'bad-scope',
        },
      })
    );

    const { state, wrapper } = mountSupplementaryInfo();
    await nextTick();

    expect(state.meihuaMethod.value).toBe('time');
    expect(state.meihuaNumber.value).toBeUndefined();
    expect(state.qimenMethod.value).toBe(DEFAULT_QIMEN_METHOD);
    expect(state.qimenScope.value).toBe(DEFAULT_QIMEN_SCOPE);
    expect(state.getSupplementaryInfo()).toBeUndefined();
    expect(state.supplementaryInfoToggleText.value).toBe('补充信息');

    wrapper.unmount();
  });
});
