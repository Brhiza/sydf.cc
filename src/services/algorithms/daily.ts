/**
 * @file 日家奇门今日运势算法服务
 * @description 日家奇门以日干支为核心，一日一局，主要用于预测一日之内的运势变化。
 * 起局方法与时家奇门有显著区别，更注重整体趋势。
 */
import { generateQimen } from 'mingyu-core/divination/qimen';
import { DEFAULT_QIMEN_METHOD } from '@/shared/qimen-settings';
import type { DailyFortuneData, DailyQimenJiuGongGe, DailyQimenTimeInfo } from '../../types/divination.ts';
import { getDivinationTime } from '../../utils/timeManager.ts';
import { analyzeDailyQimenPattern } from './daily/pattern-analysis.ts';
import {
  calculateAspectScores,
  calculateFortuneScore,
  calculateWuxingEnergy,
  getLuckLevel,
} from './daily/scoring.ts';
import { generateTraditionalLuckyElements } from './daily/lucky-elements.ts';

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
 * 日家奇门今日运势计算
 * @param date 可选日期，默认为当前日期
 * @returns 日家奇门排盘数据
 */
export function calculateDailyFortune(date?: Date): DailyFortuneData {
  const targetDate = date || new Date();
  const dateStr = formatLocalDate(targetDate);
  const { timeInfo, ganzhi, timestamp } = getDivinationTime(targetDate);

  const qimenData = generateQimen(targetDate, DEFAULT_QIMEN_METHOD, 'day');
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
