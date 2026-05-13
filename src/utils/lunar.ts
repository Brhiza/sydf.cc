/**
 * 农历工具入口
 * 内部组合 ./lunar 子模块:
 *   - time-info    时间/干支/农历的基础查询(公用 SolarDay 抽取)
 *   - void-branches 空亡地支(按六旬生成)
 *   - six-animals   六神序列
 *   - batch-ganzhi  按月/年批量查询干支
 *   - format        显示字符串格式化
 */
import { getCurrentTimeInfo, getGanZhi, getLunar, getTimeInfo } from './lunar/time-info';
import { getVoidBranches } from './lunar/void-branches';
import { getSixAnimals, getSixAnimalsStart } from './lunar/six-animals';
import { getGanZhiForMonth, getGanZhiForYear } from './lunar/batch-ganzhi';
import { formatTimeDisplay } from './lunar/format';

export type { GanZhiInfo, LunarInfo, TimeInfo } from './lunar/types';

export class LunarUtil {
  static getCurrentTimeInfo = getCurrentTimeInfo;
  static getTimeInfo = getTimeInfo;
  static getGanZhi = getGanZhi;
  static getLunar = getLunar;
  static getVoidBranches = getVoidBranches;
  static getSixAnimalsStart = getSixAnimalsStart;
  static getSixAnimals = getSixAnimals;
  static getGanZhiForMonth = getGanZhiForMonth;
  static getGanZhiForYear = getGanZhiForYear;
  static formatTimeDisplay = formatTimeDisplay;
}

export const getCurrentGanZhi = () => getGanZhi();
export const getCurrentLunar = () => getLunar();
export { getCurrentTimeInfo, getVoidBranches, getSixAnimals };
