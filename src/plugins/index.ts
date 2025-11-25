/**
 * 插件注册
 */
import pinia from '@/stores';
import type { App } from 'vue';

/**
 * 注册所有插件
 * @param app Vue应用实例
 */
export function registerPlugins(app: App): void {
  // 注册Pinia
  app.use(pinia);
}
