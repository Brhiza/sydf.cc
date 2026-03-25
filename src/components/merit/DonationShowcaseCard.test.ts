// @vitest-environment jsdom

import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import DonationShowcaseCard from './DonationShowcaseCard.vue';

describe('DonationShowcaseCard', () => {
  it('会渲染功德箱图片、收款码和跳转链接', () => {
    const wrapper = mount(DonationShowcaseCard, {
      props: {
        meritBoxImageSrc: '/static/gongdexiang.jpg',
        meritBoxImageAlt: '功德箱',
        paymentMethods: [
          {
            src: '/static/alipay.png',
            alt: '支付宝收款码',
            hint: '支付宝扫码捐赠',
          },
          {
            src: '/static/wechat.png',
            alt: '微信收款码',
            hint: '微信扫码捐赠',
          },
        ],
        boardLink: {
          href: '/gongdeboard',
          label: '🙏 功德榜',
        },
      },
    });

    expect(wrapper.findAll('.payment-method')).toHaveLength(2);
    expect(wrapper.find('.merit-box-link a').attributes('href')).toBe('/gongdeboard');
  });
});
