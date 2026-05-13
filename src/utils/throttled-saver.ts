/**
 * 节流保存工具:用于 SSE 流等高频更新场景,把多次写盘合并为一次。
 * - schedule(): 在 intervalMs 内最多触发一次 save
 * - flush(): 取消待执行的定时器并立即同步执行 save
 */
export interface ThrottledSaver {
  schedule: () => void;
  flush: () => void;
}

export function createThrottledSaver(intervalMs: number, save: () => void): ThrottledSaver {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return {
    schedule() {
      if (timer !== null) {
        return;
      }
      timer = setTimeout(() => {
        timer = null;
        save();
      }, intervalMs);
    },
    flush() {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
      save();
    },
  };
}
