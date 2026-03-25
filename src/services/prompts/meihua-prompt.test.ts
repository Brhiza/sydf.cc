import { describe, expect, it } from 'vitest';

import { generateMeihuaPrompt } from './meihua';

describe('generateMeihuaPrompt', () => {
  it('应把四时旺衰写入梅花提示词', async () => {
    const prompt = await generateMeihuaPrompt(
      '这件事最终会如何发展？',
      {
        originalName: '火雷噬嗑',
        changedName: '山雷颐',
        interName: '泽风大过',
        ganzhi: {
          year: '丙午',
          month: '辛卯',
          day: '癸巳',
          hour: '壬子',
        },
        timestamp: 1773936000000,
        tiGua: { name: '震', element: '木', nature: '雷' },
        yongGua: { name: '离', element: '火', nature: '火' },
        changedTiGua: { name: '震', element: '木', nature: '雷' },
        changedYongGua: { name: '艮', element: '土', nature: '山' },
        movingYao: {
          position: 6,
          description: '第6爻动',
          yaoName: '上爻',
        },
        analysis: {
          season: '春',
          tiYongRelation: '体生用',
          tiSeasonState: '死',
          yongSeasonState: '相',
          inter1Relation: '体用比和',
          inter2Relation: '用克体',
          changedRelation: '体克用',
          changedTiYongRelation: '体克用',
        },
        mainHexagram: {
          name: '火雷噬嗑',
          symbol: '☲☳',
          upper: '离',
          lower: '震',
          description: '亨，利用狱',
        },
        interHexagram: {
          name: '泽风大过',
          symbol: '☱☴',
          upper: '兑',
          lower: '巽',
          description: '栋桡，利有攸往',
        },
        changedHexagram: {
          name: '山雷颐',
          symbol: '☶☳',
          upper: '艮',
          lower: '震',
          description: '贞吉，观颐',
        },
        yaosDetail: [
          { position: 1, yaoType: '阳', isChanging: false, tiYong: '体' },
          { position: 2, yaoType: '阴', isChanging: false, tiYong: '体' },
          { position: 3, yaoType: '阳', isChanging: false, tiYong: '体' },
          { position: 4, yaoType: '阳', isChanging: false, tiYong: '用' },
          { position: 5, yaoType: '阴', isChanging: false, tiYong: '用' },
          { position: 6, yaoType: '阳', isChanging: true, tiYong: '用' },
        ],
        calculation: {
          method: '年月日时起卦法',
          upperTrigramIndex: 3,
          lowerTrigramIndex: 4,
          movingYaoIndex: 6,
        },
      },
      '公历：2026年3月20日 0时0分\n农历：丙午年 二月初二 子时\n干支：丙午年 辛卯月 癸巳日 壬子时'
    );

    expect(prompt).toContain('四时旺衰');
    expect(prompt).toContain('春季，体卦死，用卦相');
    expect(prompt).toContain('起卦方式');
    expect(prompt).toContain('年月日时起卦法');
    expect(prompt).toContain('变卦体卦');
    expect(prompt).toContain('震（木）');
    expect(prompt).toContain('变卦用卦');
    expect(prompt).toContain('艮（土）');
  });
});
