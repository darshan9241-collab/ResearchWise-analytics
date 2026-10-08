import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ALL_PATHS } from './src/config/routes'

/** Emits robots.txt always, and sitemap.xml when VITE_SITE_URL is configured. */
function seoFiles(siteUrl: string): Plugin {
  return {
    name: 'researchwise-seo-files',
    apply: 'build',
    generateBundle() {
      const base = siteUrl.replace(/\/$/, '')
      const robots = ['User-agent: *', 'Allow: /', base ? `Sitemap: ${base}/sitemap.xml` : ''].filter(Boolean).join('\n')
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots + '\n' })

      if (!base) {
        this.warn('VITE_SITE_URL is not set — sitemap.xml was not generated and canonical URLs are omitted.')
        return
      }
      const urls = ALL_PATHS.map((p) => `  <url><loc>${base}${p === '/' ? '/' : p}</loc></url>`).join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
    plugins: [react(), tailwindcss(), seoFiles(env.VITE_SITE_URL ?? '')],
  }
})
