import { describe, expect, it } from 'vitest';
import { reactive } from 'vue';
import { cloneSerializable } from './clone';

describe('cloneSerializable', () => {
  it('应深拷贝普通可序列化对象，且不影响原对象', () => {
    const source = {
      nested: {
        count: 1,
      },
      list: ['a', 'b'],
    };

    const cloned = cloneSerializable(source);
    cloned.nested.count = 2;
    cloned.list.push('c');

    expect(cloned).toEqual({
      nested: {
        count: 2,
      },
      list: ['a', 'b', 'c'],
    });
    expect(source).toEqual({
      nested: {
        count: 1,
      },
      list: ['a', 'b'],
    });
  });

  it('遇到 Vue 响应式代理时应自动回退并仍能完成深拷贝', () => {
    const source = reactive({
      nested: {
        score: 88,
      },
      tags: ['今日', '运势'],
    });

    const cloned = cloneSerializable(source);
    cloned.nested.score = 99;
    cloned.tags.push('测试');

    expect(cloned).toEqual({
      nested: {
        score: 99,
      },
      tags: ['今日', '运势', '测试'],
    });
    expect(source.nested.score).toBe(88);
    expect(source.tags).toEqual(['今日', '运势']);
  });
});
