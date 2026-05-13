export type SpecialPattern = '静卦' | '独静卦' | '全动卦' | '乾卦用九' | '坤卦用六';

export interface SpecialPatternResult {
  specialPattern?: SpecialPattern;
  specialAdvice?: string;
  isChaotic: boolean;
  chaoticReason?: string;
}

const SIX_LINES_BY_NAME: Record<string, SpecialPatternResult> = {
  乾为天: {
    specialPattern: '乾卦用九',
    specialAdvice: '乾卦六爻皆动，宜以用九“见群龙无首，吉”为主，兼参之卦总势，不按常规逐爻细断。',
    isChaotic: false,
  },
  坤为地: {
    specialPattern: '坤卦用六',
    specialAdvice: '坤卦六爻皆动，宜以用六“利永贞”为主，兼参之卦总势，不按常规逐爻细断。',
    isChaotic: false,
  },
};

const ALL_DYNAMIC_FALLBACK: SpecialPatternResult = {
  specialPattern: '全动卦',
  specialAdvice: '六爻全动，宜总观本卦与变卦气势，不宜按常规逐爻细碎分断。',
  isChaotic: true,
  chaoticReason: '六爻全动，属于乱动卦。传统上此类卦不宜按常规多爻细断，宜另取用神旺衰总观。',
};

export function getSpecialPattern(
  changingCount: number,
  mainHexagramName: string
): SpecialPatternResult {
  if (changingCount === 0) {
    return {
      specialPattern: '静卦',
      specialAdvice: '六爻安静，以本卦卦意和世应用神为主，不取变爻之象。',
      isChaotic: false,
    };
  }

  if (changingCount === 5) {
    return {
      specialPattern: '独静卦',
      specialAdvice: '五爻俱动，一爻独静。常见取法以独静爻为关键，同时兼看变卦所示趋势。',
      isChaotic: false,
    };
  }

  if (changingCount === 6) {
    return SIX_LINES_BY_NAME[mainHexagramName] || ALL_DYNAMIC_FALLBACK;
  }

  return { isChaotic: false };
}
