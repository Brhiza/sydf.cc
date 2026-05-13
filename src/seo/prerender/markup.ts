import type { PrerenderLink, PrerenderRoute } from './routes';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderParagraphs(paragraphs: string[] | undefined): string {
  if (!paragraphs || paragraphs.length === 0) {
    return '';
  }

  return paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('');
}

function renderItems(items: string[] | undefined): string {
  if (!items || items.length === 0) {
    return '';
  }

  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
}

function renderLinks(links: PrerenderLink[] | undefined): string {
  if (!links || links.length === 0) {
    return '';
  }

  return `<p class="seo-prerender-links">${links
    .map((link) => `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`)
    .join('')}</p>`;
}

export function renderPrerenderMarkup(route: PrerenderRoute): string {
  return `
    <noscript>
      <section data-seo-prerender="true" class="seo-prerender-shell">
        <style>
          .seo-prerender-shell {
            max-width: 960px;
            margin: 0 auto;
            padding: 32px 20px 48px;
            color: #1f2937;
            font: 16px/1.8 "PingFang SC", "Microsoft YaHei", sans-serif;
          }
          .seo-prerender-shell h1,
          .seo-prerender-shell h2 {
            margin: 0 0 16px;
            line-height: 1.3;
          }
          .seo-prerender-shell h1 {
            font-size: 32px;
          }
          .seo-prerender-shell h2 {
            margin-top: 28px;
            font-size: 22px;
          }
          .seo-prerender-shell p,
          .seo-prerender-shell li {
            margin: 0 0 12px;
          }
          .seo-prerender-shell ul {
            padding-left: 22px;
            margin: 0;
          }
          .seo-prerender-links {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
          }
          .seo-prerender-links a {
            color: #2563eb;
            text-decoration: none;
          }
        </style>
        <main>
          <h1>${escapeHtml(route.contentTitle)}</h1>
          <p>${escapeHtml(route.lead)}</p>
          ${route.blocks
            .map(
              (block) => `
                <section>
                  <h2>${escapeHtml(block.title)}</h2>
                  ${renderParagraphs(block.paragraphs)}
                  ${renderItems(block.items)}
                  ${renderLinks(block.links)}
                </section>
              `
            )
            .join('')}
        </main>
      </section>
    </noscript>
  `.trim();
}
