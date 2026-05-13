/**
 * @file 梅花易数排盘算法
 * @description 基于邵雍（康节）先生所传之《梅花易数》，实现年月日时、数字、随机、外应四类起卦法。
 * @流派 邵氏心易
 * @核心思想
 * 1. 以数起卦：将农历的年、月、日、时辰之数，通过特定运算转换为八卦。
 *    - (年支序 + 月 + 日) % 8  => 上卦
 *    - (年支序 + 月 + 日 + 时支序) % 8 => 下卦
 *    - (年支序 + 月 + 日 + 时支序) % 6 => 动爻
 * 2. 定体用：此乃梅花心法之灵魂。以动爻所在的经卦为"用"，静止的另一经卦为"体"。
 * 3. 论生克：以体卦为中心（我），分析用卦、互卦、变卦对体卦的五行生克关系，以此判断吉凶。
 *    - 生体为吉，克体为凶。体用比和，事顺。
 *    - 用为事之始，互为事之中，变为事之终。
 */
import type { MeihuaData, MeihuaSettings } from '@/types/divination';
import { MeihuaHelpers } from '../../utils/divination-helpers';
import { getDivinationTime } from '../../utils/timeManager';
import {
  findHexagramByTrigrams,
  findTrigramByLines,
  resolveTiYongByMovingYao,
  trigrams,
} from './meihua/hexagram-utils';
import {
  resolveExternalMethod,
  resolveNumberMethod,
  resolveRandomMethod,
  resolveTimeMethod,
  type MeihuaMethodResult,
} from './meihua/methods';

function pickMethodResult(
  method: MeihuaSettings['method'],
  ganzhi: ReturnType<typeof getDivinationTime>['ganzhi'],
  lunar: ReturnType<typeof getDivinationTime>['timeInfo']['lunar'],
  settings?: MeihuaSettings
): MeihuaMethodResult {
  switch (method) {
    case 'number':
      return resolveNumberMethod(settings?.number || 0);
    case 'random':
      return resolveRandomMethod();
    case 'external':
      return resolveExternalMethod(settings?.externalOmens);
    case 'time':
    default:
      return resolveTimeMethod(ganzhi, lunar);
  }
}

