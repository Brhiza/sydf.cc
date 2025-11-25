import type { DailyFortuneData, BaseGanZhi, DailyQimenJiuGongGe, DailyQimenTimeInfo } from '@/types/divination';
import { getDivinationTime } from '@/utils/timeManager';
import { qimen, tiangan, dizhi } from '@/config/divination-data';

/**
 * 日家奇门今日运势算法服务
 * 日家奇门是奇门遁甲的重要分支：
 * 1. 日家奇门以日干支为核心，一日一局
 * 2. 主要用于预测一日之内的运势变化
 * 3. 起局方法与时家奇门有显著区别，更注重整体趋势
 */

// 五行属性
const TIANGAN_WUXING: Record<string, string> = {
  '甲': '木', '乙': '木', '丙': '火', '丁': '火',
  '戊': '土', '己': '土', '庚': '金', '辛': '金',
  '壬': '水', '癸': '水'
};

const DIZHI_WUXING: Record<string, string> = {
  '子': '水', '丑': '土', '寅': '木', '卯': '木',
  '辰': '土', '巳': '火', '午': '火', '未': '土',
  '申': '金', '酉': '金', '戌': '土', '亥': '水'
};

// 日家奇门九星吉凶
const STAR_AUSPICIOUS: Record<string, '吉' | '凶' | '平'> = {
  '天蓬': '凶', '天芮': '凶', '天冲': '吉', '天辅': '吉',
  '天禽': '吉', '天心': '吉', '天柱': '凶', '天任': '吉', '天英': '平'
};

// 八门吉凶
const DOOR_AUSPICIOUS: Record<string, '吉' | '凶' | '平'> = {
  '休门': '吉', '生门': '吉', '伤门': '凶', '杜门': '平',
  '景门': '平', '死门': '凶', '惊门': '凶', '开门': '吉'
};

// 八神吉凶
const GOD_AUSPICIOUS: Record<string, '吉' | '凶' | '平'> = {
  '值符': '吉', '螣蛇': '凶', '太阴': '吉', '六合': '吉',
  '九天': '吉', '九地': '吉', '玄武': '凶', '白虎': '凶'
};


/**
 * 日家奇门定局数
 * 日家奇门定局法：以日干支为核心，结合节气确定阴阳遁和局数
 * 日家奇门一日一局，与时家奇门的一时一局不同
 */
function getDailyQimenJuShu(timeInfo: { jieQi: string; ganzhi: { day: string } }) {
  const { jieQi, ganzhi } = timeInfo;
  const dayGanZhi = ganzhi.day;

  // 日家奇门阴阳遁判定：冬至到夏至为阳遁，夏至到冬至为阴遁
  const yangDunJieQi = ['冬至', '小寒', '大寒', '立春', '雨水', '惊蛰', '春分', '清明', '谷雨', '立夏', '小满', '芒种'];
  const isYangDun = yangDunJieQi.includes(jieQi);

  // 日家奇门定局：根据日干支和节气确定局数
  const dayGan = dayGanZhi.charAt(0);
  const dayZhi = dayGanZhi.charAt(1);
  
  // 日家奇门局数计算：以日干为主，结合节气
  let juShu: number;
  
  if (isYangDun) {
    // 阳遁局数计算
    const ganJuMap: Record<string, number> = {
      '甲': 1, '乙': 2, '丙': 3, '丁': 4, '戊': 5, 
      '己': 6, '庚': 7, '辛': 8, '壬': 9, '癸': 1
    };
    juShu = ganJuMap[dayGan] || 1;
  } else {
    // 阴遁局数计算
    const ganJuMap: Record<string, number> = {
      '甲': 9, '乙': 8, '丙': 7, '丁': 6, '戊': 5, 
      '己': 4, '庚': 3, '辛': 2, '壬': 1, '癸': 9
    };
    juShu = ganJuMap[dayGan] || 9;
  }

  // 根据节气调整局数（日家奇门特色）
  const jieQiAdjustment: Record<string, number> = {
    '冬至': 0, '小寒': 0, '大寒': 0, '立春': 1, '雨水': 1, '惊蛰': 1,
    '春分': 2, '清明': 2, '谷雨': 2, '立夏': 3, '小满': 3, '芒种': 3,
    '夏至': 0, '小暑': 0, '大暑': 0, '立秋': 1, '处暑': 1, '白露': 1,
    '秋分': 2, '寒露': 2, '霜降': 2, '立冬': 3, '小雪': 3, '大雪': 3
  };
  
  juShu = ((juShu + (jieQiAdjustment[jieQi] || 0) - 1) % 9) + 1;

  // 日家奇门三元划分（与时家不同）
  const dayGanIndex = tiangan.indexOf(dayGan);
  const dayZhiIndex = dizhi.indexOf(dayZhi);
  const xunShouZhiIndex = (dayZhiIndex - dayGanIndex + 12) % 12;
  const xunShouGanZhi = '甲' + dizhi[xunShouZhiIndex];

  let yuan: string;
  if (['甲子', '甲午'].includes(xunShouGanZhi)) {
    yuan = '上元';
  } else if (['甲寅', '甲申'].includes(xunShouGanZhi)) {
    yuan = '中元';
  } else {
    yuan = '下元';
  }

  return { isYangDun, juShu, yuan };
}

