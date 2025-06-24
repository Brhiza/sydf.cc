// 数据缓存管理器
(function() {
    'use strict';

    class CacheManager {
        constructor() {
            this.cache = new Map();
            this.maxSize = 50; // 最大缓存条目数
            this.defaultTTL = 30 * 60 * 1000; // 默认30分钟过期
            this.storageKey = 'paipan_cache';
            this.init();
        }

        init() {
            // 从localStorage恢复缓存
            this.loadFromStorage();
            
            // 定期清理过期缓存
            setInterval(() => {
                this.cleanExpired();
            }, 5 * 60 * 1000); // 每5分钟清理一次

            // 页面卸载时保存缓存
            window.addEventListener('beforeunload', () => {
                this.saveToStorage();
            });
        }

        // 生成缓存键
        generateKey(type, data) {
            const keyData = typeof data === 'object' ? JSON.stringify(data) : String(data);
            return `${type}:${this.hashCode(keyData)}`;
        }

        // 简单哈希函数
        hashCode(str) {
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                const char = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash; // 转换为32位整数
            }
            return Math.abs(hash).toString(36);
        }

        // 设置缓存
        set(type, data, result, ttl = this.defaultTTL) {
            const key = this.generateKey(type, data);
            const item = {
                key,
                type,
                data,
                result,
                timestamp: Date.now(),
                ttl,
                accessCount: 0,
                lastAccess: Date.now()
            };

            this.cache.set(key, item);
            
            // 检查缓存大小
            if (this.cache.size > this.maxSize) {
                this.evictLRU();
            }

            console.log(`Cache set: ${type} (${key})`);
        }

        // 获取缓存
        get(type, data) {
            const key = this.generateKey(type, data);
            const item = this.cache.get(key);

            if (!item) {
                return null;
            }

            // 检查是否过期
            if (Date.now() - item.timestamp > item.ttl) {
                this.cache.delete(key);
                console.log(`Cache expired: ${type} (${key})`);
                return null;
            }

            // 更新访问信息
            item.accessCount++;
            item.lastAccess = Date.now();

            console.log(`Cache hit: ${type} (${key})`);
            return item.result;
        }

        // 检查缓存是否存在
        has(type, data) {
            const key = this.generateKey(type, data);
            const item = this.cache.get(key);
            
            if (!item) {
                return false;
            }

            // 检查是否过期
            if (Date.now() - item.timestamp > item.ttl) {
                this.cache.delete(key);
                return false;
            }

            return true;
        }

        // 删除特定缓存
        delete(type, data) {
            const key = this.generateKey(type, data);
            const deleted = this.cache.delete(key);
            if (deleted) {
                console.log(`Cache deleted: ${type} (${key})`);
            }
            return deleted;
        }

        // 清除特定类型的所有缓存
        clearType(type) {
            let count = 0;
            for (const [key, item] of this.cache) {
                if (item.type === type) {
                    this.cache.delete(key);
                    count++;
                }
            }
            console.log(`Cleared ${count} cache items of type: ${type}`);
            return count;
        }

        // 清除所有缓存
        clear() {
            const size = this.cache.size;
            this.cache.clear();
            console.log(`Cleared all cache (${size} items)`);
        }

        // LRU淘汰策略
        evictLRU() {
            let oldestKey = null;
            let oldestTime = Date.now();

            for (const [key, item] of this.cache) {
                if (item.lastAccess < oldestTime) {
                    oldestTime = item.lastAccess;
                    oldestKey = key;
                }
            }

            if (oldestKey) {
                const item = this.cache.get(oldestKey);
                this.cache.delete(oldestKey);
                console.log(`Cache evicted (LRU): ${item.type} (${oldestKey})`);
            }
        }

        // 清理过期缓存
        cleanExpired() {
            const now = Date.now();
            let count = 0;

            for (const [key, item] of this.cache) {
                if (now - item.timestamp > item.ttl) {
                    this.cache.delete(key);
                    count++;
                }
            }

            if (count > 0) {
                console.log(`Cleaned ${count} expired cache items`);
            }
        }

        // 保存到localStorage
        saveToStorage() {
            try {
                const cacheData = Array.from(this.cache.entries()).map(([key, item]) => ({
                    key,
                    type: item.type,
                    data: item.data,
                    result: item.result,
                    timestamp: item.timestamp,
                    ttl: item.ttl
                }));

                localStorage.setItem(this.storageKey, JSON.stringify(cacheData));
                console.log(`Cache saved to storage (${cacheData.length} items)`);
            } catch (error) {
                console.warn('Failed to save cache to storage:', error);
            }
        }

        // 从localStorage加载
        loadFromStorage() {
            try {
                const stored = localStorage.getItem(this.storageKey);
                if (!stored) return;

                const cacheData = JSON.parse(stored);
                const now = Date.now();
                let loadedCount = 0;

                cacheData.forEach(item => {
                    // 只加载未过期的缓存
                    if (now - item.timestamp < item.ttl) {
                        this.cache.set(item.key, {
                            ...item,
                            accessCount: 0,
                            lastAccess: now
                        });
                        loadedCount++;
                    }
                });

                console.log(`Cache loaded from storage (${loadedCount} items)`);
            } catch (error) {
                console.warn('Failed to load cache from storage:', error);
            }
        }

        // 获取缓存统计信息
        getStats() {
            const stats = {
                totalItems: this.cache.size,
                types: {},
                totalSize: 0,
                oldestItem: null,
                newestItem: null
            };

            let oldestTime = Date.now();
            let newestTime = 0;

            for (const [key, item] of this.cache) {
                // 统计类型
                if (!stats.types[item.type]) {
                    stats.types[item.type] = 0;
                }
                stats.types[item.type]++;

                // 估算大小
                stats.totalSize += JSON.stringify(item).length;

                // 找到最老和最新的项目
                if (item.timestamp < oldestTime) {
                    oldestTime = item.timestamp;
                    stats.oldestItem = { type: item.type, timestamp: item.timestamp };
                }
                if (item.timestamp > newestTime) {
                    newestTime = item.timestamp;
                    stats.newestItem = { type: item.type, timestamp: item.timestamp };
                }
            }

            return stats;
        }
    }

    // 创建全局实例
    const cacheManager = new CacheManager();

    // 导出到全局作用域
    window.CacheManager = {
        set: (type, data, result, ttl) => cacheManager.set(type, data, result, ttl),
        get: (type, data) => cacheManager.get(type, data),
        has: (type, data) => cacheManager.has(type, data),
        delete: (type, data) => cacheManager.delete(type, data),
        clearType: (type) => cacheManager.clearType(type),
        clear: () => cacheManager.clear(),
        getStats: () => cacheManager.getStats()
    };

    console.log('Cache Manager initialized');
})();
