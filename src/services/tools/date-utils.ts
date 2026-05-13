export function pad2(value: number): string {
  return String(value).padStart(2, '0');
}

export function createAnchoredDate(year: number, month: number, day: number): Date {
  return new Date(year, month - 1, day, 12, 0, 0, 0);
}

export function isValidDateParts(year: number, month: number, day: number): boolean {
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    return false;
  }
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return false;
  }

  const date = createAnchoredDate(year, month, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

export function shiftAnchoredDate(baseDate: Date, diffDays: number): Date {
  const anchored = new Date(baseDate);
  anchored.setHours(12, 0, 0, 0);
  anchored.setDate(anchored.getDate() + diffDays);
  return anchored;
}

export function shiftMonth(baseDate: Date, diffMonths: number): { year: number; month: number } {
  const anchored = new Date(baseDate);
  anchored.setHours(12, 0, 0, 0);
  anchored.setDate(1);
  anchored.setMonth(anchored.getMonth() + diffMonths);
  return {
    year: anchored.getFullYear(),
    month: anchored.getMonth() + 1,
  };
}

export function shiftYear(baseDate: Date, diffYears: number): number {
  return baseDate.getFullYear() + diffYears;
}

export function formatDateLabel(date: Date): string {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}
