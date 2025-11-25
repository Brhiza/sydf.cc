/**
 * @file 奇门遁甲排盘算法
 * @description 基于转盘奇门法，实现时家奇门的排盘。
 * @流派 奇门遁甲（转盘法）
 * @核心思想
 * 1. 定局数：根据占测当日的节气，以及日干支所属的“旬”，来确定使用阴阳几局。此为奇门之钥。
 * 2. 排地盘：将三奇六仪（戊己庚辛壬癸丁丙乙）按照阳顺阴逆的规则，从局数宫位开始布满九宫。
 * 3. 寻值符值使：根据时辰干支所属的旬，找到旬首，从而定出此局的“值符”（九星之一）和“值使”（八门之一）。
 * 4. 排天盘：值符星追随时干，找到时干在地盘的落宫，值符星即落此宫，其余八星按原宫位顺序随之旋转。天盘之干则随星飞走。
 * 5. 排人盘：值使门追随时支，找到时支的落宫，值使门即落此宫，其余七门按“洛书轨迹”旋转。
 * 6. 排神盘：八神（或称九神）追随天盘值符星，阳顺阴逆飞布八宫。
 */
import { getDivinationTime } from '../../utils/timeManager.ts';
import {
  tiangan,
  qimen,
} from '../../config/divination-data.ts';

const {
  dizhi,
  diPanPalaces,
  palaceStars,
  palaceDoors,
  palaceDoorMap,
  yangGods,
  yinGods,
  ninePositions,
  jieQiJuShuMap,
} = qimen;
const tenStems = tiangan;

/**
 * 定局数
 * @param timeInfo 时间信息，包含节气和日干支
 * @returns 返回{阴阳遁, 局数}
 */
function getQimenJuShu(
  timeInfo: { jieQi: string; ganzhi: { day: string } },
  method: 'default' | 'random' | 'number' = 'default',
  divinationNumber?: number
) {
  const { jieQi, ganzhi } = timeInfo;
  const dayGanZhi = ganzhi.day;

  const rule = jieQiJuShuMap[jieQi as keyof typeof jieQiJuShuMap];
  if (!rule) {
    throw new Error(`找不到节气 "${jieQi}" 对应的局数规则。`);
  }
  
  // 阴阳遁严格按节气划分
  const isYangDun = rule.dun === '阳';

  // 根据起卦方式决定局数
  if (method === 'random') {
    const juShu = Math.floor(Math.random() * 9) + 1;
    return { isYangDun, juShu, yuan: '随机局' };
  }

  if (method === 'number' && typeof divinationNumber === 'number') {
    const juShu = (divinationNumber % 9) || 9;
    return { isYangDun, juShu, yuan: '数字局' };
  }

  // 默认方式：使用节气和日干支定局
  const dayGan = dayGanZhi.charAt(0);
  const dayZhi = dayGanZhi.charAt(1);
  const dayGanIndex = tenStems.indexOf(dayGan);
  const dayZhiIndex = dizhi.indexOf(dayZhi);

  const xunShouZhiIndex = (dayZhiIndex - dayGanIndex + 12) % 12;
  const xunShouGanZhi = '甲' + dizhi[xunShouZhiIndex];

  let yuanIndex;
  let yuan;
  if (xunShouGanZhi === '甲子' || xunShouGanZhi === '甲午') {
      yuanIndex = 0;
      yuan = '上元';
  } else if (xunShouGanZhi === '甲寅' || xunShouGanZhi === '甲申') {
      yuanIndex = 1;
      yuan = '中元';
  } else {
      yuanIndex = 2;
      yuan = '下元';
  }

  const juShu = rule.ju[yuanIndex];

  return { isYangDun, juShu, yuan };
}

/**
 * 检查特殊时辰情况
 * @param hourGanZhi 时辰干支
 * @returns 返回特殊时辰信息
 */