/**
 * 日家奇门寻值符值使
 * 日家奇门以日干支定值符值使，与时家奇门不同
 * 值符：根据日干确定对应的九星
 * 值使：根据日支确定对应的八门
 */
function getDailyZhiFuZhiShi(dayGanZhi: string) {
  const dayGan = dayGanZhi.charAt(0);
  const dayZhi = dayGanZhi.charAt(1);

  // 日家奇门值符确定法：以日干对应九星
  const ganStarMap: Record<string, string> = {
    '甲': '天心', '乙': '天任', '丙': '天英', '丁': '天芮', '戊': '天禽',
    '己': '天柱', '庚': '天心', '辛': '天任', '壬': '天英', '癸': '天芮'
  };
  
  // 日家奇门值使确定法：以日支对应八门
  const zhiDoorMap: Record<string, string> = {
    '子': '休门', '丑': '生门', '寅': '伤门', '卯': '杜门',
    '辰': '景门', '巳': '死门', '午': '惊门', '未': '开门',
    '申': '休门', '酉': '生门', '戌': '伤门', '亥': '杜门'
  };

  const zhiFu = ganStarMap[dayGan] || '天心';
  const zhiShi = zhiDoorMap[dayZhi] || '休门';

  // 日家奇门值符落宫：根据日干在九宫中的位置
  const ganPalaceMap: Record<string, number> = {
    '甲': 6, '乙': 8, '丙': 9, '丁': 2, '戊': 5,
    '己': 7, '庚': 6, '辛': 8, '壬': 9, '癸': 2
  };
  
  const zhiFuPalace = ganPalaceMap[dayGan] || 6;

  return { zhiFu, zhiShi, zhiFuPalace };
}

/**
 * 日家奇门排盘
 * 日家奇门的排盘方法与时家奇门基本相同，但以日干支为核心
 */
