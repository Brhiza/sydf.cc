/**
 * @file 梅花易数排盘算法
 * @description 基于邵雍（康节）先生所传之《梅花易数》，实现“年月日时”起卦法。
 * @流派 邵氏心易
 * @核心思想
 * 1. 以数起卦：将农历的年、月、日、时辰之数，通过特定运算转换为八卦。
 *    - (年支序 + 月 + 日) % 8  => 上卦
 *    - (年支序 + 月 + 日 + 时支序) % 8 => 下卦
 *    - (年支序 + 月 + 日 + 时支序) % 6 => 动爻
 * 2. 定体用：此乃梅花心法之灵魂。以动爻所在的经卦为“用”，静止的另一经卦为“体”。
 * 3. 论生克：以体卦为中心（我），分析用卦、互卦、变卦对体卦的五行生克关系，以此判断吉凶。
 *    - 生体为吉，克体为凶。体用比和，事顺。
 *    - 用为事之始，互为事之中，变为事之终。
 */

import { hexagramsData, trigramsByIndex } from '../../utils/hexagram-data.ts';
import { dizhi } from '../../config/divination-data.ts';
import { MeihuaHelpers } from '../../utils/divination-helpers.ts';
import { getDivinationTime } from '../../utils/timeManager.ts';

const hexagrams = hexagramsData.map((hex) => ({
  number: hex.id,
  name: hex.name,
  symbol: hex.symbol,
  description: hex.description,
}));

const trigrams = trigramsByIndex;

/**
 * 根据上下经卦的索引号，查找对应的大成卦（六十四卦之一）
 * @param upper 上卦索引 (1-8)
 * @param lower 下卦索引 (1-8)
 * @returns 对应的大成卦对象
 */
function findHexagramByTrigrams(upper: number, lower: number) {
  // 使用模运算确保索引在有效范围内
  const upperIndex = ((upper - 1) % 8) + 1;
  const lowerIndex = ((lower - 1) % 8) + 1;
  
  const upperTrigram = trigramsByIndex[upperIndex];
  const lowerTrigram = trigramsByIndex[lowerIndex];
  const hexagram = hexagrams.find((h) => h.symbol === `${upperTrigram.symbol}${lowerTrigram.symbol}`);
  
  return hexagram!;
}

/**
 * 生成梅花易数卦盘
 * @param customDate 自定义时间，若不提供则使用当前时间
 * @returns 返回一个完整的梅花易数卦盘数据对象
 */
