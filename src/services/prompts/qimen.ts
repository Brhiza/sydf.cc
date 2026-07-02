/**
 * 奇门遁甲提示词生成
 * 重构版本 - 使用共享逻辑
 */

import type { QimenData, SupplementaryInfo } from '@/types';
import { generatePromptWithFormatter, type PromptFormatterContext } from './shared/prompt-generator';
import {
  createQimenPriorityPalaces,
  createQimenQuestionHints,
  createQimenYongShenHint,
} from '@/utils/qimen-guidance';
import { DEFAULT_QIMEN_SCOPE } from '@/shared/qimen-settings';

/**
 * 格式化奇门遁甲数据为可读的文本
 */
function formatQimenData(data: QimenData, context: PromptFormatterContext): string {
  const { question, supplementaryInfo, analysis } = context;
  // 使用3x3表格呈现九宫格，增强AI对空间方位的理解
  const timeStr = data.timeInfo
    ? `${data.timeInfo.solarTerm} ${data.timeInfo.epoch}`
    : '未知时间';

  const ganzhiStr = data.ganzhi
    ? `干支：${data.ganzhi.year}年 ${data.ganzhi.month}月 ${data.ganzhi.day}日 ${data.ganzhi.hour}时`
    : '干支信息未知';
  const yongShenHint = createQimenYongShenHint(analysis.types, data, supplementaryInfo);
  const patternHint = data.patternDetails?.map((item) => `${item.tag}：${item.summary}`).join('；') || '无';
  const palaceHint = data.palaceInsights?.map((item) => `${item.name}${item.level}：${item.summary}`).join('；') || '无';
  const classicPatternHint = data.classicPatterns?.map((item) => `${item.name}（${item.type}，${item.score}分）：${item.summary}`).join('；') || '无';
  const stemRelationHint = data.stemRelations?.map((item) => `${item.gong}宫${item.heavenStem}/${item.earthStem}：${item.pattern || item.relation}`).join('；') || '无';
  const goodDirectionHint = data.directions?.goodDirections?.map((item) => `${item.name}${item.direction}（${item.score}分）：${item.use}，${item.reasons.join('、')}`).join('；') || '无';
  const avoidDirectionHint = data.directions?.avoidDirections?.map((item) => `${item.name}${item.direction}（${item.score}分）：${item.use}，${item.reasons.join('、')}`).join('；') || '无';
  const voidHint = data.voidBranches?.length
    ? `${data.voidBranches.join('、')}${data.voidPalaces?.length ? `，落${data.voidPalaces.map((item) => `${item.name}${item.branch}`).join('、')}` : ''}`
    : '无';
  const horseHint = data.horseStar
    ? `${data.horseStar.sourceBranch}马在${data.horseStar.branch}，落${data.horseStar.name}`
    : '无';
  const yingQiHint = data.yingQi
    ? `${data.yingQi.rhythm}，约${data.yingQi.minDays}-${data.yingQi.maxDays}天；${data.yingQi.description}；依据：${data.yingQi.sources.join('、')}`
    : '无';
  const questionHints = createQimenQuestionHints(question, data, supplementaryInfo);
  const priorityPalaces = createQimenPriorityPalaces(question, data, supplementaryInfo).slice(0, 3);
  const questionHintText =
    questionHints.length > 0
      ? questionHints.map((item) => `- **${item.label}**: ${item.value}`).join('\n')
      : '- **问事参考**: 未命中固定分类，宜结合具体目标另取用神。';
  const priorityText =
    priorityPalaces.length > 0
      ? priorityPalaces.map((item, index) => `${index + 1}. ${item.name}（评分${item.score}）：${item.reasons.join('；')}`).join('\n')
      : '无';

  let jiugongTable = '| 巽四宫 | 离九宫 | 坤二宫 |\n|---|---|---|\n';
  if (data.jiuGongGe && Array.isArray(data.jiuGongGe)) {
    const getGongStr = (gongNum: number) => {
      const gong = data.jiuGongGe.find((g) => g.gong === gongNum);
      if (!gong) return ' ';
      // 格式化每个宫位的内容，使用<br>换行以适应Markdown表格
      return `**神**：${gong.shenPan.god || ' '}<br>**星**：${gong.tianPan.star || ' '}<br>**门**：${gong.renPan.door || ' '}<br>**天**：${gong.tianPan.stem || ' '}<br>**地**：${gong.diPan.stem || ' '}`;
    };
    
    const row1 = `| ${getGongStr(4)} | ${getGongStr(9)} | ${getGongStr(2)} |`;
    const row2 = `| ${getGongStr(3)} | ${getGongStr(5)} | ${getGongStr(7)} |`;
    const row3 = `| ${getGongStr(8)} | ${getGongStr(1)} | ${getGongStr(6)} |`;
    
    jiugongTable += `${row1}\n| 震三宫 | 中五宫 | 兑七宫 |\n|---|---|---|\n${row2}\n| 艮八宫 | 坎一宫 | 乾六宫 |\n|---|---|---|\n${row3}`;
  }

  return `**奇门盘信息**:
- **公历**: ${timeStr}
- **${ganzhiStr}**
- **局数**: ${data.isYangDun ? '阳遁' : '阴遁'}${data.juShu}局
- **核心**: 值符: ${data.zhiFu} | 值使: ${data.zhiShi}
- **排盘级别**: ${data.scope || DEFAULT_QIMEN_SCOPE}
- **空亡驿马**: 空亡${voidHint}；驿马${horseHint}
- **格局标签**: ${data.patternTags?.join('、') || '无明显格局标签'}
- **格局提示**: ${patternHint}
- **经典格局**: ${classicPatternHint}
- **天地盘干关系**: ${stemRelationHint}
- **宫位提示**: ${palaceHint}
- **吉方建议**: ${goodDirectionHint}
- **避方建议**: ${avoidDirectionHint}
- **应期参考**: ${yingQiHint}
- **用神参考**: ${yongShenHint}

**问事宫位参考**:
${questionHintText}

**重点宫位排序**:
${priorityText}

**九宫格详情 (方位图)**:
${jiugongTable}`;
}

/**
 * 生成奇门遁甲提示词
 */
export async function generateQimenPrompt(
  question: string,
  data: QimenData,
  timeInfo?: string,
  supplementaryInfo?: SupplementaryInfo
): Promise<string> {
  return generatePromptWithFormatter({
    divinationType: 'qimen',
    question,
    data,
    timeInfo,
    supplementaryInfo,
    formatData: formatQimenData,
  });
}
