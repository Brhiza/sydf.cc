/**
 * @file AI 工具集合
 * @description 包含 OpenAI 兼容的工具 schema 和本地执行回调。
 */
export {
  getCurrentTimeInfoTool,
  getGanZhiForDateTool,
  getGanZhiForMonthTool,
  getGanZhiForYearTool,
} from './tools/definitions';
export { toolExecutors } from './tools/executors';
