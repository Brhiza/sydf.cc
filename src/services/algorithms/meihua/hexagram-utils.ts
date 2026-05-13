import { hexagramsData, trigramsByIndex } from '../../../utils/hexagram-data';

interface TrigramBasic {
  name: string;
  element: string;
  nature: string;
}

interface TrigramWithLines extends TrigramBasic {
  symbol: string;
  lines: number[];
}

interface TrigramSearchResult {
  index: number;
  trigram: TrigramWithLines;
}

const hexagrams = hexagramsData.map((hex) => ({
  number: hex.id,
  name: hex.name,
  symbol: hex.symbol,
  description: hex.description,
}));

export const trigrams = trigramsByIndex;

/**
 * 根据上下经卦的索引号，查找对应的大成卦（六十四卦之一）
 */
export function findHexagramByTrigrams(upper: number, lower: number) {
  const upperIndex = ((upper - 1) % 8) + 1;
  const lowerIndex = ((lower - 1) % 8) + 1;

  const upperTrigram = trigramsByIndex[upperIndex];
  const lowerTrigram = trigramsByIndex[lowerIndex];
  const hexagram = hexagrams.find(
    (h) => h.symbol === `${upperTrigram.symbol}${lowerTrigram.symbol}`
  );

  return hexagram!;
}

/**
 * 根据爻数组查找对应的经卦
 */
export function findTrigramByLines(lines: number[]): TrigramSearchResult | null {
  for (let i = 1; i <= 8; i++) {
    const trigram = trigramsByIndex[i];
    if (!trigram || trigram.lines.length !== lines.length) {
      continue;
    }
    const match = lines.every((line, j) => trigram.lines[j] === line);
    if (match) {
      return { index: i, trigram };
    }
  }
  return null;
}

/**
 * 定体用：动爻所在经卦为"用"，静止的另一经卦为"体"。
 * 动爻在四、五、上爻（>3）时，上卦为用、下卦为体；反之则下卦为用、上卦为体。
 */
export function resolveTiYongByMovingYao<T extends TrigramBasic>(
  upper: T,
  lower: T,
  movingYaoIndex: number
): { tiGua: T; yongGua: T } {
  if (movingYaoIndex > 3) {
    return { tiGua: lower, yongGua: upper };
  }
  return { tiGua: upper, yongGua: lower };
}
