/// <reference lib="webworker" />

import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate, NetworkFirst } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'

// 禁用Workbox调试日志
import { setCacheNameDetails } from 'workbox-core'
setCacheNameDetails({
  prefix: 'sydf-app',
  suffix: 'v1',
  precache: 'precache',
  runtime: 'runtime'
})

// 设置Workbox日志级别为error，只显示错误信息
// @ts-expect-error: self.workbox is not defined in the default scope
if (typeof self !== 'undefined' && self.workbox) {
  // @ts-expect-error: self.workbox is not defined in the default scope
  self.workbox.setConfig({
    debug: false
  })
}

declare const self: ServiceWorkerGlobalScope

self.addEventListener('message', (event: ExtendableMessageEvent) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
  
  // 处理主题切换消息
  if (event.data && event.data.type === 'THEME_CHANGE') {
    const theme = event.data.theme
    // 可以在这里缓存主题设置
    if (theme === 'dark' || theme === 'light') {
      // 将主题设置存储在Service Worker的缓存中
      caches.open('theme-cache').then(cache => {
        return cache.put('/theme-setting', new Response(JSON.stringify({ theme }), {
          headers: { 'Content-Type': 'application/json' }
        }))
      })
    }
  }
})

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST || [])

// clean old assets
cleanupOutdatedCaches()

// 运行时缓存图片 - 更积极的缓存策略
registerRoute(
  ({ request }) => request.destination === 'image',
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      // @ts-expect-error: ExpirationPlugin has a type compatibility issue with Workbox
      new ExpirationPlugin({ 
        maxEntries: 100,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7天
      }),
      // 确保图片在后台更新
      {
        cacheKeyWillBeUsed: async ({ request }) => {
          return request.url;
        },
        cachedResponseWillBeUsed: async ({ cacheName, request, cachedResponse }) => {
          // 如果有缓存的响应，在后台更新
          if (cachedResponse) {
            fetch(request).then(response => {
              if (response.ok) {
                caches.open(cacheName).then(cache => {
                  cache.put(request, response.clone());
                });
              }
            }).catch(() => {
              // 忽略网络错误
            });
          }
          return cachedResponse;
        }
      }
    ],
  })
)

// 缓存 CSS 和 JS 文件
registerRoute(
  ({ request }) => request.destination === 'script' || request.destination === 'style',
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
    plugins: [
      // @ts-expect-error: ExpirationPlugin has a type compatibility issue with Workbox
      new ExpirationPlugin({ 
        maxEntries: 100,
        maxAgeSeconds: 24 * 60 * 60, // 1天
      }),
    ],
  })
)

// 缓存 HTML 文档 - 使用 NetworkFirst 策略确保获取最新内容
registerRoute(
  ({ request }) => request.destination === 'document',
  new NetworkFirst({
    cacheName: 'html-cache',
    plugins: [
      // @ts-expect-error: ExpirationPlugin has a type compatibility issue with Workbox
      new ExpirationPlugin({ 
        maxEntries: 50,
        maxAgeSeconds: 60 * 60, // 1小时
      }),
    ],
  })
)
