/**
 * 全局类型声明
 */
import type { LiuyaoData, MeihuaData, QimenData, SsgwData } from './divination';

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

    // 起卦函数
    generateLiuyao: () => LiuyaoData;
    generateMeihua: () => MeihuaData;
    generateQimen: () => QimenData;

    // 塔罗牌函数
    tarotCards: TarotCard[];
    drawSingleCard: () => { card: TarotCard; isReversed: boolean; position: string; timestamp: number };
    drawThreeCards: () => { cards: { card: TarotCard; isReversed: boolean; position: string }[]; timestamp: number };
    getCardDisplayName: (card: TarotCard, isReversed: boolean) => string;

    // 历史记录函数
    saveHistory: (type: string, question: string, result: string) => void;
    getHistory: () => HistoryRecord[];
    clearHistory: () => boolean;

    // 三山国王灵签
    SSGW_SIGNS: SsgwData[];
    getRandomSign: () => SsgwData;
    getSignById: (id: number) => SsgwData | undefined;
    throwHolyGrail: () => {
      result: '圣杯' | '笑杯' | '阴杯';
      bei1: 'ping' | 'tu';
      bei2: 'ping' | 'tu';
    };

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
