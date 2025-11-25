/* ==========================================================================
   组合式函数类型定义
   ========================================================================== */

import type { Ref, ComputedRef } from 'vue';
import type {
  DivinationData,
  DivinationState,
} from './divination';
import type { FormData, FormErrors } from './common';

// 占卜相关组合式函数
export interface UseDivinationOptions {
  autoStart?: boolean;
  includeAI?: boolean;
  aiModel?: string;
  onSuccess?: (data: DivinationData) => void;
  onError?: (error: Error) => void;
}

export interface UseDivinationReturn {
  // 状态
  state: Ref<DivinationState>;
  loading: ComputedRef<boolean>;
  hasResult: ComputedRef<boolean>;
  buttonText: ComputedRef<string>;

  // 方法
  startDivination: (question: string) => Promise<void>;
  reset: () => void;
  retry: () => Promise<void>;

  // 数据
  divinationData: ComputedRef<DivinationData | null>;
  aiResponse: ComputedRef<string>;
  error: ComputedRef<string>;
}

// HTTP 请求相关组合式函数
export interface UseRequestOptions<T = unknown> {
  immediate?: boolean;
  initialData?: T;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  transform?: (data: unknown) => T;
  retry?: number;
  retryDelay?: number;
}

export interface UseRequestReturn<T = unknown> {
  data: Ref<T | null>;
  loading: Ref<boolean>;
  error: Ref<Error | null>;
  execute: (...args: unknown[]) => Promise<T>;
  refresh: () => Promise<T>;
  cancel: () => void;
  reset: () => void;
}

// 表单相关组合式函数
export interface UseFormOptions<T = FormData> {
  initialValues?: Partial<T>;
  validationSchema?: Record<keyof T, (value: unknown) => boolean | string>;
  onSubmit?: (values: T) => void | Promise<void>;
  onReset?: () => void;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

export interface UseFormReturn<T = FormData> {
  // 数据
  values: Ref<T>;
  errors: Ref<FormErrors>;
  touched: Ref<Record<keyof T, boolean>>;

  // 状态
  isValid: ComputedRef<boolean>;
  isDirty: ComputedRef<boolean>;
  isSubmitting: Ref<boolean>;

  // 方法
  setFieldValue: (field: keyof T, value: unknown) => void;
  setFieldError: (field: keyof T, error: string) => void;
  setFieldTouched: (field: keyof T, touched?: boolean) => void;
  validateField: (field: keyof T) => boolean;
  validateForm: () => boolean;
  handleSubmit: (e?: Event) => Promise<void>;
  handleReset: () => void;

