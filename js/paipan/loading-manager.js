// 加载状态管理器
(function() {
    'use strict';

    class LoadingManager {
        constructor() {
            this.loadingOverlay = null;
            this.loadingStates = new Map();
            this.init();
        }

        init() {
            // 创建加载遮罩层
            this.createLoadingOverlay();
            
            // 监听页面卸载事件，清理加载状态
            window.addEventListener('beforeunload', () => {
                this.hideLoading();
            });
        }

        createLoadingOverlay() {
            this.loadingOverlay = document.createElement('div');
            this.loadingOverlay.className = 'loading-overlay';
            this.loadingOverlay.style.display = 'none';
            
            const spinner = document.createElement('div');
            spinner.className = 'loading-spinner';
            
            const spinnerIcon = document.createElement('div');
            spinnerIcon.className = 'spinner';
            
            const loadingText = document.createElement('p');
            loadingText.className = 'loading-text';
            loadingText.textContent = '正在处理中...';
            
            spinner.appendChild(spinnerIcon);
            spinner.appendChild(loadingText);
            this.loadingOverlay.appendChild(spinner);
            
            document.body.appendChild(this.loadingOverlay);
        }

        showLoading(message = '正在处理中...', taskId = 'default') {
            if (!this.loadingOverlay) {
                this.createLoadingOverlay();
            }

            // 记录加载状态
            this.loadingStates.set(taskId, {
                message,
                startTime: Date.now()
            });

            // 更新显示文本
            const loadingText = this.loadingOverlay.querySelector('.loading-text');
            if (loadingText) {
                loadingText.textContent = message;
            }

            // 显示加载遮罩
            this.loadingOverlay.style.display = 'flex';
            
            // 防止页面滚动
            document.body.style.overflow = 'hidden';

            // 添加淡入效果
            requestAnimationFrame(() => {
                this.loadingOverlay.style.opacity = '1';
            });

            console.log(`Loading started: ${taskId} - ${message}`);
        }

        hideLoading(taskId = 'default') {
            if (!this.loadingOverlay) return;

            // 移除加载状态
            const loadingState = this.loadingStates.get(taskId);
            if (loadingState) {
                const duration = Date.now() - loadingState.startTime;
                console.log(`Loading completed: ${taskId} - Duration: ${duration}ms`);
                this.loadingStates.delete(taskId);
            }

            // 如果还有其他加载任务，不隐藏遮罩
            if (this.loadingStates.size > 0) {
                return;
            }

            // 添加淡出效果
            this.loadingOverlay.style.opacity = '0';
            
            setTimeout(() => {
                this.loadingOverlay.style.display = 'none';
                // 恢复页面滚动
                document.body.style.overflow = '';
            }, 300);
        }

        updateLoadingMessage(message, taskId = 'default') {
            if (!this.loadingOverlay || this.loadingOverlay.style.display === 'none') {
                return;
            }

            const loadingText = this.loadingOverlay.querySelector('.loading-text');
            if (loadingText) {
                loadingText.textContent = message;
            }

            // 更新状态记录
            const loadingState = this.loadingStates.get(taskId);
            if (loadingState) {
                loadingState.message = message;
            }
        }

        isLoading(taskId = 'default') {
            return this.loadingStates.has(taskId);
        }

        getAllLoadingTasks() {
            return Array.from(this.loadingStates.keys());
        }

        clearAllLoading() {
            this.loadingStates.clear();
            this.hideLoading();
        }
    }

    // 创建全局实例
    const loadingManager = new LoadingManager();

    // 导出到全局作用域
    window.LoadingManager = {
        show: (message, taskId) => loadingManager.showLoading(message, taskId),
        hide: (taskId) => loadingManager.hideLoading(taskId),
        update: (message, taskId) => loadingManager.updateLoadingMessage(message, taskId),
        isLoading: (taskId) => loadingManager.isLoading(taskId),
        getAllTasks: () => loadingManager.getAllLoadingTasks(),
        clearAll: () => loadingManager.clearAllLoading()
    };

    // 为了向后兼容，也提供简单的函数
    window.showLoading = (message) => loadingManager.showLoading(message);
    window.hideLoading = () => loadingManager.hideLoading();
})();
