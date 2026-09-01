import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import { Logo } from './ui.jsx'
import { CONTACT, MAILTO_CALL, NAV } from './content.js'
import { gsap, prefersReduced } from './motion.js'

export default function Nav({ play }) {
  const header = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // The overlay owns the viewport while it is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Nav drops in once the reaction has lifted, not while it is still on screen.
  useEffect(() => {
    if (!play) return
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('[data-nav-item]')
      if (prefersReduced()) {
        gsap.set(items, { autoAlpha: 1, y: 0 })
        return
      }
      gsap.fromTo(
        items,
        { y: -20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
      )
    }, header)
    return () => ctx.revert()
  }, [play])

  // transparent nav sits on the ivory poster; scrolled nav sits on ink
  const onLight = !scrolled

  return (
    <>
      <header
        ref={header}
        className={`nav-glass fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
          scrolled ? 'bg-ink/80 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        {/* a scroll edge, not a 1px rule: the chrome dissolves into the content under it */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-full h-6 bg-gradient-to-b from-ink/70 to-transparent transition-opacity duration-500 ${
            scrolled ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <nav className="flex items-center justify-between px-5 py-4 sm:px-8 md:px-12">
          <a data-nav-item href="#top" className="opacity-0" aria-label="The BizChemists, back to top">
            <Logo withWordmark dark={onLight} />
          </a>

          <div className="hidden items-center gap-8 lg:flex lg:gap-11">
            {NAV.map((item) => (
              <a
                key={item.label}
                data-nav-item
                href={item.href}
                className={`text-sm font-semibold uppercase tracking-widest opacity-0 transition-colors duration-200 ${
                  onLight ? 'text-ink hover:text-ink/60' : 'text-white hover:text-accent'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div data-nav-item className="flex items-center opacity-0">
            <a
              href={MAILTO_CALL}
              className="press group hidden items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-ink transition-colors duration-200 hover:bg-white lg:flex"
            >
              Book a Call
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="press flex h-9 w-9 shrink-0 flex-col items-center justify-center gap-1 rounded-full bg-accent lg:hidden"
            >
              <span className="h-0.5 w-4 bg-ink" />
              <span className="h-0.5 w-4 bg-ink" />
              <span className="h-0.5 w-4 bg-ink" />
            </button>
          </div>
        </nav>
      </header>

      {/* Stays mounted so it leaves the same way it arrived; `inert` keeps it out of the
          tab order while closed. */}
      <div
        {...(open ? {} : { inert: '' })}
        className={`fixed inset-0 z-50 flex flex-col bg-ink px-5 py-4 transition-[opacity,transform,visibility] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-8 ${
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-3 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between">
          <Logo withWordmark />
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="press flex h-9 w-9 items-center justify-center rounded-full bg-accent"
          >
            <X className="h-4 w-4 text-ink" />
          </button>
        </div>

        <div className="mt-16 flex flex-col gap-8">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="press text-3xl font-semibold uppercase tracking-widest text-white transition-colors duration-200 active:text-accent"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-4 border-t border-white/10 pt-6">
          <a href={CONTACT.phoneHref} className="press text-sm font-semibold tracking-widest text-muted">
            {CONTACT.phone}
          </a>
          <a
            href={MAILTO_CALL}
            onClick={() => setOpen(false)}
            className="press flex items-center gap-1 text-xl font-semibold uppercase tracking-wide text-accent"
          >
            Book a Call
            <ArrowUpRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </>
  )
}
