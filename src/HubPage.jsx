import { useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Breadcrumbs, Logo } from './ui.jsx'
import { Contact } from './Sections.jsx'
import { AUTHOR, HUBS, INSIGHTS, MAILTO_CALL, SERVICE_LIST, STUDIES, WORK } from './content.js'
import { navigate } from './router.js'

/**
 * The page above a set: /services/ and /work/.
 *
 * Both were 404s — the detail pages existed with nothing above them, which left the
 * breadcrumb middle step pointing at an anchor on the homepage and gave a crawler no
 * parent to find them from. One component serves both, because a hub is a heading, a
 * sentence and a list either way.
 */
export default function HubPage({ kind }) {
  const hub = HUBS[kind]

  useEffect(() => {
    document.title = hub.metaTitle
  }, [hub])

  const go = (to) => (e) => {
    e.preventDefault()
    navigate(to)
  }

  const items =
    kind === 'insights'
      ? INSIGHTS.map((a) => ({
          key: a.slug,
          href: `/insights/${a.slug}/`,
          name: a.h1,
          line: `${AUTHOR.name} · ${new Date(a.published + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`,
          note: a.dek,
        }))
      : kind === 'services'
      ? SERVICE_LIST.map((p) => ({
          key: p.slug,
          href: `/services/${p.slug}/`,
          name: p.h1,
          line: p.service.body,
          note: p.service.outcome,
        }))
      : WORK.map((w) => ({
          key: w.client,
          href: `/work/${STUDIES[w.client].slug}/`,
          name: w.client,
          line: w.result,
          note: w.overview.body,
          image: w.image,
          alt: w.alt,
          w: w.w,
          h: w.h,
          metrics: w.metrics,
        }))

  return (
    <div className="bg-ink">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-4 sm:px-8 md:px-12">
          <a href="/" onClick={go('/')} className="press flex items-center gap-3">
            <Logo withWordmark />
          </a>
          <a
            href={MAILTO_CALL}
            className="press hidden items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink sm:flex"
          >
            Book a Call
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-5 pb-24 pt-10 sm:px-8 md:px-12 md:pb-32 md:pt-14">
        <Breadcrumbs trail={[{ label: 'Home', href: '/' }, { label: hub.h1 }]} />

        <h1
          className="mt-8 uppercase text-white"
          style={{
            fontSize: 'clamp(2.25rem, 6vw, 4.75rem)',
            lineHeight: 0.95,
            fontWeight: 600,
            letterSpacing: '-0.03em',
          }}
        >
          {hub.h1}
        </h1>
        <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-white/80 md:text-xl">{hub.lede}</p>
        {(hub.intro || []).map((p) => (
          <p key={p.slice(0, 40)} className="mt-5 max-w-[62ch] text-base leading-relaxed text-white/70">
            {p}
          </p>
        ))}

        <ul className={`mt-14 grid gap-5 md:mt-20 ${kind === 'work' ? 'sm:grid-cols-2 lg:grid-cols-3' : ''}`}>
          {items.map((item) => (
            <li key={item.key}>
              <a
                href={item.href}
                onClick={go(item.href)}
                className="press group flex h-full flex-col gap-5 rounded-[10px] border border-white/15 bg-forest p-6 transition-colors duration-300 hover:border-accent/45 sm:p-8"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.alt}
                    width={item.w}
                    height={item.h}
                    loading="lazy"
                    decoding="async"
                    className="aspect-square w-full rounded-[6px] object-cover"
                  />
                )}

                <span className="flex items-start justify-between gap-6">
                  <span
                    className="uppercase text-white transition-colors duration-200 group-hover:text-accent"
                    style={{
                      fontSize: kind === 'work' ? 'clamp(1.1rem, 2vw, 1.4rem)' : 'clamp(1.35rem, 3vw, 2.25rem)',
                      lineHeight: 1.05,
                      fontWeight: 600,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {item.name}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-6 w-6 shrink-0 text-white/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </span>

                <span className="block text-[11px] font-semibold uppercase tracking-widest text-accent">
                  {item.line}
                </span>
                <span className="block text-sm leading-relaxed text-white/65">{item.note}</span>

                {item.metrics && (
                  <span className="mt-auto flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-4">
                    {item.metrics.map(([value, label]) => (
                      <span key={label} className="text-xs text-white/70">
                        <strong className="font-semibold text-white">{value}</strong> {label}
                      </span>
                    ))}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>

        <section className="mt-16 border-t border-white/15 pt-10 md:mt-24">
          <h2
            className="uppercase text-white"
            style={{ fontSize: 'clamp(1.4rem, 2.6vw, 2rem)', lineHeight: 1.05, fontWeight: 600, letterSpacing: '-0.02em' }}
          >
            Work with The BizChemists
          </h2>
          <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-white/75">{hub.closing}</p>
          <a
            href={MAILTO_CALL}
            className="press group mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-semibold uppercase tracking-widest text-ink transition-colors duration-200 hover:bg-white"
          >
            Book a Call
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </section>
      </main>

      <Contact />
    </div>
  )
}
