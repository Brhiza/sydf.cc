import type {
  ComplexityLevel,
  EmotionState,
  QuestionType,
  UserExperienceLevel,
} from '../types';
import {
  COMPLEXITY_KEYWORDS,
  COMPLEXITY_LONG_THRESHOLD,
  COMPLEXITY_MULTI_TYPE_THRESHOLD,
  EMOTION_PATTERNS,
  EXPERIENCE_PATTERNS,
  IMPORTANT_KEYWORDS,
  MEDIUM_IMPORTANCE_KEYWORDS,
  MEDIUM_URGENCY_KEYWORDS,
  QUESTION_TYPE_PATTERNS,
  URGENT_KEYWORDS,
} from './patterns';

export function detectQuestionTypes(question: string): QuestionType {
  const result = {} as QuestionType;
  const entries = Object.entries(QUESTION_TYPE_PATTERNS) as Array<
    [keyof QuestionType, RegExp]
  >;
  for (const [key, pattern] of entries) {
    result[key] = pattern.test(question);
  }
  return result;
}

export function evaluateQuestionComplexity(question: string): ComplexityLevel {
  const factors: string[] = [];
  let complexityScore = 0;

  if (question.length > COMPLEXITY_LONG_THRESHOLD) {
    factors.push('问题描述详细');
    complexityScore += 1;
  }

  const types = detectQuestionTypes(question);
  const typeCount = Object.values(types).filter(Boolean).length;
  if (typeCount > COMPLEXITY_MULTI_TYPE_THRESHOLD) {
    factors.push('多维度问题');
    complexityScore += 2;
  }

  if (COMPLEXITY_KEYWORDS.test(question)) {
    factors.push('涉及复杂概念');
    complexityScore += 2;
  }

  const timeUrgency: 'low' | 'medium' | 'high' = URGENT_KEYWORDS.test(question)
    ? 'high'
    : MEDIUM_URGENCY_KEYWORDS.test(question)
      ? 'medium'
      : 'low';

  const importance: 'low' | 'medium' | 'high' = IMPORTANT_KEYWORDS.test(question)
    ? 'high'
    : MEDIUM_IMPORTANCE_KEYWORDS.test(question)
      ? 'medium'
      : 'low';

  let complexity: 'simple' | 'medium' | 'complex';
  if (complexityScore <= 1) {
    complexity = 'simple';
  } else if (complexityScore <= 3) {
    complexity = 'medium';
  } else {
    complexity = 'complex';
  }

  const requiredDepth = complexity === 'simple' ? 3 : complexity === 'medium' ? 5 : 7;

  return {
    complexity,
    factors,
    requiredDepth,
    timeUrgency,
    importance,
  };
}

export function detectEmotionalState(question: string): EmotionState {
  let emotion: EmotionState['emotion'] = 'neutral';
  let intensity = 0;

  if (EMOTION_PATTERNS.anxious.test(question)) {
    emotion = 'anxious';
    intensity = 0.8;
  } else if (EMOTION_PATTERNS.hopeful.test(question)) {
    emotion = 'hopeful';
    intensity = 0.7;
  } else if (EMOTION_PATTERNS.confused.test(question)) {
    emotion = 'confused';
    intensity = 0.6;
  } else if (EMOTION_PATTERNS.determined.test(question)) {
    emotion = 'determined';
    intensity = 0.9;
  }

  let supportNeeded = '';
  switch (emotion) {
    case 'anxious':
      supportNeeded = '需要安抚和鼓励，提供安全感和确定性';
      break;
    case 'hopeful':
      supportNeeded = '需要肯定和指引，帮助实现目标';
      break;
    case 'confused':
      supportNeeded = '需要清晰的解释和方向指引';
      break;
    case 'determined':
      supportNeeded = '需要具体的行动建议和策略支持';
      break;
    default:
      supportNeeded = '需要客观分析和实用建议';
  }

  return {
    emotion,
    intensity,
    supportNeeded,
  };
}

export function evaluateUserExperienceLevel(question: string): UserExperienceLevel {
  let level: UserExperienceLevel['level'] = 'intermediate';
  let familiarity = 0.5;
  let terminologyTolerance = 0.5;

  if (EXPERIENCE_PATTERNS.beginner.test(question)) {
    level = 'beginner';
    familiarity = 0.2;
    terminologyTolerance = 0.3;
  } else if (EXPERIENCE_PATTERNS.advanced.test(question)) {
    level = 'advanced';
    familiarity = 0.8;
    terminologyTolerance = 0.9;
  }

  return {
    level,
    familiarity,
    terminologyTolerance,
  };
}
