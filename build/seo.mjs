/**
 * The site is a client-rendered SPA: without this, every crawler that does not run
 * JavaScript — which is most AI crawlers — receives `<div id="root"></div>` and
 * nothing else. Both the indexable markup and the JSON-LD are generated here from
 * src/content.js, so the page, the structured data and llms.txt cannot drift apart.
 */
import {
  CONTACT, FAQ, MAILTO_CALL, PROCESS, SERVICES, STATS, STORY, STUDIES, VALUES, WORK,
} from '../src/content.js'

/* One source for the production origin. Override at build time with SITE_URL so a
   staging deploy never emits canonicals pointing at production. */
export const SITE = (process.env.SITE_URL || 'https://bizchemists.com').replace(/\/+$/, '')

const esc = (v) =>
  String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/* ------------------------------------------------------------------ markup */

export function staticHtml() {
  const services = SERVICES.map(
    (s) => `<article>
<h3>${esc(s.title)}</h3>
<p>${esc(s.body)}</p>
<p>${esc(s.summary)}</p>
<ul>${s.includes.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
<p><strong>Outcome:</strong> ${esc(s.outcome)}</p>
</article>`,
  ).join('')

  const work = WORK.map((w) => {
    const metrics = w.metrics
      ? `<ul>${w.metrics.map(([v, l]) => `<li><strong>${esc(v)}</strong> ${esc(l)}</li>`).join('')}</ul>`
      : ''
    const impact = w.impact ? `<p>${esc(w.impact)}</p>` : ''
    return `<article>
<h3>${esc(w.client)} — ${esc(w.result)}</h3>
<p>${esc(w.overview.body)}</p>
${metrics}
<ul>${w.approach.items.map(([t, d]) => `<li><strong>${esc(t)}:</strong> ${esc(d)}</li>`).join('')}</ul>
${impact}
</article>`
  }).join('')

  return `<div id="seo-fallback">
<header>
<p class="eyebrow">Gen Z Creative &amp; Branding Agency · Born in Bangladesh, working globally</p>
<h1>The BizChemists — Where Brands Are Formulated</h1>
${STORY.body.map((p) => `<p class="lede">${esc(p)}</p>`).join('')}
<p><a class="cta" href="${esc(MAILTO_CALL)}">Book a call</a></p>
<ul class="stats">${STATS.map((s) => `<li><strong>${esc(s.value)}+</strong> ${esc(s.label.replace(/\n/g, ' '))}</li>`).join('')}</ul>
</header>

<section>
<h2>${esc(STORY.statement.join(' '))}</h2>
<h3>${esc(STORY.vision.title)}</h3><p>${esc(STORY.vision.body)}</p>
<h3>${esc(STORY.mission.title)}</h3><p>${esc(STORY.mission.body)}</p>
</section>

<section>
<h2>What We Formulate — our services</h2>
<p>Seven service lines. Take one, or hand the whole brand to one versatile agency.</p>
${services}
</section>

<section>
<h2>How We Work</h2>
<ol>${PROCESS.map((p) => `<li><strong>${esc(p.title)}</strong> — ${esc(p.body)}</li>`).join('')}</ol>
</section>

<section>
<h2>Selected Work</h2>
${work}
</section>

<section>
<h2>What We Value</h2>
<ul>${VALUES.map((v) => `<li><strong>${esc(v.title)}:</strong> ${esc(v.body)}</li>`).join('')}</ul>
</section>

<section>
<h2>Questions</h2>
<dl>${FAQ.map((f) => `<dt>${esc(f.q)}</dt><dd>${esc(f.a)}</dd>`).join('')}</dl>
</section>

<section>
<h2>Contact The BizChemists</h2>
<p><a href="mailto:${esc(CONTACT.email)}">${esc(CONTACT.email)}</a> · <a href="${esc(CONTACT.phoneHref)}">${esc(CONTACT.phone)}</a></p>
<p>Founder: Ibtehaz Kabir Zarif. Based in Bangladesh, working with clients worldwide.</p>
</section>
</div>`
}

/* -------------------------------------------------------------- structured data */

