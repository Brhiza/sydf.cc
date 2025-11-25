/**
 * 统一缓存管理器
 * 用于管理应用中的所有缓存，避免内存浪费和提高性能
 */
class CacheManager {
  private static instance: CacheManager;
  private caches: Map<string, Map<string, unknown>> = new Map();
  private maxSizes: Map<string, number> = new Map();
  
  private constructor() {}
  
  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }
  
  /**
   * 获取缓存值
   * @param cacheType 缓存类型
   * @param key 缓存键
   * @returns 缓存值或undefined
   */
  get(cacheType: string, key: string): unknown {
    const cache = this.caches.get(cacheType);
    return cache?.get(key);
  }
  
  /**
   * 设置缓存值
   * @param cacheType 缓存类型
   * @param key 缓存键
   * @param value 缓存值
   * @param maxSize 最大缓存数量
   */
  set(cacheType: string, key: string, value: unknown, maxSize: number = 50): void {
    if (!this.caches.has(cacheType)) {
      this.caches.set(cacheType, new Map());
      this.maxSizes.set(cacheType, maxSize);
    }
    
    const cache = this.caches.get(cacheType)!;
    const currentMaxSize = this.maxSizes.get(cacheType) || maxSize;
    
    // 清理超出限制的缓存
    if (cache.size >= currentMaxSize) {
      const firstKey = cache.keys().next().value;
      if (firstKey !== undefined) {
        cache.delete(firstKey);
      }
    }
    
    cache.set(key, value);
  }
  
  /**
   * 删除指定缓存
   * @param cacheType 缓存类型
   * @param key 缓存键
   */
  delete(cacheType: string, key: string): void {
    const cache = this.caches.get(cacheType);
    cache?.delete(key);
  }
  
  /**
   * 清空指定类型的缓存
   * @param cacheType 缓存类型
   */
  clear(cacheType: string): void {
    this.caches.get(cacheType)?.clear();
  }
  
  /**
   * 清空所有缓存
   */
  clearAll(): void {
    this.caches.forEach(cache => cache.clear());
  }
  
  /**
   * 获取缓存统计信息
   * @returns 缓存统计信息
   */
  getStats(): Record<string, { size: number; maxSize: number }> {
    const stats: Record<string, { size: number; maxSize: number }> = {};
    
    this.caches.forEach((cache, cacheType) => {
      stats[cacheType] = {
        size: cache.size,
        maxSize: this.maxSizes.get(cacheType) || 50
      };
    });
    
    return stats;
  }
  
  /**
   * 生成优化的缓存键
   * @param prefix 前缀
   * @param content 内容
   * @returns 缓存键
   */
  generateKey(prefix: string, content: string): string {
    // 使用内容的哈希值作为缓存键，避免长字符串作为键
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // 转换为32位整数
    }
    return `${prefix}_${hash}_${content.length}`;
  }
}

export const cacheManager = CacheManager.getInstance();
export default cacheManager;
