import { formatDateTime, formatGanZhi } from '@/utils/date-formatter';
import type { QimenData, QimenJiuGongGe, SupplementaryInfo } from '@/types/divination';
import { createQimenPriorityPalaces } from '@/utils/qimen-guidance';
import { formatQimenScopeLabel } from '@/shared/qimen-settings';

const QIMEN_GONG_ORDER = [4, 9, 2, 3, 5, 7, 8, 1, 6];
const GONG_POSITION_CLASSES = [
  'top-left',
  'top-center',
  'top-right',
  'middle-left',
  'middle-center',
  'middle-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];

export interface QimenInfoItem {
  label: string;
  value: string;
}

function createCompactPatternValue(patternTags: string[] | undefined): string {
  if (!patternTags?.length) {
    return '';
  }

  const counts = new Map<string, number>();
  const ordered: string[] = [];

  const normalize = (tag: string): string => {
    if (tag.startsWith('门迫')) return '门迫';
    if (tag.startsWith('击刑')) return '击刑';
    return tag;
  };

  patternTags.forEach((tag) => {
    const normalized = normalize(tag);
    counts.set(normalized, (counts.get(normalized) || 0) + 1);
    if (!ordered.includes(normalized)) {
      ordered.push(normalized);
    }
  });

  return ordered
    .map((tag) => {
      const count = counts.get(tag) || 0;
      return count > 1 ? `${tag}×${count}` : tag;
    })
    .join('、');
}

export function arrangeQimenGongs(gongs: QimenJiuGongGe[] | undefined): QimenJiuGongGe[] {
  if (!gongs?.length) {
    return [];
  }

  const gongMap = new Map(gongs.map((gong) => [gong.gong, gong]));

  return QIMEN_GONG_ORDER.map((gongNumber) => gongMap.get(gongNumber)).filter(
    (gong): gong is QimenJiuGongGe => !!gong
  );
}

export function getQimenGongClass(index: number): string {
  return GONG_POSITION_CLASSES[index] || '';
}

export function isCenterGong(gong: Pick<QimenJiuGongGe, 'gong' | 'name'>): boolean {
  return gong.gong === 5 || gong.name.includes('中五宫');
}

export function createQimenInfoItems(
  data: QimenData,
  options?: {
    question?: string;
    supplementaryInfo?: SupplementaryInfo;
  }
): QimenInfoItem[] {
  const items: QimenInfoItem[] = [
    {
      label: '起卦时间',
      value: formatDateTime(data.timeInfo, data.timestamp),
    },
    {
      label: '干支信息',
      value: formatGanZhi(data.ganzhi),
    },
    {
      label: '遁甲局数',
      value: `${data.isYangDun ? '阳遁' : '阴遁'}${data.juShu}局`,
    },
    {
      label: '排盘级别',
      value: formatQimenScopeLabel(data.scope),
    },
    {
      label: '值符值使',
      value: `${data.zhiFu} ${data.zhiShi}`,
    },
  ];

  if (data.specialConditions?.description) {
    items.push({
      label: '特殊时辰',
      value: data.specialConditions.description,
    });
  }

  const voidValue = [
    data.voidBranches?.length ? `空亡${data.voidBranches.join('、')}` : '',
    data.voidPalaces?.length
      ? `落${data.voidPalaces.map((item) => `${item.name}${item.branch}`).join('、')}`
      : '',
  ]
    .filter(Boolean)
    .join('，');
  if (voidValue) {
    items.push({
      label: '旬空',
      value: voidValue,
    });
  }

  if (data.horseStar) {
    items.push({
      label: '驿马',
      value: `${data.horseStar.sourceBranch}马在${data.horseStar.branch}，落${data.horseStar.name}`,
    });
  }

  const compactPatternValue = createCompactPatternValue(data.patternTags);
  if (compactPatternValue) {
    items.push({
      label: '格局标签',
      value: compactPatternValue,
    });
  }

  const classicPatternValue = data.classicPatterns
    ?.slice(0, 3)
    .map((item) => item.name)
    .join('、');
  if (classicPatternValue) {
    items.push({
      label: '经典格局',
      value: classicPatternValue,
    });
  }

  if (data.yingQi) {
    items.push({
      label: '应期参考',
      value: `${data.yingQi.rhythm}，约${data.yingQi.minDays}-${data.yingQi.maxDays}天：${data.yingQi.description}`,
    });
  }

  const directionValue = [
    data.directions?.goodDirections?.[0]
      ? `宜${data.directions.goodDirections[0].direction}（${data.directions.goodDirections[0].use}）`
      : '',
    data.directions?.avoidDirections?.[0]
      ? `避${data.directions.avoidDirections[0].direction}（${data.directions.avoidDirections[0].use}）`
      : '',
  ]
    .filter(Boolean)
    .join('；');
  if (directionValue) {
    items.push({
      label: '方位建议',
      value: directionValue,
    });
  }

  const focusPalaces = createQimenPriorityPalaces(
    options?.question,
    data,
    options?.supplementaryInfo
  )
    .slice(0, 2)
    .map((item) => `${item.name}（${item.score}分）`);

  if (focusPalaces.length > 0) {
    items.push({
      label: '问事焦点',
      value: focusPalaces.join('、'),
    });
  }

  return items;
}
