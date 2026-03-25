import type { MeihuaData, MeihuaYaoDetail } from '@/types/divination';

const INTER_YAO_MAPPING = [2, 3, 4, 3, 4, 5];
const YAO_POSITION_NAMES = ['初', '二', '三', '四', '五', '上'];

export type MeihuaDisplayYaoDetail = MeihuaYaoDetail;
export type MeihuaTrigramInfo = Pick<NonNullable<MeihuaData['interHexagram']>, 'upper' | 'lower'>;

export function getYaoPositionName(position: number): string {
  return YAO_POSITION_NAMES[position - 1] || '未知';
}

export function getInterYaoType(
  yaosDetail: MeihuaYaoDetail[] | undefined,
  position: number,
  hasInterHexagram: boolean
): '阳' | '阴' {
  if (!hasInterHexagram || !yaosDetail || yaosDetail.length < 6) {
    return '阳';
  }

  const mainYaoPosition = INTER_YAO_MAPPING[position - 1];
  if (!mainYaoPosition) {
    return '阳';
  }

  return yaosDetail[mainYaoPosition - 1]?.yaoType || '阳';
}

export function getTrigramInfo(
  position: number,
  hexagram?: MeihuaTrigramInfo | null
): string {
  if (!hexagram) {
    return '';
  }

  return position <= 3 ? hexagram.lower : hexagram.upper;
}
