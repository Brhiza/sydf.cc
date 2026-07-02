import { tarotSpreads } from 'mingyu-core/divination/tarot-data';

export const TAROT_SPREADS = tarotSpreads;

export type TarotSpreadKey = keyof typeof tarotSpreads;

export const DEFAULT_TAROT_SPREAD_KEY: TarotSpreadKey = 'single';

const CARD_COUNT_SPREAD_FALLBACKS: Record<number, TarotSpreadKey> = {
  1: 'single',
  3: 'three',
};

export function isTarotSpreadKey(spreadType?: string | null): spreadType is TarotSpreadKey {
  return Boolean(spreadType && spreadType in TAROT_SPREADS);
}

export function resolveTarotSpreadKey(spreadType?: string | null): TarotSpreadKey {
  return isTarotSpreadKey(spreadType) ? spreadType : DEFAULT_TAROT_SPREAD_KEY;
}

export function resolveTarotSpread(spreadType?: string | null) {
  return isTarotSpreadKey(spreadType) ? TAROT_SPREADS[spreadType] : undefined;
}

export function resolveTarotSpreadName(args: {
  spreadName?: string;
  spreadType?: string;
  cardCount?: number;
}): string | undefined {
  if (args.spreadName) {
    return args.spreadName;
  }

  const spread = resolveTarotSpread(args.spreadType);
  if (spread) {
    return spread.name;
  }

  const fallbackSpreadType =
    typeof args.cardCount === 'number' ? CARD_COUNT_SPREAD_FALLBACKS[args.cardCount] : undefined;
  return fallbackSpreadType ? TAROT_SPREADS[fallbackSpreadType].name : undefined;
}
