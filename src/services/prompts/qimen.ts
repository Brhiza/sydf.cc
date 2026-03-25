/**
 * 奇门遁甲提示词生成
 * 重构版本 - 使用共享逻辑
 */

import type { QimenData, SupplementaryInfo } from '@/types';
import { generatePromptWithFormatter, type PromptFormatterContext } from './shared/prompt-generator';
import type { QuestionType } from './shared/types';
import { createQimenPriorityPalaces, createQimenQuestionHints } from '@/utils/qimen-guidance';

function getQimenYongShenHint(types: QuestionType, data: QimenData, supplementaryInfo?: SupplementaryInfo): string {
  const hints: string[] = [];

  if (types.isCareer) {
    hints.push(getDoorHint(data, '开门', '事业问事常取开门为主'));
    hints.push(getDoorHint(data, '生门', '求发展与机会时兼看生门'));
  }
  if (types.isFinance) {
    hints.push(getDoorHint(data, '生门', '财运问事常取生门为主'));
    hints.push(getDoorHint(data, '开门', '交易、项目推进可兼看开门'));
  }
  if (types.isHealth) {
    hints.push(getStarHint(data, '天芮', '健康问事常参天芮星'));
    hints.push(getDoorHint(data, '死门', '病症与压力位可兼看死门'));
  }
  if (types.isStudy) {
    hints.push(getStarHint(data, '天辅', '学业文书常参天辅星'));
  }

  const relationshipHint = getRelationshipHint(types, data, supplementaryInfo);
  if (relationshipHint) {
    hints.push(relationshipHint);
  }

  const validHints = hints.filter(Boolean);
  return validHints.length > 0 ? validHints.join('；') : '未命中固定分类，宜结合问事对象另取用神。';
}

function getRelationshipHint(types: QuestionType, data: QimenData, supplementaryInfo?: SupplementaryInfo): string | '' {
  if (!types.isRelationship) {
    return '';
  }

  const liuheHint = getGodHint(data, '六合', '感情问事常参六合');
  const yiHint = getStemHint(data, '乙', supplementaryInfo?.gender === '男' ? '男测感情可重点看乙奇' : '乙奇可参');
  const gengHint = getStemHint(data, '庚', supplementaryInfo?.gender === '女' ? '女测感情可重点看庚金' : '庚金可参');

  return [liuheHint, yiHint, gengHint].filter(Boolean).join('；');
}

function getDoorHint(data: QimenData, door: string, label: string): string {
  const gong = data.jiuGongGe.find((item) => item.renPan.door === door);
  return gong ? `${label}，当前落${gong.name}` : '';
}

function getGodHint(data: QimenData, god: string, label: string): string {
  const gong = data.jiuGongGe.find((item) => item.shenPan.god === god);
  return gong ? `${label}，当前落${gong.name}` : '';
}

function getStarHint(data: QimenData, star: string, label: string): string {
  const gong = data.jiuGongGe.find((item) => item.tianPan.star === star);
  return gong ? `${label}，当前落${gong.name}` : '';
}

function getStemHint(data: QimenData, stem: string, label: string): string {
  const tianGong = data.jiuGongGe.find((item) => item.tianPan.stem === stem);
  const diGong = data.jiuGongGe.find((item) => item.diPan.stem === stem);
  const parts: string[] = [];

  if (tianGong) {
    parts.push(`天盘落${tianGong.name}`);
  }
  if (diGong) {
    parts.push(`地盘落${diGong.name}`);
  }

  return parts.length > 0 ? `${label}，${parts.join('，')}` : '';
}

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
  const yongShenHint = getQimenYongShenHint(analysis.types, data, supplementaryInfo);
  const patternHint = data.patternDetails?.map((item) => `${item.tag}：${item.summary}`).join('；') || '无';
  const palaceHint = data.palaceInsights?.map((item) => `${item.name}${item.level}：${item.summary}`).join('；') || '无';
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
- **格局标签**: ${data.patternTags?.join('、') || '无明显格局标签'}
- **格局提示**: ${patternHint}
- **宫位提示**: ${palaceHint}
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
