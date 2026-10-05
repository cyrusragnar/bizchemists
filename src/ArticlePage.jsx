import { useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Breadcrumbs, Logo } from './ui.jsx'
import { Contact } from './Sections.jsx'
import { AUTHOR, INSIGHTS, MAILTO_CALL, SERVICE_LIST, STUDIES, WORK } from './content.js'
import { navigate } from './router.js'

/**
 * One article, at /insights/<slug>.
 *
 * The project table is generated from WORK rather than written into the copy, so a
 * number quoted in an article is the same number recorded against the project, and
 * correcting one corrects both.
 */
export default function ArticlePage({ article }) {
  const services = article.services.map((slug) => SERVICE_LIST.find((p) => p.slug === slug)).filter(Boolean)
  const related = (article.related || []).map((slug) => INSIGHTS.find((a) => a.slug === slug)).filter(Boolean)
  // the pillar carries the whole table; a single-project piece links to its own
  const projects = article.projectTable
    ? []
    : (article.projects || []).map((client) => WORK.find((w) => w.client === client)).filter(Boolean)

  useEffect(() => {
    document.title = article.metaTitle
  }, [article])

  const go = (to) => (e) => {
    e.preventDefault()
    navigate(to)
  }

  const date = (iso) =>
    new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

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
        <Breadcrumbs
          trail={[{ label: 'Home', href: '/' }, { label: 'Insights', href: '/insights/' }, { label: article.h1 }]}
        />

        <article className="mt-8 max-w-[72ch]">
          <h1
            className="uppercase text-white"
            style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4rem)', lineHeight: 0.98, fontWeight: 600, letterSpacing: '-0.03em' }}
          >
            {article.h1}
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-white/80 md:text-xl">{article.dek}</p>

          <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/15 pt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
            <span className="text-white">{AUTHOR.name}</span>
            <span aria-hidden="true" className="text-white/25">/</span>
            <span>{AUTHOR.role}</span>
            <span aria-hidden="true" className="text-white/25">/</span>
            <time dateTime={article.published}>{date(article.published)}</time>
            {article.updated !== article.published && (
              <>
                <span aria-hidden="true" className="text-white/25">/</span>
                <span>Updated <time dateTime={article.updated}>{date(article.updated)}</time></span>
              </>
            )}
          </p>

          {article.sections.map((section, i) => (
            <section key={section.h} className="mt-12">
              <h2
                className="uppercase text-white"
                style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2.1rem)', lineHeight: 1.05, fontWeight: 600, letterSpacing: '-0.02em' }}
              >
                {section.h}
              </h2>
              {section.body.map((p) => (
                <p key={p.slice(0, 40)} className="mt-5 text-base leading-relaxed text-white/75 md:text-lg">
                  {p}
                </p>
              ))}

              {i === 0 && article.projectTable && (
                <div className="mt-8 overflow-x-auto">
                  <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-white/20">
                        {['Project', 'What it was', 'What it produced'].map((th) => (
                          <th
                            key={th}
                            scope="col"
                            className="py-3 pr-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent"
                          >
                            {th}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {WORK.map((w) => (
                        <tr key={w.client} className="border-b border-white/10 align-top">
                          <th scope="row" className="py-4 pr-5 font-semibold text-white">
                            <a
                              href={`/work/${STUDIES[w.client].slug}/`}
                              onClick={go(`/work/${STUDIES[w.client].slug}/`)}
                              className="press transition-colors duration-200 hover:text-accent"
                            >
                              {w.client}
                            </a>
                          </th>
                          <td className="py-4 pr-5 text-white/65">{w.result}</td>
                          <td className="py-4 text-white/85">
                            {w.metrics && w.metrics.length
                              ? w.metrics.map(([v, l]) => `${v} ${l.toLowerCase()}`).join(', ')
                              : 'No published numbers'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}

          <section className="mt-16">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">Questions</h2>
            <dl className="mt-8 flex flex-col">
              {article.faqs.map((f) => (
                <div key={f.q} className="border-t border-white/10 py-6 last:border-b">
                  <dt className="text-base font-semibold uppercase tracking-wide text-white md:text-lg">{f.q}</dt>
                  <dd className="mt-3 text-sm leading-relaxed text-white/75 md:text-base">{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>

          {projects.length > 0 && (
            <section className="mt-16">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">The work behind this</h2>
              <ul className="mt-8 flex flex-col">
                {projects.map((w) => (
                  <li key={w.client}>
                    <a
                      href={`/work/${STUDIES[w.client].slug}/`}
                      onClick={go(`/work/${STUDIES[w.client].slug}/`)}
                      className="press group flex items-center justify-between gap-6 border-b border-white/10 py-5"
                    >
                      <span>
                        <span className="block text-base font-semibold uppercase tracking-wide text-white transition-colors duration-200 group-hover:text-accent">
                          {w.client}
                        </span>
                        <span className="mt-1 block text-[11px] font-semibold uppercase tracking-widest text-accent">
                          {w.result}
                        </span>
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-5 w-5 shrink-0 text-white/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="mt-16">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
              The services behind this work
            </h2>
            <ul className="mt-8 flex flex-col">
              {services.map((p) => (
                <li key={p.slug}>
                  <a
                    href={`/services/${p.slug}/`}
                    onClick={go(`/services/${p.slug}/`)}
                    className="press group flex items-center justify-between gap-6 border-b border-white/10 py-5"
                  >
                    <span
                      className="uppercase text-white transition-colors duration-200 group-hover:text-accent"
                      style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.6rem)', lineHeight: 1.05, fontWeight: 600, letterSpacing: '-0.02em' }}
                    >
                      {p.h1}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 text-white/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {related.length > 0 && (
            <section className="mt-16">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">Related reading</h2>
              <ul className="mt-8 flex flex-col gap-5">
                {related.map((r) => (
                  <li key={r.slug}>
                    <a href={`/insights/${r.slug}/`} onClick={go(`/insights/${r.slug}/`)} className="press group block">
                      <span
                        className="uppercase text-white transition-colors duration-200 group-hover:text-accent"
                        style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.6rem)', lineHeight: 1.05, fontWeight: 600, letterSpacing: '-0.02em' }}
                      >
                        {r.h1}
                      </span>
                      <span className="mt-2 block text-sm leading-relaxed text-white/60">{r.dek}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <aside className="mt-16 rounded-[10px] border border-white/15 bg-forest p-6 sm:p-8">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">About the author</h2>
            <p className="mt-5 text-base font-semibold uppercase tracking-wide text-white">{AUTHOR.name}</p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">{AUTHOR.role}</p>
            <p className="mt-4 text-sm leading-relaxed text-white/75">{AUTHOR.bio}</p>
            <a
              href={MAILTO_CALL}
              className="press group mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold uppercase tracking-widest text-ink transition-colors duration-200 hover:bg-white"
            >
              Book a Call
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </aside>
        </article>
      </main>

      <Contact />
    </div>
  )
}
