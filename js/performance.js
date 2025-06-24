// 性能监控和分析
(function() {
    'use strict';

    // 页面加载性能监控
    function measurePagePerformance() {
        if ('performance' in window && 'getEntriesByType' in performance) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const navigation = performance.getEntriesByType('navigation')[0];
                    const paint = performance.getEntriesByType('paint');
                    
                    const metrics = {
                        // 页面加载时间
                        loadTime: Math.round(navigation.loadEventEnd - navigation.fetchStart),
                        // DOM解析时间
                        domParseTime: Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart),
                        // 首次内容绘制
                        fcp: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
                        // 最大内容绘制
                        lcp: 0,
                        // 累积布局偏移
                        cls: 0,
                        // 首次输入延迟
                        fid: 0
                    };

                    // 测量LCP
                    if ('PerformanceObserver' in window) {
                        try {
                            const lcpObserver = new PerformanceObserver((list) => {
                                const entries = list.getEntries();
                                const lastEntry = entries[entries.length - 1];
                                metrics.lcp = Math.round(lastEntry.startTime);
                            });
                            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

                            // 测量CLS
                            const clsObserver = new PerformanceObserver((list) => {
                                let clsValue = 0;
                                for (const entry of list.getEntries()) {
                                    if (!entry.hadRecentInput) {
                                        clsValue += entry.value;
                                    }
                                }
                                metrics.cls = Math.round(clsValue * 1000) / 1000;
                            });
                            clsObserver.observe({ entryTypes: ['layout-shift'] });

                            // 测量FID
                            const fidObserver = new PerformanceObserver((list) => {
                                for (const entry of list.getEntries()) {
                                    metrics.fid = Math.round(entry.processingStart - entry.startTime);
                                    break;
                                }
                            });
                            fidObserver.observe({ entryTypes: ['first-input'] });
                        } catch (e) {
                            console.debug('Performance Observer not fully supported:', e);
                        }
                    }

                    // 延迟记录性能数据，确保所有指标都被收集
                    setTimeout(() => {
                        console.log('页面性能指标:', metrics);
                        
                        // 可以在这里发送性能数据到分析服务
                        // sendPerformanceData(metrics);
                    }, 3000);
                }, 0);
            });
        }
    }

    // 错误监控
    function setupErrorTracking() {
        window.addEventListener('error', (event) => {
            const errorInfo = {
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                stack: event.error?.stack,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                url: window.location.href
            };
            
            console.error('JavaScript错误:', errorInfo);
            // 可以在这里发送错误信息到监控服务
            // sendErrorData(errorInfo);
        });

        window.addEventListener('unhandledrejection', (event) => {
            const errorInfo = {
                type: 'unhandledrejection',
                reason: event.reason,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                url: window.location.href
            };
            
            console.error('未处理的Promise拒绝:', errorInfo);
            // sendErrorData(errorInfo);
        });
    }

    // 用户行为分析
    function setupUserAnalytics() {
        let sessionStart = Date.now();
        let pageViews = 0;
        let interactions = 0;

        // 页面访问统计
        function trackPageView() {
            pageViews++;
            const pageData = {
                url: window.location.href,
                title: document.title,
                timestamp: new Date().toISOString(),
                referrer: document.referrer,
                userAgent: navigator.userAgent
            };
            
            console.log('页面访问:', pageData);
            // sendAnalyticsData('pageview', pageData);
        }

        // 用户交互统计
        function trackInteraction(event) {
            interactions++;
            const interactionData = {
                type: event.type,
                target: event.target.tagName,
                timestamp: new Date().toISOString()
            };
            
            // 只记录重要的交互事件
            if (['click', 'submit', 'change'].includes(event.type)) {
                console.log('用户交互:', interactionData);
                // sendAnalyticsData('interaction', interactionData);
            }
        }

        // 会话结束统计
        function trackSessionEnd() {
            const sessionData = {
                duration: Date.now() - sessionStart,
                pageViews: pageViews,
                interactions: interactions,
                timestamp: new Date().toISOString()
            };
            
            console.log('会话结束:', sessionData);
            // sendAnalyticsData('session_end', sessionData);
        }

        // 绑定事件
        trackPageView();
        document.addEventListener('click', trackInteraction);
        document.addEventListener('submit', trackInteraction);
        document.addEventListener('change', trackInteraction);
        window.addEventListener('beforeunload', trackSessionEnd);
    }

    // 资源加载监控
    function monitorResourceLoading() {
        if ('PerformanceObserver' in window) {
            try {
                const resourceObserver = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        // 监控加载时间过长的资源
                        if (entry.duration > 3000) {
                            console.warn('资源加载缓慢:', {
                                name: entry.name,
                                duration: Math.round(entry.duration),
                                size: entry.transferSize
                            });
                        }
                    }
                });
                resourceObserver.observe({ entryTypes: ['resource'] });
            } catch (e) {
                console.debug('Resource monitoring not supported:', e);
            }
        }
    }

    // 初始化所有监控
    function init() {
        measurePagePerformance();
        setupErrorTracking();
        setupUserAnalytics();
        monitorResourceLoading();
    }

    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
