import { hexagramsData } from '../../../utils/hexagram-data';
import { generateYaosByTime, getDivinationTime } from '../../../utils/timeManager';

type Hexagram = (typeof hexagramsData)[number];
type YaoSymbol = '阳' | '阴';

export interface HexagramSet {
  timestamp: number;
  ganzhi: ReturnType<typeof getDivinationTime>['ganzhi'];
  rawYaos: number[];
  mainYaos: YaoSymbol[];
  mainHexagram: Hexagram;
  changedHexagram: Hexagram;
  interHexagram: Hexagram;
}

function toBinary(yaos: YaoSymbol[]): string {
  return yaos.map((y) => (y === '阳' ? '1' : '0')).reverse().join('');
}

function deriveInterYaos(mainYaos: YaoSymbol[]): YaoSymbol[] {
  const interLower = mainYaos.slice(1, 4);
  const interUpper = mainYaos.slice(2, 5);
  return [...interLower, ...interUpper];
}

function lookupHexagram(binary: string): Hexagram | undefined {
  return hexagramsData.find((h) => h.binarySymbol === binary);
}

export function deriveHexagramSet(customDate?: Date): HexagramSet {
  const { ganzhi, timestamp } = getDivinationTime(customDate);
  const rawYaos = generateYaosByTime(timestamp, 6);

  const mainYaos: YaoSymbol[] = rawYaos.map((yao) => (yao === 7 || yao === 9 ? '阳' : '阴'));
  const changedYaos: YaoSymbol[] = rawYaos.map((yao, index) => {
    if (yao === 6) return '阳';
    if (yao === 9) return '阴';
    return mainYaos[index];
  });

  const mainBinary = toBinary(mainYaos);
  const changedBinary = toBinary(changedYaos);
  const interBinary = toBinary(deriveInterYaos(mainYaos));

  const mainHexagram = lookupHexagram(mainBinary);
  const changedHexagram = lookupHexagram(changedBinary);
  const interHexagram = lookupHexagram(interBinary);

  if (!mainHexagram || !changedHexagram || !interHexagram) {
    throw new Error(`卦象查找失败: 主=${mainBinary}, 变=${changedBinary}, 互=${interBinary}`);
  }

  return { timestamp, ganzhi, rawYaos, mainYaos, mainHexagram, changedHexagram, interHexagram };
}