function arrangeDailyQimenJiuGong(
  isYangDun: boolean,
  juShu: number,
  zhiFu: string,
  zhiShi: string,
  ganzhi: { day: string }
): DailyQimenJiuGongGe[] {
  const jiuGong = Array.from({ length: 9 }, (_, i) => ({
    gong: i + 1,
    name: qimen.ninePositions[i].name,
    direction: qimen.ninePositions[i].direction,
    element: qimen.ninePositions[i].element,
    tianPan: { star: '', stem: '' },
    diPan: { stem: '' },
    renPan: { door: '' },
    shenPan: { god: '' },
  }));

  // 步骤一：排地盘三奇六仪
  const sanQiLiuYi = ['戊', '己', '庚', '辛', '壬', '癸', '丁', '丙', '乙'];
  for (let i = 0; i < 9; i++) {
    const palaceNum = isYangDun ? ((juShu + i - 1 + 9) % 9) + 1 : ((juShu - i - 1 + 9) % 9) + 1;
    jiuGong[palaceNum - 1].diPan.stem = sanQiLiuYi[i];
  }
  
  // 戊土寄宫
  if (jiuGong[4].diPan.stem) {
    jiuGong[1].diPan.stem = jiuGong[4].diPan.stem;
    jiuGong[4].diPan.stem = '';
  }

  // 步骤二：定值符值使落宫（日家奇门以日干支为准）
  // 日家奇门值符直接按日干对应的宫位落宫
  const dayGan = ganzhi.day.charAt(0);
  const dayZhi = ganzhi.day.charAt(1);
  
  // 日家奇门值符落宫：根据日干直接确定
  const ganPalaceMap: Record<string, number> = {
    '甲': 6, '乙': 8, '丙': 9, '丁': 2, '戊': 5,
    '己': 7, '庚': 6, '辛': 8, '壬': 9, '癸': 2
  };
  const zhiFuLandingPalace = ganPalaceMap[dayGan] || 6;
  
  // 日家奇门值使落宫：根据日支直接确定
  const zhiPalaceMap: Record<string, number> = {
    '子': 1, '丑': 8, '寅': 3, '卯': 4, '辰': 9, '巳': 2,
    '午': 7, '未': 6, '申': 1, '酉': 8, '戌': 3, '亥': 4
  };
  const zhiShiLandingPalace = zhiPalaceMap[dayZhi] || 1;

  // 步骤三：排天盘九星与天干
  const zhiFuStarIndex = qimen.palaceStars.indexOf(zhiFu);
  for (let i = 0; i < 9; i++) {
    const palaceIndex = (zhiFuLandingPalace - 1 + (isYangDun ? i : -i) + 9) % 9;
    const starIndex = (zhiFuStarIndex + i + 9) % 9;
    const star = qimen.palaceStars[starIndex];
    jiuGong[palaceIndex].tianPan.star = star;

    let originalStarPalaceIndex = starIndex;
    if (star === '天禽') { originalStarPalaceIndex = 1; }
    jiuGong[palaceIndex].tianPan.stem = jiuGong[originalStarPalaceIndex].diPan.stem;
  }

  // 步骤四：排神盘八神
  const currentGods = isYangDun ? qimen.yangGods : qimen.yinGods;
  for (let i = 0; i < 8; i++) {
    const palaceIndex = (zhiFuLandingPalace - 1 + (isYangDun ? i : -i) + 9) % 9;
    if (palaceIndex === 4) { continue; }
    jiuGong[palaceIndex].shenPan.god = currentGods[i];
  }
  jiuGong[zhiFuLandingPalace - 1].shenPan.god = '值符';

  // 步骤五：排人盘八门
  const zhiShiDoorIndex = qimen.palaceDoors.indexOf(zhiShi);
  const luoShuPath = [1, 8, 3, 4, 9, 2, 7, 6];
  const zhiShiLuoShuIndex = luoShuPath.indexOf(zhiShiLandingPalace);

  for (let i = 0; i < 8; i++) {
    const doorIndex = (zhiShiDoorIndex + i + 8) % 8;
    const luoShuIndex = (zhiShiLuoShuIndex + (isYangDun ? i : -i) + 8) % 8;
    const palaceNum = luoShuPath[luoShuIndex];
    jiuGong[palaceNum - 1].renPan.door = qimen.palaceDoors[doorIndex];
  }

  return jiuGong;
}

/**
 * 分析日家奇门格局
 */
