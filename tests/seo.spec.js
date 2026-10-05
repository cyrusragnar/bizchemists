// @ts-check
import { test, expect } from '@playwright/test'
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { AUTHOR, INSIGHTS, SERVICE_LIST, STUDIES, WORK as WORK_ITEMS } from '../src/content.js'

/**
 * Regression tests for the parts of this site a crawler sees.
 *
 * They read dist/ rather than a running server, because that is what the container
 * serves and what a crawler without JavaScript receives. Run `npm run build` first;
 * `npm test` does both.
 *
 * These exist because every one of them is something that silently broke, or could
 * have: a section visible only in React, a page nothing linked to, a hand-typed date,
 * a social card describing the wrong image.
 */

const DIST = 'dist'
const page = (p) => readFileSync(join(DIST, p, 'index.html'), 'utf8')
const ORIGIN = 'https://bizchemists.com'

const SERVICES = SERVICE_LIST.map((p) => p.slug)
const WORK = WORK_ITEMS.map((w) => STUDIES[w.client].slug)
const ARTICLES = INSIGHTS.map((a) => a.slug)
const ALL = [
  '',
  'services',
  'work',
  'insights',
  ...SERVICES.map((s) => `services/${s}`),
  ...WORK.map((w) => `work/${w}`),
  ...ARTICLES.map((a) => `insights/${a}`),
]

const decode = (s = '') =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
const head = (html, re) => decode((html.match(re) || [])[1])
const jsonLd = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]))
const visible = (html) =>
  (html.match(/<div id="seo-fallback">[\s\S]*<\/div>/) || [''])[0].replace(/<[^>]+>/g, ' ')

test.describe('every page', () => {
  for (const path of ALL) {
    test(`/${path} is built, titled and canonical`, () => {
      expect(existsSync(join(DIST, path, 'index.html')), `${path} was not emitted`).toBe(true)
      const html = page(path)

      const title = head(html, /<title>([\s\S]*?)<\/title>/)
      expect(title, 'missing <title>').toBeTruthy()
      // 62 allows for the two-character &amp; entity in a 60-character title
      expect(title.length, `title too long: ${title}`).toBeLessThanOrEqual(62)

      const description = head(html, /name="description"[\s\S]*?content="([^"]*)"/)
      expect(description, 'missing meta description').toBeTruthy()
      expect(description.length).toBeGreaterThan(70)
      expect(description.length).toBeLessThanOrEqual(165)

      expect(head(html, /rel="canonical" href="([^"]*)"/)).toBe(`${ORIGIN}/${path}${path ? '/' : ''}`)
      expect(html).not.toMatch(/noindex/i)

      expect((html.match(/<h1[ >]/g) || []).length, 'there must be exactly one h1').toBe(1)

      // the og: card must describe this page, not whichever page was copied from
      expect(head(html, /property="og:url"[\s\S]*?content="([^"]*)"/)).toBe(`${ORIGIN}/${path}${path ? '/' : ''}`)
      expect(head(html, /property="og:image:alt"[\s\S]*?content="([^"]*)"/)).toBeTruthy()

      // and a crawler that runs no JavaScript still gets the page
      expect(visible(html).split(/\s+/).filter(Boolean).length, 'too little crawlable text').toBeGreaterThan(150)
    })

    test(`/${path} has valid structured data`, () => {
      const graphs = jsonLd(page(path))
      expect(graphs.length, 'no JSON-LD on the page').toBeGreaterThan(0)
      for (const g of graphs) {
        expect(g['@context']).toBe('https://schema.org')
        const nodes = g['@graph'] || [g]
        for (const node of nodes) expect(node['@type'], 'a node with no @type').toBeTruthy()
      }
    })
  }
})

test('sub-pages carry a breadcrumb trail', () => {
  const deep = [
    ...SERVICES.map((s) => `services/${s}`),
    ...WORK.map((w) => `work/${w}`),
    ...ARTICLES.map((a) => `insights/${a}`),
  ]
  for (const path of deep) {
    const crumbs = jsonLd(page(path))
      .flatMap((g) => g['@graph'] || [g])
      .find((n) => n['@type'] === 'BreadcrumbList')
    expect(crumbs, `${path} has no BreadcrumbList`).toBeTruthy()
    expect(crumbs.itemListElement).toHaveLength(3)
    // the middle crumb must be a real page, not an anchor on the homepage
    expect(crumbs.itemListElement[1].item).not.toContain('#')
  }
})

test('nothing is an orphan: every page is linked from another page', () => {
  const linked = new Set()
  for (const path of ALL) {
    for (const m of page(path).matchAll(/href="\/((?:services|work|insights)[a-z0-9/-]*)\/"/g)) linked.add(m[1])
  }
  for (const path of ALL.filter(Boolean)) {
    expect(linked.has(path), `${path} is linked from nowhere`).toBe(true)
  }
})

test('every internal link resolves to a page that exists', () => {
  for (const path of ALL) {
    for (const m of page(path).matchAll(/href="(\/[a-z0-9/-]*\/)"/g)) {
      const target = m[1] === '/' ? '' : m[1].replace(/^\/|\/$/g, '')
      expect(existsSync(join(DIST, target, 'index.html')), `${path} links to ${m[1]}, which is not built`).toBe(true)
    }
  }
})

