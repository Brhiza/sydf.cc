import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createThrottledSaver } from './throttled-saver';

describe('createThrottledSaver', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('schedule 在间隔到达前不会触发 save', () => {
    const save = vi.fn();
    const saver = createThrottledSaver(1000, save);

    saver.schedule();
    vi.advanceTimersByTime(999);
    expect(save).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(save).toHaveBeenCalledTimes(1);
  });

  it('多次连续 schedule 在同一个间隔内只会触发一次 save', () => {
    const save = vi.fn();
    const saver = createThrottledSaver(1000, save);

    saver.schedule();
    saver.schedule();
    saver.schedule();

    vi.advanceTimersByTime(1000);
    expect(save).toHaveBeenCalledTimes(1);
  });

  it('一次 schedule 触发后再次 schedule 会重新调度', () => {
    const save = vi.fn();
    const saver = createThrottledSaver(1000, save);

    saver.schedule();
    vi.advanceTimersByTime(1000);
    expect(save).toHaveBeenCalledTimes(1);

    saver.schedule();
    vi.advanceTimersByTime(1000);
    expect(save).toHaveBeenCalledTimes(2);
  });

  it('flush 会立即触发 save 并取消 schedule 中的定时器', () => {
    const save = vi.fn();
    const saver = createThrottledSaver(1000, save);

    saver.schedule();
    saver.flush();
    expect(save).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(2000);
    expect(save).toHaveBeenCalledTimes(1);
  });

  it('flush 在没有 schedule 时也会立即触发 save', () => {
    const save = vi.fn();
    const saver = createThrottledSaver(1000, save);

    saver.flush();
    expect(save).toHaveBeenCalledTimes(1);
  });

  it('flush 之后可以继续 schedule', () => {
    const save = vi.fn();
    const saver = createThrottledSaver(500, save);

    saver.schedule();
    saver.flush();
    expect(save).toHaveBeenCalledTimes(1);

    saver.schedule();
    vi.advanceTimersByTime(500);
    expect(save).toHaveBeenCalledTimes(2);
  });
});
