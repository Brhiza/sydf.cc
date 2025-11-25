/* ==========================================================================
   环境变量类型定义
   ========================================================================== */

/// <reference types="vite/client" />

// Vite 环境变量类型定义
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_TIMEOUT: string;
  readonly VITE_ENABLE_MOCK: string;
  readonly VITE_ENABLE_DEVTOOLS: string;
  readonly VITE_BUILD_TIME: string;
  readonly VITE_GIT_COMMIT: string;
  readonly VITE_GIT_BRANCH: string;
  readonly VITE_API_ENDPOINT: string;
  readonly VITE_MODEL: string;
}


// 全局类型声明
declare global {
  // 扩展 Window 接口
  interface Window {
    // AI 请求控制器
    currentAIRequest?: AbortController;
    // 开发工具
    __VUE_DEVTOOLS_GLOBAL_HOOK__?: unknown;
    // 性能监控
    __PERFORMANCE_OBSERVER__?: PerformanceObserver;
    // 错误收集
    __ERROR_HANDLER__?: (error: Error, info: string) => void;
  }

  // 扩展 NodeJS 全局变量
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      VITE_APP_TITLE: string;
      VITE_APP_VERSION: string;
      VITE_API_BASE_URL: string;
      VITE_API_TIMEOUT: string;
      VITE_ENABLE_MOCK: string;
      VITE_ENABLE_DEVTOOLS: string;
      VITE_BUILD_TIME: string;
      VITE_GIT_COMMIT: string;
      VITE_GIT_BRANCH: string;
    }
  }
}

// Vue 组件类型扩展
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    // 全局属性
    $env: ImportMetaEnv;
    $version: string;
    $buildTime: string;
  }

  interface GlobalProperties {
    // 全局方法
    $log: (message: string, level?: 'info' | 'warn' | 'error') => void;
    $notify: (message: string, type?: 'success' | 'warning' | 'error') => void;
    $confirm: (message: string) => Promise<boolean>;
  }
}

// CSS 模块类型声明
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.styl' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// 静态资源类型声明
declare module '*.svg' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent;
  export default component;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.ico' {
  const src: string;
  export default src;
}

// JSON 文件类型声明
declare module '*.json' {
  const value: unknown;
  export default value;
}

// 文本文件类型声明
declare module '*.txt' {
  const content: string;
  export default content;
}

declare module '*.md' {
  const content: string;
  export default content;
}

// Web Workers 类型声明
declare module '*.worker.ts' {
  class WebpackWorker extends Worker {
    constructor();
  }
  export default WebpackWorker;
}

// 第三方库类型声明（如果没有官方类型定义）
declare module 'some-library-without-types' {
  export function someFunction(param: string): string;
  export interface SomeInterface {
    property: number;
  }
}

export {};
