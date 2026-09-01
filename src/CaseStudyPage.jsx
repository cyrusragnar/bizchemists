import { useEffect } from 'react'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Logo } from './ui.jsx'
import { Contact } from './Sections.jsx'
import { MAILTO_CALL, STUDIES, WORK } from './content.js'
import { navigate } from './router.js'

/**
 * A full page per project, at /work/<slug>.
 *
 * It deliberately does not reuse the site nav: those links are same-page anchors, and
 * from a sub-route every one of them would land on a hash that has nothing to scroll
 * to. A detail page wants a way back and a way to enquire, not a section index.
 */
export default function CaseStudyPage({ item }) {
  const study = STUDIES[item.client]
  // the next project in the order the portfolio already presents them, wrapping round
  const next = WORK[(WORK.findIndex((w) => w.client === item.client) + 1) % WORK.length]

  // The static file already carries the right title; this is for client-side arrivals.
  useEffect(() => {
    document.title = `${item.client} — ${item.result} | The BizChemists`
  }, [item])

  const backToWork = (e) => {
    e.preventDefault()
    navigate('/')
    // the homepage mounts at the top; take them to the section they came from
    requestAnimationFrame(() => {
      document.querySelector('#portfolio')?.scrollIntoView({ block: 'start' })
    })
  }

  return (
    <div className="bg-ink">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-4 sm:px-8 md:px-12">
          <a href="/" onClick={backToWork} className="press flex items-center gap-3">
            <Logo withWordmark />
          </a>
          <div className="flex items-center gap-5">
            <a
              href="/"
              onClick={backToWork}
              className="press flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 transition-colors duration-200 hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All work
            </a>
            <a
              href={MAILTO_CALL}
              className="press hidden items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink sm:flex"
            >
              Book a Call
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-5 pb-24 pt-14 sm:px-8 md:px-12 md:pb-32 md:pt-20">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
          {study?.industry ?? 'Selected work'}
        </p>
        <h1
          className="mt-5 uppercase text-white"
          style={{
            fontSize: 'clamp(2.25rem, 7vw, 5.5rem)',
            lineHeight: 0.92,
            fontWeight: 600,
            letterSpacing: '-0.03em',
          }}
        >
          {item.client}
        </h1>
        <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-white/75 md:text-xl">{item.result}</p>

        {item.metrics && (
          <div className="mt-12 grid gap-8 border-t border-white/15 pt-10 sm:grid-cols-3">
            {item.metrics.map(([value, label]) => (
              <div key={label}>
                <div
                  className="text-accent"
                  style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', fontWeight: 600, lineHeight: 1, letterSpacing: '-0.02em' }}
                >
                  {value}
                </div>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-widest text-white">{label}</p>
              </div>
            ))}
          </div>
        )}

        <figure className="mt-14 overflow-hidden rounded-2xl bg-forest md:mt-20">
          <img
            src={item.image}
            alt={item.alt}
            width={item.w}
            height={item.h}
            className="w-full object-cover"
            fetchpriority="high"
          />
        </figure>

        {study && (
          <dl className="mt-14 grid gap-10 border-t border-white/15 pt-10 md:mt-20 md:grid-cols-2 md:gap-16">
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">Our role</dt>
              <dd className="mt-4 text-base leading-relaxed text-white/80">{study.role}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">Scope</dt>
              <dd className="mt-4 text-base leading-relaxed text-white/80">{study.scope}</dd>
            </div>
          </dl>
        )}

        <section className="mt-16 md:mt-24">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
            {item.overview.label}
          </h2>
          <p className="mt-5 max-w-[68ch] text-lg leading-relaxed text-white/80 md:text-xl">{item.overview.body}</p>
        </section>

        {study?.sections.map((s) => (
          <section key={s.h} className="mt-14 border-t border-white/10 pt-10 md:mt-20">
            <h2
              className="uppercase text-white"
              style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.5rem)', lineHeight: 1.02, fontWeight: 600, letterSpacing: '-0.02em' }}
            >
              {s.h}
            </h2>
            <p className="mt-5 max-w-[68ch] text-base leading-relaxed text-white/75 md:text-lg">{s.p}</p>
          </section>
        ))}

        <section className="mt-16 md:mt-24">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">{item.approach.label}</h2>
          <ul className="mt-8 flex flex-col">
            {item.approach.items.map(([title, body]) => (
              <li key={title} className="border-t border-white/10 py-6 last:border-b">
                <h3 className="text-base font-semibold uppercase tracking-wide text-white md:text-lg">{title}</h3>
                <p className="mt-2 max-w-[68ch] text-sm leading-relaxed text-muted md:text-base">{body}</p>
              </li>
            ))}
          </ul>
        </section>

        {item.impact && (
          <section className="mt-16 md:mt-24">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">Impact</h2>
            <p className="mt-5 max-w-[68ch] text-lg leading-relaxed text-white/80 md:text-xl">{item.impact}</p>
          </section>
        )}

        {next && (
          <a
            href={`/work/${STUDIES[next.client].slug}/`}
            onClick={(e) => {
              e.preventDefault()
              navigate(`/work/${STUDIES[next.client].slug}/`)
            }}
            className="press group mt-20 flex flex-col gap-3 border-t border-white/15 pt-10 md:mt-28"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">Next project</span>
            <span className="flex items-center gap-4">
              <span
                className="uppercase text-white transition-colors duration-200 group-hover:text-accent"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', lineHeight: 1, fontWeight: 600, letterSpacing: '-0.02em' }}
              >
                {next.client}
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="h-7 w-7 shrink-0 text-white/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              />
            </span>
          </a>
        )}
      </main>

      <Contact />
    </div>
  )
}
