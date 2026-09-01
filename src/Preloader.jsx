import { useEffect, useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import { prefersReduced } from './motion.js'

const ACCENT = '#C6FF4D'

/* Interior of the flask — liquid, bubbles and vapour are clipped to this. */
const FLASK_IN = 'M88 26 L88 66 L42 152 Q39 158 48 158 L152 158 Q161 158 158 152 L112 66 L112 26 Z'
const FLASK_OUT = 'M84 22 L84 66 L36 152 Q31 164 46 164 L154 164 Q169 164 164 152 L116 66 L116 22'

export default function Preloader({ onDone }) {
  const root = useRef(null)

  // Deterministic scatter — no Math.random, so StrictMode double-renders stay stable.
  const bubbles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        cx: 54 + ((i * 41) % 92),
        r: 1.8 + ((i * 13) % 9) / 2.4,
        delay: 0.5 + (((i * 29) % 100) / 100) * 1.35,
        dur: 1 + ((i * 17) % 10) / 11,
      })),
    [],
  )

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const done = () => onDone?.()

      if (prefersReduced()) {
        gsap.to(self.selector('[data-panel]'), { autoAlpha: 0, duration: 0.25, onComplete: done })
        return
      }

      const flask = self.selector('[data-flask]')[0]
      const length = flask.getTotalLength()
      gsap.set(flask, { strokeDasharray: length, strokeDashoffset: length })

      // looping reaction, independent of the main timeline
      self.selector('[data-bubble]').forEach((b) => {
        gsap.fromTo(
          b,
          { attr: { cy: 156 }, autoAlpha: 0 },
          {
            attr: { cy: 88 },
            autoAlpha: 0,
            keyframes: { autoAlpha: [0, 0.85, 0] },
            duration: Number(b.dataset.dur),
            delay: Number(b.dataset.delay),
            repeat: -1,
            repeatDelay: 0.25,
            ease: 'power1.out',
          },
        )
      })
      self.selector('[data-vapour]').forEach((v, i) => {
        gsap.fromTo(
          v,
          { attr: { cy: 30 }, autoAlpha: 0 },
          {
            attr: { cy: -14 },
            keyframes: { autoAlpha: [0, 0.45, 0] },
            duration: 1.8,
            delay: 1.1 + i * 0.28,
            repeat: -1,
            ease: 'power1.out',
          },
        )
      })

      gsap
        .timeline({ onComplete: done })
        .to(flask, { strokeDashoffset: 0, duration: 0.9, ease: 'power3.out' }, 0)
        .to(self.selector('[data-rim]'), { autoAlpha: 1, duration: 0.3 }, 0.75)
        // the reagent rises and reacts through the palette as it goes
        .to(
          self.selector('[data-liquid]'),
          { attr: { y: 78 }, fill: ACCENT, duration: 2, ease: 'power3.out' },
          0.25,
        )
        .to(self.selector('[data-wordmark]'), { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.55)
        .to(self.selector('[data-bar]'), { scaleX: 1, duration: 2.3, ease: 'power1.inOut' }, 0.3)
        .to(self.selector('[data-status]'), { autoAlpha: 1, duration: 0.6 }, 0.9)
        // it goes off
        .fromTo(
          self.selector('[data-burst]'),
          { scale: 0.2, autoAlpha: 0, transformOrigin: '100px 120px' },
          { scale: 1.9, keyframes: { autoAlpha: [0, 0.95, 0] }, duration: 0.85, ease: 'power2.out' },
          2.15,
        )
        .to(self.selector('[data-panel]'), { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, 2.75)
    }, root)

    return () => ctx.revert()
  }, [onDone])

  return (
    <div ref={root} className="fixed inset-0 z-[100]">
      <div
        data-panel
        className="flex h-full w-full flex-col items-center justify-center bg-ink"
      >
        <svg viewBox="0 0 200 190" className="w-[150px] sm:w-[180px]" aria-hidden="true">
          <defs>
            <clipPath id="flaskIn">
              <path d={FLASK_IN} />
            </clipPath>
            <radialGradient id="burst">
              <stop offset="0%" stopColor="#eaffc9" stopOpacity="0.95" />
              <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
            </radialGradient>
            <filter id="soft">
              <feGaussianBlur stdDeviation="2.4" />
            </filter>
          </defs>

          <g clipPath="url(#flaskIn)">
            <rect data-liquid x="24" y="168" width="152" height="110" fill="#0E2E1F" />
            {bubbles.map((b, i) => (
              <circle
                key={i}
                data-bubble
                data-dur={b.dur}
                data-delay={b.delay}
                cx={b.cx}
                cy="156"
                r={b.r}
                fill="#f2ffdb"
                opacity="0"
              />
            ))}
          </g>

          {[0, 1, 2].map((i) => (
            <circle
              key={`v${i}`}
              data-vapour
              cx={94 + i * 6}
              cy="30"
              r={5 + i}
              fill={ACCENT}
              filter="url(#soft)"
              opacity="0"
            />
          ))}

          <path
            data-flask
            d={FLASK_OUT}
            fill="none"
            stroke="#ffffff"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line data-rim x1="78" y1="22" x2="122" y2="22" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" opacity="0" />

          <circle data-burst cx="100" cy="120" r="90" fill="url(#burst)" opacity="0" />
        </svg>

        <p
          data-wordmark
          className="mt-8 translate-y-2 text-[11px] font-semibold uppercase tracking-[0.42em] text-white opacity-0 sm:text-sm"
        >
          The BizChemists
        </p>

        <div className="mt-5 h-px w-[150px] overflow-hidden bg-white/15 sm:w-[190px]">
          <div data-bar className="h-full origin-left scale-x-0 bg-accent" />
        </div>

        <p
          data-status
          className="mt-4 text-[9px] font-semibold uppercase tracking-[0.3em] text-white/40 opacity-0"
        >
          Formulating
        </p>
      </div>
    </div>
  )
}
