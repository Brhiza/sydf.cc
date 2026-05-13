import { qimen } from '../../../config/divination-data';
import { getDoorElement, getOppositePalace, isElementKe } from './element-utils';
import type { JiuGongCell } from './arrange';

const { palaceStars, doorPalaceMap } = qimen;

const RISK_DOORS = new Set(['死门', '伤门', '惊门']);
const GOOD_DOORS = new Set(['开门', '生门', '休门']);
const RISK_GODS = new Set(['白虎', '玄武', '螣蛇']);
const GOOD_GODS = new Set(['值符', '六合', '九天', '太阴']);

const JI_XING_MAP: Record<string, number> = {
  戊: 3,
  己: 2,
  庚: 8,
  辛: 9,
  壬: 4,
  癸: 4,
};

function getMenPoTags(jiuGongGe: JiuGongCell[]): string[] {
  return jiuGongGe
    .filter((gong) => gong.renPan.door)
    .filter((gong) => isElementKe(getDoorElement(gong.renPan.door), gong.element))
    .map((gong) => `门迫（${gong.name}${gong.renPan.door}）`);
}

function getJiXingTag(stem: string, landingPalace: number, palaceName: string): string | null {
  if (JI_XING_MAP[stem] === landingPalace) {
    return `击刑（时干${stem}落${palaceName}）`;
  }
  return null;
}

export interface QimenPatternArgs {
  zhiFu: string;
  zhiShi: string;
  zhiFuLandingPalace: number;
  zhiShiLandingPalace: number;
  jiuGongGe: JiuGongCell[];
  hourGanForFind: string;
}

export function getQimenPatternTags(args: QimenPatternArgs): string[] {
  const tags: string[] = [];
  const zhiFuOriginalPalace = palaceStars.indexOf(args.zhiFu) + 1;
  const zhiShiOriginalPalace = doorPalaceMap[args.zhiShi as keyof typeof doorPalaceMap] || 0;

  if (args.zhiFuLandingPalace === zhiFuOriginalPalace) {
    tags.push('星伏吟');
  } else if (getOppositePalace(zhiFuOriginalPalace) === args.zhiFuLandingPalace) {
    tags.push('星反吟');
  }

  if (args.zhiShiLandingPalace === zhiShiOriginalPalace) {
    tags.push('门伏吟');
  } else if (getOppositePalace(zhiShiOriginalPalace) === args.zhiShiLandingPalace) {
    tags.push('门反吟');
  }

  tags.push(...getMenPoTags(args.jiuGongGe));

  const zhiFuLandingGong = args.jiuGongGe.find((gong) => gong.gong === args.zhiFuLandingPalace);
  const jiXingTag = zhiFuLandingGong
    ? getJiXingTag(args.hourGanForFind, args.zhiFuLandingPalace, zhiFuLandingGong.name)
    : null;
  if (jiXingTag) {
    tags.push(jiXingTag);
  }

  return tags;
}

export interface PalaceInsight {
  gong: number;
  name: string;
  level: '有利' | '风险' | '关注';
  summary: string;
}

export interface PalaceInsightArgs {
  jiuGongGe: JiuGongCell[];
  zhiFu: string;
  zhiShi: string;
  patternTags: string[];
}

export function buildPalaceInsights(args: PalaceInsightArgs): PalaceInsight[] {
  return args.jiuGongGe.flatMap((gong) => {
    const insights: PalaceInsight[] = [];

    const relatedTags = args.patternTags.filter(
      (tag) => tag.includes(`（${gong.name}`) || tag.includes(`落${gong.name}`)
    );
    if (relatedTags.length > 0) {
      insights.push({
        gong: gong.gong,
        name: gong.name,
        level: '风险',
        summary: `该宫带有${relatedTags.join('、')}，行事阻滞和牵制较明显。`,
      });
    } else if (RISK_DOORS.has(gong.renPan.door) || RISK_GODS.has(gong.shenPan.god)) {
      const reasons = [
        RISK_DOORS.has(gong.renPan.door) ? gong.renPan.door : '',
        RISK_GODS.has(gong.shenPan.god) ? gong.shenPan.god : '',
      ].filter(Boolean);
      insights.push({
        gong: gong.gong,
        name: gong.name,
        level: '风险',
        summary: `${reasons.join('、')}同宫，宜防阻力、口舌或反复。`,
      });
    }

    if (gong.tianPan.star === args.zhiFu || gong.renPan.door === args.zhiShi) {
      const focusParts = [
        gong.tianPan.star === args.zhiFu ? `值符落${gong.name}` : '',
        gong.renPan.door === args.zhiShi ? `值使门在${gong.name}` : '',
      ].filter(Boolean);
      insights.push({
        gong: gong.gong,
        name: gong.name,
        level: '关注',
        summary: `${focusParts.join('，')}，是当前局的核心观察位。`,
      });
    }

    if (GOOD_DOORS.has(gong.renPan.door) || GOOD_GODS.has(gong.shenPan.god)) {
      const goodParts = [
        GOOD_DOORS.has(gong.renPan.door) ? gong.renPan.door : '',
        GOOD_GODS.has(gong.shenPan.god) ? gong.shenPan.god : '',
      ].filter(Boolean);
      insights.push({
        gong: gong.gong,
        name: gong.name,
        level: '有利',
        summary: `${goodParts.join('、')}同宫，可作为推进、求助或争取资源的优先方位。`,
      });
    }

    return insights;
  });
}
