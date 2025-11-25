/**
 * 占卜相关的TypeScript类型定义
 * 简化后的统一类型系统
 */

// 六神类型
export type SixGod = '青龙' | '朱雀' | '勾陈' | '腾蛇' | '白虎' | '玄武';

// 占卜类型枚举
export type DivinationType =
  | 'liuyao'
  | 'meihua'
  | 'qimen'
  | 'tarot'
  | 'tarot_single'
  | 'ssgw'
  | 'daily';

// 基础时间信息
export interface BaseGanZhi {
  year: string;
  month: string;
  day: string;
  hour: string;
}

// 基础爻象信息
export interface BaseYaoDetail {
  position: number;
  yaoType: '阳' | '阴';
  isChanging: boolean;
}

// 六爻专用爻象详情
export interface LiuyaoYaoDetail extends BaseYaoDetail {
  rawValue: number;
  changeType: string;
  sixGod: string;
  sixRelative: string;
  najiaDizhi: string;
  wuxing: string;
  isWorld: boolean;
  isResponse: boolean;
  isVoid: boolean;
  changedYao?: {
    dizhi: string;
    wuxing: string;
    liuqin: string;
    isVoid: boolean;
  } | null;
}

// 梅花易数专用爻象详情
export interface MeihuaYaoDetail extends BaseYaoDetail {
  tiYong: '体' | '用';
}

// 基础卦象信息
export interface BaseHexagramData {
  originalName: string;
  changedName?: string;
  interName?: string;
  ganzhi: BaseGanZhi;
  timestamp: number;
}

// 六爻占卜数据
export interface LiuyaoData extends BaseHexagramData {
  yaoArray: number[];
  changingYaos: Array<{
    position: number;
    isChanging: boolean;
    type: string;
  }>;
  sixGods: string[];
  sixRelatives: string[];
  najiaDizhi: string[];
  wuxing: string[];
  worldAndResponse: string[];
  voidBranches: string[];
  palace: {
    name: string;
    wuxing: string;
  };
  yaosDetail: LiuyaoYaoDetail[];
  isChaotic?: boolean; // 新增：是否为乱动卦象
  chaoticReason?: string; // 新增：乱动原因
}

// 梅花易数计算过程
export interface MeihuaCalculation {
  method: string;
  numbers?: number[];
  time?: string;
  [key: string]: unknown;
}

// 梅花易数数据
export interface MeihuaData extends BaseHexagramData {
  tiGua: {
    name: string;
    element: string;
    nature: string;
  };
  yongGua: {
    name: string;
    element: string;
    nature: string;
  };
  movingYao: {
    position: number;
    description: string;
    yaoName: string;
  };
  analysis: {
    tiYongRelation: string;
    inter1Relation: string;
    inter2Relation: string;
    changedRelation: string;
  };
  mainHexagram: {
    name: string;
    symbol: string;
    upper: string;
    lower: string;
    description: string;
  };
  interHexagram?: {
    name: string;
    symbol: string;
    upper: string;
    lower: string;
    description: string;
  } | null;
  changedHexagram?: {
    name: string;
    symbol: string;
    upper: string;
    lower: string;
    description: string;
  } | null;
  yaosDetail: MeihuaYaoDetail[];
  calculation?: MeihuaCalculation;
}

// 奇门遁甲九宫格数据
export interface QimenJiuGongGe {
  gong: number;
  name: string;
  direction: string;
  element: string;
  tianPan: {
    star: string;
    stem: string;
  };
  diPan: {
    stem: string;
  };
  renPan: {
    door: string;
  };
  shenPan: {
    god: string;
  };
}

// 奇门遁甲特殊时辰情况
export interface QimenSpecialConditions {
  isLiuJiaHour: boolean;      // 六甲时辰
  isLiuGuiHour: boolean;      // 六癸时辰
  isShiGanRuMu: boolean;      // 时干入墓
  isWuBuYuShi: boolean;       // 五不遇时
  description: string;        // 描述信息
}

// 奇门遁甲时辰信息
export interface QimenTimeInfo {
  solarTerm: string; // 节气
  epoch: string;     // 元
  [key: string]: string;
}

