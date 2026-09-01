import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { MAILTO_CALL, STATS } from './content.js'
import { gsap, prefersReduced } from './motion.js'

const HERO_VIDEO = '/film/hero.mp4'
const HERO_START = '/brand/hero-start.jpg'
// The frame the film settles on, and so the still everyone ends up looking at:
// it is the reduced-motion hero and the social card image.
const HERO = '/brand/hero.jpg'

const HEADING = ['Where', 'Brands Are', 'Formulated']

/**
 * The poster is composed with the figure in its left 35% and the rest deliberately
 * empty paper. Two layouts protect that, so no line of type ever lands on her:
 *   under 640 — poster band on top, heading in flow beneath it (she fills too much of
 *                a phone's width for type to sit beside her)
 *   640 to lg  — heading moves into the band's empty right half
 *   lg and up — the poster is `contain`ed (never cropped, so the empty right survives)
 *               and the copy is inset past the figure with `pl-[38%]`
 */
export default function Hero({ play }) {
  const root = useRef(null)
  const intro = useRef(null)
  const film = useRef(null)
  const [motion, setMotion] = useState(false)

  useEffect(() => {
    if (!prefersReduced()) setMotion(true)
  }, [])

  // Held until the reaction has wiped clear. Autoplaying on mount would run half
  // the eight seconds behind the preloader, where nobody can see it.
  useEffect(() => {
    if (play) film.current?.play().catch(() => {})
  }, [play, motion])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReduced()) {
        gsap.set('[data-hero-item]', { autoAlpha: 1, y: 0 })
        gsap.set('[data-hero-word]', { yPercent: 0 })
        return
      }
      gsap.set('[data-hero-item]', { autoAlpha: 0, y: 32 })
      gsap.set('[data-hero-word]', { yPercent: 110 })

      intro.current = gsap
        .timeline({ paused: true })
        .to('[data-hero-item]', { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out' }, 0)
        .to('[data-hero-word]', { yPercent: 0, duration: 0.7, stagger: 0.14, ease: 'power4.out' }, 0.4)
    }, root)
    return () => ctx.revert()
  }, [])

  // Held until the reaction has wiped clear.
  useEffect(() => {
    if (play) intro.current?.play()
  }, [play])

  return (
    <div
      id="top"
      ref={root}
      data-parallax-scope
      className="relative flex min-h-screen min-h-svh flex-col overflow-hidden bg-paper"
    >
      {/* ---------- poster ---------- */}
      <div className="absolute inset-x-0 top-0 h-[var(--band-h)] overflow-hidden bg-paper lg:inset-0 lg:h-auto">
        {/* Scroll parallax only — the poster holds still under the cursor. */}
        <div data-parallax="-0.06" className="absolute inset-x-0 -inset-y-[8%]">
          {motion ? (
            /* No `loop`: the graph draws on once and the last frame stays painted,
               so the hero settles into a composition instead of resetting every
               eight seconds. Reloading the page plays it again. */
            <video
              ref={film}
              className="hero-poster h-full w-full object-cover object-left lg:object-contain"
              src={HERO_VIDEO}
              poster={HERO_START}
              preload="auto"
              muted
              playsInline
              aria-hidden="true"
              width="1280"
              height="720"
            />
          ) : (
            <img
              className="hero-poster h-full w-full object-cover object-left lg:object-contain"
              src={HERO}
              alt=""
              aria-hidden="true"
              width="1280"
              height="720"
              fetchpriority="high"
              decoding="async"
            />
          )}
        </div>
      </div>

      {/* clears the poster band on small screens, the fixed nav on large ones */}
      <div className="h-[var(--band-h)] shrink-0 lg:h-24" />

      {/* ---------- stats ---------- */}
      <div className="hero-stats relative z-10 flex flex-1 items-center justify-end px-5 py-8 sm:px-8 md:px-12 md:py-0">
        <div className="flex items-start gap-5 sm:gap-8 md:gap-10">
          {STATS.map((stat) => (
            <div key={stat.label} data-hero-item className="text-right">
              <div
                className="text-ink"
                style={{ fontSize: 'clamp(1.5rem, 5vw, 3.5rem)', fontWeight: 600, lineHeight: 1 }}
              >
                <span className="text-ink/60" style={{ fontSize: '0.5em' }}>
                  +
                </span>
                {stat.value}
              </div>
              <p className="whitespace-pre-line text-[10px] font-semibold uppercase leading-tight tracking-widest text-ink sm:text-xs md:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- bottom ---------- */}
      <div className="hero-bottom relative z-10 flex flex-col gap-6 px-5 pb-8 sm:px-8 md:gap-10 md:px-12 md:pb-12 lg:pl-[38%]">
        <div className="flex items-center justify-end gap-4">
          <a
            data-hero-item
            href={MAILTO_CALL}
            className="press group flex items-center gap-3 whitespace-nowrap text-base text-ink sm:text-xl md:text-2xl"
            style={{ fontWeight: 600 }}
          >
            <span className="uppercase tracking-wide">Book a Call</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:h-10 sm:w-10">
              <ArrowUpRight className="h-[18px] w-[18px] text-ink sm:h-[22px] sm:w-[22px]" />
            </span>
          </a>
        </div>

        {/* One column at every width: a side-by-side row would hand the description
            300px out of the space the heading needs to avoid the figure. */}
        <div className="flex flex-col items-start lg:items-end">
          <p
            data-hero-item
            className="mb-4 text-[10px] font-semibold uppercase leading-snug tracking-widest text-ink sm:text-xs md:text-sm lg:text-right"
          >
            Gen Z Creative
            <br />
            &amp; Branding Agency
            <br />
            In Bangladesh
          </p>

          <h1
            className="heading-in-band w-full text-right uppercase text-ink text-[clamp(2rem,9vw,3rem)] lg:text-[clamp(2rem,8vw,9rem)]"
            style={{ lineHeight: 0.88, fontWeight: 600, letterSpacing: '-0.02em' }}
          >
            {HEADING.map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <span data-hero-word className="block">
                  {line}
                </span>
              </span>
            ))}
          </h1>
        </div>
      </div>
    </div>
  )
}
