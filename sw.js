// Service Worker for 时月东方 - Cloudflare Pages优化版
const CACHE_NAME = 'sydf-v1.1.0';
const STATIC_CACHE_URLS = [
    '/',
    '/index.html',
    '/ly.html',
    '/mh.html',
    '/qm.html',
    '/dp.html',
    '/sp.html',
    '/ssgw.html',
    '/history.html',
    '/about.html',
    '/rengong.html',
    '/css/qigua.css',
    '/css/paipan.css',
    '/js/ai.js',
    '/js/qigua/main.js',
    '/js/performance.js',
    '/static/favicon.ico',
    '/static/favicon.png',
    '/static/apple-touch-icon.png',
    '/static/ping.png',
    '/static/tu.png'
];

// 预缓存的塔罗牌图片（只缓存前20张，其他按需加载）
const PRIORITY_IMAGES = [
    '/static/mx/1.jpg', '/static/mx/2.jpg', '/static/mx/3.jpg', '/static/mx/4.jpg', '/static/mx/5.jpg',
    '/static/mx/6.jpg', '/static/mx/7.jpg', '/static/mx/8.jpg', '/static/mx/9.jpg', '/static/mx/10.jpg',
    '/static/mx/11.jpg', '/static/mx/12.jpg', '/static/mx/13.jpg', '/static/mx/14.jpg', '/static/mx/15.jpg',
    '/static/mx/16.jpg', '/static/mx/17.jpg', '/static/mx/18.jpg', '/static/mx/19.jpg', '/static/mx/20.jpg'
];

// 安装事件 - 优化版
self.addEventListener('install', event => {
    event.waitUntil(
        Promise.all([
            // 缓存核心静态资源
            caches.open(CACHE_NAME).then(cache => {
                console.log('Service Worker: 缓存核心资源');
                return cache.addAll(STATIC_CACHE_URLS);
            }),
            // 预缓存优先图片（可选，失败不影响主要功能）
            caches.open(CACHE_NAME + '-images').then(async cache => {
                console.log('Service Worker: 预缓存优先图片');
                try {
                    // 逐个缓存图片，避免因单个图片失败导致全部失败
                    const cachePromises = PRIORITY_IMAGES.map(async (imageUrl) => {
                        try {
                            const response = await fetch(imageUrl);
                            if (response.ok) {
                                await cache.put(imageUrl, response);
                                return true;
                            }
                        } catch (error) {
                            console.warn(`Failed to cache image: ${imageUrl}`, error);
                        }
                        return false;
                    });

                    const results = await Promise.allSettled(cachePromises);
                    const successCount = results.filter(r => r.status === 'fulfilled' && r.value).length;
                    console.log(`Successfully cached ${successCount}/${PRIORITY_IMAGES.length} priority images`);
                } catch (error) {
                    console.warn('Priority images caching failed:', error);
                }
                return Promise.resolve();
            }).catch(error => {
                console.warn('Images cache initialization failed:', error);
                return Promise.resolve();
            })
        ]).then(() => {
            console.log('Service Worker: 安装完成');
            return self.skipWaiting();
        }).catch(error => {
            console.error('Service Worker: 安装失败', error);
            // 即使部分资源失败，也继续安装
            return self.skipWaiting();
        })
    );
});

// 激活事件
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // 保留当前版本的缓存和图片缓存
                    if (cacheName !== CACHE_NAME && cacheName !== CACHE_NAME + '-images') {
                        console.log('Service Worker: 删除旧缓存', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('Service Worker: 激活完成');
            return self.clients.claim();
        })
    );
});

// 拦截请求
self.addEventListener('fetch', event => {
    // 只处理GET请求
    if (event.request.method !== 'GET') {
        return;
    }

    // 对于AI API请求，直接通过网络
    if (event.request.url.includes('flow.ovo.gs')) {
        return;
    }

    // 对于CDN资源，使用网络优先策略，但在Cloudflare Pages上优化
    if (event.request.url.includes('cdn.jsdelivr.net') || event.request.url.includes('cdnjs.cloudflare.com')) {
        event.respondWith(
            fetch(event.request, {
                // 在Cloudflare Pages上优化请求
                cache: 'default'
            }).catch(() => {
                console.log('CDN资源加载失败，尝试使用缓存');
                return caches.match(event.request);
            })
        );
        return;
    }

    // 对于塔罗牌图片，使用缓存优先策略
    if (event.request.url.includes('/static/mx/')) {
        event.respondWith(
            caches.match(event.request).then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request).then(response => {
                    if (response.ok) {
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME + '-images').then(cache => {
                            cache.put(event.request, responseToCache);
                        });
                    }
                    return response;
                });
            })
        );
        return;
    }

    // 对于本地资源，使用缓存优先策略
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request)
                    .then(response => {
                        // 检查是否是有效响应
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // 克隆响应
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    });
            })
            .catch(() => {
                // 如果是HTML页面请求失败，返回离线页面
                if (event.request.headers.get('accept').includes('text/html')) {
                    return new Response(`
                        <!DOCTYPE html>
                        <html lang="zh-CN">
                        <head>
                            <meta charset="UTF-8">
                            <title>离线模式 - 时月东方</title>
                            <style>
                                body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                                .offline-message { color: #666; }
                            </style>
                        </head>
                        <body>
                            <h1>时月东方</h1>
                            <div class="offline-message">
                                <p>您当前处于离线状态</p>
                                <p>请检查网络连接后刷新页面</p>
                            </div>
                        </body>
                        </html>
                    `, {
                        headers: { 'Content-Type': 'text/html' }
                    });
                }
            })
    );
});
