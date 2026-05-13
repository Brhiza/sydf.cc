import type { QuestionAnalysis, QuestionType } from '../types';
import {
  detectEmotionalState,
  detectQuestionTypes,
  evaluateQuestionComplexity,
  evaluateUserExperienceLevel,
} from './detectors';
import { QUESTION_TYPE_LABELS } from './patterns';

export function analyzeQuestion(question: string): QuestionAnalysis {
  return {
    types: detectQuestionTypes(question),
    complexity: evaluateQuestionComplexity(question),
    emotion: detectEmotionalState(question),
    userExperience: evaluateUserExperienceLevel(question),
  };
}

export function generateQuestionAnalysisText(types: QuestionType): string {
  const analysisParts: string[] = [];
  const entries = Object.entries(QUESTION_TYPE_LABELS) as Array<
    [keyof QuestionType, string]
  >;
  for (const [key, label] of entries) {
    if (types[key]) analysisParts.push(label);
  }
  return analysisParts.join('\n');
}
