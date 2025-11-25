/**
 * 梅花易数提示词生成
 * 重构版本 - 使用共享逻辑
 */

import type { MeihuaData, SupplementaryInfo } from '@/types';
import { analyzeQuestion } from './shared/question-analyzer';
import { buildPrompt } from './shared/prompt-builder';
import { getFormattedTimeInfo } from './shared/time-utils';

/**
 * 格式化梅花易数数据为可读的文本
 */
function formatMeihuaData(data: MeihuaData): string {
  // 重构整个数据格式化逻辑，以"体用"为核心呈现
  const timeInfo = data.ganzhi
    ? `干支：${data.ganzhi.year}年 ${data.ganzhi.month}月 ${data.ganzhi.day}日 ${data.ganzhi.hour}时`
    : '时间信息未知';

  const prompt = `**梅花易数卦象信息**：
- **时间**: ${timeInfo}
- **主卦**: ${data.originalName}
- **互卦**: ${data.interName || '无'}
- **变卦**: ${data.changedName || '无'}
- **动爻**: 第${data.movingYao?.position}爻

**核心体用分析**：
- **体卦**: ${data.tiGua?.name}（五行属${data.tiGua?.element}）
- **用卦**: ${data.yongGua?.name}（五行属${data.yongGua?.element}）

**生克关系链 (吉凶判断之本)**：
- **事之始 (用卦与体卦)**: ${data.analysis?.tiYongRelation}
- **事之中 (互卦与体卦)**: 互上${data.analysis?.inter2Relation}体，互下${data.analysis?.inter1Relation}体
- **事之终 (变卦与体卦)**: ${data.analysis?.changedRelation}`;

  return prompt;
}

/**
 * 生成梅花易数提示词
 */
export async function generateMeihuaPrompt(
  question: string,
  data: MeihuaData,
  timeInfo?: string,
  supplementaryInfo?: SupplementaryInfo
): Promise<string> {
  // 获取时间信息
  const currentTimeInfo = timeInfo || await getFormattedTimeInfo();
  
  // 分析问题
  const analysis = analyzeQuestion(question);
  
  // 格式化数据
  const formattedData = formatMeihuaData(data);
  
  // 构建提示词（已包含干支指导）
  return buildPrompt({
    divinationType: 'meihua',
    question,
    formattedData,
    timeInfo: currentTimeInfo,
    analysis,
    ...(supplementaryInfo && { supplementaryInfo })
  });
}
