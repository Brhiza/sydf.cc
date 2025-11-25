import { defineConfig, PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import compression from 'vite-plugin-compression2'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig((_env) => {
  const plugins: PluginOption[] = [
      vue(),
      VitePWA({
        registerType: 'autoUpdate',
        strategies: 'injectManifest',
        srcDir: 'src',
        filename: 'sw.ts',
        includeAssets: ['favicon.ico', 'static/apple-touch-icon.png', 'masked-icon.svg'],
        manifest: {
          name: '时月东方',
          short_name: '时月东方',
          description: '一个免费的AI占卜站',
          theme_color: '#6b46c1',
          background_color: '#ffffff',
          display: 'standalone',
          display_override: ['standalone', 'minimal-ui'],
          start_url: '/',
          scope: '/',
          id: '/',
          orientation: 'portrait',
          lang: 'zh-CN',
          icons: [
            {
              src: 'static/favicon.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any maskable'
            },
            {
              src: 'static/favicon.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            },
            {
              src: 'static/favicon.png',
              sizes: '48x48',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: 'static/favicon.png',
              sizes: '72x72',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: 'static/favicon.png',
              sizes: '96x96',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: 'static/favicon.png',
              sizes: '128x128',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: 'static/favicon.png',
              sizes: '144x144',
              type: 'image/png',
              purpose: 'any'
            }
          ],
          screenshots: [
            {
              src: '/static/tarot/1.jpg',
              sizes: '540x720',
              type: 'image/jpeg',
              form_factor: 'narrow',
              label: '占卜界面'
            },
            {
              src: '/static/tarot/2.jpg',
              sizes: '540x720',
              type: 'image/jpeg',
              form_factor: 'narrow',
              label: '卡牌选择'
            }
          ],
          related_applications: [],
          prefer_related_applications: false
        },
        // 添加对暗色模式的支持
        injectManifest: {
          globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,json}']
        },
        devOptions: {
          enabled: true,
          type: 'module'
        }
      }),
      // 添加图片优化插件
      ViteImageOptimizer({
        jpg: {
          quality: 80,
        },
        jpeg: {
          quality: 80,
        },
        png: {
          quality: 80,
        },
        webp: {
          quality: 80,
        },
      }),
      // 添加 Gzip 和 Brotli 压缩
      compression({
        include: /\.(js|css|html|json|ico|png|jpg|jpeg)$/i,
        algorithms: ['gzip', 'brotli'],
      })
  ];

  return {
    plugins,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      }
    },
    server: {
      host: true,
    },
    build: {
      // 代码分割配置
      rollupOptions: {
        output: {
          manualChunks: {
            // 将核心库分离到vendor chunk
            vendor: ['vue', 'vue-router', 'pinia'],
            // 将markdown相关库分离
            markdown: ['marked'],
            // 将工具库分离
            utils: ['uuid', 'tyme4ts', '@vueuse/core']
            // 移除空的ui chunk，因为项目中没有使用@vueuse/components
          },
          // 为文件名添加内容哈希，确保缓存更新
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash].[ext]'
        }
      },
      // 设置chunk大小警告限制
      chunkSizeWarningLimit: 1000,
      // 启用terser压缩
      minify: 'terser',
      // terser配置
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log']
        }
      },
      // 启用源码映射（生产环境建议关闭）
      sourcemap: false,
      // 确保构建时的文件名哈希
      assetsInlineLimit: 0
    },
    // 优化依赖预构建
    optimizeDeps: {
      include: ['vue', 'vue-router', 'pinia', 'marked', 'uuid', 'tyme4ts']
    }
  }
})
