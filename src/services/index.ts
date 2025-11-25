/**
 * 服务层统一入口
 * 导出所有服务和相关类型
 */

// 服务实例
export { AIService, generateAIResponse, getAIInsight } from './ai';
export { divinationService, performDivination } from './divination';
export { historyService } from './history';
export { getSignByNumber } from './algorithms/ssgw';
export { pwa } from './pwa';
export { aiService } from './aiService';
export { dataGenerationService } from './dataGenerationService';

// 类型定义
export type { AIResponse } from './ai';
export type { DivinationResult, DivinationRequest } from './divination';
export type { HistoryRecord, AppSettings } from './history';

// 服务初始化函数
export function initializeServices() {
  // 这里可以添加服务初始化逻辑
}
