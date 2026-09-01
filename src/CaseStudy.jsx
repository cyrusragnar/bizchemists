import { ArrowUpRight } from 'lucide-react'
import Panel from './Panel.jsx'
import { STUDIES } from './content.js'
import { navigate } from './router.js'

export default function CaseStudy({ item, open, onClose, returnFocusTo }) {
  const href = item ? '/work/' + STUDIES[item.client].slug : '/'
  return (
    <Panel
      open={open}
      onClose={onClose}
      eyebrow="Case study"
      label={item ? `${item.client} case study` : 'Case study'}
      returnFocusTo={returnFocusTo}
    >
      {item && (
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-12 sm:px-8 md:px-12 md:py-16 lg:grid-cols-[minmax(0,42%)_1fr] lg:gap-16">
          <figure className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-2xl bg-forest">
              <img src={item.image} alt={item.alt} width={item.w} height={item.h} className="w-full object-cover" />
            </div>
          </figure>

          <div className="flex flex-col gap-12">
            <div>
              <h2
                className="uppercase text-white"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3.75rem)',
                  lineHeight: 0.95,
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                }}
              >
                {item.client}
              </h2>
              <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-accent">{item.result}</p>
            </div>

            <section>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
                {item.overview.label}
              </h3>
              <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-white/80 md:text-lg">
                {item.overview.body}
              </p>
            </section>

            <section>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
                {item.approach.label}
              </h3>
              <ul className="mt-6 flex flex-col">
                {item.approach.items.map(([title, body]) => (
                  <li key={title} className="border-t border-white/10 py-5 last:border-b">
                    <h4 className="text-base font-semibold uppercase tracking-wide text-white">{title}</h4>
                    <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-muted md:text-base">{body}</p>
                  </li>
                ))}
              </ul>
            </section>

            {item.metrics ? (
              <section>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">Results</h3>
                <div className="mt-6 grid gap-8 sm:grid-cols-3">
                  {item.metrics.map(([value, label]) => (
                    <div key={label}>
                      <div
                        className="text-accent"
                        style={{
                          fontSize: 'clamp(2rem, 4vw, 3rem)',
                          fontWeight: 600,
                          lineHeight: 1,
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {value}
                      </div>
                      <p className="mt-2 text-[11px] font-semibold uppercase tracking-widest text-white">{label}</p>
                    </div>
                  ))}
                </div>
              </section>
            ) : (
              <section>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">Impact</h3>
                <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-white/80 md:text-lg">{item.impact}</p>
              </section>
            )}

            <a
              href={href}
              onClick={(e) => {
                e.preventDefault()
                onClose()
                navigate(href)
              }}
              className="press group inline-flex items-center gap-4 self-start rounded-full bg-accent px-7 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-ink"
            >
              View case study
              <ArrowUpRight
                aria-hidden="true"
                className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </div>
      )}
    </Panel>
  )
}
