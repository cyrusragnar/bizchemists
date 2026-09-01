import Panel from './Panel.jsx'
import ContactForm from './ContactForm.jsx'
import { CONTACT } from './content.js'

export default function ServicePanel({ item, open, onClose, returnFocusTo }) {
  return (
    <Panel
      open={open}
      onClose={onClose}
      eyebrow="Service"
      label={item ? `${item.title} details` : 'Service details'}
      returnFocusTo={returnFocusTo}
    >
      {item && (
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-12 sm:px-8 md:px-12 md:py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div className="flex flex-col gap-10">
            <div>
              <h2
                className="uppercase text-white"
                style={{
                  fontSize: 'clamp(1.9rem, 4.5vw, 3.5rem)',
                  lineHeight: 0.95,
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                }}
              >
                {item.title}
              </h2>
              <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-white/80 md:text-lg">
                {item.summary}
              </p>
            </div>

            <section>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
                What&apos;s included
              </h3>
              <ul className="mt-6 flex flex-col">
                {item.includes.map((line) => (
                  <li
                    key={line}
                    className="flex items-baseline gap-4 border-t border-white/10 py-4 last:border-b"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 translate-y-[-2px] rounded-full bg-accent" />
                    <span className="text-sm leading-relaxed text-white/80 md:text-base">{line}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="border-l-2 border-accent pl-5">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
                What you end up with
              </h3>
              <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-white md:text-lg">{item.outcome}</p>
            </section>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-white/10 bg-forest p-6 sm:p-8">
              <h3
                className="uppercase text-white"
                style={{ fontSize: 'clamp(1.4rem, 2.6vw, 2rem)', lineHeight: 1, fontWeight: 600, letterSpacing: '-0.02em' }}
              >
                Start this project
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Tell us what you&apos;re working on. We reply within one working day — or call{' '}
                <a href={CONTACT.phoneHref} className="text-accent underline-offset-4 hover:underline">
                  {CONTACT.phone}
                </a>
                .
              </p>
              <div className="mt-6">
                <ContactForm service={item.title} compact />
              </div>
            </div>
          </div>
        </div>
      )}
    </Panel>
  )
}
