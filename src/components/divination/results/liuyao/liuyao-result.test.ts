import { describe, expect, it } from 'vitest';
import type { LiuyaoData } from '@/types/divination';
import {
  createLiuyaoDisplayRows,
  createLiuyaoSummaryItems,
  formatChangingYaos,
} from './liuyao-result';

const sampleData: LiuyaoData = {
  originalName: '火天大有',
  changedName: '火雷噬嗑',
  interName: '泽天夬',
  ganzhi: {
    year: '甲子',
    month: '乙丑',
    day: '丙寅',
    hour: '丁卯',
  },
  timestamp: 1,
  yaoArray: [7, 8, 9, 6, 7, 8],
  changingYaos: [
    { position: 3, isChanging: true, type: '老阳' },
    { position: 4, isChanging: true, type: '老阴' },
  ],
  sixGods: ['青龙', '朱雀', '勾陈', '腾蛇', '白虎', '玄武'],
  sixRelatives: ['兄弟', '子孙', '妻财', '官鬼', '父母', '兄弟'],
  najiaDizhi: ['子', '丑', '寅', '卯', '辰', '巳'],
  wuxing: ['水', '土', '木', '木', '土', '火'],
  worldAndResponse: ['世', '', '', '应', '', ''],
  voidBranches: ['辰', '巳'],
  palace: {
    name: '乾',
    wuxing: '金',
  },
  yaosDetail: [
    {
      position: 1,
      yaoType: '阳',
      isChanging: false,
      rawValue: 7,
      changeType: '',
      sixGod: '青龙',
      sixRelative: '兄弟',
      najiaDizhi: '子',
      wuxing: '水',
      isWorld: true,
      isResponse: false,
      isVoid: false,
      changedYao: null,
    },
    {
      position: 2,
      yaoType: '阴',
      isChanging: false,
      rawValue: 8,
      changeType: '',
      sixGod: '朱雀',
      sixRelative: '子孙',
      najiaDizhi: '丑',
      wuxing: '土',
      isWorld: false,
      isResponse: false,
      isVoid: false,
      changedYao: null,
    },
    {
      position: 3,
      yaoType: '阳',
      isChanging: true,
      rawValue: 9,
      changeType: '老阳',
      sixGod: '勾陈',
      sixRelative: '妻财',
      najiaDizhi: '寅',
      wuxing: '木',
      isWorld: false,
      isResponse: false,
      isVoid: false,
      changedYao: {
        liuqin: '官鬼',
        dizhi: '午',
        wuxing: '火',
        isVoid: false,
      },
    },
    {
      position: 4,
      yaoType: '阴',
      isChanging: true,
      rawValue: 6,
      changeType: '老阴',
      sixGod: '腾蛇',
      sixRelative: '官鬼',
      najiaDizhi: '卯',
      wuxing: '木',
      isWorld: false,
      isResponse: true,
      isVoid: true,
      changedYao: {
        liuqin: '父母',
        dizhi: '申',
        wuxing: '金',
        isVoid: false,
      },
    },
    {
      position: 5,
      yaoType: '阳',
      isChanging: false,
      rawValue: 7,
      changeType: '',
      sixGod: '白虎',
      sixRelative: '父母',
      najiaDizhi: '辰',
      wuxing: '土',
      isWorld: false,
      isResponse: false,
      isVoid: true,
      changedYao: null,
    },
    {
      position: 6,
      yaoType: '阴',
      isChanging: false,
      rawValue: 8,
      changeType: '',
      sixGod: '玄武',
      sixRelative: '兄弟',
      najiaDizhi: '巳',
      wuxing: '火',
      isWorld: false,
      isResponse: false,
      isVoid: false,
      changedYao: null,
    },
  ],
  specialPattern: '独静卦',
  specialAdvice: '世爻临青龙，宜主动争取。',
};

describe('liuyao-result', () => {
  it('会格式化动爻摘要', () => {
    expect(formatChangingYaos(sampleData.changingYaos)).toBe('第3爻（老阳）、第4爻（老阴）');
    expect(formatChangingYaos([])).toBe('');
  });

  it('会生成六爻头部摘要条目', () => {
    const items = createLiuyaoSummaryItems(sampleData);

    expect(items.map((item) => item.label)).toEqual([
      '主卦',
      '变卦',
      '旬空',
      '互卦',
      '特殊卦式',
      '断卦提示',
      '动爻',
    ]);
    expect(items[0]?.value).toBe('火天大有（乾宫）');
    expect(items[5]?.className).toBe('special-advice-line');
    expect(items[6]?.value).toBe('第3爻（老阳）、第4爻（老阴）');
  });

  it('会生成倒序排盘行，并带出变爻与世应信息', () => {
    const rows = createLiuyaoDisplayRows(sampleData);

    expect(rows).toHaveLength(6);
    expect(rows[0]).toMatchObject({
      key: 6,
      sixGod: '玄武',
      yaoInfo: '兄弟巳火',
      changedYaoInfo: '兄弟巳火',
    });
    expect(rows[2]).toMatchObject({
      key: 4,
      changeMarkSymbol: '×',
      voidMark: '空',
      worldResponseMark: '应',
      changedYaoType: '阳',
      changedYaoInfo: '父母申金',
    });
    expect(rows[3]).toMatchObject({
      key: 3,
      changeMarkSymbol: '●',
      changedYaoType: '阴',
      changedYaoInfo: '官鬼午火',
    });
    expect(rows[5]).toMatchObject({
      key: 1,
      worldResponseMark: '世',
    });
  });
});