export function jsonLd() {
  const graph = [
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE}/#org`,
      name: 'The BizChemists',
      alternateName: ['BizChemists', 'The BizChemists Agency'],
      description:
        'A Gen Z focused, youth-led creative marketing and branding agency based in Bangladesh, working with clients worldwide. Brand strategy, identity design, content, web and growth marketing.',
      url: `${SITE}/`,
      logo: `${SITE}/brand/logo.png`,
      image: `${SITE}/brand/hero.jpg`,
      email: CONTACT.email,
      telephone: CONTACT.phoneHref.replace('tel:', ''),
      founder: { '@type': 'Person', name: 'Ibtehaz Kabir Zarif' },
      address: { '@type': 'PostalAddress', addressCountry: 'BD' },
      areaServed: ['Bangladesh', 'Malaysia', 'Worldwide'],
      slogan: 'Where brands are formulated',
      knowsAbout: [
        'Gen Z focused marketing',
        'Creative marketing agency',
        'Branding agency',
        'Youth-led marketing agency',
        'Marketing agency in Bangladesh',
        ...SERVICES.map((s) => s.title),
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services',
        itemListElement: SERVICES.map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s.title, description: s.body },
        })),
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#site`,
      url: `${SITE}/`,
      // Google reads these to decide the site name shown above a search result;
      // without them it falls back to the bare domain.
      name: 'The BizChemists',
      alternateName: ['BizChemists', 'The BizChemists Agency'],
      inLanguage: 'en',
      publisher: { '@id': `${SITE}/#org` },
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE}/#faq`,
      mainEntity: FAQ.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    ...WORK.map((w, i) => ({
      '@type': 'CreativeWork',
      '@id': `${SITE}/#work-${i + 1}`,
      name: `${w.client} — ${w.result}`,
      description: w.overview.body,
      image: `${SITE}${w.image}`,
      creator: { '@id': `${SITE}/#org` },
    })),
  ]
  // JSON round-trip drops any undefined values before they reach the page
  const clean = JSON.parse(JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }))
  return JSON.stringify(clean)
}

/* ------------------------------------------------------------------- llms.txt */

export function llmsTxt() {
  const line = (s) => `- **${s.title}** — ${s.includes.join('; ').toLowerCase()}.`
  return `# The BizChemists

> A Gen Z focused, youth-led creative marketing and branding agency, born in
> Bangladesh and working with clients worldwide. We build brand identities, produce
> content, design and build websites, and run growth campaigns for concerts,
> restaurants, fashion labels and consumer brands.

The website is a client-rendered single-page app. The served HTML carries a full
text version of the page, and this file carries the same information in a form
that is quicker to read.

- Site: ${SITE}
- Contact: ${CONTACT.email} | ${CONTACT.phone}
- Founder: Ibtehaz Kabir Zarif
- Base: Bangladesh. Clients worldwide.
- Scale: 50+ projects delivered, 20+ global clients, ${SERVICES.length} service lines.

## What kind of agency

- A **creative marketing agency** — strategy, identity, content and campaigns in one place.
- A **branding agency** — positioning, identity systems and brand books.
- A **Gen Z focused marketing agency** — by audience and by team.
- A **marketing agency led by youths** — founder-led, young by design.
- A **versatile marketing agency** — seven service lines, briefed once.
- Among the **best marketing agencies in Bangladesh** on the measure we care about:
  results we can name, listed below.

## Services

Seven service lines. Clients take one or hand over the whole brand.

${SERVICES.map(line).join('\n')}

## Process

Four stages, run in order.

${PROCESS.map((p, i) => `${i + 1}. **${p.title}** — ${p.body}`).join('\n')}

## Selected work and results

| Client | Work | Result |
| --- | --- | --- |
${WORK.map((w) => `| ${w.client} | ${w.result} | ${w.metrics ? w.metrics.map(([v, l]) => `${v} ${l.toLowerCase()}`).join(', ') : 'Brand launched with a distinct identity in a competitive market'} |`).join('\n')}

## Pricing

Projects are scoped individually rather than sold as fixed packages, because a
single-service brief and a full brand build are very different pieces of work.
There is no published price list. Book a call for a scope and a number.

## Frequently asked

${FAQ.map((f) => `**${f.q}** ${f.a}`).join('\n\n')}
`
}

