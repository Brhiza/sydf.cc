import type { DailyQimenJiuGongGe } from '../../types/divination.ts';
import { DOOR_AUSPICIOUS, GOD_AUSPICIOUS, STAR_AUSPICIOUS } from './constants.ts';

export interface DailyQimenAnalysis {
  zhiFuAnalysis: string;
  zhiShiAnalysis: string;
  palaceAnalysis: string;
  wuxingAnalysis: string;
  overallAnalysis: string;
}

const ELEMENT_INSIGHT: Record<string, string> = {
  木: '利于事业发展、开拓创新。',
  火: '利于人际交往、展现才华。',
  土: '利于稳定发展、积累财富。',
  金: '利于决断事务、提升权威。',
  水: '利于智慧发挥、灵活应变。',
};

function describeZhiFu(zhiFu: string): string {
  const nature = STAR_AUSPICIOUS[zhiFu] || '平';
  const label = nature === '吉' ? '吉星' : nature === '凶' ? '凶星' : '平星';
  const tail =
    nature === '吉'
      ? '主贵人相助，事事顺遂，利于进取。'
      : nature === '凶'
        ? '主有小人作祟，需谨慎行事，避免冲动。'
        : '主运势平稳，宜按部就班，不宜冒险。';
  return `值符为${zhiFu}，${label}，${tail}`;
}

function describeZhiShi(zhiShi: string): string {
  const nature = DOOR_AUSPICIOUS[zhiShi] || '平';
  const label = nature === '吉' ? '吉门' : nature === '凶' ? '凶门' : '平门';
  const tail =
    nature === '吉'
      ? '主机遇良好，宜主动把握，可望有成。'
      : nature === '凶'
        ? '主阻碍较多，宜守不宜攻，静待时机。'
        : '主时运一般，宜稳中求进，不可急躁。';
  return `值使为${zhiShi}，${label}，${tail}`;
}

function isAuspiciousGong(gong: DailyQimenJiuGongGe): boolean {
  return (
    (STAR_AUSPICIOUS[gong.tianPan.star] || '平') === '吉' ||
    (DOOR_AUSPICIOUS[gong.renPan.door] || '平') === '吉' ||
    (GOD_AUSPICIOUS[gong.shenPan.god] || '平') === '吉'
  );
}

function isInauspiciousGong(gong: DailyQimenJiuGongGe): boolean {
  return (
    (STAR_AUSPICIOUS[gong.tianPan.star] || '平') === '凶' ||
    (DOOR_AUSPICIOUS[gong.renPan.door] || '平') === '凶' ||
    (GOD_AUSPICIOUS[gong.shenPan.god] || '平') === '凶'
  );
}

function describePalace(auspicious: number, inauspicious: number): string {
  const head = `今日格局中，吉宫有${auspicious}个，凶宫有${inauspicious}个。`;
  if (auspicious > inauspicious) {
    return `${head}整体格局偏吉，宜积极行动。`;
  }
  if (inauspicious > auspicious) {
    return `${head}整体格局偏凶，宜谨慎保守。`;
  }
  return `${head}格局吉凶相当，宜平衡行事。`;
}

function describeWuxing(dominantElements: string[]): string {
  if (dominantElements.length === 0) {
    return '今日五行分布较为均衡，各方面发展机会均等。';
  }
  const tail = dominantElements
    .map((element) => ELEMENT_INSIGHT[element] || '')
    .filter(Boolean)
    .join('');
  return `今日五行以${dominantElements.join('、')}为主，${tail}`;
}

function describeOverall(totalScore: number): string {
  if (totalScore >= 70) {
    return '今日运势较佳，宜把握机遇，积极进取。各方面都有不错的发展机会，特别是事业和财运方面。建议主动出击，不要错失良机。';
  }
  if (totalScore >= 50) {
    return '今日运势平稳，宜保持平常心，稳中求进。虽然不会有大的突破，但也不会有大的阻碍。适合处理日常事务，为未来发展做准备。';
  }
  return '今日运势一般，宜谨慎行事，避免冒险。可能会遇到一些小的阻碍，需要保持耐心和冷静。建议以守为主，不宜做重大决定。';
}

export function analyzeDailyQimenPattern(
  jiuGong: DailyQimenJiuGongGe[],
  zhiFu: string,
  zhiShi: string
): DailyQimenAnalysis {
  const auspiciousPalaces = jiuGong.filter(isAuspiciousGong);
  const inauspiciousPalaces = jiuGong.filter(isInauspiciousGong);

  const wuxingCount: Record<string, number> = { 金: 0, 木: 0, 水: 0, 火: 0, 土: 0 };
  jiuGong.forEach((gong) => {
    wuxingCount[gong.element]++;
  });
  const dominantElements = Object.entries(wuxingCount)
    .filter(([, count]) => count >= 2)
    .map(([element]) => element);

  const totalScore = auspiciousPalaces.length * 10 - inauspiciousPalaces.length * 5 + 50;

  return {
    zhiFuAnalysis: describeZhiFu(zhiFu),
    zhiShiAnalysis: describeZhiShi(zhiShi),
    palaceAnalysis: describePalace(auspiciousPalaces.length, inauspiciousPalaces.length),
    wuxingAnalysis: describeWuxing(dominantElements),
    overallAnalysis: describeOverall(totalScore),
  };
}
