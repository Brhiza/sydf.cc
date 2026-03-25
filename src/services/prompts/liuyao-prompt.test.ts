import { describe, expect, it } from 'vitest';

import { generateLiuyaoPrompt } from './liuyao';

describe('generateLiuyaoPrompt', () => {
  it('应把特殊卦式与特殊断法提示写入提示词', async () => {
    const prompt = await generateLiuyaoPrompt(
      '这件事结果如何？',
      {
        originalName: '乾为天',
        changedName: '坤为地',
        interName: '乾为天',
        ganzhi: {
          year: '甲子',
          month: '乙丑',
          day: '丙寅',
          hour: '丁卯',
        },
        timestamp: 1711111111111,
        yaoArray: [9, 9, 9, 9, 9, 9],
        changingYaos: [
          { position: 1, isChanging: true, type: '老阳' },
          { position: 2, isChanging: true, type: '老阳' },
          { position: 3, isChanging: true, type: '老阳' },
          { position: 4, isChanging: true, type: '老阳' },
          { position: 5, isChanging: true, type: '老阳' },
          { position: 6, isChanging: true, type: '老阳' },
        ],
        sixGods: ['青龙', '朱雀', '勾陈', '螣蛇', '白虎', '玄武'],
        sixRelatives: ['兄弟', '父母', '官鬼', '妻财', '子孙', '兄弟'],
        najiaDizhi: ['子', '寅', '辰', '午', '申', '戌'],
        wuxing: ['水', '木', '土', '火', '金', '土'],
        worldAndResponse: ['世', '', '', '应', '', ''],
        voidBranches: ['戌', '亥'],
        palace: {
          name: '乾',
          wuxing: '金',
        },
        specialPattern: '乾卦用九',
        specialAdvice: '乾卦六爻皆动，宜以用九“见群龙无首，吉”为主。',
        isChaotic: false,
        yaosDetail: [
          {
            position: 1,
            rawValue: 9,
            yaoType: '阳',
            isChanging: true,
            changeType: '老阳',
            sixGod: '青龙',
            sixRelative: '兄弟',
            najiaDizhi: '子',
            wuxing: '水',
            isWorld: true,
            isResponse: false,
            isVoid: false,
            changedYao: {
              dizhi: '未',
              wuxing: '土',
              liuqin: '父母',
              isVoid: false,
            },
          },
          {
            position: 2,
            rawValue: 9,
            yaoType: '阳',
            isChanging: true,
            changeType: '老阳',
            sixGod: '朱雀',
            sixRelative: '父母',
            najiaDizhi: '寅',
            wuxing: '木',
            isWorld: false,
            isResponse: false,
            isVoid: false,
            changedYao: null,
          },
          {
            position: 3,
            rawValue: 9,
            yaoType: '阳',
            isChanging: true,
            changeType: '老阳',
            sixGod: '勾陈',
            sixRelative: '官鬼',
            najiaDizhi: '辰',
            wuxing: '土',
            isWorld: false,
            isResponse: false,
            isVoid: false,
            changedYao: null,
          },
          {
            position: 4,
            rawValue: 9,
            yaoType: '阳',
            isChanging: true,
            changeType: '老阳',
            sixGod: '螣蛇',
            sixRelative: '妻财',
            najiaDizhi: '午',
            wuxing: '火',
            isWorld: false,
            isResponse: true,
            isVoid: false,
            changedYao: null,
          },
          {
            position: 5,
            rawValue: 9,
            yaoType: '阳',
            isChanging: true,
            changeType: '老阳',
            sixGod: '白虎',
            sixRelative: '子孙',
            najiaDizhi: '申',
            wuxing: '金',
            isWorld: false,
            isResponse: false,
            isVoid: false,
            changedYao: null,
          },
          {
            position: 6,
            rawValue: 9,
            yaoType: '阳',
            isChanging: true,
            changeType: '老阳',
            sixGod: '玄武',
            sixRelative: '兄弟',
            najiaDizhi: '戌',
            wuxing: '土',
            isWorld: false,
            isResponse: false,
            isVoid: true,
            changedYao: null,
          },
        ],
      },
      '公历：2026年1月1日 12时0分\n农历：甲子年 正月初一 午时\n干支：甲子年 乙丑月 丙寅日 丁卯时'
    );

    expect(prompt).toContain('特殊卦式：乾卦用九');
    expect(prompt).toContain('特殊提示：乾卦六爻皆动');
    expect(prompt).toContain('用神参考：');
    expect(prompt).toContain('若为乾卦用九或坤卦用六，则优先按用九、用六的总辞把握大势');
  });

  it('财运问题应给出妻财用神参考', async () => {
    const prompt = await generateLiuyaoPrompt(
      '这笔投资能赚钱吗？',
      {
        originalName: '山火贲',
        changedName: '山火贲',
        interName: '雷水解',
        ganzhi: {
          year: '乙巳',
          month: '戊子',
          day: '乙亥',
          hour: '壬午',
        },
        timestamp: 1711111111111,
        yaoArray: [7, 8, 7, 8, 8, 7],
        changingYaos: [],
        sixGods: ['青龙', '朱雀', '勾陈', '螣蛇', '白虎', '玄武'],
        sixRelatives: ['官鬼', '兄弟', '妻财', '兄弟', '妻财', '官鬼'],
        najiaDizhi: ['卯', '丑', '亥', '戌', '子', '寅'],
        wuxing: ['木', '土', '水', '土', '水', '木'],
        worldAndResponse: ['世', '', '', '应', '', ''],
        voidBranches: ['申', '酉'],
        palace: { name: '艮', wuxing: '土' },
        yaosDetail: [],
        specialPattern: '静卦',
        specialAdvice: '六爻安静，以本卦卦意和世应用神为主。',
        isChaotic: false,
      },
      '公历：2026年1月1日 12时0分\n农历：乙巳年 十一月十三 午时\n干支：乙巳年 戊子月 乙亥日 壬午时'
    );

    expect(prompt).toContain('用神参考：妻财为主用神');
  });
});