function checkSpecialHourConditions(hourGanZhi: string) {
  const hourGan = hourGanZhi.charAt(0);
  const hourZhi = hourGanZhi.charAt(1);
  
  const specialConditions = {
    isLiuJiaHour: false,      // 六甲时辰
    isLiuGuiHour: false,      // 六癸时辰
    isShiGanRuMu: false,      // 时干入墓
    isWuBuYuShi: false,       // 五不遇时
    description: ''
  };

  // 1. 检查六甲时辰（甲子、甲戌、甲申、甲午、甲辰、甲寅）
  const liuJiaHours = ['甲子', '甲戌', '甲申', '甲午', '甲辰', '甲寅'];
  if (liuJiaHours.includes(hourGanZhi)) {
    specialConditions.isLiuJiaHour = true;
    specialConditions.description += '六甲时辰（甲时），甲遁于六仪之下；';
  }

  // 2. 检查六癸时辰（癸未、癸巳、癸卯、癸丑、癸亥、癸酉）
  const liuGuiHours = ['癸未', '癸巳', '癸卯', '癸丑', '癸亥', '癸酉'];
  if (liuGuiHours.includes(hourGanZhi)) {
    specialConditions.isLiuGuiHour = true;
    specialConditions.description += '六癸时辰，癸为阴干之末；';
  }

  // 3. 检查时干入墓
  // 时干入墓规则：乙入坤宫（未），丙戊入乾宫（戌），丁入艮宫（丑），己入巽宫（辰），庚入坤宫（未），辛入艮宫（丑），壬入巽宫（辰），癸入离宫（午）
  const ruMuMap: { [key: string]: { palace: number; branch: string } } = {
    '乙': { palace: 2, branch: '未' },  // 坤二宫
    '丙': { palace: 6, branch: '戌' },  // 乾六宫
    '戊': { palace: 6, branch: '戌' },  // 乾六宫
    '丁': { palace: 8, branch: '丑' },  // 艮八宫
    '己': { palace: 4, branch: '辰' },  // 巽四宫
    '庚': { palace: 2, branch: '未' },  // 坤二宫
    '辛': { palace: 8, branch: '丑' },  // 艮八宫
    '壬': { palace: 4, branch: '辰' },  // 巽四宫
    '癸': { palace: 9, branch: '午' },  // 离九宫
  };

  const ruMuInfo = ruMuMap[hourGan];
  if (ruMuInfo && hourZhi === ruMuInfo.branch) {
    specialConditions.isShiGanRuMu = true;
    specialConditions.description += `时干${hourGan}入墓（${ruMuInfo.branch}支）；`;
  }

  // 4. 检查五不遇时
  // 五不遇时：时干克时支，且时干为阳干、时支为阳支，或时干为阴干、时支为阴支
  // 具体组合：甲申、乙酉、丙子、丁亥、戊寅、己卯、庚午、辛巳、壬辰、癸未
  const wuBuYuShiHours = ['甲申', '乙酉', '丙子', '丁亥', '戊寅', '己卯', '庚午', '辛巳', '壬辰', '癸未'];
  if (wuBuYuShiHours.includes(hourGanZhi)) {
    specialConditions.isWuBuYuShi = true;
    specialConditions.description += '五不遇时（时干克时支），凶时；';
  }

  return specialConditions;
}

/**
 * 寻值符与值使
 * @param hourGanZhi 时辰干支
 * @returns 返回{值符, 值使, 值符所在宫, 特殊时辰情况}
 */
function getZhiFuZhiShi(hourGanZhi: string) {
  // 法理：值符与值使由时辰干支所属的"旬"来决定。
  // 旬首（如甲子）所在的地盘宫位，其对应的星为值符，门为值使。
  const hourGan = hourGanZhi.charAt(0);
  const hourZhi = hourGanZhi.charAt(1);

  const hourGanIndex = tenStems.indexOf(hourGan);
  const hourZhiIndex = dizhi.indexOf(hourZhi);

  const xunShouZhiIndex = (hourZhiIndex - hourGanIndex + 12) % 12;
  const xunShouZhi = dizhi[xunShouZhiIndex];
  
  const xunShouPalace = diPanPalaces[xunShouZhi as keyof typeof diPanPalaces];

  const zhiFu = palaceStars[xunShouPalace - 1];
  const zhiShi = palaceDoorMap[xunShouPalace as keyof typeof palaceDoorMap];

  // 检查特殊时辰情况
  const specialConditions = checkSpecialHourConditions(hourGanZhi);

  return { zhiFu, zhiShi, zhiFuPalace: xunShouPalace, specialConditions };
}

