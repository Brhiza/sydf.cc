// 错误处理增强器
(function() {
    'use strict';

    class ErrorHandler {
        constructor() {
            this.errorQueue = [];
            this.maxErrors = 10;
            this.init();
        }

        init() {
            // 监听全局错误
            window.addEventListener('error', (event) => {
                this.handleError({
                    type: 'javascript',
                    message: event.message,
                    filename: event.filename,
                    lineno: event.lineno,
                    colno: event.colno,
                    stack: event.error?.stack,
                    timestamp: new Date().toISOString()
                });
            });

            // 监听Promise拒绝
            window.addEventListener('unhandledrejection', (event) => {
                this.handleError({
                    type: 'promise',
                    message: event.reason?.message || String(event.reason),
                    stack: event.reason?.stack,
                    timestamp: new Date().toISOString()
                });
            });
        }

        handleError(errorInfo) {
            // 添加到错误队列
            this.errorQueue.push(errorInfo);
            
            // 保持队列大小
            if (this.errorQueue.length > this.maxErrors) {
                this.errorQueue.shift();
            }

            // 记录错误
            console.error('Error captured:', errorInfo);

            // 根据错误类型显示用户友好的消息
            this.showUserFriendlyError(errorInfo);
        }

        showUserFriendlyError(errorInfo) {
            let userMessage = '发生了一个错误，请稍后重试';
            
            // 根据错误类型定制消息
            if (errorInfo.message?.includes('fetch')) {
                userMessage = '网络连接出现问题，请检查网络后重试';
            } else if (errorInfo.message?.includes('AI') || errorInfo.message?.includes('api')) {
                userMessage = 'AI服务暂时不可用，请稍后再试';
            } else if (errorInfo.message?.includes('lunar') || errorInfo.message?.includes('iztro')) {
                userMessage = '排盘功能加载失败，请刷新页面重试';
            }

            this.showErrorToast(userMessage);
        }

        showErrorToast(message, duration = 5000) {
            // 移除已存在的错误提示
            const existingToast = document.querySelector('.error-toast');
            if (existingToast) {
                existingToast.remove();
            }

            // 创建错误提示
            const toast = document.createElement('div');
            toast.className = 'error-toast';
            toast.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #ff4444;
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 10001;
                max-width: 300px;
                font-size: 14px;
                line-height: 1.4;
                opacity: 0;
                transform: translateX(100%);
                transition: all 0.3s ease;
            `;
            
            toast.innerHTML = `
                <div style="display: flex; align-items: flex-start; gap: 10px;">
                    <span style="font-size: 16px;">⚠️</span>
                    <div style="flex: 1;">
                        <strong>错误提示</strong><br>
                        ${message}
                    </div>
                    <button onclick="this.parentElement.parentElement.remove()" 
                            style="background: none; border: none; color: white; font-size: 18px; cursor: pointer; padding: 0; margin-left: 10px;">×</button>
                </div>
            `;

            document.body.appendChild(toast);

            // 显示动画
            requestAnimationFrame(() => {
                toast.style.opacity = '1';
                toast.style.transform = 'translateX(0)';
            });

            // 自动隐藏
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.style.opacity = '0';
                    toast.style.transform = 'translateX(100%)';
                    setTimeout(() => toast.remove(), 300);
                }
            }, duration);
        }

        showSuccessToast(message, duration = 3000) {
            // 移除已存在的成功提示
            const existingToast = document.querySelector('.success-toast');
            if (existingToast) {
                existingToast.remove();
            }

            // 创建成功提示
            const toast = document.createElement('div');
            toast.className = 'success-toast';
            toast.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #22c55e;
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 10001;
                max-width: 300px;
                font-size: 14px;
                line-height: 1.4;
                opacity: 0;
                transform: translateX(100%);
                transition: all 0.3s ease;
            `;
            
            toast.innerHTML = `
                <div style="display: flex; align-items: flex-start; gap: 10px;">
                    <span style="font-size: 16px;">✅</span>
                    <div style="flex: 1;">
                        ${message}
                    </div>
                    <button onclick="this.parentElement.parentElement.remove()" 
                            style="background: none; border: none; color: white; font-size: 18px; cursor: pointer; padding: 0; margin-left: 10px;">×</button>
                </div>
            `;

            document.body.appendChild(toast);

            // 显示动画
            requestAnimationFrame(() => {
                toast.style.opacity = '1';
                toast.style.transform = 'translateX(0)';
            });

            // 自动隐藏
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.style.opacity = '0';
                    toast.style.transform = 'translateX(100%)';
                    setTimeout(() => toast.remove(), 300);
                }
            }, duration);
        }

        // 手动报告错误
        reportError(error, context = '') {
            const errorInfo = {
                type: 'manual',
                message: error.message || String(error),
                stack: error.stack,
                context: context,
                timestamp: new Date().toISOString()
            };
            
            this.handleError(errorInfo);
        }

        // 获取错误历史
        getErrorHistory() {
            return [...this.errorQueue];
        }

        // 清除错误历史
        clearErrorHistory() {
            this.errorQueue = [];
        }

        // 检查是否有重复错误
        hasDuplicateErrors(timeWindow = 60000) {
            const now = Date.now();
            const recentErrors = this.errorQueue.filter(error => {
                const errorTime = new Date(error.timestamp).getTime();
                return now - errorTime < timeWindow;
            });

            const errorMessages = recentErrors.map(error => error.message);
            const uniqueMessages = new Set(errorMessages);
            
            return errorMessages.length > uniqueMessages.size;
        }
    }

    // 创建全局实例
    const errorHandler = new ErrorHandler();

    // 导出到全局作用域
    window.ErrorHandler = {
        report: (error, context) => errorHandler.reportError(error, context),
        showError: (message, duration) => errorHandler.showErrorToast(message, duration),
        showSuccess: (message, duration) => errorHandler.showSuccessToast(message, duration),
        getHistory: () => errorHandler.getErrorHistory(),
        clearHistory: () => errorHandler.clearErrorHistory(),
        hasDuplicates: (timeWindow) => errorHandler.hasDuplicateErrors(timeWindow)
    };

    console.log('Error Handler initialized');
})();
