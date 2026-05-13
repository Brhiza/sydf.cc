const ANIMALS = ['青龙', '朱雀', '勾陈', '螣蛇', '白虎', '玄武'] as const;

const START_BY_DAY_GAN: Record<string, (typeof ANIMALS)[number]> = {
  甲: '青龙',
  乙: '青龙',
  丙: '朱雀',
  丁: '朱雀',
  戊: '勾陈',
  己: '螣蛇',
  庚: '白虎',
  辛: '白虎',
  壬: '玄武',
  癸: '玄武',
};

export function getSixAnimalsStart(dayGan: string): string {
  return START_BY_DAY_GAN[dayGan] || '青龙';
}

/**
 * 从第一爻(最下方)开始,按日干确定起始六神,顺序排列六神
 */
export function getSixAnimals(dayGan: string): string[] {
  const startAnimal = getSixAnimalsStart(dayGan);
  const startIndex = ANIMALS.indexOf(startAnimal as (typeof ANIMALS)[number]);
  return Array.from({ length: 6 }, (_, i) => ANIMALS[(startIndex + i) % 6]);
}
