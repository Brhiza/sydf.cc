/**
 * 六爻占卜提示词生成
 * 重构版本 - 使用共享逻辑
 */

import type { LiuyaoData, SupplementaryInfo } from '@/types';
import { generatePromptWithFormatter, type PromptFormatterContext } from './shared/prompt-generator';
import type { QuestionType } from './shared/types';

function getLiuyaoYongShenHint(types: QuestionType, supplementaryInfo?: SupplementaryInfo): string {
  const hints: string[] = [];

  if (types.isFinance) {
    hints.push('妻财为主用神');
  }
  if (types.isCareer) {
    hints.push('官鬼为主用神');
  }
  if (types.isStudy) {
    hints.push('父母为主用神');
  }
  if (types.isHealth) {
    hints.push('官鬼为病，子孙为药，两者都要参看');
  }

  const relationshipHint = getRelationshipYongShenHint(types, supplementaryInfo);
  if (relationshipHint) {
    hints.push(relationshipHint);
  }

  return hints.length > 0 ? hints.join('；') : '未命中明确分类，需结合问事对象自行取用神。';
}

function getRelationshipYongShenHint(types: QuestionType, supplementaryInfo?: SupplementaryInfo): string | '' {
  if (!types.isRelationship) {
    return '';
  }

  if (supplementaryInfo?.gender === '男') {
    return '感情问事以妻财为主用神';
  }
  if (supplementaryInfo?.gender === '女') {
    return '感情问事以官鬼为主用神';
  }
  return '感情问事若未给性别，宜官鬼、妻财并参';
}

/**
 * 格式化六爻数据为可读的文本
 */
function formatLiuyaoData(data: LiuyaoData, context: PromptFormatterContext): string {
  const { supplementaryInfo, analysis } = context;
  const ganzhi = data.ganzhi ? `干支：${data.ganzhi.year}年 ${data.ganzhi.month}月 ${data.ganzhi.day}日 ${data.ganzhi.hour}时` : '干支信息未知';
  const yongShenHint = getLiuyaoYongShenHint(analysis.types, supplementaryInfo);
  let prompt = `六爻卦象信息：
${ganzhi}
主卦：${data.originalName}（${data.palace?.name || ''}宫）
变卦：${data.changedName}
互卦：${data.interName}
空亡：${data.voidBranches?.join('、') || '无'}
特殊卦式：${data.specialPattern || '常规卦'}
特殊提示：${data.specialAdvice || '无'}
用神参考：${yongShenHint}

爻象详情：`;

  if (data.yaosDetail && Array.isArray(data.yaosDetail)) {
    // 修正：爻数据数组(yaosDetail)是从下往上（1-6）排列的，但显示时需要从上往下（6-1）。
    const reversedYaos = [...data.yaosDetail].reverse();
    reversedYaos.forEach((yaoDetail, index) => {
      const position = 6 - index;
      let changingText = yaoDetail.isChanging ? `（${yaoDetail.changeType}）` : '';
      const worldResponseText = yaoDetail.isWorld ? ' 世' : yaoDetail.isResponse ? ' 应' : '';
      const voidText = yaoDetail.isVoid ? ' 空' : '';

      // 为动爻附加上变爻信息
      if (yaoDetail.isChanging && yaoDetail.changedYao) {
        const changed = yaoDetail.changedYao;
        changingText += ` 动变 -> ${changed.liuqin}${changed.dizhi}${changed.wuxing}`;
      }

      prompt += `
第${position}爻：${yaoDetail.yaoType}爻${changingText}，六神：${yaoDetail.sixGod || ''}，六亲：${yaoDetail.sixRelative || ''}，纳甲：${yaoDetail.najiaDizhi || ''}${yaoDetail.wuxing || ''}${worldResponseText}${voidText}`;
    });
  } else if (data.yaoArray && Array.isArray(data.yaoArray)) {
    // 兼容旧数据格式
    data.yaoArray.forEach((yao: number, index: number) => {
      const position = 6 - index;
      const yaoType = yao === 6 || yao === 8 ? '阴' : '阳';
      const isChanging = yao === 6 || yao === 9;
      prompt += `
第${position}爻：${yaoType}爻${isChanging ? '（动爻）' : ''}，六神：${data.sixGods?.[index] || ''}，六亲：${data.sixRelatives?.[index] || ''}，世应：${data.worldAndResponse?.[index] || ''}`;
    });
  }

  // 动爻信息
  if (data.changingYaos && Array.isArray(data.changingYaos) && data.changingYaos.length > 0) {
    prompt += `

动爻：${data.changingYaos.map((yao: { position: number; type: string }) => `第${yao.position}爻（${yao.type}）`).join('、')}`;
  }

  return prompt;
}

/**
 * 生成六爻占卜提示词
 */
export async function generateLiuyaoPrompt(
  question: string,
  data: LiuyaoData,
  timeInfo?: string,
  supplementaryInfo?: SupplementaryInfo
): Promise<string> {
  return generatePromptWithFormatter({
    divinationType: 'liuyao',
    question,
    data,
    timeInfo,
    supplementaryInfo,
    formatData: formatLiuyaoData,
  });
}
