import type { DailyFortuneData } from '@/types/divination';

/**
 * 今日运势提示词生成
 * 基于日家奇门遁甲算法生成的运势数据，生成详细的运势解读
 */

/**
 * 根据出生年份获取生肖
 */
function getChineseZodiac(birthYear: number): string {
  const zodiacs = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
  const index = (birthYear - 4) % 12; // 1904年是鼠年
  return zodiacs[index];
}

/**
 * 生成今日运势的AI提示词（小白友好版）
 */
export async function generateDailyFortunePrompt(fortuneData: DailyFortuneData, supplementaryInfo?: { gender?: string; birthYear?: number }, timeInfo?: string): Promise<string> {
  
  const { date, overall, aspects, lucky, ganzhi, qimen } = fortuneData;
  
  // 生成九宫格详细信息
  const jiuGongDetails = qimen.jiuGongGe.map(gong => {
    return `宫位${gong.gong}（${gong.name}-${gong.direction}）：
天盘：${gong.tianPan.star} ${gong.tianPan.stem}
地盘：${gong.diPan.stem || '—'}
人盘：${gong.renPan.door}
神盘：${gong.shenPan.god}
五行：${gong.element}`;
  }).join('\n\n');

  // 生成补充信息部分
  let supplementarySection = '';
  if (supplementaryInfo) {
    const infoParts = [];
    if (supplementaryInfo.gender) {
      infoParts.push(`性别：${supplementaryInfo.gender}`);
    }
    if (supplementaryInfo.birthYear) {
      const age = new Date().getFullYear() - supplementaryInfo.birthYear;
      const zodiac = getChineseZodiac(supplementaryInfo.birthYear);
      infoParts.push(`出生年份：${supplementaryInfo.birthYear}年（${age}岁，${zodiac}）`);
    }
    
    if (infoParts.length > 0) {
      supplementarySection = `
## 求测者信息
${infoParts.join('\n')}

## 个性化分析要求
1. 结合求测者的性别特点进行针对性分析
2. 考虑年龄因素在运势解读中的影响
3. 根据生肖特性提供个性化建议
4. 关注不同性别在事业、感情、健康方面的关注重点
`;
    }
  }

  return `你是一位精通日家奇门遁甲的玄学大师，请基于以下详细的日家奇门排盘数据，为求测者生成精准的运势解读。

## 时间信息
${timeInfo || '时间信息未知'}

## 日家奇门排盘数据
- 公历：${date}
- 干支：${ganzhi.year}年 ${ganzhi.month}月 ${ganzhi.day}日 ${ganzhi.hour}时
- 节气：${qimen.timeInfo.solarTerm}
- 元：${qimen.timeInfo.epoch}
- 局数：${qimen.timeInfo.dunType}${qimen.timeInfo.juShu}局
- 值符：${qimen.timeInfo.zhiFu}（今日主导之星）
- 值使：${qimen.timeInfo.zhiShi}（今日主导之门）

## 九宫格完整排盘
${jiuGongDetails}

## 运势基础评估
- 整体运势：${overall.luck}（${overall.score}分）
- 事业运势：${aspects.career.score}分
- 财富运势：${aspects.wealth.score}分
- 感情运势：${aspects.relationship.score}分
- 健康运势：${aspects.health.score}分

## 幸运元素指引
- 幸运数字：${lucky.numbers.join('、')}
- 幸运颜色：${lucky.colors.join('、')}
- 幸运方向：${lucky.directions.join('、')}
- 幸运时辰：${lucky.time}
${supplementarySection}

## 输出格式要求
请严格按照以下JSON格式输出运势解读，确保数据可以直接填充到前端框架中。注意：
1. 必须输出有效的JSON格式，不要包含任何其他文字
2. 所有字符串字段都要有内容，不要留空
3. 不要在JSON中使用数组格式，使用字符串连接多个项目
4. 确保JSON格式正确，可以被直接解析

\`\`\`json
{
  "overallAnalysis": {
    "summary": "整体运势概述",
    "trend": "运势走向分析", 
    "strategy": "整体行动策略"
  },
  "aspects": {
    "career": {
      "analysis": "事业运势详细分析",
      "opportunities": "事业发展机会",
      "challenges": "面临的挑战", 
      "advice": "具体行动建议"
    },
    "wealth": {
      "analysis": "财富运势详细分析",
      "opportunities": "财运机会",
      "risks": "财务风险提醒",
      "advice": "理财建议"
    },
    "relationship": {
      "analysis": "感情运势详细分析",
      "opportunities": "感情发展机会",
      "challenges": "感情挑战",
      "advice": "情感经营建议"
    },
    "health": {
      "analysis": "健康运势详细分析",
      "condition": "身体状况",
      "risks": "健康风险",
      "advice": "养生保健建议"
    }
  },
  "qimenAnalysis": {
    "patternAnalysis": "奇门格局特点分析",
    "palaceInfluence": "各宫位对运势的影响",
    "professionalGuidance": "基于奇门理论的专业指导"
  },
  "precautions": {
    "warnings": "需要特别注意的事项",
    "avoidances": "需要避免的行为",
    "recommendations": "适合进行的活动"
  }
}
\`\`\`

**重要提醒**：只输出JSON内容，不要添加任何解释文字或标记，确保JSON格式完全正确。

## 分析要点
- **核心分析**：基于日干${ganzhi.day.charAt(0)}的旺衰状态和值符${qimen.timeInfo.zhiFu}、值使${qimen.timeInfo.zhiShi}的吉凶寓意
- **格局特点**：结合${qimen.timeInfo.juShu}局的阴阳属性和${qimen.timeInfo.solarTerm}节气特点
- **九宫综合**：分析各宫星门神的组合效应和对运势的影响
- **实用指导**：提供精准的时间、方位、颜色等生活建议

## 输出语言要求
- **简洁明了**：用通俗易懂的语言，避免复杂术语
- **实用导向**：给出具体可行的建议
- **积极正面**：以鼓励和指导为主
- **结构清晰**：各部分内容要有明确的逻辑关系

## JSON字段内容要求
- summary：一句话概括今日整体运势
- trend：运势走向的简要分析
- strategy：1-2个核心行动建议
- analysis：各方面运势的详细解读
- opportunities：具体的发展机遇
- challenges：需要注意的挑战
- advice：针对性的行动指导
- patternAnalysis：奇门格局的通俗解释
- palaceInfluence：各宫位对运势的影响
- professionalGuidance：基于奇门理论的专业建议
- warnings：重要提醒事项
- avoidances：需要避免的行为
- recommendations：推荐进行的活动

请基于以上数据生成精准实用的运势解读。`;
}


