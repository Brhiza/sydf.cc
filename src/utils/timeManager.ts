/**
 * 占卜时间管理入口。
 *
 * 真实干支、节气、农历计算统一交给 mingyu-core，本站只保留兼容导出。
 */
import { TimeManager } from 'mingyu-core/calendar';
import type { DivinationTime, GanZhiInfo, TimeInfo } from 'mingyu-core/calendar';

export type { DivinationTime, GanZhiInfo, TimeInfo };
export { TimeManager };

export function getDivinationTime(customTime?: Date): DivinationTime {
  return TimeManager.getDivinationTime(customTime);
}

export const setTimezoneOffsetMinutesOverride =
  TimeManager.setTimezoneOffsetMinutesOverride.bind(TimeManager);

type TimeManagerWithRuntimeOverride = typeof TimeManager & {
  timezoneOffsetMinutesOverride?: number | null;
};

function getTimezoneOffsetMinutesOverride(): number | null {
  const manager = TimeManager as TimeManagerWithRuntimeOverride;
  return manager.timezoneOffsetMinutesOverride ?? null;
}

export async function runWithTimezoneOffsetMinutesOverride<T>(
  offsetMinutes: number | null,
  run: () => T | Promise<T>
): Promise<T> {
  const previousOffset = getTimezoneOffsetMinutesOverride();
  TimeManager.setTimezoneOffsetMinutesOverride(offsetMinutes);

  try {
    return await run();
  } finally {
    TimeManager.setTimezoneOffsetMinutesOverride(previousOffset);
  }
}
