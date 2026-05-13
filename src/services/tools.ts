/**
 * @file AI 工具集合
 * @description 包含本地干支查询解析、用户意图识别、AI 工具定义与执行器。
 * - parsers/context-formatters 负责把自然语言时间表达式转成本地预解析结果
 * - user-intent 处理"用户问题是不是历法相关"的判断
 * - definitions/executors 是 OpenAI 兼容的工具 schema 和本地执行回调
 */
export type { GanzhiQueryContext } from './tools/context-formatters';
export {
  extractUserIntentText,
  resolveGanzhiQueryContext,
  shouldEnableGanzhiTools,
} from './tools/user-intent';
export {
  getCurrentTimeInfoTool,
  getGanZhiForDateTool,
  getGanZhiForMonthTool,
  getGanZhiForYearTool,
} from './tools/definitions';
export { toolExecutors } from './tools/executors';
