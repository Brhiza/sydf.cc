import type { TimeInfo } from './types';

export function formatTimeDisplay(timeInfo: TimeInfo): {
  solar: string;
  lunar: string;
  ganzhi: string;
} {
  const { solar, lunar, ganzhi } = timeInfo;
  return {
    solar: `公历：${solar.year}年${solar.month}月${solar.day}日 ${solar.hour}时${solar.minute}分`,
    lunar: `农历：${lunar.yearInChinese}年 ${lunar.monthInChinese}${lunar.dayInChinese} ${lunar.hourInChinese}`,
    ganzhi: `干支：${ganzhi.year}年 ${ganzhi.month}月 ${ganzhi.day}日 ${ganzhi.hour}时`,
  };
}