// 奇门遁甲数据
export interface QimenData {
  jiuGongGe: QimenJiuGongGe[];
  ganzhi: BaseGanZhi;
  isYangDun: boolean;
  juShu: number;
  zhiFu: string;
  zhiShi: string;
  timeInfo: QimenTimeInfo;
  specialConditions?: QimenSpecialConditions; // 特殊时辰情况
  timestamp: number;
}

// 塔罗牌数据
export interface TarotData {
  spreadType: string;
  spreadName: string;
  cards: {
    id: number;
    name: string;
    position: string;
    reversed: boolean;
    keywords: string[];
  }[];
  timestamp: number;
}

// 塔罗牌阵类型
export type TarotSpreadType =
  | 'single'
  | 'three'
  | 'love'
  | 'career'
  | 'decision'
  | 'celtic'
  | 'chakra'
  | 'year'
  | 'mindBodySpirit'
  | 'horseshoe';

// 三山国王灵签数据
export interface SsgwData {
  number: number;
  title: string;
  poem: string;
  story?: string;
  details?: { [key: string]: string };
  timestamp: number;
  ganzhi: BaseGanZhi;
}

// 日家奇门九宫格数据
export interface DailyQimenJiuGongGe {
  gong: number;
  name: string;
  direction: string;
  element: string;
  tianPan: {
    star: string;
    stem: string;
  };
  diPan: {
    stem: string;
  };
  renPan: {
    door: string;
  };
  shenPan: {
    god: string;
  };
}

// 日家奇门时间信息
export interface DailyQimenTimeInfo {
  solarTerm: string; // 节气
  epoch: string;     // 元
  juShu: number;     // 局数
  dunType: '阳遁' | '阴遁'; // 遁甲类型
  zhiFu: string;     // 值符
  zhiShi: string;    // 值使
}

// 今日运势数据
export interface DailyFortuneData {
  date: string; // YYYY-MM-DD格式
  overall: {
    score: number; // 1-100分
    description: string;
    luck: '吉' | '凶' | '平';
  };
  aspects: {
    career: {
      score: number;
      description: string;
      advice: string;
    };
    wealth: {
      score: number;
      description: string;
      advice: string;
    };
    relationship: {
      score: number;
      description: string;
      advice: string;
    };
    health: {
      score: number;
      description: string;
      advice: string;
    };
  };
  lucky: {
    numbers: number[];
    colors: string[];
    directions: string[];
    time: string;
  };
  timestamp: number;
  ganzhi: BaseGanZhi;
  // 新增日家奇门核心要素
  qimen: {
    timeInfo: DailyQimenTimeInfo;
    jiuGongGe: DailyQimenJiuGongGe[];
    analysis: {
      zhiFuAnalysis: string;    // 值符分析
      zhiShiAnalysis: string;   // 值使分析
      palaceAnalysis: string;   // 宫位分析
      wuxingAnalysis: string;   // 五行分析
      overallAnalysis: string;  // 综合分析
    };
  };
}

// 统一的占卜数据类型
export type DivinationData = LiuyaoData | MeihuaData | QimenData | TarotData | SsgwData | DailyFortuneData;

// 统一的占卜结果
export interface DivinationResult {
  id: string;
  type: DivinationType;
  data: DivinationData;
  supplementaryInfo?: SupplementaryInfo;
  aiResponse?: string;
}

// 补充信息
export interface SupplementaryInfo {
  gender?: '男' | '女';
  birthYear?: number;
  model?: string;
  interpretationStyle?: '入门' | '专业';
  outputLength?: '精简' | '详细' | '超详细';
  dayPillar?: {
    heavenlyStem: string; // 天干
    earthlyBranch: string; // 地支
  };
  divinationMethod?: 'default' | 'random' | 'number'; // 起卦方式
  divinationNumber?: number; // 数字起卦的数字
}

// 占卜请求
export interface DivinationRequest {
  type: DivinationType;
  question: string;
  spreadType?: string; // For tarot
  supplementaryInfo?: SupplementaryInfo;
  signNumber?: number; // For ssgw
  signal?: AbortSignal;
}

// 占卜状态
export interface DivinationState {
  loading: boolean;
  error: string | null;
  result: DivinationResult | null;
}

// 问题示例
export interface QuestionExample {
  text: string;
  type?: string;
}
