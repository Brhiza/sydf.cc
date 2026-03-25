type TarotLayoutMode = 'flex' | 'grid';

interface TarotLayoutResponsiveConfig {
  maxWidth?: string;
  gap?: string;
  padding?: string;
  cardWidth?: string;
  cardMaxWidth?: string;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
}

interface TarotLayoutConfig {
  className: string;
  mode: TarotLayoutMode;
  maxWidth?: string;
  gap?: string;
  padding?: string;
  background?: string;
  cardWidth?: string;
  cardMaxWidth?: string;
  gridColumns?: string;
  gridRows?: string;
  aspectRatio?: string;
  flexDirection?: string;
  flexWrap?: string;
  justifyContent?: string;
  alignItems?: string;
  responsive?: {
    desktop?: TarotLayoutResponsiveConfig;
    tablet?: TarotLayoutResponsiveConfig;
    mobile?: TarotLayoutResponsiveConfig;
    compact?: TarotLayoutResponsiveConfig;
  };
}

const DEFAULT_LAYOUT_CONFIG: Required<
  Pick<
    TarotLayoutConfig,
    | 'maxWidth'
    | 'gap'
    | 'padding'
    | 'background'
    | 'cardWidth'
    | 'cardMaxWidth'
    | 'gridColumns'
    | 'gridRows'
    | 'aspectRatio'
    | 'flexDirection'
    | 'flexWrap'
    | 'justifyContent'
    | 'alignItems'
  >
> = {
  maxWidth: '100%',
  gap: '0px',
  padding: '0px',
  background: 'transparent',
  cardWidth: '160px',
  cardMaxWidth: '160px',
  gridColumns: 'none',
  gridRows: 'auto',
  aspectRatio: 'auto',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'stretch',
};