function analyzeDailyQimenPattern(jiuGong: DailyQimenJiuGongGe[], zhiFu: string, zhiShi: string) {
  const analysis = {
    zhiFuAnalysis: '',
    zhiShiAnalysis: '',
    palaceAnalysis: '',
    wuxingAnalysis: '',
    overallAnalysis: ''
  };

  // 值符分析
  const zhiFuStarNature = STAR_AUSPICIOUS[zhiFu] || '平';
  analysis.zhiFuAnalysis = `值符为${zhiFu}，${zhiFuStarNature === '吉' ? '吉星' : zhiFuStarNature === '凶' ? '凶星' : '平星'}，`;
  if (zhiFuStarNature === '吉') {
    analysis.zhiFuAnalysis += '主贵人相助，事事顺遂，利于进取。';
  } else if (zhiFuStarNature === '凶') {
    analysis.zhiFuAnalysis += '主有小人作祟，需谨慎行事，避免冲动。';
  } else {
    analysis.zhiFuAnalysis += '主运势平稳，宜按部就班，不宜冒险。';
  }

  // 值使分析
  const zhiShiDoorNature = DOOR_AUSPICIOUS[zhiShi] || '平';
  analysis.zhiShiAnalysis = `值使为${zhiShi}，${zhiShiDoorNature === '吉' ? '吉门' : zhiShiDoorNature === '凶' ? '凶门' : '平门'}，`;
  if (zhiShiDoorNature === '吉') {
    analysis.zhiShiAnalysis += '主机遇良好，宜主动把握，可望有成。';
  } else if (zhiShiDoorNature === '凶') {
    analysis.zhiShiAnalysis += '主阻碍较多，宜守不宜攻，静待时机。';
  } else {
    analysis.zhiShiAnalysis += '主时运一般，宜稳中求进，不可急躁。';
  }

  // 宫位分析
  const auspiciousPalaces = jiuGong.filter(gong => {
    const starNature = STAR_AUSPICIOUS[gong.tianPan.star] || '平';
    const doorNature = DOOR_AUSPICIOUS[gong.renPan.door] || '平';
    const godNature = GOD_AUSPICIOUS[gong.shenPan.god] || '平';
    return starNature === '吉' || doorNature === '吉' || godNature === '吉';
  });

  const inauspiciousPalaces = jiuGong.filter(gong => {
    const starNature = STAR_AUSPICIOUS[gong.tianPan.star] || '平';
    const doorNature = DOOR_AUSPICIOUS[gong.renPan.door] || '平';
    const godNature = GOD_AUSPICIOUS[gong.shenPan.god] || '平';
    return starNature === '凶' || doorNature === '凶' || godNature === '凶';
  });

  analysis.palaceAnalysis = `今日格局中，吉宫有${auspiciousPalaces.length}个，凶宫有${inauspiciousPalaces.length}个。`;
  if (auspiciousPalaces.length > inauspiciousPalaces.length) {
    analysis.palaceAnalysis += '整体格局偏吉，宜积极行动。';
  } else if (inauspiciousPalaces.length > auspiciousPalaces.length) {
    analysis.palaceAnalysis += '整体格局偏凶，宜谨慎保守。';
  } else {
    analysis.palaceAnalysis += '格局吉凶相当，宜平衡行事。';
  }

  // 五行分析
  const wuxingCount: Record<string, number> = { '金': 0, '木': 0, '水': 0, '火': 0, '土': 0 };
  jiuGong.forEach(gong => {
    wuxingCount[gong.element]++;
  });

  const dominantElements = Object.entries(wuxingCount)
    .filter(([, count]) => count >= 2)
    .map(([element]) => element);

  if (dominantElements.length > 0) {
    analysis.wuxingAnalysis = `今日五行以${dominantElements.join('、')}为主，`;
    if (dominantElements.includes('木')) {
      analysis.wuxingAnalysis += '利于事业发展、开拓创新。';
    }
    if (dominantElements.includes('火')) {
      analysis.wuxingAnalysis += '利于人际交往、展现才华。';
    }
    if (dominantElements.includes('土')) {
      analysis.wuxingAnalysis += '利于稳定发展、积累财富。';
    }
    if (dominantElements.includes('金')) {
      analysis.wuxingAnalysis += '利于决断事务、提升权威。';
    }
    if (dominantElements.includes('水')) {
      analysis.wuxingAnalysis += '利于智慧发挥、灵活应变。';
    }
  } else {
    analysis.wuxingAnalysis = '今日五行分布较为均衡，各方面发展机会均等。';
  }

  // 综合分析
  const totalScore = auspiciousPalaces.length * 10 - inauspiciousPalaces.length * 5 + 50;
  if (totalScore >= 70) {
    analysis.overallAnalysis = '今日运势较佳，宜把握机遇，积极进取。各方面都有不错的发展机会，特别是事业和财运方面。建议主动出击，不要错失良机。';
  } else if (totalScore >= 50) {
    analysis.overallAnalysis = '今日运势平稳，宜保持平常心，稳中求进。虽然不会有大的突破，但也不会有大的阻碍。适合处理日常事务，为未来发展做准备。';
  } else {
    analysis.overallAnalysis = '今日运势一般，宜谨慎行事，避免冒险。可能会遇到一些小的阻碍，需要保持耐心和冷静。建议以守为主，不宜做重大决定。';
  }

  return analysis;
}

/**
 * 计算五行能量
 */
function calculateWuxingEnergy(ganzhi: BaseGanZhi): Record<string, number> {
  const energy: Record<string, number> = {
    '木': 0, '火': 0, '土': 0, '金': 0, '水': 0
  };

  const allGanZhi = [
    ganzhi.year[0], ganzhi.year[1],
    ganzhi.month[0], ganzhi.month[1],
    ganzhi.day[0], ganzhi.day[1],
    ganzhi.hour[0], ganzhi.hour[1]
  ];

  allGanZhi.forEach(gz => {
    const wuxing = TIANGAN_WUXING[gz] || DIZHI_WUXING[gz];
    if (wuxing) {
      energy[wuxing] += 1;
    }
  });

  return energy;
}

/**
 * 计算运势分数
 */