test('the sitemap lists every page, and only pages that exist', () => {
  const xml = readFileSync(join(DIST, 'sitemap.xml'), 'utf8')
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  expect(locs).toHaveLength(ALL.length)
  for (const path of ALL) expect(locs).toContain(`${ORIGIN}/${path}${path ? '/' : ''}`)
  // a date typed by hand goes stale the day after it is typed
  const today = new Date().toISOString().slice(0, 10)
  expect(xml).toContain(`<lastmod>${today}</lastmod>`)
})

test('robots.txt allows the search and AI crawlers and names the sitemap', () => {
  const robots = readFileSync(join(DIST, 'robots.txt'), 'utf8')
  for (const bot of ['GPTBot', 'PerplexityBot', 'ClaudeBot', 'Google-Extended', 'Bingbot', 'OAI-SearchBot']) {
    expect(robots, `${bot} is not allowed`).toContain(`User-agent: ${bot}\nAllow: /`)
  }
  expect(robots).toContain(`Sitemap: ${ORIGIN}/sitemap.xml`)
  // CCBot is deliberately blocked — it takes the content and cites nobody. What must
  // never happen is the open crawler block disallowing the site.
  expect(robots).toMatch(/User-agent: \*\nAllow: \//)
  expect(robots.split('User-agent: CCBot')[0]).not.toMatch(/^Disallow: \/$/m)
})

test('the homepage states who the organisation is', () => {
  const org = jsonLd(page(''))
    .flatMap((g) => g['@graph'] || [g])
    .find((n) => n['@id'] === `${ORIGIN}/#org`)
  expect(org).toBeTruthy()
  expect(org.name).toBe('The BizChemists')
  expect(org.sameAs.length, 'the public profiles are how Google ties the site to the company').toBe(3)
  expect(org.sameAs.join(' ')).not.toContain('stkn') // a session token is not a profile URL
  expect(org.address.addressCountry).toBe('BD')
})

test('the FAQ schema matches the questions on the page', () => {
  const html = page('')
  const faq = jsonLd(html)
    .flatMap((g) => g['@graph'] || [g])
    .find((n) => n['@type'] === 'FAQPage')
  expect(faq).toBeTruthy()
  const text = visible(html)
  for (const q of faq.mainEntity) {
    // schema may not claim a question the page does not actually answer
    expect(text, `${q.name} is in the schema but not on the page`).toContain(q.name)
  }
})

test('each service page carries the phrase it is meant to rank for', () => {
  const phrases = {
    'brand-identity': 'branding agency',
    'video-production': 'video editing',
    'web-design': 'web design agency',
    'influencer-marketing': 'influencer marketing agency',
    'growth-marketing': 'digital marketing agency',
    'social-media-marketing': 'social media marketing agency',
    'recruitment-support': 'employer brand',
  }
  for (const [slug, phrase] of Object.entries(phrases)) {
    const text = visible(page(`services/${slug}`))
    const words = text.split(/\s+/).filter(Boolean).length
    const hits = (text.match(new RegExp(phrase, 'gi')) || []).length
    expect(hits, `${slug} never says "${phrase}"`).toBeGreaterThan(0)
    // stuffing is worse than silence: Google ignores it and AI engines cite it less
    expect((hits / words) * 100, `${slug} over-uses "${phrase}"`).toBeLessThan(2)
  }
})

test('the analytics tag reaches every page', () => {
  for (const path of ALL) {
    expect(page(path), `/${path} has no analytics tag`).toContain('src="/analytics.js"')
  }
  const boot = readFileSync(join(DIST, 'analytics.js'), 'utf8')
  expect(boot).toContain('G-T6ZP3BG896')
  // an inline snippet would be refused by our own Content-Security-Policy
  expect(boot).toContain('googletagmanager.com/gtag/js')
  expect(boot).toContain('localhost')
})

test('every article is attributed, dated and connected to the work', () => {
  for (const slug of ARTICLES) {
    const html = page(`insights/${slug}`)
    const article = jsonLd(html)
      .flatMap((g) => g['@graph'] || [g])
      .find((n) => n['@type'] === 'Article')

    expect(article, `${slug} has no Article schema`).toBeTruthy()
    expect(article.author.name).toBe(AUTHOR.name)
    expect(article.author['@type']).toBe('Person')
    expect(article.datePublished).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(article.dateModified).toMatch(/^\d{4}-\d{2}-\d{2}$/)

    // the byline is on the page, not only in the markup a reader never sees
    const text = visible(html)
    expect(text).toContain(AUTHOR.name)

    // an article that links to no money page is a cluster with nothing at the centre
    expect((html.match(/href="\/services\/[a-z-]+\//g) || []).length).toBeGreaterThan(0)
    // and the numbers it quotes should come back to the project they came from
    expect((html.match(/href="\/work\/[a-z0-9-]+\//g) || []).length).toBeGreaterThan(0)
  }
})

test('llms.txt describes the site for AI engines', () => {
  const llms = readFileSync(join(DIST, 'llms.txt'), 'utf8')
  expect(llms).toContain('# The BizChemists')
  for (const slug of SERVICES) expect(llms).toContain(`/services/${slug}/`)
  expect(llms).toContain('BizThread AI')
})
