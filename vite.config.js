import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {
  SITE,
  jsonLd,
  llmsTxt,
  robotsTxt,
  sitemapXml,
  staticHtml,
  studyHtml,
  studyJsonLd,
  studyMeta,
} from './build/seo.mjs'
import { STUDIES, WORK } from './src/content.js'

const attr = (v) => String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;')

/** Swap the content of one <meta>, whichever attribute identifies it. */
const setMeta = (html, key, name, value) =>
  html.replace(new RegExp(`(<meta[^>]*${key}="${name}"[^>]*content=")[^"]*(")`), `$1${attr(value)}$2`)

/**
 * Without this the crawler-visible page is `<div id="root"></div>` — which is what
 * most AI crawlers see, since they do not run JavaScript. The plugin fills that div
 * with real markup, emits the JSON-LD graph, writes llms.txt and the sitemap, and
 * emits a real HTML file per case study at work/<slug>/index.html so those pages have
 * their own indexable URLs rather than living only inside a modal.
 *
 * Everything is generated from src/content.js, so none of it can drift from the copy.
 */
const seo = () => {
  let outDir = 'dist'
  return {
  name: 'bizchemists-seo',

  transformIndexHtml(html) {
    return html
      .replaceAll('__SITE__', SITE)
      .replace('<!--seo:jsonld-->', `<script type="application/ld+json">${jsonLd()}</script>`)
      .replace('<!--seo:content-->', staticHtml())
  },

  configResolved(config) {
    outDir = config.build.outDir
  },

  generateBundle() {
    this.emitFile({ type: 'asset', fileName: 'llms.txt', source: llmsTxt() })
    this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml() })
    this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robotsTxt() })
  },

  // Runs after Vite has written index.html. Its hashed asset tags are lifted from the
  // written file rather than guessed, then each page is rebuilt from the untouched
  // template so the <head> keeps exactly one source.
  writeBundle() {
    const built = readFileSync(join(outDir, 'index.html'), 'utf8')
    const script = built.match(/<script type="module"[^>]*><\/script>/)?.[0]
    const styles = built.match(/<link rel="stylesheet"[^>]*href="\/assets\/[^"]*"[^>]*>/)?.[0] ?? ''
    if (!script) {
      this.warn('no built script tag found — case study pages were not emitted')
      return
    }

    const template = readFileSync('index.html', 'utf8')

    for (const w of WORK) {
      const meta = studyMeta(w)
      let page = template
        .replaceAll('__SITE__', SITE)
        .replace(/<title>[\s\S]*?<\/title>/, `<title>${attr(meta.title)}</title>`)
        .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${meta.canonical}$2`)
      page = setMeta(page, 'name', 'description', meta.description)
      page = setMeta(page, 'property', 'og:url', meta.canonical)
      page = setMeta(page, 'property', 'og:title', meta.title)
      page = setMeta(page, 'property', 'og:description', meta.description)
      page = setMeta(page, 'property', 'og:image', meta.image)
      page = setMeta(page, 'property', 'og:type', 'article')
      page = setMeta(page, 'name', 'twitter:title', meta.title)
      page = setMeta(page, 'name', 'twitter:description', meta.description)
      page = setMeta(page, 'name', 'twitter:image', meta.image)
      page = page
        .replace('<!--seo:jsonld-->', `<script type="application/ld+json">${studyJsonLd(w)}</script>`)
        .replace('<!--seo:content-->', studyHtml(w))
        .replace('<script type="module" src="/src/main.jsx"></script>', script)
        // the hero poster is preloaded for the homepage; a case study never shows it
        .replace(/\n\s*<link rel="preload" as="image"[^>]*>/, '')
        .replace('</head>', `${styles}\n  </head>`)

      const out = join(outDir, 'work', STUDIES[w.client].slug, 'index.html')
      mkdirSync(dirname(out), { recursive: true })
      writeFileSync(out, page)
    }
  },

  // generateBundle never runs under `vite dev`, so serve the same files from memory
  // rather than leaving 404s that look like missing assets.
  configureServer(server) {
    server.middlewares.use('/llms.txt', (_req, res) => {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      res.end(llmsTxt())
    })
    server.middlewares.use('/sitemap.xml', (_req, res) => {
      res.setHeader('Content-Type', 'application/xml; charset=utf-8')
      res.end(sitemapXml())
    })
    server.middlewares.use('/robots.txt', (_req, res) => {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      res.end(robotsTxt())
    })
  },
  }
}

export default defineConfig({ plugins: [react(), seo()] })
