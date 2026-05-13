import { palaceHexagrams } from '../../../config/divination-data';

export interface ShiYing {
  shi: number;
  ying: number;
}

const PALACE_ORDER = ['首卦', '一世', '二世', '三世', '四世', '五世', '游魂', '归魂'] as const;
const SHI_YAO_BY_ORDER: Record<(typeof PALACE_ORDER)[number], number> = {
  首卦: 6,
  一世: 1,
  二世: 2,
  三世: 3,
  四世: 4,
  五世: 5,
  游魂: 4,
  归魂: 3,
};

export function getShiYing(hexagramName: string, palaceName: string): ShiYing {
  const hexagramsInPalace = palaceHexagrams[palaceName as keyof typeof palaceHexagrams];
  if (!hexagramsInPalace) {
    throw new Error(`找不到宫位 "${palaceName}" 的卦象列表。`);
  }

  const generation = hexagramsInPalace.indexOf(hexagramName);
  if (generation === -1) {
    throw new Error(`卦象 "${hexagramName}" 不在宫位 "${palaceName}" 的列表中。`);
  }

  const shiYao = SHI_YAO_BY_ORDER[PALACE_ORDER[generation]];
  const yingYao = shiYao + 3 > 6 ? shiYao - 3 : shiYao + 3;
  return { shi: shiYao, ying: yingYao };
}

export function getWorldAndResponseArray(shiYing: ShiYing): string[] {
  const result = ['', '', '', '', '', ''];
  result[shiYing.shi - 1] = '世';
  result[shiYing.ying - 1] = '应';
  return result;
}
