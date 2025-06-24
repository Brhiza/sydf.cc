// 性能测试和诊断工具
(function() {
    'use strict';

    // 性能测试配置
    const PERFORMANCE_CONFIG = {
        // Core Web Vitals 阈值
        thresholds: {
            LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint
            FID: { good: 100, poor: 300 },   // First Input Delay
            CLS: { good: 0.1, poor: 0.25 },  // Cumulative Layout Shift
            FCP: { good: 1800, poor: 3000 }, // First Contentful Paint
            TTFB: { good: 800, poor: 1800 }  // Time to First Byte
        },
        // 测试持续时间
        testDuration: 10000, // 10秒
        // 是否在控制台显示详细信息
        verbose: false
    };

    // 性能指标收集器
    class PerformanceCollector {
        constructor() {
            this.metrics = {};
            this.observers = [];
            this.startTime = performance.now();
        }

        // 收集导航时间指标
        collectNavigationMetrics() {
            if (!('getEntriesByType' in performance)) return;

            const navigation = performance.getEntriesByType('navigation')[0];
            if (!navigation) return;

            this.metrics.navigation = {
                // DNS查询时间
                dnsLookup: Math.round(navigation.domainLookupEnd - navigation.domainLookupStart),
                // TCP连接时间
                tcpConnect: Math.round(navigation.connectEnd - navigation.connectStart),
                // SSL握手时间
                sslHandshake: navigation.secureConnectionStart > 0 ? 
                    Math.round(navigation.connectEnd - navigation.secureConnectionStart) : 0,
                // 请求响应时间
                requestResponse: Math.round(navigation.responseEnd - navigation.requestStart),
                // DOM解析时间
                domParse: Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart),
                // 页面加载完成时间
                loadComplete: Math.round(navigation.loadEventEnd - navigation.fetchStart),
                // Time to First Byte
                ttfb: Math.round(navigation.responseStart - navigation.fetchStart)
            };
        }

        // 收集Paint指标
        collectPaintMetrics() {
            if (!('getEntriesByType' in performance)) return;

            const paintEntries = performance.getEntriesByType('paint');
            this.metrics.paint = {};

            paintEntries.forEach(entry => {
                this.metrics.paint[entry.name.replace('-', '_')] = Math.round(entry.startTime);
            });
        }

        // 设置Core Web Vitals观察器
        setupCoreWebVitalsObservers() {
            if (!('PerformanceObserver' in window)) return;

            try {
                // LCP观察器
                const lcpObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    this.metrics.lcp = Math.round(lastEntry.startTime);
                });
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
                this.observers.push(lcpObserver);

                // FID观察器
                const fidObserver = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        this.metrics.fid = Math.round(entry.processingStart - entry.startTime);
                        break; // 只记录第一次输入
                    }
                });
                fidObserver.observe({ entryTypes: ['first-input'] });
                this.observers.push(fidObserver);

                // CLS观察器
                let clsValue = 0;
                const clsObserver = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (!entry.hadRecentInput) {
                            clsValue += entry.value;
                        }
                    }
                    this.metrics.cls = Math.round(clsValue * 1000) / 1000;
                });
                clsObserver.observe({ entryTypes: ['layout-shift'] });
                this.observers.push(clsObserver);

            } catch (error) {
                console.warn('Performance Observer setup failed:', error);
            }
        }

        // 收集资源加载指标
        collectResourceMetrics() {
            if (!('getEntriesByType' in performance)) return;

            const resources = performance.getEntriesByType('resource');
            const resourceMetrics = {
                total: resources.length,
                byType: {},
                slowResources: [],
                failedResources: []
            };

            resources.forEach(resource => {
                const type = this.getResourceType(resource.name);
                if (!resourceMetrics.byType[type]) {
                    resourceMetrics.byType[type] = { count: 0, totalSize: 0, totalTime: 0 };
                }

                resourceMetrics.byType[type].count++;
                resourceMetrics.byType[type].totalSize += resource.transferSize || 0;
                resourceMetrics.byType[type].totalTime += resource.duration;

                // 记录加载缓慢的资源（>3秒）
                if (resource.duration > 3000) {
                    resourceMetrics.slowResources.push({
                        name: resource.name,
                        duration: Math.round(resource.duration),
                        size: resource.transferSize
                    });
                }
            });

            this.metrics.resources = resourceMetrics;
        }

        // 获取资源类型
        getResourceType(url) {
            if (url.includes('.css')) return 'css';
            if (url.includes('.js')) return 'javascript';
            if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) return 'image';
            if (url.match(/\.(woff|woff2|ttf|otf)$/i)) return 'font';
            return 'other';
        }

        // 评估性能等级
        evaluatePerformance() {
            const scores = {};
            const thresholds = PERFORMANCE_CONFIG.thresholds;

            // 评估各项指标
            Object.keys(thresholds).forEach(metric => {
                const value = this.getMetricValue(metric);
                if (value !== null) {
                    if (value <= thresholds[metric].good) {
                        scores[metric] = 'good';
                    } else if (value <= thresholds[metric].poor) {
                        scores[metric] = 'needs-improvement';
                    } else {
                        scores[metric] = 'poor';
                    }
                }
            });

            return scores;
        }

        // 获取指标值
        getMetricValue(metric) {
            switch (metric) {
                case 'LCP': return this.metrics.lcp || null;
                case 'FID': return this.metrics.fid || null;
                case 'CLS': return this.metrics.cls || null;
                case 'FCP': return this.metrics.paint?.first_contentful_paint || null;
                case 'TTFB': return this.metrics.navigation?.ttfb || null;
                default: return null;
            }
        }

        // 生成性能报告
        generateReport() {
            const scores = this.evaluatePerformance();
            const report = {
                timestamp: new Date().toISOString(),
                url: window.location.href,
                userAgent: navigator.userAgent,
                metrics: this.metrics,
                scores: scores,
                recommendations: this.generateRecommendations(scores)
            };

            return report;
        }

        // 生成优化建议
        generateRecommendations(scores) {
            const recommendations = [];

            if (scores.LCP === 'poor') {
                recommendations.push('优化最大内容绘制：压缩图片、使用CDN、优化服务器响应时间');
            }
            if (scores.FID === 'poor') {
                recommendations.push('减少首次输入延迟：优化JavaScript执行、减少主线程阻塞');
            }
            if (scores.CLS === 'poor') {
                recommendations.push('减少累积布局偏移：为图片设置尺寸、避免动态插入内容');
            }
            if (scores.FCP === 'poor') {
                recommendations.push('优化首次内容绘制：减少渲染阻塞资源、优化关键渲染路径');
            }
            if (scores.TTFB === 'poor') {
                recommendations.push('优化首字节时间：优化服务器配置、使用CDN、减少重定向');
            }

            return recommendations;
        }

        // 清理观察器
        cleanup() {
            this.observers.forEach(observer => observer.disconnect());
            this.observers = [];
        }
    }

    // 性能测试管理器
    class PerformanceTestManager {
        constructor() {
            this.collector = new PerformanceCollector();
            this.testStarted = false;
        }

        // 开始性能测试
        startTest() {
            if (this.testStarted) return;
            this.testStarted = true;

            console.log('🚀 性能测试开始...');

            // 立即收集一些指标
            this.collector.collectNavigationMetrics();
            this.collector.collectPaintMetrics();

            // 设置观察器
            this.collector.setupCoreWebVitalsObservers();

            // 定时收集资源指标
            setTimeout(() => {
                this.collector.collectResourceMetrics();
            }, 2000);

            // 测试结束后生成报告
            setTimeout(() => {
                this.finishTest();
            }, PERFORMANCE_CONFIG.testDuration);
        }

        // 结束测试并生成报告
        finishTest() {
            const report = this.collector.generateReport();
            
            if (PERFORMANCE_CONFIG.verbose) {
                console.log('📊 性能测试报告:', report);
            }

            this.displayResults(report);
            this.collector.cleanup();

            // 触发自定义事件
            window.dispatchEvent(new CustomEvent('performanceTestComplete', {
                detail: report
            }));
        }

        // 显示测试结果
        displayResults(report) {
            console.group('📊 性能测试结果');
            
            // 显示Core Web Vitals
            console.log('Core Web Vitals:');
            Object.keys(report.scores).forEach(metric => {
                const value = this.collector.getMetricValue(metric);
                const score = report.scores[metric];
                const emoji = score === 'good' ? '✅' : score === 'needs-improvement' ? '⚠️' : '❌';
                console.log(`  ${emoji} ${metric}: ${value}ms (${score})`);
            });

            // 显示资源统计
            if (report.metrics.resources) {
                console.log('\n资源加载统计:');
                console.log(`  总资源数: ${report.metrics.resources.total}`);
                Object.keys(report.metrics.resources.byType).forEach(type => {
                    const typeData = report.metrics.resources.byType[type];
                    console.log(`  ${type}: ${typeData.count}个, ${Math.round(typeData.totalSize/1024)}KB`);
                });

                if (report.metrics.resources.slowResources.length > 0) {
                    console.warn('⚠️ 加载缓慢的资源:', report.metrics.resources.slowResources);
                }
            }

            // 显示优化建议
            if (report.recommendations.length > 0) {
                console.log('\n💡 优化建议:');
                report.recommendations.forEach(rec => console.log(`  • ${rec}`));
            }

            console.groupEnd();
        }
    }

    // 初始化性能测试
    function initPerformanceTest() {
        // 只在开发环境或明确启用时运行
        const shouldRunTest = 
            window.location.hostname === 'localhost' ||
            window.location.search.includes('perf-test=true') ||
            localStorage.getItem('enablePerfTest') === 'true';

        if (!shouldRunTest) return;

        const testManager = new PerformanceTestManager();
        
        // 页面加载完成后开始测试
        if (document.readyState === 'complete') {
            testManager.startTest();
        } else {
            window.addEventListener('load', () => {
                setTimeout(() => testManager.startTest(), 100);
            });
        }

        // 导出到全局作用域
        window.PerformanceTest = testManager;
    }

    // 自动初始化
    initPerformanceTest();
})();
