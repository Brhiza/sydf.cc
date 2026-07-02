export type SsgwHolyCupFace = 'ping' | 'tu';
export type SsgwHolyCupResult = '圣杯' | '笑杯' | '阴杯';

export interface SsgwHolyCupToss {
  result: SsgwHolyCupResult;
  bei1: SsgwHolyCupFace;
  bei2: SsgwHolyCupFace;
}

export function resolveSsgwHolyCupResult(
  bei1: SsgwHolyCupFace,
  bei2: SsgwHolyCupFace
): SsgwHolyCupResult {
  if (bei1 !== bei2) return '圣杯';
  return bei1 === 'ping' ? '笑杯' : '阴杯';
}

export function tossSsgwHolyCup(random = Math.random): SsgwHolyCupToss {
  const bei1: SsgwHolyCupFace = random() > 0.5 ? 'ping' : 'tu';
  const bei2: SsgwHolyCupFace = random() > 0.5 ? 'ping' : 'tu';

  return {
    result: resolveSsgwHolyCupResult(bei1, bei2),
    bei1,
    bei2,
  };
}
