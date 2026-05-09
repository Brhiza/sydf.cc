// @vitest-environment jsdom

import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import TarotCardItem from './TarotCardItem.vue';

describe('TarotCardItem', () => {
  it('图片加载失败时应回退到牌背图', async () => {
    const wrapper = mount(TarotCardItem, {
      props: {
        card: {
          id: 1,
          name: '魔术师',
          position: '现状',
          reversed: false,
          keywords: ['行动', '创造'],
        },
      },
    });

    const image = wrapper.get('img');
    await image.trigger('error');

    expect((image.element as HTMLImageElement).src).toContain('/static/tarot/card-back.jpg');
  });
});
