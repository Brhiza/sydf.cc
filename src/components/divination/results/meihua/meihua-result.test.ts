import { describe, expect, it } from 'vitest';
import { getInterYaoType, getTrigramInfo, getYaoPositionName } from './meihua-result';

const yaosDetail = [
  { position: 1, yaoType: '阳', isChanging: false, tiYong: '体' },
  { position: 2, yaoType: '阴', isChanging: false, tiYong: '体' },
  { position: 3, yaoType: '阳', isChanging: true, tiYong: '用' },
  { position: 4, yaoType: '阴', isChanging: false, tiYong: '用' },
  { position: 5, yaoType: '阳', isChanging: false, tiYong: '用' },
  { position: 6, yaoType: '阴', isChanging: false, tiYong: '用' },
] as const;

describe('meihua-result', () => {
  it('会返回标准爻位名称', () => {
    expect(getYaoPositionName(1)).toBe('初');
    expect(getYaoPositionName(6)).toBe('上');
    expect(getYaoPositionName(8)).toBe('未知');
  });

  it('会按互卦映射关系取主卦爻象', () => {
    expect(getInterYaoType(yaosDetail as never, 1, true)).toBe('阴');
    expect(getInterYaoType(yaosDetail as never, 2, true)).toBe('阳');
    expect(getInterYaoType(yaosDetail as never, 3, true)).toBe('阴');
    expect(getInterYaoType(yaosDetail as never, 4, true)).toBe('阳');
    expect(getInterYaoType(yaosDetail as never, 5, true)).toBe('阴');
    expect(getInterYaoType(yaosDetail as never, 6, true)).toBe('阳');
  });

  it('没有互卦或数据不完整时回退为阳爻', () => {
    expect(getInterYaoType(undefined, 1, true)).toBe('阳');
    expect(getInterYaoType(yaosDetail.slice(0, 3) as never, 1, true)).toBe('阳');
    expect(getInterYaoType(yaosDetail as never, 1, false)).toBe('阳');
  });

  it('会按爻位返回上下卦名称', () => {
    const trigramInfo = { upper: '乾', lower: '坤' };

    expect(getTrigramInfo(1, trigramInfo)).toBe('坤');
    expect(getTrigramInfo(3, trigramInfo)).toBe('坤');
    expect(getTrigramInfo(4, trigramInfo)).toBe('乾');
    expect(getTrigramInfo(6, trigramInfo)).toBe('乾');
    expect(getTrigramInfo(2, null)).toBe('');
  });
});
