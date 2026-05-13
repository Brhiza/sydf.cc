import { describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';
import { useAbortableSession } from './useAbortableSession';

function setup() {
  const isCancelled = ref(false);
  const session = useAbortableSession({ isCancelled });
  return { isCancelled, session };
}

describe('useAbortableSession', () => {
  describe('createController', () => {
    it('返回新的 AbortController 并保存到 ref', () => {
      const { session } = setup();
      const controller = session.createController();
      expect(controller).toBeInstanceOf(AbortController);
      expect(session.abortController.value).toBe(controller);
    });

    it('重复调用会替换之前的 controller', () => {
      const { session } = setup();
      const first = session.createController();
      const second = session.createController();
      expect(first).not.toBe(second);
      expect(session.abortController.value).toBe(second);
    });
  });

  describe('clearController', () => {
    it('默认不 abort，仅清空 ref', () => {
      const { session } = setup();
      const controller = session.createController();
      session.clearController();
      expect(controller.signal.aborted).toBe(false);
      expect(session.abortController.value).toBeNull();
    });

    it('abort=true 时中止 controller', () => {
      const { session } = setup();
      const controller = session.createController();
      session.clearController(true);
      expect(controller.signal.aborted).toBe(true);
      expect(session.abortController.value).toBeNull();
    });

    it('controller 为空时安全调用', () => {
      const { session } = setup();
      expect(() => session.clearController(true)).not.toThrow();
      expect(session.abortController.value).toBeNull();
    });
  });

  describe('cancel', () => {
    it('controller 存在时中止并设置 isCancelled', () => {
      const { isCancelled, session } = setup();
      const controller = session.createController();
      const onCancel = vi.fn();
      const result = session.cancel(onCancel);
      expect(result).toBe(true);
      expect(controller.signal.aborted).toBe(true);
      expect(isCancelled.value).toBe(true);
      expect(session.abortController.value).toBeNull();
      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it('controller 为空时返回 false 且不调用回调', () => {
      const { isCancelled, session } = setup();
      const onCancel = vi.fn();
      const result = session.cancel(onCancel);
      expect(result).toBe(false);
      expect(isCancelled.value).toBe(false);
      expect(onCancel).not.toHaveBeenCalled();
    });

    it('无回调时也能正常工作', () => {
      const { isCancelled, session } = setup();
      session.createController();
      const result = session.cancel();
      expect(result).toBe(true);
      expect(isCancelled.value).toBe(true);
    });
  });
});
