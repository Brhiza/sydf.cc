import { defineConfig, type PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import compression from 'vite-plugin-compression2'
import path from 'path'

const pwaManifest = {
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
      purpose: 'any maskable',
    },
    {
      src: 'static/favicon.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any maskable',
    },
    {
      src: 'static/favicon.png',
      sizes: '48x48',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: 'static/favicon.png',
      sizes: '72x72',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: 'static/favicon.png',
      sizes: '96x96',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: 'static/favicon.png',
      sizes: '128x128',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: 'static/favicon.png',
      sizes: '144x144',
      type: 'image/png',
      purpose: 'any',
    },
  ],
  screenshots: [
    {
      src: '/static/tarot/1.jpg',
      sizes: '540x720',
      type: 'image/jpeg',
      form_factor: 'narrow',
      label: '占卜界面',
    },
    {
      src: '/static/tarot/2.jpg',
      sizes: '540x720',
      type: 'image/jpeg',
      form_factor: 'narrow',
      label: '卡牌选择',
    },
  ],
  related_applications: [],
  prefer_related_applications: false,
} as const

const chunkRules = [
  { name: 'vendor', dependencies: ['vue', 'vue-router', 'pinia'] },
  { name: 'markdown', dependencies: ['marked'] },
  { name: 'mingyuCore', dependencies: ['mingyu-core/calendar'] },
]

const optimizeDepsInclude = [
  'vue',
  'vue-router',
  'pinia',
  'marked',
  'mingyu-core/calendar',
  'mingyu-core/divination/liuyao',
  'mingyu-core/divination/meihua',
  'mingyu-core/divination/meihua-omens',
  'mingyu-core/divination/qimen',
  'mingyu-core/divination/ssgw',
  'mingyu-core/divination/tarot',
  'mingyu-core/divination/tarot-data',
]

const terserOptions = {
  compress: {
    drop_debugger: true,
    pure_funcs: ['console.log', 'console.debug', 'console.info'],
  },
}

function isDependencyId(id: string, dependency: string): boolean {
  const normalizedId = id.replace(/\\/g, '/')
  const dependencyPath = `/node_modules/${dependency}`
  return normalizedId.includes(`${dependencyPath}/`) || normalizedId.endsWith(dependencyPath)
}

function manualChunks(id: string): string | undefined {
  const rule = chunkRules.find(({ dependencies }) =>
    dependencies.some((dependency) => isDependencyId(id, dependency))
  )
  return rule?.name
}

function createPwaPlugin(): PluginOption {
  return VitePWA({
    registerType: 'autoUpdate',
    strategies: 'injectManifest',
    srcDir: 'src',
    filename: 'sw.ts',
    includeAssets: ['favicon.ico', 'static/apple-touch-icon.png', 'masked-icon.svg'],
    manifest: pwaManifest,
    injectManifest: {
      // 仅预缓存应用壳和关键静态资源，图片改走运行时缓存，降低首次安装体积。
      globPatterns: ['**/*.{js,css,html,ico,json,webmanifest}'],
    },
    devOptions: {
      enabled: true,
      type: 'module',
    },
  })
}

function createImageOptimizerPlugin(): PluginOption {
  return ViteImageOptimizer({
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
  })
}

function createCompressionPlugin(): PluginOption {
  return compression({
    include: /\.(js|css|html|json|ico|png|jpg|jpeg)$/i,
    algorithms: ['gzip', 'brotli'],
  })
}

function createPlugins(): PluginOption[] {
  return [vue(), createPwaPlugin(), createImageOptimizerPlugin(), createCompressionPlugin()]
}

export default defineConfig(() => ({
  plugins: createPlugins(),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks,
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions,
    sourcemap: false,
    assetsInlineLimit: 0,
  },
  optimizeDeps: {
    include: optimizeDepsInclude,
  },
}))
