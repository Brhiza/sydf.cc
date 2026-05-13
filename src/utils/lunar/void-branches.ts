const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

const SIXTY_CYCLE = Array.from(
  { length: 60 },
  (_, i) => HEAVENLY_STEMS[i % 10] + EARTHLY_BRANCHES[i % 12]
);

/**
 * 六旬旬首及其对应的空亡地支(每旬 10 干支共享同一对空亡)。
 */
const XUN_HEADS: ReadonlyArray<readonly [string, readonly [string, string]]> = [
  ['甲子', ['戌', '亥']],
  ['甲戌', ['申', '酉']],
  ['甲申', ['午', '未']],
  ['甲午', ['辰', '巳']],
  ['甲辰', ['寅', '卯']],
  ['甲寅', ['子', '丑']],
];

const VOID_MAP: Record<string, string[]> = (() => {
  const map: Record<string, string[]> = {};
  for (const [head, branches] of XUN_HEADS) {
    const headIdx = SIXTY_CYCLE.indexOf(head);
    for (let i = 0; i < 10; i++) {
      map[SIXTY_CYCLE[headIdx + i]] = [...branches];
    }
  }
  return map;
})();

export function getVoidBranches(dayGanZhi: string): string[] {
  return VOID_MAP[dayGanZhi] || [];
}
