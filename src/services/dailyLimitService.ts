import { storageService } from './storageService';

/**
 * 每日限制服务
 * 管理今日运势的每日抽取限制
 */

interface DailyLimitRecord {
  date: string; // YYYY-MM-DD格式
  hasUsed: boolean;
  timestamp: number;
}

const DAILY_LIMIT_KEY = 'daily_fortune_limit';

/**
 * 每日限制服务类
 */
export class DailyLimitService {
  /**
   * 检查今日是否已经使用过今日运势
   */
  static hasUsedToday(): boolean {
    const today = new Date();
    // 使用本地时间而不是UTC时间，避免时区问题
    const todayStr = today.getFullYear() + '-' + 
      String(today.getMonth() + 1).padStart(2, '0') + '-' + 
      String(today.getDate()).padStart(2, '0');
    const record = this.getRecord();
    
    return record.date === todayStr && record.hasUsed;
  }

  /**
   * 记录今日已使用今日运势
   */
  static markAsUsed(): void {
    const today = new Date();
    // 使用本地时间而不是UTC时间，避免时区问题
    const todayStr = today.getFullYear() + '-' + 
      String(today.getMonth() + 1).padStart(2, '0') + '-' + 
      String(today.getDate()).padStart(2, '0');
    const record: DailyLimitRecord = {
      date: todayStr,
      hasUsed: true,
      timestamp: Date.now()
    };
    
    storageService.setItem(DAILY_LIMIT_KEY, record);
  }

  /**
   * 获取当前记录
   */
  static getRecord(): DailyLimitRecord {
    const record = storageService.getItem<DailyLimitRecord>(DAILY_LIMIT_KEY);
    
    if (!record) {
      return {
        date: '',
        hasUsed: false,
        timestamp: 0
      };
    }
    
    return record;
  }

  /**
   * 检查是否可以抽取今日运势
   */
  static canDrawToday(): boolean {
    return !this.hasUsedToday();
  }

  /**
   * 获取距离下次可抽取的时间
   */
  static getTimeUntilNextDraw(): {
    canDraw: boolean;
    hoursRemaining: number;
    minutesRemaining: number;
    message: string;
  } {
    if (this.canDrawToday()) {
      return {
        canDraw: true,
        hoursRemaining: 0,
        minutesRemaining: 0,
        message: '现在可以抽取今日运势'
      };
    }

    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const timeDiff = tomorrow.getTime() - now.getTime();
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    let message = '';
    if (hours > 0) {
      message = `距离下次可抽取还有 ${hours} 小时${minutes > 0 ? ` ${minutes} 分钟` : ''}`;
    } else {
      message = `距离下次可抽取还有 ${minutes} 分钟`;
    }
    
    return {
      canDraw: false,
      hoursRemaining: hours,
      minutesRemaining: minutes,
      message
    };
  }

  /**
   * 获取今日使用状态
   */
  static getTodayStatus(): {
    hasUsed: boolean;
    canDraw: boolean;
    usedTime?: string;
    nextAvailableTime?: string;
  } {
    const record = this.getRecord();
    const today = new Date();
    // 使用本地时间而不是UTC时间，避免时区问题
    const todayStr = today.getFullYear() + '-' + 
      String(today.getMonth() + 1).padStart(2, '0') + '-' + 
      String(today.getDate()).padStart(2, '0');
    const hasUsed = record.date === todayStr && record.hasUsed;
    
    let usedTime: string | undefined;
    let nextAvailableTime: string | undefined;
    
    if (hasUsed) {
      usedTime = new Date(record.timestamp).toLocaleString('zh-CN');
    }
    
    if (!this.canDrawToday()) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      nextAvailableTime = tomorrow.toLocaleString('zh-CN');
    }
    
    const result: {
      hasUsed: boolean;
      canDraw: boolean;
      usedTime?: string;
      nextAvailableTime?: string;
    } = {
      hasUsed,
      canDraw: this.canDrawToday()
    };
    
    if (usedTime) {
      result.usedTime = usedTime;
    }
    
    if (nextAvailableTime) {
      result.nextAvailableTime = nextAvailableTime;
    }
    
    return result;
  }

  /**
   * 重置记录（用于测试或特殊情况）
   */
  static resetRecord(): void {
    storageService.removeItem(DAILY_LIMIT_KEY);
  }

  /**
   * 清理过期记录（如果记录不是今天的，则清除）
   */
  static cleanupExpiredRecord(): void {
    const record = this.getRecord();
    const today = new Date();
    // 使用本地时间而不是UTC时间，避免时区问题
    const todayStr = today.getFullYear() + '-' + 
      String(today.getMonth() + 1).padStart(2, '0') + '-' + 
      String(today.getDate()).padStart(2, '0');
    
    if (record.date !== todayStr) {
      storageService.removeItem(DAILY_LIMIT_KEY);
    }
  }

  /**
   * 获取历史使用记录（统计用）
   */
  static getUsageStats(): {
    totalDays: number;
    currentStreak: number;
    lastUsedDate?: string;
  } {
    // 这里可以扩展为记录多天的使用情况
    // 目前只返回基本信息
    const record = this.getRecord();
    
    const result: {
      totalDays: number;
      currentStreak: number;
      lastUsedDate?: string;
    } = {
      totalDays: record.hasUsed ? 1 : 0,
      currentStreak: record.hasUsed ? 1 : 0
    };
    
    if (record.hasUsed) {
      result.lastUsedDate = record.date;
    }
    
    return result;
  }
}

/**
 * 便捷函数：检查是否可以使用今日运势
 */
export const canUseDailyFortune = () => DailyLimitService.canDrawToday();

/**
 * 便捷函数：标记今日运势已使用
 */
export const markDailyFortuneUsed = () => DailyLimitService.markAsUsed();

/**
 * 便捷函数：获取今日运势使用状态
 */
export const getDailyFortuneStatus = () => DailyLimitService.getTodayStatus();
