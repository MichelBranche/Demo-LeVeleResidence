import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const DEFAULT_SITE_URL = 'https://www.rtalevele.com'
const OG_IMAGE_PATH = '/images/og-share.png'

function siteUrlFromEnv(mode: string): string {
  const env = loadEnv(mode, process.cwd(), '')
  return (env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '')
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
            if (id.includes('node_modules/framer-motion')) return 'motion'
            if (id.includes('node_modules/react-router')) return 'router'
            if (id.includes('node_modules/lucide-react')) return 'lucide'
          },
        },
      },
    },
  }
})