const TAROT_LAYOUT_CONFIGS: Record<string, TarotLayoutConfig> = {
  single: {
    className: 'layout-single',
    mode: 'flex',
    padding: 'var(--spacing-6) var(--spacing-4)',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(240, 240, 240, 0.1))',
    cardWidth: 'min(250px, calc(50vw - 40px))',
    cardMaxWidth: '250px',
    responsive: {
      tablet: {
        cardWidth: 'min(220px, calc(40vw - 40px))',
      },
      mobile: {
        cardWidth: '160px',
      },
      compact: {
        cardWidth: '140px',
      },
    },
  },
  three: {
    className: 'layout-three',
    mode: 'flex',
    gap: 'var(--spacing-4)',
    padding: 'var(--spacing-6) var(--spacing-4)',
    background: 'linear-gradient(135deg, rgba(135, 206, 235, 0.1), rgba(173, 216, 230, 0.1))',
    cardWidth: 'min(200px, calc((100vw - 120px) / 3 - var(--spacing-4)))',
    cardMaxWidth: '200px',
    responsive: {
      tablet: {
        cardWidth: 'min(180px, calc((100vw - 120px) / 3 - var(--spacing-4)))',
      },
      compact: {
        gap: 'var(--spacing-3)',
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
  },
  love: {
    className: 'layout-love',
    mode: 'grid',
    gridColumns: 'repeat(4, 1fr)',
    gridRows: 'repeat(3, auto)',
    gap: 'var(--spacing-3)',
    maxWidth: 'min(80vw, 600px)',
    padding: 'var(--spacing-6) var(--spacing-4)',
    background: 'linear-gradient(135deg, rgba(255, 182, 193, 0.1), rgba(255, 105, 180, 0.1))',
    cardWidth: 'min(150px, calc((100vw - 120px) / 4 - var(--spacing-3)))',
    cardMaxWidth: '150px',
    responsive: {
      desktop: {
        maxWidth: 'min(70vw, 700px)',
      },
      tablet: {
        maxWidth: 'min(75vw, 550px)',
      },
      mobile: {
        maxWidth: '400px',
        padding: 'var(--spacing-4) var(--spacing-3)',
      },
      compact: {
        maxWidth: '100%',
        gap: 'var(--spacing-2)',
        padding: 'var(--spacing-6) var(--spacing-4)',
      },
    },
  },
  career: {
    className: 'layout-career',
    mode: 'grid',
    gridColumns: 'repeat(3, 1fr)',
    gridRows: 'repeat(2, auto)',
    gap: 'var(--spacing-3)',
    maxWidth: 'min(70vw, 580px)',
    padding: 'var(--spacing-6) var(--spacing-4)',
    background: 'linear-gradient(135deg, rgba(70, 130, 180, 0.1), rgba(100, 149, 237, 0.1))',
    cardWidth: 'min(170px, calc((100vw - 120px) / 3 - var(--spacing-3)))',
    cardMaxWidth: '170px',
    responsive: {
      desktop: {
        maxWidth: 'min(60vw, 650px)',
      },
      tablet: {
        maxWidth: 'min(65vw, 520px)',
      },
      mobile: {
        maxWidth: '380px',
        padding: 'var(--spacing-4) var(--spacing-3)',
      },
      compact: {
        maxWidth: '100%',
        gap: 'var(--spacing-2)',
        padding: 'var(--spacing-6) var(--spacing-4)',
      },
    },
  },
  decision: {
    className: 'layout-decision',
    mode: 'grid',
    gridColumns: 'repeat(3, 1fr)',
    gridRows: 'repeat(4, auto)',
    gap: 'var(--spacing-3)',
    maxWidth: 'min(60vw, 550px)',
    padding: 'var(--spacing-6) var(--spacing-4)',
    background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 165, 0, 0.1))',
    cardWidth: 'min(160px, calc((100vw - 120px) / 3 - var(--spacing-3)))',
    cardMaxWidth: '160px',
    responsive: {
      desktop: {
        maxWidth: 'min(50vw, 600px)',
      },
      tablet: {
        maxWidth: 'min(55vw, 500px)',
      },
      mobile: {
        maxWidth: '350px',
        padding: 'var(--spacing-4) var(--spacing-3)',
        cardWidth: 'min(100px, calc((100vw - 100px) / 3 - var(--spacing-3)))',
        cardMaxWidth: '100px',
      },
      compact: {
        maxWidth: '100%',
        gap: 'var(--spacing-2)',
        padding: 'var(--spacing-6) var(--spacing-4)',
        cardWidth: 'min(80px, calc((100vw - 120px) / 3 - var(--spacing-2)))',
        cardMaxWidth: '80px',
      },
    },
  },
  celtic: {
    className: 'layout-celtic',
    mode: 'grid',
    gridColumns: 'repeat(4, 1fr)',
    gridRows: 'repeat(4, 1fr)',
    gap: 'var(--spacing-2)',
    maxWidth: 'min(70vw, 700px)',
    padding: 'var(--spacing-6) var(--spacing-4)',
    background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.1), rgba(75, 0, 130, 0.1))',
    cardWidth: 'min(140px, calc((100vw - 120px) / 4 - var(--spacing-2)))',
    cardMaxWidth: '140px',
    aspectRatio: '4 / 4',
    responsive: {
      desktop: {
        maxWidth: 'min(60vw, 800px)',
      },
      tablet: {
        maxWidth: 'min(65vw, 650px)',
      },
      mobile: {
        maxWidth: '400px',
        gap: 'var(--spacing-1)',
        padding: 'var(--spacing-4) var(--spacing-3)',
      },
      compact: {
        maxWidth: '100%',
        gap: 'var(--spacing-1)',
        padding: 'var(--spacing-6) var(--spacing-4)',
      },
    },
  },
  chakra: {
    className: 'layout-chakra',
    mode: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--spacing-3)',
    maxWidth: 'min(25vw, 250px)',
    padding: 'var(--spacing-6) var(--spacing-4)',
    background:
      'linear-gradient(180deg, rgba(255, 0, 0, 0.1) 0%, rgba(255, 165, 0, 0.1) 16%, rgba(255, 255, 0, 0.1) 32%, rgba(0, 128, 0, 0.1) 48%, rgba(0, 191, 255, 0.1) 64%, rgba(75, 0, 130, 0.1) 80%, rgba(148, 0, 211, 0.1) 100%)',
    cardWidth: 'min(180px, calc(100vw - 160px))',
    cardMaxWidth: '180px',
    responsive: {
      desktop: {
        maxWidth: 'min(20vw, 300px)',
      },
      tablet: {
        maxWidth: 'min(22vw, 220px)',
      },
      mobile: {
        maxWidth: '180px',
        gap: 'var(--spacing-2)',
        padding: 'var(--spacing-4) var(--spacing-3)',
      },
      compact: {
        maxWidth: '100%',
        gap: 'var(--spacing-2)',
        padding: 'var(--spacing-6) var(--spacing-4)',
      },
    },
  },
  year: {
    className: 'layout-year',
    mode: 'grid',
    gridColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
    gap: 'var(--spacing-2)',
    maxWidth: 'min(90vw, 1000px)',
    padding: 'var(--spacing-6) var(--spacing-4)',
    background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 140, 0, 0.1))',
    cardWidth: 'min(130px, calc((100vw - 120px) / 6 - var(--spacing-2)))',
    cardMaxWidth: '130px',
    responsive: {
      desktop: {
        maxWidth: 'min(85vw, 1200px)',
      },
      tablet: {
        maxWidth: 'min(88vw, 900px)',
      },
      mobile: {
        maxWidth: '600px',
        gap: 'var(--spacing-1)',
        padding: 'var(--spacing-4) var(--spacing-3)',
      },
      compact: {
        maxWidth: '100%',
        gap: 'var(--spacing-1)',
        padding: 'var(--spacing-6) var(--spacing-4)',
      },
    },
  },
  mindBodySpirit: {
    className: 'layout-mind-body-spirit',
    mode: 'flex',
    gap: 'var(--spacing-4)',
    cardWidth: 'min(200px, calc((100vw - 120px) / 3 - var(--spacing-4)))',
    cardMaxWidth: '200px',
  },
  horseshoe: {
    className: 'layout-horseshoe',
    mode: 'grid',
    gridColumns: 'repeat(3, 1fr)',
    gridRows: 'repeat(3, auto)',
    gap: 'var(--spacing-3)',
    maxWidth: 'min(70vw, 600px)',
    padding: '0 var(--spacing-2)',
    cardWidth: 'min(160px, calc((100vw - 120px) / 3 - var(--spacing-3)))',
    cardMaxWidth: '160px',
  },
  grid: {
    className: 'layout-grid',
    mode: 'grid',
    gridColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: 'var(--spacing-4)',
    maxWidth: 'min(80vw, 800px)',
    padding: 'var(--spacing-6) var(--spacing-4)',
    background: 'linear-gradient(135deg, rgba(128, 128, 128, 0.1), rgba(169, 169, 169, 0.1))',
    cardWidth: 'min(170px, calc((100vw - 120px) / 3 - var(--spacing-4)))',
    cardMaxWidth: '170px',
    responsive: {
      desktop: {
        maxWidth: 'min(75vw, 900px)',
      },
      tablet: {
        maxWidth: 'min(78vw, 750px)',
      },
      mobile: {
        maxWidth: '500px',
        gap: 'var(--spacing-2)',
        padding: 'var(--spacing-4) var(--spacing-3)',
      },
      compact: {
        maxWidth: '100%',
        gap: 'var(--spacing-2)',
        padding: 'var(--spacing-6) var(--spacing-4)',
      },
    },
  },
  complex: {
    className: 'layout-complex',
    mode: 'grid',
    gridColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
    gap: 'var(--spacing-3)',
    maxWidth: 'min(85vw, 900px)',
    padding: 'var(--spacing-6) var(--spacing-4)',
    background: 'linear-gradient(135deg, rgba(255, 99, 71, 0.1), rgba(255, 69, 0, 0.1))',
    cardWidth: 'min(150px, calc((100vw - 120px) / 4 - var(--spacing-3)))',
    cardMaxWidth: '150px',
    responsive: {
      desktop: {
        maxWidth: 'min(80vw, 1000px)',
      },
      tablet: {
        maxWidth: 'min(83vw, 850px)',
      },
      mobile: {
        maxWidth: '600px',
        gap: 'var(--spacing-2)',
        padding: 'var(--spacing-4) var(--spacing-3)',
      },
      compact: {
        maxWidth: '100%',
        gap: 'var(--spacing-2)',
        padding: 'var(--spacing-6) var(--spacing-4)',
      },
    },
  },
  largeComplex: {
    className: 'layout-large-complex',
    mode: 'grid',
    gridColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
    gap: 'var(--spacing-2)',
    maxWidth: 'min(95vw, 1200px)',
    padding: 'var(--spacing-6) var(--spacing-4)',
    background: 'linear-gradient(135deg, rgba(72, 61, 139, 0.1), rgba(106, 90, 205, 0.1))',
    cardWidth: 'min(130px, calc((100vw - 120px) / 6 - var(--spacing-2)))',
    cardMaxWidth: '130px',
    responsive: {
      desktop: {
        maxWidth: 'min(90vw, 1400px)',
      },
      tablet: {
        maxWidth: 'min(92vw, 1100px)',
      },
      mobile: {
        maxWidth: '700px',
        gap: 'var(--spacing-1)',
        padding: 'var(--spacing-4) var(--spacing-3)',
      },
      compact: {
        maxWidth: '100%',
        gap: 'var(--spacing-1)',
        padding: 'var(--spacing-6) var(--spacing-4)',
      },
    },
  },
};

