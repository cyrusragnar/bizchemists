import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, Mail, Phone } from 'lucide-react'
import { DISPLAY, Logo, Section } from './ui.jsx'
import CaseStudy from './CaseStudy.jsx'
import ServicePanel from './ServicePanel.jsx'
import ContactForm from './ContactForm.jsx'
import WorkCarousel from './WorkCarousel.jsx'
import {
  CAPABILITIES,
  COMMITMENTS,
  CONTACT,
  FAQ,
  FOOTER_LINKS,
  MAILTO,
  SERVICES,
  STORY,
  VALUES,
  WORK,
} from './content.js'

/* ---------------------------------------------------------------- marquee */

export function Marquee() {
  const items = [...CAPABILITIES, ...CAPABILITIES]
  const band = useRef(null)

  // a loop nobody can see should not be burning frames
  useEffect(() => {
    const el = band.current
    if (!el) return
    const track = el.querySelector('.marquee-track')
    const io = new IntersectionObserver(
      ([entry]) => {
        track.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused'
      },
      { threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={band} className="overflow-hidden bg-accent py-4" aria-label="What we are known for">
      <div className="marquee-track flex w-max">
        {items.map((label, i) => (
          <span
            key={i}
            aria-hidden={i >= CAPABILITIES.length}
            className="flex items-center gap-7 px-7 text-xs font-semibold uppercase tracking-[0.28em] text-ink sm:text-sm"
          >
            {label}
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ink/40" />
          </span>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ story */

export function Story() {
  return (
    <Section id="story">
      <h2
        data-split
        className="uppercase text-white"
        style={{ ...DISPLAY, fontSize: 'clamp(2rem, 7vw, 5.5rem)', letterSpacing: '-0.03em' }}
      >
        {STORY.statement.join(' ')}
      </h2>

      <div data-reveal className="mt-14 grid gap-12 md:mt-20 lg:grid-cols-2 lg:gap-20">
        <div data-reveal-item className="flex flex-col gap-6">
          {STORY.body.map((p) => (
            <p key={p} className="max-w-[62ch] text-base leading-relaxed text-white/80 md:text-lg">
              {p}
            </p>
          ))}
        </div>

        <div className="flex flex-col gap-10">
          {[STORY.vision, STORY.mission].map((block) => (
            <div key={block.title} data-reveal-item className="border-t border-accent pt-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">{block.title}</h3>
              <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-muted md:text-base">{block.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div
        data-reveal
        className="mt-20 grid gap-x-12 gap-y-10 border-t border-white/10 pt-12 sm:grid-cols-2 lg:grid-cols-4"
      >
        {COMMITMENTS.map((c) => (
          <div key={c.title} data-reveal-item>
            <h3 className="text-lg font-semibold uppercase tracking-wide text-white">{c.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{c.body}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* --------------------------------------------------------------- services */

export function Services() {
  const [active, setActive] = useState(null)
  const [shown, setShown] = useState(null)
  const lastTrigger = useRef(null)

  useEffect(() => {
    if (active !== null) setShown(active)
  }, [active])

  return (
    <>
      <Section id="expertise" className="bg-forest">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 data-split className="uppercase text-white" style={DISPLAY}>
            What We Formulate
          </h2>
          <p data-reveal className="max-w-[42ch] text-sm leading-relaxed text-white/70 md:text-base">
            Seven service lines. Take one, or hand the whole brand to one versatile agency.
          </p>
        </div>

        {/* Cards, not rows — each one arrives from alternating sides, and the focus
            wheel still governs which is sharp. */}
        <ul data-focus-wheel className="mt-14 flex flex-col gap-5 md:mt-20">
          {SERVICES.map((service, i) => (
            <li key={service.title} data-focus-item>
              <button
                type="button"
                onClick={(e) => {
                  lastTrigger.current = e.currentTarget
                  setActive(i)
                }}
                aria-label={`${service.title} — see what is included`}
                data-slide={i % 2 === 0 ? -1 : 1}
                className="service-card press group grid w-full items-center gap-x-8 gap-y-3 rounded-[10px] border border-white/15 bg-ink/45 p-6 text-left sm:p-8 md:grid-cols-12"
              >
                <span className="flex items-center gap-4 md:col-span-5">
                  <ArrowRight
                    aria-hidden="true"
                    className="focus-arrow h-6 w-6 shrink-0 text-accent md:h-8 md:w-8"
                  />
                  <span
                    className="uppercase leading-none text-white"
                    style={{
                      fontSize: 'clamp(1.75rem, 5vw, 3.5rem)',
                      fontWeight: 600,
                      letterSpacing: '-0.03em',
                    }}
                  >
                    {service.short}
                  </span>
                </span>

                <span className="md:col-span-6">
                  <span className="block text-sm font-semibold uppercase tracking-widest text-white/85 md:text-base">
                    {service.title}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-white/55">{service.body}</span>
                </span>

                <ArrowUpRight className="hidden h-6 w-6 justify-self-end text-white/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent md:col-span-1 md:block" />
              </button>
            </li>
          ))}
        </ul>
      </Section>

      <ServicePanel
        item={shown !== null ? SERVICES[shown] : null}
        open={active !== null}
        onClose={() => setActive(null)}
        returnFocusTo={lastTrigger}
      />
    </>
  )
}

/* -------------------------------------------------------------- portfolio */

export function Portfolio() {
  const [active, setActive] = useState(null)
  // keeps the panel populated while it animates out
  const [shown, setShown] = useState(null)
  const lastTrigger = useRef(null)

  useEffect(() => {
    if (active !== null) setShown(active)
  }, [active])

  return (
    <>
      <Section id="portfolio">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 data-split className="uppercase text-white" style={DISPLAY}>
            Selected Work
          </h2>
          <p data-reveal className="max-w-[42ch] text-sm leading-relaxed text-muted md:text-base">
            Concerts, restaurants, fashion labels, remote production — across Bangladesh and beyond.
          </p>
        </div>

        <WorkCarousel
          onOpen={(i) => {
            lastTrigger.current = document.activeElement
            setActive(i)
          }}
        />
      </Section>

      <CaseStudy
        item={shown !== null ? WORK[shown] : null}
        open={active !== null}
        onClose={() => setActive(null)}
        returnFocusTo={lastTrigger}
      />
    </>
  )
}

/* ----------------------------------------------------------------- values */

export function Values() {
  return (
    <Section className="border-t border-white/10">
      <div data-reveal className="grid gap-x-12 gap-y-10 md:grid-cols-3">
        {VALUES.map((v) => (
          <div key={v.title} data-reveal-item className="border-t border-accent pt-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">{v.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">{v.body}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------- faq */

export function Faq() {
  return (
    <>
      <Section id="faq" className="border-t border-white/10 pb-0 md:pb-0">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 data-split className="uppercase text-white" style={DISPLAY}>
            Questions
          </h2>
          <p data-reveal className="max-w-[42ch] text-sm leading-relaxed text-muted md:text-base">
            Scroll sideways — the answers pile up as you go.
          </p>
        </div>
      </Section>

      {/* Horizontal scroll where every card is sticky at its own `left`, so each one
          pins and the next slides over it. The small rotations and top offsets are
          fixed per index, not random, so the layout is identical on every load. */}
      <div className="faq-rail flex overflow-x-auto overscroll-x-contain" aria-label="Frequently asked questions">
        {FAQ.map((item, i) => (
          <article
            key={item.q}
            className="faq-card"
            /* Deterministic per index — CSS calc() has no modulo (`%` is the percent
               unit there), so the tilt and lift are worked out here instead. */
            style={{ '--i': i, '--tilt': `${((i * 37) % 5) - 2}deg`, '--lift': `${(i * 23) % 40}px` }}
          >
            <div className="flex h-full flex-col justify-between rounded-[10px] border border-white/15 bg-forest p-7 sm:p-9">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-5 text-xl font-semibold uppercase leading-tight tracking-tight text-white md:text-2xl">
                  {item.q}
                </h3>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-white/75 md:text-base">{item.a}</p>
            </div>
          </article>
        ))}
        <div className="faq-rail-end shrink-0" aria-hidden="true" />
      </div>
    </>
  )
}

/* ------------------------------------------------------- contact + footer */

export function Contact() {
  return (
    <footer id="contact" className="overflow-hidden bg-forest">
      <div data-footer-inner className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 md:px-12 md:py-32">
        <h2
          data-split
          className="uppercase text-white"
          style={{ ...DISPLAY, fontSize: 'clamp(2.25rem, 8vw, 6rem)', lineHeight: 0.9, letterSpacing: '-0.03em' }}
        >
          Let&apos;s Collaborate
        </h2>

        <div data-reveal>
          <p data-reveal-item className="mt-8 max-w-[46ch] text-base leading-relaxed text-white/70 md:text-lg">
            Tell us what you&apos;re launching. You&apos;ll get a straight answer on what it needs — on a
            call, free, no deck required.
          </p>

          <div data-reveal-item className="mt-12 flex flex-col gap-5 md:mt-16">
            <a
              href={CONTACT.phoneHref}
              className="press flex items-center gap-4 text-xl font-semibold tracking-tight text-white transition-colors duration-200 hover:text-accent active:text-accent md:text-3xl"
            >
              <Phone className="h-5 w-5 shrink-0 text-accent md:h-6 md:w-6" />
              {CONTACT.phone}
            </a>
            <a
              href={MAILTO}
              className="press flex items-center gap-4 break-all text-xl font-semibold tracking-tight text-white transition-colors duration-200 hover:text-accent active:text-accent md:text-3xl"
            >
              <Mail className="h-5 w-5 shrink-0 text-accent md:h-6 md:w-6" />
              {CONTACT.email}
            </a>
          </div>

          <div data-reveal-item className="mt-12 rounded-2xl border border-white/10 bg-ink/40 p-6 sm:p-8">
            <h3
              className="uppercase text-white"
              style={{ fontSize: 'clamp(1.4rem, 2.6vw, 2rem)', lineHeight: 1, fontWeight: 600, letterSpacing: '-0.02em' }}
            >
              Send us a brief
            </h3>
            <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-white/70">
              A sentence or two is plenty. We reply within one working day.
            </p>
            <div className="mt-6 max-w-[46rem]">
              <ContactForm />
            </div>
          </div>
        </div>

        {/* ---- footer ---- */}
        <div
          data-reveal
          className="mt-24 grid gap-10 border-t border-white/15 pt-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          <div data-reveal-item className="flex flex-col gap-4">
            <Logo withWordmark />
            <p className="text-sm leading-relaxed text-white/60">
            A Gen Z creative marketing and branding agency. Born in Bangladesh, working globally.
          </p>
          </div>

          {FOOTER_LINKS.map((col) => (
            <nav key={col.heading} data-reveal-item aria-label={col.heading}>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">{col.heading}</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {col.items.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="press text-sm text-white/70 transition-colors duration-200 hover:text-accent active:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div data-reveal-item>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">Contact</h3>
            <ul className="mt-5 flex flex-col gap-3">
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="press text-sm text-white/70 transition-colors duration-200 hover:text-accent active:text-accent"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={MAILTO}
                  className="press break-all text-sm text-white/70 transition-colors duration-200 hover:text-accent active:text-accent"
                >
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-white/10 pt-8 text-xs tracking-widest text-muted">
          © 2026 Ibtehaz Kabir Zarif. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
