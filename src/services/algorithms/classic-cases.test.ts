import { afterEach, describe, expect, it } from 'vitest';

import { TimeManager } from '../../utils/timeManager';
import { generateLiuyao } from './liuyao';
import { generateMeihua } from './meihua';
import { generateQimen } from './qimen';

describe('经典盘例回归', () => {
  afterEach(() => {
    TimeManager.setTimezoneOffsetMinutesOverride(null);
  });

  it('六爻固定时间应稳定产出相同排盘结果', () => {
    TimeManager.setTimezoneOffsetMinutesOverride(480);

    const data = generateLiuyao(new Date('2026-01-01T12:00:00+08:00'));

    expect(data.ganzhi).toEqual({
      year: '乙巳',
      month: '戊子',
      day: '乙亥',
      hour: '壬午',
    });
    expect(data.originalName).toBe('山火贲');
    expect(data.changedName).toBe('山火贲');
    expect(data.interName).toBe('雷水解');
    expect(data.yaoArray).toEqual([7, 8, 7, 8, 8, 7]);
    expect(data.palace).toEqual({ name: '艮', wuxing: '土' });
    expect(data.worldAndResponse).toEqual(['世', '', '', '应', '', '']);
    expect(data.voidBranches).toEqual(['申', '酉']);
    expect(data.specialPattern).toBe('静卦');
    expect(data.changingYaos).toEqual([]);
  });

  it('梅花固定时间应稳定产出相同主互变与体用关系', () => {
    TimeManager.setTimezoneOffsetMinutesOverride(480);

    const data = generateMeihua(new Date('2026-03-20T00:00:00+08:00'));

    expect(data.ganzhi).toEqual({
      year: '丙午',
      month: '辛卯',
      day: '癸巳',
      hour: '壬子',
    });
    expect(data.originalName).toBe('火雷噬嗑');
    expect(data.interName).toBe('泽风大过');
    expect(data.changedName).toBe('山雷颐');
    expect(data.movingYao.position).toBe(6);
    expect(data.tiGua.name).toBe('震');
    expect(data.yongGua.name).toBe('离');
    expect(data.changedTiGua).toEqual({ name: '震', element: '木', nature: '雷' });
    expect(data.changedYongGua).toEqual({ name: '艮', element: '土', nature: '山' });
    expect(data.analysis).toEqual({
      season: '春',
      tiYongRelation: '体生用',
      tiSeasonState: '旺',
      yongSeasonState: '相',
      inter1Relation: '体用比和',
      inter2Relation: '用克体',
      changedRelation: '体克用',
      changedTiYongRelation: '体克用',
    });
    expect(data.calculation).toMatchObject({
      method: '年月日时起卦法',
      upperTrigramIndex: 3,
      lowerTrigramIndex: 4,
      movingYaoIndex: 6,
    });
  });

  it('奇门固定时间应稳定产出相同局数和值符值使', () => {
    TimeManager.setTimezoneOffsetMinutesOverride(480);

    const data = generateQimen(new Date('2004-08-10T12:00:00+08:00'));
    const gong4 = data.jiuGongGe.find((gong) => gong.gong === 4);
    const gong8 = data.jiuGongGe.find((gong) => gong.gong === 8);
    const gong9 = data.jiuGongGe.find((gong) => gong.gong === 9);

    expect(data.ganzhi).toEqual({
      year: '甲申',
      month: '壬申',
      day: '辛酉',
      hour: '甲午',
    });
    expect(data.timeInfo).toEqual({
      solarTerm: '立秋',
      epoch: '下元',
    });
    expect(data.isYangDun).toBe(false);
    expect(data.juShu).toBe(8);
    expect(data.zhiFu).toBe('天英');
    expect(data.zhiShi).toBe('景门');
    expect(data.specialConditions).toMatchObject({
      isLiuJiaHour: true,
      isLiuGuiHour: false,
      isShiGanRuMu: false,
      isWuBuYuShi: false,
    });
    expect(gong4).toMatchObject({
      tianPan: { star: '天蓬', stem: '丙' },
      diPan: { stem: '壬' },
      renPan: { door: '死门' },
      shenPan: { god: '值符' },
    });
    expect(gong8).toMatchObject({
      tianPan: { star: '天心', stem: '庚' },
      diPan: { stem: '戊' },
      renPan: { door: '开门' },
      shenPan: { god: '玄武' },
    });
    expect(gong9).toMatchObject({
      tianPan: { star: '天禽', stem: '辛' },
      diPan: { stem: '乙' },
      renPan: { door: '景门' },
      shenPan: { god: '白虎' },
    });
  });
});
