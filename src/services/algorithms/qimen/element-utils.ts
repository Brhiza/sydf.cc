const OPPOSITE_PALACE_MAP: Record<number, number> = {
  1: 9,
  2: 8,
  3: 7,
  4: 6,
  6: 4,
  7: 3,
  8: 2,
  9: 1,
};

const ELEMENT_KE_MAP: Record<string, string> = {
  金: '木',
  木: '土',
  土: '水',
  水: '火',
  火: '金',
};

const DOOR_ELEMENT_MAP: Record<string, string> = {
  休门: '水',
  生门: '土',
  伤门: '木',
  杜门: '木',
  景门: '火',
  死门: '土',
  惊门: '金',
  开门: '金',
};

export function getOppositePalace(palace: number): number | null {
  return OPPOSITE_PALACE_MAP[palace] ?? null;
}

export function isElementKe(source: string, target: string): boolean {
  return ELEMENT_KE_MAP[source] === target;
}

export function getDoorElement(door: string): string {
  return DOOR_ELEMENT_MAP[door] || '';
}
