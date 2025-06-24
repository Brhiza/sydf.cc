// CDN备份和依赖管理
(function() {
    'use strict';

    // CDN资源配置
    const CDN_RESOURCES = {
        'lunar': {
            primary: 'https://cdn.jsdelivr.net/gh/6tail/lunar-javascript@master/lunar.js',
            fallback: 'https://cdnjs.cloudflare.com/ajax/libs/lunar-javascript/1.6.12/lunar.min.js',
            check: () => typeof window.Lunar !== 'undefined',
            essential: true
        },
        'marked': {
            primary: 'https://cdn.jsdelivr.net/npm/marked/marked.min.js',
            fallback: 'https://cdnjs.cloudflare.com/ajax/libs/marked/4.3.0/marked.min.js',
            check: () => typeof window.marked !== 'undefined',
            essential: true
        },
        'iztro': {
            primary: 'https://cdn.jsdelivr.net/npm/iztro@latest/dist/iztro.min.js',
            fallback: 'https://unpkg.com/iztro@latest/dist/iztro.min.js',
            check: () => typeof window.iztro !== 'undefined',
            essential: false // 只在特定页面需要
        }
    };

    // 加载脚本的Promise包装器
    function loadScript(src, timeout = 10000) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            const timer = setTimeout(() => {
                script.remove();
                reject(new Error(`Script load timeout: ${src}`));
            }, timeout);

            script.onload = () => {
                clearTimeout(timer);
                resolve();
            };

            script.onerror = () => {
                clearTimeout(timer);
                script.remove();
                reject(new Error(`Script load error: ${src}`));
            };

            script.src = src;
            script.defer = true;
            document.head.appendChild(script);
        });
    }

    // 加载CDN资源并处理备份
    async function loadCDNResource(resourceName) {
        const resource = CDN_RESOURCES[resourceName];
        if (!resource) {
            console.warn(`Unknown CDN resource: ${resourceName}`);
            return false;
        }

        // 如果已经加载，直接返回
        if (resource.check()) {
            return true;
        }

        try {
            // 尝试加载主CDN
            await loadScript(resource.primary, 8000);
            if (resource.check()) {
                console.log(`✓ ${resourceName} loaded from primary CDN`);
                return true;
            }
        } catch (error) {
            console.warn(`Primary CDN failed for ${resourceName}:`, error.message);
        }

        try {
            // 尝试备用CDN
            await loadScript(resource.fallback, 8000);
            if (resource.check()) {
                console.log(`✓ ${resourceName} loaded from fallback CDN`);
                return true;
            }
        } catch (error) {
            console.error(`All CDNs failed for ${resourceName}:`, error.message);
        }

        return false;
    }

    // 批量加载必需的CDN资源
    async function loadEssentialResources() {
        const essentialResources = Object.keys(CDN_RESOURCES).filter(
            name => CDN_RESOURCES[name].essential
        );

        const loadPromises = essentialResources.map(async (resourceName) => {
            const success = await loadCDNResource(resourceName);
            return { resourceName, success };
        });

        const results = await Promise.all(loadPromises);
        const failed = results.filter(r => !r.success);

        if (failed.length > 0) {
            console.error('Failed to load essential resources:', failed.map(r => r.resourceName));
            showResourceError(failed.map(r => r.resourceName));
            return false;
        }

        return true;
    }

    // 显示资源加载错误
    function showResourceError(failedResources) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: #ff4444;
            color: white;
            padding: 10px;
            text-align: center;
            z-index: 10000;
            font-family: Arial, sans-serif;
        `;
        errorDiv.innerHTML = `
            <strong>资源加载失败</strong><br>
            部分功能可能无法正常使用，请检查网络连接或刷新页面重试<br>
            <small>失败的资源: ${failedResources.join(', ')}</small>
        `;

        document.body.insertBefore(errorDiv, document.body.firstChild);

        // 5秒后自动隐藏
        setTimeout(() => {
            errorDiv.style.opacity = '0';
            errorDiv.style.transition = 'opacity 0.5s';
            setTimeout(() => errorDiv.remove(), 500);
        }, 5000);
    }

    // 网络状态监控
    function setupNetworkMonitoring() {
        if ('navigator' in window && 'onLine' in navigator) {
            const updateOnlineStatus = () => {
                if (!navigator.onLine) {
                    console.warn('网络连接断开');
                    showNetworkError();
                } else {
                    console.log('网络连接恢复');
                    hideNetworkError();
                }
            };

            window.addEventListener('online', updateOnlineStatus);
            window.addEventListener('offline', updateOnlineStatus);
        }
    }

    // 显示网络错误提示
    function showNetworkError() {
        let errorDiv = document.getElementById('network-error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.id = 'network-error';
            errorDiv.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #ff9800;
                color: white;
                padding: 15px;
                border-radius: 5px;
                z-index: 10000;
                font-family: Arial, sans-serif;
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            `;
            errorDiv.innerHTML = `
                <strong>网络连接断开</strong><br>
                <small>部分功能可能无法使用</small>
            `;
            document.body.appendChild(errorDiv);
        }
    }

    // 隐藏网络错误提示
    function hideNetworkError() {
        const errorDiv = document.getElementById('network-error');
        if (errorDiv) {
            errorDiv.style.opacity = '0';
            errorDiv.style.transition = 'opacity 0.5s';
            setTimeout(() => errorDiv.remove(), 500);
        }
    }

    // 预加载关键CDN资源
    function preloadCDNResources() {
        Object.values(CDN_RESOURCES).forEach(resource => {
            if (resource.essential) {
                // 创建link标签进行DNS预解析和预连接
                const primaryDomain = new URL(resource.primary).origin;
                const fallbackDomain = new URL(resource.fallback).origin;

                [primaryDomain, fallbackDomain].forEach(domain => {
                    const link = document.createElement('link');
                    link.rel = 'preconnect';
                    link.href = domain;
                    document.head.appendChild(link);
                });
            }
        });
    }

    // 初始化函数
    async function init() {
        console.log('CDN Fallback Manager 初始化');
        
        // 预加载CDN资源
        preloadCDNResources();
        
        // 设置网络监控
        setupNetworkMonitoring();
        
        // 加载必需资源
        const success = await loadEssentialResources();
        
        if (success) {
            console.log('✓ 所有必需的CDN资源加载完成');
            // 触发自定义事件，通知其他脚本资源已就绪
            window.dispatchEvent(new CustomEvent('cdnResourcesReady'));
        }
        
        return success;
    }

    // 导出到全局作用域
    window.CDNFallback = {
        loadResource: loadCDNResource,
        loadEssentialResources,
        init
    };

    // 自动初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
