import {
  DEFAULT_LAYOUT_CONFIG,
  TAROT_LAYOUT_CONFIGS,
  resolveTarotLayoutKey,
  type TarotLayoutConfig,
  type TarotLayoutResponsiveConfig,
} from './tarot-layout-configs';

export interface ResolvedTarotLayout {
  className: string;
  modeClass: string;
  styleVars: Record<string, string>;
}

function getResponsiveValue(
  config: TarotLayoutConfig,
  breakpoint: keyof NonNullable<TarotLayoutConfig['responsive']>,
  key: keyof TarotLayoutResponsiveConfig,
  fallback: string
): string {
  return config.responsive?.[breakpoint]?.[key] ?? fallback;
}

function buildStyleVars(config: TarotLayoutConfig): Record<string, string> {
  const base = {
    maxWidth: config.maxWidth ?? DEFAULT_LAYOUT_CONFIG.maxWidth,
    gap: config.gap ?? DEFAULT_LAYOUT_CONFIG.gap,
    padding: config.padding ?? DEFAULT_LAYOUT_CONFIG.padding,
    cardWidth: config.cardWidth ?? DEFAULT_LAYOUT_CONFIG.cardWidth,
    cardMaxWidth: config.cardMaxWidth ?? DEFAULT_LAYOUT_CONFIG.cardMaxWidth,
    flexDirection: config.flexDirection ?? DEFAULT_LAYOUT_CONFIG.flexDirection,
    justifyContent: config.justifyContent ?? DEFAULT_LAYOUT_CONFIG.justifyContent,
    alignItems: config.alignItems ?? DEFAULT_LAYOUT_CONFIG.alignItems,
  };

  return {
    '--tarot-layout-max-width': base.maxWidth,
    '--tarot-layout-gap': base.gap,
    '--tarot-layout-padding': base.padding,
    '--tarot-layout-background': config.background ?? DEFAULT_LAYOUT_CONFIG.background,
    '--tarot-layout-card-width': base.cardWidth,
    '--tarot-layout-card-max-width': base.cardMaxWidth,
    '--tarot-layout-grid-columns': config.gridColumns ?? DEFAULT_LAYOUT_CONFIG.gridColumns,
    '--tarot-layout-grid-rows': config.gridRows ?? DEFAULT_LAYOUT_CONFIG.gridRows,
    '--tarot-layout-aspect-ratio': config.aspectRatio ?? DEFAULT_LAYOUT_CONFIG.aspectRatio,
    '--tarot-layout-flex-direction': base.flexDirection,
    '--tarot-layout-flex-wrap': config.flexWrap ?? DEFAULT_LAYOUT_CONFIG.flexWrap,
    '--tarot-layout-justify-content': base.justifyContent,
    '--tarot-layout-align-items': base.alignItems,
    '--tarot-layout-desktop-max-width': getResponsiveValue(config, 'desktop', 'maxWidth', base.maxWidth),
    '--tarot-layout-desktop-gap': getResponsiveValue(config, 'desktop', 'gap', base.gap),
    '--tarot-layout-desktop-padding': getResponsiveValue(config, 'desktop', 'padding', base.padding),
    '--tarot-layout-desktop-card-width': getResponsiveValue(config, 'desktop', 'cardWidth', base.cardWidth),
    '--tarot-layout-desktop-card-max-width': getResponsiveValue(
      config,
      'desktop',
      'cardMaxWidth',
      base.cardMaxWidth
    ),
    '--tarot-layout-desktop-flex-direction': getResponsiveValue(
      config,
      'desktop',
      'flexDirection',
      base.flexDirection
    ),
    '--tarot-layout-desktop-justify-content': getResponsiveValue(
      config,
      'desktop',
      'justifyContent',
      base.justifyContent
    ),
    '--tarot-layout-desktop-align-items': getResponsiveValue(config, 'desktop', 'alignItems', base.alignItems),
    '--tarot-layout-tablet-max-width': getResponsiveValue(config, 'tablet', 'maxWidth', base.maxWidth),
    '--tarot-layout-tablet-gap': getResponsiveValue(config, 'tablet', 'gap', base.gap),
    '--tarot-layout-tablet-padding': getResponsiveValue(config, 'tablet', 'padding', base.padding),
    '--tarot-layout-tablet-card-width': getResponsiveValue(config, 'tablet', 'cardWidth', base.cardWidth),
    '--tarot-layout-tablet-card-max-width': getResponsiveValue(
      config,
      'tablet',
      'cardMaxWidth',
      base.cardMaxWidth
    ),
    '--tarot-layout-tablet-flex-direction': getResponsiveValue(
      config,
      'tablet',
      'flexDirection',
      base.flexDirection
    ),
    '--tarot-layout-tablet-justify-content': getResponsiveValue(
      config,
      'tablet',
      'justifyContent',
      base.justifyContent
    ),
    '--tarot-layout-tablet-align-items': getResponsiveValue(config, 'tablet', 'alignItems', base.alignItems),
    '--tarot-layout-mobile-max-width': getResponsiveValue(config, 'mobile', 'maxWidth', base.maxWidth),
    '--tarot-layout-mobile-gap': getResponsiveValue(config, 'mobile', 'gap', base.gap),
    '--tarot-layout-mobile-padding': getResponsiveValue(config, 'mobile', 'padding', base.padding),
    '--tarot-layout-mobile-card-width': getResponsiveValue(config, 'mobile', 'cardWidth', base.cardWidth),
    '--tarot-layout-mobile-card-max-width': getResponsiveValue(
      config,
      'mobile',
      'cardMaxWidth',
      base.cardMaxWidth
    ),
    '--tarot-layout-mobile-flex-direction': getResponsiveValue(
      config,
      'mobile',
      'flexDirection',
      base.flexDirection
    ),
    '--tarot-layout-mobile-justify-content': getResponsiveValue(
      config,
      'mobile',
      'justifyContent',
      base.justifyContent
    ),
    '--tarot-layout-mobile-align-items': getResponsiveValue(config, 'mobile', 'alignItems', base.alignItems),
    '--tarot-layout-compact-max-width': getResponsiveValue(config, 'compact', 'maxWidth', base.maxWidth),
    '--tarot-layout-compact-gap': getResponsiveValue(config, 'compact', 'gap', base.gap),
    '--tarot-layout-compact-padding': getResponsiveValue(config, 'compact', 'padding', base.padding),
    '--tarot-layout-compact-card-width': getResponsiveValue(config, 'compact', 'cardWidth', base.cardWidth),
    '--tarot-layout-compact-card-max-width': getResponsiveValue(
      config,
      'compact',
      'cardMaxWidth',
      base.cardMaxWidth
    ),
    '--tarot-layout-compact-flex-direction': getResponsiveValue(
      config,
      'compact',
      'flexDirection',
      base.flexDirection
    ),
    '--tarot-layout-compact-justify-content': getResponsiveValue(
      config,
      'compact',
      'justifyContent',
      base.justifyContent
    ),
    '--tarot-layout-compact-align-items': getResponsiveValue(config, 'compact', 'alignItems', base.alignItems),
  };
}

