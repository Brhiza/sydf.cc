import { afterEach, describe, expect, it } from 'vitest';

import { TimeManager } from '../../utils/timeManager';
import { generateMeihua } from './meihua';

const movingYaoCases = [
  {
    iso: '2026-03-01T05:00:00+08:00',
    movingYao: 1,
    tiGua: '巽',
    yongGua: '乾',
    changedTiGua: '巽',
    changedYongGua: '巽',
    tiYongRelation: '用克体',
    changedTiYongRelation: '体用比和',
    lowerTiYong: '用',
    upperTiYong: '体',
  },
  {
    iso: '2026-03-01T07:00:00+08:00',
    movingYao: 2,
    tiGua: '巽',
    yongGua: '兑',
    changedTiGua: '巽',
    changedYongGua: '艮',
    tiYongRelation: '用克体',
    changedTiYongRelation: '体克用',
    lowerTiYong: '用',
    upperTiYong: '体',
  },
  {
    iso: '2026-03-01T09:00:00+08:00',
    movingYao: 3,
    tiGua: '巽',
    yongGua: '离',
    changedTiGua: '巽',
    changedYongGua: '艮',
    tiYongRelation: '体生用',
    changedTiYongRelation: '体克用',
    lowerTiYong: '用',
    upperTiYong: '体',
  },
  {
    iso: '2026-03-01T00:00:00+08:00',
    movingYao: 4,
    tiGua: '坎',
    yongGua: '巽',
    changedTiGua: '坎',
    changedYongGua: '乾',
    tiYongRelation: '体生用',
    changedTiYongRelation: '用生体',
    lowerTiYong: '体',
    upperTiYong: '用',
  },
  {
    iso: '2026-03-01T01:00:00+08:00',
    movingYao: 5,
    tiGua: '艮',
    yongGua: '巽',
    changedTiGua: '艮',
    changedYongGua: '震',
    tiYongRelation: '用克体',
    changedTiYongRelation: '用克体',
    lowerTiYong: '体',
    upperTiYong: '用',
  },
  {
    iso: '2026-03-01T03:00:00+08:00',
    movingYao: 6,
    tiGua: '坤',
    yongGua: '巽',
    changedTiGua: '坤',
    changedYongGua: '坎',
    tiYongRelation: '用克体',
    changedTiYongRelation: '体克用',
    lowerTiYong: '体',
    upperTiYong: '用',
  },
] as const;

describe('梅花易数动爻回归', () => {
  afterEach(() => {
    TimeManager.setTimezoneOffsetMinutesOverride(null);
  });

  it.each(movingYaoCases)(
    '应正确处理第 $movingYao 爻动的体用与变卦体用',
    ({ iso, movingYao, tiGua, yongGua, changedTiGua, changedYongGua, tiYongRelation, changedTiYongRelation, lowerTiYong, upperTiYong }) => {
      TimeManager.setTimezoneOffsetMinutesOverride(480);

      const data = generateMeihua(new Date(iso));

      expect(data.movingYao.position).toBe(movingYao);
      expect(data.tiGua.name).toBe(tiGua);
      expect(data.yongGua.name).toBe(yongGua);
      expect(data.changedTiGua?.name).toBe(changedTiGua);
      expect(data.changedYongGua?.name).toBe(changedYongGua);
      expect(data.analysis.tiYongRelation).toBe(tiYongRelation);
      expect(data.analysis.changedTiYongRelation).toBe(changedTiYongRelation);
      expect(data.analysis.changedRelation).toBe(changedTiYongRelation);

      const lowerYaos = data.yaosDetail.slice(0, 3).map((yao) => yao.tiYong);
      const upperYaos = data.yaosDetail.slice(3, 6).map((yao) => yao.tiYong);

      expect(lowerYaos).toEqual([lowerTiYong, lowerTiYong, lowerTiYong]);
      expect(upperYaos).toEqual([upperTiYong, upperTiYong, upperTiYong]);
    }
  );
});