/**
 * 生成运势分析的专业提示词
 */
export async function generateFortuneAnalysisPrompt(fortuneData: DailyFortuneData, supplementaryInfo?: { gender?: string; birthYear?: number }): Promise<string> {
  
  const { ganzhi, overall, aspects } = fortuneData;
  
  // 生成补充信息部分
  let supplementarySection = '';
  if (supplementaryInfo) {
    const infoParts = [];
    if (supplementaryInfo.gender) {
      infoParts.push(`性别：${supplementaryInfo.gender}`);
    }
    if (supplementaryInfo.birthYear) {
      const age = new Date().getFullYear() - supplementaryInfo.birthYear;
      const zodiac = getChineseZodiac(supplementaryInfo.birthYear);
      infoParts.push(`出生年份：${supplementaryInfo.birthYear}年（${age}岁，${zodiac}）`);
    }
    
    if (infoParts.length > 0) {
      supplementarySection = `
求测者信息：
${infoParts.join('\n')}

请结合求测者的个人信息进行深度分析，特别关注：
1. 性别因素在运势解读中的差异化影响
2. 年龄阶段与当前运势的匹配度
3. 生肖特性与今日干支的相互作用
4. 个人情况在各方面运势中的具体体现`;
    }
  }
  
  return `作为日家奇门遁甲专家，请深入分析以下运势数据的专业含义：

干支信息：${ganzhi.year}年 ${ganzhi.month}月 ${ganzhi.day}日 ${ganzhi.hour}时

整体运势：${overall.luck}（${overall.score}分）
各方面运势：事业${aspects.career.score}分，财富${aspects.wealth.score}分，感情${aspects.relationship.score}分，健康${aspects.health.score}分
${supplementarySection}

请从以下角度进行专业分析：
1. 日柱干支的五行属性及其对今日运势的影响
2. 时辰干支与整体运势的配合关系
3. 各方面运势分数之间的内在联系
4. 基于传统日家理论的深度解读
5. 现代生活应用的具体建议
6. ${supplementaryInfo ? '结合求测者个人情况的针对性解读' : '通用性的运势分析指导'}

分析要体现日家奇门遁甲的专业水准，引用相关理论和古籍依据。`;
}
