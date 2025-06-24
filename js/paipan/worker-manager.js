// Web Workers 管理器
(function() {
    'use strict';

    class WorkerManager {
        constructor() {
            this.workers = new Map();
            this.taskQueue = [];
            this.activeTasks = new Map();
            this.maxWorkers = navigator.hardwareConcurrency || 4;
            this.workerPool = [];
            this.init();
        }

        init() {
            // 检查Web Workers支持
            if (!window.Worker) {
                console.warn('Web Workers not supported, falling back to main thread');
                this.fallbackMode = true;
                return;
            }

            // 预创建Worker池
            this.createWorkerPool();
        }

        createWorkerPool() {
            const workerScript = 'js/paipan/calculation-worker.js';
            
            for (let i = 0; i < Math.min(this.maxWorkers, 2); i++) {
                try {
                    const worker = new Worker(workerScript);
                    worker.id = `worker_${i}`;
                    worker.busy = false;
                    
                    worker.addEventListener('message', (e) => {
                        this.handleWorkerMessage(worker, e);
                    });
                    
                    worker.addEventListener('error', (e) => {
                        this.handleWorkerError(worker, e);
                    });
                    
                    this.workerPool.push(worker);
                    console.log(`Worker ${worker.id} created`);
                } catch (error) {
                    console.warn('Failed to create worker:', error);
                    this.fallbackMode = true;
                    break;
                }
            }
        }

        // 执行计算任务
        async calculate(type, data, options = {}) {
            const taskId = this.generateTaskId();
            const { timeout = 30000, priority = 'normal' } = options;

            return new Promise((resolve, reject) => {
                const task = {
                    id: taskId,
                    type,
                    data,
                    resolve,
                    reject,
                    timeout,
                    priority,
                    startTime: Date.now(),
                    retryCount: 0,
                    maxRetries: 2
                };

                // 如果不支持Web Workers，使用主线程
                if (this.fallbackMode) {
                    this.executeOnMainThread(task);
                    return;
                }

                // 添加到任务队列
                this.addToQueue(task);
                
                // 尝试立即执行
                this.processQueue();
                
                // 设置超时
                setTimeout(() => {
                    if (this.activeTasks.has(taskId)) {
                        this.cancelTask(taskId, 'timeout');
                    }
                }, timeout);
            });
        }

        addToQueue(task) {
            // 根据优先级插入队列
            if (task.priority === 'high') {
                this.taskQueue.unshift(task);
            } else {
                this.taskQueue.push(task);
            }
        }

        processQueue() {
            if (this.taskQueue.length === 0) return;

            // 找到空闲的Worker
            const availableWorker = this.workerPool.find(worker => !worker.busy);
            if (!availableWorker) return;

            const task = this.taskQueue.shift();
            this.executeTask(availableWorker, task);
        }

        executeTask(worker, task) {
            worker.busy = true;
            this.activeTasks.set(task.id, { worker, task });

            console.log(`Executing task ${task.id} on ${worker.id}`);

            worker.postMessage({
                type: task.type,
                data: task.data,
                taskId: task.id
            });
        }

        handleWorkerMessage(worker, event) {
            const { success, taskId, result, error } = event.data;
            const activeTask = this.activeTasks.get(taskId);
            
            if (!activeTask) {
                console.warn(`Received message for unknown task: ${taskId}`);
                return;
            }

            const { task } = activeTask;
            
            // 释放Worker
            worker.busy = false;
            this.activeTasks.delete(taskId);

            if (success) {
                const executionTime = Date.now() - task.startTime;
                console.log(`Task ${taskId} completed in ${executionTime}ms`);
                
                // 添加性能统计
                result.performanceStats = {
                    executionTime,
                    workerUsed: true,
                    workerId: worker.id
                };
                
                task.resolve(result);
            } else {
                console.error(`Task ${taskId} failed:`, error);
                
                // 重试逻辑
                if (task.retryCount < task.maxRetries) {
                    task.retryCount++;
                    console.log(`Retrying task ${taskId} (attempt ${task.retryCount})`);
                    this.addToQueue(task);
                    this.processQueue();
                } else {
                    task.reject(new Error(error.message));
                }
            }

            // 处理队列中的下一个任务
            this.processQueue();
        }

        handleWorkerError(worker, error) {
            console.error(`Worker ${worker.id} error:`, error);
            
            // 找到使用此Worker的任务
            for (const [taskId, { worker: taskWorker, task }] of this.activeTasks) {
                if (taskWorker === worker) {
                    this.activeTasks.delete(taskId);
                    
                    // 重试或失败
                    if (task.retryCount < task.maxRetries) {
                        task.retryCount++;
                        this.addToQueue(task);
                    } else {
                        task.reject(new Error('Worker execution failed'));
                    }
                }
            }
            
            // 重新创建Worker
            this.recreateWorker(worker);
        }

        recreateWorker(failedWorker) {
            const index = this.workerPool.indexOf(failedWorker);
            if (index === -1) return;

            try {
                failedWorker.terminate();
                
                const newWorker = new Worker('js/paipan/calculation-worker.js');
                newWorker.id = failedWorker.id;
                newWorker.busy = false;
                
                newWorker.addEventListener('message', (e) => {
                    this.handleWorkerMessage(newWorker, e);
                });
                
                newWorker.addEventListener('error', (e) => {
                    this.handleWorkerError(newWorker, e);
                });
                
                this.workerPool[index] = newWorker;
                console.log(`Worker ${newWorker.id} recreated`);
                
                // 处理队列
                this.processQueue();
            } catch (error) {
                console.error('Failed to recreate worker:', error);
                this.workerPool.splice(index, 1);
            }
        }

        // 主线程回退执行
        async executeOnMainThread(task) {
            try {
                console.log(`Executing task ${task.id} on main thread`);
                
                // 使用setTimeout让出控制权，避免阻塞UI
                await new Promise(resolve => setTimeout(resolve, 0));
                
                let result;
                const startTime = Date.now();
                
                // 这里需要实现主线程的计算逻辑
                switch (task.type) {
                    case 'bazi_calculation':
                        result = await this.calculateBaziMainThread(task.data);
                        break;
                    case 'ziwei_calculation':
                        result = await this.calculateZiweiMainThread(task.data);
                        break;
                    default:
                        throw new Error(`Unsupported calculation type: ${task.type}`);
                }
                
                result.performanceStats = {
                    executionTime: Date.now() - startTime,
                    workerUsed: false,
                    mainThread: true
                };
                
                task.resolve(result);
            } catch (error) {
                task.reject(error);
            }
        }

        // 主线程计算方法（简化版）
        async calculateBaziMainThread(data) {
            // 分块执行，避免阻塞
            const chunks = this.splitCalculation(data);
            const results = [];
            
            for (const chunk of chunks) {
                await new Promise(resolve => setTimeout(resolve, 0));
                results.push(this.processChunk(chunk));
            }
            
            return this.combineResults(results);
        }

        async calculateZiweiMainThread(data) {
            // 类似的分块处理
            return { message: 'Ziwei calculation completed on main thread' };
        }

        splitCalculation(data) {
            // 将计算分解为小块
            return [data]; // 简化实现
        }

        processChunk(chunk) {
            // 处理单个计算块
            return chunk;
        }

        combineResults(results) {
            // 合并结果
            return { combined: results };
        }

        cancelTask(taskId, reason = 'cancelled') {
            const activeTask = this.activeTasks.get(taskId);
            if (activeTask) {
                const { worker, task } = activeTask;
                worker.busy = false;
                this.activeTasks.delete(taskId);
                task.reject(new Error(`Task cancelled: ${reason}`));
                console.log(`Task ${taskId} cancelled: ${reason}`);
            }
        }

        generateTaskId() {
            return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        }

        // 获取统计信息
        getStats() {
            return {
                workerCount: this.workerPool.length,
                activeTaskCount: this.activeTasks.size,
                queueLength: this.taskQueue.length,
                fallbackMode: this.fallbackMode,
                workers: this.workerPool.map(w => ({
                    id: w.id,
                    busy: w.busy
                }))
            };
        }

        // 清理资源
        destroy() {
            // 取消所有活动任务
            for (const [taskId] of this.activeTasks) {
                this.cancelTask(taskId, 'manager_destroyed');
            }
            
            // 终止所有Workers
            this.workerPool.forEach(worker => {
                worker.terminate();
            });
            
            this.workerPool = [];
            this.taskQueue = [];
            this.activeTasks.clear();
        }
    }

    // 创建全局实例
    const workerManager = new WorkerManager();

    // 导出到全局作用域
    window.WorkerManager = {
        calculate: (type, data, options) => workerManager.calculate(type, data, options),
        getStats: () => workerManager.getStats(),
        destroy: () => workerManager.destroy()
    };

    // 页面卸载时清理
    window.addEventListener('beforeunload', () => {
        workerManager.destroy();
    });

    console.log('Worker Manager initialized');
})();
