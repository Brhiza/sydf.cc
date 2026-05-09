import type { DivinationType } from '@/types';

export type DivinationConfigType = DivinationType;

export interface ExampleQuestion {
  text: string;
  category: string;
}

export interface DivinationConfig {
  type: DivinationConfigType;
  title: string;
  icon: string;
  description: string;
  placeholder: string;
  maxLength: number;
  examples: ExampleQuestion[];
  buttonText: string;
}

export const QUESTION_CATEGORIES = {
  EMOTION: 'emotion',
  CAREER: 'career',
  WEALTH: 'wealth',
  RELATION: 'relation',
  GROWTH: 'growth',
};

export const DIVINATION_CONFIGS: Record<DivinationConfigType, DivinationConfig> = {
  liuyao: {
    type: 'liuyao',
    title: '六爻占卜',
    icon: '☰',
    description: '六爻是中国传统的占卜方式，通过卦象阴阳变化来预测事物的发展趋势',
    placeholder: '请输入您想要占卜的问题',
    maxLength: 200,
    buttonText: '询问赛博大师',
    examples: [
      { text: '我近期的事业发展如何？', category: QUESTION_CATEGORIES.CAREER },
      { text: '我和TA的感情会有结果吗？', category: QUESTION_CATEGORIES.EMOTION },
      { text: '这个投资项目适合我吗？', category: QUESTION_CATEGORIES.WEALTH },
      { text: '我应该换工作吗？', category: QUESTION_CATEGORIES.CAREER },
      { text: '我和朋友之间的矛盾该如何解决？', category: QUESTION_CATEGORIES.RELATION },
      { text: '我的健康状况如何？', category: QUESTION_CATEGORIES.GROWTH },
    ],
  },
  meihua: {
    type: 'meihua',
    title: '梅花易数',
    icon: '🌸',
    description: '梅花易数是中国传统的占卜方式，通过数字和卦象来预测吉凶祸福',
    placeholder: '请输入您想要占卜的问题',
    maxLength: 200,
    buttonText: '询问赛博大师',
    examples: [
      { text: '我近期的财运如何？', category: QUESTION_CATEGORIES.WEALTH },
      { text: '我和TA的缘分如何？', category: QUESTION_CATEGORIES.EMOTION },
      { text: '我应该接受这个工作机会吗？', category: QUESTION_CATEGORIES.CAREER },
      { text: '我的学业发展会顺利吗？', category: QUESTION_CATEGORIES.GROWTH },
      { text: '如何改善我的人际关系？', category: QUESTION_CATEGORIES.RELATION },
      { text: '这次出行会顺利吗？', category: QUESTION_CATEGORIES.GROWTH },
    ],
  },
  qimen: {
    type: 'qimen',
    title: '奇门遁甲',
    icon: '⚡',
    description: '奇门遁甲是中国古代的术数，被誉为"三式之首"，可预测事物的发展趋势',
    placeholder: '请输入您想要占卜的问题',
    maxLength: 200,
    buttonText: '询问赛博大师',
    examples: [
      { text: '我应该在什么时机投资？', category: QUESTION_CATEGORIES.WEALTH },
      { text: '我和TA的关系会如何发展？', category: QUESTION_CATEGORIES.EMOTION },
      { text: '我的事业会有突破吗？', category: QUESTION_CATEGORIES.CAREER },
      { text: '我该如何处理当前的困境？', category: QUESTION_CATEGORIES.GROWTH },
      { text: '我和家人的关系如何改善？', category: QUESTION_CATEGORIES.RELATION },
      { text: '我该如何提升自己？', category: QUESTION_CATEGORIES.GROWTH },
    ],
  },
  ssgw: {
    type: 'ssgw',
    title: '三山国王灵签',
    icon: '🏛️',
    description: '为迷茫者指点迷津，解答人生困惑。三山是指揭西县河婆镇北面的三座山—巾山、明山、独山，随着当地移民向外扩展，成为香港、台湾及东南亚的汉人民间主要信仰',
    placeholder: '请输入问题，或在心中默念',
    maxLength: 200,
    buttonText: '开始求签',
    examples: [],
  },
  tarot: {
    type: 'tarot',
    title: '塔罗占卜',
    icon: '🔮',
    description:
      '在处理复杂问题或需要考虑多方面因素时，三牌布局可以提供更丰富的细节和更全面的视角，过去现在和未来',
    placeholder: '请输入您的问题',
    maxLength: 200,
    buttonText: '询问塔罗大师',
    examples: [
      { text: '我的爱情运势如何？', category: QUESTION_CATEGORIES.EMOTION },
      { text: '我应该如何处理这段关系？', category: QUESTION_CATEGORIES.EMOTION },
      { text: '我的内心真正想要什么？', category: QUESTION_CATEGORIES.GROWTH },
      { text: '未来三个月的运势如何？', category: QUESTION_CATEGORIES.GROWTH },
      { text: '我的事业会有什么变化？', category: QUESTION_CATEGORIES.CAREER },
      { text: '如何改善我的财务状况？', category: QUESTION_CATEGORIES.WEALTH },
      { text: '我和家人的关系会如何发展？', category: QUESTION_CATEGORIES.RELATION },
      { text: '我该如何处理当前的人际关系？', category: QUESTION_CATEGORIES.RELATION },
    ],
  },
  daily: {
    type: 'daily',
    title: '今日运势',
    icon: '🌟',
    description: '基于日家奇门遁甲算法，为您解析今日的整体运势，包含事业、财富、感情、健康等各方面的详细指导',
    placeholder: '今日运势每日限抽一次',
    maxLength: 0,
    buttonText: '查看今日运势',
    examples: [],
  },
};

export const divinationNavItems = Object.values(DIVINATION_CONFIGS);

export function getDivinationConfig(type: DivinationType): DivinationConfig | null {
  return DIVINATION_CONFIGS[type] || null;
}
