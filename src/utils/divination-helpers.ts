/**
 * 占卜通用辅助函数
 * 提供各种占卜功能的通用工具方法
 */

import type { LiuyaoYaoDetail, LiuyaoData, MeihuaData } from '@/types/divination';

/**
 * 六爻专用工具函数
 */
export const LiuyaoHelpers = {
  getChangedYaoType(yaoType: '阳' | '阴'): '阳' | '阴' {
    return yaoType === '阳' ? '阴' : '阳';
  },

  getChangedYaoInfo(yaoDetail: LiuyaoYaoDetail): string {
    if (yaoDetail.isChanging && yaoDetail.changedYao) {
      const { liuqin, dizhi, wuxing } = yaoDetail.changedYao;
      return `${liuqin}${dizhi}${wuxing}`;
    }
    return `${yaoDetail.sixRelative}${yaoDetail.najiaDizhi}${yaoDetail.wuxing}`;
  },

  reverseYaosDetail(yaosDetail?: LiuyaoYaoDetail[]): LiuyaoYaoDetail[] {
    if (!yaosDetail) return [];
    return [...yaosDetail].reverse();
  },

  formatGanZhi(ganzhi?: LiuyaoData['ganzhi']): string {
    if (!ganzhi) return '';
    const { year, month, day, hour } = ganzhi;
    return `${year}年 ${month}月 ${day}日 ${hour}时`;
  },

  formatVoidBranches(voidBranches?: string[]): string {
    if (!voidBranches || voidBranches.length === 0) return '';
    return `[${voidBranches.join('、')}:空]`;
  },

  getChangeMarkSymbol(rawValue: number): string {
    if (rawValue === 6) return '×';
    if (rawValue === 9) return '●';
    return '';
  },

  isChangingYao(rawValue: number): boolean {
    return rawValue === 6 || rawValue === 9;
  },

  getWorldResponseMark(isWorld: boolean, isResponse: boolean): string {
    if (isWorld) return '世';
    if (isResponse) return '应';
    return '';
  },

  getVoidMark(isVoid: boolean): string {
    return isVoid ? '空' : '';
  },

  validateDivinationData(data: LiuyaoData): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];
    if (!data.originalName) {
      errors.push('缺少主卦名称');
    }
    if (!data.yaosDetail || data.yaosDetail.length !== 6) {
      errors.push('爻象数据不完整');
    }
    if (!data.palace) {
      errors.push('缺少宫位信息');
    }
    return {
      isValid: errors.length === 0,
      errors,
    };
  },

  generateDivinationSummary(data: LiuyaoData): string {
    const changingCount = data.yaosDetail?.filter((yao) => yao.isChanging).length || 0;
    const voidInfo = data.voidBranches?.length ? ` 空亡：${data.voidBranches.join('、')}` : '';
    return `${data.originalName} → ${data.changedName} (${changingCount}个动爻)${voidInfo}`;
  },

  /**
   * 生成专业排盘数据
   */
  generatePaipanData(data: LiuyaoData) {
    if (!data.yaosDetail) return [];

    return data.yaosDetail.map((yao, index) => ({
      ...yao,
      displayPosition: 6 - index,
      changeMarkSymbol: this.getChangeMarkSymbol(yao.rawValue),
      worldResponseMark: this.getWorldResponseMark(yao.isWorld, yao.isResponse),
      voidMark: this.getVoidMark(yao.isVoid),
      changedYaoType: this.getChangedYaoType(yao.yaoType),
      changedYaoInfo: this.getChangedYaoInfo(yao),
    }));
  },

  /**
   * 分析卦象特征
   */
  analyzeHexagram(data: LiuyaoData) {
    const changingYaos = data.yaosDetail?.filter((yao) => yao.isChanging) || [];
    const voidYaos = data.yaosDetail?.filter((yao) => yao.isVoid) || [];

    return {
      changingCount: changingYaos.length,
      voidCount: voidYaos.length,
      hasWorld: data.yaosDetail?.some((yao) => yao.isWorld) || false,
      hasResponse: data.yaosDetail?.some((yao) => yao.isResponse) || false,
      changingPositions: changingYaos.map((yao) => yao.position),
      voidPositions: voidYaos.map((yao) => yao.position),
      palace: data.palace?.name || '',
      palaceElement: data.palace?.wuxing || '',
    };
  },

  /**
   * 生成卦象解读要点
   */
  generateInterpretationPoints(data: LiuyaoData): string[] {
    const analysis = this.analyzeHexagram(data);
    const points: string[] = [];

    // 基本卦象信息
    points.push(`主卦：${data.originalName}（${analysis.palace}宫）`);
    points.push(`变卦：${data.changedName}`);

    if (data.interName) {
      points.push(`互卦：${data.interName}`);
    }

    // 动爻分析
    if (analysis.changingCount > 0) {
      points.push(
        `动爻：第${analysis.changingPositions.join('、')}爻（共${analysis.changingCount}个）`
      );
    } else {
      points.push('静卦：无动爻');
    }

    // 空亡分析
    if (analysis.voidCount > 0) {
      points.push(`空亡：第${analysis.voidPositions.join('、')}爻`);
    }

    // 世应分析
    if (analysis.hasWorld && analysis.hasResponse) {
      points.push('世应俱全，卦象完整');
    }

    return points;
  },
};

/**
 * 梅花易数专用工具函数
 */
export const MeihuaHelpers = {
  /**
   * 分析梅花易数卦象特征
   */
  analyzeMeihuaHexagram(data: MeihuaData) {
    const movingYao = data.yaosDetail?.find((yao) => yao.isChanging);

    return {
      hasMovingYao: !!movingYao,
      movingYaoPosition: movingYao?.position || 0,
      upperTrigramElement: data.mainHexagram?.upper || '',
      lowerTrigramElement: data.mainHexagram?.lower || '',
      elementRelation: this.getElementRelation(
        data.tiGua?.element || '',
        data.yongGua?.element || ''
      ),
    };
  },

  /**
   * 生成梅花易数解读要点
   */
  generateMeihuaInterpretationPoints(data: MeihuaData): string[] {
    const points: string[] = [];

    // 基本卦象信息
    points.push(`主卦：${data.originalName}`);
    points.push(`变卦：${data.changedName}`);

    if (data.interName) {
      points.push(`互卦：${data.interName}`);
    }

    // 八卦分析
    if (data.mainHexagram?.upper && data.mainHexagram?.lower) {
      points.push(
        `上卦${data.mainHexagram.upper}（${data.tiGua.element}），下卦${data.mainHexagram.lower}（${data.yongGua.element}）`
      );
    }

    // 动爻分析
    if (data.movingYao) {
      points.push(`${data.movingYao.description}`);
    }

    // 五行关系
    const analysis = this.analyzeMeihuaHexagram(data);
    if (analysis.elementRelation) {
      points.push(`五行关系：${analysis.elementRelation}`);
    }

    return points;
  },

  /**
   * 获取五行相生相克关系
   */
  getElementRelation(upper: string, lower: string): string {
    const relations: Record<string, Record<string, string>> = {
      金: { 金: '比和', 木: '相克', 水: '相生', 火: '相克', 土: '相生' },
      木: { 金: '相克', 木: '比和', 水: '相生', 火: '相生', 土: '相克' },
      水: { 金: '相生', 木: '相生', 水: '比和', 火: '相克', 土: '相克' },
      火: { 金: '相克', 木: '相生', 水: '相克', 火: '比和', 土: '相生' },
      土: { 金: '相生', 木: '相克', 水: '相克', 火: '相生', 土: '比和' },
    };

    return relations[upper]?.[lower] || '未知';
  },
};
