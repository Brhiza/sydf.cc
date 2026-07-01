import type { TarotData } from '../types/divination';

export interface MingyuTarotSpreadResult {
  spreadType: string;
  spreadName: string;
  cards: Array<{
    card: {
      number: number;
      name: string;
    };
    isReversed: boolean;
    position: string;
  }>;
  timestamp: number;
}

export function mapMingyuTarotResult(
  result: MingyuTarotSpreadResult,
  getCardKeywords: (cardName: string) => string
): TarotData {
  const cards = result.cards.map((c) => ({
    id: c.card.number,
    name: c.card.name,
    reversed: c.isReversed,
    position: c.position,
    keywords: getCardKeywords(c.card.name).split(','),
  }));

  return { ...result, cards };
}