export function generateMeihua(
  customDate?: Date,
  method: 'default' | 'random' | 'number' = 'default',
  divinationNumber?: number
) {
  // 1. 获取占卜时间的农历及干支信息
  const { ganzhi, timeInfo, timestamp } = getDivinationTime(customDate);
  const { lunar } = timeInfo;

  let upperTrigramIndex: number;
  let lowerTrigramIndex: number;
  let movingYaoIndex: number;
  let calculation: { method: string; [key: string]: unknown };

  switch (method) {
    case 'random':
      upperTrigramIndex = Math.floor(Math.random() * 8) + 1;
      lowerTrigramIndex = Math.floor(Math.random() * 8) + 1;
      movingYaoIndex = Math.floor(Math.random() * 6) + 1;
      calculation = { method: '随机起卦法' };
      break;
    case 'number':
      if (!divinationNumber) {
        throw new Error('数字起卦需要提供数字');
      }
      upperTrigramIndex = (divinationNumber % 8) || 8;
      lowerTrigramIndex = (Math.floor(divinationNumber / 8) % 8) || 8;
      movingYaoIndex = (divinationNumber % 6) || 6;
      calculation = { method: '数字起卦法', number: divinationNumber };
      break;
    default:
      const yearZhi = ganzhi.year.substring(1, 2);
      const month = lunar.monthNumber;
      const day = lunar.dayNumber;
      const timeZhi = ganzhi.hour.substring(1, 2);
      const yearZhiIndex = dizhi.indexOf(yearZhi) + 1;
      const timeZhiIndex = dizhi.indexOf(timeZhi) + 1;
      upperTrigramIndex = (yearZhiIndex + month + day) % 8 || 8;
      lowerTrigramIndex = (yearZhiIndex + month + day + timeZhiIndex) % 8 || 8;
      movingYaoIndex = (yearZhiIndex + month + day + timeZhiIndex) % 6 || 6;
      calculation = {
        method: '年月日时起卦法',
        yearZhi,
        yearZhiIndex,
        month,
        day,
        timeZhi,
        timeZhiIndex,
        upperTrigramIndex,
        lowerTrigramIndex,
        movingYaoIndex,
      };
      break;
  }

  // 3. 确定主卦、互卦、变卦
  const upperTrigram = trigrams[upperTrigramIndex];
  const lowerTrigram = trigrams[lowerTrigramIndex];
  const mainHexagram = findHexagramByTrigrams(upperTrigramIndex, lowerTrigramIndex);

  const mainLines = [...lowerTrigram.lines, ...upperTrigram.lines];

  const interLowerLines = mainLines.slice(1, 4);
  const interUpperLines = mainLines.slice(2, 5);

  // 使用更直接的方法查找互卦
  const findTrigramByLines = (lines: number[]) => {
    for (let i = 1; i <= 8; i++) {
      const trigram = trigrams[i];
      if (trigram && trigram.lines.length === lines.length) {
        let match = true;
        for (let j = 0; j < lines.length; j++) {
          if (trigram.lines[j] !== lines[j]) {
            match = false;
            break;
          }
        }
        if (match) return { index: i, trigram };
      }
    }
    return null;
  };

  const interLowerResult = findTrigramByLines(interLowerLines);
  const interUpperResult = findTrigramByLines(interUpperLines);

  const interHexagram = interLowerResult && interUpperResult
    ? findHexagramByTrigrams(interUpperResult.index, interLowerResult.index)
    : null;

  const changedLines = [...mainLines];
  changedLines[movingYaoIndex - 1] = 1 - changedLines[movingYaoIndex - 1];

  const changedLowerLines = changedLines.slice(0, 3);
  const changedUpperLines = changedLines.slice(3, 6);

  const changedLowerResult = findTrigramByLines(changedLowerLines);
  const changedUpperResult = findTrigramByLines(changedUpperLines);

  const changingHexagram = changedLowerResult && changedUpperResult
    ? findHexagramByTrigrams(changedUpperResult.index, changedLowerResult.index)
    : null;

  //【核心修正：注入“体用”之魂】
  // 梅花易数之精髓，在于体用生克。无体用，则无以论吉凶。
  // 体卦：代表占卜者自身或所占之事的主体，是相对静止的一方。
  // 用卦：代表所占之事所遇到的人、事、物，是相对运动的一方。
  // 定体用之法，以动爻为准：动爻所在的经卦为“用”，静止的另一经卦为“体”。
  let tiGua, yongGua;
  if (movingYaoIndex > 3) {
    // 动爻在四、五、上爻，属于上卦，故上卦为“用”，下卦为“体”。
    tiGua = lowerTrigram;
    yongGua = upperTrigram;
  } else {
    // 动爻在初、二、三爻，属于下卦，故下卦为“用”，上卦为“体”。
    tiGua = upperTrigram;
    yongGua = lowerTrigram;
  }

  const yaosDetail = mainLines.map((line, index) => ({
    position: index + 1,
    yaoType: (line === 1 ? '阳' : '阴') as '阳' | '阴',
    isChanging: index === movingYaoIndex - 1,
    // 标注体用，并进行类型断言
    tiYong: ((index < 3 ? lowerTrigram.name : upperTrigram.name) === tiGua.name ? '体' : '用') as '体' | '用',
  }));

  return {
    originalName: mainHexagram.name,
    changedName: changingHexagram?.name || '',
    interName: interHexagram?.name || '',
    
    // 核心体用关系
    tiGua: { name: tiGua.name, element: tiGua.element, nature: tiGua.nature },
    yongGua: { name: yongGua.name, element: yongGua.element, nature: yongGua.nature },
    
    // 卦象详情
    mainHexagram: {
      name: mainHexagram.name,
      symbol: mainHexagram.symbol,
      upper: upperTrigram.name,
      lower: lowerTrigram.name,
      description: mainHexagram.description,
    },
    changedHexagram: changingHexagram ? {
      name: changingHexagram.name,
      symbol: changingHexagram.symbol,
      upper: changedUpperResult?.trigram?.name || '',
      lower: changedLowerResult?.trigram?.name || '',
      description: changingHexagram.description,
    } : null,
    interHexagram: interHexagram ? {
      name: interHexagram.name,
      symbol: interHexagram.symbol,
      upper: interUpperResult?.trigram?.name || '',
      lower: interLowerResult?.trigram?.name || '',
      description: interHexagram.description,
    } : null,

    // 动爻信息
    movingYao: {
      position: movingYaoIndex,
      description: `第${movingYaoIndex}爻动`,
      yaoName: ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻'][movingYaoIndex - 1] || '未知',
    },

    //【核心修正：重构分析逻辑】
    // 所有的吉凶判断，都围绕“体卦”的五行展开。
    // 用生体、互生体、变生体为吉；用克体、互克体、变克体为凶。
    analysis: {
      // 1. 用卦与体卦关系：代表事情的开端和当前状态。
      tiYongRelation: MeihuaHelpers.getElementRelation(yongGua.element, tiGua.element),
      // 2. 互卦与体卦关系：代表事情发展的过程。互卦有二，需分别论之。
      inter1Relation: interLowerResult ? MeihuaHelpers.getElementRelation(interLowerResult.trigram.element, tiGua.element) : '无',
      inter2Relation: interUpperResult ? MeihuaHelpers.getElementRelation(interUpperResult.trigram.element, tiGua.element) : '无',
      // 3. 变卦与体卦关系：代表事情的最终结局。
      changedRelation: changingHexagram && changedUpperResult && changedLowerResult ? MeihuaHelpers.getElementRelation(
        // 注意：变卦之体用，需看变卦本身。此处简化，直接看变卦整体五行对体卦的作用。
        // 一个更严谨的分析，会重新确定变卦中的体用。但作为基础判断，此法可用。
        // 此处我们取变卦中“用卦”部分的五行来与主卦的“体卦”论生克。
        movingYaoIndex > 3 ? changedUpperResult.trigram.element : changedLowerResult.trigram.element,
        tiGua.element
      ) : '无变卦',
    },

    ganzhi,
    timestamp,
    yaosDetail,
    calculation,
  };
}
