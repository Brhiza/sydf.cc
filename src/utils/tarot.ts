// 塔罗牌功能 - 与原项目完全一致
import { tarotSpreads } from './tarot-spreads';
export { getRandomDefaultQuestion, getSpreadDefaultQuestions, tarotSpreads } from './tarot-spreads';
export type { TarotSpreadKey } from './tarot-spreads';

// 塔罗牌数据 - 与原项目完全一致，78张完整牌组
const tarotCards = [
  // 大阿卡纳 (22张)
  { name: '愚者', type: '大阿卡纳', number: 1 },
  { name: '魔术师', type: '大阿卡纳', number: 2 },
  { name: '女祭司', type: '大阿卡纳', number: 3 },
  { name: '女皇', type: '大阿卡纳', number: 4 },
  { name: '皇帝', type: '大阿卡纳', number: 5 },
  { name: '教皇', type: '大阿卡纳', number: 6 },
  { name: '恋人', type: '大阿卡纳', number: 7 },
  { name: '战车', type: '大阿卡纳', number: 8 },
  { name: '力量', type: '大阿卡纳', number: 9 },
  { name: '隐士', type: '大阿卡纳', number: 10 },
  { name: '命运之轮', type: '大阿卡纳', number: 11 },
  { name: '正义', type: '大阿卡纳', number: 12 },
  { name: '倒吊人', type: '大阿卡纳', number: 13 },
  { name: '死神', type: '大阿卡纳', number: 14 },
  { name: '节制', type: '大阿卡纳', number: 15 },
  { name: '恶魔', type: '大阿卡纳', number: 16 },
  { name: '塔', type: '大阿卡纳', number: 17 },
  { name: '星星', type: '大阿卡纳', number: 18 },
  { name: '月亮', type: '大阿卡纳', number: 19 },
  { name: '太阳', type: '大阿卡纳', number: 20 },
  { name: '审判', type: '大阿卡纳', number: 21 },
  { name: '世界', type: '大阿卡纳', number: 22 },

  // 权杖牌组 (14张)
  { name: '权杖王牌', type: '小阿卡纳', suit: '权杖', number: 23 },
  { name: '权杖二', type: '小阿卡纳', suit: '权杖', number: 24 },
  { name: '权杖三', type: '小阿卡纳', suit: '权杖', number: 25 },
  { name: '权杖四', type: '小阿卡纳', suit: '权杖', number: 26 },
  { name: '权杖五', type: '小阿卡纳', suit: '权杖', number: 27 },
  { name: '权杖六', type: '小阿卡纳', suit: '权杖', number: 28 },
  { name: '权杖七', type: '小阿卡纳', suit: '权杖', number: 29 },
  { name: '权杖八', type: '小阿卡纳', suit: '权杖', number: 30 },
  { name: '权杖九', type: '小阿卡纳', suit: '权杖', number: 31 },
  { name: '权杖十', type: '小阿卡纳', suit: '权杖', number: 32 },
  { name: '权杖侍者', type: '小阿卡纳', suit: '权杖', number: 33 },
  { name: '权杖骑士', type: '小阿卡纳', suit: '权杖', number: 34 },
  { name: '权杖王后', type: '小阿卡纳', suit: '权杖', number: 35 },
  { name: '权杖国王', type: '小阿卡纳', suit: '权杖', number: 36 },

  // 圣杯牌组 (14张)
  { name: '圣杯王牌', type: '小阿卡纳', suit: '圣杯', number: 37 },
  { name: '圣杯二', type: '小阿卡纳', suit: '圣杯', number: 38 },
  { name: '圣杯三', type: '小阿卡纳', suit: '圣杯', number: 39 },
  { name: '圣杯四', type: '小阿卡纳', suit: '圣杯', number: 40 },
  { name: '圣杯五', type: '小阿卡纳', suit: '圣杯', number: 41 },
  { name: '圣杯六', type: '小阿卡纳', suit: '圣杯', number: 42 },
  { name: '圣杯七', type: '小阿卡纳', suit: '圣杯', number: 43 },
  { name: '圣杯八', type: '小阿卡纳', suit: '圣杯', number: 44 },
  { name: '圣杯九', type: '小阿卡纳', suit: '圣杯', number: 45 },
  { name: '圣杯十', type: '小阿卡纳', suit: '圣杯', number: 46 },
  { name: '圣杯侍者', type: '小阿卡纳', suit: '圣杯', number: 47 },
  { name: '圣杯骑士', type: '小阿卡纳', suit: '圣杯', number: 48 },
  { name: '圣杯王后', type: '小阿卡纳', suit: '圣杯', number: 49 },
  { name: '圣杯国王', type: '小阿卡纳', suit: '圣杯', number: 50 },

  // 宝剑牌组 (14张)
  { name: '宝剑王牌', type: '小阿卡纳', suit: '宝剑', number: 51 },
  { name: '宝剑二', type: '小阿卡纳', suit: '宝剑', number: 52 },
  { name: '宝剑三', type: '小阿卡纳', suit: '宝剑', number: 53 },
  { name: '宝剑四', type: '小阿卡纳', suit: '宝剑', number: 54 },
  { name: '宝剑五', type: '小阿卡纳', suit: '宝剑', number: 55 },
  { name: '宝剑六', type: '小阿卡纳', suit: '宝剑', number: 56 },
  { name: '宝剑七', type: '小阿卡纳', suit: '宝剑', number: 57 },
  { name: '宝剑八', type: '小阿卡纳', suit: '宝剑', number: 58 },
  { name: '宝剑九', type: '小阿卡纳', suit: '宝剑', number: 59 },
  { name: '宝剑十', type: '小阿卡纳', suit: '宝剑', number: 60 },
  { name: '宝剑侍者', type: '小阿卡纳', suit: '宝剑', number: 61 },
  { name: '宝剑骑士', type: '小阿卡纳', suit: '宝剑', number: 62 },
  { name: '宝剑王后', type: '小阿卡纳', suit: '宝剑', number: 63 },
  { name: '宝剑国王', type: '小阿卡纳', suit: '宝剑', number: 64 },

  // 钱币牌组 (14张) - 与原项目保持一致，使用"钱币"而不是"星币"
  { name: '钱币王牌', type: '小阿卡纳', suit: '钱币', number: 65 },
  { name: '钱币二', type: '小阿卡纳', suit: '钱币', number: 66 },
  { name: '钱币三', type: '小阿卡纳', suit: '钱币', number: 67 },
  { name: '钱币四', type: '小阿卡纳', suit: '钱币', number: 68 },
  { name: '钱币五', type: '小阿卡纳', suit: '钱币', number: 69 },
  { name: '钱币六', type: '小阿卡纳', suit: '钱币', number: 70 },
  { name: '钱币七', type: '小阿卡纳', suit: '钱币', number: 71 },
  { name: '钱币八', type: '小阿卡纳', suit: '钱币', number: 72 },
  { name: '钱币九', type: '小阿卡纳', suit: '钱币', number: 73 },
  { name: '钱币十', type: '小阿卡纳', suit: '钱币', number: 74 },
  { name: '钱币侍者', type: '小阿卡纳', suit: '钱币', number: 75 },
  { name: '钱币骑士', type: '小阿卡纳', suit: '钱币', number: 76 },
  { name: '钱币王后', type: '小阿卡纳', suit: '钱币', number: 77 },
  { name: '钱币国王', type: '小阿卡纳', suit: '钱币', number: 78 },
];

