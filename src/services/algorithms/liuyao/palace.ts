import {
  hexagramNaJia,
  hexagramPalaceMap,
  liuqinRelations,
  palaces,
  wuxing,
} from '../../../config/divination-data';

export interface Palace {
  name: string;
  wuxing: string;
}

export interface YaoInfo {
  dizhi: string;
  wuxing: string;
  liuqin: string;
}

export function findPalace(hexagramName: string): Palace {
  const palaceName = hexagramPalaceMap[hexagramName as keyof typeof hexagramPalaceMap];
  return palaces[palaceName as keyof typeof palaces];
}

export function getNaJiaAndLiuQin(mainHexagramName: string, palace: Palace): YaoInfo[] {
  const najiaDizhiArray = hexagramNaJia[mainHexagramName];
  if (!najiaDizhiArray) {
    throw new Error(`找不到卦象 "${mainHexagramName}" 的纳甲信息。`);
  }

  const yaosWithInfo: YaoInfo[] = [];
  for (let i = 0; i < 6; i++) {
    const dizhi = najiaDizhiArray[i];
    const yaoWuxing =
      Object.keys(wuxing).find((key) => wuxing[key as keyof typeof wuxing].includes(dizhi)) || '';
    const liuqin =
      liuqinRelations[palace.wuxing as keyof typeof liuqinRelations][
        yaoWuxing as keyof (typeof liuqinRelations)[keyof typeof liuqinRelations]
      ];
    yaosWithInfo.push({ dizhi, wuxing: yaoWuxing, liuqin });
  }
  return yaosWithInfo;
}
