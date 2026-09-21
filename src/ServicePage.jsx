import { useEffect } from 'react'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Logo } from './ui.jsx'
import { Contact } from './Sections.jsx'
import ContactForm from './ContactForm.jsx'
import { MAILTO_CALL, SERVICE_LIST, STUDIES, WORK } from './content.js'
import { navigate } from './router.js'

/**
 * A full page per service line, at /services/<slug>.
 *
 * Same shape as a case study page and for the same reason: the homepage sells seven
 * lines in a sentence each, which is enough to choose from and not enough to rank for
 * or to decide on. Proof comes from WORK rather than from adjectives, so every number
 * on this page is one already recorded against a project.
 */
export default function ServicePage({ page }) {
  const { service } = page
  const proof = page.proof.map((client) => WORK.find((w) => w.client === client)).filter(Boolean)
  const related = page.related.map((slug) => SERVICE_LIST.find((p) => p.slug === slug)).filter(Boolean)

  // The static file already carries the right title; this is for client-side arrivals.
  useEffect(() => {
    document.title = page.metaTitle
  }, [page])

  const backToServices = (e) => {
    e.preventDefault()
    navigate('/')
    requestAnimationFrame(() => {
      document.querySelector('#expertise')?.scrollIntoView({ block: 'start' })
    })
  }

  const go = (to) => (e) => {
    e.preventDefault()
    navigate(to)
  }

  return (
    <div className="bg-ink">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-4 sm:px-8 md:px-12">
          <a href="/" onClick={backToServices} className="press flex items-center gap-3">
            <Logo withWordmark />
          </a>
          <div className="flex items-center gap-5">
            <a
              href="/"
              onClick={backToServices}
              className="press flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 transition-colors duration-200 hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All services
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
          Service · The BizChemists
        </p>
        <h1
          className="mt-5 uppercase text-white"
          style={{
            fontSize: 'clamp(2.25rem, 6vw, 4.75rem)',
            lineHeight: 0.95,
            fontWeight: 600,
            letterSpacing: '-0.03em',
          }}
        >
          {page.h1}
        </h1>
        <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-white/80 md:text-xl">{page.lede}</p>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href={MAILTO_CALL}
            className="press group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-semibold uppercase tracking-widest text-ink transition-colors duration-200 hover:bg-white"
          >
            Book a Call
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <p className="text-xs uppercase tracking-widest text-white/60">Free, and no deck required.</p>
        </div>

        <section className="mt-16 md:mt-24">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">What&apos;s included</h2>
          <ul className="mt-8 flex flex-col">
            {service.includes.map((line) => (
              <li key={line} className="flex items-baseline gap-4 border-t border-white/10 py-4 last:border-b">
                <span className="h-1.5 w-1.5 shrink-0 translate-y-[-2px] rounded-full bg-accent" />
                <span className="text-sm leading-relaxed text-white/80 md:text-base">{line}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-[62ch] border-l-2 border-accent pl-5 text-base leading-relaxed text-white md:text-lg">
            {service.outcome}
          </p>
        </section>

        {page.sections.map((s) => (
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

        {proof.length > 0 && (
          <section className="mt-16 md:mt-24">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">Proof</h2>
            <ul className="mt-8 grid gap-5 md:grid-cols-3">
              {proof.map((w) => (
                <li key={w.client}>
                  <a
                    href={`/work/${STUDIES[w.client].slug}/`}
                    onClick={go(`/work/${STUDIES[w.client].slug}/`)}
                    className="press group flex h-full flex-col justify-between gap-6 rounded-[10px] border border-white/15 bg-forest p-6 transition-colors duration-300 hover:border-accent/45"
                  >
                    <span>
                      <span className="block text-base font-semibold uppercase tracking-wide text-white">
                        {w.client}
                      </span>
                      <span className="mt-1 block text-[11px] font-semibold uppercase tracking-widest text-accent">
                        {w.result}
                      </span>
                    </span>
                    {w.metrics && (
                      <span className="flex flex-wrap gap-x-5 gap-y-2">
                        {w.metrics.map(([value, label]) => (
                          <span key={label} className="text-xs text-white/70">
                            <strong className="font-semibold text-white">{value}</strong> {label}
                          </span>
                        ))}
                      </span>
                    )}
                    <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-white/60 transition-colors duration-200 group-hover:text-accent">
                      Read the case study
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-16 md:mt-24">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">Questions</h2>
          <dl className="mt-8 flex flex-col">
            {page.faqs.map((f) => (
              <div key={f.q} className="border-t border-white/10 py-6 last:border-b">
                <dt className="text-base font-semibold uppercase tracking-wide text-white md:text-lg">{f.q}</dt>
                <dd className="mt-3 max-w-[68ch] text-sm leading-relaxed text-white/75 md:text-base">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-16 rounded-[10px] border border-white/10 bg-forest p-6 sm:p-10 md:mt-24">
          <h2
            className="uppercase text-white"
            style={{ fontSize: 'clamp(1.4rem, 2.6vw, 2rem)', lineHeight: 1, fontWeight: 600, letterSpacing: '-0.02em' }}
          >
            Start this project
          </h2>
          <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-white/70">
            A sentence or two is plenty. We reply within one working day.
          </p>
          <div className="mt-6 max-w-[46rem]">
            <ContactForm service={service.title} />
          </div>
        </section>

        {related.length > 0 && (
          <section className="mt-16 border-t border-white/15 pt-10 md:mt-24">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">Related services</h2>
            <ul className="mt-8 flex flex-col">
              {related.map((r) => (
                <li key={r.slug}>
                  <a
                    href={`/services/${r.slug}/`}
                    onClick={go(`/services/${r.slug}/`)}
                    className="press group flex items-center justify-between gap-6 border-b border-white/10 py-5"
                  >
                    <span
                      className="uppercase text-white transition-colors duration-200 group-hover:text-accent"
                      style={{ fontSize: 'clamp(1.25rem, 2.6vw, 2rem)', lineHeight: 1.05, fontWeight: 600, letterSpacing: '-0.02em' }}
                    >
                      {r.h1}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-6 w-6 shrink-0 text-white/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      <Contact />
    </div>
  )
}
