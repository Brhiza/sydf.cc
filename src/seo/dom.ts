import {
  DEFAULT_IMAGE_HEIGHT,
  DEFAULT_IMAGE_WIDTH,
  DEFAULT_LANGUAGE,
  DEFAULT_LOCALE,
} from './definitions';
import type { ResolvedSeoMeta } from './resolve';

function isTagName(element: Element | null, tagName: string): boolean {
  return element?.tagName.toLowerCase() === tagName;
}

function ensureMetaTag(
  targetDocument: Document,
  attributeName: 'name' | 'property',
  key: string
): HTMLMetaElement {
  const selector = `meta[${attributeName}="${key}"]`;
  const existingTag = targetDocument.head.querySelector(selector);

  if (isTagName(existingTag, 'meta')) {
    const metaTag = existingTag as HTMLMetaElement;
    metaTag.setAttribute('data-seo-managed', 'true');
    return metaTag;
  }

  const meta = targetDocument.createElement('meta');
  meta.setAttribute(attributeName, key);
  meta.setAttribute('data-seo-managed', 'true');
  targetDocument.head.appendChild(meta);
  return meta;
}

function setMetaContent(
  targetDocument: Document,
  attributeName: 'name' | 'property',
  key: string,
  content: string
): void {
  ensureMetaTag(targetDocument, attributeName, key).setAttribute('content', content);
}

function ensureCanonicalLink(targetDocument: Document): HTMLLinkElement {
  const existingLink = targetDocument.head.querySelector('link[rel="canonical"]');

  if (isTagName(existingLink, 'link')) {
    const canonicalLink = existingLink as HTMLLinkElement;
    canonicalLink.setAttribute('data-seo-managed', 'true');
    return canonicalLink;
  }

  const link = targetDocument.createElement('link');
  link.rel = 'canonical';
  link.setAttribute('data-seo-managed', 'true');
  targetDocument.head.appendChild(link);
  return link;
}

function ensureStructuredDataScript(targetDocument: Document): HTMLScriptElement {
  const existingScript = targetDocument.getElementById('seo-structured-data');

  if (isTagName(existingScript, 'script')) {
    return existingScript as HTMLScriptElement;
  }

  const script = targetDocument.createElement('script');
  script.id = 'seo-structured-data';
  script.type = 'application/ld+json';
  targetDocument.head.appendChild(script);
  return script;
}

export function applySeoMetaToDocument(targetDocument: Document, meta: ResolvedSeoMeta): void {
  targetDocument.title = meta.title;
  targetDocument.documentElement.lang = DEFAULT_LANGUAGE;

  setMetaContent(targetDocument, 'name', 'description', meta.description);
  setMetaContent(targetDocument, 'name', 'keywords', meta.keywords);
  setMetaContent(targetDocument, 'name', 'robots', meta.robots);
  setMetaContent(targetDocument, 'name', 'googlebot', meta.robots);
  setMetaContent(targetDocument, 'name', 'bingbot', meta.robots);
  setMetaContent(targetDocument, 'name', 'twitter:card', 'summary_large_image');
  setMetaContent(targetDocument, 'name', 'twitter:title', meta.title);
  setMetaContent(targetDocument, 'name', 'twitter:description', meta.description);
  setMetaContent(targetDocument, 'name', 'twitter:url', meta.canonicalUrl);
  setMetaContent(targetDocument, 'name', 'twitter:image', meta.imageUrl);
  setMetaContent(targetDocument, 'name', 'twitter:image:alt', meta.imageAlt);

  setMetaContent(targetDocument, 'property', 'og:type', meta.ogType);
  setMetaContent(targetDocument, 'property', 'og:url', meta.canonicalUrl);
  setMetaContent(targetDocument, 'property', 'og:title', meta.title);
  setMetaContent(targetDocument, 'property', 'og:description', meta.description);
  setMetaContent(targetDocument, 'property', 'og:image', meta.imageUrl);
  setMetaContent(targetDocument, 'property', 'og:image:width', DEFAULT_IMAGE_WIDTH);
  setMetaContent(targetDocument, 'property', 'og:image:height', DEFAULT_IMAGE_HEIGHT);
  setMetaContent(targetDocument, 'property', 'og:image:alt', meta.imageAlt);
  setMetaContent(targetDocument, 'property', 'og:site_name', '时月东方');
  setMetaContent(targetDocument, 'property', 'og:locale', DEFAULT_LOCALE);

  ensureCanonicalLink(targetDocument).href = meta.canonicalUrl;
  ensureStructuredDataScript(targetDocument).textContent = JSON.stringify(meta.schema);
}

export function applySeoMeta(meta: ResolvedSeoMeta): void {
  if (typeof document === 'undefined') {
    return;
  }

  applySeoMetaToDocument(document, meta);
}
