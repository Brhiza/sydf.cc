import { tarotSpreads } from '@/utils/tarot'

export type TarotSpreadKey = keyof typeof tarotSpreads

export const ORDERED_TAROT_SPREAD_KEYS = Object.keys(tarotSpreads) as TarotSpreadKey[]
export const DEFAULT_VISIBLE_TAROT_SPREAD_KEYS = ORDERED_TAROT_SPREAD_KEYS.slice(0, 4)

const TAROT_SPREAD_ICONS: Record<string, string> = {
  single: '🔮',
  three: '🃏',
  love: '💕',
  career: '💼',
  decision: '⚖️',
  celtic: '✨',
  chakra: '🧘',
  year: '📅',
  mindBodySpirit: '🌿',
  horseshoe: '🐴',
}

export function getTarotSpreadIcon(spreadKey: string): string {
  return TAROT_SPREAD_ICONS[spreadKey] || '🎴'
}
