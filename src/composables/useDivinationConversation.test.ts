import { describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';
import type { ChatMessage } from '@/types/chat';
import { useDivinationConversation } from './useDivinationConversation';

function createDeps(overrides: Partial<Parameters<typeof useDivinationConversation>[0]> = {}) {
  const conversationHistory = ref<ChatMessage[]>([]);
  const followUpQuestion = ref('');
  const isFollowUpLoading = ref(false);
  const aiResponse = ref('');
  const error = ref<string | null>(null);
  const sendFollowUp = vi.fn();

  const deps = {
    conversationHistory,
    followUpQuestion,
    isFollowUpLoading,
    aiResponse,
    error,
    hasResult: () => true,
    resolveRecordId: () => 'record-1',
    divinationService: { sendFollowUp },
    ...overrides,
  };

  return { deps, sendFollowUp };
}

describe('useDivinationConversation', () => {
  describe('hasAiResponse', () => {
    it('空 aiResponse 返回 false', () => {
      const { deps } = createDeps();
      const { hasAiResponse } = useDivinationConversation(deps);
      expect(hasAiResponse.value).toBe(false);
    });

    it('首条 assistant 标记为错误时返回 false', () => {
      const { deps } = createDeps();
      deps.aiResponse.value = '解读';
      deps.conversationHistory.value = [
        { id: 'a', role: 'assistant', content: '错误占位', isError: true },
      ];
      const { hasAiResponse } = useDivinationConversation(deps);
      expect(hasAiResponse.value).toBe(false);
    });

    it('正常 assistant 回复时返回 true', () => {
      const { deps } = createDeps();
      deps.aiResponse.value = '解读';
      deps.conversationHistory.value = [
        { id: 'a', role: 'assistant', content: '正常内容' },
      ];
      const { hasAiResponse } = useDivinationConversation(deps);
      expect(hasAiResponse.value).toBe(true);
    });
  });

  describe('handleSendFollowUp', () => {
    it('问题为空时不调用 sendFollowUp', () => {
      const { deps, sendFollowUp } = createDeps();
      const { handleSendFollowUp } = useDivinationConversation(deps);
      handleSendFollowUp();
      expect(sendFollowUp).not.toHaveBeenCalled();
    });

    it('hasResult=false 时不调用 sendFollowUp', () => {
      const { deps, sendFollowUp } = createDeps({ hasResult: () => false });
      deps.followUpQuestion.value = '再分析';
      const { handleSendFollowUp } = useDivinationConversation(deps);
      handleSendFollowUp();
      expect(sendFollowUp).not.toHaveBeenCalled();
    });

    it('recordId 为空时回写指定错误并停止 follow up loading', () => {
      const { deps, sendFollowUp } = createDeps({
        resolveRecordId: () => '',
        missingRecordError: '自定义缺记录',
      });
      deps.followUpQuestion.value = '再分析';
      const { handleSendFollowUp } = useDivinationConversation(deps);
      handleSendFollowUp();
      expect(sendFollowUp).not.toHaveBeenCalled();
      expect(deps.error.value).toBe('自定义缺记录');
      expect(deps.isFollowUpLoading.value).toBe(false);
    });

    it('正常发送追问并通过回调更新状态', () => {
      const { deps, sendFollowUp } = createDeps();
      deps.followUpQuestion.value = '  再分析  ';
      deps.conversationHistory.value = [{ id: 'u', role: 'user', content: '原问题' }];

      const { handleSendFollowUp } = useDivinationConversation(deps);
      handleSendFollowUp();

      expect(sendFollowUp).toHaveBeenCalledTimes(1);
      const [recordId, history, question, callbacks] = sendFollowUp.mock.calls[0];
      expect(recordId).toBe('record-1');
      expect(history).toEqual([{ id: 'u', role: 'user', content: '原问题' }]);
      expect(question).toBe('再分析');
      expect(deps.isFollowUpLoading.value).toBe(true);
      expect(deps.followUpQuestion.value).toBe('');

      callbacks.onConversationUpdate([
        { id: 'u', role: 'user', content: '再分析' },
        { id: 'a', role: 'assistant', content: '后续解读' },
      ]);
      expect(deps.conversationHistory.value).toHaveLength(2);

      callbacks.onError('解读失败');
      expect(deps.error.value).toBe('解读失败');
      expect(deps.isFollowUpLoading.value).toBe(false);
    });

    it('onComplete 后会停止 follow up loading', () => {
      const { deps, sendFollowUp } = createDeps();
      deps.followUpQuestion.value = '继续';
      const { handleSendFollowUp } = useDivinationConversation(deps);
      handleSendFollowUp();

      const [, , , callbacks] = sendFollowUp.mock.calls[0];
      callbacks.onComplete();
      expect(deps.isFollowUpLoading.value).toBe(false);
    });
  });
});
