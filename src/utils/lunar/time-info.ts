import { SolarDay } from 'tyme4ts';
import type { GanZhiInfo, LunarInfo, TimeInfo } from './types';

/**
 * 时辰索引:子时(23-1)→0、丑(1-3)→1、寅(3-5)→2... 亥(21-23)→11。
 * 等价表达式:((hour+1) % 24) / 2 取整。
 */
export function calculateHourIndex(currentHour: number): number {
  return Math.floor(((currentHour + 1) % 24) / 2);
}

function extractLunarContext(date: Date) {
  const solar = SolarDay.fromYmd(date.getFullYear(), date.getMonth() + 1, date.getDate());
  const lunar = solar.getLunarDay();
  const hours = lunar.getHours();
  const hourIndex = calculateHourIndex(date.getHours());
  const currentLunarHour = hours[hourIndex] || hours[0];
  return { solar, lunar, currentLunarHour };
}

function buildGanZhiInfo(
  lunar: ReturnType<SolarDay['getLunarDay']>,
  currentLunarHour: ReturnType<ReturnType<SolarDay['getLunarDay']>['getHours']>[number]
): GanZhiInfo {
  return {
    year: lunar.getYearSixtyCycle().toString(),
    month: lunar.getMonthSixtyCycle().toString(),
    day: lunar.getSixtyCycle().toString(),
    hour: currentLunarHour.getSixtyCycle().toString(),
  };
}

function buildLunarInfo(
  lunar: ReturnType<SolarDay['getLunarDay']>,
  currentLunarHour: ReturnType<ReturnType<SolarDay['getLunarDay']>['getHours']>[number]
): LunarInfo {
  const lunarString = lunar.toString();
  const [yearInChinese, afterYear] = lunarString.split('年');
  const [monthOnly, dayInChinese] = afterYear.split('月');
  return {
    year: lunar.getYearSixtyCycle().toString(),
    month: lunar.getMonthSixtyCycle().toString(),
    day: lunar.getSixtyCycle().toString(),
    hour: currentLunarHour.getSixtyCycle().toString(),
    yearInChinese,
    monthInChinese: `${monthOnly}月`,
    dayInChinese,
    hourInChinese: currentLunarHour.toString().slice(-2),
    monthNumber: lunar.getMonth(),
    dayNumber: lunar.getDay(),
  };
}

export function getCurrentTimeInfo(): TimeInfo {
  return getTimeInfo(new Date());
}

export function getTimeInfo(date: Date): TimeInfo {
  try {
    const { solar, lunar, currentLunarHour } = extractLunarContext(date);
    const ganzhi = buildGanZhiInfo(lunar, currentLunarHour);
    return {
      solar: {
        year: solar.getYear(),
        month: solar.getMonth(),
        day: solar.getDay(),
        hour: date.getHours(),
        minute: date.getMinutes(),
      },
      lunar: buildLunarInfo(lunar, currentLunarHour),
      ganzhi,
      eightChar: { ...ganzhi },
      jieQi: solar.getTerm().getName(),
    };
  } catch (error) {
    console.error('tyme4ts库调用失败:', error);
    throw error;
  }
}

export function getGanZhi(date?: Date): GanZhiInfo {
  try {
    const { lunar, currentLunarHour } = extractLunarContext(date || new Date());
    return buildGanZhiInfo(lunar, currentLunarHour);
  } catch (error) {
    console.error('tyme4ts库调用失败:', error);
    throw error;
  }
}

export function getLunar(date?: Date): LunarInfo {
  try {
    const { lunar, currentLunarHour } = extractLunarContext(date || new Date());
    return buildLunarInfo(lunar, currentLunarHour);
  } catch (error) {
    console.error('tyme4ts库调用失败:', error);
    throw error;
  }
}
