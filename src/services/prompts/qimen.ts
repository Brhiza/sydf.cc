/**
 * 奇门遁甲提示词生成
 * 重构版本 - 使用共享逻辑
 */

import type { QimenData, SupplementaryInfo } from '@/types';
import { analyzeQuestion } from './shared/question-analyzer';
import { buildPrompt } from './shared/prompt-builder';
import { getFormattedTimeInfo } from './shared/time-utils';

/**
 * 格式化奇门遁甲数据为可读的文本
 */
function formatQimenData(data: QimenData): string {
  // 使用3x3表格呈现九宫格，增强AI对空间方位的理解
  const timeStr = data.timeInfo
    ? `${data.timeInfo.solarTerm} ${data.timeInfo.epoch}`
    : '未知时间';

  const ganzhiStr = data.ganzhi
    ? `干支：${data.ganzhi.year}年 ${data.ganzhi.month}月 ${data.ganzhi.day}日 ${data.ganzhi.hour}时`
    : '干支信息未知';

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
  // 获取时间信息
  const currentTimeInfo = timeInfo || await getFormattedTimeInfo();
  
  // 分析问题
  const analysis = analyzeQuestion(question);
  
  // 格式化数据
  const formattedData = formatQimenData(data);
  
  // 构建提示词（已包含干支指导）
  return buildPrompt({
    divinationType: 'qimen',
    question,
    formattedData,
    timeInfo: currentTimeInfo,
    analysis,
    ...(supplementaryInfo && { supplementaryInfo })
  });
}