// 洗牌函数 - 与原项目完全一致
function shuffleCards() {
  const shuffled = [...tarotCards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// 通用牌阵抽取函数
export function drawSpreadCards(spreadType: keyof typeof tarotSpreads) {
  const spread = tarotSpreads[spreadType];
  if (!spread) {
    throw new Error(`未知的牌阵类型: ${spreadType}`);
  }

  const shuffled = shuffleCards();
  const cards = [];

  for (let i = 0; i < spread.cardCount; i++) {
    const card = shuffled[i];
    const isReversed = Math.random() < 0.5; // 50% 概率逆位

    cards.push({
      card: card,
      isReversed: isReversed,
      position: spread.positions[i],
    });
  }

  return {
    spreadType,
    spreadName: spread.name,
    cards: cards,
    timestamp: Date.now(),
  };
}

// 获取塔罗牌名称（包含正逆位）
export function getCardDisplayName(card: { name: string }, isReversed: boolean) {
  return isReversed ? `${card.name}（逆位）` : card.name;
}

// 获取塔罗牌关键词
export function getCardKeywords(cardName: string): string {
  const keywordsMap: Record<string, string> = {
    // 大阿卡纳关键词
    愚者: '新开始,冒险,纯真',
    魔术师: '意志力,创造,技能',
    女祭司: '直觉,神秘,内在智慧',
    女皇: '丰饶,母性,创造力',
    皇帝: '权威,稳定,父性',
    教皇: '传统,精神指导,宗教',
    恋人: '爱情,选择,和谐',
    战车: '胜利,意志力,控制',
    力量: '勇气,耐心,内在力量',
    隐士: '内省,寻找,智慧',
    命运之轮: '命运,变化,循环',
    正义: '公正,平衡,真理',
    倒吊人: '牺牲,等待,新视角',
    死神: '转变,结束,重生',
    节制: '平衡,耐心,调和',
    恶魔: '诱惑,束缚,物质',
    塔: '突变,破坏,启示',
    星星: '希望,灵感,指引',
    月亮: '幻象,恐惧,潜意识',
    太阳: '成功,喜悦,活力',
    审判: '重生,觉醒,宽恕',
    世界: '完成,成就,圆满',

    // 小阿卡纳关键词（简化版）
    权杖王牌: '新机会,创造力,灵感',
    权杖二: '计划,未来,个人力量',
    权杖三: '扩张,远见,领导力',
    权杖四: '庆祝,和谐,家庭',
    权杖五: '冲突,竞争,分歧',
    权杖六: '胜利,公众认可,进步',
    权杖七: '挑战,坚持,防御',
    权杖八: '快速行动,急速,消息',
    权杖九: '坚韧,毅力,最后防线',
    权杖十: '负担,责任,努力',
    权杖侍者: '热情,探索,信使',
    权杖骑士: '能量,激情,行动',
    权杖王后: '自信,魅力,独立',
    权杖国王: '领导力,远见,权威',

    // 圣杯牌组
    圣杯王牌: '新感情,爱,创造力',
    圣杯二: '结合,伙伴,吸引',
    圣杯三: '庆祝,友谊,社群',
    圣杯四: '冷漠,沉思,重评',
    圣杯五: '失落,悲伤,失望',
    圣杯六: '怀旧,童年,重逢',
    圣杯七: '幻想,选择,白日梦',
    圣杯八: '放弃,前行,寻找',
    圣杯九: '满足,愿望成真,舒适',
    圣杯十: '和谐,家庭,幸福',
    圣杯侍者: '创意,直觉,信使',
    圣杯骑士: '浪漫,魅力,想象',
    圣杯王后: '同情,平静,直觉',
    圣杯国王: '情绪成熟,控制,慈悲',

    // 宝剑牌组
    宝剑王牌: '清晰,真理,新想法',
    宝剑二: '僵局,逃避,艰难选择',
    宝剑三: '心碎,悲伤,真相',
    宝剑四: '休息,休战,沉思',
    宝剑五: '冲突,失败,不光彩的胜利',
    宝剑六: '过渡,前行,解脱',
    宝剑七: '欺骗,策略,不诚实',
    宝剑八: '限制,孤立,自我束缚',
    宝剑九: '焦虑,噩梦,恐惧',
    宝剑十: '终结,背叛,谷底',
    宝剑侍者: '好奇,警惕,信使',
    宝剑骑士: '野心,仓促,行动',
    宝剑王后: '独立,清晰,智慧',
    宝剑国王: '权威,真理,智力',

    // 钱币牌组
    钱币王牌: '机会,繁荣,新事业',
    钱币二: '平衡,适应,变化',
    钱币三: '团队合作,技艺,品质',
    钱币四: '占有,控制,稳定',
    钱币五: '贫困,逆境,孤立',
    钱币六: '慷慨,慈善,分享',
    钱币七: '耐心,投资,回报',
    钱币八: '技能,勤奋,精通',
    钱币九: '富足,独立,享受',
    钱币十: '财富,传承,家庭',
    钱币侍者: '新机会,学习,梦想',
    钱币骑士: '勤奋,可靠,责任',
    钱币王后: '务实,母性,滋养',
    钱币国王: '富裕,成功,安全',
  };

  return keywordsMap[cardName] || '神秘,指引,启示';
}

// 保持ES模块导出，移除全局window导出
// 在现代Vue.js应用中，应通过模块导入方式使用这些函数
