import LiuyaoResult from './LiuyaoResult.vue';
import MeihuaResult from './MeihuaResult.vue';
import QimenResult from './QimenResult.vue';
import SsgwResult from './SsgwResult.vue';
import TarotResult from './TarotResult.vue';
import DailyResult from './DailyResult.vue';

export { LiuyaoResult, MeihuaResult, QimenResult, SsgwResult, TarotResult, DailyResult };

// 导出所有结果组件，用于全局注册
// 使用 Component 类型断言
import type { Component } from 'vue';

export const resultComponents = [
  LiuyaoResult as Component,
  MeihuaResult as Component,
  QimenResult as Component,
  TarotResult as Component,
  SsgwResult as Component,
  DailyResult as Component,
] as const;