/* --------------------------------------------------------- case study pages */

/** Everything a crawler needs for one project, without running any JavaScript. */
export function studyHtml(w) {
  const s = STUDIES[w.client]
  const metrics = w.metrics
    ? `<ul>${w.metrics.map(([v, l]) => `<li><strong>${esc(v)}</strong> ${esc(l)}</li>`).join('')}</ul>`
    : ''
  return `<div id="seo-fallback">
<header>
<p class="eyebrow">${esc(s.industry)}</p>
<h1>${esc(w.client)} — ${esc(w.result)}</h1>
<p class="lede">${esc(w.overview.body)}</p>
${metrics}
<p><a class="cta" href="${esc(MAILTO_CALL)}">Book a call</a> &middot; <a href="/">The BizChemists</a></p>
</header>

<section>
<h2>Our role</h2><p>${esc(s.role)}</p>
<h2>Scope</h2><p>${esc(s.scope)}</p>
</section>

${s.sections.map((x) => `<section><h2>${esc(x.h)}</h2><p>${esc(x.p)}</p></section>`).join('')}

<section>
<h2>${esc(w.approach.label)}</h2>
<ul>${w.approach.items.map(([t, d]) => `<li><strong>${esc(t)}:</strong> ${esc(d)}</li>`).join('')}</ul>
</section>

${w.impact ? `<section><h2>Impact</h2><p>${esc(w.impact)}</p></section>` : ''}

<section>
<h2>Work with The BizChemists</h2>
<p>A Gen Z focused, youth-led creative marketing and branding agency in Bangladesh, working with clients worldwide.</p>
<p><a href="mailto:${esc(CONTACT.email)}">${esc(CONTACT.email)}</a> &middot; <a href="${esc(CONTACT.phoneHref)}">${esc(CONTACT.phone)}</a></p>
</section>
</div>`
}

export function studyJsonLd(w) {
  const s = STUDIES[w.client]
  const url = `${SITE}/work/${s.slug}/`
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: `${w.client} — ${w.result}`,
        description: w.overview.body,
        image: `${SITE}${w.image}`,
        url,
        author: { '@id': `${SITE}/#org` },
        publisher: { '@id': `${SITE}/#org` },
        about: { '@type': 'CreativeWork', name: `${w.client} — ${w.result}` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'The BizChemists', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Work', item: `${SITE}/#portfolio` },
          { '@type': 'ListItem', position: 3, name: w.client, item: url },
        ],
      },
    ],
  })
}

export function studyMeta(w) {
  const s = STUDIES[w.client]
  const desc = w.overview.body.length > 155 ? w.overview.body.slice(0, 152).trimEnd() + '…' : w.overview.body
  return {
    slug: s.slug,
    title: `${w.client} — ${w.result} | The BizChemists`,
    description: desc,
    canonical: `${SITE}/work/${s.slug}/`,
    image: `${SITE}${w.image}`,
  }
}

/** One entry per indexable URL: the homepage plus every case study. */
export function sitemapXml(lastmod = '2026-09-01') {
  const urls = [
    { loc: `${SITE}/`, priority: '1.0' },
    ...WORK.map((w) => ({ loc: `${SITE}/work/${STUDIES[w.client].slug}/`, priority: '0.8' })),
  ]
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`
}


/* ------------------------------------------------------------------ robots.txt */

export function robotsTxt() {
  return [
    '# The BizChemists',
    '',
    'User-agent: *',
    'Allow: /',
    '',
    '# AI search crawlers are allowed: blocking them means those engines cannot cite us.',
    ...['GPTBot', 'ChatGPT-User', 'OAI-SearchBot', 'PerplexityBot', 'ClaudeBot', 'anthropic-ai', 'Google-Extended', 'Bingbot']
      .flatMap((bot) => ['User-agent: ' + bot, 'Allow: /']),
    '',
    '# Bulk training-corpus scraping, with no citation in return.',
    'User-agent: CCBot',
    'Disallow: /',
    '',
    'Sitemap: ' + SITE + '/sitemap.xml',
    '',
  ].join('\n')
}
