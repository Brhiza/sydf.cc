export function getPatternSummary(tag: string): string {
  if (tag === '星伏吟') {
    return '九星回原位，事情多原地盘旋、推进偏慢。';
  }
  if (tag === '星反吟') {
    return '九星临对冲宫，局势波动较大，易反复。';
  }
  if (tag === '门伏吟') {
    return '八门回原位，事项推进迟滞，宜耐心等待。';
  }
  if (tag === '门反吟') {
    return '八门落反吟位，节奏多突变，计划易临时调整。';
  }
  if (tag.startsWith('门迫')) {
    return '门受宫克，该宫事项易受压制，行动阻力偏大。';
  }
  if (tag.startsWith('击刑')) {
    return '时干落击刑位，主压力、掣肘或规章束缚，宜谨慎行事。';
  }
  return '需结合全局继续参看。';
}

export interface PatternDetail {
  tag: string;
  summary: string;
}

export function buildPatternDetails(patternTags: string[]): PatternDetail[] {
  return patternTags.map((tag) => ({
    tag,
    summary: getPatternSummary(tag),
  }));
}
