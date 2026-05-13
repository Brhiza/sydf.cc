export interface GanZhiInfo {
  year: string;
  month: string;
  day: string;
  hour: string;
}

export interface LunarInfo {
  year: string;
  month: string;
  day: string;
  hour: string;
  yearInChinese: string;
  monthInChinese: string;
  dayInChinese: string;
  hourInChinese: string;
  monthNumber: number;
  dayNumber: number;
}

export interface TimeInfo {
  solar: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
  };
  lunar: LunarInfo;
  ganzhi: GanZhiInfo;
  eightChar: {
    year: string;
    month: string;
    day: string;
    hour: string;
  };
  jieQi: string;
}
