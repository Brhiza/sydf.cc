import { describe, expect, it } from 'vitest'
import { buildDivinationSystemPrompt } from './divination-system-prompt'

describe('buildDivinationSystemPrompt', () => {
  it('应包含对应占卜类型的专业能力描述', () => {
    const prompt = buildDivinationSystemPrompt('liuyao')

    expect(prompt).toContain('你是精通六爻占卜的专业占卜师')
    expect(prompt).toContain('用神的"旺衰"')
  })

  it('在 API 模式下应包含结构化输出和风格约束', () => {
    const prompt = buildDivinationSystemPrompt('daily', {
      strictDataOnly: true,
      requireStructuredSections: true,
      interpretationStyle: '入门',
      outputLength: '精简',
    })

    expect(prompt).toContain('不要编造不存在的占卜数据')
    expect(prompt).toContain('输出结构必须包含：核心结论、详细分析、行动建议、总结要点')
    expect(prompt).toContain('解读风格：入门')
    expect(prompt).toContain('输出长度：精简')
  })
})