export function resolveTarotLayout(cardCount: number, spreadType?: string): ResolvedTarotLayout {
  const config = TAROT_LAYOUT_CONFIGS[resolveTarotLayoutKey(cardCount, spreadType)];
  return {
    className: config.className,
    modeClass: `layout-mode-${config.mode}`,
    styleVars: buildStyleVars(config),
  };
}

export function getTarotCardClass(spreadType: string | undefined, index: number): string {
  if (spreadType === 'celtic') {
    return `celtic-position-${index}`;
  }
  return '';
}

export function getTarotCardStyle(spreadType: string | undefined, index: number) {
  switch (spreadType) {
    case 'celtic': {
      const celticPositions = [
        { gridArea: '2 / 2' },
        { gridArea: '2 / 2', transform: 'rotate(90deg)', zIndex: 2 },
        { gridArea: '3 / 2' },
        { gridArea: '1 / 2' },
        { gridArea: '2 / 1' },
        { gridArea: '2 / 3' },
        { gridArea: '1 / 4' },
        { gridArea: '2 / 4' },
        { gridArea: '3 / 4' },
        { gridArea: '4 / 4' },
      ];
      return celticPositions[index] || {};
    }
    case 'love': {
      const lovePositions = [
        { gridArea: '2 / 2' },
        { gridArea: '2 / 3' },
        { gridArea: '1 / 2 / 1 / 4' },
        { gridArea: '3 / 1' },
        { gridArea: '3 / 4' },
      ];
      return lovePositions[index] || {};
    }
    case 'decision': {
      const decisionPositions = [
        { gridArea: '2 / 2' },
        { gridArea: '1 / 1' },
        { gridArea: '3 / 1' },
        { gridArea: '1 / 3' },
        { gridArea: '3 / 3' },
        { gridArea: '4 / 2' },
      ];
      return decisionPositions[index] || {};
    }
    case 'chakra':
      return {
        order: 7 - index,
      };
    case 'horseshoe': {
      const horseshoePositions = [
        { gridArea: '3 / 1' },
        { gridArea: '2 / 1' },
        { gridArea: '1 / 1' },
        { gridArea: '1 / 2' },
        { gridArea: '1 / 3' },
        { gridArea: '2 / 3' },
        { gridArea: '3 / 3' },
      ];
      return horseshoePositions[index] || {};
    }
    default:
      return {};
  }
}
