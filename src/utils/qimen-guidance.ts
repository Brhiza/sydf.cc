import type { QimenData, QimenJiuGongGe } from '@/types/divination';

export interface QimenPriorityPalace {
  gong: number;
  name: string;
  score: number;
  reasons: string[];
}

function createPalaceMap(data: QimenData): Map<number, QimenJiuGongGe> {
  return new Map((data.jiuGongGe || []).map((gong) => [gong.gong, gong]));
}

function addScore(
  priorityMap: Map<number, QimenPriorityPalace>,
  palaceMap: Map<number, QimenJiuGongGe>,
  gongNumber: number,
  score: number,
  reason: string
) {
  const gong = palaceMap.get(gongNumber);
  if (!gong) return;

  const existing = priorityMap.get(gongNumber);
  if (existing) {
    existing.score += score;
    existing.reasons.push(reason);
    return;
  }

  priorityMap.set(gongNumber, {
    gong: gong.gong,
    name: gong.name,
    score,
    reasons: [reason],
  });
}

function getInsightScore(level: '有利' | '风险' | '关注'): number {
  switch (level) {
    case '关注':
      return 28;
    case '有利':
      return 24;
    case '风险':
      return 20;
    default:
      return 0;
  }
}

function findPatternPalaces(tag: string, gongs: QimenJiuGongGe[]): QimenJiuGongGe[] {
  return gongs.filter((gong) => tag.includes(`（${gong.name}`) || tag.includes(`落${gong.name}`));
}

export function createQimenPriorityPalaces(data: QimenData): QimenPriorityPalace[] {
  const palaceMap = createPalaceMap(data);
  const priorityMap = new Map<number, QimenPriorityPalace>();
  const allGongs = Array.from(palaceMap.values());

  data.palaceInsights?.forEach((insight) => {
    addScore(
      priorityMap,
      palaceMap,
      insight.gong,
      getInsightScore(insight.level),
      `${insight.level}:${insight.summary}`
    );
  });

  data.patternDetails?.forEach((detail) => {
    findPatternPalaces(detail.tag, allGongs).forEach((gong) => {
      addScore(priorityMap, palaceMap, gong.gong, 15, detail.tag);
    });
  });

  return Array.from(priorityMap.values())
    .map((item) => ({
      ...item,
      reasons: Array.from(new Set(item.reasons)),
    }))
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.gong - b.gong;
    });
}