function calculateFortuneScore(jiuGong: DailyQimenJiuGongGe[]): number {
  let score = 50; // 基础分

  jiuGong.forEach(gong => {
    const starNature = STAR_AUSPICIOUS[gong.tianPan.star] || '平';
    const doorNature = DOOR_AUSPICIOUS[gong.renPan.door] || '平';
    const godNature = GOD_AUSPICIOUS[gong.shenPan.god] || '平';

    if (starNature === '吉') score += 5;
    else if (starNature === '凶') score -= 3;

    if (doorNature === '吉') score += 5;
    else if (doorNature === '凶') score -= 3;

    if (godNature === '吉') score += 3;
    else if (godNature === '凶') score -= 2;
  });

  return Math.max(20, Math.min(95, score));
}

/**
 * 获取运势等级
 */
function getLuckLevel(score: number): '吉' | '凶' | '平' {
  if (score >= 70) return '吉';
  if (score >= 40) return '平';
  return '凶';
}


/**
 * 计算各方面运势（简化版，只计算分数，描述由AI生成）
 */
function calculateAspectScores(jiuGong: DailyQimenJiuGongGe[], wuxingEnergy: Record<string, number>): {
  career: { score: number; description: string; advice: string };
  wealth: { score: number; description: string; advice: string };
  relationship: { score: number; description: string; advice: string };
  health: { score: number; description: string; advice: string };
} {
  const aspects = {
    career: { element: '火', base: 60, variance: 20 },
    wealth: { element: '金', base: 60, variance: 20 },
    relationship: { element: '木', base: 60, variance: 20 },
    health: { element: '水', base: 60, variance: 20 }
  };

  const result: Record<string, { score: number; description: string; advice: string }> = {};

  Object.entries(aspects).forEach(([key, config]) => {
    const elementEnergy = wuxingEnergy[config.element] || 0;
    const baseScore = config.base + (elementEnergy - 1) * 10;
    
    // 根据奇门格局调整分数
    let qimenBonus = 0;
    if (key === 'career') {
      // 事业看开门、天心星
      const kaiMenGong = jiuGong.find(g => g.renPan.door === '开门');
      const tianXinGong = jiuGong.find(g => g.tianPan.star === '天心');
      if (kaiMenGong) qimenBonus += 5;
      if (tianXinGong) qimenBonus += 5;
    } else if (key === 'wealth') {
      // 财富看生门、天禽星
      const shengMenGong = jiuGong.find(g => g.renPan.door === '生门');
      const tianQinGong = jiuGong.find(g => g.tianPan.star === '天禽');
      if (shengMenGong) qimenBonus += 5;
      if (tianQinGong) qimenBonus += 5;
    } else if (key === 'relationship') {
      // 感情看休门、天辅星
      const xiuMenGong = jiuGong.find(g => g.renPan.door === '休门');
      const tianFuGong = jiuGong.find(g => g.tianPan.star === '天辅');
      if (xiuMenGong) qimenBonus += 5;
      if (tianFuGong) qimenBonus += 5;
    } else if (key === 'health') {
      // 健康看天芮星
      const tianRuiGong = jiuGong.find(g => g.tianPan.star === '天芮');
      if (tianRuiGong) qimenBonus -= 5; // 天芮为病星，减分
    }
    
    const randomVariance = (Math.random() - 0.5) * config.variance;
    const score = Math.max(20, Math.min(95, Math.round(baseScore + qimenBonus + randomVariance)));
    
    result[key] = { 
      score,
      description: '', // 空描述，由AI生成
      advice: '' // 空建议，由AI生成
    };
  });

  return {
    career: result.career || { score: 60, description: '', advice: '' },
    wealth: result.wealth || { score: 60, description: '', advice: '' },
    relationship: result.relationship || { score: 60, description: '', advice: '' },
    health: result.health || { score: 60, description: '', advice: '' }
  };
}


/**
 * 日家奇门今日运势计算
 * 基于传统日家奇门法理，计算AI解读所需的核心数据
 * @param date 可选日期，默认为当前日期
 * @returns 日家奇门排盘数据
 */
