import type { BaseGanZhi, DailyQimenJiuGongGe } from '../../../types/divination.ts';
import { DIZHI_WUXING, DOOR_AUSPICIOUS, GOD_AUSPICIOUS, STAR_AUSPICIOUS, TIANGAN_WUXING } from './constants.ts';

export interface AspectScore {
  score: number;
  description: string;
  advice: string;
}

export interface AspectScores {
  career: AspectScore;
  wealth: AspectScore;
  relationship: AspectScore;
  health: AspectScore;
}

const ASPECT_CONFIG = {
  career: { element: '火', base: 60, variance: 20 },
  wealth: { element: '金', base: 60, variance: 20 },
  relationship: { element: '木', base: 60, variance: 20 },
  health: { element: '水', base: 60, variance: 20 },
} as const;

type AspectKey = keyof typeof ASPECT_CONFIG;

function getDeterministicVariance(seedSource: string, key: AspectKey, variance: number): number {
  const seed = `${seedSource}:${key}`;
  let hash = 2166136261;

  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  const normalized = (hash >>> 0) / 0xffffffff;
  return (normalized - 0.5) * variance;
}

export function calculateWuxingEnergy(ganzhi: BaseGanZhi): Record<string, number> {
  const energy: Record<string, number> = { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 };

  const allGanZhi = [
    ganzhi.year[0], ganzhi.year[1],
    ganzhi.month[0], ganzhi.month[1],
    ganzhi.day[0], ganzhi.day[1],
    ganzhi.hour[0], ganzhi.hour[1],
  ];

  allGanZhi.forEach((gz) => {
    const wuxing = TIANGAN_WUXING[gz] || DIZHI_WUXING[gz];
    if (wuxing) {
      energy[wuxing] += 1;
    }
  });

  return energy;
}

export function calculateFortuneScore(jiuGong: DailyQimenJiuGongGe[]): number {
  let score = 50;

  jiuGong.forEach((gong) => {
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

export function getLuckLevel(score: number): '吉' | '凶' | '平' {
  if (score >= 70) return '吉';
  if (score >= 40) return '平';
  return '凶';
}

function getQimenBonus(key: AspectKey, jiuGong: DailyQimenJiuGongGe[]): number {
  if (key === 'career') {
    const kaiMenGong = jiuGong.find((g) => g.renPan.door === '开门');
    const tianXinGong = jiuGong.find((g) => g.tianPan.star === '天心');
    return (kaiMenGong ? 5 : 0) + (tianXinGong ? 5 : 0);
  }
  if (key === 'wealth') {
    const shengMenGong = jiuGong.find((g) => g.renPan.door === '生门');
    const tianQinGong = jiuGong.find((g) => g.tianPan.star === '天禽');
    return (shengMenGong ? 5 : 0) + (tianQinGong ? 5 : 0);
  }
  if (key === 'relationship') {
    const xiuMenGong = jiuGong.find((g) => g.renPan.door === '休门');
    const tianFuGong = jiuGong.find((g) => g.tianPan.star === '天辅');
    return (xiuMenGong ? 5 : 0) + (tianFuGong ? 5 : 0);
  }
  const tianRuiGong = jiuGong.find((g) => g.tianPan.star === '天芮');
  return tianRuiGong ? -5 : 0;
}

export function calculateAspectScores(
  jiuGong: DailyQimenJiuGongGe[],
  wuxingEnergy: Record<string, number>,
  seedSource: string
): AspectScores {
  const result = {} as Record<AspectKey, AspectScore>;

  (Object.entries(ASPECT_CONFIG) as [AspectKey, typeof ASPECT_CONFIG[AspectKey]][]).forEach(([key, config]) => {
    const elementEnergy = wuxingEnergy[config.element] || 0;
    const baseScore = config.base + (elementEnergy - 1) * 10;
    const qimenBonus = getQimenBonus(key, jiuGong);
    const deterministicVariance = getDeterministicVariance(seedSource, key, config.variance);
    const score = Math.max(20, Math.min(95, Math.round(baseScore + qimenBonus + deterministicVariance)));

    result[key] = { score, description: '', advice: '' };
  });

  return result;
}
