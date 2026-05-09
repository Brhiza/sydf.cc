import type { DivinationType } from '@/types';

export function resolveHistoryRouteType(type: DivinationType): DivinationType {
  return type;
}

export function buildHistoryResultPath(
  type: DivinationType,
  historyId?: string | null
): string {
  const routeType = resolveHistoryRouteType(type);
  const basePath = `/divination/${routeType}`;

  if (!historyId) {
    return basePath;
  }

  return `${basePath}?historyId=${historyId}`;
}

export function isHistoryRouteCompatible(
  currentType: DivinationType,
  recordType: DivinationType
): boolean {
  return currentType === recordType;
}