export function calculateDailyFortune(date?: Date): DailyFortuneData {
  const targetDate = date || new Date();
  // 使用本地时间格式化，避免时区问题
  const dateStr = targetDate.getFullYear() + '-' + 
    String(targetDate.getMonth() + 1).padStart(2, '0') + '-' + 
    String(targetDate.getDate()).padStart(2, '0');
  const { timeInfo, ganzhi, timestamp } = getDivinationTime(targetDate);

  // 日家奇门排盘核心数据
  const { isYangDun, juShu, yuan } = getDailyQimenJuShu(timeInfo);
  const { zhiFu, zhiShi } = getDailyZhiFuZhiShi(ganzhi.day);
  const jiuGongGe = arrangeDailyQimenJiuGong(isYangDun, juShu, zhiFu, zhiShi, { day: ganzhi.day });
  
  // 传统奇门格局分析
  const qimenAnalysis = analyzeDailyQimenPattern(jiuGongGe, zhiFu, zhiShi);
  
  // 五行能量分析（传统法理）
  const wuxingEnergy = calculateWuxingEnergy(ganzhi);
  
  // 构建奇门时间信息
  const dailyQimenTimeInfo: DailyQimenTimeInfo = {
    solarTerm: timeInfo.jieQi,
    epoch: yuan,
    juShu,
    dunType: isYangDun ? '阳遁' : '阴遁',
    zhiFu,
    zhiShi
  };

  // 基于传统法理计算运势分数
  const overallScore = calculateFortuneScore(jiuGongGe);
  const aspectScores = calculateAspectScores(jiuGongGe, wuxingEnergy);

  // 生成传统幸运元素
  const luckyElements = generateTraditionalLuckyElements(jiuGongGe, ganzhi);

  return {
    date: dateStr,
    overall: {
      score: overallScore,
      description: '', // 由AI生成详细解读
      luck: getLuckLevel(overallScore)
    },
    aspects: {
      career: { score: aspectScores.career.score, description: '', advice: '' },
      wealth: { score: aspectScores.wealth.score, description: '', advice: '' },
      relationship: { score: aspectScores.relationship.score, description: '', advice: '' },
      health: { score: aspectScores.health.score, description: '', advice: '' }
    },
    lucky: luckyElements,
    timestamp,
    ganzhi,
    qimen: {
      timeInfo: dailyQimenTimeInfo,
      jiuGongGe,
      analysis: qimenAnalysis
    }
  };
}

/**
 * 生成传统幸运元素
 * 基于日家奇门法理生成幸运元素
 */
function generateTraditionalLuckyElements(jiuGong: DailyQimenJiuGongGe[], ganzhi: BaseGanZhi): {
  numbers: number[];
  colors: string[];
  directions: string[];
  time: string;
} {
  // 找出吉宫
  const auspiciousPalaces = jiuGong.filter(gong => {
    const starNature = STAR_AUSPICIOUS[gong.tianPan.star] || '平';
    const doorNature = DOOR_AUSPICIOUS[gong.renPan.door] || '平';
    return starNature === '吉' || doorNature === '吉';
  });

  // 幸运数字：基于吉宫宫位
  const numbers = auspiciousPalaces.length > 0 
    ? auspiciousPalaces.slice(0, 3).map(g => g.gong)
    : [1, 6, 8];

  // 幸运颜色：基于日干五行
  const dayGan = ganzhi.day.charAt(0);
  const dayGanWuxing = TIANGAN_WUXING[dayGan] || '木';
  
  const colorMap: Record<string, string[]> = {
    '金': ['白色', '金色', '银色'],
    '木': ['绿色', '青色', '碧色'],
    '水': ['黑色', '蓝色', '灰色'],
    '火': ['红色', '紫色', '橙色'],
    '土': ['黄色', '棕色', '褐色']
  };

  const colors = colorMap[dayGanWuxing].slice(0, 3);

  // 幸运方向：基于吉宫方向
  const directions = auspiciousPalaces.slice(0, 2).map(g => g.direction);

  // 幸运时辰：基于日支
  const dayZhi = ganzhi.day.charAt(1);
  const zhiTimeMap: Record<string, string> = {
    '子': '子时(23:00-01:00)', '丑': '丑时(01:00-03:00)', '寅': '寅时(03:00-05:00)', '卯': '卯时(05:00-07:00)',
    '辰': '辰时(07:00-09:00)', '巳': '巳时(09:00-11:00)', '午': '午时(11:00-13:00)', '未': '未时(13:00-15:00)',
    '申': '申时(15:00-17:00)', '酉': '酉时(17:00-19:00)', '戌': '戌时(19:00-21:00)', '亥': '亥时(21:00-23:00)'
  };

  const time = zhiTimeMap[dayZhi] || '辰时(07:00-09:00)';

  return {
    numbers,
    colors,
    directions,
    time
  };
}
