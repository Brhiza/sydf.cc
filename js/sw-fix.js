// Service Worker 问题修复工具
(function() {
    'use strict';

    class ServiceWorkerFixer {
        constructor() {
            this.fixes = [];
            this.init();
        }

        init() {
            // 检查常见问题
            this.checkCommonIssues();
            
            // 如果有问题，尝试自动修复
            if (this.fixes.length > 0) {
                this.attemptAutoFix();
            }
        }

        async checkCommonIssues() {
            // 检查1: Service Worker是否支持
            if (!('serviceWorker' in navigator)) {
                this.fixes.push({
                    issue: 'Service Worker not supported',
                    severity: 'high',
                    fix: () => this.showUnsupportedMessage()
                });
                return;
            }

            // 检查2: 是否在HTTPS或localhost
            if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
                this.fixes.push({
                    issue: 'Service Worker requires HTTPS',
                    severity: 'high',
                    fix: () => this.showHTTPSWarning()
                });
            }

            // 检查3: Service Worker文件是否存在
            try {
                const response = await fetch('/sw.js', { method: 'HEAD' });
                if (!response.ok) {
                    this.fixes.push({
                        issue: 'Service Worker file not found',
                        severity: 'high',
                        fix: () => this.handleMissingFile()
                    });
                }
            } catch (error) {
                this.fixes.push({
                    issue: 'Cannot check Service Worker file',
                    severity: 'medium',
                    fix: () => this.handleNetworkError()
                });
            }

            // 检查4: 是否有注册错误
            try {
                const registration = await navigator.serviceWorker.getRegistration();
                if (!registration) {
                    this.fixes.push({
                        issue: 'Service Worker not registered',
                        severity: 'medium',
                        fix: () => this.attemptRegistration()
                    });
                }
            } catch (error) {
                this.fixes.push({
                    issue: 'Service Worker registration check failed',
                    severity: 'medium',
                    fix: () => this.handleRegistrationError(error)
                });
            }

            // 检查5: 缓存API是否可用
            if (!('caches' in window)) {
                this.fixes.push({
                    issue: 'Cache API not supported',
                    severity: 'medium',
                    fix: () => this.handleCacheAPIUnavailable()
                });
            }

            // 检查6: 是否有过期的Service Worker
            await this.checkForStaleServiceWorker();
        }

        async checkForStaleServiceWorker() {
            try {
                const registration = await navigator.serviceWorker.getRegistration();
                if (registration && registration.waiting) {
                    this.fixes.push({
                        issue: 'Service Worker update waiting',
                        severity: 'low',
                        fix: () => this.activateWaitingServiceWorker(registration)
                    });
                }
            } catch (error) {
                console.warn('Could not check for stale Service Worker:', error);
            }
        }

        async attemptAutoFix() {
            console.log(`Found ${this.fixes.length} Service Worker issues, attempting auto-fix...`);
            
            for (const fix of this.fixes) {
                try {
                    console.log(`Fixing: ${fix.issue}`);
                    await fix.fix();
                } catch (error) {
                    console.error(`Failed to fix "${fix.issue}":`, error);
                }
            }
        }

        showUnsupportedMessage() {
            console.warn('Service Worker is not supported in this browser');
            // 可以在这里显示用户友好的消息
        }

        showHTTPSWarning() {
            console.warn('Service Worker requires HTTPS in production');
            if (location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
                // 在生产环境显示HTTPS警告
                this.showNotification('此网站需要HTTPS才能启用离线功能', 'warning');
            }
        }

        handleMissingFile() {
            console.error('Service Worker file (sw.js) not found');
            this.showNotification('离线功能暂时不可用', 'error');
        }

        handleNetworkError() {
            console.warn('Network error while checking Service Worker');
            // 网络错误通常是暂时的，不需要特殊处理
        }

        async attemptRegistration() {
            try {
                console.log('Attempting to register Service Worker...');
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('Service Worker registered successfully:', registration.scope);
                this.showNotification('离线功能已启用', 'success');
            } catch (error) {
                console.error('Service Worker registration failed:', error);
                this.showNotification('离线功能启用失败', 'error');
            }
        }

        handleRegistrationError(error) {
            console.error('Service Worker registration error:', error);
            
            // 尝试清除旧的注册并重新注册
            this.clearAndReregister();
        }

        async clearAndReregister() {
            try {
                const registrations = await navigator.serviceWorker.getRegistrations();
                await Promise.all(registrations.map(reg => reg.unregister()));
                console.log('Cleared old Service Worker registrations');
                
                // 等待一下再重新注册
                setTimeout(() => {
                    this.attemptRegistration();
                }, 1000);
            } catch (error) {
                console.error('Failed to clear old registrations:', error);
            }
        }

        handleCacheAPIUnavailable() {
            console.warn('Cache API is not available');
            // Cache API不可用时，Service Worker仍然可以工作，只是没有缓存功能
        }

        async activateWaitingServiceWorker(registration) {
            if (registration.waiting) {
                console.log('Activating waiting Service Worker...');
                registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                
                // 监听控制器变化
                navigator.serviceWorker.addEventListener('controllerchange', () => {
                    console.log('Service Worker activated');
                    this.showNotification('应用已更新', 'success');
                });
            }
        }

        showNotification(message, type = 'info') {
            // 简单的通知实现
            const notification = document.createElement('div');
            notification.className = `sw-notification sw-notification-${type}`;
            notification.textContent = message;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 12px 20px;
                border-radius: 6px;
                color: white;
                font-size: 14px;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
                ${this.getNotificationStyles(type)}
            `;

            document.body.appendChild(notification);

            // 显示动画
            requestAnimationFrame(() => {
                notification.style.opacity = '1';
            });

            // 自动隐藏
            setTimeout(() => {
                notification.style.opacity = '0';
                setTimeout(() => {
                    if (notification.parentElement) {
                        notification.remove();
                    }
                }, 300);
            }, 5000);
        }

        getNotificationStyles(type) {
            const styles = {
                success: 'background: #10b981;',
                error: 'background: #ef4444;',
                warning: 'background: #f59e0b;',
                info: 'background: #3b82f6;'
            };
            return styles[type] || styles.info;
        }

        // 手动修复方法
        async manualFix() {
            console.log('Starting manual Service Worker fix...');
            
            try {
                // 1. 注销所有现有的Service Worker
                const registrations = await navigator.serviceWorker.getRegistrations();
                await Promise.all(registrations.map(reg => reg.unregister()));
                console.log('Unregistered all Service Workers');

                // 2. 清除所有缓存
                const cacheNames = await caches.keys();
                await Promise.all(cacheNames.map(name => caches.delete(name)));
                console.log('Cleared all caches');

                // 3. 重新注册
                await new Promise(resolve => setTimeout(resolve, 1000));
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('Re-registered Service Worker:', registration.scope);

                this.showNotification('Service Worker 已重置', 'success');
                return true;
            } catch (error) {
                console.error('Manual fix failed:', error);
                this.showNotification('修复失败，请刷新页面重试', 'error');
                return false;
            }
        }

        // 获取诊断信息
        async getDiagnostics() {
            const diagnostics = {
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                url: location.href,
                protocol: location.protocol,
                serviceWorkerSupported: 'serviceWorker' in navigator,
                cacheAPISupported: 'caches' in window,
                issues: this.fixes.map(fix => ({
                    issue: fix.issue,
                    severity: fix.severity
                }))
            };

            try {
                const registration = await navigator.serviceWorker.getRegistration();
                if (registration) {
                    diagnostics.registration = {
                        scope: registration.scope,
                        installing: !!registration.installing,
                        waiting: !!registration.waiting,
                        active: !!registration.active
                    };
                }

                const cacheNames = await caches.keys();
                diagnostics.caches = cacheNames;
            } catch (error) {
                diagnostics.error = error.message;
            }

            return diagnostics;
        }
    }

    // 创建全局实例
    const swFixer = new ServiceWorkerFixer();

    // 导出到全局作用域
    window.SWFixer = {
        manualFix: () => swFixer.manualFix(),
        getDiagnostics: () => swFixer.getDiagnostics(),
        checkIssues: () => swFixer.checkCommonIssues()
    };

    // 添加到Service Worker注册脚本中的错误处理
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.addEventListener('error', (error) => {
            console.error('Service Worker error:', error);
            swFixer.handleRegistrationError(error);
        });
    }

    console.log('Service Worker Fixer initialized');
})();
