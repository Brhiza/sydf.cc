/**
 * @file 今日运势数据组装服务
 * @description 排盘统一来自 mingyu-core，这里只负责把日家奇门结果整理成页面和 AI 提示词需要的数据。
 */
import { generateMingyuDailyQimen } from '@/shared/mingyu-divination';
import type {
  DailyFortuneData,
  DailyQimenJiuGongGe,
  DailyQimenTimeInfo,
} from '../../types/divination.ts';
import { getDivinationTime } from '../../utils/timeManager.ts';
import { analyzeDailyQimenPattern } from './pattern-analysis.ts';
import {
  calculateAspectScores,
  calculateFortuneScore,
  calculateWuxingEnergy,
  getLuckLevel,
} from './scoring.ts';
import { generateTraditionalLuckyElements } from './lucky-elements.ts';

function formatLocalDate(date: Date): string {
  return (
    date.getFullYear() +
    '-' +
    String(date.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(date.getDate()).padStart(2, '0')
  );
}

function mapDailyQimenJiuGong(jiuGongGe: DailyQimenJiuGongGe[]): DailyQimenJiuGongGe[] {
  return jiuGongGe.map((gong) => ({
    gong: gong.gong,
    name: gong.name,
    direction: gong.direction,
    element: gong.element,
    tianPan: { ...gong.tianPan },
    diPan: { ...gong.diPan },
    renPan: { ...gong.renPan },
    shenPan: { ...gong.shenPan },
  }));
}

/**
 * 生成今日运势数据。
 * @param date 可选日期，默认为当前日期
 * @returns 已合并日家奇门排盘和展示派生字段的今日运势数据
 */
export function calculateDailyFortune(date?: Date): DailyFortuneData {
  const targetDate = date || new Date();
  const dateStr = formatLocalDate(targetDate);
  const { timeInfo, ganzhi, timestamp } = getDivinationTime(targetDate);

  const qimenData = generateMingyuDailyQimen(targetDate);
  const { isYangDun, juShu, zhiFu, zhiShi } = qimenData;
  const jiuGongGe = mapDailyQimenJiuGong(qimenData.jiuGongGe);

  const qimenAnalysis = analyzeDailyQimenPattern(jiuGongGe, zhiFu, zhiShi);
  const wuxingEnergy = calculateWuxingEnergy(ganzhi);

  const dailyQimenTimeInfo: DailyQimenTimeInfo = {
    solarTerm: qimenData.timeInfo.solarTerm || timeInfo.jieQi,
    epoch: qimenData.timeInfo.epoch,
    juShu,
    dunType: isYangDun ? '阳遁' : '阴遁',
    zhiFu,
    zhiShi,
  };

  const overallScore = calculateFortuneScore(jiuGongGe);
  const aspectScores = calculateAspectScores(jiuGongGe, wuxingEnergy, `${dateStr}:${ganzhi.day}`);
  const luckyElements = generateTraditionalLuckyElements(jiuGongGe, ganzhi);

  return {
    date: dateStr,
    overall: {
      score: overallScore,
      description: '',
      luck: getLuckLevel(overallScore),
    },
    aspects: {
      career: { score: aspectScores.career.score, description: '', advice: '' },
      wealth: { score: aspectScores.wealth.score, description: '', advice: '' },
      relationship: { score: aspectScores.relationship.score, description: '', advice: '' },
      health: { score: aspectScores.health.score, description: '', advice: '' },
    },
    lucky: luckyElements,
    timestamp,
    ganzhi,
    qimen: {
      timeInfo: dailyQimenTimeInfo,
      jiuGongGe,
      analysis: qimenAnalysis,
    },
  };
}
