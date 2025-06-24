// Service Worker 调试工具
(function() {
    'use strict';

    class ServiceWorkerDebugger {
        constructor() {
            this.swRegistration = null;
            this.init();
        }

        async init() {
            if ('serviceWorker' in navigator) {
                try {
                    this.swRegistration = await navigator.serviceWorker.getRegistration();
                    this.setupEventListeners();
                    this.createDebugPanel();
                } catch (error) {
                    console.error('Service Worker debugger initialization failed:', error);
                }
            }
        }

        setupEventListeners() {
            // 监听Service Worker状态变化
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                console.log('Service Worker controller changed');
                this.updateDebugInfo();
            });

            // 监听Service Worker消息
            navigator.serviceWorker.addEventListener('message', (event) => {
                console.log('Message from Service Worker:', event.data);
            });

            // 监听更新
            if (this.swRegistration) {
                this.swRegistration.addEventListener('updatefound', () => {
                    console.log('Service Worker update found');
                    this.updateDebugInfo();
                });
            }
        }

        createDebugPanel() {
            // 只在开发环境或明确启用时显示
            const shouldShow = 
                window.location.hostname === 'localhost' ||
                window.location.hostname === '127.0.0.1' ||
                window.location.search.includes('sw-debug=true') ||
                localStorage.getItem('enableSWDebug') === 'true';

            if (!shouldShow) return;

            const panel = document.createElement('div');
            panel.id = 'sw-debug-panel';
            panel.innerHTML = `
                <div class="sw-debug-header">
                    <h4>Service Worker 调试</h4>
                    <button id="sw-debug-toggle">−</button>
                </div>
                <div class="sw-debug-content">
                    <div class="sw-debug-section">
                        <h5>状态信息</h5>
                        <div id="sw-status">检查中...</div>
                    </div>
                    <div class="sw-debug-section">
                        <h5>缓存信息</h5>
                        <div id="sw-cache-info">加载中...</div>
                    </div>
                    <div class="sw-debug-section">
                        <h5>操作</h5>
                        <div class="sw-debug-actions">
                            <button id="sw-update-btn">检查更新</button>
                            <button id="sw-clear-cache-btn">清除缓存</button>
                            <button id="sw-unregister-btn">注销SW</button>
                        </div>
                    </div>
                </div>
            `;

            this.addDebugStyles();
            document.body.appendChild(panel);
            this.bindDebugEvents();
            this.updateDebugInfo();
        }

        addDebugStyles() {
            if (document.querySelector('#sw-debug-styles')) return;

            const style = document.createElement('style');
            style.id = 'sw-debug-styles';
            style.textContent = `
                #sw-debug-panel {
                    position: fixed;
                    top: 10px;
                    right: 10px;
                    width: 300px;
                    background: #1f2937;
                    color: #f9fafb;
                    border-radius: 8px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                    font-family: 'Courier New', monospace;
                    font-size: 12px;
                    z-index: 10000;
                    max-height: 400px;
                    overflow: hidden;
                }

                .sw-debug-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px 15px;
                    background: #374151;
                    border-radius: 8px 8px 0 0;
                }

                .sw-debug-header h4 {
                    margin: 0;
                    font-size: 14px;
                    color: #f9fafb;
                }

                #sw-debug-toggle {
                    background: none;
                    border: none;
                    color: #f9fafb;
                    cursor: pointer;
                    font-size: 16px;
                    padding: 0;
                    width: 20px;
                    height: 20px;
                }

                .sw-debug-content {
                    padding: 15px;
                    max-height: 350px;
                    overflow-y: auto;
                }

                .sw-debug-content.collapsed {
                    display: none;
                }

                .sw-debug-section {
                    margin-bottom: 15px;
                }

                .sw-debug-section h5 {
                    margin: 0 0 8px 0;
                    color: #60a5fa;
                    font-size: 13px;
                }

                .sw-debug-section div {
                    color: #d1d5db;
                    line-height: 1.4;
                }

                .sw-debug-actions {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 5px;
                }

                .sw-debug-actions button {
                    padding: 4px 8px;
                    background: #4f46e5;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 11px;
                }

                .sw-debug-actions button:hover {
                    background: #6366f1;
                }

                .sw-status-active { color: #10b981; }
                .sw-status-inactive { color: #ef4444; }
                .sw-status-installing { color: #f59e0b; }

                @media (max-width: 768px) {
                    #sw-debug-panel {
                        width: 250px;
                        font-size: 11px;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        bindDebugEvents() {
            const toggle = document.getElementById('sw-debug-toggle');
            const content = document.querySelector('.sw-debug-content');
            
            toggle.addEventListener('click', () => {
                content.classList.toggle('collapsed');
                toggle.textContent = content.classList.contains('collapsed') ? '+' : '−';
            });

            document.getElementById('sw-update-btn').addEventListener('click', () => {
                this.checkForUpdates();
            });

            document.getElementById('sw-clear-cache-btn').addEventListener('click', () => {
                this.clearCaches();
            });

            document.getElementById('sw-unregister-btn').addEventListener('click', () => {
                this.unregisterServiceWorker();
            });
        }

        async updateDebugInfo() {
            await this.updateStatus();
            await this.updateCacheInfo();
        }

        async updateStatus() {
            const statusEl = document.getElementById('sw-status');
            if (!statusEl) return;

            try {
                const registration = await navigator.serviceWorker.getRegistration();
                
                if (!registration) {
                    statusEl.innerHTML = '<span class="sw-status-inactive">未注册</span>';
                    return;
                }

                let status = '';
                
                if (registration.installing) {
                    status += '<div><span class="sw-status-installing">安装中</span></div>';
                }
                
                if (registration.waiting) {
                    status += '<div><span class="sw-status-installing">等待激活</span></div>';
                }
                
                if (registration.active) {
                    status += '<div><span class="sw-status-active">已激活</span></div>';
                    status += `<div>作用域: ${registration.scope}</div>`;
                }

                const controller = navigator.serviceWorker.controller;
                if (controller) {
                    status += `<div>控制器: ${controller.scriptURL.split('/').pop()}</div>`;
                }

                statusEl.innerHTML = status || '<span class="sw-status-inactive">状态未知</span>';
            } catch (error) {
                statusEl.innerHTML = `<span class="sw-status-inactive">错误: ${error.message}</span>`;
            }
        }

        async updateCacheInfo() {
            const cacheEl = document.getElementById('sw-cache-info');
            if (!cacheEl) return;

            try {
                const cacheNames = await caches.keys();
                let info = `<div>缓存数量: ${cacheNames.length}</div>`;
                
                for (const cacheName of cacheNames) {
                    const cache = await caches.open(cacheName);
                    const keys = await cache.keys();
                    info += `<div>${cacheName}: ${keys.length} 项</div>`;
                }

                cacheEl.innerHTML = info;
            } catch (error) {
                cacheEl.innerHTML = `错误: ${error.message}`;
            }
        }

        async checkForUpdates() {
            try {
                const registration = await navigator.serviceWorker.getRegistration();
                if (registration) {
                    await registration.update();
                    console.log('Service Worker update check completed');
                    this.updateDebugInfo();
                }
            } catch (error) {
                console.error('Update check failed:', error);
            }
        }

        async clearCaches() {
            try {
                const cacheNames = await caches.keys();
                await Promise.all(cacheNames.map(name => caches.delete(name)));
                console.log('All caches cleared');
                this.updateDebugInfo();
            } catch (error) {
                console.error('Cache clearing failed:', error);
            }
        }

        async unregisterServiceWorker() {
            try {
                const registration = await navigator.serviceWorker.getRegistration();
                if (registration) {
                    await registration.unregister();
                    console.log('Service Worker unregistered');
                    this.updateDebugInfo();
                }
            } catch (error) {
                console.error('Unregistration failed:', error);
            }
        }

        // 获取详细统计信息
        async getDetailedStats() {
            const stats = {
                registration: null,
                caches: {},
                performance: {}
            };

            try {
                // Service Worker信息
                const registration = await navigator.serviceWorker.getRegistration();
                if (registration) {
                    stats.registration = {
                        scope: registration.scope,
                        installing: !!registration.installing,
                        waiting: !!registration.waiting,
                        active: !!registration.active,
                        updateViaCache: registration.updateViaCache
                    };
                }

                // 缓存信息
                const cacheNames = await caches.keys();
                for (const cacheName of cacheNames) {
                    const cache = await caches.open(cacheName);
                    const keys = await cache.keys();
                    stats.caches[cacheName] = {
                        itemCount: keys.length,
                        urls: keys.map(req => req.url)
                    };
                }

                // 性能信息
                if ('performance' in window && performance.getEntriesByType) {
                    const navigationEntries = performance.getEntriesByType('navigation');
                    if (navigationEntries.length > 0) {
                        const nav = navigationEntries[0];
                        stats.performance = {
                            loadTime: nav.loadEventEnd - nav.fetchStart,
                            domContentLoaded: nav.domContentLoadedEventEnd - nav.domContentLoadedEventStart
                        };
                    }
                }

            } catch (error) {
                stats.error = error.message;
            }

            return stats;
        }
    }

    // 创建全局实例
    const swDebugger = new ServiceWorkerDebugger();

    // 导出到全局作用域
    window.SWDebugger = {
        getStats: () => swDebugger.getDetailedStats(),
        updateInfo: () => swDebugger.updateDebugInfo(),
        checkUpdates: () => swDebugger.checkForUpdates(),
        clearCaches: () => swDebugger.clearCaches()
    };

    console.log('Service Worker Debugger initialized');
})();
