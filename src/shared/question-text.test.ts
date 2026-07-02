import { describe, expect, it } from 'vitest';
import { normalizeQuestionText, QUESTION_TEXT_MAX_LENGTH } from './question-text';

describe('question-text', () => {
  it('应裁剪问题两侧空白', () => {
    expect(normalizeQuestionText('  现在该怎么做？  ')).toBe('现在该怎么做？');
  });

  it('应把非字符串问题当作空内容', () => {
    expect(normalizeQuestionText(null)).toBe('');
    expect(normalizeQuestionText({ question: '坏数据' })).toBe('');
  });

  it('应限制问题最大长度', () => {
    const longQuestion = '问'.repeat(QUESTION_TEXT_MAX_LENGTH + 20);

    expect(normalizeQuestionText(longQuestion)).toHaveLength(QUESTION_TEXT_MAX_LENGTH);
  });
});
