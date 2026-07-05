import type { SupplementaryInfo } from '@/types';
import { formatQimenSettingsLabel } from '@/shared/qimen-settings';

const CHINESE_ZODIACS = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];

interface SupplementaryInfoLineOptions {
  includeAgeAndZodiac?: boolean;
  includeDayPillar?: boolean;
  delimiter?: string;
}

export function getChineseZodiac(birthYear: number): string {
  const index = (birthYear - 4) % 12;
  return CHINESE_ZODIACS[index];
}

export function buildSupplementaryInfoLines(
  supplementaryInfo?: SupplementaryInfo,
  options: SupplementaryInfoLineOptions = {}
): string[] {
  if (!supplementaryInfo || Object.keys(supplementaryInfo).length === 0) {
    return [];
  }

  const { includeAgeAndZodiac = false, includeDayPillar = true, delimiter = ': ' } = options;
  const { gender, birthYear, interpretationStyle, outputLength, dayPillar } = supplementaryInfo;
  const infoParts: string[] = [];

  if (gender) {
    infoParts.push(`性别${delimiter}${gender}`);
  }

  if (birthYear) {
    if (includeAgeAndZodiac) {
      const age = new Date().getFullYear() - birthYear;
      const zodiac = getChineseZodiac(birthYear);
      infoParts.push(`出生年份${delimiter}${birthYear}年（${age}岁，${zodiac}）`);
    } else {
      infoParts.push(`出生年份${delimiter}${birthYear}`);
    }
  }

  if (includeDayPillar && dayPillar) {
    infoParts.push(`日柱${delimiter}${dayPillar.heavenlyStem}${dayPillar.earthlyBranch}`);
  }

  if (interpretationStyle) {
    infoParts.push(`解读风格${delimiter}${interpretationStyle}`);
  }

  if (outputLength) {
    infoParts.push(`输出长度${delimiter}${outputLength}`);
  }

  if (supplementaryInfo.qimenSettings) {
    infoParts.push(`奇门排盘${delimiter}${formatQimenSettingsLabel(supplementaryInfo.qimenSettings)}`);
  }

  return infoParts;
}

/**
 * 格式化补充信息
 */
export function formatSupplementaryInfo(supplementaryInfo?: SupplementaryInfo): string {
  const infoParts = buildSupplementaryInfoLines(supplementaryInfo);

  if (infoParts.length > 0) {
    return `**补充信息**：${infoParts.join('，')}`;
  }

  return '';
}