function getFallbackLayoutKey(cardCount: number): string {
  if (cardCount === 1) return 'single';
  if (cardCount === 3) return 'three';
  if (cardCount <= 6) return 'grid';
  if (cardCount <= 10) return 'complex';
  return 'largeComplex';
}

function resolveTarotLayoutKey(cardCount: number, spreadType?: string): string {
  if (spreadType && TAROT_LAYOUT_CONFIGS[spreadType]) {
    return spreadType;
  }
  return getFallbackLayoutKey(cardCount);
}

function getResponsiveValue(
  config: TarotLayoutConfig,
  breakpoint: keyof NonNullable<TarotLayoutConfig['responsive']>,
  key: keyof TarotLayoutResponsiveConfig,
  fallback: string
): string {
  return config.responsive?.[breakpoint]?.[key] ?? fallback;
}

export function getTarotLayoutConfig(cardCount: number, spreadType?: string): TarotLayoutConfig {
  return TAROT_LAYOUT_CONFIGS[resolveTarotLayoutKey(cardCount, spreadType)];
}

export function getTarotLayoutClass(cardCount: number, spreadType?: string): string {
  return getTarotLayoutConfig(cardCount, spreadType).className;
}

export function getTarotLayoutModeClass(cardCount: number, spreadType?: string): string {
  return `layout-mode-${getTarotLayoutConfig(cardCount, spreadType).mode}`;
}

export function getTarotLayoutStyleVars(cardCount: number, spreadType?: string): Record<string, string> {
  const config = getTarotLayoutConfig(cardCount, spreadType);
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
