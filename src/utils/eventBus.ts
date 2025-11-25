/**
 * 简单的事件总线
 * 用于组件间通信
 */

type EventCallback = (...args: unknown[]) => void;

class EventBus {
  private events: Map<string, EventCallback[]> = new Map();

  /**
   * 监听事件
   */
  on(event: string, callback: EventCallback) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)!.push(callback);
  }

  /**
   * 移除事件监听
   */
  off(event: string, callback: EventCallback) {
    const callbacks = this.events.get(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  /**
   * 触发事件
   */
  emit(event: string, ...args: unknown[]) {
    const callbacks = this.events.get(event);
    if (callbacks) {
      callbacks.forEach((callback) => callback(...args));
    }
  }

  /**
   * 移除所有事件监听
   */
  clear() {
    this.events.clear();
  }
}

// 导出单例
export const eventBus = new EventBus();

// 定义事件类型
export const EVENTS = {
  HISTORY_UPDATED: 'history:updated',
  DIVINATION_COMPLETED: 'divination:completed',
  HISTORY_SELECTION_RESET: 'history:selection-reset',
} as const;