  // 字段绑定
  getFieldProps: (field: keyof T) => {
    value: unknown;
    onChange: (value: unknown) => void;
    onBlur: () => void;
    error: string | undefined;
    touched: boolean;
  };
}

// 本地存储相关组合式函数
export interface UseStorageOptions<T> {
  defaultValue?: T;
  serializer?: {
    read: (value: string) => T;
    write: (value: T) => string;
  };
  onError?: (error: Error) => void;
}

export interface UseStorageReturn<T> {
  value: Ref<T>;
  remove: () => void;
  clear: () => void;
}

// 主题相关组合式函数
export interface UseThemeReturn {
  theme: Ref<'light' | 'dark' | 'auto'>;
  isDark: ComputedRef<boolean>;
  isLight: ComputedRef<boolean>;
  isAuto: ComputedRef<boolean>;
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  toggleTheme: () => void;
}

// 国际化相关组合式函数
export interface UseI18nReturn {
  locale: Ref<string>;
  availableLocales: ComputedRef<string[]>;
  t: (key: string, params?: Record<string, unknown>) => string;
  setLocale: (locale: string) => void;
  loadLocaleMessages: (locale: string) => Promise<void>;
}

// 路由相关组合式函数
export interface UseRouterReturn {
  currentRoute: ComputedRef<unknown>;
  push: (to: string | object) => Promise<void>;
  replace: (to: string | object) => Promise<void>;
  go: (delta: number) => void;
  back: () => void;
  forward: () => void;
}

// 权限相关组合式函数
export interface UsePermissionReturn {
  hasPermission: (permission: string | string[]) => boolean;
  hasRole: (role: string | string[]) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  hasAllPermissions: (permissions: string[]) => boolean;
}

// 设备检测相关组合式函数
export interface UseDeviceReturn {
  isMobile: ComputedRef<boolean>;
  isTablet: ComputedRef<boolean>;
  isDesktop: ComputedRef<boolean>;
  isTouch: ComputedRef<boolean>;
  orientation: Ref<'portrait' | 'landscape'>;
  screenSize: Ref<{ width: number; height: number }>;
}

// 网络状态相关组合式函数
export interface UseNetworkReturn {
  isOnline: Ref<boolean>;
  isOffline: ComputedRef<boolean>;
  downlink: Ref<number | undefined>;
  effectiveType: Ref<string | undefined>;
  saveData: Ref<boolean | undefined>;
}

// 剪贴板相关组合式函数
export interface UseClipboardOptions {
  legacy?: boolean;
  copiedDuring?: number;
}

export interface UseClipboardReturn {
  isSupported: ComputedRef<boolean>;
  text: Ref<string>;
  copied: Ref<boolean>;
  copy: (text?: string) => Promise<void>;
  read: () => Promise<string>;
}

// 全屏相关组合式函数
export interface UseFullscreenReturn {
  isSupported: ComputedRef<boolean>;
  isFullscreen: Ref<boolean>;
  enter: () => Promise<void>;
  exit: () => Promise<void>;
  toggle: () => Promise<void>;
}

// 定时器相关组合式函数
export interface UseIntervalOptions {
  immediate?: boolean;
  immediateCallback?: boolean;
}

export interface UseIntervalReturn {
  isActive: ComputedRef<boolean>;
  pause: () => void;
  resume: () => void;
  reset: () => void;
}

export interface UseTimeoutReturn {
  isPending: ComputedRef<boolean>;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

// 事件监听相关组合式函数
export interface UseEventListenerOptions {
  capture?: boolean;
  once?: boolean;
  passive?: boolean;
}

export interface UseEventListenerReturn {
  cleanup: () => void;
}

// 滚动相关组合式函数
export interface UseScrollOptions {
  throttle?: number;
  idle?: number;
  onScroll?: (e: Event) => void;
  onStop?: (e: Event) => void;
}

export interface UseScrollReturn {
  x: Ref<number>;
  y: Ref<number>;
  isScrolling: Ref<boolean>;
  arrivedState: ComputedRef<{
    left: boolean;
    right: boolean;
    top: boolean;
    bottom: boolean;
  }>;
  directions: ComputedRef<{
    left: boolean;
    right: boolean;
    top: boolean;
    bottom: boolean;
  }>;
}

// 拖拽相关组合式函数
export interface UseDraggableOptions {
  initialValue?: { x: number; y: number };
  exact?: boolean;
  preventDefault?: boolean;
  stopPropagation?: boolean;
  capture?: boolean;
  draggingElement?: Ref<HTMLElement | null>;
  containerElement?: Ref<HTMLElement | null>;
  handle?: Ref<HTMLElement | null>;
  onStart?: (position: { x: number; y: number }, event: PointerEvent) => void;
  onMove?: (position: { x: number; y: number }, event: PointerEvent) => void;
  onEnd?: (position: { x: number; y: number }, event: PointerEvent) => void;
}

export interface UseDraggableReturn {
  x: Ref<number>;
  y: Ref<number>;
  isDragging: Ref<boolean>;
  position: ComputedRef<{ x: number; y: number }>;
  style: ComputedRef<{
    left: string;
    top: string;
    position: string;
  }>;
}
