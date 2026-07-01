import { tarotSpreads } from 'mingyu-core/divination/tarot-data';

export type TarotSpreadKey = keyof typeof tarotSpreads;

export const DEFAULT_TAROT_SPREAD_KEY: TarotSpreadKey = 'single';

const CARD_COUNT_SPREAD_FALLBACKS: Record<number, TarotSpreadKey> = {
  1: 'single',
  3: 'three',
};

export function resolveTarotSpreadName(args: {
  spreadName?: string;
  spreadType?: string;
  cardCount?: number;
}): string | undefined {
  if (args.spreadName) {
    return args.spreadName;
  }

  const spreadType = args.spreadType as TarotSpreadKey | undefined;
  if (spreadType && tarotSpreads[spreadType]) {
    return tarotSpreads[spreadType].name;
  }

  const fallbackSpreadType =
    typeof args.cardCount === 'number' ? CARD_COUNT_SPREAD_FALLBACKS[args.cardCount] : undefined;
  return fallbackSpreadType ? tarotSpreads[fallbackSpreadType].name : undefined;
}
