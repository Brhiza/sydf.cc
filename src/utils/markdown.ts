import { Marked, type RendererObject } from 'marked';

const SAFE_PROTOCOLS = new Set(['http:', 'https:', 'mailto:', 'tel:']);
const RELATIVE_URL_PATTERN = /^(\/(?!\/)|\.{1,2}\/|#|\?)/;

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function sanitizeUrl(rawUrl: string | null | undefined): string | null {
  if (typeof rawUrl !== 'string') return null;

  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  if (RELATIVE_URL_PATTERN.test(trimmed)) {
    return trimmed;
  }

  try {
    const url = new URL(trimmed);
    if (SAFE_PROTOCOLS.has(url.protocol)) {
      return url.toString();
    }
  } catch {
    return null;
  }

  return null;
}

const renderer: RendererObject<string, string> = {
  html(token) {
    return escapeHtml(token.text);
  },
  link(token) {
    const text = this.parser.parseInline(token.tokens);
    const safeHref = sanitizeUrl(token.href);
    if (!safeHref) {
      return text;
    }

    const title = token.title ? ` title="${escapeHtml(token.title)}"` : '';
    const rel = safeHref.startsWith('http://') || safeHref.startsWith('https://')
      ? ' rel="noopener noreferrer nofollow"'
      : '';

    return `<a href="${escapeHtml(safeHref)}"${title}${rel}>${text}</a>`;
  },
  image(token) {
    const safeSrc = sanitizeUrl(token.href);
    if (!safeSrc) {
      return escapeHtml(token.text || '');
    }

    const title = token.title ? ` title="${escapeHtml(token.title)}"` : '';
    return `<img src="${escapeHtml(safeSrc)}" alt="${escapeHtml(token.text || '')}"${title}>`;
  },
};

const markdownRenderer = new Marked({
  breaks: true,
  gfm: true,
  renderer,
});

export async function renderSafeMarkdown(content: string): Promise<string> {
  if (!content) return '';
  return await markdownRenderer.parse(content);
}
