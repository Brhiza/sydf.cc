// 图片优化和懒加载增强版
(function() {
    'use strict';

    // 图片格式支持检测
    const imageSupport = {
        webp: false,
        avif: false
    };

    // 检测WebP支持
    function checkWebPSupport() {
        return new Promise(resolve => {
            const webP = new Image();
            webP.onload = webP.onerror = () => {
                imageSupport.webp = (webP.height === 2);
                resolve();
            };
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    }

    // 检测AVIF支持
    function checkAVIFSupport() {
        return new Promise(resolve => {
            const avif = new Image();
            avif.onload = avif.onerror = () => {
                imageSupport.avif = (avif.height === 2);
                resolve();
            };
            avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
        });
    }

    // 获取最佳图片格式
    function getBestImageFormat(originalSrc) {
        if (imageSupport.avif && originalSrc.endsWith('.jpg')) {
            return originalSrc.replace('.jpg', '.avif');
        }
        if (imageSupport.webp && originalSrc.endsWith('.jpg')) {
            return originalSrc.replace('.jpg', '.webp');
        }
        return originalSrc;
    }

    // 创建响应式图片源
    function createResponsiveImageSrc(baseSrc, width) {
        // 对于塔罗牌图片，根据屏幕尺寸调整
        if (baseSrc.includes('/static/mx/')) {
            const devicePixelRatio = window.devicePixelRatio || 1;
            const targetWidth = Math.min(width * devicePixelRatio, 800); // 最大800px
            
            // 如果是小屏幕，可以使用较小的图片
            if (targetWidth <= 400) {
                return baseSrc; // 保持原图，因为塔罗牌图片已经优化过
            }
        }
        return baseSrc;
    }

    // 增强的懒加载观察器
    function createEnhancedImageObserver() {
        const options = {
            root: null,
            rootMargin: '50px', // 提前50px开始加载
            threshold: 0.1
        };

        return new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    loadImage(img, observer);
                }
            });
        }, options);
    }

    // 加载图片的函数
    function loadImage(img, observer) {
        const originalSrc = img.dataset.src || img.src;
        const containerWidth = img.parentElement ? img.parentElement.offsetWidth : 300;
        
        // 获取最佳格式和尺寸的图片
        const optimizedSrc = getBestImageFormat(createResponsiveImageSrc(originalSrc, containerWidth));
        
        // 创建新的Image对象进行预加载
        const imageLoader = new Image();
        
        imageLoader.onload = () => {
            // 添加淡入效果
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease-in-out';
            
            img.src = optimizedSrc;
            img.removeAttribute('data-src');
            
            // 淡入效果
            requestAnimationFrame(() => {
                img.style.opacity = '1';
            });
            
            observer.unobserve(img);
        };
        
        imageLoader.onerror = () => {
            // 如果优化格式加载失败，回退到原始格式
            if (optimizedSrc !== originalSrc) {
                img.src = originalSrc;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            } else {
                console.warn('图片加载失败:', originalSrc);
                // 显示占位符或错误图片
                img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuWbvueJh+WKoOi9veWksei0pTwvdGV4dD48L3N2Zz4=';
                observer.unobserve(img);
            }
        };
        
        imageLoader.src = optimizedSrc;
    }

    // 预加载关键图片
    function preloadCriticalImages() {
        const criticalImages = document.querySelectorAll('img[data-critical="true"]');
        criticalImages.forEach(img => {
            if (img.dataset.src) {
                const optimizedSrc = getBestImageFormat(img.dataset.src);
                const preloader = new Image();
                preloader.onload = () => {
                    img.src = optimizedSrc;
                    img.removeAttribute('data-src');
                };
                preloader.src = optimizedSrc;
            }
        });
    }

    // 图片错误处理
    function setupImageErrorHandling() {
        document.addEventListener('error', (e) => {
            if (e.target.tagName === 'IMG') {
                const img = e.target;
                if (!img.dataset.errorHandled) {
                    img.dataset.errorHandled = 'true';
                    
                    // 尝试重新加载一次
                    setTimeout(() => {
                        const originalSrc = img.src;
                        img.src = '';
                        img.src = originalSrc;
                    }, 1000);
                }
            }
        }, true);
    }

    // 初始化函数
    async function init() {
        // 检测图片格式支持
        await Promise.all([
            checkWebPSupport(),
            checkAVIFSupport()
        ]);

        console.log('图片格式支持:', imageSupport);

        // 设置错误处理
        setupImageErrorHandling();

        // 预加载关键图片
        preloadCriticalImages();

        // 设置懒加载
        if ('IntersectionObserver' in window) {
            const imageObserver = createEnhancedImageObserver();
            
            // 观察所有需要懒加载的图片
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });

            // 监听动态添加的图片
            const mutationObserver = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) {
                            const images = node.querySelectorAll ? node.querySelectorAll('img[data-src]') : [];
                            images.forEach(img => imageObserver.observe(img));
                            
                            if (node.tagName === 'IMG' && node.dataset.src) {
                                imageObserver.observe(node);
                            }
                        }
                    });
                });
            });

            mutationObserver.observe(document.body, {
                childList: true,
                subtree: true
            });
        } else {
            // 降级处理：直接加载所有图片
            document.querySelectorAll('img[data-src]').forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }

    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // 导出到全局作用域供其他脚本使用
    window.ImageOptimizer = {
        getBestImageFormat,
        createResponsiveImageSrc,
        imageSupport
    };
})();