export function generateMeihua(customDate?: Date, settings?: MeihuaSettings): MeihuaData {
  const { ganzhi, timeInfo, timestamp } = getDivinationTime(customDate);
  const { lunar } = timeInfo;
  const method = settings?.method || 'time';

  const { upperTrigramIndex, lowerTrigramIndex, movingYaoIndex, calculation } = pickMethodResult(
    method,
    ganzhi,
    lunar,
    settings
  );

  const upperTrigram = trigrams[upperTrigramIndex];
  const lowerTrigram = trigrams[lowerTrigramIndex];
  const mainHexagram = findHexagramByTrigrams(upperTrigramIndex, lowerTrigramIndex);

  const mainLines = [...lowerTrigram.lines, ...upperTrigram.lines];

  const interLowerResult = findTrigramByLines(mainLines.slice(1, 4));
  const interUpperResult = findTrigramByLines(mainLines.slice(2, 5));
  const interHexagram =
    interLowerResult && interUpperResult
      ? findHexagramByTrigrams(interUpperResult.index, interLowerResult.index)
      : null;

  const changedLines = [...mainLines];
  changedLines[movingYaoIndex - 1] = 1 - changedLines[movingYaoIndex - 1];

  const changedLowerResult = findTrigramByLines(changedLines.slice(0, 3));
  const changedUpperResult = findTrigramByLines(changedLines.slice(3, 6));
  const changingHexagram =
    changedLowerResult && changedUpperResult
      ? findHexagramByTrigrams(changedUpperResult.index, changedLowerResult.index)
      : null;

  const { tiGua, yongGua } = resolveTiYongByMovingYao(upperTrigram, lowerTrigram, movingYaoIndex);
  const changedTiYong =
    changedUpperResult && changedLowerResult
      ? resolveTiYongByMovingYao(
          changedUpperResult.trigram,
          changedLowerResult.trigram,
          movingYaoIndex
        )
      : null;

  const yaosDetail = mainLines.map((line, index) => ({
    position: index + 1,
    yaoType: (line === 1 ? '阳' : '阴') as '阳' | '阴',
    isChanging: index === movingYaoIndex - 1,
    tiYong: ((index < 3 ? lowerTrigram.name : upperTrigram.name) === tiGua.name ? '体' : '用') as
      | '体'
      | '用',
  }));

  // 四时旺衰优先以节气划分；若节气异常缺失，再回退到农历月粗分四季。
  const seasonByJieQi = MeihuaHelpers.getSeasonByJieQi(timeInfo.jieQi);
  const season =
    seasonByJieQi !== '未知' ? seasonByJieQi : MeihuaHelpers.getSeasonByMonth(lunar.monthNumber);
  const tiSeasonState = MeihuaHelpers.getElementSeasonState(tiGua.element, season);
  const yongSeasonState = MeihuaHelpers.getElementSeasonState(yongGua.element, season);

  return {
    originalName: mainHexagram.name,
    changedName: changingHexagram?.name || '',
    interName: interHexagram?.name || '',

    tiGua: { name: tiGua.name, element: tiGua.element, nature: tiGua.nature },
    yongGua: { name: yongGua.name, element: yongGua.element, nature: yongGua.nature },
    changedTiGua: changedTiYong
      ? {
          name: changedTiYong.tiGua.name,
          element: changedTiYong.tiGua.element,
          nature: changedTiYong.tiGua.nature,
        }
      : null,
    changedYongGua: changedTiYong
      ? {
          name: changedTiYong.yongGua.name,
          element: changedTiYong.yongGua.element,
          nature: changedTiYong.yongGua.nature,
        }
      : null,

    mainHexagram: {
      name: mainHexagram.name,
      symbol: mainHexagram.symbol,
      upper: upperTrigram.name,
      lower: lowerTrigram.name,
      description: mainHexagram.description,
    },
    changedHexagram: changingHexagram
      ? {
          name: changingHexagram.name,
          symbol: changingHexagram.symbol,
          upper: changedUpperResult?.trigram?.name || '',
          lower: changedLowerResult?.trigram?.name || '',
          description: changingHexagram.description,
        }
      : null,
    interHexagram: interHexagram
      ? {
          name: interHexagram.name,
          symbol: interHexagram.symbol,
          upper: interUpperResult?.trigram?.name || '',
          lower: interLowerResult?.trigram?.name || '',
          description: interHexagram.description,
        }
      : null,

    movingYao: {
      position: movingYaoIndex,
      description: `第${movingYaoIndex}爻动`,
      yaoName: ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻'][movingYaoIndex - 1] || '未知',
    },

    analysis: {
      season,
      tiYongRelation: MeihuaHelpers.getElementRelation(yongGua.element, tiGua.element),
      tiSeasonState,
      yongSeasonState,
      inter1Relation: interLowerResult
        ? MeihuaHelpers.getElementRelation(interLowerResult.trigram.element, tiGua.element)
        : '无',
      inter2Relation: interUpperResult
        ? MeihuaHelpers.getElementRelation(interUpperResult.trigram.element, tiGua.element)
        : '无',
      changedRelation: changedTiYong
        ? MeihuaHelpers.getElementRelation(
            changedTiYong.yongGua.element,
            changedTiYong.tiGua.element
          )
        : '无变卦',
      changedTiYongRelation: changedTiYong
        ? MeihuaHelpers.getElementRelation(
            changedTiYong.yongGua.element,
            changedTiYong.tiGua.element
          )
        : '无变卦',
    },

    ganzhi,
    timestamp,
    yaosDetail,
    calculation,
  };
}