function arrangeJiuGongGe(
  isYangDun: boolean,
  juShu: number,
  zhiFu: string,
  zhiShi: string,
  ganzhi: { hour: string }
) {
  const jiuGong = Array.from({ length: 9 }, (_, i) => ({
    gong: i + 1,
    name: ninePositions[i].name,
    direction: ninePositions[i].direction,
    element: ninePositions[i].element,
    tianPan: { star: '', stem: '' },
    diPan: { stem: '' },
    renPan: { door: '' },
    shenPan: { god: '' },
  }));

  //【核心修正：重构整个排盘逻辑】
  // 奇门排盘需严格遵循“地、天、人、神”四盘的顺序和法理，原算法多处错乱。
  // 以下为拨乱反正后的正确步骤：

  // 步骤一：排地盘三奇六仪 (Di Pan)
  // 法理：三奇六仪按固定顺序，根据阳遁顺行、阴遁逆行的方式，从局数对应的宫位开始排布。
  const sanQiLiuYi = ['戊', '己', '庚', '辛', '壬', '癸', '丁', '丙', '乙'];
  
  // 先按正常顺序排布
  for (let i = 0; i < 9; i++) {
    const palaceNum = isYangDun ? ((juShu + i - 1 + 9) % 9) + 1 : ((juShu - i - 1 + 9) % 9) + 1;
    jiuGong[palaceNum - 1].diPan.stem = sanQiLiuYi[i];
  }
  
  // 法理：戊土居中宫，需寄于坤二宫。
  // 但要注意：只有当戊土确实在中五宫时才需要寄宫
  if (jiuGong[4].diPan.stem === '戊') { // 如果中五宫有戊土
    // 检查坤二宫是否已有其他干，如果有则不覆盖
    if (!jiuGong[1].diPan.stem) {
      jiuGong[1].diPan.stem = '戊'; // 将戊土寄到坤二宫
    }
    jiuGong[4].diPan.stem = ''; // 中五宫地盘不布干
  }
  
  // 调试信息：输出地盘排布情况
  console.log('地盘排布情况（修复后）：');
  jiuGong.forEach((gong, index) => {
    console.log(`第${index + 1}宫(${gong.name}): ${gong.diPan.stem || '空'}`);
  });

  // 步骤二：定值符与值使的落宫
  // 法理：值符（星）追随时干，值使（门）追随时支。
  const hourGan = ganzhi.hour.charAt(0);
  const hourZhi = ganzhi.hour.charAt(1);
  // 甲为旬首，遁于六仪之下，故用事时需找到其所遁藏之仪（甲子遁戊，甲戌遁己...）。此处时干甲遁于戊。
  const hourGanForFind = hourGan === '甲' ? '戊' : hourGan;
  
  let zhiFuLandingPalace = -1; // 值符星所落之宫
  
  // 修复时干落宫查找逻辑
  // 需要考虑戊土寄宫的情况：戊土既可能在中五宫，也可能寄在坤二宫
  for (let i = 0; i < 9; i++) {
    if (jiuGong[i].diPan.stem === hourGanForFind) {
      zhiFuLandingPalace = i + 1;
      break;
    }
  }
  
  // 如果没找到，可能是特殊情况，需要进一步处理
  if (zhiFuLandingPalace === -1) {
    // 检查是否是甲时且戊土被寄宫的情况
    if (hourGan === '甲') {
      // 甲时应该找戊土，如果戊土被寄到坤二宫，则值符落坤二宫
      if (jiuGong[1].diPan.stem === '戊') { // 坤二宫
        zhiFuLandingPalace = 2;
      }
    }
    
    // 如果还是找不到，抛出详细的错误信息
    if (zhiFuLandingPalace === -1) {
      console.error('地盘排布情况：');
      jiuGong.forEach((gong, index) => {
        console.log(`第${index + 1}宫(${gong.name}): ${gong.diPan.stem || '空'}`);
      });
      console.error(`查找时干：${hourGanForFind}`);
      throw new Error(`找不到时干${hourGanForFind}落宫，请检查地盘排布逻辑`);
    }
  }
  
  const zhiShiLandingPalace = diPanPalaces[hourZhi as keyof typeof diPanPalaces]; // 值使门所落之宫

  // 步骤三：排天盘九星与天干 (Tian Pan)
  // 法理：天盘九星由值符星带领，从值符落宫开始，按九宫顺序（阳顺阴逆）飞布。
  // 天盘天干则随其所附之星飞布，即“星带干飞”。
  const zhiFuStarIndex = palaceStars.indexOf(zhiFu);
  for (let i = 0; i < 9; i++) {
    const palaceIndex = (zhiFuLandingPalace - 1 + (isYangDun ? i : -i) + 9) % 9;
    const starIndex = (zhiFuStarIndex + i + 9) % 9;
    const star = palaceStars[starIndex];
    jiuGong[palaceIndex].tianPan.star = star;

    // 关键：天盘之干，是该星在地盘的“老家”的那个干。
    let originalStarPalaceIndex = starIndex;
    // 天禽星的老家是中五宫，但中五宫无干，故借用坤二宫之干。
    if (star === '天禽' && !jiuGong[4].diPan.stem) { originalStarPalaceIndex = 1; }
    jiuGong[palaceIndex].tianPan.stem = jiuGong[originalStarPalaceIndex].diPan.stem;
  }

  // 步骤四：排神盘八神 (Shen Pan)
  // 法理：八神分阴阳遁有不同顺序。小值符（八神之首）永远追随大值符（天盘值符星）。
  const currentGods = isYangDun ? yangGods : yinGods;
  // 从值符落宫开始，按阳顺阴逆飞布八神。
  for (let i = 0; i < 8; i++) {
    const palaceIndex = (zhiFuLandingPalace - 1 + (isYangDun ? i : -i) + 9) % 9;
    // 中五宫不布神，若轮到则顺延下一宫。此为转盘奇门之法。
    if (palaceIndex === 4) { continue; }
    jiuGong[palaceIndex].shenPan.god = currentGods[i];
  }
  // 值符本身也作为神盘之首，落在值符宫
  jiuGong[zhiFuLandingPalace - 1].shenPan.god = '值符';

  // 步骤五：排人盘八门 (Ren Pan)
  // 法理：八门由值使门带领，从值使落宫开始，严格遵循“洛书九宫”的飞行轨迹（1->8->3->4->9->2->7->6）排布。
  const zhiShiDoorIndex = palaceDoors.indexOf(zhiShi);
  const luoShuPath = [1, 8, 3, 4, 9, 2, 7, 6]; // 洛书轨迹，不含中五
  const zhiShiLuoShuIndex = luoShuPath.indexOf(zhiShiLandingPalace);

  for (let i = 0; i < 8; i++) {
    const doorIndex = (zhiShiDoorIndex + i + 8) % 8;
    const luoShuIndex = (zhiShiLuoShuIndex + (isYangDun ? i : -i) + 8) % 8;
    const palaceNum = luoShuPath[luoShuIndex];
    jiuGong[palaceNum - 1].renPan.door = palaceDoors[doorIndex];
  }

  return jiuGong;
}

/**
 * 生成奇门遁甲盘
 * @param customDate 自定义时间，若不提供则使用当前时间
 * @returns 返回一个完整的奇门遁甲盘数据对象
 */
export function generateQimen(
  customDate?: Date,
  method: 'default' | 'random' | 'number' = 'default',
  divinationNumber?: number
) {
  const { timeInfo, ganzhi, timestamp } = getDivinationTime(customDate);
  const { jieQi } = timeInfo;

  const { isYangDun, juShu, yuan } = getQimenJuShu(timeInfo, method, divinationNumber);
  const { zhiFu, zhiShi, specialConditions } = getZhiFuZhiShi(ganzhi.hour);
  const jiuGongGe = arrangeJiuGongGe(isYangDun, juShu, zhiFu, zhiShi, { hour: ganzhi.hour });

  return {
    timeInfo: {
      solarTerm: jieQi,
      epoch: yuan,
    },
    ganzhi,
    isYangDun,
    juShu,
    zhiFu,
    zhiShi,
    specialConditions,
    jiuGongGe,
    timestamp,
  };
}
