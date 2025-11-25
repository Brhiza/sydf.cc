/* ==========================================================================
   通用类型定义
   ========================================================================== */

/**
 * 占卜历史记录接口
 */
import type { DivinationType, DivinationData, SupplementaryInfo } from './divination';
import type { ChatMessage } from './chat';

export interface HistoryRecord {
  /** 记录ID */
  id: string;
  /** 占卜类型 */
  type: DivinationType;
  /** 用户问题 */
  question: string;
  /** 占卜结果 */
  result: {
    /** 占卜类型 */
    type: DivinationType;
    /** 占卜数据 */
    data: DivinationData;
    /** AI响应 */
    aiResponse?: string;
    /** 补充信息 */
    supplementaryInfo?: SupplementaryInfo;
  };
  /** 时间戳 */
  timestamp: number;
  /** 摘要 */
  summary: string;
  /** 完整对话历史 */
  conversationHistory?: ChatMessage[];
  /** 是否置顶 */
  pinned?: boolean;
  /** 置顶时间戳 */
  pinnedAt?: number;
}

/**
 * 通用ID类型
 */
export type ID = string | number;

/**
 * 通用分页参数
 */
export interface PaginationParams {
  page: number;
  pageSize: number;
}

/**
 * 通用分页结果
 */
export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * 通用排序方向
 */
export type SortDirection = 'asc' | 'desc';

/**
 * 通用排序参数
 */
export interface SortParams {
  field: string;
  direction: SortDirection;
}

/**
 * 通用过滤参数
 */
export interface FilterParams {
  field: string;
  value: unknown;
  operator?: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'startsWith' | 'endsWith';
}

/**
 * 通用查询参数
 */
export interface QueryParams {
  pagination?: PaginationParams;
  sort?: SortParams[];
  filters?: FilterParams[];
  search?: string;
}

/**
 * 通用主题类型
 */
export type ThemeType = 'light' | 'dark' | 'auto';

/**
 * 通用语言类型
 */
export type LanguageType = 'zh-CN' | 'en-US';

/**
 * 通用状态类型
 */
export type Status = 'idle' | 'loading' | 'success' | 'error';

/**
 * 通用错误类型
 */
export interface AppError {
  code: string;
  message: string;
  details?: unknown;
}

// 基础响应类型
export interface BaseResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  code?: number;
}

// 分页响应
export interface PaginatedResponse<T> extends BaseResponse<T[]> {
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// 筛选参数
export interface SearchParams {
  keyword?: string;
  filters?: FilterParams;
  sort?: SortParams;
  pagination?: PaginationParams;
}

// 时间范围
export interface TimeRange {
  start: Date | string;
  end: Date | string;
}

// 坐标点
export interface Point {
  x: number;
  y: number;
}

// 尺寸
export interface Size {
  width: number;
  height: number;
}

// 矩形区域
export interface Rect extends Point, Size {}

// 颜色值
export type Color = string;

// 主题类型
export type Theme = 'light' | 'dark' | 'auto';

// 语言类型
export type Language = 'zh-CN' | 'en-US';

// 设备类型
export type DeviceType = 'desktop' | 'tablet' | 'mobile';

// 浏览器类型
export type BrowserType = 'chrome' | 'firefox' | 'safari' | 'edge' | 'other';

// 操作系统类型
export type OSType = 'windows' | 'macos' | 'linux' | 'ios' | 'android' | 'other';

// 用户代理信息
export interface UserAgent {
  device: DeviceType;
  browser: BrowserType;
  os: OSType;
  version: string;
}

// 环境配置
export interface Environment {
  NODE_ENV: 'development' | 'production' | 'test';
  API_BASE_URL: string;
  APP_VERSION: string;
  BUILD_TIME: string;
}

// 日志级别
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

// 日志条目
export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: number;
  context?: unknown;
  error?: Error;
}

// 事件类型
export interface AppEvent<T = unknown> {
  type: string;
  payload?: T;
  timestamp: number;
  source?: string;
}

// 加载状态
export interface LoadingState {
  status: Status;
  message?: string;
  progress?: number;
}

// 表单字段类型
export type FieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'search'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'date'
  | 'time'
  | 'datetime-local'
  | 'file';

// 表单字段定义
export interface FormField {
  name: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  options?: { label: string; value: unknown }[];
  validation?: {
    pattern?: RegExp;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    custom?: (value: unknown) => boolean | string;
  };
  defaultValue?: unknown;
}

// 表单配置
export interface FormConfig {
  fields: FormField[];
  submitText?: string;
  resetText?: string;
  layout?: 'vertical' | 'horizontal' | 'inline';
}

// 表单数据
export interface FormData {
  [fieldName: string]: unknown;
}

// 表单错误
export interface FormErrors {
  [fieldName: string]: string[];
}

// 表单状态
export interface FormState {
  data: FormData;
  errors: FormErrors;
  touched: { [fieldName: string]: boolean };
  dirty: boolean;
  valid: boolean;
  submitting: boolean;
}

// 模态框配置
export interface ModalConfig {
  title?: string;
  content?: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'info' | 'success' | 'warning' | 'error' | 'confirm';
  closable?: boolean;
  maskClosable?: boolean;
  width?: number | string;
  height?: number | string;
}

// 通知配置
export interface NotificationConfig {
  title?: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
  closable?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

// 菜单项
export interface MenuItem {
  key: string;
  label: string;
  icon?: string;
  path?: string;
  children?: MenuItem[];
  disabled?: boolean;
  hidden?: boolean;
  meta?: unknown;
}

// 路由元信息
export interface RouteMeta {
  title?: string;
  description?: string;
  keywords?: string[];
  requiresAuth?: boolean;
  roles?: string[];
  permissions?: string[];
  layout?: string;
  cache?: boolean;
  hidden?: boolean;
}

// 工具函数类型
export type Predicate<T> = (item: T) => boolean;
export type Mapper<T, U> = (item: T) => U;
export type Reducer<T, U> = (acc: U, item: T) => U;
export type Comparator<T> = (a: T, b: T) => number;

// 深度可选类型
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// 深度只读类型
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// 提取函数参数类型
export type Parameters<T extends (...args: unknown[]) => unknown> = T extends (...args: infer P) => unknown
  ? P
  : never;

// 提取函数返回类型
export type ReturnType<T extends (...args: unknown[]) => unknown> = T extends (...args: unknown[]) => infer R
  ? R
  : unknown;

// 提取Promise类型
export type Awaited<T> = T extends Promise<infer U> ? U : T;
