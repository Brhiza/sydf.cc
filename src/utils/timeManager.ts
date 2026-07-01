/**
 * 统一的占卜时间管理工具
 * 简化时间相关操作，确保所有占卜基于统一的时间基础
 */
import type { TimeInfo, GanZhiInfo } from 'mingyu-core/calendar';
import { SolarTime } from 'tyme4ts';

/**
 * 统一的占卜时间数据
 */
export interface DivinationTime {
  /** 完整时间信息 */
  timeInfo: TimeInfo;
  /** 干支信息 */
  ganzhi: GanZhiInfo;
  /** 时间戳 */
  timestamp: number;
}

/**
 * 时间管理工具类
 */
export class TimeManager {
  /**
   * 时区偏移覆盖（单位：分钟，正数表示 UTC+）
   * - null：不覆盖，使用运行环境本地时区
   * - 例如：北京时间为 480
   */
  private static timezoneOffsetMinutesOverride: number | null = null;

  /**
   * 设置时区偏移覆盖（用于服务端/边缘环境固定时区）
   */
  static setTimezoneOffsetMinutesOverride(offsetMinutes: number | null): void {
    this.timezoneOffsetMinutesOverride = offsetMinutes;
  }

  /**
   * 获取目标时区偏移（分钟）
   */
  private static getTimezoneOffsetMinutes(date: Date): number {
    const override = this.timezoneOffsetMinutesOverride;
    if (typeof override === 'number' && Number.isFinite(override)) {
      return override;
    }
    // Date#getTimezoneOffset 返回“本地到UTC需要加多少分钟”，因此本地偏移 = -getTimezoneOffset
    return -date.getTimezoneOffset();
  }

  /**
   * 在指定时区偏移下提取年月日时分（不改变原始时间戳）
   */
  private static getDatePartsInOffset(date: Date, offsetMinutes: number): {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
  } {
    const shifted = new Date(date.getTime() + offsetMinutes * 60 * 1000);
    return {
      year: shifted.getUTCFullYear(),
      month: shifted.getUTCMonth() + 1,
      day: shifted.getUTCDate(),
      hour: shifted.getUTCHours(),
      minute: shifted.getUTCMinutes(),
    };
  }

  /**
   * 获取占卜用的统一时间数据
   * @param customTime 自定义时间（可选）
   * @returns 统一的时间数据
   */
  static getDivinationTime(customTime?: Date): DivinationTime {
    const targetTime = customTime || new Date();
    const timeInfo = this.getTimeInfo(targetTime);
    const ganzhi = this.getGanZhi(targetTime);
    const timestamp = targetTime.getTime();
    
    return { timeInfo, ganzhi, timestamp };
  }

  /**
   * 获取指定时间的干支信息
   */
  private static getGanZhi(date: Date): GanZhiInfo {
    const offsetMinutes = this.getTimezoneOffsetMinutes(date);
    const parts = this.getDatePartsInOffset(date, offsetMinutes);
    const solarTime = SolarTime.fromYmdHms(parts.year, parts.month, parts.day, parts.hour, parts.minute, 0);
    const lunarHour = solarTime.getLunarHour();
    const lunarDay = lunarHour.getLunarDay();

    return {
      year: lunarHour.getYearSixtyCycle().toString(),
      month: lunarHour.getMonthSixtyCycle().toString(),
      day: lunarDay.getSixtyCycle().toString(),
      hour: lunarHour.getSixtyCycle().toString(),
    };
  }

  /**
   * 获取指定时间的完整信息
   */
  private static getTimeInfo(date: Date): TimeInfo {
    const offsetMinutes = this.getTimezoneOffsetMinutes(date);
    const parts = this.getDatePartsInOffset(date, offsetMinutes);
    const solarTime = SolarTime.fromYmdHms(parts.year, parts.month, parts.day, parts.hour, parts.minute, 0);
    const solarDay = solarTime.getSolarDay();
    const lunarHour = solarTime.getLunarHour();
    const lunarDay = lunarHour.getLunarDay();
    const lunarDayText = lunarDay.toString().replace(/^农历/, '');
    const lunarHourText = lunarHour.toString().replace(/^农历/, '');
    const jieQi = solarTime.getTerm();

    return {
      solar: {
        year: solarDay.getYear(),
        month: solarDay.getMonth(),
        day: solarDay.getDay(),
        hour: parts.hour,
        minute: parts.minute,
      },
      lunar: {
        year: lunarHour.getYearSixtyCycle().toString(),
        month: lunarHour.getMonthSixtyCycle().toString(),
        day: lunarDay.getSixtyCycle().toString(),
        hour: lunarHour.getSixtyCycle().toString(),
        yearInChinese: lunarDayText.split('年')[0] + '年',
        monthInChinese: lunarDayText.split('年')[1].split('月')[0] + '月',
        dayInChinese: lunarDayText.split('月')[1],
        hourInChinese: lunarHourText.slice(-2),
        monthNumber: lunarDay.getMonth(),
        dayNumber: lunarDay.getDay(),
      },
      ganzhi: {
        year: lunarHour.getYearSixtyCycle().toString(),
        month: lunarHour.getMonthSixtyCycle().toString(),
        day: lunarDay.getSixtyCycle().toString(),
        hour: lunarHour.getSixtyCycle().toString(),
      },
      eightChar: {
        year: lunarHour.getYearSixtyCycle().toString(),
        month: lunarHour.getMonthSixtyCycle().toString(),
        day: lunarDay.getSixtyCycle().toString(),
        hour: lunarHour.getSixtyCycle().toString(),
      },
      jieQi: jieQi.getName(),
    };
  }
}

// 导出便捷函数
export const getDivinationTime = TimeManager.getDivinationTime.bind(TimeManager);
export const setTimezoneOffsetMinutesOverride = TimeManager.setTimezoneOffsetMinutesOverride.bind(TimeManager);
