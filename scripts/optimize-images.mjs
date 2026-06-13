import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');

const SOURCE_FILES = [
  path.join(ROOT, 'src', 'i18n', 'siteMedia.ts'),
  path.join(ROOT, 'index.html'),
  path.join(ROOT, 'src', 'data', 'seo.ts'),
  path.join(ROOT, 'vite.config.ts'),
];

const BASE_DIRS = {
  SEA: 'Foto 2024 camere Le Vele/vista mare',
  GARDEN: 'Foto 2024 camere Le Vele/vista giardino',
  BATH: 'Foto 2024 camere Le Vele/bagni',
  ATMOSFERA: 'images/atmosfera',
  CONTATTI: 'images/contatti',
  PELOSA_DIR: 'la-pelosa',
};

const MAX_WIDTH = 2400;
const WEBP_QUALITY = 82;

function toUrlPath(relativePath) {
  return `/${relativePath.split(path.sep).join('/')}`;
}

function toWebpUrl(urlPath) {
  return urlPath.replace(/\.(png|jpe?g|JPG)$/i, '.webp');
}

async function collectReferencedPaths() {
  const relativePaths = new Set();

  for (const file of SOURCE_FILES) {
    const content = await fs.readFile(file, 'utf8');

    for (const match of content.matchAll(/asset\('([^']+\.(?:png|jpe?g|JPG))'\)/gi)) {
      relativePaths.add(decodeURIComponent(match[1].replace(/^\//, '')));
    }

    for (const match of content.matchAll(/href="(\/[^"]+\.(?:png|jpe?g|JPG))"/gi)) {
      relativePaths.add(decodeURIComponent(match[1].replace(/^\//, '')));
    }

    for (const match of content.matchAll(/src="(\/[^"]+\.(?:png|jpe?g|JPG))"/gi)) {
      relativePaths.add(decodeURIComponent(match[1].replace(/^\//, '')));
    }

    for (const match of content.matchAll(/'(\/[^']+\.(?:png|jpe?g|JPG))'/gi)) {
      relativePaths.add(decodeURIComponent(match[1].replace(/^\//, '')));
    }

    for (const [key, dir] of Object.entries(BASE_DIRS)) {
      const re = new RegExp(`\\$\\{${key}\\}/([^\\s\`"']+\\.(?:png|jpe?g|JPG))`, 'gi');
      for (const match of content.matchAll(re)) {
        relativePaths.add(path.join(dir, decodeURIComponent(match[1])));
      }
    }
  }

  return [...relativePaths]
    .sort()
    .map((relative) => ({
      relative,
      diskPath: path.join(PUBLIC, relative),
      urlPath: toUrlPath(relative).replace(/ /g, '%20'),
      webpUrlPath: toWebpUrl(toUrlPath(relative)).replace(/ /g, '%20'),
    }));
}

async function convertOne(entry) {
  try {
    await fs.access(entry.diskPath);
  } catch {
    console.warn(`SKIP missing: ${entry.relative}`);
    return null;
  }

  const outputPath = entry.diskPath.replace(/\.(png|jpe?g|JPG)$/i, '.webp');
  const before = (await fs.stat(entry.diskPath)).size;
  const image = sharp(entry.diskPath, { failOn: 'none' });
  const meta = await image.metadata();

  let pipeline = image.rotate();
  if (meta.width && meta.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  await pipeline.webp({ quality: WEBP_QUALITY, effort: 4 }).toFile(outputPath);
  const after = (await fs.stat(outputPath)).size;
  await fs.unlink(entry.diskPath);

  return { ...entry, before, after };
}

async function updateSourceFiles(entries) {
  for (const file of SOURCE_FILES) {
    let content = await fs.readFile(file, 'utf8');
    let changed = false;

    for (const entry of entries) {
      const replacements = [
        [entry.urlPath, entry.webpUrlPath],
        [toUrlPath(entry.relative), toWebpUrl(toUrlPath(entry.relative))],
      ];

      const fileName = path.basename(entry.relative);
      const webpFileName = fileName.replace(/\.(png|jpe?g|JPG)$/i, '.webp');
      replacements.push([`/${fileName}`, `/${webpFileName}`]);

      for (const [from, to] of replacements) {
        if (content.includes(from)) {
          content = content.split(from).join(to);
          changed = true;
        }
      }
    }

    if (changed) {
      await fs.writeFile(file, content, 'utf8');
    }
  }
}

async function main() {
  const entries = await collectReferencedPaths();
  console.log(`Found ${entries.length} referenced raster images`);

  const results = [];
  for (const entry of entries) {
    const result = await convertOne(entry);
    if (result) results.push(result);
  }

  await updateSourceFiles(results);

  const beforeTotal = results.reduce((sum, item) => sum + item.before, 0);
  const afterTotal = results.reduce((sum, item) => sum + item.after, 0);
  const saved = beforeTotal - afterTotal;
  const pct = beforeTotal > 0 ? ((saved / beforeTotal) * 100).toFixed(1) : '0';

  console.log(`Converted ${results.length} images`);
  console.log(
    `Size: ${(beforeTotal / 1024 / 1024).toFixed(2)} MB -> ${(afterTotal / 1024 / 1024).toFixed(2)} MB (${pct}% saved)`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
