/**
 * 全局类型声明
 */
import type { LiuyaoData, MeihuaData, QimenData } from './divination';

// 全局类型声明 - 与原项目JavaScript函数对应

// AI响应接口
export interface AIResponse {
  streamResponse(): AsyncGenerator<string, void, unknown>;
  cancel(): void;
}

export interface TarotCard {
  name: string;
  type: string;
  suit?: string;
  number: number;
}

export interface HistoryRecord {
  type: string;
  question: string;
  result: string;
  timestamp: number;
}

declare global {
  interface Window {
    // AI服务函数
    queryAI: (prompt: string) => Promise<AIResponse>;
    getAIResponse: (prompt: string, callback: (content: string) => void) => Promise<void>;
    ensureMarkedLibrary: () => Promise<void>;
    renderMarkdown: (text: string) => string;
    currentAIRequest?: AbortController | null;

    // 历史记录函数
    saveHistory: (type: string, question: string, result: string) => void;
    getHistory: () => HistoryRecord[];
    clearHistory: () => boolean;

    // marked库 - 支持两种可能的类型
    marked:
      | ((text: string) => string)
      | {
          parse: (text: string) => string;
          [key: string]: unknown;
        };
  }
}

export {};

// 全局变量声明
