import { SolarDay } from 'tyme4ts';

function pad2(value: number): string {
  return String(value).padStart(2, '0');
}

/**
 * 获取指定公历月份每日的干支
 */
export function getGanZhiForMonth(
  year: number,
  month: number
): { date: string; ganZhi: string; lunarDate: string }[] {
  const daysInMonth = new Date(year, month, 0).getDate();
  const result: { date: string; ganZhi: string; lunarDate: string }[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    try {
      const solar = SolarDay.fromYmd(year, month, day);
      const lunar = solar.getLunarDay();
      const lunarString = lunar.toString();
      const lunarMonth = `${lunarString.split('年')[1].split('月')[0]}月`;
      const lunarDay = lunarString.split('月')[1];
      result.push({
        date: `${year}-${pad2(month)}-${pad2(day)}`,
        ganZhi: lunar.getSixtyCycle().toString(),
        lunarDate: `${lunarMonth}${lunarDay}`,
      });
    } catch (error) {
      console.error(`Error calculating GanZhi for ${year}-${month}-${day}:`, error);
    }
  }

  return result;
}

/**
 * 获取指定公历年份每月的干支(以每月 15 号为代表)
 */
export function getGanZhiForYear(year: number): { month: number; ganZhi: string }[] {
  const result: { month: number; ganZhi: string }[] = [];
  for (let month = 1; month <= 12; month++) {
    try {
      const solar = SolarDay.fromYmd(year, month, 15);
      const lunar = solar.getLunarDay();
      result.push({ month, ganZhi: lunar.getMonthSixtyCycle().toString() });
    } catch (error) {
      console.error(`Error calculating GanZhi for month ${year}-${month}:`, error);
    }
  }
  return result;
}
