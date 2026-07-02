import {
  meihuaAnimalOptions,
  meihuaColorOptions,
  meihuaDirectionOptions,
  meihuaObjectOptions,
  meihuaPersonOptions,
  meihuaSoundOptions,
} from 'mingyu-core/divination/meihua-omens';

export {
  meihuaAnimalOptions,
  meihuaColorOptions,
  meihuaDirectionOptions,
  meihuaObjectOptions,
  meihuaPersonOptions,
  meihuaSoundOptions,
};

export type MeihuaDirectionOptionName = (typeof meihuaDirectionOptions)[number]['name'];
export type MeihuaPersonOptionName = (typeof meihuaPersonOptions)[number]['name'];
export type MeihuaAnimalOptionName = (typeof meihuaAnimalOptions)[number]['name'];
export type MeihuaObjectOptionName = (typeof meihuaObjectOptions)[number]['name'];
export type MeihuaSoundOptionName = (typeof meihuaSoundOptions)[number]['name'];
export type MeihuaColorOptionName = (typeof meihuaColorOptions)[number]['name'];
