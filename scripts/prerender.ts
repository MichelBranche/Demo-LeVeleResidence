/**
 * Post-build HTML prerender for crawler-readable metadata (view-source).
 * Writes route-specific index.html files under dist/ while keeping the SPA shell.
 *
 * Run after `vite build`. Uses Italian SEO as the default document language
 * (client-side locales share the same URL — no hreflang).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  OG_IMAGE_HEIGHT,
  OG_IMAGE_PATH,
  OG_IMAGE_WIDTH,
  SITE_DISPLAY_NAME,
  absoluteUrl,
  buildPageSchemas,
  getSeoForPath,
} from '../src/data/seo.ts';
import { getLocaleCopy } from '../src/i18n/index.ts';
import { PRERENDER_PATHS } from '../src/lib/siteUrl.ts';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const templatePath = path.join(distDir, 'index.html');

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function upsertMetaByName(html: string, name: string, content: string): string {
  const re = new RegExp(`<meta\\s+name="${name}"\\s+content="[^"]*"\\s*/?>`, 'i');
  const tag = `<meta name="${name}" content="${escapeAttr(content)}" />`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace('</head>', `    ${tag}\n  </head>`);
}

function upsertMetaByProperty(html: string, property: string, content: string): string {
  const re = new RegExp(`<meta\\s+property="${property}"\\s+content="[^"]*"\\s*/?>`, 'i');
  const tag = `<meta property="${property}" content="${escapeAttr(content)}" />`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace('</head>', `    ${tag}\n  </head>`);
}

function upsertCanonical(html: string, href: string): string {
  const re = /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i;
  const tag = `<link rel="canonical" href="${escapeAttr(href)}" />`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace('</head>', `    ${tag}\n  </head>`);
}

function upsertTitle(html: string, title: string): string {
  return html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeAttr(title)}</title>`);
}

function upsertJsonLd(html: string, schemas: Record<string, unknown>[]): string {
  const payload = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
  const tag = `<script type="application/ld+json" id="ld-structured-data">${payload}</script>`;
  const re = /<script\s+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/i;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace('</head>', `    ${tag}\n  </head>`);
}

function outPathForRoute(route: string): string {
  if (route === '/') return path.join(distDir, 'index.html');
  const segments = route.replace(/^\//, '').split('/');
  return path.join(distDir, ...segments, 'index.html');
}

function prerenderRoute(template: string, route: string): string {
  const locale = 'it' as const;
  const seo = getSeoForPath(route, locale);
  const copy = getLocaleCopy(locale);
  const url = absoluteUrl(seo.path);
  const ogImage = absoluteUrl(OG_IMAGE_PATH);
  const robots = seo.noindex ? 'noindex, follow' : 'index, follow';
  const schemas = buildPageSchemas(route, locale);

  let html = template;
  html = upsertTitle(html, seo.title);
  html = upsertMetaByName(html, 'description', seo.description);
  html = upsertMetaByName(html, 'robots', robots);
  html = upsertCanonical(html, url);

  html = upsertMetaByProperty(html, 'og:site_name', SITE_DISPLAY_NAME);
  html = upsertMetaByProperty(html, 'og:title', seo.title);
  html = upsertMetaByProperty(html, 'og:description', seo.description);
  html = upsertMetaByProperty(html, 'og:type', 'website');
  html = upsertMetaByProperty(html, 'og:url', url);
  html = upsertMetaByProperty(html, 'og:locale', copy.ogLocale);
  html = upsertMetaByProperty(html, 'og:image', ogImage);
  html = upsertMetaByProperty(html, 'og:image:alt', copy.seo.ogImageAlt);
  html = upsertMetaByProperty(html, 'og:image:width', String(OG_IMAGE_WIDTH));
  html = upsertMetaByProperty(html, 'og:image:height', String(OG_IMAGE_HEIGHT));

  html = upsertMetaByName(html, 'twitter:card', 'summary_large_image');
  html = upsertMetaByName(html, 'twitter:title', seo.title);
  html = upsertMetaByName(html, 'twitter:description', seo.description);
  html = upsertMetaByName(html, 'twitter:image', ogImage);
  html = upsertMetaByName(html, 'twitter:image:alt', copy.seo.ogImageAlt);

  html = upsertJsonLd(html, schemas);
  return html;
}

function main() {
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Missing ${templatePath}. Run vite build before prerender.`);
  }

  const template = fs.readFileSync(templatePath, 'utf8');
  let count = 0;

  for (const route of PRERENDER_PATHS) {
    const html = prerenderRoute(template, route);
    const outFile = outPathForRoute(route);
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, html, 'utf8');
    count += 1;
    console.log(`prerender ${route} → ${path.relative(root, outFile)}`);
  }

  console.log(`Prerendered ${count} routes with static SEO metadata.`);
}

main();
