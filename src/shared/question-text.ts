export const QUESTION_TEXT_MAX_LENGTH = 1000;

export function normalizeQuestionText(value: unknown): string {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim().slice(0, QUESTION_TEXT_MAX_LENGTH);
}
