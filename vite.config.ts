import fs from 'node:fs'
import path from 'node:path'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { SITEMAP_PATHS, resolveSiteUrl } from './src/lib/siteUrl'

const OG_IMAGE_PATH = '/images/og-share.webp'

function siteUrlFromEnv(mode: string): string {
  const env = loadEnv(mode, process.cwd(), '')
  // Prefer VITE_SITE_URL (client); SITE_URL accepted as deploy alias.
  return resolveSiteUrl(env.VITE_SITE_URL || env.SITE_URL)
}

function buildSitemapXml(siteUrl: string, lastmod: string): string {
  const urls = SITEMAP_PATHS.map((p) => {
    const loc = p === '/' ? `${siteUrl}/` : `${siteUrl}${p}`
    const priority =
      p === '/' ? '1.0' : p === '/prenota' ? '0.9' : p.startsWith('/camere/') ? '0.75' : '0.7'
    const changefreq = p === '/' || p === '/prenota' ? 'weekly' : 'monthly'
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

function seoStaticFilesPlugin(siteUrl: string): Plugin {
  const lastmod = new Date().toISOString().slice(0, 10)
  const writeDistFiles = (outDir: string) => {
    fs.mkdirSync(outDir, { recursive: true })
    fs.writeFileSync(
      path.join(outDir, 'robots.txt'),
      `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      'utf8',
    )
    fs.writeFileSync(path.join(outDir, 'sitemap.xml'), buildSitemapXml(siteUrl, lastmod), 'utf8')
  }

  return {
    name: 'seo-static-files',
    writeBundle() {
      const outDir = path.resolve(__dirname, 'dist')
      writeDistFiles(outDir)
    },
  }
}

function htmlSiteMeta(siteUrl: string) {
  const title = 'Residence Le Vele | Appartamenti vacanze a Stintino, Sardegna'
  const description =
    'Residence Le Vele a Stintino: appartamenti vacanze in Sardegna con vista mare o giardino, soggiorni vicino a La Pelosa.'
  const ogImage = `${siteUrl}${OG_IMAGE_PATH}`
  const canonical = `${siteUrl}/`

  return {
    title,
    description,
    canonical,
    ogImage,
    siteName: 'Residence Le Vele',
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const siteUrl = siteUrlFromEnv(mode)
  const meta = htmlSiteMeta(siteUrl)

  return {
    plugins: [
      react(),
      {
        name: 'html-site-meta',
        transformIndexHtml(html) {
          return html
            .replaceAll('%SITE_URL%', siteUrl)
            .replaceAll('%HTML_TITLE%', meta.title)
            .replaceAll('%HTML_DESCRIPTION%', meta.description)
            .replaceAll('%HTML_CANONICAL%', meta.canonical)
            .replaceAll('%OG_IMAGE%', meta.ogImage)
            .replaceAll('%OG_SITE_NAME%', meta.siteName)
        },
      },
      seoStaticFilesPlugin(siteUrl),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/gsap')) return 'gsap'
            if (id.includes('node_modules/lenis')) return 'lenis'
            if (id.includes('node_modules/framer-motion/dist/es/m.mjs') || id.includes('framer-motion/m')) {
              return 'motion-m'
            }
            if (id.includes('node_modules/framer-motion')) return 'motion'
            if (id.includes('node_modules/react-router')) return 'router'
            if (id.includes('node_modules/lucide-react')) return 'lucide'
            if (id.includes('node_modules/hls.js')) return 'hls'
          },
        },
      },
    },
  }
})
