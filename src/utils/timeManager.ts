/**
 * 统一的占卜时间管理工具
 * 简化时间相关操作，确保所有占卜基于统一的时间基础
 */
import { getCurrentTimeInfo, getCurrentGanZhi } from './lunar.ts';
import type { TimeInfo, GanZhiInfo } from './lunar.ts';
import { SolarDay } from 'tyme4ts';

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
    // 当启用时区覆盖时，不再依赖 LunarUtil.getCurrentTimeInfo() 的运行时本地时区
    if (!customTime && this.timezoneOffsetMinutesOverride !== null) {
      const now = new Date();
      const timeInfo = this.getTimeInfo(now);
      const ganzhi = this.getGanZhi(now);
      const timestamp = now.getTime();
      return { timeInfo, ganzhi, timestamp };
    }

    const timeInfo = customTime ? this.getTimeInfo(customTime) : getCurrentTimeInfo();
    const ganzhi = customTime ? this.getGanZhi(customTime) : getCurrentGanZhi();
    const timestamp = customTime ? customTime.getTime() : Date.now();
    
    return { timeInfo, ganzhi, timestamp };
  }

  /**
   * 基于时间戳生成确定性随机数
   * @param timestamp 时间戳
   * @param range 范围
   * @returns 确定性随机数
   */
  static getSeededRandom(timestamp: number, range: number = 1): number {
    // 使用简单但确定性的伪随机算法
    const seed = timestamp % 2147483647;
    const a = 1664525;
    const c = 1013904223;
    const m = 2147483647;
    const result = (a * seed + c) % m;
    return (result % range + range) % range;
  }

  /**
   * 基于时间生成爻象
   * @param timestamp 时间戳
   * @param count 爻象数量
   * @returns 爻象数组
   */
  static generateYaosByTime(timestamp: number, count: number = 6): number[] {
    const yaos: number[] = [];
    for (let i = 0; i < count; i++) {
      // 为每个爻生成不同的种子
      const yaoSeed = timestamp + i * 1000;
      // 模拟铜钱投掷：0-3的随机数对应6,7,8,9
      const coinResult = this.getSeededRandom(yaoSeed, 4);
      yaos.push([6, 7, 8, 9][coinResult]);
    }
    return yaos;
  }

  /**
   * 随机生成爻象
   * @param count 爻象数量
   * @returns 爻象数组
   */
  static generateYaosByRandom(count: number = 6): number[] {
    const yaos: number[] = [];
    for (let i = 0; i < count; i++) {
      // 使用真随机数
      const coinResult = Math.floor(Math.random() * 4);
      yaos.push([6, 7, 8, 9][coinResult]);
    }
    return yaos;
  }

  /**
   * 根据数字生成爻象
   * @param number 输入的数字
   * @param count 爻象数量
   * @returns 爻象数组
   */
  static generateYaosByNumber(number: number, count: number = 6): number[] {
    const yaos: number[] = [];
    let currentNumber = number;
    for (let i = 0; i < count; i++) {
      // 使用数字的不同位和一些变换来增加多样性
      const seed = (currentNumber % 100) + i * 10 + (currentNumber / 100);
      const coinResult = Math.floor(seed) % 4;
      yaos.push([6, 7, 8, 9][coinResult]);
      // 变换数字，用于下一个爻的计算
      currentNumber = (currentNumber * 3 + 7) / 2;
    }
    return yaos;
  }

  /**
   * 获取指定时间的干支信息
   */
  private static getGanZhi(date: Date): GanZhiInfo {
    const offsetMinutes = this.getTimezoneOffsetMinutes(date);
    const parts = this.getDatePartsInOffset(date, offsetMinutes);

    // 复用现有逻辑，但移除错误处理
    const solar = SolarDay.fromYmd(parts.year, parts.month, parts.day);
    const lunar = solar.getLunarDay();
    
    const currentHour = parts.hour;
    const hours = lunar.getHours();
    const hourIndex = this.calculateHourIndex(currentHour);
    const currentLunarHour = hours[hourIndex] || hours[0];

    return {
      year: lunar.getYearSixtyCycle().toString(),
      month: lunar.getMonthSixtyCycle().toString(),
      day: lunar.getSixtyCycle().toString(),
      hour: currentLunarHour.getSixtyCycle().toString(),
    };
  }

  /**
   * 获取指定时间的完整信息
   */
  private static getTimeInfo(date: Date): TimeInfo {
    const offsetMinutes = this.getTimezoneOffsetMinutes(date);
    const parts = this.getDatePartsInOffset(date, offsetMinutes);

    // 复用现有逻辑，但移除错误处理
    const solar = SolarDay.fromYmd(parts.year, parts.month, parts.day);
    const lunar = solar.getLunarDay();
    const jieQi = solar.getTerm();

    const currentHour = parts.hour;
    const hours = lunar.getHours();
    const hourIndex = this.calculateHourIndex(currentHour);
    const currentLunarHour = hours[hourIndex] || hours[0];

    return {
      solar: {
        year: solar.getYear(),
        month: solar.getMonth(),
        day: solar.getDay(),
        hour: parts.hour,
        minute: parts.minute,
      },
      lunar: {
        year: lunar.getYearSixtyCycle().toString(),
        month: lunar.getMonthSixtyCycle().toString(),
        day: lunar.getSixtyCycle().toString(),
        hour: currentLunarHour.getSixtyCycle().toString(),
        yearInChinese: lunar.toString().split('年')[0] + '年',
        monthInChinese: lunar.toString().split('年')[1].split('月')[0] + '月',
        dayInChinese: lunar.toString().split('月')[1],
        hourInChinese: currentLunarHour.toString().slice(-2) + '时',
        monthNumber: lunar.getMonth(),
        dayNumber: lunar.getDay(),
      },
      ganzhi: {
        year: lunar.getYearSixtyCycle().toString(),
        month: lunar.getMonthSixtyCycle().toString(),
        day: lunar.getSixtyCycle().toString(),
        hour: currentLunarHour.getSixtyCycle().toString(),
      },
      eightChar: {
        year: lunar.getYearSixtyCycle().toString(),
        month: lunar.getMonthSixtyCycle().toString(),
        day: lunar.getSixtyCycle().toString(),
        hour: currentLunarHour.getSixtyCycle().toString(),
      },
      jieQi: jieQi.getName(),
    };
  }

  /**
   * 计算时辰索引
   */
  private static calculateHourIndex(currentHour: number): number {
    if (currentHour >= 23 || currentHour < 1) return 0; // 子时
    if (currentHour >= 1 && currentHour < 3) return 1; // 丑时
    if (currentHour >= 3 && currentHour < 5) return 2; // 寅时
    if (currentHour >= 5 && currentHour < 7) return 3; // 卯时
    if (currentHour >= 7 && currentHour < 9) return 4; // 辰时
    if (currentHour >= 9 && currentHour < 11) return 5; // 巳时
    if (currentHour >= 11 && currentHour < 13) return 6; // 午时
    if (currentHour >= 13 && currentHour < 15) return 7; // 未时
    if (currentHour >= 15 && currentHour < 17) return 8; // 申时
    if (currentHour >= 17 && currentHour < 19) return 9; // 酉时
    if (currentHour >= 19 && currentHour < 21) return 10; // 戌时
    if (currentHour >= 21 && currentHour < 23) return 11; // 亥时
    return 0; // 默认子时
  }
}

// 导出便捷函数
export const getDivinationTime = TimeManager.getDivinationTime.bind(TimeManager);
export const generateYaosByTime = TimeManager.generateYaosByTime.bind(TimeManager);
export const generateYaosByRandom = TimeManager.generateYaosByRandom.bind(TimeManager);
export const generateYaosByNumber = TimeManager.generateYaosByNumber.bind(TimeManager);
export const setTimezoneOffsetMinutesOverride = TimeManager.setTimezoneOffsetMinutesOverride.bind(TimeManager);
