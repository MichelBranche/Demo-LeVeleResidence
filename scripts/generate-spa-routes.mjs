/**
 * Genera public/_redirects da src/data/routes.json (Netlify / Cloudflare Pages).
 * Evita 404 su refresh e navigazione browser su path SPA non fisici.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = path.join(root, 'src/data/routes.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

/** @type {Set<string>} */
const paths = new Set(['/']);

for (const page of manifest.pages) {
  paths.add(page.path);
  for (const alias of page.aliases ?? []) paths.add(alias);
}

for (const item of manifest.suites.items) {
  paths.add(`${manifest.suites.basePath}/${item.slug}`);
  for (const alias of item.aliases ?? []) paths.add(alias);
}

const lines = [
  '# Auto-generated from src/data/routes.json — do not edit by hand',
  '# Regenerate: npm run generate-routes',
  '',
];

for (const spaPath of [...paths].sort()) {
  lines.push(`${spaPath}  /index.html  200`);
}

lines.push('', '# SPA fallback', '/*  /index.html  200', '');

const outPath = path.join(root, 'public/_redirects');
fs.writeFileSync(outPath, lines.join('\n'));
console.log(`Wrote ${outPath} (${paths.size} explicit paths)`);
