/**
 * Pinia状态管理入口文件
 */
import { createPinia } from 'pinia';

// 创建Pinia实例
const pinia = createPinia();

// 导出Pinia实例
export default pinia;

// 导出所有store
export * from './settings';
