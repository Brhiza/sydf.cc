import { getSixAnimals, getVoidBranches } from '../../utils/lunar';
import { deriveHexagramSet } from './liuyao/hexagram-derivation';
import { findPalace, getNaJiaAndLiuQin } from './liuyao/palace';
import { getShiYing, getWorldAndResponseArray } from './liuyao/shi-ying';
import { getSpecialPattern } from './liuyao/special-pattern';

export function generateLiuyao(customDate?: Date) {
  const {
    timestamp,
    ganzhi,
    rawYaos,
    mainYaos,
    mainHexagram,
    changedHexagram,
    interHexagram,
  } = deriveHexagramSet(customDate);

  const palace = findPalace(mainHexagram.name);
  const yaosInfo = getNaJiaAndLiuQin(mainHexagram.name, palace);
  // 变卦的纳甲六亲始终以主卦宫位五行定位，故传 palace 而非 changedHexagram 所在宫
  const changedYaosInfo = getNaJiaAndLiuQin(changedHexagram.name, palace);
  const shiYing = getShiYing(mainHexagram.name, palace.name);
  const voids = getVoidBranches(ganzhi.day);
  const dayGan = ganzhi.day.substring(0, 1);
  const animals = getSixAnimals(dayGan);

  const changingYaosResult = rawYaos
    .map((yao, index) => ({
      position: index + 1,
      isChanging: yao === 6 || yao === 9,
      type: yao === 6 ? '老阴' : yao === 9 ? '老阳' : '静爻',
    }))
    .filter((yao) => yao.isChanging);

  const { specialPattern, specialAdvice, isChaotic, chaoticReason } = getSpecialPattern(
    changingYaosResult.length,
    mainHexagram.name
  );

  const yaosDetail = yaosInfo.map((info, index) => {
    const rawValue = rawYaos[index];
    const isChanging = rawValue === 6 || rawValue === 9;
    const changedInfo = isChanging ? changedYaosInfo[index] : null;
    return {
      position: index + 1,
      rawValue,
      yaoType: mainYaos[index],
      isChanging,
      changeType: rawValue === 6 ? '老阴' : rawValue === 9 ? '老阳' : '静爻',
      sixGod: animals[index],
      sixRelative: info.liuqin,
      najiaDizhi: info.dizhi,
      wuxing: info.wuxing,
      isWorld: shiYing.shi === index + 1,
      isResponse: shiYing.ying === index + 1,
      isVoid: voids.includes(info.dizhi),
      changedYao: changedInfo
        ? {
            dizhi: changedInfo.dizhi,
            wuxing: changedInfo.wuxing,
            liuqin: changedInfo.liuqin,
            isVoid: voids.includes(changedInfo.dizhi),
          }
        : null,
    };
  });

  return {
    originalName: mainHexagram.name,
    changedName: changedHexagram.name,
    interName: interHexagram.name,
    yaoArray: rawYaos,
    changingYaos: changingYaosResult,
    sixGods: animals,
    sixRelatives: yaosInfo.map((info) => info.liuqin),
    najiaDizhi: yaosInfo.map((info) => info.dizhi),
    wuxing: yaosInfo.map((info) => info.wuxing),
    worldAndResponse: getWorldAndResponseArray(shiYing),
    voidBranches: voids,
    palace,
    ganzhi,
    specialPattern,
    specialAdvice,
    isChaotic,
    chaoticReason,
    yaosDetail,
    timestamp,
  };
}
